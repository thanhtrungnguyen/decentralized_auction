import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MoralisProvider } from "react-moralis"
import { useState } from "react"

import Homepage from "./pages/homepage/Homepage"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import RegisterForO from "./pages/register/RegisterForOrganization"
import ErrorPage from "./pages/errorPage/ErrorPage"
import AuctionDetail from "./pages/auctionDetails/AuctionDetail"
import PlaceABid from "./components/popups/PlaceABid"
import ConfirmPayment from "./pages/confirmPayment/confirmPayment"
import AuctionList from "./pages/auctionList/AuctionList"
import PaymentResult from "./pages/paymentResult/PaymemtResult"
import News from "./pages/news/News"
import SellerCenter from "./pages/ForSeller/SellerCenter"
import MyProperty from "./pages/ForSeller/MyProperty"
import AddProperty from "./pages/ForSeller/AddProperty"
import AuctionDetailForSeller from "./pages/ForSeller/AuctionDetailForSeller"
import EnterEmail from "./pages/forgotPassword/EnterEmail"
import ConfirmCode from "./pages/forgotPassword/ConfirmCode"
import NewPassword from "./pages/forgotPassword/NewPassword"
import MyAuctions from "./pages/ForSeller/MyAuctions"
import EditAuction from "./pages/ForSeller/EditAuction"
import EditProperty from "./pages/ForSeller/EditProperty"
import PropertyDetail from "./pages/ForSeller/PropertyDetail"
import AuctionsListForManager from "./pages/forManager/AuctionsListForManager"
import ApproveAuction from "./pages/forManager/ApproveAuction"
import ManagerCategorys from "./pages/forManager/ManageCategorys"
import AddCategory from "./pages/forManager/AddCategory"
import EditCategory from "./pages/forManager/EditCategory"
import ListManagers from "./pages/forAdmin/ListManagers"
import AddManager from "./pages/forAdmin/AddManager"
import ListSellers from "./pages/forAdmin/ListSellers"
import AddSeller from "./pages/forAdmin/AddSeller"
import ListBidders from "./pages/forAdmin/ListBidders"
import BidderDetail from "./pages/forAdmin/BidderDetail"
import PlaceBidButton from "./pages/bidder/popup"
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
                <Route path="propertyDetail/:id" element={<PropertyDetail />} />
                <Route path="enterEmail" element={<EnterEmail />} />
                <Route path="confirmCode/:email" element={<ConfirmCode />} />
                <Route path="newPassword/:userId/:token" element={<NewPassword />} />
                <Route path="myAuctions" element={<MyAuctions />} />
                <Route path="editAuction/:id" element={<EditAuction />} />
                <Route path="editAuction" element={<EditAuction />} />
                <Route path="autitoDetailForSeller/:id" element={<AuctionDetailForSeller />} />
                <Route path="autitoDetailForSeller" element={<AuctionDetailForSeller />} />
                <Route path="autionsListForManager" element={<AuctionsListForManager />} />
                <Route path="approveAuction/:id" element={<ApproveAuction />} />
                <Route path="approveAuction" element={<ApproveAuction />} />
                <Route path="managerCategorys" element={<ManagerCategorys />} />
                <Route path="addCategory" element={<AddCategory />} />
                <Route path="editCategory/:id" element={<EditCategory />} />
                <Route path="editCategory" element={<EditCategory />} />
                <Route path="listManagers" element={<ListManagers />} />
                <Route path="addManager" element={<AddManager />} />
                <Route path="listSellers" element={<ListSellers />} />
                <Route path="addSeller" element={<AddSeller />} />
                <Route path="listBidders" element={<ListBidders />} />
                <Route path="bidderDetail" element={<AddSeller />} />
                <Route path="bidderDetail/:id" element={<AddSeller />}></Route>
                {/* test */}
                {/* <MoralisProvider initializeOnMount={false}> */}
                <Route path="BidPopup" element={<PlaceBidButton />} />
                {/* </MoralisProvider> */}
                {/* test */}
                <Route path="bidderDetail/auc/:id" element={<AddSeller />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
