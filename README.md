# LR Parts Platform

Monorepo for a Trodo-style Land Rover parts storefront with LR Parts branding.

## Stack
- Frontend: Next.js 14 (App Router)
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL + Prisma
- Supplier API: RIDEX
- Hosting: Vercel (frontend) + Railway (backend + Postgres)

## Structure
- `frontend/` customer storefront
- `backend/` API, RIDEX integration, Prisma schema
- `docs/` setup notes

## Quick start

### 1. Backend
```bash
cd backend
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

### 2. Frontend
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

## Environment variables

### backend/.env
```env
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/lrparts
RIDEX_BASE_URL=https://www.ridex.eu
RIDEX_EMAIL=your_email@example.com
RIDEX_PASSWORD=your_password
FRONTEND_URL=http://localhost:3000
```

### frontend/.env.local
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Deployment

### Railway
- Create a new project
- Add PostgreSQL service
- Deploy `backend/`
- Set env vars from `.env.example`
- Run `npx prisma migrate deploy`

### Vercel
- Import repo
- Set Root Directory to `frontend`
- Add `NEXT_PUBLIC_API_URL` pointing to Railway backend

## RIDEX API endpoints integrated
- `POST /api/login`
- `GET /api/v1/articles`
- `POST /api/v1/articles`
- `GET /api/v2/articles/info` (GET with JSON body)
- `POST /api/v1/order/create`

## Notes
- This is a strong starter foundation, not a final live business with payments, admin auth, analytics, invoices, and full product sync jobs.
- The unusual RIDEX `GET /api/v2/articles/info` with body is handled via axios request config.
