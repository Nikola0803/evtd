<?php
/**
 * Plugin Name: evolv POS
 * Description: Internal POS and CRM for evolv Today call center staff. Provides REST API, staff auth, and WP admin dashboard.
 * Version: 1.0.0
 * Author: evolv Today
 */

defined('ABSPATH') || exit;

define('EVOLV_POS_VERSION', '1.0.0');
define('EVOLV_POS_DIR', plugin_dir_path(__FILE__));
define('EVOLV_POS_URL', plugin_dir_url(__FILE__));

// ============================================================
// Activation: generate JWT secret + seed default staff
// ============================================================
register_activation_hook(__FILE__, function () {
    if (!get_option('evolv_pos_jwt_secret')) {
        update_option('evolv_pos_jwt_secret', bin2hex(random_bytes(32)));
    }
    if (!get_option('evolv_pos_staff')) {
        // Format: pin:name:role  (comma-separated)
        update_option('evolv_pos_staff', 'admin:DarkStar:admin,staff1:Agent One:staff');
    }
});

// ============================================================
// Admin menu
// ============================================================
add_action('admin_menu', function () {
    add_menu_page(
        'evolv POS',
        'evolv POS',
        'manage_options',
        'evolv-pos',
        'evolv_pos_admin_page',
        'dashicons-store',
        58
    );
    add_submenu_page('evolv-pos', 'Settings', 'Settings', 'manage_options', 'evolv-pos-settings', 'evolv_pos_settings_page');
    add_submenu_page('evolv-pos', 'Open POS', 'Open POS', 'manage_options', 'evolv-pos-open', 'evolv_pos_redirect_to_pos');
});

function evolv_pos_admin_page() {
    $site_url = home_url();
    $stats = evolv_pos_get_stats_data();
    ?>
    <div class="wrap">
        <h1>evolv POS &mdash; Dashboard</h1>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:20px 0;">
            <?php
            $cards = [
                ['Today Orders', $stats['orders_today']],
                ['Today Revenue', '$' . $stats['revenue_today']],
                ['Week Revenue', '$' . $stats['revenue_week']],
                ['Total Customers', $stats['total_customers']],
            ];
            foreach ($cards as [$label, $val]) : ?>
                <div style="background:#fff;border:1px solid #e0d9d0;border-radius:12px;padding:20px;">
                    <p style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#888;margin:0 0 6px;"><?php echo esc_html($label); ?></p>
                    <p style="font-size:28px;font-weight:600;margin:0;color:#1a1612;"><?php echo esc_html($val); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
        <p>
            <a href="<?php echo esc_url($site_url . '/pos/login'); ?>" target="_blank" class="button button-primary">Open POS Terminal</a>
            &nbsp;
            <a href="<?php echo esc_url($site_url . '/admin/dashboard'); ?>" target="_blank" class="button">Open Admin CRM</a>
        </p>
        <hr>
        <h2>Recent Orders</h2>
        <?php
        $orders = wc_get_orders(['limit' => 10, 'orderby' => 'date', 'order' => 'DESC']);
        if ($orders) :
        ?>
        <table class="wp-list-table widefat fixed striped">
            <thead><tr>
                <th>Order</th><th>Customer</th><th>Date</th><th>Status</th><th>Total</th>
            </tr></thead>
            <tbody>
            <?php foreach ($orders as $order) : ?>
                <tr>
                    <td><a href="<?php echo esc_url($order->get_edit_order_url()); ?>">#<?php echo $order->get_order_number(); ?></a></td>
                    <td><?php echo esc_html($order->get_billing_first_name() . ' ' . $order->get_billing_last_name()); ?></td>
                    <td><?php echo esc_html($order->get_date_created()->date('M j, Y')); ?></td>
                    <td><span class="order-status status-<?php echo esc_attr($order->get_status()); ?>"><?php echo esc_html($order->get_status()); ?></span></td>
                    <td><?php echo wp_kses_post($order->get_formatted_order_total()); ?></td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
        <?php else : ?>
            <p>No orders yet.</p>
        <?php endif; ?>
    </div>
    <?php
}

