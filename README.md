# 🚀 TK's Portfolio - Modern Full-Stack Portfolio Website

A modern, full-stack personal portfolio website built with cutting-edge technologies. Features a blog, project showcases, interactive features, and real-time integrations with multiple APIs.

**Live Demo:** [https://tk-portfolio-web.vercel.app/](https://tk-portfolio-web.vercel.app/)  
**GitHub:** [https://github.com/taxilkath/tkPortfolio](https://github.com/taxilkath/tkPortfolio)

## ✨ Features

- 🏠 **Modern Homepage** - Interactive hero section with animated elements and real-time stats
- 📝 **Blog System** - MDX-powered blog with syntax highlighting and custom components
- 🎯 **Project Showcase** - Detailed project pages with tech stack visualization
- 🌍 **Internationalization** - Multi-language support (English & Hindi)
- 📊 **Real-time Integrations** - Live data from GitHub, Spotify, WakaTime, and YouTube
- 🎨 **Dark/Light Mode** - Seamless theme switching
- 🔍 **Search & Navigation** - Command palette with keyboard shortcuts
- 📱 **Responsive Design** - Mobile-first approach
- ⚡ **Performance Optimized** - Bundle analysis, image optimization, and caching
- 🧪 **Comprehensive Testing** - Unit tests and E2E tests
- 🔒 **Type Safety** - End-to-end TypeScript with Zod validation
- 📈 **Analytics** - Privacy-focused analytics
- 🚀 **CI/CD** - Automated deployment

## 🛠️ Technology Stack

### **🏗️ Monorepo & Build Tools**

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Monorepo** | Turborepo | 2.5.4 | Build system and task orchestration |
| **Package Manager** | pnpm | 10.12.4 | Fast, disk space efficient package manager |
| **Workspaces** | pnpm Workspaces | - | Package management and dependency sharing |
| **TypeScript** | TypeScript | 5.8.3 | Type-safe JavaScript development |
| **Code Quality** | ESLint | 9.28.0 | Code linting and style enforcement |
| **Formatting** | Prettier | 3.5.3 | Code formatting with custom config |
| **Spell Check** | cspell | 9.0.2 | Spell checking for code and content |

### **🎨 Frontend Framework & UI**

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | Next.js | 15.3.3 | React framework with App Router |
| **React** | React | 19.1.0 | Latest React with concurrent features |
| **Styling** | Tailwind CSS | 4.1.8 | Utility-first CSS framework |
| **UI Components** | Radix UI | - | Accessible, headless UI primitives |
| **Animations** | Framer Motion | 12.23.6 | Smooth animations and transitions |
| **Icons** | Lucide React | 0.513.0 | Beautiful, customizable icons |
| **Themes** | next-themes | 0.4.6 | Dark/light mode switching |
| **Forms** | React Hook Form | 7.57.0 | Performant forms with validation |
| **Charts** | Recharts | 2.15.3 | Composable charting library |

### **🔧 Backend & API**

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **API Framework** | oRPC | 1.6.0 | Type-safe RPC framework |
| **Server State** | TanStack Query | 5.80.3 | Server state management and caching |
| **Database ORM** | Drizzle | - | Type-safe database queries |
| **Database** | PostgreSQL | - | Primary database |
| **Caching** | Redis (Upstash) | - | Caching and rate limiting |
| **Validation** | Zod | 3.25.51 | Schema validation |
| **Authentication** | Better Auth | - | Modern authentication |

### **📊 External API Integrations**

| Category | Technology | Purpose |
|----------|------------|---------|
| **GitHub API** | @octokit/rest | Repository stats and user data |
| **Spotify API** | Custom integration | Music listening statistics |
| **WakaTime API** | Custom integration | Coding activity tracking |
| **YouTube API** | Custom integration | Video statistics |
| **Email** | Resend | Transactional emails |

### **📝 Content Management**

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Markdown** | MDX | - | Markdown with JSX components |
| **Content Collections** | @content-collections | 0.9.0 | Type-safe content management |
| **Syntax Highlighting** | Shiki | 3.5.0 | Beautiful code highlighting |
| **Markdown Processing** | Remark/Rehype | - | Markdown transformation pipeline |
| **Internationalization** | next-intl | 4.1.0 | Multi-language support |

### **🧪 Testing & Quality**

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Unit Testing** | Vitest | 3.2.1 | Fast unit testing framework |
| **E2E Testing** | Playwright | 1.52.0 | End-to-end testing |
| **Testing Library** | @testing-library/react | 16.3.0 | React component testing |
| **Coverage** | @vitest/coverage-v8 | 3.2.1 | Test coverage reporting |
| **Accessibility** | @axe-core/playwright | 4.10.2 | Accessibility testing |

### **🚀 Performance & Analytics**

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Bundle Analysis** | @next/bundle-analyzer | 15.3.3 | Bundle size optimization |
| **Performance Monitoring** | @vercel/speed-insights | 1.2.0 | Real-time performance tracking |
| **Analytics** | Umami | - | Privacy-focused analytics |
| **Image Optimization** | Sharp | 0.34.2 | Image processing and optimization |

### **🛠️ Development Tools**

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Code Generation** | @turbo/gen | 2.5.4 | Scaffolding and generators |
| **Git Hooks** | Husky | 9.1.7 | Git hooks management |
| **Commit Linting** | @commitlint | 19.8.1 | Conventional commit enforcement |
| **Unused Code** | Knip | 5.60.0 | Dead code detection |
| **Environment** | dotenv-cli | 8.0.0 | Environment variable management |

### **📦 Shared Packages**

| Package | Purpose |
|---------|---------|
| `@taxilkath/ui` | Shared UI component library |
| `@taxilkath/utils` | Utility functions and helpers |
| `@taxilkath/i18n` | Internationalization utilities |
| `@taxilkath/env` | Type-safe environment variables |
| `@taxilkath/mdx-plugins` | Custom MDX transformations |
| `@taxilkath/kv` | Key-value store utilities |
| `@taxilkath/shared` | Shared configurations and headers |

## 🏗️ Project Structure

```
taxilkathPortfolio/
├── apps/
│   └── web/                    # Main portfolio application
│       ├── src/
│       │   ├── app/           # Next.js App Router
│       │   ├── components/    # React components
│       │   ├── content/       # MDX content (blog, projects)
│       │   ├── orpc/          # API routes and schemas
│       │   ├── lib/           # Utilities and configurations
│       │   └── stores/        # Zustand state management
│       └── public/            # Static assets
├── packages/                   # Shared packages
│   ├── ui/                    # UI component library
│   ├── utils/                 # Utility functions
│   ├── i18n/                  # Internationalization
│   ├── env/                   # Environment variables
│   └── mdx-plugins/          # MDX transformations
└── turbo/                     # Turborepo generators
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 22
- pnpm >= 10.12.4
- PostgreSQL database
- Redis instance (Upstash recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/taxilkath/tkPortfolio.git
cd tkPortfolio

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Setup database
pnpm db:migrate
pnpm db:seed

# Start development server
pnpm dev
```

### Environment Variables

```bash
# Database
DATABASE_URL="postgresql://..."

# Redis (Upstash)
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."

# External APIs
GITHUB_TOKEN="..."
WAKATIME_API_KEY="..."
SPOTIFY_CLIENT_ID="..."
SPOTIFY_CLIENT_SECRET="..."

# Email
RESEND_API_KEY="..."

# Analytics
NEXT_PUBLIC_UMAMI_URL="..."
NEXT_PUBLIC_UMAMI_WEBSITE_ID="..."
```

## 📜 Available Scripts

### Development
```bash
pnpm dev          # Start all apps in development
pnpm dev:web      # Start web app only
pnpm dev:packages # Start package development
```

### Building
```bash
pnpm build        # Build all apps
pnpm build:web    # Build web app only
pnpm build:packages # Build packages only
```

### Testing
```bash
pnpm test:unit    # Run unit tests
pnpm test:e2e     # Run E2E tests
pnpm test:coverage # Run tests with coverage
```

### Code Quality
```bash
pnpm check        # Run all checks (lint, type-check, format)
pnpm lint         # Run ESLint
pnpm format       # Run Prettier
pnpm type-check   # Run TypeScript checks
```

### Database
```bash
pnpm db:migrate   # Run database migrations
pnpm db:seed      # Seed database
pnpm db:studio    # Open Drizzle Studio
```

## 🎯 Key Features Implementation

### **Real-time Stats Integration**
- GitHub stats (stars, followers, repositories)
- Spotify listening history
- WakaTime coding activity
- YouTube channel statistics

### **Content Management**
- MDX-powered blog with custom components
- Project showcases with tech stack visualization
- Internationalization support (EN/HI)
- SEO optimization with structured data

### **Performance Optimization**
- Bundle analysis and code splitting
- Image optimization with Sharp
- Redis caching for API responses
- Vercel Speed Insights integration

### **Developer Experience**
- Hot reload with Turbopack
- Type-safe APIs with oRPC
- Comprehensive testing suite
- Automated code quality checks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Turborepo](https://turbo.build/) - Monorepo build system
- [Radix UI](https://www.radix-ui.com/) - Accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Vercel](https://vercel.com/) - Deployment platform

---

**Built with ❤️ by [Taxil Kathiriya](https://github.com/taxilkath)** 