import { useEffect } from "react";
import Home from "../pages/Home";
import { JWTPayload } from "../redux/auth";
import jwt_decode from "jwt-decode";
import { useRootDispatch, useRootSelector } from "../redux/store";

export default function GoogleLoginCallback() {
  const dispatch = useRootDispatch();
  const loading = useRootSelector((state) => state.auth.loading);
  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const token = search.get("token");
    if (token) {
      const payload: JWTPayload = jwt_decode(token);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", payload.id.toString());
      localStorage.setItem("username", payload.username);
    }
    // dispatch(googleLoginThunk());
  }, [dispatch]);
  return loading ? <h3>Redirecting to main page...</h3> : <Home />;
}
