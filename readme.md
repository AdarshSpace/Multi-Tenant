<div align="center">

# MotionKart

### Multi-Tenant Learning Management System

**A complete LMS platform for teachers and coaching institutes to create, manage, and deliver online education — with recorded courses, live classes, AI-powered learning, and integrated payments.**

<br />

[**🌐 Live Project**](https://www.motionkart.online/)   •  
[**▶️ 5-Minute Demo**](https://youtu.be/vVvcEUXUhvo)   •  
[**💻 GitHub Repository**](https://github.com/AdarshSpace/Multi-Tenant)

<br />

**Next.js · TypeScript · Node.js · Express · MySQL · Prisma · AWS**

<br />

`🤖 AI / RAG`   `🔴 Live Classes`   `🎥 Video Streaming`   `💳 Payments`   `🏢 Multi-Tenant`

<br /><br />

> **Built solo · Shipped to production**

</div>

---


---

## 📺 Demo

[![MotionKart Demo](https://img.youtube.com/vi/vVvcEUXUhvo/maxresdefault.jpg)](https://youtu.be/vVvcEUXUhvo)

---

## ✨ What is MotionKart?

MotionKart is a **production-grade multi-tenant Learning Management System** built for teachers, educators, and coaching institutes. Each tenant can have its own domain, courses, students, branding, and learning experience while sharing the same underlying platform.

It provides a complete learning ecosystem with AI-powered doubt solving, locked content gating behind payments, downloadable PDF notes, recorded video lessons, live classes, and a personalized saved-video library.


---

## 🚀 Features

### 🏢 Multi-Tenancy

* Multiple teachers and coaching institutes can use the same platform
* Custom domain support for individual tenants
* Tenant-specific landing pages, courses, students, and dashboards
* Tenant-aware data isolation across users, courses, purchases, payments, and live classes

### 🔐 Authentication

* Custom **JWT session-based authentication** with short-lived access tokens and refresh-token sessions
* Secure HTTP-only refresh-token cookies
* Protected routes and role-based authorization
* Tenant-aware authentication and authorization

### 📚 Course Catalogue

* Browse courses with thumbnails, pricing, and course details
* Original vs discounted pricing displayed on each card
* Tenant-specific course catalogue

### 💳 Payments — Razorpay

* Secure Razorpay checkout — course unlocks **immediately** after payment
* No manual activation needed — fully automated via payment verification and webhooks
* Tenant-aware payment and purchase records

### 🤖 AI Doubt Solver

* Ask questions about any lesson directly on the learn page
* Answers grounded in **actual course PDFs** via RAG — not generic AI responses
* Powered by **Gemini + LangChain + Pinecone**

### 📄 Documents

* View all downloadable PDF notes in one place
* **Smart gating** — only PDFs from purchased courses are accessible
* Tenant-aware document access

### 🔖 Saved Videos

* Bookmark any lesson with a single click
* Revisit saved videos from the sidebar as a personal revision playlist

### 🔴 Live Classes — VideoSDK

* Teachers can create and schedule live classes
* Real-time video and audio communication
* Real-time chat between teachers and students
* Screen sharing
* Polls for live student interaction
* Microphone and camera support
* Students can join live classes with one click

---

## 🤖 How the AI Doubt Solver Works

```text
Student question → Embed question → Vector search (Pinecone) → Retrieve course chunks → Gemini generates answer
```

Answers are grounded in the actual course material — significantly more accurate than a plain ChatGPT wrapper.

---

## 🛠️ Tech Stack

| Layer            | Technologies                                                |
| ---------------- | ----------------------------------------------------------- |
| **Frontend**     | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Shadcn UI |
| **Backend**      | Node.js, Express 5, TypeScript, Prisma, MySQL               |
| **Auth**         | JWT Session-based Authentication                            |
| **Payments**     | Razorpay                                                    |
| **Video**        | Mux (hosting + streaming)                                   |
| **Live Classes** | VideoSDK                                                    |
| **AI / RAG**     | Google Gemini, LangChain, Pinecone                          |
| **Queue**        | Redis + BullMQ (PDF processing)                             |
| **Files**        | ImageKit                                                    |
| **Deployment**   | Vercel, AWS EC2, AWS RDS                                    |

---

## ⚡ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/AdarshSpace/Multi-Tenant.git

cd Multi-Tenant
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

| Variable                                                               | Purpose                         |
| ---------------------------------------------------------------------- | ------------------------------- |
| `DATABASE_URL`                                                         | MySQL connection string         |
| `REDIS_URL`                                                            | Redis for BullMQ job queue      |
| `JWT_SECRET`                                                           | JWT access token signing secret |
| `REFRESH_TOKEN_SECRET`                                                 | Refresh session security        |
| `GOOGLE_API_KEY`                                                       | Gemini AI                       |
| `PINECONE_API_KEY`, `PINECONE_INDEX_NAME`                              | Vector search                   |
| `RAZORPAY_KEY_ID`, `RAZORPAY_SECRET`, `RAZORPAY_WEBHOOK_SECRET_KEY`    | Payments                        |
| `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_URL_ENDPOINT` | File uploads                    |
| `MUX_TOKEN_ID`, `MUX_TOKEN_SECRET`                                     | Mux video streaming             |
| `VIDEO_SDK_API_KEY`, `VIDEO_SDK_SECRET`                                | VideoSDK live classes           |
| `FRONTEND_URL`, `BACKEND_URL`                                          | CORS configuration              |

**Frontend** (`Frontend/.env.local`)

| Variable                   | Purpose              |
| -------------------------- | -------------------- |
| `NEXT_PUBLIC_BACKEND_URL`  | Backend API base URL |
| `NEXT_PUBLIC_FRONTEND_URL` | Frontend URL         |

---

## 🗺️ API Overview

| Endpoint          | Description                                       |
| ----------------- | ------------------------------------------------- |
| `/api/auth`       | JWT authentication and session management         |
| `/api/tenant`     | Tenant resolution and management                  |
| `/api/course`     | Course listing, curriculum, notes, and management |
| `/api/video`      | Video upload & streaming authorization            |
| `/api/chat`       | AI tutor — ask & fetch chat history               |
| `/api/saveVideo`  | Save / unsave / list saved videos                 |
| `/api/payment`    | Create order, verify payment, and webhooks        |
| `/api/live-class` | Live class creation, scheduling, and management   |
| `/api/user`       | Student profile                                   |
| `/health`         | Server health check                               |

---

## 🎓 Student Flow

1. Visit the tenant's domain and sign up
2. Browse available courses on the **Courses** page
3. Purchase a course via Razorpay
4. Open a course and start learning on the **Learn** page
5. Watch videos, save lessons, and chat with the AI tutor
6. Access notes from **Documents** and revisit saved videos from **Saved**
7. Join scheduled **Live Classes** with one click

---

## 👤 Author

**Adarsh** — Full-stack developer passionate about building scalable education products.

[![GitHub](https://img.shields.io/badge/GitHub-AdarshSpace-181717?style=flat-square\&logo=github)](https://github.com/AdarshSpace)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-AdarshSpace-0A66C2?style=flat-square\&logo=linkedin)](https://www.linkedin.com/in/adarshspace/)

[![Live](https://img.shields.io/badge/Live-motionkart.online-0F6E56?style=flat-square)](https://www.motionkart.online)

---

<div align="center">

**If MotionKart helped or inspired you — drop a ⭐. It means a lot.**

</div>
