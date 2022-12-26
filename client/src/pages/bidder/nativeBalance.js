import Moralis from "moralis";
import { MORALIS_API_KEY } from "../../config/configuration";

export async function getNativeBalanceOfBidder(walletAddress) {
    await Moralis.start({ apiKey: MORALIS_API_KEY });

    const response = await Moralis.EvmApi.account.getNativeBalance({
        address: walletAddress,
        chain: "goerli",
    });

    return response;
}
