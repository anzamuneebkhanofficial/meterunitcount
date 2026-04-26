# ☁️ Cloudflare Pages & GitHub Deployment Guide

This guide explains how to deploy your **Electricity Meter Checker** to Cloudflare Pages for free.

## 1. Prepare for Deployment
I have already configured your project for a smooth deployment:
- **`next.config.js`**: Changed to support root domain deployment (works at `your-site.pages.dev`).
- **`.node-version`**: Added to tell Cloudflare to use Node.js 22.
- **`wrangler.toml`**: Updated to tell Cloudflare that the final website is in the `out` folder.

## 2. Push to GitHub
If you haven't pushed your code to GitHub yet, follow these steps:

1. **Create a new repository** on GitHub named `electricity-meter-checker`.
2. **Initialize and push**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Ready for Cloudflare"
   git remote add origin https://github.com/YOUR_USERNAME/electricity-meter-checker.git
   git branch -M main
   git push -u origin main
   ```

## 3. Deploy on Cloudflare Pages
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your GitHub repository (`electricity-meter-checker`).
4. **Set up Build Settings**:
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `npm run build`
   - **Build output directory**: `out` (⚠️ **Important**: Do NOT use `.next`. The `.next` folder is just for building, but the final website is generated in `out`).
5. **Environment Variables**:
   - Add `NODE_VERSION` with value `22`.
6. Click **Save and Deploy**.

## 4. Why these files were created?
- **`.node-version`**: Cloudflare needs to know which version of Node.js to use to build your app. We use version 22 for the best performance with Next.js 16.
- **`wrangler.toml`**: This is the configuration file for Cloudflare. It tells Cloudflare that this is a "Pages" project and where the files are located.
- **`out` directory**: When you run `npm run build`, Next.js creates a `out` folder. This folder contains only HTML, CSS, and JS. This is what Cloudflare hosts. We don't host the `.next` folder because it contains temporary build files.

## 5. "No SSC" (No Server-Side Code)
By using `output: 'export'` in `next.config.js`, we have turned your application into a **Static Site**. This means there is no server-side code (SSC/SSR) required to run it. It will be extremely fast and 100% free on Cloudflare Pages!

---
**Success!** Your app will now automatically update every time you push new code to GitHub.
