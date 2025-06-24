# 💳 Stripe Donation App (Next.js)

This project is a donation web app built with **Next.js**, **TypeScript**, and **TailwindCSS**, integrated with **Stripe** to support one-time and monthly recurring donations.

---

## 📦 Features

- One-time & monthly donation support via Stripe
- Tailwind CSS-based landing UI
- Webhook handling for recurring payments
- Docker + Docker Compose support for consistent environments
- Secure secrets management via `.env.local`

---

## 🛠️ Prerequisites

Before starting, ensure you have the following installed:

- [Node.js (18+)](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Stripe CLI](https://stripe.com/docs/stripe-cli) (for local webhook testing)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:your_github_username/donate-stripe.git
cd stripe-donation-nextjs
```

### 2. Environment Variables

Create a `.env.local` file in the root of the project with your Stripe credentials:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_MONTHLY_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

✅ Ensure `.env.local` is listed in `.gitignore`.

---

## 🐳 Running with Docker

### 1. Build and Start the App

```bash
docker-compose up --build
```

Open your browser to [http://localhost:3000](http://localhost:3000)

### 2. Environment Config with Docker

Docker uses both `env_file` and `environment` overrides for sensitive variables:

```yaml
# docker-compose.yml excerpt
env_file:
  - .env.local
```

---

## 🔁 Webhook Setup (Development)

To test Stripe webhooks locally:

### 1. Login via Stripe CLI

```bash
stripe login
```

### 2. Forward Events to Your App

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

You'll get a `whsec_...` secret key in the console. Paste this in `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 🌱 Development Guidelines

### ✅ Branching Strategy

Use Git Flow-like practices:

- `main` → stable production release
- `develop` → all staging/integration work
- `feature/*` → individual work branches

```bash
git checkout develop
git pull
git checkout -b feature/your-feature
```

Submit pull requests **into `develop`**, never `main`.

---

## 🧪 Testing Stripe

Use Stripe’s test card number to simulate payments:

- **Card**: `4242 4242 4242 4242`
- **Date**: Any future date
- **CVC**: Any 3-digit number
- **ZIP**: Any 5-digit ZIP

---

## 🧼 Safety Practices

- DO NOT commit `.env.local`
- Never push secrets to GitHub or public remotes
- Always run `docker-compose down` to stop containers after dev
