# ✅ Deployment Verification Checklist

Run this checklist before and after deployment to ensure everything works perfectly.

## Pre-Deployment Checks

### Build Verification
```bash
# 1. Clean build
npm run build

# Expected output:
# ✓ Build completes in ~3 seconds
# ✓ No errors
# ✓ Bundle size ~9.5 MB total
```

### File Structure Check
```bash
# 2. Verify video files exist
ls -lh src/assets/media/converted/*.mp4

# Expected: 7 video files present

# 3. Verify build output
ls -lh build/assets/

# Expected: 
# - CSS files
# - JS files (vendor chunks)
# - PNG files (logos)
# - MP4 file(s)
```

### Code Quality
```bash
# 4. Run linter
npm run lint

# Expected: 
# ✓ 26 warnings (cosmetic)
# ✓ 0 errors

# 5. Check for security issues
# Already verified - CodeQL passed ✅
```

## Vercel Deployment

### Method 1: Automatic (Recommended)
1. Merge this PR to main branch
2. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import GitHub repository
5. Click "Deploy"
6. Wait ~2 minutes

### Method 2: CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

## Post-Deployment Verification

### 1. Homepage Tests
- [ ] Page loads within 3 seconds
- [ ] Video hero displays
- [ ] Video rotates through 3 videos
- [ ] Logo animation plays
- [ ] "FROM DIRT TO DYNASTY" text visible
- [ ] Scroll indicator appears
- [ ] Navigation menu works

### 2. Navigation Tests
- [ ] Home link works
- [ ] Constructions link works
- [ ] Laser Cutting link works
- [ ] Shop link works
- [ ] Projects link works
- [ ] Contact link works
- [ ] Portal link works

### 3. Constructions Page Tests
- [ ] Page loads with video showcase
- [ ] 4 construction videos visible
- [ ] Videos play on hover
- [ ] Video titles and descriptions show
- [ ] Page is responsive on mobile

### 4. Projects Page Tests
- [ ] Gallery images load
- [ ] Images are lazy-loaded
- [ ] Hover effects work
- [ ] Modal/lightbox works (if implemented)
- [ ] Layout is responsive

### 5. Portal/Login Tests
- [ ] Login page loads
- [ ] Can enter username/password
- [ ] Login redirects to dashboard
- [ ] Dashboard shows correct content
- [ ] Worker role has correct permissions
- [ ] Admin role has correct permissions

### 6. Forms Tests (Portal)
- [ ] Timesheet form loads
- [ ] Can add multiple entries
- [ ] Hours calculate correctly
- [ ] Can submit form
- [ ] SWMS form works
- [ ] Toolbox Talk form works
- [ ] Incident Report form works

### 7. Mobile Responsiveness
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test on iPad
- [ ] Navigation menu works on mobile
- [ ] Touch interactions work
- [ ] No horizontal scrolling
- [ ] Text is readable
- [ ] Buttons are tappable (44px min)

### 8. Performance Tests
```bash
# Use Lighthouse in Chrome DevTools
# Expected scores:
# - Performance: 80+
# - Accessibility: 90+
# - Best Practices: 90+
# - SEO: 90+
```

### 9. Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### 10. Console Error Check
Open browser console (F12) and verify:
- [ ] No JavaScript errors
- [ ] No 404 errors
- [ ] No CORS errors
- [ ] No critical warnings

## Domain Connection

After deployment, connect your custom domain:

1. Go to Vercel Project → Settings → Domains
2. Add your Honcho domain
3. Configure DNS records:
   ```
   Type: CNAME
   Name: www (or @)
   Value: cname.vercel-dns.com
   ```
4. Wait for SSL provisioning (~1-5 minutes)
5. Test: `https://your-domain.com`

## Performance Metrics

Expected performance after deployment:

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| First Contentful Paint | < 1.5s | User sees content quickly |
| Time to Interactive | < 3s | User can interact |
| Largest Contentful Paint | < 2.5s | Main content visible |
| Cumulative Layout Shift | < 0.1 | No content jumping |
| Total Blocking Time | < 300ms | Smooth interactions |

## Troubleshooting

### Build Fails on Vercel
1. Check Vercel build logs
2. Verify Node version (should be 18+)
3. Check all dependencies are in package.json
4. Try local build: `npm run build`

### Videos Don't Play
1. Check browser console for errors
2. Verify video files are in build output
3. Check video MIME types
4. Test on different browsers

### Images Not Loading
1. Check network tab in DevTools
2. Verify Unsplash URLs are accessible
3. Check for CORS issues
4. Verify lazy loading works

### Page Won't Load
1. Check Vercel deployment status
2. Verify DNS is configured correctly
3. Check SSL certificate status
4. Clear browser cache and try again

### Forms Not Submitting
1. Check browser console for errors
2. Verify localStorage is enabled
3. Check form validation
4. Test in different browsers

## Success Criteria

Your deployment is successful when:

✅ All pages load within 3 seconds
✅ No console errors
✅ All navigation works
✅ Videos play correctly
✅ Images load properly
✅ Forms submit successfully
✅ Mobile responsive
✅ Portal login works
✅ Custom domain connected (if applicable)
✅ SSL certificate active

## Monitoring

After deployment, monitor:

1. **Vercel Analytics** (if enabled)
   - Page views
   - Unique visitors
   - Performance metrics

2. **Browser Console**
   - Check for errors
   - Monitor network requests
   - Watch for warnings

3. **User Feedback**
   - Test with real users
   - Collect feedback
   - Iterate improvements

## Next Steps After Deployment

1. **Test Everything** - Use this checklist
2. **Share URL** - Send to stakeholders
3. **Collect Feedback** - Note any issues
4. **Update Videos** - Replace placeholders if needed
5. **Monitor Performance** - Check Vercel analytics
6. **Make Improvements** - Iterate based on feedback

## Need Help?

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Issues**: Create issue in repository
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)

---

**Ready to Deploy?** Follow the steps above and check off each item as you go! 🚀
