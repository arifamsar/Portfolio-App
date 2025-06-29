# 🚀 Deploying to Cloudflare Pages

## Prerequisites
- Cloudflare account
- GitHub repository
- Bun or Node.js installed locally

## 📋 Deployment Steps

### 1. **Setup Cloudflare Pages**
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → **Create a project**
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command**: `bun run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave empty)

### 2. **Environment Variables**
In Cloudflare Dashboard → Pages → Settings → Environment Variables:

```bash
NODE_ENV=production
NITRO_PRESET=cloudflare-pages
```

### 3. **Compatibility Flags**
In Cloudflare Dashboard → Pages → Settings → Functions:

Add compatibility flags:
- `nodejs_compat`
- `streams_enable_constructors`

### 4. **Build Settings**
```bash
Build command: bun run build
Build output directory: dist
Node.js version: 18 or higher
```

## ⚠️ Important Notes

### **Data Persistence**
Current implementation uses in-memory storage which means:
- ✅ Perfect for demo and development
- ❌ Data will be lost on function restarts
- 🔄 For production, consider:
  - **Cloudflare KV** for key-value storage
  - **Cloudflare D1** for SQL database
  - **External databases** (Supabase, PlanetScale)

### **API Limitations**
- File system operations are not supported in Cloudflare Workers
- Write operations (POST/PUT/DELETE) work but data is temporary
- GitHub API works perfectly (external API calls are supported)

## 🛠️ Local Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## 📦 Production Setup

For a production-ready setup with persistent data:

### Option 1: Cloudflare KV
```typescript
// server/utils/portfolioStorage.ts
const PORTFOLIO_KV = process.env.PORTFOLIO_KV;

export async function getPortfolioData() {
  return await PORTFOLIO_KV.get('projects', 'json') || [];
}

export async function setPortfolioData(data) {
  await PORTFOLIO_KV.put('projects', JSON.stringify(data));
}
```

### Option 2: External Database
```typescript
// Use Supabase, PlanetScale, or any other database
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
```

## 🔧 Troubleshooting

### Common Issues:
1. **Node.js compatibility warnings**: Enable `nodejs_compat` flag
2. **Build failures**: Check Node.js version (use 18+)
3. **API errors**: Verify all endpoints use proper error handling
4. **Data loss**: Expected behavior with current in-memory storage

## 🌐 Live Demo
Your app will be available at: `https://your-project-name.pages.dev`

## 📚 Further Reading
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Nuxt 3 Deployment](https://nuxt.com/docs/getting-started/deployment)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
