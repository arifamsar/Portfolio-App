# Deployment Guide - Cloudflare Pages & Workers

## Prerequisites

1. Cloudflare account
2. Wrangler CLI installed
3. Bun package manager

## Setup Steps

### 1. Install Dependencies
```bash
bun install
```

### 2. Login to Cloudflare
```bash
bunx wrangler login
```

### 3. Create KV Namespace (Optional but recommended)
```bash
# Production
bunx wrangler kv:namespace create "KV"

# Preview
bunx wrangler kv:namespace create "KV" --preview
```

### 4. Update wrangler.toml
Replace the KV namespace IDs in `wrangler.toml` with the ones created above.

### 5. Create Cloudflare Pages Project

#### Option A: Via Cloudflare Dashboard
1. Go to Cloudflare Dashboard > Pages
2. Create a new project
3. Connect your GitHub repository
4. Set build settings:
   - Framework preset: `Nuxt.js`
   - Build command: `bun run build`
   - Build output directory: `.output/public`
   - Node.js version: `18` or `20`

#### Option B: Via Wrangler CLI
```bash
# Build the project
bun run build

# Deploy to Cloudflare Pages
bunx wrangler pages deploy .output/public --project-name=vibe-code-portfolio
```

### 6. Environment Variables

Set these in Cloudflare Pages dashboard under Settings > Environment variables:

**Production:**
- `NODE_ENV`: `production`
- `NUXT_PUBLIC_SITE_URL`: `https://your-domain.pages.dev`

**Preview:**
- `NODE_ENV`: `preview`
- `NUXT_PUBLIC_SITE_URL`: `https://preview.your-domain.pages.dev`

### 7. Custom Domain (Optional)
1. Go to Pages project > Custom domains
2. Add your domain
3. Update DNS records as instructed

## Deployment Commands

### Manual Deployment
```bash
# Build and deploy to production
bun run cf:build

# Deploy to preview
bun run deploy:preview
```

### Automatic Deployment
Push to `main` branch will trigger automatic deployment via GitHub Actions.

## KV Storage Structure

The portfolio data is stored in Cloudflare KV with the following structure:

- Key: `portfolio-data`
- Value: JSON string of portfolio projects

## Monitoring

- **Cloudflare Analytics**: Available in the Cloudflare dashboard
- **Real User Monitoring**: Enabled by default with Cloudflare
- **Worker Logs**: View in Wrangler or Cloudflare dashboard

## Performance Optimizations

1. **Static Generation**: Homepage is pre-rendered
2. **Edge Caching**: API responses cached for 5 minutes
3. **Asset Optimization**: Images and static assets served from CDN
4. **Compression**: Brotli and Gzip enabled

## Troubleshooting

### Common Issues

1. **Build Fails**: Check Node.js version compatibility
2. **API Errors**: Verify KV namespace bindings
3. **Routing Issues**: Check `_redirects` file configuration

### Debug Commands
```bash
# Local development with Cloudflare compatibility
bunx wrangler pages dev .output/public

# Test production build locally
bun run build && bun run preview
```

## Security

- HTTPS enforced
- Security headers configured in `_headers`
- CORS policies for API endpoints
- Input validation on API routes

## Cost Optimization

- Free tier includes:
  - 500 deployments/month
  - 100,000 requests/day
  - 10GB bandwidth/month
- KV storage: First 10M reads/month free

## Support

For issues related to:
- **Nuxt.js**: [Nuxt Documentation](https://nuxt.com/docs)
- **Cloudflare Pages**: [Cloudflare Docs](https://developers.cloudflare.com/pages/)
- **Wrangler**: [Wrangler Docs](https://developers.cloudflare.com/workers/wrangler/)
