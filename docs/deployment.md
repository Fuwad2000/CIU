# Deployment workflow

| Place | Role |
| --- | --- |
| **Fuwad2000/CIU `main`** | Development. Push here every day. Test on Vercel. |
| **Fuwad2000/CIU `production`** | Approved release. Merge `main` here when you like it. |
| **CIUDEV/CIU_Website_Production** | Live CIU site. Updated when you release from `production`. |

## Daily work

Stay on `main` and push to your account only:

```bash
git checkout main
git push origin main
```

Vercel on Fuwad2000 is your test environment. This does **not** update the live CIU site.

## Release to the live CIU site

When the Vercel preview looks good, run:

```bash
npm run release
```

That will:

1. Merge `main` into `production` on Fuwad2000
2. Push Fuwad2000 `production`
3. Push the same code to CIUDEV `main` and `production`
4. Switch you back to `main`

CIU Cloudflare (`ciu-website-production`) builds from **CIUDEV `main`** and goes live.

Manual equivalent:

```bash
git checkout production
git merge main
git push origin production
git push ciu main
git push ciu production
git checkout main
```

## CIU Cloudflare build settings

On the **Dev@ciucanada.ca** account, worker **`ciu-website-production`**:

| Setting | Value |
| --- | --- |
| Git repository | `CIUDEV/CIU_Website_Production` |
| Production branch | `main` |
| Build command | `npm run cf:build` |
| Deploy command | `npm run cf:deploy` |
| Non-production builds | Disabled |

Disconnect the old personal Cloudflare worker from `Fuwad2000/CIU` if you do not want that account deploying too.

## Local commands

| Command | Use |
| --- | --- |
| `npm run dev` | Local Next.js dev server |
| `npm run preview` | Preview in the Workers runtime |
| `npm run deploy` | Manual Cloudflare deploy (fallback only) |
| `npm run release` | Merge `main` → `production` and push to Fuwad2000 + CIUDEV |
