import { Router } from 'express';
import { z } from 'zod';
import { ridexService } from '../services/ridex';
import { syncRidexCatalog } from '../services/catalogSync';
import { prisma } from '../lib/prisma';

export const ridexRouter = Router();

/**
 * GET: Fetch articles directly from RIDEX (live)
 */
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

/**
 * POST: Fetch articles by numbers
 */
ridexRouter.post('/articles/by-numbers', async (req, res, next) => {
  try {
    const schema = z.object({
      articleNo: z.array(z.string()).min(1)
    });

    const { articleNo } = schema.parse(req.body);
    const data = await ridexService.getArticlesByNumbers(articleNo);

    res.json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * POST: Get detailed article info
 */
ridexRouter.post('/articles/info', async (req, res, next) => {
  try {
    const schema = z.object({
      articleNo: z.array(z.string()).min(1),
      page: z.number().optional()
    });

    const { articleNo, page } = schema.parse(req.body);

    const data = await ridexService.getArticleInfo(
      articleNo,
      page || 1
    );

    res.json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * POST: Create order via RIDEX
 */
ridexRouter.post('/orders', async (req, res, next) => {
  try {
    const schema = z.object({
      deliveryType: z.number(),
      items: z.array(
        z.object({
          articleNo: z.string(),
          qty: z.number().int().positive()
        })
      ).min(1)
    });

    const payload = schema.parse(req.body);

    const data = await ridexService.createOrder(payload);

    res.json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * 🔥 NEW: Sync RIDEX catalog into DB
 */
ridexRouter.post('/sync', async (req, res, next) => {
  try {
    const pages = Number(req.body?.pages || 1);

    const result = await syncRidexCatalog(pages);

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    next(error);
  }
});

/**
 * 🔥 NEW: Get stored products from DB
 */
ridexRouter.get('/stored-products', async (_req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        supplierProducts: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
});

/**
 * 🔥 NEW: Get single product by slug
 */
ridexRouter.get('/stored-products/:slug', async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug: req.params.slug
      },
      include: {
        supplierProducts: true
      }
    });

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
});