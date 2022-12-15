const {
    clientContractsFile,
    clientAbiFile,
    serverContractsFile,
    serverAbiFile,
} = require("../helper-hardhat-config")
const fs = require("fs")
const { network } = require("hardhat")

module.exports = async () => {
    if (process.env.UPDATE_CLIENT) {
        console.log("Writing to client and server...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Written to file on client and server!")
    }
}

updateAbi = async () => {
    const auction = await ethers.getContract("Auction")
    fs.writeFileSync(clientAbiFile, auction.interface.format(ethers.utils.FormatTypes.json))
    fs.writeFileSync(serverAbiFile, auction.interface.format(ethers.utils.FormatTypes.json))
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
    fs.writeFileSync(serverContractsFile, JSON.stringify(contractAddresses))
}
module.exports.tags = ["all", "client", "server"]
