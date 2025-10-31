# Ancient Traveler AI - Time Travel Historian Chat

## Overview

Ancient Traveler AI is an immersive chat application that allows users to consult with an AI-powered ancient oracle who has witnessed all of human history. The application provides a real-time streaming chat experience with a mystical, ancient-themed interface inspired by historical manuscripts and museum aesthetics.

The application enables users to ask questions about any historical period, ancient civilization, or timeless wisdom, with responses powered by the Cerebras llama-3.3-70b AI model. The design emphasizes narrative immersion and timeless mystique while maintaining modern functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using functional components and hooks for state management.

**Routing**: Wouter for client-side routing (lightweight alternative to React Router).

**UI Component Library**: Shadcn UI components based on Radix UI primitives, providing accessible, customizable components with consistent styling.

**Styling System**: 
- Tailwind CSS for utility-first styling
- Custom CSS variables for theming (light/dark mode support)
- Design tokens following an ancient manuscript aesthetic with parchment-inspired colors
- Typography hierarchy using Cinzel/IM Fell English for headings, Crimson Text/Lora for responses, and Inter for UI elements

**State Management**:
- React hooks (useState, useEffect, useRef) for local component state
- TanStack Query (React Query) for server state management and API caching
- No global state management library needed due to simple application scope

**Real-time Features**: Server-sent streaming via Fetch API with ReadableStream for progressive response rendering.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**Development Server**: Vite middleware integration for hot module replacement during development, with SSR-style HTML template injection.

**API Design**:
- RESTful endpoint structure
- POST `/api/chat` for streaming chat responses
- Accepts conversation history to maintain context across messages
- Returns streaming text responses using chunked transfer encoding

**AI Integration**: Cerebras Cloud SDK for accessing the llama-3.3-70b model with custom system prompts defining the Ancient Traveler persona.

**Request/Response Flow**:
1. Client sends message with optional conversation history
2. Server validates request using Zod schemas
3. Server streams AI response chunks to client
4. Client accumulates chunks and updates UI progressively

### Build System

**Bundler**: Vite for both development and production builds.

**TypeScript Configuration**:
- Strict mode enabled
- Path aliases for clean imports (@/, @shared/, @assets/)
- Incremental compilation for faster builds
- ESNext module system

**Production Build**:
- Frontend: Vite builds React app to dist/public
- Backend: esbuild bundles server code to dist/
- Separate build processes ensure optimal output for each layer

### Data Models

**Chat Message Schema** (defined in shared/schema.ts):
- `id`: Unique identifier
- `role`: "user" or "assistant" 
- `content`: Message text
- `timestamp`: Unix timestamp

**Validation**: Zod schemas for runtime type validation on both client and server, ensuring type safety across the application boundary.

### Session Management

**Current State**: No authentication or persistent sessions implemented. The application is stateless - conversation history is maintained client-side and passed with each request.

**Storage Abstraction**: MemStorage class provides an in-memory storage interface for future user/session persistence (currently unused but structured for easy database integration).

### Error Handling

**Frontend**: 
- Query error boundaries via TanStack Query
- Toast notifications for user-facing errors
- Loading states during streaming

**Backend**:
- Try-catch blocks around API routes
- Validation errors return 400 with descriptive messages
- Configuration errors (missing API key) return 500
- Streaming errors handled gracefully to prevent incomplete responses

## External Dependencies

### AI Service
- **Cerebras Cloud SDK**: Provides access to llama-3.3-70b language model
- **Configuration**: Requires `CEREBRAS_API_KEY` environment variable
- **Usage**: Streaming chat completions with custom system prompts

### Database
- **Drizzle ORM**: Configured for PostgreSQL via drizzle.config.ts
- **Database Provider**: Neon Database serverless driver (@neondatabase/serverless)
- **Current State**: Database configuration exists but no tables/migrations are implemented
- **Future Use**: Session persistence, user management (schema defined in shared/schema.ts ready for extension)

### UI Components
- **Radix UI**: Headless component primitives for accessibility
- **Shadcn UI**: Pre-styled Radix components with Tailwind CSS
- **Lucide React**: Icon library for UI elements

### Development Tools
- **Replit Plugins**: 
  - Vite runtime error modal overlay
  - Cartographer for code mapping
  - Dev banner for development environment indication
- **ESBuild**: Fast JavaScript bundler for server-side code
- **TSX**: TypeScript execution for development server

### Styling Dependencies
- **Tailwind CSS**: Utility-first CSS framework
- **Autoprefixer**: PostCSS plugin for vendor prefixes
- **class-variance-authority**: Utility for managing component variants
- **tailwind-merge**: Intelligent Tailwind class merging
- **clsx**: Conditional className utility

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation for TypeScript
- **@hookform/resolvers**: Zod resolver integration for React Hook Form

### Fonts
- **Google Fonts**: 
  - Cinzel (historical serif for headings)
  - Crimson Text (elegant serif for AI responses)
  - Inter (modern sans-serif for UI)
  - Lora (alternative serif option)