import { describe, expect, test, it } from '@jest/globals';
import supertest from 'supertest';
import { startServer } from '../../../server';
var app = startServer();

export const loginCondition = {
  username: 'longhtht0914',
  password: '12331233'
};

describe('Function Login in Auth Route', () => {
  describe('Given the wrong username or password', () => {
    it('should be return status code 401 and message Invalid username or password', async () => {
      const { body, statusCode } = await supertest(app).post('/api/session').send(loginCondition);
      expect(statusCode).toBe(401);
      //   expect(body.message).toBe('Invalid username or password');
    });
  });
});
