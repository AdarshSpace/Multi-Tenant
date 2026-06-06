<div align="center">

<img src="https://www.motionkart.online/favicon.ico" width="60" alt="MotionKart Logo" />

# MotionKart

### The #1 Platform for Motion Designers

**Learn Blender & After Effects the right way.**  
A full-stack LMS with AI-powered doubt solving, Razorpay payments, and a seamless learning experience.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-motionkart.online-0F6E56?style=for-the-badge)](https://www.motionkart.online)
[![Demo Video](https://img.shields.io/badge/▶_Demo_Video-YouTube-FF0000?style=for-the-badge&logo=youtube)](https://youtu.be/3mFDyCkzLz0?si=116Dc-6ly5ggJEAv)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/AdarshSpace/motionkart)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Razorpay](https://img.shields.io/badge/Payments-Razorpay-072654?style=for-the-badge)](https://razorpay.com)

> Built solo. Shipped to production. Trusted by 5,000+ students.

</div>

---

## 📺 Demo

[![MotionKart Demo](https://img.youtube.com/vi/3mFDyCkzLz0/maxresdefault.jpg)](https://youtu.be/3mFDyCkzLz0?si=116Dc-6ly5ggJEAv)

---

## ✨ What is MotionKart?

MotionKart is a **production-grade Learning Management System** built for motion designers — students who want to master Blender and After Effects through structured, high-quality courses. It's not just a course website; it's a complete learning ecosystem with real-time AI doubt solving, locked content gating behind payments, downloadable PDF notes, and a personalized saved-video library.

---

## 🚀 Features

### 🔐 Authentication
- Email/password login with secure sessions via **Better Auth**
- **Google OAuth** and **GitHub OAuth** — one-click sign-in
- Protected routes and role-based access control

### 📚 Course Catalogue
- Browse courses with thumbnails, star ratings, and enrolled student count
- Original vs discounted pricing displayed on each card

### 💳 Payments — Razorpay
- Secure Razorpay checkout — course unlocks **immediately** after payment
- No manual activation needed — fully automated via webhooks

### 🤖 AI Doubt Solver
- Ask questions about any lesson directly on the learn page
- Answers grounded in **actual course PDFs** via RAG — not generic AI responses
- Powered by **Gemini + LangChain + Pinecone**

### 📄 Documents
- View all downloadable PDF notes in one place
- **Smart gating** — only PDFs from purchased courses are accessible

### 🔖 Saved Videos
- Bookmark any lesson with a single click
- Revisit saved videos from the sidebar as a personal revision playlist

---

## 🤖 How the AI Doubt Solver Works

```
Student question → Embed question → Vector search (Pinecone) → Retrieve course chunks → Gemini generates answer
```

Answers are grounded in the actual course material — significantly more accurate than a plain ChatGPT wrapper.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Shadcn UI, Mux Player |
| **Backend** | Node.js, Express 5, TypeScript, Prisma, MySQL |
| **Auth** | Better Auth (Email, Google, GitHub OAuth) |
| **Payments** | Razorpay |
| **Video** | Mux (hosting + streaming) |
| **AI / RAG** | Google Gemini, LangChain, Pinecone |
| **Queue** | Redis + BullMQ (PDF processing) |
| **Files** | ImageKit |
| **Deployment** | Vercel |

---

## ⚡ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/AdarshSpace/motionkart.git
cd motionkart
```

### 2. Backend setup

```bash
cd Backend
npm install
cp .env.example .env   # fill in all values
npx prisma migrate dev
npm run dev
```

### 3. Frontend setup

Create `Frontend/.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:<BACKEND_PORT>
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3001
```

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs at **http://localhost:3001**

---

## 🔐 Environment Variables

**Backend** (`Backend/.env`)

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | MySQL connection string |
| `REDIS_URL` | Redis for BullMQ job queue |
| `BETTER_AUTH_SECRET` | Auth session encryption |
| `GOOGLE_API_KEY` | Gemini AI |
| `PINECONE_API_KEY`, `PINECONE_INDEX_NAME` | Vector search |
| `RAZORPAY_KEY_ID`, `RAZORPAY_SECRET`, `RAZORPAY_WEBHOOK_SECRET_KEY` | Payments |
| `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_URL_ENDPOINT` | File uploads |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | GitHub OAuth |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth |
| `FRONTEND_URL`, `BACKEND_URL` | CORS & auth callbacks |

**Frontend** (`Frontend/.env.local`)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_BACKEND_URL` | Backend API base URL |
| `NEXT_PUBLIC_FRONTEND_URL` | Frontend URL for auth redirects |

---

## 🗺️ API Overview

| Endpoint | Description |
|---|---|
| `/api/auth` | Authentication (Better Auth) |
| `/api/course` | Course listing, curriculum, notes |
| `/api/video` | Video upload & streaming auth |
| `/api/chat` | AI tutor — ask & fetch chat history |
| `/api/saveVideo` | Save / unsave / list saved videos |
| `/api/payment` | Create order, verify payment, webhooks |
| `/api/user` | Student profile |
| `/health` | Server health check |

---

## 🎓 Student Flow

1. Visit the landing page and sign up
2. Browse available courses on the **Courses** page
3. Purchase a course via Razorpay
4. Open a course and start learning on the **Learn** page
5. Watch videos, save lessons, and chat with the AI tutor
6. Access notes from **Documents** and revisit saved videos from **Saved**

---

## 👤 Author

**Adarsh** — Full-stack developer passionate about building education products.

[![GitHub](https://img.shields.io/badge/GitHub-AdarshSpace-181717?style=flat-square&logo=github)](https://github.com/AdarshSpace)
[![Live](https://img.shields.io/badge/Live-motionkart.online-0F6E56?style=flat-square)](https://www.motionkart.online)

---

<div align="center">

**If MotionKart helped or inspired you — drop a ⭐. It means a lot.**

</div>