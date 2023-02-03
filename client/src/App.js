import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import RegisterForO from "./pages/register/RegisterForOrganization";
import ErrorPage from "./pages/error/NotFound";
import AuctionDetail from "./pages/auctionDetails/AuctionDetail";
import PlaceABid from "./components/popups/PlaceABid";
import AuctionList from "./pages/auctionList/AuctionList";
import PaymentResult from "./pages/paymentResult/PaymemtResult";
import News from "./pages/news/News";
import SellerCenter from "./pages/ForSeller/SellerCenter";
import MyProperty from "./pages/ForSeller/MyProperty";
import AddProperty from "./pages/ForSeller/AddProperty";
import AuctionDetailForSeller from "./pages/ForSeller/AuctionDetailForSeller";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ConfirmCode from "./pages/forgotPassword/ConfirmCode";
import ResetPassword from "./pages/forgotPassword/ResetPassword";
import MyAuctions from "./pages/ForSeller/MyAuctions";
import EditAuction from "./pages/ForSeller/EditAuction";
import EditProperty from "./pages/ForSeller/EditProperty";
import PropertyDetail from "./pages/ForSeller/PropertyDetail";
import AuctionsListForManager from "./pages/forManager/AuctionsListForManager";
import ApproveAuction from "./pages/forManager/ApproveAuction";
import ManagerCategories from "./pages/forManager/ManageCategorys";
import AddCategory from "./pages/forManager/AddCategory";
import EditCategory from "./pages/forManager/EditCategory";
import ListManagers from "./pages/forAdmin/ListManagers";
import AddManager from "./pages/forAdmin/AddManager";
import ListSellers from "./pages/forAdmin/ListSellers";
import AddSeller from "./pages/forAdmin/AddSeller";
import ListBidders from "./pages/forAdmin/ListBidders";
import BidderDetail from "./pages/forAdmin/BidderDetail";
import ListNews from "./pages/forAdmin/ListNews";
import AddNew from "./pages/forAdmin/AddNews";
import EditNew from "./pages/forAdmin/EditNew";
import AuctionDetailForManager from "./pages/forManager/AuctionDetailForManager";
import ViewManager from "./pages/forAdmin/ViewManager";
import ViewSeller from "./pages/forAdmin/ViewSeller";
import Profile from "./pages/forBidder/Profile";
import ProfileOrganization from "./pages/forBidder/ProfileOrganization";
import EditProfile from "./pages/forBidder/EditProfile";
import EditProfileOrganization from "./pages/forBidder/EditProfileOrganization";
import AboutUs from "./pages/common/AboutUs";
import ConfirmPayment from "./pages/biddingFeatures/ui/ConfirmPayment";
import ChangePassword from "./pages/common/ChangePassword";
import ViewBiddingForManager from "./pages/forManager/ViewBiddingForManager";
import ViewRegistrationForManager from "./pages/forManager/ViewRegistrationForManager";
import AuctionResult from "./pages/forManager/AuctionResult";
import ViewNews from "./pages/common/ViewNews";
import ViewNewsForAdmin from "./pages/forAdmin/ViewNewsForAdmin";
import BidderOrganizationDetail from "./pages/forAdmin/BidderOrganizationDetail";
import FakeAuctionDetail from "./pages/biddingFeatures/FakeAuctionDetail";
import ChangePasswordSeller from "./pages/ForSeller/EditProfile";
import ProfileSeller from "./pages/ForSeller/ProfileSeller";
import ProfileManager from "./pages/forManager/Profile";
import ChangePasswordManager from "./pages/forManager/ChangePassword";
import EditManager from "./pages/forAdmin/EditManager";
import EditSeller from "./pages/forAdmin/EditSeller";
import ProfileAdmin from "./pages/forAdmin/ProfileAdmin";
import ChangePasswordAdmin from "./pages/forAdmin/ChangePassword";
import EditProfileAdmin from "./pages/forAdmin/EditProfileAdmin";
import RequireAuth from "./pages/common/RequireAuth";
import { roles } from "./config/rolesConfig";
import Unauthorized from "./pages/error/Unauthorized";
import Layout from "./pages/common/Layout";
import WithdrawForManager from "./pages/forManager/WithdrawForManager";
import ResetPasswordDone from "./pages/forgotPassword/ResetPasswordDone";
function App() {
    return (
        <Routes>
            {/* <Route path="/" element={<Layout />}> */}
            <Route index element={<Homepage />} />
            <Route path="login" element={<Login />} />
            <Route path="homePage/:username" element={<Homepage />} />
            <Route path="homePage" element={<Homepage />} />
            <Route path="register" element={<Register />} />
            <Route path="registerForO" element={<RegisterForO />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* <Route element={<RequireAuth allowedRoles={[roles.ADMIN]} />}> */}
            <Route path="addNew" element={<AddNew />} />
            <Route path="listNews/:index" element={<ListNews />} />
            <Route path="listNews" element={<ListNews />} />
            {/* </Route> */}
            {/* <Route element={<RequireAuth allowedRoles={[roles.MANAGER]} />}></Route>
            <Route element={<RequireAuth allowedRoles={[roles.SELLER]} />}></Route>
            <Route element={<RequireAuth allowedRoles={[roles.BIDDER]} />}></Route> */}

            <Route path="auctionDetail/:id" element={<AuctionDetail />} />
            <Route path="auctionDetail" element={<AuctionDetail />} />
            <Route path="auctionList" element={<AuctionList />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="placeABid" element={<PlaceABid />} />
            {/* <Route path="confirmPayment" element={<ConfirmPayment />} /> */}
            <Route path="paymentResult" element={<PaymentResult />} />
            <Route path="news" element={<News />} />
            <Route path="sellerCenter" element={<SellerCenter />} />
            <Route path="myProperty" element={<MyProperty />} />
            <Route path="addProperty" element={<AddProperty />} />
            <Route path="editProperty/:id" element={<EditProperty />} />
            <Route path="editProperty" element={<EditProperty />} />
            <Route path="propertyDetail" element={<PropertyDetail />} />
            <Route path="propertyDetail/:id" element={<PropertyDetail />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="confirmCode/:email" element={<ConfirmCode />} />
            <Route path="confirmCode" element={<ConfirmCode />} />
            <Route path="resetPasswordDone" element={<ResetPasswordDone />} />
            <Route path="resetPassword/:userId/:passwordResetCode" element={<ResetPassword />} />
            <Route path="newPassword" element={<ResetPassword />} />
            <Route path="myAuctions" element={<MyAuctions />} />
            <Route path="editAuction/:id" element={<EditAuction />} />
            <Route path="editAuction" element={<EditAuction />} />
            <Route path="auctionDetailForSeller/:id" element={<AuctionDetailForSeller />} />
            <Route path="auctionDetailForSeller" element={<AuctionDetailForSeller />} />
            <Route path="auctionListForManager" element={<AuctionsListForManager />} />
            <Route path="auctionDetailForManager" element={<AuctionDetailForManager />} />
            <Route path="auctionDetailForManager/:id" element={<AuctionDetailForManager />} />
            <Route path="approveAuction/:id" element={<ApproveAuction />} />
            <Route path="approveAuction" element={<ApproveAuction />} />
            <Route path="managerCategories" element={<ManagerCategories />} />
            <Route path="addCategory" element={<AddCategory />} />
            <Route path="editCategory/:id" element={<EditCategory />} />
            <Route path="editCategory" element={<EditCategory />} />
            <Route path="listManagers" element={<ListManagers />} />
            <Route path="addManager" element={<AddManager />} />
            <Route path="listSellers" element={<ListSellers />} />
            <Route path="addSeller" element={<AddSeller />} />
            <Route path="listBidders" element={<ListBidders />} />
            <Route path="bidderDetail" element={<BidderDetail />} />
            <Route path="bidderDetail/:id" element={<BidderDetail />} />
            <Route path="editNews/:id" element={<EditNew />} />
            <Route path="editNews" element={<EditNew />} />

            <Route path="viewManager" element={<ViewManager />} />
            <Route path="viewManager/:id" element={<ViewManager />} />
            <Route path="viewSeller" element={<ViewSeller />} />
            <Route path="viewSeller/:id" element={<ViewSeller />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="editProfile" element={<EditProfile />} />
            <Route path="editProfile/:id" element={<EditProfile />} />
            <Route path="profileOrganization" element={<ProfileOrganization />} />
            <Route path="profileOrganization/:id" element={<ProfileOrganization />} />
            <Route path="editProfileOrganization/:id" element={<EditProfileOrganization />} />
            <Route path="editProfileOrganization" element={<EditProfileOrganization />} />
            <Route path="aboutUs" element={<AboutUs />} />
            {/* <Route path="payment/:id" element={<ConfirmPayment />} /> */}
            {/* <Route path="payment/:id" element={<ConfirmPayment />} /> */}
            <Route path="changePassword/:id" element={<ChangePassword />} />
            <Route path="changePassword" element={<ChangePassword />} />
            <Route path="viewBiddingForManager/:id" element={<ViewBiddingForManager />} />
            <Route path="viewRegistrationForManager/:id" element={<ViewRegistrationForManager />} />
            <Route path="viewAuctionResultForManager/:id" element={<AuctionResult />} />
            <Route path="withdrawForManager/:id" element={<WithdrawForManager />} />
            <Route path="viewBiddingForManager" element={<ViewBiddingForManager />} />
            <Route path="viewRegistrationForManager" element={<ViewRegistrationForManager />} />
            <Route path="viewAuctionResultForManager" element={<AuctionResult />} />
            <Route path="viewNews/:id" element={<ViewNews />} />
            <Route path="viewNews" element={<ViewNews />} />
            <Route path="viewNewsForAdmin/:id" element={<ViewNewsForAdmin />} />
            <Route path="viewNewsForAdmin" element={<ViewNewsForAdmin />} />
            <Route path="bidderOrganizationDetail/:id" element={<BidderOrganizationDetail />} />
            <Route path="bidderOrganizationDetail" element={<BidderOrganizationDetail />} />
            {/* <Route path="fakeAuctionDetail/:auctionId" element={<FakeAuctionDetail />} /> */}
            <Route path="profileSeller/:sellerId" element={<ProfileSeller />} />
            <Route path="changePasswordForSeller/:sellerId" element={<ChangePasswordSeller />} />
            <Route path="profileSeller" element={<ProfileSeller />} />
            <Route path="changePasswordForSeller" element={<ChangePasswordSeller />} />
            <Route path="profileManager/:managerId" element={<ProfileManager />} />
            <Route path="changePasswordManager/:managerId" element={<ChangePasswordManager />} />
            <Route path="profileManager" element={<ProfileManager />} />
            <Route path="changePasswordManager" element={<ChangePasswordManager />} />
            <Route path="editManager" element={<EditManager />} />
            <Route path="editManager/:managerId" element={<EditManager />} />
            <Route path="editSeller" element={<EditSeller />} />
            <Route path="editSeller/:id" element={<EditSeller />} />
            <Route path="changePasswordAdmin" element={<ChangePasswordAdmin />} />
            <Route path="changePasswordAdmin/:adminId" element={<ChangePasswordAdmin />} />
            <Route path="profileAdmin" element={<ProfileAdmin />} />
            <Route path="profileAdmin/:adminId" element={<ProfileAdmin />} />
            <Route path="editProfileAdmin/:adminId" element={<EditProfileAdmin />} />
            <Route path="editProfileAdmin" element={<EditProfileAdmin />} />
            {/* </Route> */}
        </Routes>
    );
}

export default App;
