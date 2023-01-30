import { Route, Routes } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgetPassword from "../pages/ForgetPassword";
import Introduction from "../pages/Introduction";
import ChangePassword from "../pages/ChangePassword";
import RequireAuth from "./AuthRoute";
import Home from "../pages/Home";
import FacebookCallback from "./FacebookCallback";
import GoogleLoginCallback from "./GoogleLoginCallback";
import Home2 from "../pages/Home2";
import Advertising from "../pages/Advertising";
import ApplicationSuccess from "../pages/ApplicationSuccess";

import HelpLocationFilter from "../pages/AnimalNeedOurHelpFilter";
import AdoptionDetail from "../pages/AdoptionDetail";
import Donation from "../pages/Donation";
import Adoption from "../pages/AdoptionApplication";
import AllActivities from "../pages/AllActivities";
import NoticePasswordChanged from "../pages/NoticePasswordChanged";
import Filter from "../pages/AllActivitiesFilter";
import Organisation from "../pages/Organisation";
import OrganisationFilterContainer from "../pages/OrganisationFilterPage";
import OrganisationMoreDetails from "../pages/OrganisationMoreDetails";
import AnimalNeedOurHelp from "../pages/AnimalNeedOurHelp";
import AnimalHelpChatroom from "../pages/AnimalHelpChat";
import Schedule from "../pages/Schedule";
import Account from "../pages/Account";
import EditProfile from "../pages/EditProfile";
import SearchResultFuction from "../pages/SearchResult";
import SearchShowResultFunction from "../pages/SearchShowResultPage";
import DashboardPicture from "../pages/Organisation/OrganisationDashboard";
import ApprovalFunction from "../pages/Organisation/ControlUserPanel";
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
import DeleteAccount from "../pages/DeleteAccount";
import DeletedMessage from "../pages/DeletedMessage";
import ApproveApplication from "../pages/Organisation/OrganisationApproveApplication";
import ApprovedResult from "../pages/Organisation/ApprovedResult";
import AnimalHelpFunction from "../pages/Organisation/AnimalSupportChat";
import AnimalHelpToDoListfrom from "../pages/Organisation/AnimalSupportPanel";
import OrganisationHomePageContainer from "../pages/Organisation/OrganisationHomePage";
import AdminHomePageContainer from "../pages/Admins/AdminHomePage";
import AdminsDashboardPicture from "../pages/Admins/AdminsDashboard";
import AdminsHelpToDoListfrom from "../pages/Admins/AdminControlUserPanel";
import ItHelpFunction from "../pages/Admins/AdminItSupportChat";
import OrganisationAdoptionApplicationResult from "../pages/Organisation/AdoptionApplicationResult";
import ActivityApplication from "../pages/ActivityApplication";
import AllPetShowcase from "../pages/AllPetShowcase";
import PetDetails from "../pages/AdoptionPet";
import ApplicationCancelled from "../pages/ApplicationCancelled";
import CategorisedActivities from "../pages/CategorisedActivities";
import { Payment } from "../pages/Payment";
import PaymentSuccess from "../pages/PaymentSuccess";

