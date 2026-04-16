import axios, { AxiosInstance } from 'axios';
import { env } from '../lib/env';

export class RidexService {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: env.ridexBaseUrl,
      timeout: 30000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  private async authenticate() {
    const { data } = await this.client.post('/api/login', {
      email: env.ridexEmail,
      password: env.ridexPassword
    });

    this.token = data.token;
    return this.token;
  }

  private async authHeaders() {
    if (!this.token) await this.authenticate();
    return { Authorization: `Bearer ${this.token}` };
  }

  private async withRetry<T>(fn: () => Promise<T>) {
    try {
      return await fn();
    } catch (error: any) {
      if (error?.response?.status === 401) {
        await this.authenticate();
        return await fn();
      }
      throw error;
    }
  }

  async getArticles(page = 1, limit = 50) {
    return this.withRetry(async () => {
      const headers = await this.authHeaders();
      const { data } = await this.client.get('/api/v1/articles', {
        headers,
        params: { page, limit }
      });
      return data;
    });
  }

  async getArticlesByNumbers(articleNo: string[]) {
    return this.withRetry(async () => {
      const headers = await this.authHeaders();
      const { data } = await this.client.post('/api/v1/articles', { articleNo }, { headers });
      return data;
    });
  }

  async getArticleInfo(articleNo: string[], page = 1) {
    return this.withRetry(async () => {
      const headers = await this.authHeaders();
      const { data } = await this.client.request({
        url: '/api/v2/articles/info',
        method: 'GET',
        headers,
        params: { page },
        data: { articleNo }
      });
      return data;
    });
  }

  async createOrder(payload: { deliveryType: number; items: { articleNo: string; qty: number }[] }) {
    return this.withRetry(async () => {
      const headers = await this.authHeaders();
      const { data } = await this.client.post('/api/v1/order/create', payload, { headers });
      return data;
    });
  }
}

export const ridexService = new RidexService();
