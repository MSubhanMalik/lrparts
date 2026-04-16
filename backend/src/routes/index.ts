import { Router } from 'express';
import { healthRouter } from './health';
import { ridexRouter } from './ridex';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/ridex', ridexRouter);