export default function MyRoutes() {
  return (
    <Routes>
      {/* User */}
      <Route path="adoption" element={<AllPetShowcase />}></Route>
      <Route path="adoption/detail" element={<PetDetails />}></Route>
      <Route path="/" element={<Welcome />}></Route>
      <Route path="introduction" element={<Introduction />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="facebook-callback" element={<FacebookCallback />} />
      <Route path="google-callback" element={<GoogleLoginCallback />} />
      <Route path="password/reset/notice" element={<NoticePasswordChanged />}></Route>
      <Route path="home" element={<Home2 />}></Route>
      {/* <Route path="home" element={<Home />}></Route> */}
      <Route path="adoption/detail" element={<AdoptionDetail />}></Route>
      <Route path="allActivities" element={<AllActivities />}></Route>
      <Route path="donation" element={<Donation />}></Route>
      <Route path="donation/payment" element={<Payment />}></Route>
      <Route path="donation/payment/success" element={<PaymentSuccess />}></Route>
      <Route path="advertiser" element={<Advertising />}></Route>
      <Route path="schedule" element={<Schedule />}></Route>
      <Route path="register" element={<Register />}></Route>
      <Route path="password/email" element={<ForgetPassword />}></Route>
      <Route path="password/reset" element={<ChangePassword />}></Route>

      <Route path="activity/detail" element={<ActivitiesDetailPage />}></Route>
      <Route path="activity/application" element={<ActivityApplication />}></Route>
      <Route path="allActivitiesFilter" element={<AllActivitiesFilter />}></Route>
      <Route path="editorsChoice" element={<EditorsChoice />}></Route>
      <Route path="urgent" element={<Urgent />}></Route>
      <Route path="popular" element={<Popular />}></Route>
      <Route path="activity" element={<CategorisedActivities />}></Route>
      <Route path="search" element={<CategorisedActivities />}></Route>

      <Route path="adoption/application" element={<Adoption />}></Route>
      <Route path="adoption/application/result" element={<AdoptionApplicationResult />}></Route>
      <Route path="application/success" element={<ApplicationSuccess />}></Route>
      <Route path="application/cancellation" element={<ApplicationCancelled />}></Route>

      <Route path="search" element={<SearchShowResultFunction />}></Route>
      <Route path="/" element={<SearchResultFuction />}></Route>

      <Route path="/" element={<AnimalHelpFunction />}></Route>
      <Route path="help" element={<AnimalNeedOurHelp />}></Route>
      <Route path="/" element={<HelpLocationFilter />}></Route>
      <Route path="/" element={<AnimalHelpChatroom />}></Route>

      <Route path="contact" element={<ContactUs />}></Route>
      <Route path="privacy-and-security" element={<PrivacyAndSecurity />}></Route>
      <Route path="profile" element={<EditProfile />}></Route>
      <Route path="account" element={<Account />}></Route>
      <Route path="/" element={<DeletedMessage />}></Route>
      <Route path="/" element={<DeleteAccount />}></Route>
      <Route path="badge/filter" element={<BadgeFilterYear />}></Route>
      <Route path="badge" element={<Badge />}></Route>

      <Route path="organisation" element={<Organisation />}>
        <Route path="detail" element={<OrganisationMoreDetails />}></Route>
      </Route>
      {/* <Route path="organisation" element={<Organisation />}></Route> */}
      <Route path="/" element={<OrganisationFilterContainer />}></Route>
      <Route path="record" element={<VolunteerRecord />}></Route>
      {/* User */}

      {/* Admin */}
      <Route path="/" element={<AdminHomePageContainer />}></Route>
      <Route path="/" element={<AdminsDashboardPicture />}></Route>
      <Route path="/" element={<AdminsHelpToDoListfrom />}></Route>
      <Route path="/" element={<ItHelpFunction />}></Route>
      <Route path="/" element={<ApproveApplication />}></Route>
      <Route path="/" element={<ApprovedResult />}></Route>
      {/* Admin */}

      {/* Organisation  */}
      <Route path="/" element={<OrganisationHomePageContainer />}></Route>
      <Route path="/" element={<AdoptionApplicationResult />}></Route>
      <Route path="/" element={<OrganisationAdoptionApplicationResult />}></Route>
      <Route path="/" element={<AnimalHelpToDoListfrom />}></Route>
      <Route path="/" element={<ApprovalFunction />}></Route>
      <Route path="/" element={<DashboardPicture />}></Route>
      {/* Organisation  */}

      <Route path="/" element={<RequireAuth />}>
        <Route path="home1" element={<Home />}></Route>
      </Route>
      <Route path="*" element={<h1>404 : Page Not Found</h1>} />
    </Routes>
  );
}
