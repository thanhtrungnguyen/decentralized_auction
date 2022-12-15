const ContractInteractionService = require("../services/ContractInteractionService");

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
module.exports = { getAuctionInformationById, getRegisteredToBidById, getPlacedBidById };
