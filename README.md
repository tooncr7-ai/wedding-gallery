# Wedding Memory Gallery

A beautiful, romantic wedding photo gallery built with Next.js 14 + Cloudflare R2.

## Tech Stack
- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Storage**: Cloudflare R2 (S3-compatible)
- **Styling**: Tailwind CSS + Cormorant Garamond / DM Sans
- **Deploy**: Vercel

## Quick Start

### 1. Install Node.js
Download from https://nodejs.org/ (v18 or later)

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.local.example .env.local
```
Edit `.env.local` with your Cloudflare R2 credentials.

### 4. Set up R2 bucket
In your Cloudflare dashboard:
1. Create an R2 bucket named `wedding-gallery`
2. Create folders: `ceremony/` `reception/` `portrait/` `detail/`
3. Upload photos into each folder
4. Enable public access or set a custom domain

### 5. Run development server
```bash
npm run dev
```
Open http://localhost:3000

## R2 Environment Variables
| Variable | Description |
|----------|-------------|
| `R2_ACCOUNT_ID` | Cloudflare account ID |
| `R2_ACCESS_KEY_ID` | R2 API token access key |
| `R2_SECRET_ACCESS_KEY` | R2 API token secret |
| `R2_BUCKET_NAME` | Bucket name (e.g. `wedding-gallery`) |
| `R2_PUBLIC_URL` | Public URL (e.g. `https://pub-xxx.r2.dev`) |
| `R2_PUBLIC_HOSTNAME` | Hostname only (for next.config.ts) |

## Customization
- **Couple names & date**: Edit `app/page.tsx`
- **Location**: Edit `app/page.tsx` bottom-right text
- **Colors**: Edit `tailwind.config.ts`
- **Albums**: Edit `ALBUMS` in `lib/r2.ts`

## Deploy to Vercel
```bash
npx vercel --prod
```
Add environment variables in Vercel dashboard under Settings → Environment Variables.
