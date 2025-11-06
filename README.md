# Zeal AI Limited - Professional Product Portfolio

A professional portfolio website for Zeal AI Limited, showcasing AI-powered products and case studies.

## Overview

This is a TypeScript-based portfolio website built with:
- **TypeScript** for type-safe development
- **HTML5 & CSS3** for modern, responsive design
- **Vanilla JavaScript** (compiled from TypeScript) for interactive features
- Design inspired by [Zeal Sourcing](https://www.zealsourcing.fi/)

## Features

- **Responsive Design**: Mobile-optimized and works on all screen sizes
- **Vision & Mission**: Clear presentation of company values and promises
- **Product Showcase**: 5 AI-powered products with ratings and features
- **Case Studies**: Detailed case study featuring Retta Property Management transformation
- **Professional Styling**: Clean, modern design with consistent branding
- **Interactive Elements**: Smooth scrolling, hover effects, and animations

## Project Structure

```
Home page/
├── index.html              # Main HTML file
├── styles.css              # All CSS styles
├── logo.png                # Zeal AI logo
├── from_excel_gumnastics_to_lean_process.pdf  # Case study PDF
├── src/
│   └── main.ts            # TypeScript source code
├── dist/
│   └── main.js            # Compiled JavaScript
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project dependencies
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. The dependencies are already installed, but if you need to reinstall:
```bash
npm install
```

### Development

1. **Build TypeScript**:
```bash
npm run build
```

2. **Watch mode** (auto-compile on changes):
```bash
npm run watch
```

3. **Serve locally** (opens browser automatically):
```bash
npm run serve
```

Then open your browser to `http://localhost:8080`

## Sections

### 1. Hero Section
- Company slogan: "We Build Companies That Think"
- Partnership mention with Zeal Sourcing

### 2. Vision & Mission
Four key value propositions:
- Vision
- Mission
- Customer Promise
- Our Promise (100% satisfaction guarantee)

### 3. Products
Five AI-powered products:
1. **Massify** - Personalized proposal generation (4.9/5 rating)
2. **Professional Demand Manager** - Procurement automation (4.9/5 rating)
3. **Retta Laskutusapuri** - Invoice assistant
4. **dirty#clean** - Master data cleaning
5. **Professional Buyer** - AI agent evaluator

### 4. Case Studies
Featured: **From Excel Gymnastics to Lean Workflow**
- Client: Retta Property Management
- Results: 78% cost reduction, 10x faster processing, 99.9% accuracy
- Full PDF available for download

### 5. Contact/CTA
- Call-to-action buttons
- Links to Zeal Sourcing partner site

## Design Philosophy

The design follows Zeal Sourcing's aesthetic:
- **Colors**: Black (#000), Red accent (#FF0000), White background
- **Typography**: Arial/Helvetica sans-serif
- **Layout**: Grid-based, responsive
- **Transitions**: Smooth 0.4s ease animations
- **Spacing**: Consistent spacing system

## Customization

### Colors
Edit CSS custom properties in `styles.css`:
```css
:root {
    --color-primary: #000000;
    --color-accent: #FF0000;
    /* etc. */
}
```

### Content
Edit `index.html` to modify:
- Product descriptions
- Case study content
- Vision/mission statements
- Contact information

### Functionality
Edit `src/main.ts` to modify:
- Scroll behavior
- Animations
- Interactive features

Then run `npm run build` to compile.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Serverless-ready (designed for Vercel deployment)
- Minimal JavaScript footprint
- Optimized CSS with CSS variables
- Fast load times

## Contact

For questions or support:
- Email: mikko@zealsourcing.fi
- Website: [Zeal Sourcing](https://www.zealsourcing.fi/)

## License

© 2025 Zeal AI Limited. All rights reserved.

---

**Slogan**: "We build companies that think."
