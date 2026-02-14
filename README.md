# PK-Chat Frontend

A professional, responsive landing page for PK-Chat built with Angular 19 and Angular Material, featuring bilingual support (French/English) and a modern, elevated design system.

## 🚀 Features

- **Modern Angular 19 Architecture**: Standalone components, lazy-loaded routes, and optimized change detection
- **Bilingual Support (i18n)**: Instant language switching between French (default) and English
- **Responsive Design**: Optimized for desktop (≥1024px), tablet (768px-1023px), and mobile (<768px)
- **Professional Design System**: Following the Professional Elevated Style Guide with layered shadows and refined color palette
- **Angular Material Integration**: Pre-configured Material components for consistent UI
- **Iconify Integration**: Lucide icons for a modern, clean look
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation support

## 📋 Prerequisites

- Node.js 18+ (tested with v24.13.0)
- npm 9+ (tested with 11.6.2)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/ftd6435/pk-chat-frontend.git
cd pk-chat-frontend
```

2. Install dependencies:
```bash
npm install
```

## 🏃 Development Server

Start the development server:
```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## 🏗️ Build

Build the project for production:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                           # Core services and models
│   │   ├── services/
│   │   │   └── translation.service.ts  # i18n translation service
│   │   ├── models/
│   │   │   └── language.model.ts       # Language type definitions
│   │   └── constants/
│   │       └── translations.constant.ts # Language constants
│   ├── shared/                         # Shared components
│   │   └── components/
│   │       ├── header/                 # Header with navigation and language switcher
│   │       └── footer/                 # Footer with links and social media
│   ├── features/                       # Feature modules
│   │   └── landing/                    # Landing page feature
│   │       ├── landing.component.ts
│   │       └── sections/
│   │           ├── hero-section/       # Hero section with CTA
│   │           ├── features-section/   # Features showcase
│   │           └── cta-section/        # Call-to-action section
│   ├── app.component.ts
│   ├── app.config.ts                   # App configuration with providers
│   └── app.routes.ts                   # Routing configuration
├── assets/
│   └── i18n/                           # Translation files
│       ├── fr.json                     # French translations
│       └── en.json                     # English translations
└── styles/                             # Global styles and design system
    ├── _variables.scss                 # Design system tokens
    ├── _typography.scss                # Typography system
    ├── _mixins.scss                    # SCSS mixins
    └── styles.scss                     # Global styles
```

## 🎨 Design System

The application follows the Professional Elevated Style Guide with:

### Colors
- **Primary**: #1A2B4A (Navy blue)
- **Accent Gold**: #C9A961
- **Accent Teal**: #6B9FA3
- **Accent Warm Gray**: #8B8478

### Typography
- Font Stack: System fonts
- Sizes: Caption (14px), Body (16px), Card Title (18px), Page Title (24px), Headline (30px), Hero (48px)

### Shadows
Layered elevation system with four levels: Subtle, Moderate, Pronounced, Strong

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: ≥ 1024px

## 🌐 Internationalization (i18n)

The application supports French (default) and English with instant language switching.

## 📦 Technologies

- Angular 19.x
- Angular Material 19.x
- TypeScript
- SCSS
- Iconify (Lucide icons)
- RxJS

## 📄 License

© 2024 PK-Chat. All rights reserved.
