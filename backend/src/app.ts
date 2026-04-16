import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { apiRouter } from './routes';
import { env } from './lib/env';

export function createApp() {
  const app = express();

  app.use(cors({ origin: env.frontendUrl, credentials: true }));
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(express.json());

  app.get('/', (_req, res) => {
    res.json({ name: 'LR Parts API', status: 'ok' });
  });

  app.use('/api', apiRouter);

  app.use((error: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const status = error?.status || error?.response?.status || 500;
    res.status(status).json({
      message: error?.message || 'Unexpected error',
      details: error?.response?.data || null
    });
  });

  return app;
}
