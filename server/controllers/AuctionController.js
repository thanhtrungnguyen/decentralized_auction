import Auction from "../models/Auction.js";
import AuctionBidder from "../models/AuctionBidder.js";
import Property from "../models/Property.js";


export const createAuction = async (req, res, next) => {
    const newAuction = new Auction(req.body);

    try {
        const savedAuction = await newAuction.save();
        res.status(200).json(savedAuction);

    } catch (error) {
        next(error);
    }
}

export const updateAuction = async (req, res, next) => {
    

    try {
        const updateAuction = await Auction.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true });
        res.status(200).json(updateAuction);

    } catch (error) {
        next(error);
    }
}

export const createLot = async (req, res, next) => {
    const newLot = new Lot(req.body.PropertyId);

    try {
        const savedLot = await newLot.save();

        const auctionLot = new AuctionLot({
            AuctionId:req.body.AuctionId,
            LotId: savedLot._id,
            ContractAddress:req.body.ContractAddress
        });
        await auctionLot.save();

        res.status(200).json(savedLot);

    } catch (error) {
        next(error);
    }
}

export const getAllAuction = async (req, res, next) => {
    

    try {
        const auctions = await Auction.find();

        res.status(200).json(auctions);

    } catch (error) {
        next(error);
    }
}

export const getAuctionDetailByID = async (req, res, next) => {
    

    try {
        const auction = await Auction.findById(req.params.id);
        const properties = await Property.findById(auction.PropertyId);

        res.status(200).json({
            auction: auction,
            property:properties
        });

    } catch (error) {
        next(error);
    }
}



//add BidderAuction


export const addBidderAuction = async (req, res, next ) => {
    try {
         const ab = new AuctionBidder(req.body);

         const newBidderAuction = await ab.save();
    } catch (error) {
       next(error); 
    }
}