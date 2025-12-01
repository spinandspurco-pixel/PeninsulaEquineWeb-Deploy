# 🌐 Custom Domain Setup Guide

## Overview

Yes! You can absolutely attach this website to your already purchased domain. This guide will walk you through the complete process of connecting your Peninsula Equine website to your custom domain.

---

## 📋 Prerequisites

Before starting, make sure you have:

- ✅ **A deployed website on Vercel** (follow [DEPLOYMENT_INSTRUCTIONS.md](./DEPLOYMENT_INSTRUCTIONS.md) if not done)
- ✅ **Access to your domain registrar** (where you purchased your domain)
- ✅ **The domain name** you want to use (e.g., `peninsulaequine.com.au`)

---

## 🚀 Step-by-Step Domain Connection

### Step 1: Deploy Your Website to Vercel

If you haven't deployed yet:

```bash
# Option A: Using deploy script
chmod +x deploy.sh
./deploy.sh

# Option B: Using Vercel CLI
npm install -g vercel
vercel login
vercel --prod
```

After deployment, you'll get a URL like: `https://peninsula-equine-web.vercel.app`

### Step 2: Add Your Custom Domain in Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project** (Peninsula Equine Web)
3. **Navigate to Settings** → **Domains**
4. **Click "Add"** button
5. **Enter your domain name** (e.g., `peninsulaequine.com.au`)
6. **Click "Add"**

Vercel will show you the DNS records you need to configure.

### Step 3: Configure DNS at Your Domain Registrar

Log into your domain registrar (the company where you purchased your domain) and add these DNS records:

#### For Root/Apex Domain (e.g., `example.com`)

| Type | Name/Host | Value/Points To | TTL |
|------|-----------|-----------------|-----|
| A    | @         | 76.76.21.21     | 300 |

#### For WWW Subdomain (e.g., `www.example.com`)

| Type  | Name/Host | Value/Points To        | TTL |
|-------|-----------|------------------------|-----|
| CNAME | www       | cname.vercel-dns.com   | 300 |

---

## 🏢 Domain Registrar-Specific Instructions

### Honcho (Australian)

1. Log into your Honcho account
2. Go to **My Domains** → Select your domain
3. Click on **DNS Settings** or **DNS Management**
4. Add the records from Step 3
5. Save changes

### GoDaddy

1. Log into GoDaddy
2. Go to **My Products** → **Domains** → Select your domain
3. Click **DNS** or **Manage DNS**
4. Add the A record and CNAME record
5. Click **Save**

### Namecheap

1. Log into Namecheap
2. Go to **Domain List** → Click **Manage** on your domain
3. Go to **Advanced DNS**
4. Add A Record: Host = `@`, Value = `76.76.21.21`
5. Add CNAME: Host = `www`, Value = `cname.vercel-dns.com`
6. Click **Save All Changes**

### Cloudflare

1. Log into Cloudflare
2. Select your domain
3. Go to **DNS** → **Records**
4. Add A Record: Name = `@`, IPv4 = `76.76.21.21`, Proxy = DNS only (grey cloud)
5. Add CNAME: Name = `www`, Target = `cname.vercel-dns.com`
6. Save

**Important for Cloudflare**: Initially set the proxy to "DNS only" (grey cloud icon). After verification, you can enable the orange cloud for Cloudflare's CDN.

### VentraIP (Australian)

1. Log into VentraIP
2. Go to **My Services** → **Domain Names**
3. Select your domain → **DNS Settings**
4. Add the A and CNAME records
5. Save

### Crazy Domains (Australian)

1. Log into Crazy Domains
2. Go to **Domains** → **My Domains**
3. Click on your domain → **DNS Settings**
4. Add the required records
5. Save changes

---

## ⏱️ DNS Propagation

After adding DNS records:

- **Initial propagation**: 5-15 minutes
- **Full global propagation**: Up to 24-48 hours (usually much faster)

### Check Propagation Status

Use these tools to verify DNS propagation:

- https://dnschecker.org
- https://whatsmydns.net
- https://www.digwebinterface.com

Enter your domain and check if the A record shows `76.76.21.21`.

---

## 🔒 SSL Certificate (HTTPS)

**Good news!** Vercel automatically provisions and renews SSL certificates for your domain. Once DNS is properly configured:

1. Vercel will automatically detect the domain
2. An SSL certificate will be issued (usually within minutes)
3. Your site will be accessible via `https://yourdomain.com`

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Visit `https://yourdomain.com` - Should load your site
- [ ] Visit `https://www.yourdomain.com` - Should redirect or load your site
- [ ] Check for HTTPS padlock icon in browser
- [ ] Test all pages work correctly
- [ ] Test on mobile device
- [ ] Check Vercel dashboard shows domain as "Valid Configuration"

---

## 🔧 Troubleshooting

### Domain Shows "Invalid Configuration" in Vercel

**Cause**: DNS records not properly set or not propagated yet

**Solution**:
1. Double-check DNS records are correct
2. Wait 15-30 minutes for propagation
3. Clear browser cache and try again
4. Use https://dnschecker.org to verify records

### SSL Certificate Not Working

**Cause**: DNS not fully propagated

**Solution**:
1. Wait for complete DNS propagation (up to 48 hours)
2. Ensure A record points to `76.76.21.21`
3. In Vercel, try removing and re-adding the domain

### "This site can't be reached" Error

**Cause**: DNS records incorrect or not propagated

**Solution**:
1. Verify you added the correct record types (A for apex, CNAME for www)
2. Check for typos in the record values
3. Wait for propagation
4. Try accessing via incognito/private browsing

### Old Website Still Showing

**Cause**: Browser cache or incomplete propagation

**Solution**:
1. Clear browser cache completely
2. Try incognito/private browsing mode
3. Wait for full DNS propagation
4. Try on a different device or network

### www vs Non-www Issues

**Solution**: Set up a redirect in Vercel:
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add both `example.com` and `www.example.com`
3. Vercel will automatically set up redirects

---

## 🎯 Quick Reference

| What You Need | Value |
|---------------|-------|
| A Record IP | `76.76.21.21` |
| CNAME Value | `cname.vercel-dns.com` |
| Vercel Dashboard | https://vercel.com/dashboard |
| DNS Checker | https://dnschecker.org |

---

## 📞 Need More Help?

If you encounter issues:

1. **Check Vercel Docs**: https://vercel.com/docs/concepts/projects/domains
2. **Contact Your Registrar**: They can help with DNS configuration
3. **Vercel Support**: Available through Vercel dashboard

---

## 🎉 Success!

Once everything is configured:

✅ Your website will be live at `https://yourdomain.com`
✅ SSL is automatically enabled and renewed
✅ All future deployments will automatically update your domain
✅ Vercel handles all hosting, caching, and global CDN distribution

**Congratulations! Your Peninsula Equine website is now live on your custom domain!** 🐴
