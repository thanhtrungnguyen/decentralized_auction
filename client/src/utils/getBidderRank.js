import Decimal from "decimal.js";

import { parseEther, parseWei } from "./ethereumUnitConverter";

export const getBidAmountOfBidder = (bidInformation, account) => {
    let amount = -1;
    bidInformation?.map((element) => {
        if (element.bidder.toLowerCase() === account) {
            if (element.bidderState === 0 || element.bidderState === 2 || element.bidderState === 3 || element.bidderState === 4) {
                amount = parseEther(element.bidAmount);
            }
        }
    });
    return amount;
};

const getListValidBidAmount = (bidInformation) => {
    let list = [];
    bidInformation?.map((element) => {
        if (element.bidderState === 0 || element.bidderState === 2 || element.bidderState === 3 || element.bidderState === 4) {
            list.push(parseEther(element.bidAmount));
        }
    });
    return list;
};

export const getBidderRank = (bidInformation, account) => {
    const bidAmount = getBidAmountOfBidder(bidInformation, account);
    const listBidAmount = getListValidBidAmount(bidInformation);
    if (bidAmount == null || listBidAmount.length === 0) return -2;
    let rank = 1;
    for (let i = 0; i < listBidAmount.length; i++) {
        if (new Decimal(listBidAmount[i]).comparedTo(new Decimal(bidAmount)) === 1) {
            rank++;
        }
    }
    return rank;
};

export const getHighestBid = (bidInformation) => {
    let highest = 0;
    bidInformation?.map((element) => {
        if (element.bidderState === 0 || element.bidderState === 2 || element.bidderState === 3 || element.bidderState === 4) {
            const amount = parseFloat(parseEther(element.bidAmount));
            if (highest < amount) {
                highest = amount;
            }
        }
    });
    return highest;
};
