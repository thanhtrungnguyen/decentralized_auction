import { ethers } from 'ethers';
import { defaultConfig } from '../../config/constant-variables';
import { config } from '../../config/custom-environment-variables';

const provider = new ethers.providers.JsonRpcProvider(config.blockchain.rpcUrl);
const walletWithProvider = new ethers.Wallet(config.blockchain.privateKey, provider);
const contract = new ethers.Contract(defaultConfig.contract.address, defaultConfig.contract.abi, walletWithProvider);

// const format