function evolv_pos_settings_page() {
    if (isset($_POST['evolv_pos_staff_save']) && check_admin_referer('evolv_pos_settings')) {
        $staff = sanitize_textarea_field($_POST['evolv_pos_staff'] ?? '');
        update_option('evolv_pos_staff', $staff);
        echo '<div class="notice notice-success"><p>Settings saved.</p></div>';
    }
    $staff = get_option('evolv_pos_staff', '');
    $jwt   = get_option('evolv_pos_jwt_secret', '');
    ?>
    <div class="wrap">
        <h1>evolv POS &mdash; Settings</h1>
        <form method="post">
            <?php wp_nonce_field('evolv_pos_settings'); ?>
            <table class="form-table">
                <tr>
                    <th>Staff PINs</th>
                    <td>
                        <textarea name="evolv_pos_staff" rows="6" cols="60" class="large-text code"><?php echo esc_textarea($staff); ?></textarea>
                        <p class="description">One per line or comma-separated. Format: <code>pin:Display Name:role</code><br>
                        Role must be <code>admin</code> or <code>staff</code>.<br>
                        Example: <code>secret123:DarkStar:admin,rep456:Agent One:staff</code></p>
                    </td>
                </tr>
                <tr>
                    <th>JWT Secret</th>
                    <td>
                        <code><?php echo esc_html(substr($jwt, 0, 8) . str_repeat('*', 24)); ?></code>
                        <p class="description">Auto-generated on install. Stored in wp_options as <code>evolv_pos_jwt_secret</code>.</p>
                    </td>
                </tr>
            </table>
            <input type="hidden" name="evolv_pos_staff_save" value="1">
            <?php submit_button('Save Settings'); ?>
        </form>
        <hr>
        <h2>REST API Endpoints</h2>
        <table class="wp-list-table widefat">
            <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
            <tbody>
                <?php
                $base = home_url('/wp-json/evolv-pos/v1');
                $endpoints = [
                    ['POST', '/auth',       'Staff login - returns JWT'],
                    ['GET',  '/products',   'Search/list products'],
                    ['GET',  '/orders',     'List orders (paginated)'],
                    ['POST', '/orders',     'Create order from POS'],
                    ['GET',  '/customers',  'List customers (paginated)'],
                    ['GET',  '/stats',      'Dashboard stats'],
                    ['GET',  '/health',     'Connection health check'],
                ];
                foreach ($endpoints as [$method, $path, $desc]) : ?>
                <tr>
                    <td><code><?php echo esc_html($method); ?></code></td>
                    <td><code><?php echo esc_html($base . $path); ?></code></td>
                    <td><?php echo esc_html($desc); ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <?php
}

function evolv_pos_redirect_to_pos() {
    wp_redirect(home_url('/pos/login'));
    exit;
}

// ============================================================
// CORS for local dev
// ============================================================
add_action('rest_api_init', function () {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = ['http://localhost:3000', 'http://localhost:5173', home_url()];
    if (in_array($origin, $allowed, true)) {
        header("Access-Control-Allow-Origin: {$origin}");
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Credentials: true');
    }
}, 15);

add_action('init', function () {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS' && strpos($_SERVER['REQUEST_URI'] ?? '', '/wp-json/evolv-pos/') !== false) {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        $allowed = ['http://localhost:3000', 'http://localhost:5173', home_url()];
        if (in_array($origin, $allowed, true)) {
            header("Access-Control-Allow-Origin: {$origin}");
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type, Authorization');
            header('Access-Control-Max-Age: 86400');
            http_response_code(204);
            exit;
        }
    }
});

// ============================================================
// JWT helpers (no external library - pure PHP)
// ============================================================
function evolv_pos_jwt_sign(array $payload): string {
    $secret  = get_option('evolv_pos_jwt_secret', 'dev-secret');
    $header  = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload['iat'] = time();
    $payload['exp'] = time() + 12 * 3600;
    $body    = base64_encode(json_encode($payload));
    $sig     = hash_hmac('sha256', "{$header}.{$body}", $secret, true);
    return "{$header}.{$body}." . base64_encode($sig);
}

