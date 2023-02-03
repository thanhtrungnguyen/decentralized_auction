import socketio from 'socket.io';
import { Server } from 'socket.io';
import http from 'http';
import { config } from './config/custom-environment-variables';
import cron from 'node-cron';
import logger from './api/utils/logger';
import { getAllAuctions, updateAuction } from './api/services/AuctionService';
import { updateProperty, updatePropertyStatus } from './api/services/PropertyService';
import { getCountPlacedBidAndRetracted, getHighestBidByAuctionId } from './api/services/ContractInteractionService';
import { corsOptions } from './config/cors-options';

export const connectSocket = (app: any) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: corsOptions
  });
  var auctionIdgetBid = '';
  io.on('connection', (socket) => {
    socket.on('send_message', async (data) => {
      var highest: any;
      highest = await getHighestBidByAuctionId(data?.auctionId);
      auctionIdgetBid = data?.auctionId;
      socket.emit('receive_message', { auction: data?.auctionId, highest: highest });
    });
  });
  const taskUpdateHighestBid = cron.schedule('*/3 * * * * *', async () => {
    if (auctionIdgetBid != '') {
      var highest: any;
      highest = await getHighestBidByAuctionId(auctionIdgetBid);
      io.emit('receive_message', { auction: auctionIdgetBid, highest: highest });
    }
  });
  taskUpdateHighestBid.start();
  io.on('error', (err) => {
    console.log('Caught flash policy server socket error: ');
    console.log(err.stack);
  });

  var i = 0;
  const taskRegistrationTime = cron.schedule('*/3 * * * * *', async () => {
    const auctions = await getAllAuctions();
    auctions?.map(async (auction) => {
      var currentTime = new Date().getTime();
      var timeStartRegistrationFN = new Date(auction.startRegistrationTime).getTime();
      var timeEndRegistrationFN = new Date(auction.endRegistrationTime).getTime();
      var timeStartAuctionFN = new Date(auction.startAuctionTime).getTime();
      var timeEndAuctionFN = new Date(auction.endAuctionTime).getTime();
      var duePaymentTimeFN = new Date(auction.duePaymentTime).getTime();

      if (currentTime - timeStartRegistrationFN >= 0 && currentTime - timeEndRegistrationFN <= 0) {
        if (auction.status != 'RegistrationTime') {
          await updateAuction({ _id: auction._id }, { status: 'RegistrationTime' }, { new: true });
          await updatePropertyStatus({ _id: auction.property._id }, { status: 'RegistrationTime' }, { new: true });
          i = i + 1;
          io.emit('data', i);
        }
      }
      if (currentTime - timeEndRegistrationFN > 0 && currentTime - timeStartAuctionFN < 0) {
        if (auction.status != 'UpcomingForBid') {
          await updateAuction({ _id: auction._id }, { status: 'UpcomingForBid' }, { new: true });
          await updatePropertyStatus({ _id: auction.property._id }, { status: 'UpcomingForBid' }, { new: true });
          i = i + 1;
          io.emit('data', i);
        }
      }

      if (currentTime - timeStartAuctionFN >= 0 && currentTime - timeEndAuctionFN <= 0) {
        if (auction.status != 'Bidding') {
          await updateAuction({ _id: auction._id }, { status: 'Bidding' }, { new: true });
          await updatePropertyStatus({ _id: auction.property._id }, { status: 'Bidding' }, { new: true });

          i = i + 1;
          io.emit('data', i);
        }
      }

      if (currentTime - timeEndAuctionFN > 0 && currentTime - duePaymentTimeFN <= 0) {
        if (auction.status != 'Closed') {
          await updateAuction({ _id: auction._id }, { status: 'Closed' }, { new: true });
          await updatePropertyStatus({ _id: auction.property._id }, { status: 'Closed' }, { new: true });

          i = i + 1;
          io.emit('data', i);
        }
      }
    });
  });
  taskRegistrationTime.start();

  var countUpdated: number | undefined;
  const taskUpdateBiddingAndRetracted = cron.schedule('*/3 * * * * *', async () => {
    var count = await getCountPlacedBidAndRetracted();
    if (countUpdated != count) {
      countUpdated = count;
      io.emit('count', count);
    }
  });
  taskUpdateBiddingAndRetracted.start();
  // transaction.start();
  server.listen(config.server.port, async () => {
    logger.info(`Server is running at http://localhost:${config.server.port}`);
  });
};
