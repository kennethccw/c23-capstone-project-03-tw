import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgetPassword from "../pages/ForgetPassword";
import Welcome from "../pages/Welcome";
import Introduction from "../pages/Introduction";
import ChangePassword from "../pages/ChangePassword";
import RequireAuth from "./AuthRoute";
import Home from "../pages/Home";
import FacebookCallback from "./FacebookCallback";
import GoogleLoginCallback from "./GoogleLoginCallback";
import Home2 from "../pages/Home2";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />}></Route>
      <Route path="/introduction" element={<Introduction />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/facebook-callback" element={<FacebookCallback />} />
      <Route path="/google-callback" element={<GoogleLoginCallback />} />
      <Route path="/register" element={<Register />}></Route>
      <Route path="/password/email" element={<ForgetPassword />}></Route>
      <Route path="/password/reset" element={<ChangePassword />}></Route>
      <Route element={<RequireAuth />}>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/home2" element={<Home2 />}></Route>
      </Route>
      <Route path="*" element={<>404 : Page Not Found</>} />
    </Routes>
  );
}
