# GitHub Setup

## Create repository
1. Go to GitHub
2. Click **New repository**
3. Name it `lrparts-platform`
4. Keep it private
5. Do not initialize with README if uploading this folder as-is

## Push from local machine
```bash
cd lrparts-platform
git init
git branch -M main
git add .
git commit -m "Initial LR Parts platform"
git remote add origin https://github.com/YOUR_USERNAME/lrparts-platform.git
git push -u origin main
```

## Vercel
- Import GitHub repository
- Root directory: `frontend`
- Framework preset: Next.js
- Env var: `NEXT_PUBLIC_API_URL`

## Railway
- Create new project from GitHub repo or deploy from folder
- Root directory: `backend`
- Add Postgres plugin/service
- Set env vars from `backend/.env.example`
- After deploy run:
```bash
npx prisma migrate deploy
```
