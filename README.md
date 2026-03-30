# Ojas Solution 🌸

A modern, secure Next.js application for wellness and mental health support tailored for Indian youth.

![Next.js](https://img.shields.io/badge/Next.js-16.2.0-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🤖 **AI-Powered Chat** - Secure, private conversations with Gemini AI
- 🌈 **60+ UI Components** - Complete component library built with Radix UI
- 📱 **Fully Responsive** - Mobile-first design with Tailwind CSS
- 🎨 **Beautiful Animations** - Smooth transitions with Framer Motion
- 🔐 **Security First** - No hardcoded secrets, environment-based configuration
- ♿ **Accessible** - WCAG compliant components
- 🚀 **Production Ready** - Pre-optimized, pre-rendered static pages
- 📊 **Community Features** - Feed, profiles, challenges, and streaks

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or pnpm
- Google API Key ([Get one free](https://aistudio.google.com/apikey))

### Installation

```bash
# Clone repository
git clone git@github.com:0x-rudra/Ojas-Solution.git
cd Ojas-Solution

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local

# Add your Google API Key to .env.local
# Edit .env.local and set NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📁 Project Structure

```
Ojas-Solution/
├── app/                          # Next.js App Router
│   ├── ai/                      # AI Chat Interface
│   ├── feed/                    # Social Feed
│   ├── profile/                 # User Profile
│   ├── community/               # Community Hub
│   ├── about/                   # About Page
│   └── privacy/                 # Privacy Policy
│
├── components/                   # React Components (500+ KB)
│   ├── ui/                      # Base Components (60+)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── dialog.tsx
│   │   ├── table.tsx
│   │   └── ... (50+ more)
│   ├── layout/                  # Layout Components
│   │   ├── navbar.tsx
│   │   ├── sidebar.tsx
│   │   └── bottom-nav.tsx
│   ├── feed/                    # Feed Components
│   ├── profile/                 # Profile Components
│   ├── auth/                    # Auth Components
│   └── ojas/                    # Brand Components
│       ├── post-card.tsx
│       ├── challenge-card.tsx
│       ├── streak-calendar.tsx
│       └── ... (10+ more)
│
├── hooks/                        # Custom React Hooks
│   ├── use-mobile.ts
│   ├── use-toast.ts
│   └── use-effects.ts
│
├── lib/                          # Utilities
│   ├── utils.ts
│   ├── user-context.tsx
│   └── constants.ts
│
├── styles/                       # Tailwind CSS
│   └── globals.css
│
├── public/                       # Static Assets
├── .env.example                  # Environment Template
├── .env.local                    # Local Development Keys (Git Ignored)
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
└── DEPLOYMENT.md                 # Deployment Guide
```

## 🔐 Security

### API Key Management
The application now uses environment variables for all sensitive data:

```bash
# Development
echo "NEXT_PUBLIC_GEMINI_API_KEY=your_key" > .env.local

# Production (Vercel)
# Set in Vercel Dashboard → Settings → Environment Variables
```

### Never commit:
- ❌ `.env.local`
- ❌ API keys in source code
- ❌ Sensitive credentials

### Use instead:
- ✅ `.env.example` template
- ✅ Environment variables
- ✅ Secrets management tools

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.2.0 | React Framework |
| react | 19 | UI Library |
| @google/generative-ai | ^0.24.1 | Gemini AI |
| @radix-ui/* | Latest | Accessible UI |
| framer-motion | ^10+ | Animations |
| tailwindcss | ^3+ | Styling |
| react-hook-form | ^7+ | Forms |
| zod | ^3+ | Validation |

## 🎯 Available Routes

| Route | Purpose |
|-------|---------|
| `/` | Home Page |
| `/ai` | AI Chat Interface |
| `/feed` | Social Feed |
| `/profile` | User Profile |
| `/community` | Community Hub |
| `/about` | About Information |
| `/privacy` | Privacy Policy |

## 🔧 Configuration

### Environment Variables
```bash
# Required
NEXT_PUBLIC_GEMINI_API_KEY=your_google_api_key

# Optional
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_SECRET_API_KEY=your_secret_key
```

### Tailwind Configuration
Customize colors in `tailwind.config.ts`:
```ts
extend: {
  colors: {
    'deep-navy': '#0f172a',
    'calm-blue': '#6c7ae0',
    'saffron': '#f4a024',
    'healing-green': '#10b981',
  }
}
```

## ✅ Testing

```bash
# Build verification
npm run build

# Lint check
npm run lint

# Development test
npm run dev
```

**Last Build Status**: ✅ Successful
- 0 Errors
- 0 Warnings
- All 9 routes pre-rendered
- TypeScript validated

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel deploy --prod

# Set environment variables in Vercel Dashboard
```

### Docker
```bash
# Build image
docker build -t ojas-solution:latest .

# Run container
docker run -e NEXT_PUBLIC_GEMINI_API_KEY=your_key -p 3000:3000 ojas-solution:latest
```

### Self-Hosted
```bash
# Build
npm run build

# Start
npm start

# For systemd, create /etc/systemd/system/ojas.service
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🎓 Component Library

### Base Components (60+)
- Button, Card, Input, Label, Avatar, Badge
- Form, Checkbox, Radio, Switch, Select
- Dialog, Alert, Toast, Tooltip, Popover
- Table, Tabs, Accordion, Drawer
- Carousel, Calendar, Skeleton, Spinner
- And 40+ more...

### Custom Hooks
- `useToast()` - Toast notifications
- `useMobile()` - Responsive detection

### Utilities
- `cn()` - Classname merge utility
- `formatDate()` - Date formatting
- Context: User authentication

## 🎨 Theming

Built-in theme colors:
```css
--deep-navy: #0f172a
--calm-blue: #6c7ae0
--saffron: #f4a024
--healing-green: #10b981
--warm-orange: #ea580c
--warning-red: #ef4444
```

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Build fails
```bash
rm -rf .next node_modules pnpm-lock.yaml
pnpm install
npm run build
```

### API key not working
1. Verify key at [Google AI Studio](https://aistudio.google.com/apikey)
2. Check `.env.local` has correct value
3. Restart dev server
4. Clear browser cache

## 📄 License

MIT License - See LICENSE file for details

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- 📧 Email: support@ojas.example
- 💬 Issues: [GitHub Issues](https://github.com/0x-rudra/Ojas-Solution/issues)
- 📚 Docs: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🙏 Acknowledgments

- Google Generative AI for Gemini API
- [Radix UI](https://www.radix-ui.com/) for components
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- India's wellness community

---

**Built with ❤️ by the Ojas Team**
**Ready for Production Deployment** ✅
