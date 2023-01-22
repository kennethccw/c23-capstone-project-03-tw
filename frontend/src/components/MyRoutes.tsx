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
import Organisation from "../pages/Organisation";
import OrganisationFilterContainer from "../pages/OrganisationFilterPage";
import OrganisationMoreDetails from "../pages/OrganisationMoreDetails";
import AnimalNeedOurHelp from "../pages/AnimalNeedOurHelp";
import HelpLocationFilter from "../pages/AnimalNeedOurHelpFilter";
import AnimalHelpChatroom from "../pages/AnimalHelpChat";
import NoticePasswordChanged from "../pages/NoticePasswordChanged";
import Schedule from "../pages/Schedule";
import Account from "../pages/Account";
import EditProfile from "../pages/EditProfile";
import SearchResultFuction from "../pages/SearchResult";
import SearchShowResultFunction from "../pages/SearchShowResultPage";
import OrganisationHomePageContainer from "../pages/organisation/OrganisationHomePage";
import DashboardPicture from "../pages/organisation/OrganisationDashboard";
import ApprovalFunction from "../pages/organisation/ControlUserPanel";
import VolunteerRecord from "../pages/VolunteerRecord";
import Badge from "../pages/Badge";
import { BadgeFilterYear } from "../pages/BadgeFilterYear";
import ContactUs from "../pages/ContactUs";
import AdoptionApplicationResult from "../pages/AdoptionApplicationResult";
import PrivacyAndSecurity from "../pages/PrivacyAndSecurity";
import DeleteAccount from "../pages/DeleteAccount";
import DeletedMessage from "../pages/DeletedMessage";
// import OrganisationAdoptionApplicationResult from "../pages/organisation/AdoptionApplicationResult";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Schedule />}></Route>
      <Route path="/" element={<AdoptionApplicationResult />}></Route>
      <Route path="/" element={<OrganisationMoreDetails />}></Route>
      <Route path="/" element={<ApprovalFunction />}></Route>
      <Route path="/" element={<AdoptionApplication />}></Route>
      <Route path="/" element={<Adoption />}></Route>
      <Route path="/" element={<DashboardPicture />}></Route>
      <Route path="/" element={<OrganisationHomePageContainer />}></Route>
      <Route path="/" element={<SearchShowResultFunction />}></Route>
      <Route path="/" element={<SearchResultFuction />}></Route>
      <Route path="/" element={<AnimalHelpChatroom />}></Route>
      {/* <Route path="/" element={<OrganisationAdoptionApplicationResult />}></Route> */}
      <Route path="/" element={<DeletedMessage />}></Route>
      <Route path="/" element={<DeleteAccount />}></Route>

      <Route path="privacy-and-security" element={<PrivacyAndSecurity />}></Route>
      <Route path="profile" element={<EditProfile />}></Route>
      <Route path="account" element={<Account />}></Route>
      <Route path="result" element={<AdoptionApplicationResult />}></Route>
      <Route path="contact" element={<ContactUs />}></Route>
      <Route path="/" element={<BadgeFilterYear />}></Route>
      <Route path="/" element={<OrganisationFilterContainer />}></Route>
      <Route path="badge" element={<Badge />}></Route>

      <Route path="record" element={<VolunteerRecord />}></Route>
      <Route path="/" element={<AnimalHelpChatroom />}></Route>
      <Route path="/" element={<HelpLocationFilter />}></Route>
      <Route path="/" element={<AnimalNeedOurHelp />}></Route>
      <Route path="/" element={<Organisation />}></Route>
      <Route path="/" element={<OrganisationMoreDetails />}></Route>
      <Route path="/" element={<Adoption />}></Route>

      <Route path="/" element={<Welcome />}></Route>
      <Route path="/" element={<AdoptionDetail />}></Route>
      <Route path="/" element={<Donation />}></Route>
      <Route path="/" element={<NoticePasswordChanged />}></Route>
      <Route path="/" element={<Advertising />}></Route>
      <Route path="introduction" element={<Introduction />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="facebook-callback" element={<FacebookCallback />} />
      <Route path="google-callback" element={<GoogleLoginCallback />} />
      <Route path="register" element={<Register />}></Route>
      <Route path="password/email" element={<ForgetPassword />}></Route>
      <Route path="password/reset" element={<ChangePassword />}></Route>
      <Route path="home" element={<Home />}></Route>
      <Route path="/" element={<RequireAuth />}>
        <Route path="home1" element={<Home />}></Route>
      </Route>
      <Route path="*" element={<h1>404 : Page Not Found</h1>} />
    </Routes>
  );
}
