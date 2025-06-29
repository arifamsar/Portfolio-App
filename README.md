# Portfolio Website - Muhammad Arif Amsar

A modern, futuristic portfolio website built with Nuxt.js 3, TypeScript, and shadcn/ui components showcasing mobile development expertise.

## 🚀 Features

- **Dynamic Portfolio Management**: Full CRUD operations for projects
- **Futuristic UI Design**: Modern gradients, animations, and glass morphism effects
- **Responsive Design**: Mobile-first approach with seamless device compatibility
- **Dark/Light Theme**: Automatic theme switching with system preference support
- **Admin Dashboard**: Complete project management interface
- **SEO Optimized**: Meta tags, structured data, and performance optimized
- **Type Safety**: Full TypeScript implementation
- **Modern Tech Stack**: Latest Nuxt.js 3, Tailwind CSS v4, and Vue 3

## 🛠️ Tech Stack

- **Framework**: Nuxt.js 3
- **Language**: TypeScript
- **UI Components**: shadcn/ui (Reka UI)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide Vue Next
- **Package Manager**: Bun
- **Development**: ESLint for code quality

## 📁 Project Structure

```
├── pages/                 # Route pages (index, portfolio, contact, admin)
├── components/            # Reusable Vue components
├── components/ui/         # shadcn/ui components
├── server/api/           # API endpoints for portfolio management
├── server/data/          # JSON data storage
├── types/                # TypeScript type definitions
├── assets/css/           # Global styles and Tailwind configuration
├── layouts/              # Layout components
└── public/               # Static assets
```

## 🎨 Design Features

- **Futuristic UI Elements**: Gradients, glass morphism, subtle animations
- **Consistent Spacing**: Following design system principles
- **Accessibility**: WCAG compliant design patterns
- **Color System**: Custom OKLCH color space with primary/chart variants
- **Smooth Transitions**: Enhanced user experience with fluid animations

## 🔧 Setup

Make sure to install dependencies:

```bash
# Using Bun (recommended)
bun install

# Or npm
npm install

# Or pnpm
pnpm install

# Or yarn
yarn install
```

## 🚀 Development Server

Start the development server on `http://localhost:3000`:

```bash
# Using Bun
bun run dev

# Or npm
npm run dev

# Or pnpm
pnpm dev

# Or yarn
yarn dev
```

## 🏗️ Production

Build the application for production:

```bash
# Using Bun
bun run build

# Or npm
npm run build

# Or pnpm
pnpm build

# Or yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## 📚 API Endpoints

The application includes a RESTful API for portfolio management:

- `GET /api/portfolio` - Fetch all projects
- `POST /api/portfolio` - Create new project
- `PUT /api/portfolio/[id]` - Update existing project
- `DELETE /api/portfolio/[id]` - Delete project
- `GET /api/portfolio/data` - Direct data access

## 🎯 Usage

### Adding Projects

1. Navigate to `/admin` page
2. Click "Add Project" button
3. Fill in project details:
   - Title, description, category
   - Technologies (comma-separated)
   - GitHub and demo URLs
   - Status and featured flag

### Managing Content

- **Portfolio Page**: Displays all projects with filtering and search
- **Contact Page**: Professional contact information and social links
- **Admin Dashboard**: Complete CRUD operations for portfolio management

## 🎨 Customization

### Color Scheme

The project uses a custom OKLCH color system defined in `assets/css/tailwind.css`:

- Primary colors for main actions
- Chart colors for accents and data visualization
- Semantic colors for status indicators
- Full dark/light mode support

### Adding Components

Follow the shadcn/ui pattern for new components:

```bash
# Add new shadcn/ui components using the CLI
npx shadcn-vue@latest add [component-name]
```

## 🔧 Development Guidelines

- **TypeScript**: Use strict typing for all components and functions
- **Vue 3**: Follow Composition API patterns with `<script setup>`
- **ESLint**: Maintain code quality with configured linting rules
- **Responsive**: Mobile-first approach for all UI components
- **Accessibility**: Follow WCAG guidelines for inclusive design

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel

# Or using Vercel CLI
npm i -g vercel
vercel --prod
```

### Netlify

```bash
# Build for static generation
bun run generate

# Deploy the dist folder to Netlify
```

### Custom Server

```bash
# Build for production
bun run build

# Start production server
bun run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Muhammad Arif Amsar**

- GitHub: [@arifamsar](https://github.com/arifamsar)
- LinkedIn: [Muhammad Arif Amsar](https://id.linkedin.com/in/muhammad-arif-amsar)

## 🙏 Acknowledgments

- [Nuxt.js](https://nuxt.com/) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the clean and consistent icons
