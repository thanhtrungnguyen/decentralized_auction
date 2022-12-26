import { ethers } from "ethers";

const convertEtherToWei = (ether) => {
    return ethers.utils.parseEther(ether.toString()).toString();
};

const convertWeiToEther = (wei) => {
    return ethers.utils.formatEther(wei).toString();
};

export default { parseWei: convertEtherToWei, parseEther: convertWeiToEther };
