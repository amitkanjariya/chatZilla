# ChatZilla

A modern, real-time chat application built with Next.js, offering seamless communication with a beautiful and intuitive user interface.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Development](#development)
- [Building for Production](#building-for-production)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Contact](#contact)

## 🌟 Overview

ChatZilla is a cutting-edge real-time chat application designed to provide users with a smooth and engaging messaging experience. Built on the robust Next.js framework, it leverages modern web technologies to deliver fast, responsive, and scalable communication solutions.

## ✨ Features

- **Real-time Messaging**: Instant message delivery and reception
- **Modern UI/UX**: Clean, intuitive interface built with responsive design principles
- **Fast Performance**: Optimized with Next.js for superior speed and performance
- **TypeScript Support**: Full TypeScript integration for type-safe development
- **Auto-updating**: Pages auto-update as you edit files during development
- **Font Optimization**: Automatic font optimization using Next.js font system with Geist font family
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Server-Side Rendering**: Enhanced SEO and initial load performance
- **Hot Reload**: Instant preview of changes during development

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (Latest version)
- **Language**: TypeScript / JavaScript
- **Styling**: CSS Modules / Tailwind CSS
- **Font**: [Geist](https://vercel.com/font) - Optimized font family
- **Package Manager**: npm / yarn / pnpm / bun (flexible choice)
- **React**: Latest version for UI components

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher
- **Package Manager**: One of the following:
  - npm (comes with Node.js)
  - yarn (`npm install -g yarn`)
  - pnpm (`npm install -g pnpm`)
  - bun (`curl -fsSL https://bun.sh/install | bash`)
- **Git**: For version control

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amitkanjariya/chatZilla.git
   cd chatZilla
   ```

2. **Install dependencies**
   
   Using npm:
   ```bash
   npm install
   ```
   
   Using yarn:
   ```bash
   yarn install
   ```
   
   Using pnpm:
   ```bash
   pnpm install
   ```
   
   Using bun:
   ```bash
   bun install
   ```

## 🏃‍♂️ Running the Application

### Development Mode

Start the development server with hot-reload enabled:

Using npm:
```bash
npm run dev
```

Using yarn:
```bash
yarn dev
```

Using pnpm:
```bash
pnpm dev
```

Using bun:
```bash
bun dev
```

Once started, open your browser and navigate to:
```
http://localhost:3000
```

The application will automatically reload when you make changes to the code.

### Production Mode

First, build the application:
```bash
npm run build
```

Then start the production server:
```bash
npm run start
```

## 📁 Project Structure

```
chatZilla/
├── app/                    # Next.js App Router directory
│   ├── page.tsx           # Main entry page component
│   ├── layout.tsx         # Root layout component
│   ├── globals.css        # Global styles
│   └── ...                # Additional pages and components
├── components/            # Reusable React components
│   ├── ui/               # UI components
│   ├── chat/             # Chat-specific components
│   └── shared/           # Shared components
├── public/               # Static assets
│   ├── images/          # Image files
│   └── fonts/           # Custom fonts
├── lib/                  # Utility functions and libraries
│   ├── utils.ts         # Helper functions
│   └── constants.ts     # App constants
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── styles/               # Additional styles and CSS modules
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── next.config.js        # Next.js configuration
├── .env.local           # Environment variables (create this)
├── .gitignore           # Git ignore file
└── README.md            # Project documentation
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory for environment-specific variables:

```env
# Application Configuration
NEXT_PUBLIC_APP_NAME=ChatZilla
NEXT_PUBLIC_APP_VERSION=1.0.0

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:3000

# Feature Flags
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_MAX_MESSAGE_LENGTH=500

# Development
NODE_ENV=development
```

### Next.js Configuration

The `next.config.js` file contains Next.js specific configurations:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  // Add your custom configuration here
}

module.exports = nextConfig
```

### TypeScript Configuration

The `tsconfig.json` is pre-configured for optimal development experience:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## 🔧 Development

### Getting Started with Development

1. **Main Page Component**
   - Located at `app/page.tsx`
   - This is the entry point of your application
   - Modify this file to change the homepage

2. **Creating New Pages**
   ```typescript
   // app/chat/page.tsx
   export default function ChatPage() {
     return (
       <div>
         <h1>Chat Page</h1>
       </div>
     )
   }
   ```

3. **Adding Components**
   ```typescript
   // components/chat/MessageBox.tsx
   interface MessageBoxProps {
     message: string
     sender: string
   }

   export default function MessageBox({ message, sender }: MessageBoxProps) {
     return (
       <div className="message-box">
         <span className="sender">{sender}</span>
         <p className="message">{message}</p>
       </div>
     )
   }
   ```

4. **Using Custom Hooks**
   ```typescript
   // hooks/useChat.ts
   import { useState, useEffect } from 'react'

   export function useChat() {
     const [messages, setMessages] = useState([])
     
     // Chat logic here
     
     return { messages, setMessages }
   }
   ```

### Styling Guidelines

1. **CSS Modules**
   ```css
   /* styles/Chat.module.css */
   .container {
     padding: 20px;
     max-width: 1200px;
   }
   ```

2. **Using in Components**
   ```typescript
   import styles from '@/styles/Chat.module.css'

   export default function Chat() {
     return <div className={styles.container}>...</div>
   }
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## 📦 Building for Production

To create an optimized production build:

```bash
# Build the application
npm run build

# The build output will show:
# - Page sizes
# - First load JS
# - Build optimizations
```

After building, you can run the production build locally:

```bash
npm run start
```

The production server will start on `http://localhost:3000`

## 📚 API Documentation

### API Routes Structure

```
app/api/
├── chat/
│   ├── route.ts         # GET, POST /api/chat
│   └── [id]/
│       └── route.ts     # GET, PUT, DELETE /api/chat/:id
├── messages/
│   └── route.ts         # GET, POST /api/messages
└── users/
    └── route.ts         # GET, POST /api/users
```

### Example API Route

```typescript
// app/api/chat/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  // Fetch chat data
  return NextResponse.json({ messages: [] })
}

export async function POST(request: Request) {
  const body = await request.json()
  // Process new message
  return NextResponse.json({ success: true })
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create your feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Coding Standards

- Use TypeScript for type safety
- Follow ESLint rules
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly

### Commit Message Format

```
feat: Add new chat feature
fix: Resolve message duplication issue
docs: Update README with new examples
style: Format code with prettier
refactor: Optimize message rendering
test: Add unit tests for chat component
```

## 🐛 Troubleshooting

### Common Issues and Solutions

**1. Port 3000 already in use**
```bash
# Use a different port
PORT=3001 npm run dev

# Or kill the process using port 3000
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**2. Module not found errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3. Build failures**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**4. TypeScript errors**
```bash
# Check for TypeScript errors
npm run type-check
```

**5. Hot reload not working**
- Check if the file is saved
- Restart the development server
- Clear browser cache

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [React Documentation](https://react.dev) - Learn React fundamentals
- [TypeScript Documentation](https://www.typescriptlang.org/docs) - TypeScript guide
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Contact

**Amit Kanjariya**

- GitHub: [@amitkanjariya](https://github.com/amitkanjariya)
- Project Link: [https://github.com/amitkanjariya/chatZilla](https://github.com/amitkanjariya/chatZilla)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for the Geist font family
- Open source community for continuous support

---

<div align="center">
  <p>Built with ❤️ using Next.js</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
