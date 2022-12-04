import express from "express";
import { createAuction,  getAllAuction, getAuctionDetailByID, updateAuction, uploadImage , approveAuction, rejectAuction} from "../controllers/AuctionController.js";
import { verifySeller } from "../utils/verifyToken.js";

const router = express.Router();


router.post("/", createAuction);

router.put("/approve/:id", approveAuction);

router.put("/reject/:id", rejectAuction);

router.put("/:id", verifySeller ,updateAuction);

router.get("/",  getAllAuction);

router.get("/auctiondetail/:auctionId/:propertyId",  getAuctionDetailByID);

router.get('/images/:key', uploadImage)




export default router