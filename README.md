# GCRIG — Global Credit Rating & Intelligence Group

A complete, professional fintech corporate website built with pure HTML, CSS, and JavaScript. No build tools, no npm, no Node.js required — upload directly to any web server or cPanel hosting.

## 🌐 Pages

| File | Page |
|------|------|
| `index.html` | Home — hero, stats, services, AI overview, world map, CTA |
| `about.html` | About Us — company story, milestone timeline, leadership team, offices |
| `crb-network.html` | CRB Network — interactive world map, network stats, member categories |
| `services.html` | Services — 6 detailed service cards, delivery process |
| `technology.html` | Technology — AI advisory engine, data sources, rating methodology |
| `investor-solutions.html` | Investor Solutions — tiered packages, contact form |
| `business-model.html` | Business Model — 5 revenue streams, financial highlights |
| `vision-mission.html` | Vision & Mission — values, strategic goals, ESG commitment |

## 📁 File Structure

```
/
├── index.html
├── about.html
├── crb-network.html
├── services.html
├── technology.html
├── investor-solutions.html
├── business-model.html
├── vision-mission.html
├── css/
│   └── styles.css          ← All styles (design system, layout, components)
├── js/
│   └── main.js             ← All JavaScript (navbar, counters, canvas, forms)
└── assets/
    └── favicon.svg
```

## 🎨 Design System

| Element | Value |
|---------|-------|
| Background Navy | `#07111F` / `#0A1325` |
| Gold Accent | `#C8A85D` |
| Teal Accent | `#17C3B2` |
| Typography | Inter (Google Fonts, CDN) |
| Style | Glassmorphism, gradients, glow effects |

## ✨ Features

- **Sticky glassmorphism navbar** with mobile hamburger menu
- **Canvas particle/network animation** on hero section
- **SVG world map** with CRB nodes and animated pings
- **Animated stat counters** using IntersectionObserver
- **Smooth scroll animations** (fade-in, slide-in on scroll)
- **Contact form** with client-side validation
- **Fully responsive** (desktop, tablet, mobile)
- **Professional footer** with legal disclaimer

## 🚀 Deploying to cPanel

1. Download / clone this repository
2. Zip all files (`index.html`, `about.html`, `crb-network.html`, `services.html`, `technology.html`, `investor-solutions.html`, `business-model.html`, `vision-mission.html`, `css/`, `js/`, `assets/`)
3. Log into your cPanel → **File Manager** → `public_html`
4. Upload the zip and **Extract** it
5. Your site is live! 🎉

No npm install, no build step, no Node.js needed.

## 📋 Notes

- Google Fonts (Inter) is loaded via CDN — requires internet access to render correctly
- All icons are inline SVGs — no external icon library needed
- The contact form uses client-side validation only; add a server-side handler or service (e.g., Formspree, Netlify Forms) for real submissions
