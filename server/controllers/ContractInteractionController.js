const ContractInteractionService = require("../services/ContractInteractionService");
const AuctionRegistrationService = require("../services/AuctionRegistrationService");
const getAuctionInformationById = async (req, res) => {
    if (req.params.auctionId) {
        const id = req.params.auctionId;
        ContractInteractionService.getAuctionInformationById(id)
            .then((data) => {
                if (!data) {
                    res.status(404).send({ message: `Not found auction with id ${id}` });
                } else {
                    res.status(200).send(data);
                }
            })
            .catch((error) => {
                res.status(500).send({ message: `Error retrieving auction with ${id} - Error: ${error}` });
            });
    }
};

const getRegisteredToBidById = async (req, res) => {
    if (req.params.auctionId) {
        const id = req.params.auctionId;
        ContractInteractionService.getRegisteredToBidById(id)
            .then((data) => {
                if (!data) {
                    res.status(404).send({ message: `Not found auction with id ${id}` });
                } else {
                    res.status(200).send(data);
                }
            })
            .catch((error) => {
                res.status(500).send({ message: `Error retrieving auction with ${id} - Error: ${error}` });
            });
    }
};

const getPlacedBidById = async (req, res) => {
    if (req.params.auctionId) {
        const id = req.params.auctionId;
        ContractInteractionService.getPlacedBidById(id)
            .then((data) => {
                if (!data) {
                    res.status(404).send({ message: `Not found auction with id ${id}` });
                } else {
                    res.status(200).send(data);
                }
            })
            .catch((error) => {
                res.status(500).send({ message: `Error retrieving auction with ${id} - Error: ${error}` });
            });
    }
};

const findByAuctionId = async (req, res) => {
    if (req.params.auctionId) {
        const id = req.params.auctionId;
        AuctionRegistrationService.findByAuctionId(id)
            .then((data) => {
                if (!data) {
                    res.status(404).send({ message: `Not found auction with id ${id}` });
                } else {
                    res.status(200).send(data);
                }
            })
            .catch((error) => {
                res.status(500).send({ message: `Error retrieving auction with ${id} - Error: ${error}` });
            });
    }
};

const createAuctionRegistration = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Auction registration can not be empty!" });
        return;
    }
    const auctionRegistration = {
        auctionId: req.body.auctionId,
        bidderId: req.body.bidderId,
        wallet: req.body.wallet,
    };
    AuctionRegistrationService.createAuctionRegistration(auctionRegistration);
};

module.exports = { getAuctionInformationById, getRegisteredToBidById, getPlacedBidById, findByAuctionId, createAuctionRegistration };
