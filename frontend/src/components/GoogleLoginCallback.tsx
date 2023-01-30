import { useEffect, useState } from "react";
import { JWTPayload } from "../redux/auth";
import jwt_decode from "jwt-decode";
import { useRootDispatch, useRootSelector } from "../redux/store";
import Home2 from "../pages/Home2";

export default function GoogleLoginCallback() {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const search = new URLSearchParams(window.location.search);
    const token = search.get("token");
    if (token) {
      const payload: JWTPayload = jwt_decode(token);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", payload.id.toString());
      localStorage.setItem("username", payload.username);
      localStorage.setItem("role", payload.role);
    }
    setIsLoading(false);
    // dispatch(googleLoginThunk());
  }, []);
  return isLoading ? <h3>Redirecting to main page...</h3> : <Home2 />;
}
