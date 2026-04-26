# ⚡ Meter Unit Count — Electricity Bill Tracker

A smart, professional web application to **track electricity consumption** across multiple meters in your home. Built for Pakistani households using **LESCO** billing rates, this app tells you exactly how many units each meter has consumed, estimates each meter's bill separately, and calculates the combined total — all in real time.

---

## 🎯 What This App Does

Most homes in Pakistan have **two electricity meters** (sometimes called "new meter" and "old meter"). At any point during the billing cycle, you may want to know:

- **How many units has Meter 1 consumed this month?**
- **How many units has Meter 2 consumed this month?**
- **What is the estimated bill for Meter 1 alone?**
- **What is the estimated bill for Meter 2 alone?**
- **What is the total combined bill for both meters?**
- **How many total units have been consumed across all meters?**
- **Which meter is carrying more load?** (so you can balance usage)

This app answers **all of these questions** instantly. Just enter two numbers per meter — your last bill reading and your current reading — and the app does the rest.

---

## 📊 Example Calculation

Suppose you have **2 meters** in your house:

| | New Meter | Old Meter |
|---|---|---|
| **Last Bill Reading** | 1000.0 | 42200 |
| **Current Reading** | 1150.5 | 42380 |
| **Units Consumed** | 150.5 | 180 |
| **Estimated Bill** | ~Rs 2,870 | ~Rs 3,350 |

| Combined Summary | |
|---|---|
| **Total Units (Both Meters)** | 330.5 |
| **Total Combined Bill** | ~Rs 6,220 |

> **💡 Tip:** The app also recommends which meter to use more or less to keep both meters under the cheaper LESCO slab (~200 units) and avoid high bills.

---

## 🌟 Features

- **🔌 Dual Meter Support** — Track both new and old electricity meters simultaneously
- **⚡ Real-time Unit Calculation** — Instantly see how many units each meter has burned
- **💰 Per-Meter Bill Estimation** — Get estimated bill for each meter separately
- **📊 Combined Report** — Total units + total bill across all meters in one view
- **📋 Detailed Bill Breakdown** — Complete analysis with Energy Charges, FPA, FC Surcharge, QTA, GST, Electricity Duty, and Fixed Charges
- **⚖️ Load Balancing Advice** — Smart recommendations on which meter to use more
- **⚙️ Customizable LESCO Rates** — Update rates when LESCO changes them (FPA changes monthly!)
- **📱 Fully Responsive** — Works perfectly on mobile, tablet, and desktop
- **🔒 Privacy-Focused** — All calculations happen locally in your browser. No data is sent anywhere.
- **🎨 Professional Dark UI** — Clean, modern interface optimized for usability

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anzamuneebkhanofficial/meterunitcount.git
   cd meterunitcount
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000) **in your browser**

### Building for Production

```bash
npm run build
npm start
```

---

## 📱 How to Use

### Step 1 — Check Meter 1
1. Open the app and tap on **"New Meter"** (or whichever meter you want to check first)
2. Enter the **Last Bill Reading** — find this on your most recent LESCO bill under "Present Reading"
3. Enter the **Current Meter Reading** — go to your physical meter and read the number showing on the display/dials
4. Tap **"GET RESULT"** — instantly see the units consumed and estimated bill

### Step 2 — Check Meter 2
1. Go back and tap on the **second meter**
2. Enter the same two readings for that meter
3. Get the result

### Step 3 — View Combined Report
Once both meters are checked, the app unlocks the **Final Report** showing:
- Total units consumed across both meters
- Combined estimated bill
- Per-meter breakdown with full bill details
- Load balancing recommendation

### Customize Settings
- Go to the **Settings** tab to update LESCO rates
- FPA changes every month — update it from your latest bill
- Settings are saved locally on your device

---

## 🏗️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI library |
| **TypeScript** | Type-safe development |
| **CSS Modules** | Component-scoped styling |
| **Static Export** | Optimized for deployment on Cloudflare Pages |

---

## 📁 Project Structure

```
meterunitcount/
├── app/
│   ├── page.tsx              # Main application (meter checker + report + settings)
│   ├── layout.tsx            # Root layout with metadata
│   ├── globals.css           # Global styles
│   ├── global-error.tsx      # Error boundary
│   └── not-found.tsx         # 404 page
├── styles/
│   └── Home.module.css       # Component styles
├── public/                   # Static assets
├── next.config.js            # Next.js configuration (static export)
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

---

## ⚙️ Default LESCO Rates

These rates are pre-configured and can be updated via the **Settings** tab:

| Charge | Default Value |
|---|---|
| Energy Rate (GOP Tariff) | Rs 10.54 / unit |
| Fuel Price Adjustment (FPA) | Rs 1.50 / unit *(changes monthly)* |
| FC Surcharge | 4.08% |
| Quarterly Tariff Adjustment | 3.3% |
| Electricity Duty | 1.6% |
| GST | 18% |
| Fixed Charges (New Meter) | Rs 400 |
| Fixed Charges (Old Meter) | Rs 200 |

---

## 📊 Bill Calculation Formula

```
Total Bill = Energy Charges + FPA + FC Surcharge + QTA + Fixed Charges + Electricity Duty + GST

Where:
- Energy Charges   = Units × GOP Tariff Rate
- FPA              = Units × FPA Rate (changes every month)
- FC Surcharge     = Energy Charges × FC Surcharge Rate
- QTA              = Energy Charges × QTA Rate
- Electricity Duty = LESCO Sub-Total × ED Rate
- GST              = LESCO Sub-Total × GST Rate
- LESCO Sub-Total  = Energy + FPA + FC Surcharge + QTA + Fixed Charges
```

---

## 🌐 Deployment

### Cloudflare Pages (Recommended)

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Deploy meter unit count app"
   git push origin main
   ```

2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → Create Project

3. Connect your GitHub repo and configure:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node.js version:** `18`

4. Deploy! Your site will be live at `your-project.pages.dev`

### Manual Deployment

```bash
npm run build
# Upload the contents of the 'out' directory to any static hosting provider
```

---

## 🔒 Privacy & Security

- ✅ All calculations happen **locally in your browser**
- ✅ **No data** is sent to any external server
- ✅ No tracking, no analytics, no cookies
- ✅ Settings stored **only on your device**
- ✅ No third-party dependencies that could compromise privacy

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Anza Muneeb Khan**  
GitHub: [@anzamuneebkhanofficial](https://github.com/anzamuneebkhanofficial)

---

**Made with ❤️ for Pakistani homeowners — know your bijli bill before it arrives!**
