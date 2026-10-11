import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";
import { CurrencyProvider } from "@/lib/currency-context";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      <CartProvider>
        <AnnouncementBar />
        <Header />
        <main className="flex-1 pt-[90px] md:pt-[100px]">{children}</main>
        <Footer />
      </CartProvider>
    </CurrencyProvider>
  );
}
