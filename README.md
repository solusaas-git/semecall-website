# Semecall Website

Modern, multilingual corporate website for Semecall - The Expert in Remote Sales Performance.

## Features

- 🌐 **Multilingual Support**: French (FR), English (EN), Dutch (NL)
- 🎨 **Modern Design**: Dark theme with gold accents, professional and sophisticated
- 📱 **Mobile-First**: Fully responsive across all devices
- ⚡ **High Performance**: Built with Next.js 15 for optimal speed and SEO
- 🎭 **Smooth Animations**: Framer Motion for elegant transitions
- 📝 **Contact Form**: Functional form with validation and GDPR compliance
- 🧭 **Smooth Navigation**: Sticky floating navbar with section scrolling

## Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Styling**: Tailwind CSS 4
- **Internationalization**: next-intl
- **Animations**: Framer Motion
- **Form Management**: React Hook Form + Zod validation
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd nextjs-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
nextjs-app/
├── app/
│   ├── [locale]/          # Localized routes
│   │   ├── layout.tsx     # Root layout with i18n
│   │   └── page.tsx       # Main landing page
│   ├── api/
│   │   └── contact/       # Contact form API endpoint
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.tsx     # Sticky navigation bar
│   ├── Hero.tsx          # Hero section
│   ├── Mission.tsx       # Mission section
│   ├── Approach.tsx      # Approach section
│   ├── Expertise.tsx     # Services/expertise section
│   ├── Results.tsx       # Results section
│   ├── TrustedBy.tsx     # Client logos section
│   ├── Multilingual.tsx  # Languages section
│   ├── Contact.tsx       # Contact form section
│   └── Footer.tsx        # Footer
├── messages/             # Translation files
│   ├── fr.json          # French translations
│   ├── en.json          # English translations
│   └── nl.json          # Dutch translations
├── i18n.ts              # i18n configuration
├── middleware.ts        # Next.js middleware for i18n
└── tailwind.config.ts   # Tailwind configuration
```

## Sections

The landing page consists of the following sections:

1. **Navigation Bar** - Floating, rounded, sticky navigation with language selector
2. **Hero** - Eye-catching headline with CTA
3. **Mission** - Company vision and values
4. **Approach** - Tailor-made methodology
5. **Expertise** - Six core services (B2B/B2C prospecting, appointments, follow-up, retention, surveys, support)
6. **Results** - Key benefits and value propositions
7. **Trusted By** - Client logos (Proximus, General Energie, NEO Group, etc.)
8. **Multilingual Coverage** - Languages supported (FR, EN, AR, NL, ES)
9. **Contact** - Contact form with company information
10. **Footer** - Links, social media, legal information

## Customization

### Colors

The color scheme is defined in `tailwind.config.ts`:
- Primary: Dark black/gray tones
- Accent: Gold (#d4af37) and deep blue (#1e40af)

### Translations

To modify translations, edit the JSON files in the `messages/` directory:
- `fr.json` - French
- `en.json` - English
- `nl.json` - Dutch

### Contact Form

The contact form currently logs submissions to the console. To integrate with an email service:

1. Edit `app/api/contact/route.ts`
2. Add your preferred email service (SendGrid, AWS SES, Resend, etc.)
3. Configure environment variables for API keys

## Building for Production

```bash
npm run build
npm start
```

## SEO

The site includes:
- Dynamic meta tags per locale
- Semantic HTML structure
- Optimized for search engines
- Fast page loads

## Accessibility

- WCAG compliant
- Keyboard navigation support
- Proper semantic HTML
- ARIA labels where needed

## Contact Information

- **Email**: contact@semecall.com
- **Phone**: +33 6 43 34 58 45 / +212 6 64 96 43 98
- **Address**: N3 rue Lalla Amina, quartier l'Hyppodrome, Résidence Triangle d'Or, 4ème étage, numéro 46, Fes, Maroc

## License

© 2025 Semecall. All rights reserved.
