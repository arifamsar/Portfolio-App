<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Portfolio Website - Nuxt.js with shadcn/ui

This is a modern portfolio website built with Nuxt.js 3, TypeScript, and shadcn/ui components featuring a futuristic design.

## Tech Stack
- **Framework**: Nuxt.js 3
- **Language**: TypeScript
- **UI Components**: shadcn/ui (Reka UI)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide Vue Next
- **Package Manager**: Bun
- **Development**: ESLint for code quality

## Project Structure
- `/pages/` - Route pages (index, portfolio, contact, admin)
- `/components/` - Reusable Vue components
- `/components/ui/` - shadcn/ui components
- `/server/api/` - API endpoints for portfolio management
- `/server/data/` - JSON data storage
- `/types/` - TypeScript type definitions
- `/assets/css/` - Global styles and Tailwind configuration

## Key Features
- **Dynamic Portfolio Management**: CRUD operations via API
- **Futuristic UI Design**: Modern gradients, animations, and effects
- **Responsive Design**: Mobile-first approach
- **Dark/Light Theme**: Theme switching capability
- **Admin Dashboard**: Project management interface
- **SEO Optimized**: Meta tags and structured data

## Design Principles
- Use futuristic design elements (gradients, glass morphism, subtle animations)
- Maintain consistent spacing and typography
- Ensure accessibility and responsive design
- Follow the established color scheme with primary/chart color variants
- Use shadcn/ui components as the foundation
- Implement smooth transitions and hover effects

## API Endpoints
- `GET /api/portfolio` - Fetch all projects
- `POST /api/portfolio` - Create new project
- `PUT /api/portfolio/[id]` - Update project
- `DELETE /api/portfolio/[id]` - Delete project

## Development Guidelines
- Use TypeScript for type safety
- Follow Vue 3 Composition API patterns
- Implement proper error handling
- Use reactive references and computed properties
- Maintain consistent code formatting with ESLint
- Write self-documenting code with clear variable names

## Color Scheme
The project uses a custom color system with:
- Primary colors for main actions and highlights
- Chart colors for data visualization and accents
- Semantic colors for status and feedback
- Dark/light mode support with OKLCH color space
