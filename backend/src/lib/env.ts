import dotenv from 'dotenv';

dotenv.config();

function required(name: string, fallback?: string) {
  const value = process.env[name] ?? fallback;
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export const env = {
  port: Number(process.env.PORT || 4000),
  databaseUrl: required('DATABASE_URL'),
  ridexBaseUrl: required('RIDEX_BASE_URL', 'https://www.ridex.eu'),
  ridexEmail: required('RIDEX_EMAIL'),
  ridexPassword: required('RIDEX_PASSWORD'),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
};
