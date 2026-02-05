# AI Mentor - Production-Ready Career Guidance Platform

A full-stack AI-powered mentor application that provides personalized career guidance, learning roadmaps, internships, hackathons, and interview preparation.

## 🚀 Features

- **AI Career Mentor**: ChatGPT-like interface with persistent chat history
- **Dynamic Roadmaps**: Personalized career paths with direct learning resources
- **Mock Interviews**: AI-driven interview simulation (Premium feature)
- **Internship Hub**: Curated opportunities and guidance
- **Hackathon Hub**: Event discovery and preparation tips
- **Subscription System**: Free and premium tiers
- **Modern UI**: Dark/light mode, mobile-responsive design

## 🏗️ Tech Stack

**Frontend**: React + Vite + Tailwind CSS + Framer Motion
**Backend**: Node.js + Express + JWT Authentication
**Database**: MongoDB + Mongoose
**AI**: OpenAI GPT-4 integration
**Payments**: Stripe integration
**File Storage**: Cloudinary for PDFs/images

## 📦 Installation

```bash
# Install all dependencies
npm run install:all

# Start development servers
npm run dev

# Build for production
npm run build
```

## 🔧 Environment Setup

Create `.env` files in both `server/` and `client/` directories with required variables (see `.env.example` files).

## 📱 Usage

1. Visit the landing page
2. Sign up or log in
3. Complete your profile setup
4. Start chatting with your AI mentor
5. Generate and save career roadmaps
6. Upgrade to premium for mock interviews

## 🎯 Project Structure

```
ai-mentor-app/
├── client/          # React frontend
├── server/          # Node.js backend
├── shared/          # Shared utilities
└── docs/           # Documentation
```