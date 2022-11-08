import express from "express";
import { createAuction, createLot, getAllAuction, getAuctionDetailByID, updateAuction } from "../controllers/AuctionController.js";
import { verifySeller } from "../utils/verifyToken.js";

const router = express.Router();


router.post("/", verifySeller ,createAuction);


router.put("/:id", verifySeller ,updateAuction);

router.get("/",  getAllAuction);

router.get("/auctiondetail/:id",  getAuctionDetailByID);



router.post("/lot/",  createLot);


export default router