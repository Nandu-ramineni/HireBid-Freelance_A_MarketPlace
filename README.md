
---

# 🚀 HireBid Freelance Marketplace — Monorepo

> **A modern, scalable freelance marketplace with real-time collaboration, milestone billing, intelligent dashboards, and an enterprise-grade admin suite.**
> Built using a polyglot microservices architecture with robust observability, async workflows, and optimized front-end experiences.

---

## 📚 Table of Contents

1. [Overview](#overview)
2. [Repository Layout](#repository-layout)
3. [Core Features](#core-features)
4. [Architecture Overview](#architecture-overview)
5. [Tech Stack](#tech-stack)
6. [Prerequisites](#prerequisites)
7. [Environment Variables](#environment-variables)
8. [Local Development](#local-development)
9. [Useful Commands](#useful-commands)
10. [API Surface](#api-surface)
11. [Background Jobs & Caching](#background-jobs--caching)
12. [Testing & Quality](#testing--quality)
13. [Deployment Notes & Roadmap](#deployment-notes--roadmap)

---

## 🧭 Overview

**HireBid** is a full-stack freelance marketplace that connects clients and freelancers through an optimized job workflow, milestone-based billing, real-time chat, and highly curated dashboards.

This monorepo contains:

* **Two Vite-powered SPAs** (Client/Freelancer + Admin)
* **Eight Node.js microservices**
* **A centralized API Gateway**
* **Asynchronous communication via RabbitMQ**
* **Caching & token stores in Redis**
* **MongoDB for transactional data**
* **Razorpay/Web3 for payments**
* **Cloudinary for media**

Design documentation (`.tldr` and wireframes) is kept alongside services for improved developer–product alignment.

---

## 📁 Repository Layout

| Path                            | Description                                                     |
| ------------------------------- | --------------------------------------------------------------- |
| `frontend/`                     | Public SPA for clients & freelancers (React + Vite + Tailwind). |
| `admin/`                        | Admin SPA with dashboards, analytics, and moderation tools.     |
| `Servers/Gateway-Service/`      | API gateway providing routing, JWT verification, rate limits.   |
| `Servers/Auth-Service/`         | Authentication, OAuth, OTP email flows, subscriptions, reviews. |
| `Servers/job-service/`          | Job, bids, milestones, invoices, caching, and analytics.        |
| `Servers/Payment-Service/`      | Razorpay & Web3 crypto workflows.                               |
| `Servers/Chat-Service/`         | Real-time messaging via Socket.IO + MongoDB.                    |
| `Servers/Notification-Service/` | In-app + email notifications driven by RabbitMQ.                |
| `Servers/Reputation-Service/`   | Rating & reputation scoring engine.                             |
| `Servers/Admin-service/`        | Staff-only backend: DB stats, platform insights, moderation.    |
| `/Servers/*.tldr`               | Design flows, wireframes, and product diagrams.                 |

---

## ⭐ Core Features

### 🧑‍💼 Client & Freelancer Web App

* Multi-channel authentication: Email/Password, OAuth, OTP, device/IP insights
* Job marketplace: Search, filters, recommendations, saved gigs
* Dashboards for both parties: Earnings, proposals, spend, analytics
* Full bid lifecycle: Propose → Accept → Deliver → Invoice → Rate
* Real-time chat: Typing indicators, online status, RabbitMQ fan-out
* Razorpay milestone payments & invoice PDFs (EasyInvoice + Cloudinary)
* Profile completeness, review system, saved freelancer lists

### 🛠 Admin Console

* Login + token rotation via Redis
* Platform KPIs: revenue, churn, active projects, milestone pipeline
* Moderation: user status toggles, session invalidation
* Gig intelligence pages with deadlines, risk flags, and party metadata
* MongoDB system health monitoring (`dbStats`, `serverStatus`)
* Polished UI: Radial charts, animated cards, dark/light modes

### 🔧 Backend & Infrastructure

* **Gateway-Service** handles routing, JWT, rate-limits, and proxying
* **Auth-Service**: OAuth, OTP, subscriptions, review flow, IPInfo telemetry
* **job-service**: core business engine, caching, invoices, reports
* **Chat-Service**: event-driven, real-time chat with persistence
* **Notification-Service**: email + in-app delivery pipelines
* **Payment-Service**: Razorpay + optional Web3/EVM payouts
* **Reputation-Service**: trust/rating engine
* **Admin-service**: admin APIs + DB monitoring

---

## 🏗 Architecture Overview

```
   [Client SPA]        [Freelancer SPA]           [Admin SPA]
         |                     |                        |
         +-------------> [ Gateway-Service ] <----------+
                            /    |    \
                           /     |     \
                     /auth   /jobs  /reputation ...etc
                          |       \
                     [Auth]     [job-service]---Cloudinary
                       |            |   \
                       |            |   +--> RabbitMQ ---> [Chat-Service]
                       |            |                      [Notification-Service]
                       |            |
                     Redis        MongoDB
                      (tokens)      (state)

     Payments → [Payment-Service] → Razorpay / Web3
     Notifications → Email / Firebase / In-app
```

### Key Infrastructure Notes:

* **MongoDB**: separate DBs per service (clustered)
* **Redis**: sessions, refresh tokens, hot caches, rate limits
* **RabbitMQ**: event bus for chat and notification pipelines
* **Cloudinary**: invoices, images, attachments
* **Razorpay/Web3**: flexible payments

---

## 🧰 Tech Stack

| Layer               | Technologies                                                                    |
| ------------------- | ------------------------------------------------------------------------------- |
| Frontend            | React 18/19, Vite, Tailwind, Redux Toolkit, TanStack Query, Socket.IO, Firebase |
| Backend             | Node.js 20+, Express 4/5, Socket.IO, Mongoose, Nodemailer, Web3.js              |
| Infra               | MongoDB, Redis, RabbitMQ, Cloudinary, Razorpay                                  |
| Tooling             | ESLint, Nodemon, Docker, ngrok                                                  |
| Deployment (future) | Docker Compose / Kubernetes                                                     |

---

## 🧱 Prerequisites

You must have these installed locally:

* **Node.js 20+**
* **MongoDB**
* **Redis**
* **RabbitMQ**
* **Cloudinary account**
* **Razorpay keys**
* **SMTP (Gmail recommended)**
* **Firebase project**
* Optional: **IPInfo Token**, **EVM RPC endpoint**, **Docker**

---

## 🔐 Environment Variables

Each service has its own `.env`.
**Never commit secrets.**

### Example variables:

```
MONGO_URI=
JWT_SECRET=
REDIS_URL=
RABBITMQ_URL=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
CLOUDINARY_CLOUD_NAME=
CLIENT_URL=
```

Refer to the full list in your original description (preserved).

---

## 🧪 Local Development

### 1. Clone the repo

```sh
git clone <repo-url>
cd Freelance
```

### 2. Create `.env` files

Copy sample variables into each service directory.

### 3. Start core infrastructure

```sh
mongod
redis-server
rabbitmq-server
```

### 4. Install dependencies

```sh
npm install --prefix frontend
npm install --prefix admin
npm install --prefix Servers/Auth-Service
...
```

### 5. Start all microservices

Start each in separate terminals:

```sh
npm run dev --prefix Servers/Auth-Service
npm run dev --prefix Servers/job-service
npm run dev --prefix Servers/Payment-Service
...
```

Start the **Gateway** last.

### 6. Start SPAs

```sh
npm run dev --prefix frontend   # http://localhost:5173
npm run dev --prefix admin
```

---

## 🧵 Useful Commands

| Command         | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Start service with Nodemon |
| `npm run prod`  | Run without watcher        |
| `npm run build` | Build frontends            |
| `npm run lint`  | Run ESLint                 |
| `docker build`  | Build container images     |

---

## 📡 API Surface (Gateway Endpoints)

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/auth/getUser/:id`
* `POST /api/subscription/subscribe`

### Jobs & Bids

* `POST /api/jobs/post-job`
* `GET /api/jobs/jobs`
* `POST /api/jobs/bids`
* `POST /api/jobs/bids/accept`

### Payments

* `POST /api/payments/fiat`
* `POST /api/job/payment/fiat`

### Chat

* `POST /api/chat/send`
* `GET /api/chat/:jobId`

### Notifications

* `GET /api/notifications`

### Reputation

* `POST /api/reputation/rate`
* `GET /api/reputation/:userId`

### Admin

* `GET /api/v1/admin/users`
* `GET /api/v1/admin/gigs/getGigs`
* `GET /api/v1/admin/monitor/db-status`

---

## 📬 Background Jobs & Caching

### RabbitMQ Queues

* `job_messages` — chat fan-out
* `notifications` — email + in-app
* `notificationQueue` — worker pipelines

### Redis Usage

* Refresh tokens (Auth)
* Cached jobs (job-service)
* Rate limiting (Admin-service)

### Email Workflows

* OTP
* Welcome emails
* Bid status updates
* Invoice PDF emails
* Subscription receipts

---

## 🧪 Testing & Quality

* Frontends: **ESLint**, **manual QA**, and UI smoke tests
* Backends: recommend adding **Jest + Supertest**
* Use **Postman/Insomnia** for tokenized requests
* Use **ngrok** for Razorpay/Firebase callbacks in dev

---

## 🚀 Deployment Notes & Roadmap

### Recommended Deployment Approach

* Containerize each microservice (Node 20 Alpine)
* Use Docker Compose or Kubernetes (preferred for scaling)
* Move secrets to Vault/SSM
* Add structured logging (Pino) + Prometheus metrics
* Enable Webhooks for Razorpay refunds/settlements

### Upcoming Enhancements

* Fully automated contract generation for accepted bids
* Push notifications via Firebase Cloud Messaging
* End-to-end integration test suite through Gateway
* Observability dashboards (Grafana)
* Optional AI-based gig recommendations

---

## 🎉 Happy Building!

HireBid is designed for **scale**, **developer friendliness**, and **production readiness**.
If you'd like, I can generate:

✅ Architecture diagram
✅ Mermaid flowchart
✅ Onboarding guide
✅ API documentation (Swagger/OpenAPI 3.0)
✅ Docker Compose for complete stack
✅ Production Kubernetes manifests

Just tell me!
