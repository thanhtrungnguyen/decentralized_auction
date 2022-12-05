const { clientContractsFile, clientAbiFile } = require("../helper-hardhat-config")
const fs = require("fs")
const { network } = require("hardhat")

module.exports = async () => {
    if (process.env.UPDATE_CLIENT) {
        console.log("Writing to client...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Client end written!")
    }
}

updateAbi = async () => {
    const auction = await ethers.getContract("Auction")
    fs.writeFileSync(clientAbiFile, auction.interface.format(ethers.utils.FormatTypes.json))
}

updateContractAddresses = async () => {
    const auction = await ethers.getContract("Auction")
    const contractAddresses = JSON.parse(fs.readFileSync(clientContractsFile, "utf8"))
    if (network.config.chainId.toString() in contractAddresses) {
        if (!contractAddresses[network.config.chainId.toString()].includes(auction.address)) {
            contractAddresses[network.config.chainId.toString()].push(auction.address)
        }
    } else {
        contractAddresses[network.config.chainId.toString()] = [auction.address]
    }
    fs.writeFileSync(clientContractsFile, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "client"]
