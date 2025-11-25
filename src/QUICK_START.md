# 🚀 Quick Start - Push to GitHub in 5 Minutes

## Step 1: Initialize Git (30 seconds)

```bash
cd your-project-folder
git init
git add .
git commit -m "Initial commit: Peninsula Equine website"
```

## Step 2: Create GitHub Repo (1 minute)

1. Go to: https://github.com/new
2. Name: `peninsula-equine`
3. Select **Private**
4. **DO NOT** check any boxes (no README, no .gitignore, no license)
5. Click **Create Repository**

## Step 3: Push to GitHub (30 seconds)

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/peninsula-equine.git
git branch -M main
git push -u origin main
```

## Step 4: Deploy to Vercel (2 minutes)

1. Go to: https://vercel.com/new
2. Click **Import Git Repository**
3. Select your `peninsula-equine` repo
4. Click **Deploy** (use default settings)
5. ✅ Done! Your site is live!

## Step 5: Get Your Live URL

After deployment completes (1-2 minutes):
- Your site: `https://peninsula-equine-xxxxxx.vercel.app`
- Custom domain can be added in Vercel settings

---

## 🎉 That's It!

Your Peninsula Equine website is now:
- ✅ On GitHub
- ✅ Deployed and live
- ✅ Auto-deploys on every push

## Next Steps:

1. **Test the live site** - Click the URL from Vercel
2. **Add custom domain** - Settings → Domains → Add `equinepeninsula.com.au`
3. **Configure Firebase** - Update `/lib/firebase-config.ts` with real credentials

## Future Updates:

```bash
# Just commit and push - Vercel auto-deploys!
git add .
git commit -m "Your update message"
git push origin main
```

---

**Need help?** Check `/GITHUB_DEPLOYMENT.md` for detailed instructions.
