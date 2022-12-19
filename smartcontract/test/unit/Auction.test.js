const { assert, expect } = require("chai");
const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");
const { getEpoch, getHumanReadableTime } = require("../../utils/timeConverter");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Auction Unit Tests", () => {
          let auction, auctionContract;
          const currentDate = new Date().getTime();
          beforeEach(async () => {
              accounts = await ethers.getSigners();
              deployer = accounts[0];
              user = accounts[1];
              await deployments.fixture(["all"]);
              auctionContract = await ethers.getContract("Auction");
              auction = auctionContract.connect(deployer);
          });
          describe("createAuction", () => {
              it("emits an event after create an auction", async () => {
                  const auctionId = 1;
                  const startRegistrationTime = getEpoch("December 6, 2023 17:15:00");
                  const endRegistrationTime = getEpoch("December 6, 2023 18:16:00");
                  const startAuctionTime = getEpoch("December 6, 2023 19:17:00");
                  const endAuctionTime = getEpoch("December 6, 2023 20:18:00");
                  const duePaymentTime = getEpoch("December 6, 2023 21:19:00");
                  const registrationFee = 10;
                  const depositAmount = 200;
                  const startBid = 500;
                  const priceStep = 1;
                  expect(
                      await auction.createAuction(
                          auctionId,
                          startRegistrationTime,
                          endRegistrationTime,
                          startAuctionTime,
                          endAuctionTime,
                          duePaymentTime,
                          registrationFee,
                          depositAmount,
                          startBid,
                          priceStep
                      )
                  ).to.emit("CreatedAuction");
              });
              it("reverts when entering invalid start registration time", async () => {
                  const auctionId = 2;
                  const startRegistrationTime = getEpoch("December 1, 2022 17:15:00");
                  const endRegistrationTime = getEpoch("December 6, 2023 18:16:00");
                  const startAuctionTime = getEpoch("December 6, 2023 19:17:00");
                  const endAuctionTime = getEpoch("December 6, 2023 20:18:00");
                  const duePaymentTime = getEpoch("December 6, 2023 21:19:00");
                  const registrationFee = 10;
                  const depositAmount = 200;
                  const startBid = 500;
                  const priceStep = 1;
                  await expect(
                      auction.createAuction(
                          auctionId,
                          startRegistrationTime,
                          endRegistrationTime,
                          startAuctionTime,
                          endAuctionTime,
                          duePaymentTime,
                          registrationFee,
                          depositAmount,
                          startBid,
                          priceStep
                      )
                  ).to.be.revertedWith("Auction__InvalidRegistrationTime");
              });
          });
      });
