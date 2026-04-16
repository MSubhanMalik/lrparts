import { Router } from 'express';
import { z } from 'zod';
import { ridexService } from '../services/ridex';

export const ridexRouter = Router();

ridexRouter.get('/articles', async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 50);
    const data = await ridexService.getArticles(page, limit);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

ridexRouter.post('/articles/by-numbers', async (req, res, next) => {
  try {
    const schema = z.object({ articleNo: z.array(z.string()).min(1) });
    const { articleNo } = schema.parse(req.body);
    const data = await ridexService.getArticlesByNumbers(articleNo);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

ridexRouter.post('/articles/info', async (req, res, next) => {
  try {
    const schema = z.object({ articleNo: z.array(z.string()).min(1), page: z.number().optional() });
    const { articleNo, page } = schema.parse(req.body);
    const data = await ridexService.getArticleInfo(articleNo, page || 1);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

ridexRouter.post('/orders', async (req, res, next) => {
  try {
    const schema = z.object({
      deliveryType: z.number(),
      items: z.array(z.object({ articleNo: z.string(), qty: z.number().int().positive() })).min(1)
    });
    const payload = schema.parse(req.body);
    const data = await ridexService.createOrder(payload);
    res.json(data);
  } catch (error) {
    next(error);
  }
});
