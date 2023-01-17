import { useEffect } from "react";
import Home from "../pages/Home";
import { facebookLoginThunk } from "../redux/auth/thunk";
import { useRootDispatch, useRootSelector } from "../redux/store";

export default function FacebookCallback() {
  const dispatch = useRootDispatch();
  const loading = useRootSelector((state) => state.auth.loading);
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    if (code) {
      dispatch(facebookLoginThunk(code));
    }
  }, [dispatch]);
  console.log(loading);
  return loading ? <h3>Redirecting to main page...</h3> : <Home />;
}
