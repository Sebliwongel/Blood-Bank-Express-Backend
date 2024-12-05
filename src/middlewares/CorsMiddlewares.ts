// corsMiddleware.ts
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true, 
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
