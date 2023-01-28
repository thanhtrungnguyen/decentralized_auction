import { allowedOrigins } from './allowed-origins';

export const corsOptions = {
  // origin: allowedOrigins,
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
};
