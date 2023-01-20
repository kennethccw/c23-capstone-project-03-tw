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
import Filter from "../pages/AllActivitiesFilter";
import Organisation from "../pages/Organisation";
import OrganisationFilterContainer from "../pages/OrganisationFilterPage";
import OrganisationMoreDetails from "../pages/OrganisationMoreDetails";
import AnimalNeedOurHelp from "../pages/AnimalNeedOurHelp";
import HelpLocationFilter from "../pages/AnimalNeedOurHelpFilter";
import AnimalHelpChatroom from "../pages/AnimalHelpChat";
import Schedule from "../pages/Schedule";
import Account from "../pages/Account";
import EditProfile from "../pages/EditProfile";
import ActivitiesDetailPage from "../pages/ActivitiesDetailPage";
import AllActivitiesFilter from "../pages/AllActivitiesFilter";
import EditorsChoice from "../pages/EditorsChoice";
import Urgent from "../pages/Urgent";
import Popular from "../pages/Popular";
import VolunteerRecord from "../pages/VolunteerRecord";
import Badge from "../pages/Badge";
import { BadgeFilterYear } from "../pages/BadgeFilterYear";
import ContactUs from "../pages/ContactUs";
import AdoptionApplicationResult from "../pages/AdoptionApplicationResult";
import PrivacyAndSecurity from "../pages/PrivacyAndSecurity";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EditProfile />}></Route>
      <Route path="/" element={<PrivacyAndSecurity />}></Route>
      <Route path="/" element={<Account />}></Route>
      <Route path="/" element={<AdoptionApplicationResult />}></Route>
      <Route path="/" element={<ContactUs />}></Route>
      <Route path="/" element={<BadgeFilterYear />}></Route>
      <Route path="/" element={<OrganisationFilterContainer />}></Route>
      <Route path="/" element={<Badge />}></Route>

      <Route path="/" element={<VolunteerRecord />}></Route>
      <Route path="/" element={<AnimalHelpChatroom />}></Route>
      <Route path="/" element={<HelpLocationFilter />}></Route>
      <Route path="/" element={<AnimalNeedOurHelp />}></Route>
      <Route path="/" element={<Organisation />}></Route>
      <Route path="/" element={<OrganisationMoreDetails />}></Route>
      <Route path="/" element={<Adoption />}></Route>

      <Route path="/" element={<Schedule />}></Route>
      <Route path="/" element={<Welcome />}></Route>
      <Route path="/" element={<AdoptionDetail />}></Route>
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
      <Route path="activitiesDetailPage" element={<ActivitiesDetailPage/>}></Route>
      <Route path="allActivitiesFilter" element={<AllActivitiesFilter />}></Route>
      <Route path="editorsChoice" element={<EditorsChoice />}></Route>
      <Route path="urgent" element={<Urgent />}></Route>
      <Route path="popular" element={<Popular />}></Route>


      <Route path="/" element={<RequireAuth />}>
        <Route path="home1" element={<Home />}></Route>
      </Route>
      <Route path="*" element={<h1>404 : Page Not Found</h1>} />
    </Routes>
  );
}
