import { Outlet, Navigate, useLocation } from "react-router-dom";
import { getSession } from "@/lib/posAuth";

export default function PosLayout() {
  const session = getSession();
  const { pathname } = useLocation();

  if (!session && pathname !== "/pos/login") {
    return <Navigate to="/pos/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background-100 font-body">
      <Outlet />
    </div>
  );
}