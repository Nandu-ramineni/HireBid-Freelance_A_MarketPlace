
---

# 🚀 HireBid Frontend — Client & Freelancer Portal

A high-performance **React + Vite SPA** powering the public-facing side of the HireBid freelance marketplace.
Clients can post milestone-based gigs, manage payments, track project analytics, and collaborate in real time, while freelancers explore jobs, bid faster, monitor earnings, and maintain a reputation portfolio—all within a fully responsive and animated interface.

---

## ✨ Highlights

* **React 18 + Vite** for ultra-fast bundling & HMR.
* **Tailwind CSS + Radix UI + Lucide Icons** for consistent, themeable UI.
* **Framer Motion animations** for smooth UX transitions.
* **Redux Toolkit + TanStack Query** for scalable local + remote state management.
* **Authentication stack**

  * Email/password
  * OAuth (Google, Facebook, Microsoft when enabled)
  * OTP password reset
* **Real-time messaging**

  * Socket.IO
  * RabbitMQ event surfaces in dashboards
* **Integrated payments** using Razorpay Checkout with Cloudinary-hosted invoice downloads.
* **Firebase** (optional): used for push notifications & auth helpers.
* **Form validation** powered by React Hook Form + Zod.

---

## 📁 Project Structure

```
src/
│
├── components/           # Shared UI components (headers, cards, modals)
├── client/               # Feature-specific pages (client & freelancer)
│   ├── Pages/            # Route-level screens
│   ├── Dashboard/        # Dashboard widgets & analytics
│   ├── Services/         # Axios services + API wrappers
│   └── Redux/            # Redux slices & store configuration
│
├── hooks/                # Custom hooks (useAxios, useSocket, useTheme, etc.)
├── lib/                  # Utilities, constants, helpers
├── firebase.js           # Firebase bootstrap (uses VITE_FIREBASE_* env vars)
├── App.jsx               # Root component
├── main.jsx              # Entry point
│
public/                   # Static assets, icons, metadata
components.json           # shadcn-ui config
tailwind.config.js        # Theme tokens & design presets
```

---

## ⚙️ Environment Setup

### 1. Install dependencies

```bash
npm install
```

---

### 2. Create `frontend/.env`

```
API_URL=http://localhost:7000/api       # Gateway URL
VITE_LOC_API_KEY=pk_xxxxxx              # Maps/Location API key (if used)

# Optional (recommended)
VITE_FIREBASE_API_KEY="YOUR_API_KEY"
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_MESSAGING_SENDER_ID=""
VITE_FIREBASE_APP_ID=""
VITE_FIREBASE_MEASUREMENT_ID=""
```

⚠️ **All Vite frontend env vars must start with `VITE_`**

---

### 3. Run development server

```bash
npm run dev
```

Vite defaults to:
👉 [http://localhost:5173](http://localhost:5173)

---

### 4. Build for production

```bash
npm run build
npm run preview
```

---

## 🔌 Tools & Conventions

### 🧹 Linting

```bash
npm run lint
```

Configuration lives in:

* `eslint.config.js`
* Tailwind auto-sort enabled
* Prettier integration optional

---

### 🎨 Styling

* Tailwind CSS powered with custom theme tokens
* Radix UI + shadcn components
* Global styles → `src/index.css`
* `tailwind-merge` used for class merging

---

### 🧵 State + Data

* **Redux Toolkit** for user, auth, and app-level state
* **TanStack Query** for all server-side queries (jobs, bids, analytics)
* **js-cookie** for storing access tokens
* Automatic logout clears Redux slices + cookies

---

### 🔌 API Layer

Centralized in:

```
src/client/Services/
```

* Custom Axios instance with:

  * JWT header injection
  * refresh-token retry (optional)
  * error normalization
* Everything routes through the **Gateway** (`/api/...`)

---

### 💬 Real-Time Messaging

* Socket events follow the naming convention:

```
chat:<jobId>
```

Example:

```
src/client/Components/FreelancersDashboard/Projects.jsx
```

RabbitMQ events: typing indicators, message delivered states.

---

### 🧾 Payment Integration

* Razorpay Checkout on milestone creation
* Signature verification done in backend (job-service)
* Invoice downloads via Cloudinary URLs

---

### 🔔 Notifications

* Fetched from Notification-Service
* Bell-icon dropdown in navbar using custom popover component
* Support for in-app + email + optional push notifications

---

## 🔗 Integration Points

| Service                  | Used For                                        |
| ------------------------ | ----------------------------------------------- |
| **Auth-Service**         | Login, signup, OTP, OAuth, user profile, tokens |
| **job-service**          | Jobs, bids, dashboards, invoices, reports       |
| **Payment-Service**      | Razorpay orders & subscription renewals         |
| **Chat-Service**         | Socket connection & chat feed                   |
| **Notification-Service** | In-app notifications + email metadata           |
| **Firebase (optional)**  | Push notifications & analytics                  |

---

## 🧠 Development Tips

* Always point `API_URL` → **Gateway**, not individual microservices.
* Run:

  ```bash
  npm run lint -- --fix
  ```

  to auto-fix style issues.
* Every new frontend environment variable must start with `VITE_`.
* Prefer **TanStack Query** for any data fetched more than once.
* Pages should stay thin—put logic into hooks or service functions.
* Use skeleton components from `/components/skeletons` for loading states.
* When enabling PWA features, update:

  * `public/manifest.json`
  * Service worker registration logic

---