function evolv_pos_jwt_verify(string $token): ?array {
    $secret = get_option('evolv_pos_jwt_secret', 'dev-secret');
    $parts  = explode('.', $token);
    if (count($parts) !== 3) return null;
    [$header, $body, $sig] = $parts;
    $expected = base64_encode(hash_hmac('sha256', "{$header}.{$body}", $secret, true));
    if (!hash_equals($expected, $sig)) return null;
    $payload = json_decode(base64_decode($body), true);
    if (!$payload || ($payload['exp'] ?? 0) < time()) return null;
    return $payload;
}

function evolv_pos_get_token(): ?array {
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!$auth && function_exists('getallheaders')) {
        $headers = getallheaders();
        $auth = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    }
    if (!str_starts_with($auth, 'Bearer ')) return null;
    return evolv_pos_jwt_verify(substr($auth, 7));
}

function evolv_pos_require_auth(): ?WP_Error {
    $payload = evolv_pos_get_token();
    if (!$payload) {
        return new WP_Error('unauthorized', 'Valid staff token required.', ['status' => 401]);
    }
    return null;
}

function evolv_pos_require_admin(): ?WP_Error {
    $payload = evolv_pos_get_token();
    if (!$payload) return new WP_Error('unauthorized', 'Valid staff token required.', ['status' => 401]);
    if (($payload['role'] ?? '') !== 'admin') return new WP_Error('forbidden', 'Admin role required.', ['status' => 403]);
    return null;
}

// ============================================================
// Stats helper (used by admin page and REST)
// ============================================================
function evolv_pos_get_stats_data(): array {
    $today_start = date('Y-m-d') . ' 00:00:00';
    $week_start  = date('Y-m-d', strtotime('monday this week')) . ' 00:00:00';

    $orders_today = wc_get_orders(['date_created' => ">={$today_start}", 'limit' => -1, 'return' => 'ids']);
    $orders_week  = wc_get_orders(['date_created' => ">={$week_start}",  'limit' => -1, 'return' => 'ids']);

    $rev_today = 0.0;
    foreach ($orders_today as $id) {
        $o = wc_get_order($id);
        $rev_today += (float) $o->get_total();
    }
    $rev_week = 0.0;
    foreach ($orders_week as $id) {
        $o = wc_get_order($id);
        $rev_week += (float) $o->get_total();
    }

    return [
        'orders_today'    => count($orders_today),
        'revenue_today'   => number_format($rev_today, 2),
        'orders_week'     => count($orders_week),
        'revenue_week'    => number_format($rev_week, 2),
        'total_customers' => count((new WC_Customer_Query(['limit' => -1, 'return' => 'ids']))->get_results()),
        'total_products'  => (int) wp_count_posts('product')->publish,
    ];
}

