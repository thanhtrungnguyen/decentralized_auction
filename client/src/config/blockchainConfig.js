import contractAbi from "../constants/contractAbi.json";
import contractAddresses from "../constants/contractAddress.json";

const SUPPORT_CHAINS = ["5"];
const CHAIN_ID = "5";
const CONTRACT_ABI = contractAbi;
const CONTRACT_ADDRESS = contractAddresses[CHAIN_ID][contractAddresses[CHAIN_ID].length - 1];
const GOERLI_TEST_NETWORK = "https://goerli.infura.io/v3/";
const MORALIS_API_KEY = "OwDURRfNuYgUoJDjItRpJK7XO8RCBuzW0bEUwQJjtR8A6ppx9KoJZy3CP6MSmKhc";

export { SUPPORT_CHAINS, CHAIN_ID, CONTRACT_ABI, CONTRACT_ADDRESS, GOERLI_TEST_NETWORK, MORALIS_API_KEY };
