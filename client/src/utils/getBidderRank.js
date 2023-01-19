import Decimal from "decimal.js";

import { parseEther, parseWei } from "./ethereumUnitConverter";

const getBidAmountOfBidder = (bidInformation, account) => {
    bidInformation?.map((element) => {
        if (element.bidder.toLowerCase() === account) {
            if (element.bidderState === 0) {
                return new Decimal(parseEther(element.bidAmount));
            }
        }
    });
    return null;
};

const getListValidBidAmount = (bidInformation) => {
    let list = [];
    bidInformation?.map((element) => {
        if (element.bidderState === 0) {
            list.push(new Decimal(parseEther(element.bidAmount)));
        }
    });
    return list;
};

export const getBidderRank = (bidInformation, account) => {
    const bidAmount = getBidAmountOfBidder(bidInformation, account);
    const listBidAmount = getListValidBidAmount(bidInformation);
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
