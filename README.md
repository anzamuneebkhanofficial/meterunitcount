# Electricity Meter Checker

A professional, responsive web application for calculating LESCO electricity bills in Pakistan. Built with Next.js and optimized for all devices.

## 🌟 Features

- **Dual Meter Support**: Track both new and old electricity meters simultaneously
- **Real-time Calculations**: Instant bill estimates based on current LESCO rates
- **Professional UI**: Clean, modern interface with dark theme optimized for usability
- **Fully Responsive**: Works perfectly on mobile, tablet, and desktop devices
- **Privacy-Focused**: All calculations happen locally - no data is sent to servers
- **Detailed Breakdown**: Complete bill analysis with FPA, GST, and other charges
- **Smart Recommendations**: Get advice on load balancing between meters
- **Customizable Rates**: Update LESCO rates as they change

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/electricity-meter-checker.git
cd electricity-meter-checker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 📱 How to Use

1. **Check Your Meters**: 
   - Select either "New Meter" or "Old Meter"
   - Enter your last bill reading (from your LESCO bill)
   - Enter the current meter reading (from the physical meter)
   - Get instant bill calculation

2. **View Combined Report**:
   - After checking both meters, view the combined report
   - See total units consumed and combined bill amount
   - Get recommendations for load balancing

3. **Customize Settings**:
   - Update LESCO rates as they change
   - Adjust fixed charges for your specific meters
   - Settings are saved locally on your device

## 🏗️ Project Structure

```
electricity-meter-checker/
├── pages/
│   └── index.tsx              # Main application page
├── styles/
│   └── Home.module.css        # Component styles
├── public/                    # Static assets
├── package.json              # Dependencies and scripts
├── next.config.js            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## ⚙️ Configuration

### LESCO Rates (Default Values)
- **Energy Rate**: Rs 10.54 per unit
- **Fuel Price Adjustment (FPA)**: Rs 1.50 per unit (changes monthly)
- **FC Surcharge**: 4.08%
- **Quarterly Tariff Adjustment**: 3.3%
- **Electricity Duty**: 1.6%
- **GST**: 18%
- **Fixed Charges**: Rs 400 (New Meter), Rs 200 (Old Meter)

### Updating Rates
1. Go to Settings tab
2. Update the rates as per your latest LESCO bill
3. Click "SAVE SETTINGS"
4. New rates will be used for all future calculations

## 🌐 Deployment

### Cloudflare Pages Deployment

1. **Push to GitHub**:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Setup Cloudflare Pages**:
   - Login to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Go to Pages section
   - Click "Create a project"
   - Connect your GitHub repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Build output directory**: `out`
     - **Node.js version**: `18`

3. **Environment Variables** (if needed):
   - No environment variables required for this static application

4. **Deploy**:
   - Cloudflare will automatically build and deploy your application
   - Your site will be available at `your-project.pages.dev`

### Manual Deployment

For manual deployment to any static hosting service:

```bash
npm run build
# The static files will be in the 'out' directory
# Upload the contents of 'out' to your hosting provider
```

## 🔧 Technical Details

- **Framework**: Next.js 14 with TypeScript
- **Styling**: CSS Modules for component-scoped styles
- **Build**: Static site generation for optimal performance
- **Compatibility**: Works on all modern browsers
- **Performance**: Optimized for fast loading and smooth interactions

## 📊 Bill Calculation Formula

```
Total Bill = Energy Charges + FPA + FC Surcharge + QTA + Fixed Charges + Electricity Duty + GST

Where:
- Energy Charges = Units × GOP Tariff Rate
- FPA = Units × FPA Rate
- FC Surcharge = Energy Charges × FC Surcharge Rate
- QTA = Energy Charges × QTA Rate
- Electricity Duty = Subtotal × ED Rate
- GST = Subtotal × GST Rate
```

## 🔒 Privacy & Security

- ✅ All calculations performed locally in your browser
- ✅ No data sent to external servers
- ✅ No tracking or analytics
- ✅ Settings stored locally on your device
- ✅ No third-party dependencies that could compromise privacy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check that you're using a modern browser
2. Ensure JavaScript is enabled
3. Try refreshing the page
4. For persistent issues, create an issue on GitHub

## 🔄 Updates

The application is designed to be updated easily:
- LESCO rates can be updated through the Settings tab
- No app updates required for rate changes
- Future feature updates will be deployed automatically

---

**Made with ❤️ for Pakistani homeowners**