// ============================================================
// REST API routes
// ============================================================
add_action('rest_api_init', function () {
    $ns = 'evolv-pos/v1';

    // POST /auth
    register_rest_route($ns, '/auth', [
        'methods'             => 'POST',
        'callback'            => function (WP_REST_Request $req) {
            $pin   = sanitize_text_field($req->get_param('pin') ?? '');
            $staff_raw = get_option('evolv_pos_staff', '');

            $entries = preg_split('/[\n,]+/', $staff_raw);
            foreach ($entries as $entry) {
                $parts = array_map('trim', explode(':', $entry));
                if (count($parts) < 3) continue;
                [$code, $name, $role] = $parts;
                if (hash_equals(trim($code), $pin)) {
                    $token = evolv_pos_jwt_sign(['name' => $name, 'role' => $role]);
                    return rest_ensure_response(['token' => $token, 'name' => $name, 'role' => $role]);
                }
            }
            return new WP_Error('invalid_pin', 'Invalid PIN. Please try again.', ['status' => 401]);
        },
        'permission_callback' => '__return_true',
    ]);

    // GET /health
    register_rest_route($ns, '/health', [
        'methods'             => 'GET',
        'callback'            => function () {
            $wc_ok = class_exists('WooCommerce');
            return rest_ensure_response([
                'woocommerce' => $wc_ok,
                'version'     => $wc_ok ? WC()->version : null,
                'plugin'      => EVOLV_POS_VERSION,
            ]);
        },
        'permission_callback' => '__return_true',
    ]);

    // GET /stats
    register_rest_route($ns, '/stats', [
        'methods'  => 'GET',
        'callback' => function () {
            if ($err = evolv_pos_require_auth()) return $err;
            return rest_ensure_response(evolv_pos_get_stats_data());
        },
        'permission_callback' => '__return_true',
    ]);

    // GET /products
    register_rest_route($ns, '/products', [
        'methods'  => 'GET',
        'callback' => function (WP_REST_Request $req) {
            if ($err = evolv_pos_require_auth()) return $err;
            $search   = sanitize_text_field($req->get_param('search') ?? '');
            $per_page = min(50, (int) ($req->get_param('per_page') ?? 20));
            $page     = max(1, (int) ($req->get_param('page') ?? 1));

            $args = [
                'status'   => 'publish',
                'limit'    => $per_page,
                'page'     => $page,
                'orderby'  => 'title',
                'order'    => 'ASC',
            ];
            if ($search) $args['s'] = $search;

            $products = wc_get_products($args);
            $out = [];
            foreach ($products as $p) {
                $cats = array_map(fn($t) => ['name' => $t->name], get_the_terms($p->get_id(), 'product_cat') ?: []);
                $out[] = [
                    'id'           => $p->get_id(),
                    'name'         => $p->get_name(),
                    'sku'          => $p->get_sku(),
                    'price'        => $p->get_price(),
                    'stock_status' => $p->get_stock_status(),
                    'categories'   => $cats,
                    'images'       => [],
                ];
            }
            return rest_ensure_response($out);
        },
        'permission_callback' => '__return_true',
    ]);

    // GET /orders
    register_rest_route($ns, '/orders', [
        'methods'  => 'GET',
        'callback' => function (WP_REST_Request $req) {
            if ($err = evolv_pos_require_auth()) return $err;
            $per_page = min(50, (int) ($req->get_param('per_page') ?? 20));
            $page     = max(1, (int) ($req->get_param('page') ?? 1));
            $status   = sanitize_text_field($req->get_param('status') ?? '');

            $args = ['limit' => $per_page, 'paged' => $page, 'orderby' => 'date', 'order' => 'DESC'];
            if ($status) $args['status'] = 'wc-' . $status;

            $orders = wc_get_orders($args);
            $out = [];
            foreach ($orders as $o) {
                $items = [];
                foreach ($o->get_items() as $item) {
                    $items[] = [
                        'name'     => $item->get_name(),
                        'quantity' => $item->get_quantity(),
                        'total'    => $item->get_total(),
                    ];
                }
                $out[] = [
                    'id'           => $o->get_id(),
                    'number'       => $o->get_order_number(),
                    'status'       => $o->get_status(),
                    'date_created' => $o->get_date_created()->format('c'),
                    'total'        => $o->get_total(),
                    'billing'      => [
                        'first_name' => $o->get_billing_first_name(),
                        'last_name'  => $o->get_billing_last_name(),
                        'email'      => $o->get_billing_email(),
                        'phone'      => $o->get_billing_phone(),
                    ],
                    'line_items'   => $items,
                    'payment_url'  => $o->get_checkout_payment_url(),
                ];
            }
            return rest_ensure_response($out);
        },
        'permission_callback' => '__return_true',
    ]);

    // POST /orders
    register_rest_route($ns, '/orders', [
        'methods'  => 'POST',
        'callback' => function (WP_REST_Request $req) {
            if ($err = evolv_pos_require_auth()) return $err;

            $first_name = sanitize_text_field($req->get_param('first_name') ?? '');
            $last_name  = sanitize_text_field($req->get_param('last_name') ?? '');
            $email      = sanitize_email($req->get_param('email') ?? '');
            $phone      = sanitize_text_field($req->get_param('phone') ?? '');
            $note       = sanitize_textarea_field($req->get_param('note') ?? '');
            $items      = $req->get_param('items') ?? [];

            if (!$first_name || !$last_name || !$email) {
                return new WP_Error('bad_request', 'first_name, last_name and email are required.', ['status' => 400]);
            }
            if (empty($items)) {
                return new WP_Error('bad_request', 'At least one item is required.', ['status' => 400]);
            }

            $order = wc_create_order();
            $order->set_billing_first_name($first_name);
            $order->set_billing_last_name($last_name);
            $order->set_billing_email($email);
            $order->set_billing_phone($phone);
            if ($note) $order->add_order_note(wp_kses_post($note));

            $payload = evolv_pos_get_token();
            $staff_name = $payload['name'] ?? 'POS';
            $order->add_order_note("Order created via POS by {$staff_name}.");

            foreach ($items as $item) {
                $product_id = (int) ($item['product_id'] ?? 0);
                $quantity   = max(1, (int) ($item['quantity'] ?? 1));
                $product    = wc_get_product($product_id);
                if (!$product) continue;
                $order->add_product($product, $quantity);
            }

            $order->calculate_totals();
            $order->set_status('wc-pending');
            $order->save();

            return rest_ensure_response([
                'id'           => $order->get_id(),
                'number'       => $order->get_order_number(),
                'status'       => $order->get_status(),
                'total'        => $order->get_total(),
                'payment_url'  => $order->get_checkout_payment_url(),
                'date_created' => $order->get_date_created()->format('c'),
                'billing'      => [
                    'first_name' => $first_name,
                    'last_name'  => $last_name,
                    'email'      => $email,
                    'phone'      => $phone,
                ],
            ]);
        },
        'permission_callback' => '__return_true',
    ]);

    // GET /customers
    register_rest_route($ns, '/customers', [
        'methods'  => 'GET',
        'callback' => function (WP_REST_Request $req) {
            if ($err = evolv_pos_require_auth()) return $err;
            $per_page = min(50, (int) ($req->get_param('per_page') ?? 20));
            $page     = max(1, (int) ($req->get_param('page') ?? 1));
            $search   = sanitize_text_field($req->get_param('search') ?? '');

            $args = [
                'limit'   => $per_page,
                'page'    => $page,
                'role'    => 'customer',
                'order'   => 'DESC',
                'orderby' => 'registered',
            ];
            if ($search) $args['search'] = '*' . $search . '*';

            $query     = new WC_Customer_Query($args);
            $customers = $query->get_results();
            $out = [];
            foreach ($customers as $c) {
                $out[] = [
                    'id'           => $c->get_id(),
                    'email'        => $c->get_email(),
                    'first_name'   => $c->get_first_name(),
                    'last_name'    => $c->get_last_name(),
                    'date_created' => $c->get_date_created() ? $c->get_date_created()->format('c') : '',
                    'orders_count' => $c->get_order_count(),
                    'total_spent'  => number_format((float) $c->get_total_spent(), 2),
                ];
            }
            return rest_ensure_response($out);
        },
        'permission_callback' => '__return_true',
    ]);
});

// ============================================================
// Serve React SPA for /pos/* and /admin/* paths
// ============================================================
add_action('init', function () {
    $uri  = $_SERVER['REQUEST_URI'] ?? '';
    $path = strtok($uri, '?');

    if (
        str_starts_with($path, '/pos') ||
        str_starts_with($path, '/admin/dashboard') ||
        str_starts_with($path, '/admin/orders') ||
        str_starts_with($path, '/admin/customers') ||
        str_starts_with($path, '/admin/settings')
    ) {
        $index = EVOLV_POS_DIR . 'app/index.html';
        if (file_exists($index)) {
            add_filter('template_include', function () use ($index) {
                return $index;
            }, PHP_INT_MAX);
        }
    }
});
