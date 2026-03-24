import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#02060a] text-emerald-400">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
