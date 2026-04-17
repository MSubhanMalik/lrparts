import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { ridexService } from './ridex';

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

type BaseArticle = {
  ArticleId?: number;
  Name: string;
  ArticleNo: string;
  Price?: number;
  Unit?: number;
  Quantity?: number;
};

export async function syncRidexCatalog(pages = 1) {
  const syncRun = await prisma.syncRun.create({
    data: {
      supplier: 'RIDEX',
      status: 'running'
    }
  });

  try {
    let totalRead = 0;
    let totalSaved = 0;

    for (let page = 1; page <= pages; page++) {
      const response = await ridexService.getArticles(page, 100);
      const articles: BaseArticle[] = response?.data || response || [];

      if (!Array.isArray(articles) || articles.length === 0) break;

      totalRead += articles.length;

      for (const article of articles) {
        const slug = slugify(`${article.Name}-${article.ArticleNo}`);

        const product = await prisma.product.upsert({
          where: { slug },
          update: {
            name: article.Name,
            sku: article.ArticleNo,
            brand: 'RIDEX'
          },
          create: {
            slug,
            name: article.Name,
            sku: article.ArticleNo,
            brand: 'RIDEX'
          }
        });

        await prisma.supplierProduct.upsert({
          where: { articleNo: article.ArticleNo },
          update: {
            supplierName: 'RIDEX',
            supplierArticleId: article.ArticleId || null,
            supplierProductName: article.Name,
            price: article.Price != null ? new Prisma.Decimal(article.Price) : null,
            quantity: article.Quantity || 0,
            unit: article.Unit || null,
            productId: product.id,
            rawJson: article,
            lastSyncedAt: new Date()
          },
          create: {
            supplierName: 'RIDEX',
            articleNo: article.ArticleNo,
            supplierArticleId: article.ArticleId || null,
            supplierProductName: article.Name,
            price: article.Price != null ? new Prisma.Decimal(article.Price) : null,
            quantity: article.Quantity || 0,
            unit: article.Unit || null,
            productId: product.id,
            rawJson: article,
            lastSyncedAt: new Date()
          }
        });

        totalSaved++;
      }
    }

    await prisma.syncRun.update({
      where: { id: syncRun.id },
      data: {
        status: 'completed',
        finishedAt: new Date(),
        totalRead,
        totalSaved
      }
    });

    return { totalRead, totalSaved };
  } catch (error: any) {
    await prisma.syncRun.update({
      where: { id: syncRun.id },
      data: {
        status: 'failed',
        finishedAt: new Date(),
        errorMessage: error?.message || 'Unknown error'
      }
    });

    throw error;
  }
}