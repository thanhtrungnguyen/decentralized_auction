import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import RegisterForO from "./pages/register/RegisterForOrganization";
import NoPage from "./pages/noPage/NoPage";
import AuctionDetail from "./pages/auctionDetails/AuctionDetail";
import { useState } from "react";
import PlaceABid from "./components/popups/PlaceABid";
import ConfirmPayment from "./pages/confirmPayment/confirmPayment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="registerForO" element={<RegisterForO />} />
        <Route path="auctionDetail/:id" element={<AuctionDetail />} />
        <Route path="*" element={<NoPage />} />
        <Route path="placeABid" element={<PlaceABid />} />
        <Route path="confirmPayment" element={<ConfirmPayment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
