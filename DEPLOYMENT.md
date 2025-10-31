# Ancient Traveler AI - Deployment Guide

## 📁 Project Structure

```
ancient-traveler-ai/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.tsx            # Main chat interface page
│   │   ├── components/             # Reusable UI components (shadcn)
│   │   ├── lib/                    # Utilities and configurations
│   │   └── App.tsx                 # Main app router
│   ├── index.html                  # HTML entry point with SEO meta tags
│   └── public/                     # Static assets
├── server/                          # Backend Express server
│   ├── routes.ts                   # API route handlers
│   ├── index.ts                    # Server entry point
│   └── vite.ts                     # Vite dev server integration
├── shared/
│   └── schema.ts                   # Shared TypeScript types and schemas
├── attached_assets/
│   └── generated_images/           # AI-generated images (hero, avatar)
├── package.json                    # Dependencies and scripts
├── tailwind.config.ts              # Tailwind CSS configuration
├── vite.config.ts                  # Vite build configuration
└── .env                            # Environment variables (not in git)
```

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
CEREBRAS_API_KEY=your_cerebras_api_key_here
SESSION_SECRET=your_random_session_secret
```

**Important:** Never commit `.env` to GitHub! It's already in `.gitignore`.

## 🚀 GitHub Setup

### 1. Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Ancient Traveler AI chat app"
```

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it: `ancient-traveler-ai` (or your preferred name)
3. **Do NOT** initialize with README, .gitignore, or license (we already have these)

### 3. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/ancient-traveler-ai.git
git branch -M main
git push -u origin main
```

## 📦 Netlify Deployment (Free Tier)

### Option 1: Deploy from GitHub (Recommended)

1. **Login to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up or login (use your GitHub account for easier integration)

2. **Import Your Project**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" as your Git provider
   - Authorize Netlify to access your GitHub repositories
   - Select your `ancient-traveler-ai` repository

3. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

4. **Add Environment Variables**
   - Go to Site settings → Environment variables
   - Add the following variables:
     ```
     CEREBRAS_API_KEY = your_cerebras_api_key
     SESSION_SECRET = your_random_session_secret
     ```

5. **Deploy**
   - Click "Deploy site"
   - Netlify will build and deploy your app automatically
   - You'll get a URL like: `https://your-app-name.netlify.app`

### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify site
netlify init

# Deploy
netlify deploy --prod
```

## 🔧 Build Configuration

The project is already configured for production builds:

**package.json** includes:
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

**vite.config.ts** is set up to:
- Bundle the React frontend
- Serve the Express backend
- Handle API routes properly in production

## 🌐 Custom Domain (Optional)

After deployment on Netlify:

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow instructions to configure your DNS
4. Netlify provides free HTTPS/SSL automatically

## 📝 Important Files

### Code Files You Need

1. **Frontend (client/src/)**
   - `pages/Home.tsx` - Main chat interface
   - `App.tsx` - Route configuration
   - Copy all `components/ui/` - Shadcn UI components

2. **Backend (server/)**
   - `routes.ts` - API endpoints for chat
   - `index.ts` - Express server setup

3. **Shared (shared/)**
   - `schema.ts` - TypeScript types

4. **Configuration**
   - `package.json` - All dependencies
   - `tailwind.config.ts` - Design system
   - `vite.config.ts` - Build config
   - `tsconfig.json` - TypeScript config

### Assets
- `attached_assets/generated_images/` - Hero background and avatar icon

## 🧪 Local Development

```bash
# Install dependencies
npm install

# Set environment variables
# Create .env file with CEREBRAS_API_KEY

# Start development server
npm run dev

# Access at http://localhost:5000
```

## ✅ Pre-Deployment Checklist

- [ ] `.env` file is NOT committed to Git
- [ ] All environment variables are set in Netlify
- [ ] Build completes successfully locally: `npm run build`
- [ ] API endpoints are configured correctly
- [ ] Images are included in the build
- [ ] CEREBRAS_API_KEY is valid and has credits

## 🐛 Troubleshooting

### Build Fails on Netlify

- Check build logs for missing dependencies
- Verify all imports use correct paths
- Ensure environment variables are set

### API Not Working

- Verify CEREBRAS_API_KEY is set in Netlify environment variables
- Check that serverless functions are deploying correctly
- Review Netlify Function logs

### Images Not Loading

- Ensure images are in `attached_assets/` directory
- Verify import paths use `@assets/` alias
- Check Vite asset handling configuration

## 📚 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, Node.js
- **AI**: Cerebras Cloud SDK (llama-3.3-70b)
- **Build**: Vite
- **Deployment**: Netlify (or any Node.js hosting)

## 🎨 Design System

Colors and typography are configured in:
- `client/src/index.css` - CSS variables for light/dark themes
- `tailwind.config.ts` - Tailwind theme extensions
- Ancient-themed fonts: Cinzel, Crimson Text, Lora

---

**Need Help?**
- Netlify Docs: https://docs.netlify.com
- Cerebras AI Docs: https://docs.cerebras.ai
- Issues? Check the troubleshooting section above
