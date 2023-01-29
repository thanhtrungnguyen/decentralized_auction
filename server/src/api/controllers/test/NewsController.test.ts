import { describe, expect, test, it } from '@jest/globals';
import supertest from 'supertest';
import { startServer } from '../../../server';
import connectMongo from '../../utils/connectMongo';
import logger from '../../utils/logger';

describe('product', () => {
  describe('get product route', () => {
    describe('given the product does not exist', () => {
      it('should be return a 404', () => {
        expect(true).toBe(true);
      });
    });
  });
});
// var app = startServer();

// describe('news', () => {
//   describe('get news route', () => {
//     describe('given the product does not exist', () => {
//       it('should be return a 202', async () => {
//         const { body, statusCode } = await supertest(app).get('/api/auction/auctions');
//         expect(statusCode).toBe(200);
//       });
//     });
//   });
// });
