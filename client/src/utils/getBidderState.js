export const getBidderState = (bidInformation, account) => {
    let state = -1;
    // if(bidInformation)
    bidInformation?.map((element) => {
        // console.log("debug");
        // console.log(element.bidder.toLowerCase());
        // console.log(account);
        if (element.bidder.toLowerCase() === account) {
            state = element.bidderState;
        }
    });
    console.log("state", state);
    switch (state) {
        case -1:
            return "NOT_REGISTERED";
        case 0:
            return "BIDDING";
        case 1:
            return "RETRACT";
        case 2:
            return "CANCEL";
        case 3:
            return "WITHDRAW";
        case 4:
            return "PAYMENT";
        default:
            return null;
    }
};
