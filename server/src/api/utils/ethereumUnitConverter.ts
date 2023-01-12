import { ethers } from 'ethers';

const convertEtherToWei = (ether: string) => {
  return ethers.utils.parseEther(ether.toString()).toString();
};

const convertWeiToEther = (wei: string) => {
  return ethers.utils.formatEther(wei).toString();
};

export { convertEtherToWei as parseWei, convertWeiToEther as parseEther };
