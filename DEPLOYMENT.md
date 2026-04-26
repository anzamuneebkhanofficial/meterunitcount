# 🚀 Deployment Guide

## Cloudflare Pages Deployment (Recommended)

### Option 1: Automatic Deployment via GitHub

1. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/yourusername/electricity-meter-checker.git
   git push -u origin main
   ```

2. **Setup Cloudflare Pages**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to **Pages** → **Create a project**
   - Connect your GitHub repository
   - Configure build settings:
     - **Framework preset**: `Next.js (Static HTML Export)`
     - **Build command**: `npm run build`
     - **Build output directory**: `out`
     - **Node.js version**: `18`

3. **Environment Variables** (Optional):
   - No environment variables required for this static application

4. **Deploy**:
   - Cloudflare will automatically build and deploy on every push to main
   - Your site will be available at `your-project.pages.dev`

### Option 2: Manual Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Upload to Cloudflare Pages**:
   - Go to Cloudflare Pages dashboard
   - Click "Upload assets"
   - Drag and drop the contents of the `out` directory
   - Your site will be deployed immediately

## Alternative Deployment Options

### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `out`
4. Node version: 18

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Follow the prompts

### GitHub Pages
1. Update `next.config.js`:
   ```javascript
   module.exports = {
     output: 'export',
     trailingSlash: true,
     images: { unoptimized: true },
     basePath: '/electricity-meter-checker',
     assetPrefix: '/electricity-meter-checker',
   }
   ```
2. Build and deploy using GitHub Actions

## 🌐 Custom Domain Setup

### Cloudflare Pages
1. Go to your Pages project settings
2. Click "Custom domains"
3. Add your domain (e.g., `meter.yourdomain.com`)
4. Update your DNS records as instructed

## 🔧 Configuration Notes

### Build Optimization
- The application uses static site generation for optimal performance
- All assets are optimized and minified automatically
- No server-side rendering required

### Performance Features
- **Static Generation**: Pre-built pages for instant loading
- **CSS Modules**: Scoped styles for better performance
- **Image Optimization**: Disabled for static compatibility
- **Bundle Size**: ~86KB total (very lightweight)

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📊 Monitoring

### Cloudflare Analytics
- Built-in analytics available in Cloudflare dashboard
- Track visitors, page views, and performance metrics

### Performance Monitoring
- Use Chrome DevTools Lighthouse for performance testing
- Expected scores: 95+ Performance, 100+ Accessibility

## 🔒 Security Considerations

- ✅ No server-side processing required
- ✅ All calculations happen client-side
- ✅ No user data collection or storage
- ✅ HTTPS enforced by Cloudflare
- ✅ CSP headers automatically configured

## 🔄 Updates and Maintenance

### Updating LESCO Rates
1. Go to Settings tab in the application
2. Update the rates as per your latest bill
3. Click "SAVE SETTINGS"
4. Changes are applied immediately

### Application Updates
- For UI/feature updates, redeploy via GitHub
- Rate updates don't require redeployment

## 🆘 Troubleshooting

### Common Issues

**Build Fails**:
```bash
# Clear cache and rebuild
rm -rf .next out
npm run build
```

**Styles Not Loading**:
- Ensure CSS Modules are properly configured
- Check that all class names use `styles.className`

**Deployment Fails**:
- Verify build output directory is `out`
- Check that `next.config.js` has `output: 'export'`

**404 Errors**:
- Ensure `trailingSlash: true` in next.config.js
- Check custom domain configuration

### Getting Help

1. Check the [GitHub Issues](https://github.com/yourusername/electricity-meter-checker/issues)
2. Review Cloudflare Pages documentation
3. Test locally with `npm run dev`

## 📈 Performance Optimization

The application is optimized for:
- **First Contentful Paint**: < 1.5 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Optimization Techniques Used
- Static site generation
- CSS Modules for scoped styles
- Minimal JavaScript bundle
- Optimized images and assets
- Efficient component structure
