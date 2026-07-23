# Archemist

**A Mystical Web3 E-Commerce Experience**  
*Where alchemy meets digital commerce — built with Solana payments, glassmorphism, aurora shaders, and headless Sanity CMS.*

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Solana](https://img.shields.io/badge/Solana-9945FF?logo=solana&logoColor=white)
![Sanity](https://img.shields.io/badge/Sanity-FF4F4F?logo=sanity&logoColor=white)

---

## About This Project

Hi, I'm **mrphatom** 👋

**Archemist** is a **production-ready template** I created for mystical, visually stunning Web3 e-commerce platforms. It combines cutting-edge frontend design with real blockchain payments and a flexible headless CMS.

Whether you're building a digital alchemy shop, NFT marketplace, or premium Web3 brand store — this template gives you a strong, beautiful starting point.

---

## ✨ Key Features

- **Immersive Visual Design** — Glassmorphism, dynamic aurora shaders, liquid glass cards, perspective 3D effects, and glowing interactions.
- **Solana Payments** — Seamless wallet connection and transactions using Solana wallet adapters.
- **Headless CMS** — Full Sanity.io integration with custom schemas for products, collections, homepage, and site settings.
- **Modern E-Commerce** — Cart drawer, marketplace grid, featured collections, metrics dashboard, and smooth checkout flow.
- **Premium Animations** — Powered by Framer Motion, Lenis smooth scroll, React Three Fiber, and custom hooks.
- **Fully Responsive** — Beautiful on mobile, tablet, and desktop with dynamic navigation.

---

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + custom shaders
- **3D & Effects**: Three.js + @react-three/fiber
- **Web3**: @solana/web3.js + Wallet Adapter
- **CMS**: Sanity.io
- **UI**: Radix UI primitives + Framer Motion
- **Other**: React Router, Recharts, Sonner, Lenis

---

## Quick Start

### 1. Clone & Install
```bash
git clone [https://github.com/mrphatom/Archemist.git](https://github.com/mrphatom/Archemist.git)
cd Archemist
npm install
```

### 2. Environment Variables
Create a `.env` file and add your keys:
```env
VITE_SANITY_PROJECT_ID=your_sanity_project_id
VITE_SANITY_DATASET=production
# Solana RPC and other keys as needed
```

### 3. Sanity CMS Setup
See `SANITY_CMS_SETUP.md` for detailed instructions on schema deployment and Studio setup.

### 4. Run Locally
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

---

## Project Structure

```text
Archemist/
├── src/
│   ├── components/custom/     # Fancy UI components (Aurora, Glass cards, etc.)
│   ├── sections/              # Main page sections
│   ├── lib/                   # Solana & Sanity utilities
│   └── hooks/                 # Custom React hooks
├── sanity-schemas/            # All Sanity content models
├── public/
└── SANITY_CMS_SETUP.md
```

---

## Roadmap

- [ ] Live demo deployment (Vercel / custom domain)
- [ ] Full checkout flow with Solana Pay
- [ ] Admin dashboard
- [ ] More product variants & filters
- [ ] Dark/light mode enhancements
- [ ] Performance optimizations

---

## Contributing

This is an open template. Feel free to fork it, improve it, or use it as the base for your own Web3 project. Pull requests are welcome!

---

## License

MIT © mrphatom

---

Built with passion for beautiful Web3 experiences.  
Made as a reusable template by mrphatom.
