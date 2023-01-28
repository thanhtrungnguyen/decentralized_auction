import { allowedOrigins } from './allowed-origins';

export const corsOptions = {
  // origin: allowedOrigins,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
};
