import contractAbi from "../constants/contractAbi.json";
import contractAddresses from "../constants/contractAddress.json";

const SUPPORT_CHAIN = ["5"];
const CHAIN_ID = "5";
const CONTRACT_ABI = contractAbi;
const CONTRACT_ADDRESS = contractAddresses[CHAIN_ID][contractAddresses[CHAIN_ID].length - 1];

export { SUPPORT_CHAIN, CHAIN_ID, CONTRACT_ABI, CONTRACT_ADDRESS };
