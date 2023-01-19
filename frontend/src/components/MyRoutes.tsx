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
import Advertising from "../pages/Advertising";
import AdoptionApplication from "../pages/AdoptionApplication";

import AdoptionDetail from "../pages/AdoptionDetail";
import Donation from "../pages/Donation";
import Adoption from "../pages/Adoption";
import AllActivities from "../pages/AllActivities";
import NoticePasswordChanged from "../pages/NoticePasswordChanged";
import Filter from "../pages/Filter";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />}></Route>
      <Route path="/" element={<AdoptionDetail />}></Route>
      <Route path="/" element={<Adoption />}></Route>
      <Route path="/" element={<Donation />}></Route>
      <Route path="/" element={<NoticePasswordChanged />}></Route>
      <Route path="/" element={<AdoptionApplication />}></Route>
      <Route path="/" element={<Advertising />}></Route>
      <Route path="introduction" element={<Introduction />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="facebook-callback" element={<FacebookCallback />} />
      <Route path="google-callback" element={<GoogleLoginCallback />} />
      <Route path="register" element={<Register />}></Route>
      <Route path="password/email" element={<ForgetPassword />}></Route>
      <Route path="password/reset" element={<ChangePassword />}></Route>
      <Route path="home" element={<Home />}></Route>
      <Route path="allActivities" element={<AllActivities />}></Route>
      <Route path="filter" element={<Filter />}></Route>

      <Route path="/" element={<RequireAuth />}>
        <Route path="home1" element={<Home />}></Route>
      </Route>
      <Route path="*" element={<h1>404 : Page Not Found</h1>} />
    </Routes>
  );
}
