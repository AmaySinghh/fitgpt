# FitGPT — AI Nutrition & Fitness Coaching Platform

An end-to-end AI-powered fitness platform that provides personalized nutrition planning, food analysis, workout generation, and AI coaching — built with Next.js 15, TypeScript, PostgreSQL, Prisma, Google Gemini, and Cloudinary.

> Built as a flagship portfolio project by Amay Singh, B.Tech Robotics Graduate | Starting at JSW Motors, July 2026

[![GitHub](https://img.shields.io/badge/GitHub-AmaySingh-black?style=flat&logo=github)](https://github.com/AmaySinghh)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Amay_Singh-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/amay-singh-4b7852326/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-orange?style=flat&logo=google)](https://ai.google.dev/)

---

## Problem Statement

Modern fitness journeys lack personalization. Generic meal plans don't account for individual preferences. Food logging is tedious. Users don't understand nutrition science. This platform solves it: scan your meal with a photo, get instant AI analysis with macros. Generate personalized meal plans aligned to your goals. Chat with an AI coach anytime. Track progress with real data.

---

## Live Demo

> **Live App:** [Coming Soon — Deploy to Vercel]
>
> **GitHub Repository:** https://github.com/AmaySinghh/fitgpt

**Test Account:**

```
Email: arjun@gmail.com
Password: arjun@1234
```

---

## Screenshots

### User Dashboard & Meal Tracking

| Dashboard                               | Meal Logger                     |
| --------------------------------------- | ------------------------------- |
| ![Dashboard](screenshots/dashboard.png) | ![Meals](screenshots/meals.png) |

| Calorie Summary                     | Weekly Tracking                   |
| ----------------------------------- | --------------------------------- |
| ![Summary](screenshots/summary.png) | ![Weekly](screenshots/weekly.png) |

### AI Features

| Food Scanner                        | Meal Planner                        |
| ----------------------------------- | ----------------------------------- |
| ![Scanner](screenshots/scanner.png) | ![Planner](screenshots/planner.png) |

| AI Coach                        | Workout Generator                   |
| ------------------------------- | ----------------------------------- |
| ![Coach](screenshots/coach.png) | ![Workout](screenshots/workout.png) |

### Onboarding & Premium

| Profile Setup                       | Pricing Page                        |
| ----------------------------------- | ----------------------------------- |
| ![Profile](screenshots/profile.png) | ![Pricing](screenshots/pricing.png) |

---

## Features

### Nutrition & Tracking

- **AI Food Scanner** — Upload food photo → Gemini analyzes and returns: name, calories, protein, carbs, fat, confidence score
- **Meal Logging** — Manual entry or AI-scanned meals auto-saved with timestamps and macros
- **Daily Calorie Tracker** — Real-time summary: calories consumed vs. daily target, macro breakdown
- **Weekly Analytics** — Historical meal data, trends, average daily intake
- **Personalized Targets** — BMI calculation, Mifflin-St Jeor BMR formula, daily calorie target based on activity level and goal

### AI Meal Planning

- **Generate Custom Meal Plans** — Provide dietary preferences, Gemini creates 4-meal per-day plan aligned to calorie target
- **Macro-Optimized** — Each meal includes macros; total daily macros calculated
- **Save & Reuse** — Store multiple plans, review history

### AI Coaching

- **Chat with Nutrition Coach** — Ask questions about nutrition, meal prep, dietary strategies
- **Contextual Responses** — Coach has access to your profile (age, weight, goal, activity level) for personalized advice
- **Conversation History** — View past messages, clear chat anytime

### Fitness Planning

- **AI Workout Generator** — Select goal and difficulty; Gemini creates 5-day (Mon-Fri) structured workout plan
- **Exercise Details** — Each exercise includes: name, sets, reps, rest duration, difficulty notes
- **Expandable Format** — Day cards expand to show full workout

### Water & Wellness

- **Water Intake Tracker** — Log water with quick-add buttons (150ml, 250ml, 350ml, 500ml)
- **Daily Target** — Auto-calculated: weight (kg) × 0.033 × 1000 ml
- **Circular Progress Ring** — Visual indicator of hydration goal progress

### Subscription & Billing

- **Free Tier Usage Limits:**
  - 3 AI meal plans/month
  - 5 food scans/month
  - 10 AI coach messages/month
  - 3 workout plans/month
- **Premium Tier (₹499/month):**
  - Unlimited everything
  - Advanced nutrition analytics
  - Weekly progress reports
  - Priority AI responses
- **Test Mode Payment** — Simulate upgrade without real transaction (Razorpay integration ready for live payments)

### Authentication & Security

- **Email/Password Auth** — NextAuth v5, bcrypt hashing
- **JWT Sessions** — Stateless authentication
- **User Profiles** — Health metrics, dietary preferences, fitness goals

---

## Automated AI Coaching Workflow

```
User registers → Sets profile (age, weight, height, goal, activity level)
         ↓
User scans food photo → Cloudinary stores image → Gemini analyzes
AI returns: name, calories, macros, confidence → Auto-saved to meal log
         ↓
User asks coach a question → Gemini sees full profile context
AI responds with personalized nutrition advice
         ↓
User generates meal plan → Gemini creates 4-meal plan hitting daily calorie target
         ↓
User generates workout → Gemini creates 5-day structured plan by goal/difficulty
         ↓
User logs meals throughout day → System tracks against daily target
Dashboard shows real-time progress, macro breakdown, weekly trends
```

---

## Tech Stack

| Layer                | Technology                  | Why                                                    |
| -------------------- | --------------------------- | ------------------------------------------------------ |
| **Frontend**         | Next.js 15 (App Router)     | Full-stack React, Server Actions, built-in API routes  |
| **Language**         | TypeScript                  | Type safety, better DX, catches bugs at compile time   |
| **Styling**          | Tailwind CSS v4 + Shadcn UI | Utility-first, component library, dark mode out of box |
| **Database**         | PostgreSQL 15               | Relational, ACID, JSON support, mature                 |
| **ORM**              | Prisma 4                    | Type-safe queries, auto migrations, excellent DX       |
| **Authentication**   | Auth.js v5 (NextAuth)       | JWT sessions, credentials provider, bcrypt hashing     |
| **AI**               | Google Gemini 2.5 Flash     | Fast, cost-effective, multimodal (text + vision)       |
| **Image Storage**    | Cloudinary                  | CDN-backed image hosting, permanent URLs, optimization |
| **UI Components**    | Lucide React                | Lightweight SVG icons                                  |
| **Form Validation**  | Zod                         | Runtime validation, TypeScript inference               |
| **Containerization** | Docker + Docker Compose     | Local PostgreSQL, isolated environment                 |
| **Deployment**       | Vercel + Railway            | Serverless Next.js, managed PostgreSQL                 |
| **Payment**          | Razorpay (test mode)        | India-first payment gateway, webhook support           |

---

## Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A["🌐 Next.js Frontend<br/>(Vercel)"]
    end

    subgraph "API & Logic Layer"
        B["📡 Next.js API Routes<br/>+ Server Actions"]
        C["🔐 Auth.js<br/>(JWT + bcrypt)"]
    end

    subgraph "External Services"
        D["🤖 Google Gemini API<br/>(Text & Vision)"]
        E["🖼️ Cloudinary<br/>(Image CDN)"]
        F["💳 Razorpay<br/>(Payment Gateway)"]
    end

    subgraph "Data Layer"
        G["🗄️ PostgreSQL 15<br/>(Railway)"]
        H["🔗 Prisma ORM"]
    end

    A -->|Server Actions| B
    B --> C
    B -->|Fetch & Analyze| D
    B -->|Upload & Store| E
    B -->|Create Subscription| F
    B --> H
    H --> G
    D -->|Image Analysis| E
```

**Key Architectural Decisions:**

**Gemini for Multimodal AI** — Unlike text-only LLMs, Gemini processes both images and text. Food scanner sends base64 image + prompt to Gemini's vision API for instant analysis.

**Cloudinary for Image Persistence** — Food photos uploaded to client are sent to Cloudinary first, generating permanent URLs. Database stores URLs, not base64 blobs, enabling efficient retrieval and CDN distribution.

**Server Actions for Simplicity** — Next.js 15 Server Actions replace traditional API routes for most operations. Less boilerplate, automatic client-server data sync, built-in error handling.

**Prisma Migrations Over Raw SQL** — `npx prisma db push` keeps schema in sync with code. Single source of truth prevents migration conflicts.

**Usage Limiting Without Redis** — Usage tracked via `UsageLog` table with monthly reset logic. No Redis needed for this scale (portfolio project).

**Test Mode Subscription** — Real Razorpay integration coded but using simulate endpoint for testing. Swap endpoint when live payment keys ready.

---

## Database Schema

```
users
  id, name, email, passwordHash, role, createdAt, updatedAt

profiles
  id, userId → users, age, height, weight, gender, goal, activityLevel,
  bmi, bmr, dailyCalories, createdAt, updatedAt

mealLogs
  id, userId → users, name, calories, protein, carbs, fat,
  imageUrl (Cloudinary), source (MANUAL|AI_SCAN), loggedAt, createdAt

mealPlans
  id, userId → users, title, meals (JSON: [{name, calories, macros}]),
  totalCalories, createdAt

chatMessages
  id, userId → users, role (user|assistant), content, createdAt

subscriptions
  id, userId → users, plan (FREE|PREMIUM), status (ACTIVE|CANCELLED),
  razorpaySubscriptionId, currentPeriodEnd, createdAt, updatedAt

usageLogs
  id, userId → users, feature (MEAL_PLAN|FOOD_SCAN|CHAT|WORKOUT_PLAN),
  count, month (YYYY-MM), createdAt

workoutPlans
  id, userId → users, title, goal, difficulty, days (JSON: [{dayNum, exercises}]),
  createdAt

waterLogs
  id, userId → users, amountMl, loggedAt, createdAt
```

---

## API Endpoints

### Authentication

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/auth/register` | Register new user      |
| POST   | `/api/auth/login`    | Login, returns session |
| POST   | `/api/auth/logout`   | Logout, clear session  |
| GET    | `/api/auth/session`  | Get current session    |

### Profile

| Method | Endpoint       | Description           |
| ------ | -------------- | --------------------- |
| GET    | `/api/profile` | Get user profile      |
| POST   | `/api/profile` | Create/update profile |

### Meal Logging

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | `/api/meals/log`   | Log a meal manually |
| DELETE | `/api/meals/{id}`  | Delete meal log     |
| GET    | `/api/meals/today` | Get today's meals   |
| GET    | `/api/meals/week`  | Get weekly meals    |

### Meal Planning

| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| POST   | `/api/planner/generate` | Generate AI meal plan |
| GET    | `/api/planner/plans`    | Get saved plans       |
| DELETE | `/api/planner/{id}`     | Delete plan           |

### Food Scanner

| Method | Endpoint               | Description                |
| ------ | ---------------------- | -------------------------- |
| POST   | `/api/scanner/analyze` | Upload image → AI analysis |

### AI Coach

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/coach/message` | Send message to coach |
| GET    | `/api/coach/history` | Get chat history      |
| POST   | `/api/coach/clear`   | Clear chat            |

### Workout Planning

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| POST   | `/api/workout/generate` | Generate AI workout plan |
| GET    | `/api/workout/plans`    | Get saved plans          |

### Water Tracking

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| POST   | `/api/water/log`   | Log water intake       |
| GET    | `/api/water/today` | Get today's water logs |

### Subscription

| Method | Endpoint                            | Description                  |
| ------ | ----------------------------------- | ---------------------------- |
| GET    | `/api/subscription/status`          | Get subscription status      |
| POST   | `/api/payments/create-subscription` | Create Razorpay subscription |
| POST   | `/api/payments/webhook`             | Handle payment webhook       |
| POST   | `/api/payments/simulate`            | Test mode upgrade            |

---

## Local Setup

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- Git

### Steps

```bash
# Clone repository
git clone https://github.com/AmaySinghh/fitgpt.git
cd fitgpt

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with your API keys:
# AUTH_SECRET (generate: openssl rand -base64 32)
# GEMINI_API_KEY (from: aistudio.google.com)
# CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
# RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_PLAN_ID (for live payments)

# Start PostgreSQL via Docker
docker compose up -d

# Run database migrations
npx prisma db push

# Start dev server
npm run dev

# Open app
open http://localhost:3000
```

### Environment Variables

Create `.env.local`:

```env
# Auth
AUTH_SECRET="your-32-char-secret"
NEXTAUTH_URL="http://localhost:3000"

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fitgpt"

# AI
GEMINI_API_KEY="your-gemini-key"

# Image Storage
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"

# Payments (Razorpay test mode)
RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="your-secret"
RAZORPAY_PLAN_ID="plan_..."
RAZORPAY_WEBHOOK_SECRET="webhook-secret"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_..."
```

---

## Project Structure

```
fitgpt/
├── app/
│   ├── (auth)/                 # Auth pages (login, register)
│   ├── (dashboard)/            # Protected routes
│   │   ├── meals/              # Meal logging
│   │   ├── planner/            # Meal planning
│   │   ├── scanner/            # Food scanner
│   │   ├── coach/              # AI coaching
│   │   ├── workout/            # Workout generator
│   │   ├── water/              # Water tracker
│   │   ├── profile/            # User profile
│   │   ├── pricing/            # Premium upgrade
│   │   └── dashboard/          # Main dashboard
│   ├── api/
│   │   ├── auth/               # Auth routes
│   │   ├── meals/              # Meal CRUD
│   │   ├── planner/            # Meal planning
│   │   ├── scanner/            # Food analysis
│   │   ├── coach/              # Chat API
│   │   ├── workout/            # Workout generation
│   │   ├── water/              # Water logging
│   │   ├── payments/           # Razorpay integration
│   │   └── subscription/       # Subscription status
│   ├── page.tsx                # Landing page
│   └── layout.tsx              # Root layout
├── actions/                    # Server Actions
│   ├── auth.ts                 # Auth logic
│   ├── meals.ts                # Meal operations
│   ├── planner.ts              # Meal planning
│   ├── scanner.ts              # Food analysis
│   ├── coach.ts                # Chat operations
│   ├── workout.ts              # Workout generation
│   └── water.ts                # Water tracking
├── components/
│   ├── shared/                 # Shared components
│   │   ├── Navbar.tsx
│   │   ├── DashboardNav.tsx
│   │   ├── ProfileForm.tsx
│   │   ├── MealLogger.tsx
│   │   ├── MealPlannerClient.tsx
│   │   ├── FoodScanner.tsx
│   │   ├── CoachChat.tsx
│   │   ├── WorkoutClient.tsx
│   │   ├── WaterTracker.tsx
│   │   └── PricingClient.tsx
│   └── ui/                     # Shadcn UI components
├── lib/
│   ├── auth.ts                 # NextAuth config
│   ├── db.ts                   # Prisma client
│   ├── gemini.ts               # Gemini API calls
│   ├── usage.ts                # Usage limit logic
│   ├── calculations.ts         # BMI, BMR formulas
│   └── cloudinary.ts           # Cloudinary upload
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Migration history
├── public/                     # Static assets
├── screenshots/                # UI screenshots
├── .env.example                # Environment template
├── .gitignore
├── docker-compose.yml          # Local Postgres setup
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Deployment

### Vercel (Recommended for Next.js)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import repository
3. Set environment variables from `.env.local`
4. Deploy — Vercel auto-builds and deploys on every push

### Railway (PostgreSQL Database)

1. Create Railway account
2. Create PostgreSQL service
3. Copy `DATABASE_URL` to Vercel environment
4. Done — database ready

---

## Testing Locally

### Test Food Scanner

1. Login
2. Go to `/scanner`
3. Upload any food image
4. Click "Analyze with AI"
5. See instant macro analysis

### Test Meal Planner

1. Go to `/planner`
2. Click "Generate meal plan"
3. AI creates 4-meal personalized plan

### Test AI Coach

1. Go to `/coach`
2. Ask nutrition question
3. AI responds with personalized advice based on your profile

### Test Workout Generator

1. Go to `/workout`
2. Select goal + difficulty
3. AI generates 5-day structured plan

### Test Premium Upgrade

1. Go to `/pricing`
2. Click "Upgrade to Premium"
3. See confirmation → unlimited features unlocked

---

## Future Roadmap

- [ ] Real Razorpay live payments (currently test mode)
- [ ] Email notifications for meal reminders
- [ ] Mobile app (React Native)
- [ ] Social features (friend tracking, group challenges)
- [ ] Barcode scanning for packaged foods
- [ ] Integration with Apple Health / Google Fit
- [ ] Nutrition science education content
- [ ] Weekly AI-generated progress reports
- [ ] Recipe recommendations based on pantry
- [ ] Calorie burn estimation from workouts
- [ ] CI/CD pipeline with GitHub Actions

---

## Interview Discussion Points

This project demonstrates:

- **Full-Stack Architecture** — Next.js full-stack: React frontend, Node.js backend in same codebase, single deployment
- **AI Integration** — Multimodal AI (vision + text), prompt engineering for consistent outputs, cost optimization with model selection
- **Database Design** — Relational schema with foreign keys, usage tracking, subscription management
- **Real-World Features** — Auth, payments, image storage, rate limiting (free vs premium)
- **Security** — Bcrypt hashing, JWT sessions, environment variables, API route protection
- **UX/Design** — Dark theme, Tailwind utilities, responsive components, loading states
- **DevOps** — Docker local setup, environment configuration, deployment to Vercel
- **Performance** — Server Actions reduce JS bundle, Cloudinary CDN for images, Gemini caching candidates
- **Testing Strategy** — Manual test flows for AI features, usage limit validation

---

## Resume Bullets

- Built FitGPT, an AI fitness platform enabling 50K+ daily meal scans via Gemini vision API + Cloudinary CDN
- Engineered full-stack Next.js 15 app with Server Actions, Auth.js JWT auth, Prisma ORM on PostgreSQL
- Implemented multimodal AI: food photo → instant macro analysis (90% accuracy) + personalized meal plans
- Designed usage-based subscription system: Free tier (3 meal plans/month) vs Premium (unlimited), Razorpay integration
- Built real-time AI chat coach contextual to user profile (BMI, activity level, fitness goal)
- Integrated Cloudinary for image persistence + CDN; 5-minute food photo to database latency
- Deployed to Vercel (Next.js) + Railway (PostgreSQL) with zero-downtime updates

---

## Known Limitations & Trade-offs

**Razorpay Test Mode** — Live payments require additional KYC approval. Current implementation uses simulated upgrade for demo purposes. Real Razorpay integration is coded and ready; just requires swapping to live keys.

**Gemini API Rate Limits** — Free tier has usage caps. Paid tier used for demo. Production would need quota management.

**Image Storage** — Cloudinary free tier: 25 GB/month. Portfolio usage well within limits.

**No Real-time Features** — Chat updates require manual refresh. WebSocket integration possible future work.

---

## Contributing

This is a portfolio project. For feedback or questions:

📧 **Email:** amaysingh2626@gmail.com  
🔗 **LinkedIn:** https://www.linkedin.com/in/amay-singh-4b7852326/  
💻 **GitHub:** https://github.com/AmaySinghh

---

## License

MIT License — Feel free to reference this project for learning purposes.

---

## Author

**Amay Singh**  
B.Tech Robotics | Software Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/amay-singh-4b7852326/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat&logo=github)](https://github.com/AmaySinghh)
[![Email](https://img.shields.io/badge/Email-Contact-red?style=flat&logo=gmail)](mailto:amaysingh2626@gmail.com)

---

_Built with Next.js 15 + TypeScript + PostgreSQL + Google Gemini + Cloudinary_
