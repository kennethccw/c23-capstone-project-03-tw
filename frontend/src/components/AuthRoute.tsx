import { Navigate, Outlet } from "react-router-dom";

//skip other import libraries

export default function RequireAuth() {
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" replace />;
}
