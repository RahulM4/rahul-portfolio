# Portfolio CMS Monorepo

A full-stack portfolio and content management system built with Next.js (App Router), Express, and MongoDB. It includes a secure admin area, markdown blog, project showcase, and contact workflow.

## Tech Stack

- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS with dark/light support
- Express 4 + Mongoose 8
- MongoDB with Mongoose models
- JWT authentication with HTTP-only cookies
- Nodemailer contact notifications
- Jest + Testing Library for unit tests

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Copy environment variables**
   ```bash
   cp .env.example .env
   ```
3. **Run MongoDB locally** (or update `MONGO_URI`)
4. **Seed the database**
   ```bash
   npm run seed
   ```
5. **Start development servers**
   ```bash
   npm run dev
   ```
   - API: http://localhost:4000
   - Web: http://localhost:3000

Admin credentials default to `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`.

## Scripts

- `npm run dev` – run API and web in parallel
- `npm run build` – build both workspaces
- `npm run test` – run unit tests across workspaces
- `npm run lint` – lint all packages
- `npm run seed` – seed MongoDB with starter data and admin user

## Deployment

- **Web (Vercel)**
  - Framework: Next.js
  - Build command: `npm run build --workspace apps/web`
  - Output directory: `.next`
  - Environment variables: `NEXT_PUBLIC_API_URL`, `API_URL` (point to deployed API)

- **API (Render/Fly/Railway)**
  - Build command: `npm run build --workspace apps/api`
  - Start command: `npm run start --workspace apps/api`
  - Environment variables: all from `.env.example`
  - Ensure MongoDB connection string points to MongoDB Atlas

## Testing

- Frontend unit tests: `apps/web/__tests__`
- Backend unit tests: `apps/api/src/__tests__`
- Run all tests with `npm run test`

## CI

A GitHub Actions workflow (`.github/workflows/ci.yml`) runs linting and unit tests.

## Folder Structure

```
apps/
  web/   # Next.js frontend + admin
  api/   # Express API + Mongoose models
packages/
  shared/  # Shared utilities (placeholder)
```

## Security & Best Practices

- Admin-only CMS guarded by JWT and middleware in API + Next middleware
- HTTP-only cookies for session storage
- Rate-limited contact endpoint
- Server-side validation via Zod for all payloads
- Environment variables for secrets & SMTP credentials

## Seed Data

The seed script provisions:

- Initial admin user
- Default site settings
- Sample project, blog post, skills, and experience entry

Run `npm run seed` after setting up `.env` to populate the database.

<!-- npm run seed --workspace apps/api -->