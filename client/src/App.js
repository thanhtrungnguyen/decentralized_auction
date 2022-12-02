import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import RegisterForO from "./pages/register/RegisterForOrganization";
import ErrorPage from "./pages/errorPage/ErrorPage";
import AuctionDetail from "./pages/auctionDetails/AuctionDetail";
import { useState } from "react";
import PlaceABid from "./components/popups/PlaceABid";
import ConfirmPayment from "./pages/confirmPayment/confirmPayment";
import AuctionList from "./pages/auctionList/AuctionList";
import PaymentResult from "./pages/paymentResult/PaymemtResult";
import News from "./pages/news/News";
import SellerCenter from "./pages/ForSeller/SellerCenter";
import MyProperty from "./pages/ForSeller/MyProperty";
import AddProperty from "./pages/ForSeller/AddProperty";
import AuctionDetailForSeller from "./pages/ForSeller/AuctionDetailForSeller";
import EnterEmail from "./pages/forgotPassword/EnterEmail";
import ConfirmCode from "./pages/forgotPassword/ConfirmCode";
import NewPassword from "./pages/forgotPassword/NewPassword";
import MyAuctions from "./pages/ForSeller/MyAuctions";
import EditAuction from "./pages/ForSeller/EditAuction";
import EditProperty from "./pages/ForSeller/EditProperty";
import PropertyDetail from "./pages/ForSeller/PropertyDetail";
import AuctionsListForManager from "./pages/forManager/AuctionsListForManager";
import ApproveAuction from "./pages/forManager/ApproveAuction";
// import axios from "axios";
// axios.defaults.withCredentials = true;
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="registerForO" element={<RegisterForO />} />
        <Route path="auctionDetail/:id" element={<AuctionDetail />} />
        <Route path="auctionList" element={<AuctionList />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="placeABid" element={<PlaceABid />} />
        <Route path="confirmPayment" element={<ConfirmPayment />} />
        <Route path="paymentResult" element={<PaymentResult />} />
        <Route path="news" element={<News />} />
        <Route path="sellerCenter" element={<SellerCenter />} />
        <Route path="myProperty" element={<MyProperty />} />
        <Route path="addProperty" element={<AddProperty />} />
        <Route path="editProperty/:id" element={<EditProperty />} />
        <Route path="editProperty" element={<EditProperty />} />
        <Route path="propertyDetail" element={<PropertyDetail />} />
        <Route path="propertyDetail:id" element={<PropertyDetail />} />
        <Route path="enterEmail" element={<EnterEmail />} />
        <Route path="confirmCode/:email" element={<ConfirmCode />} />
        <Route path="newPassword/:email" element={<NewPassword />} />
        <Route path="myAuctions" element={<MyAuctions />} />
        <Route path="editAuction/:id" element={<EditAuction />} />
        <Route path="editAuction" element={<EditAuction />} />
        <Route
          path="autitoDetailForSeller/:id"
          element={<AuctionDetailForSeller />}
        />
        <Route
          path="autitoDetailForSeller"
          element={<AuctionDetailForSeller />}
        />
        <Route
          path="autionsListForManager"
          element={<AuctionsListForManager />}
        />
        <Route path="approveAuction/:id" element={<ApproveAuction />} />
        <Route path="approveAuction" element={<ApproveAuction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
