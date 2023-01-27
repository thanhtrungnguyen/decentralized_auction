const { ethers } = require("ethers");

const convertEtherToWei = (ether) => {
    return ethers.utils.parseEther(ether.toString()).toString();
};

const convertWeiToEther = (wei) => {
    return ethers.utils.formatEther(wei).toString();
};

module.exports = { parseWei: convertEtherToWei, parseEther: convertWeiToEther };
