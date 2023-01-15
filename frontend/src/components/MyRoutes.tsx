import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgetPassword from "../pages/ForgetPassword";
import Welcome from "../pages/Welcome";
import Introduction from "../pages/Introduction";
import ChangePassword from "../pages/ChangePassword";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />}></Route>
      <Route path="/introduction" element={<Introduction />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/password/email" element={<ForgetPassword />}></Route>
      <Route path="/password/reset" element={<ChangePassword />}></Route>
    </Routes>
  );
}
