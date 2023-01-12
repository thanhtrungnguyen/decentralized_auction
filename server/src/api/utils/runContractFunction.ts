import { ethers } from 'ethers';
import { defaultConfig } from '../../config/constant-variables';
import { config } from '../../config/custom-environment-variables';
import logger from './logger';
import { getEpoch } from './epochConverter';
import { parseWei } from './ethereumUnitConverter';

const provider = new ethers.providers.JsonRpcProvider(config.blockchain.rpcUrl);
const walletWithProvider = new ethers.Wallet(config.blockchain.privateKey, provider);
const contract = new ethers.Contract(defaultConfig.contract.address, defaultConfig.contract.abi, walletWithProvider);

const formatInput = (objectAuction: any) => {
  const startRegistrationTimeEpoch = getEpoch(objectAuction.startRegistrationTime);
  const endRegistrationTimeEpoch = getEpoch(objectAuction.endRegistrationTime);
  const startAuctionTimeEpoch = getEpoch(objectAuction.startAuctionTime);
  const endAuctionTimeEpoch = getEpoch(objectAuction.endAuctionTime);
  const duePaymentTimeEpoch = getEpoch(objectAuction.duePaymentTime);
  const registrationFeeParsed = parseWei(objectAuction.registrationFee);
  const depositAmountParsed = parseWei(objectAuction.depositAmount);
  const startBidParsed = parseWei(objectAuction.startBid);
  const priceStepParsed = parseWei(objectAuction.priceStep);
  return {
    auctionId: objectAuction.auctionId.toString(),
    startRegistrationTime: startRegistrationTimeEpoch.toString(),
    endRegistrationTime: endRegistrationTimeEpoch.toString(),
    startAuctionTime: startAuctionTimeEpoch.toString(),
    endAuctionTime: endAuctionTimeEpoch.toString(),
    duePaymentTime: duePaymentTimeEpoch.toString(),
    registrationFee: registrationFeeParsed.toString(),
    depositAmount: depositAmountParsed.toString(),
    startBid: startBidParsed.toString(),
    priceStep: priceStepParsed.toString()
  };
};

export const createAuctionOnContract = async (objectAuction: any) => {
  try {
    const result = await contract.createAuction(formatInput(objectAuction));
    logger.debug(result);
    return result;
  } catch (error) {
    logger.error(error);
    return error;
  }
};
