import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import contractAbi from "./constants/contractAbi.json" assert { type: "json" };

try {
  const API_KEY =
    "OwDURRfNuYgUoJDjItRpJK7XO8RCBuzW0bEUwQJjtR8A6ppx9KoJZy3CP6MSmKhc";

  const CHAIN_ID = EvmChain.GOERLI;

  const CONTRACT_ABI = contractAbi;

  const CONTRACT_ADDRESS = "0xaf87d5EF22D5d5f1f6C7983236E9D8AA6D681b50";

  const FUNCTION_NAME = "getListAuctionId";

  await Moralis.start({
    apiKey: API_KEY,
  });

  const response = await Moralis.EvmApi.utils.runContractFunction({
    abi: CONTRACT_ABI,
    functionName: FUNCTION_NAME,
    address: CONTRACT_ADDRESS,
    chain: CHAIN_ID,
  });

  console.log(response?.result);
} catch (e) {
  console.error(e);
}
