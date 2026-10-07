import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Layout from "../components/feature/Layout";
import Home from "../pages/home/page";
import Treatments from "../pages/treatments/page";
import TreatmentDetail from "../pages/treatments/detail/page";
import Goals from "../pages/goals/page";
import GoalDetail from "../pages/goals/detail/page";
import HowItWorks from "../pages/how-it-works/page";
import Pricing from "../pages/pricing/page";
import PharmacyStandards from "../pages/pharmacy-standards/page";
import ClinicalTeam from "../pages/clinical-team/page";
import Learn from "../pages/learn/page";
import ArticleDetail from "../pages/learn/detail/page";
import Faq from "../pages/faq/page";
import States from "../pages/states/page";
import Partners from "../pages/partners/page";
import Legal from "../pages/legal/page";
import Assessment from "../pages/assessment/page";
import Portal from "../pages/portal/page";

// POS + Admin
import PosLayout from "../pages/pos/layout";
import PosLogin from "../pages/pos/login/page";
import NewOrder from "../pages/pos/new-order/page";
import AdminLayout from "../pages/admin/layout";
import AdminDashboard from "../pages/admin/dashboard/page";
import AdminOrders from "../pages/admin/orders/page";
import AdminCustomers from "../pages/admin/customers/page";
import AdminSettings from "../pages/admin/settings/page";

const routes: RouteObject[] = [
  {
    path: "/assessment",
    element: <Assessment />,
  },
  {
    path: "/portal",
    element: <Portal />,
  },
  // POS routes (no site header/footer)
  {
    path: "/pos",
    element: <PosLayout />,
    children: [
      { path: "login", element: <PosLogin /> },
      { path: "new-order", element: <NewOrder /> },
      { index: true, element: <PosLogin /> },
    ],
  },
  // Admin routes (sidebar layout, admin-only)
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "customers", element: <AdminCustomers /> },
      { path: "settings", element: <AdminSettings /> },
      { index: true, element: <AdminDashboard /> },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "treatments",
        element: <Treatments />,
      },
      {
        path: "treatments/:slug",
        element: <TreatmentDetail />,
      },
      {
        path: "goals",
        element: <Goals />,
      },
      {
        path: "goals/:slug",
        element: <GoalDetail />,
      },
      {
        path: "how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "pharmacy-standards",
        element: <PharmacyStandards />,
      },
      {
        path: "clinical-team",
        element: <ClinicalTeam />,
      },
      {
        path: "learn",
        element: <Learn />,
      },
      {
        path: "learn/:slug",
        element: <ArticleDetail />,
      },
      {
        path: "faq",
        element: <Faq />,
      },
      {
        path: "states",
        element: <States />,
      },
      {
        path: "partners",
        element: <Partners />,
      },
      {
        path: "legal/:slug",
        element: <Legal />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
