import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useRootSelector } from "../redux/store";

//skip other import libraries

export default function RequireAuth() {
  const location = useLocation();
  const isAuth = useRootSelector((state) => state.auth.isAuth);
  const loading = useRootSelector((state) => state.auth.loading);

  console.log(loading);
  console.log(isAuth);

  return loading ? <></> : isAuth ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}
