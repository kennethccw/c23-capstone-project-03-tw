import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgetPassword from "../pages/ForgetPassword";
import AdoptionDetail from "../pages/AdoptionDetail";
import Donation from "../pages/Donation";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Donation />}></Route>
      <Route path="/" element={<AdoptionDetail />}></Route>
      <Route path="/" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/password" element={<ForgetPassword />}></Route>
    </Routes>
  );
}
