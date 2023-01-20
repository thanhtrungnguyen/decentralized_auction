import Decimal from "decimal.js";

import { parseEther, parseWei } from "./ethereumUnitConverter";

const getBidAmountOfBidder = (bidInformation, account) => {
    bidInformation?.map((element) => {
        if (element.bidder.toLowerCase() === account) {
            if (element.bidderState === 0) {
                return parseEther(element.bidAmount);
            }
        }
    });
    return -1;
};

const getListValidBidAmount = (bidInformation) => {
    let list = [];
    bidInformation?.map((element) => {
        if (element.bidderState === 0) {
            console.log(parseEther(element.bidAmount));
            list.push(parseEther(element.bidAmount));
        }
    });
    return list;
};

export const getBidderRank = (bidInformation, account) => {
    debugger;
    const bidAmount = getBidAmountOfBidder(bidInformation, account);
    const listBidAmount = getListValidBidAmount(bidInformation);
    if (bidAmount == null || listBidAmount.length === 0) return -2;
    let rank = 1;
    for (let i = 0; i < listBidAmount.length; i++) {
        const result = bidAmount.compareTo(listBidAmount[i]);
        console.log(result);
        if (bidAmount.compareTo(listBidAmount[i]) === 1) {
            rank++;
        }
    }
    return rank;
};
