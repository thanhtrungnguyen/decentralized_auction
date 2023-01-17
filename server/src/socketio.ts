import socketio from 'socket.io';
import { Server } from 'socket.io';
import http from 'http';
import { config } from './config/custom-environment-variables';
import cron from 'node-cron';
import logger from './api/utils/logger';
import { getAllAuctions, updateAuction } from './api/services/AuctionService';
import { updateProperty } from './api/services/PropertyService';

export const connectSocket = (app: any) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: config.client.address,
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
      credentials: true
    }
  });
  io.on('connection', (socket) => {});
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
          await updateProperty({ _id: auction.property._id }, { status: 'RegistrationTime' }, { new: true });
          i = i + 1;
          io.emit('data', i);
        }
      }
      if (currentTime - timeEndRegistrationFN > 0 && currentTime - timeStartAuctionFN < 0) {
        if (auction.status != 'UpcomingforBid') {
          await updateAuction({ _id: auction._id }, { status: 'UpcomingforBid' }, { new: true });
          await updateProperty({ _id: auction.property._id }, { status: 'UpcomingforBid' }, { new: true });
          i = i + 1;
          io.emit('data', i);
        }
      }

      if (currentTime - timeStartAuctionFN >= 0 && currentTime - timeEndAuctionFN <= 0) {
        if (auction.status != 'Bidding') {
          await updateAuction({ _id: auction._id }, { status: 'Bidding' }, { new: true });
          await updateProperty({ _id: auction.property._id }, { status: 'Bidding' }, { new: true });

          i = i + 1;
          io.emit('data', i);
        }
      }

      if (currentTime - timeEndAuctionFN > 0 && currentTime - duePaymentTimeFN <= 0) {
        if (auction.status != 'Closed') {
          await updateAuction({ _id: auction._id }, { status: 'Closed' }, { new: true });
          await updateProperty({ _id: auction.property._id }, { status: 'Closed' }, { new: true });

          i = i + 1;
          io.emit('data', i);
        }
      }
    });
  });
  taskRegistrationTime.start();

  // transaction.start();
  server.listen(config.server.port, async () => {
    logger.info(`Server is running at http://localhost:${config.server.port}`);
  });
};
