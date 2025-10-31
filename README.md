# 🕰️ Ancient Traveler - AI Time Travel Historian

An immersive AI chat experience where you can consult with an ancient oracle who has witnessed all of history. Ask questions about any historical period, ancient civilization, or timeless wisdom, powered by Cerebras AI.

![Ancient Traveler](https://img.shields.io/badge/AI-Cerebras%20llama--3.3--70b-orange)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan)

## ✨ Features

- 🎨 **Stunning Ancient-Themed UI** - Parchment-inspired design with mystical aesthetics
- 💬 **Real-Time Streaming Chat** - Watch responses appear as the AI "thinks"
- 🤖 **Powered by Cerebras AI** - Lightning-fast llama-3.3-70b model
- 📱 **Fully Responsive** - Beautiful on desktop, tablet, and mobile
- ⚡ **Modern Tech Stack** - React, TypeScript, Express, Tailwind CSS
- 🌙 **Dark/Light Themes** - Adaptive color scheme (coming soon)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Cerebras API key ([Get one here](https://cerebras.ai))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ancient-traveler-ai.git
   cd ancient-traveler-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   CEREBRAS_API_KEY=your_cerebras_api_key_here
   SESSION_SECRET=your_random_session_secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   Navigate to http://localhost:5000
   ```

## 📁 Project Structure

```
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── components/ # Reusable UI components
│   │   └── lib/        # Utilities
├── server/              # Express backend
│   ├── routes.ts       # API endpoints
│   └── index.ts        # Server setup
├── shared/              # Shared types and schemas
└── attached_assets/     # Images and media
```

## 🎨 Design Philosophy

The Ancient Traveler experience is built on three pillars:

1. **Timeless Mystique** - Evoke ancient wisdom without sacrificing modern usability
2. **Narrative Immersion** - Every element tells a story of consulting an oracle
3. **Purposeful Ornamentation** - Historical details enhance, never distract

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, Node.js
- **AI**: Cerebras Cloud SDK (llama-3.3-70b model)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom ancient theme
- **Fonts**: Cinzel, Crimson Text, Lora (Google Fonts)

## 🌐 Deployment

### Deploy to Netlify (Recommended)

1. Push your code to GitHub
2. Connect your repo to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy!

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## 🎯 Usage

1. **Start a Conversation**: Click "Begin Your Journey" on the hero section
2. **Ask Questions**: Type your question about any historical period or ancient topic
3. **Watch Magic Happen**: See the AI stream its response in real-time
4. **Continue Learning**: Build on the conversation to dive deeper into history

### Example Questions

- "Tell me about the construction of the Great Pyramid of Giza"
- "What was daily life like in ancient Rome?"
- "Explain the significance of the Silk Road"
- "What happened during the fall of Constantinople?"

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Powered by [Cerebras AI](https://cerebras.ai)
- UI Components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
- Built with [Vite](https://vitejs.dev) and [React](https://react.dev)

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Journey through time with the Ancient Traveler** 🕰️✨
