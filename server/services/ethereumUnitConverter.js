const { ethers } = require("ethers");

const convertEtherToWei = (ether) => {
    return parseInt(ethers.utils.parseEther(ether.toString()));
};

const convertWeiToEther = (wei) => {
    return parseFloat(ethers.utils.formatEther(wei));
};

module.exports = { parseWei: convertEtherToWei, parseEther: convertWeiToEther };
