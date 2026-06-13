# Kokonut UI

A modern, minimal, and highly customizable UI library built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Perfect for creating stunning landing pages and digital experiences.

## Features

- **Modern Design System** - Beautifully crafted components with geometric shapes and smooth animations
- **Fast & Optimized** - Built on Next.js 15+ for blazing-fast performance
- **Smooth Animations** - Powered by Framer Motion for elegant interactions
- **TypeScript Ready** - Fully typed for better developer experience
- **Dark Mode Support** - Built-in theme system for light and dark modes
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Reusable Components** - Production-ready UI components

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd "Kokonut UI"

# Install dependencies
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

The page will auto-update as you edit files. Try modifying `app/page.tsx` to see changes in real-time.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── demo.tsx            # Demo components
│   └── ui/                 # Reusable UI components
├── lib/
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## Components

### HeroGeometric
A stunning hero section component with animated geometric shapes and gradient text.

```tsx
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

export default function Home() {
  return (
    <HeroGeometric 
      badge="Kokonut UI"
      title1="Elevate Your"
      title2="Digital Vision"
    />
  );
}
```

## Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion)
- **Icons**: [Lucide React](https://lucide.dev)
- **Linting**: [ESLint](https://eslint.org)

## License

MIT License - feel free to use this project for personal and commercial purposes.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---

Made by Your Name
