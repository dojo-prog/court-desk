# CourtDesk

CourtDesk is a full-stack court reservation and facility-management application. It provides an administrative interface for managing courts, customers, reservations, payments, staff accounts, and operational metrics through a typed REST API.

## Contents

- [Overview](#overview)
- [Features](#features)
- [Technology stack](#technology-stack)
- [Architecture](#architecture)
- [Repository structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Environment configuration](#environment-configuration)
- [Database](#database)
- [Running the application](#running-the-application)
- [API reference](#api-reference)
- [Authentication and authorization](#authentication-and-authorization)
- [Validation and error handling](#validation-and-error-handling)
- [Development workflow](#development-workflow)
- [Production build](#production-build)
- [Security notes](#security-notes)
- [Troubleshooting](#troubleshooting)
- [Potential improvements](#potential-improvements)

## Overview

CourtDesk is designed to centralize the day-to-day work involved in operating a court-based sports facility. Instead of tracking court schedules, customer records, bookings, and payments separately, staff can manage these records through a single admin application.

The repository is organized as an npm-workspaces monorepo:

- **Admin application** — the browser-based React interface.
- **API application** — an Express REST API that applies business rules and accesses PostgreSQL.
- **Shared package** — reusable TypeScript types and Zod schemas used across the frontend and backend.

The API is the system boundary for data access. The admin application sends HTTP requests to it; both applications import shared contracts so request and response shapes can be kept consistent.

## Features

### Dashboard
- Overview statistics for administrators.
- A view of today's reservations.
- Summary data provided by the dashboard API.

### Court management
- List and inspect courts.
- Register new courts.
- Update court details and status.
- Delete court records.
- Court statuses supported by the database: `active`, `maintenance`, and `inactive`.

### Customer management
- Create, view, update, search, and delete customer records.
- Store customer names and optional email and phone details.
- Paginated and query-validated customer listing.

### Reservation management
- Create and inspect reservations.
- Search and list reservations.
- Check court availability before creating a reservation.
- Update reservation status and delete reservations.
- Store the selected customer, court, creator, date, start/end time, pricing, and optional notes.
- Prevent overlapping active reservations for the same court at the database level.

Reservation statuses supported by the database are `pending`, `confirmed`, `completed`, and `cancelled`. The database overlap constraint applies to `pending` and `confirmed` reservations; cancelled and completed reservations do not block a time slot.

### Payment tracking
- Record a payment against a reservation.
- Track the staff user who recorded a payment.
- List and inspect payment records.
- Payment methods supported by the database: `cash`, `gcash`, `bank_transfer`, and `card`.

### User and access management
- Login and current-user endpoints.
- Admin-only user registration, listing, updating, and deletion.
- Role-based access for `admin` and `staff` users.

### Operational safeguards
- Shared request validation using Zod.
- Authentication and role-checking middleware.
- Global and route-specific rate limits.
- Health endpoints for liveness and readiness checks.
- Graceful shutdown handling for the API server.
- PostgreSQL connection check before the server begins listening.

## Technology stack

| Area | Technologies |
|---|---|
| Language | TypeScript |
| Frontend | React 19, Vite 8, React Router |
| Data fetching | TanStack Query |
| Forms and validation | React Hook Form, Zod |
| HTTP client | Axios |
| UI and styling | Tailwind CSS 4, Base UI, shadcn components, Lucide |
| Calendar | FullCalendar |
| Backend | Node.js, Express 5 |
| Database | PostgreSQL |
| Database access | `pg` connection pool and parameterized SQL queries |
| Authentication | JSON Web Tokens, HTTP cookies, `bcryptjs` |
| API middleware | CORS, cookie-parser, express-rate-limit |
| Monorepo | npm workspaces |
| Shared contracts | Internal `@courtdesk/shared` package |
| Linting | Oxlint |

## Architecture

```text
┌─────────────────────────────┐
│      Admin Web App           │
│ React + TypeScript + Vite    │
│ Pages / Features / Hooks     │
└──────────────┬──────────────┘
               │ HTTP + JSON
               │ Cookie credentials
               ▼
┌─────────────────────────────┐
│        Express API           │
│ CORS / rate limiting         │
│ Validation / auth middleware │
│ Controllers                  │
│ Services                     │
│ Repositories / SQL queries   │
└──────────────┬──────────────┘
               │ SQL via pg Pool
               ▼
┌─────────────────────────────┐
│         PostgreSQL           │
│ users, customers, courts,    │
│ reservations, payments       │
└─────────────────────────────┘

       ┌───────────────────┐
       │ @courtdesk/shared │
       │ Zod schemas/types │
       └───────────────────┘
       Used by admin and API
```

### Backend request flow

A typical API request follows this general path:

1. Express receives the request.
2. Application-wide middleware handles CORS, JSON parsing, cookies, and global rate limiting.
3. Route middleware checks authentication and role permissions where required.
4. Zod validation middleware validates request parameters, query strings, or bodies.
5. The controller handles HTTP concerns and calls the service.
6. The service applies application/business rules.
7. The repository or query layer performs database operations.
8. The controller returns the response; centralized error middleware handles errors passed through the Express error pipeline.

This separation keeps HTTP handling, business logic, and SQL access from being tightly coupled.

## Repository structure

```text
courtdesk/
├── apps/
│   ├── admin/                   # React admin application
│   │   └── src/
│   │       ├── app/             # App-level providers
│   │       ├── components/      # Shared UI, layout, feedback
│   │       ├── config/          # Frontend environment config
│   │       ├── features/        # Feature API clients, hooks, types
│   │       ├── layouts/
│   │       ├── lib/             # Axios, TanStack Query, utilities
│   │       └── pages/           # Route-level screens
│   └── api/                     # Express backend
│       ├── seed/                # Development seed data
│       └── src/
│           ├── config/
│           ├── constants/
│           ├── infrastructure/  # Database, rate limits, shutdown
│           ├── middlewares/
│           ├── modules/         # Feature modules
│           ├── types/
│           └── utils/
├── packages/
│   └── shared/                  # Shared schemas and types
├── package.json                 # Workspace scripts
└── package-lock.json
```

### Backend modules

The API is divided into feature modules:

- `auth` — login, logout, current user, access-token refresh.
- `users` — staff/admin account management.
- `customers` — customer records.
- `courts` — court records and status.
- `reservations` — bookings, status changes, availability.
- `payments` — payment records.
- `dashboard` — overview data.
- `health` — liveness and readiness endpoints.

A feature module typically contains routes, controllers, services, repositories, and types. Shared query helpers and database infrastructure live outside individual feature modules.

## Prerequisites

Install the following before running the project:

- **Node.js** compatible with the installed Vite version (Node.js 20.19+ or 22.12+ is a safe baseline for Vite 8; use a current supported Node.js LTS release).
- **npm**, included with Node.js.
- **PostgreSQL** with permission to create tables and the `btree_gist` extension.
- **Git**.

Check the installed versions:

```bash
node --version
npm --version
psql --version
```

## Getting started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd courtdesk
```

Replace `<your-repository-url>` with the repository's actual Git URL.

### 2. Install dependencies

Run this command from the repository root:

```bash
npm install
```

The root package uses npm workspaces to install and link the `apps/*` and `packages/*` workspaces.

### 3. Configure environment variables

Create local environment files for the API and admin app. The repository ignores `.env*` files, so do not commit secrets.

API configuration is read by `apps/api/src/config/env.ts`. The frontend reads Vite variables from `apps/admin/src/config/env.ts`. See [Environment configuration](#environment-configuration) for the required variable names.

### 4. Create a PostgreSQL database

Create a local database and a database user with permissions to connect and create tables. For example, from `psql` as a database administrator:

```sql
CREATE USER courtdesk_user WITH PASSWORD 'replace-with-a-local-password';
CREATE DATABASE courtdesk OWNER courtdesk_user;
```

Use your actual local credentials in the API environment file. Do not use this example password outside local development.

### 5. Initialize the database schema

From the repository root, run:

```bash
npm run db:init
```

This runs the API's database initialization script, which creates the required tables, indexes, checks, and reservation-overlap constraint if they do not already exist.

The initializer uses `CREATE TABLE IF NOT EXISTS`; it is an initial schema setup script, not a full migration framework. If the schema changes later, existing tables may not automatically receive every new column or constraint. Use deliberate migrations for ongoing schema evolution.

### 6. Build the shared package

The shared package exports compiled JavaScript and TypeScript declaration files from `packages/shared/dist`. Build it before running the apps if its `dist` output is missing or stale:

```bash
npm run build:shared
```

During active development, run the shared package watcher in a separate terminal:

```bash
npm run watch:shared
```

### 7. Start the API and admin app

Start each application in its own terminal from the repository root.

Terminal 1 — API:

```bash
npm run dev:api
```

Terminal 2 — admin app:

```bash
npm run dev:admin
```

Vite normally prints the local admin URL in its terminal output. The API listens on the configured `PORT`.

## Environment configuration

### API

The API imports `dotenv/config` and requires the following values. The configuration selects production variables when `NODE_ENV=production`; otherwise, it selects development variables.

Create `apps/api/.env` for local development:

```dotenv
NODE_ENV=development
PORT=3000

DEV_CLIENT_URL=http://localhost:5173

DEV_DATABASE_HOST=localhost
DEV_DATABASE_PORT=5432
DEV_DATABASE_NAME=courtdesk
DEV_DATABASE_USER=courtdesk_user
DEV_DATABASE_PASSWORD=replace-with-your-local-password

DEV_ACCESS_TOKEN_SECRET=replace-with-a-long-random-development-secret
DEV_REFRESH_TOKEN_SECRET=replace-with-a-different-long-random-development-secret
```

For production, provide the production variable set to the hosting environment (or a separate local-only production env file):

```dotenv
NODE_ENV=production
PORT=3000

CLIENT_URL=https://your-admin-domain.example

DATABASE_HOST=your-database-host
DATABASE_PORT=5432
DATABASE_NAME=your-database-name
DATABASE_USER=your-database-user
DATABASE_PASSWORD=your-database-password

ACCESS_TOKEN_SECRET=replace-with-a-long-random-secret
REFRESH_TOKEN_SECRET=replace-with-a-different-long-random-secret
```

Use the real frontend origin in `CLIENT_URL` or `DEV_CLIENT_URL`, including the scheme and port when applicable. The current CORS configuration allows the configured origin and requests with no `Origin` header; browser requests from any other origin are rejected. Cookie-based authentication requires credentialed requests from the frontend.

Generate strong, unique token secrets for production and keep them out of source control. Never reuse the example values.

### Admin frontend

Create `apps/admin/.env` for local development:

```dotenv
VITE_ENVIRONMENT=development
VITE_APP_NAME=CourtDesk
VITE_DEV_API_URL=http://localhost:3000
```

For a production frontend build, set:

```dotenv
VITE_ENVIRONMENT=production
VITE_APP_NAME=CourtDesk
VITE_API_URL=https://your-api-domain.example
```

Vite only exposes variables prefixed with `VITE_` to browser code. **Never put database passwords, JWT secrets, or other server-only secrets in frontend environment variables.** Values included in a frontend build can be inspected by users.

The frontend selects `VITE_API_URL` when `VITE_ENVIRONMENT` equals `production`; otherwise, it selects `VITE_DEV_API_URL`.

> **Important:** Environment variables are validated at application startup/import time. Missing required values can prevent the application from starting. Make sure the API CORS origin matches the exact frontend origin.

## Database

The schema initializer currently creates the following core tables:

| Table | Purpose |
|---|---|
| `users` | Staff/admin accounts, password hashes, roles, timestamps |
| `customers` | Customer contact information |
| `courts` | Court names and operational status |
| `reservations` | Customer/court booking, date/time, pricing, status, notes |
| `payments` | Payments recorded against reservations |

### Relationships

- A reservation can reference a customer, court, and user who created it.
- A payment can reference a reservation and the user who recorded it.
- Foreign keys use `ON DELETE SET NULL` for these optional references, preserving the related reservation/payment row when a referenced record is deleted.

### Integrity rules

The database defines checks and indexes including:

- Case-insensitive uniqueness for user email, user full name, and court name.
- Valid user roles: `admin`, `staff`.
- Valid court statuses: `active`, `maintenance`, `inactive`.
- Valid reservation statuses: `pending`, `confirmed`, `completed`, `cancelled`.
- Valid payment methods: `cash`, `gcash`, `bank_transfer`, `card`.
- Reservation start time must be earlier than end time.
- A GiST exclusion constraint prevents overlapping `[start, end)` time ranges for the same court when the reservation is `pending` or `confirmed`.

The schema uses PostgreSQL's `btree_gist` extension for the exclusion constraint. Your database account must be allowed to enable the extension, or a database administrator must enable it.

The current reservation schema stores `date`, `start_time`, and `end_time` as separate fields. The constraint builds a timestamp range from those fields. Because the columns use `date` and `time` rather than time-zone-aware timestamps, the application should use a consistent facility-local time convention.

### Seed data

Run the seed script with:

```bash
npm run db:seed
```

The seed data defines sample users (an admin and two staff accounts) and sample court, customer, and reservation data. Inspect `apps/api/seed/` before running it in a shared or production database. Seed scripts may truncate or replace existing data and should be treated as development utilities unless specifically hardened for production.

The seed user definitions include `admin@dojo.com`, `staff.1@dojo.com`, and `staff.2@dojo.com`. Check the seed implementation for how passwords are generated and set; do not assume a default password from the email addresses.

## Running the application

### Root scripts

Run commands from the repository root:

| Command | Description |
|---|---|
| `npm run dev:api` | Start the API in watch mode using `tsx` |
| `npm run dev:admin` | Start the Vite admin app |
| `npm run watch:shared` | Recompile the shared package when source changes |
| `npm run db:init` | Initialize the PostgreSQL schema |
| `npm run db:seed` | Run the seed script |
| `npm run build:shared` | Compile shared contracts |
| `npm run build:api` | Compile the API with TypeScript |
| `npm run build:admin` | Type-check and build the admin app |
| `npm run build` | Run each workspace's build script |

### Suggested local terminal setup

For day-to-day work, run the following in separate terminals:

```bash
# Terminal 1: rebuild shared package when its source changes
npm run watch:shared

# Terminal 2: API
npm run dev:api

# Terminal 3: admin
npm run dev:admin
```

If the shared package has not been built yet, run `npm run build:shared` once before starting the applications.

## API reference

The API uses the `/api/v1` prefix for application resources. Unless stated otherwise, resource routes are protected by authentication. Exact request and response shapes are defined in `packages/shared/src/schemas/` and the corresponding API controllers.

### Health checks

| Method | Endpoint | Purpose | Authentication |
|---|---|---|---|
| `GET` | `/health/live` | Liveness check | Public |
| `GET` | `/health/ready` | Readiness/dependency check | Public |

### Authentication

Base path: `/api/v1/auth`

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/login` | Authenticate a user |
| `GET` | `/me` | Return the authenticated user |
| `POST` | `/logout` | Log out / clear authentication cookies |
| `POST` | `/refresh-access` | Refresh the access token |

### Users

Base path: `/api/v1/users` — **admin only**

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/` | List users |
| `POST` | `/` | Register a user |
| `GET` | `/:userId` | Get a user |
| `PATCH` | `/:userId` | Update a user |
| `DELETE` | `/:userId` | Delete a user |

### Customers

Base path: `/api/v1/customers` — **admin and staff**

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/` | List/search customers |
| `POST` | `/` | Create a customer |
| `GET` | `/:customerId` | Get a customer |
| `PATCH` | `/:customerId` | Update a customer |
| `DELETE` | `/:customerId` | Delete a customer |

### Courts

Base path: `/api/v1/courts` — **admin only**

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/` | List/search courts |
| `POST` | `/` | Create a court |
| `GET` | `/:courtId` | Get a court |
| `PATCH` | `/:courtId` | Update a court |
| `DELETE` | `/:courtId` | Delete a court |

### Reservations

Base path: `/api/v1/reservations` — **admin and staff**

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/` | List/search reservations |
| `POST` | `/` | Create a reservation |
| `GET` | `/availability` | Check court availability |
| `GET` | `/:reservationId` | Get a reservation |
| `PATCH` | `/:reservationId/status` | Update reservation status |
| `DELETE` | `/:reservationId` | Delete a reservation |

### Payments

Base path: `/api/v1/payments` — **admin and staff**

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/` | List/search payments |
| `POST` | `/` | Create a payment |
| `GET` | `/:paymentId` | Get a payment |

### Dashboard

Base path: `/api/v1/dashboard` — **admin only**

| Method | Endpoint | Purpose | 
|---|---|---|
| `GET` | `/overview` | Retrieve dashboard overview data |

### Request contracts

Shared Zod schemas validate request bodies, query parameters, and route parameters. Browse these files for the canonical contracts:

- `packages/shared/src/schemas/auth/`
- `packages/shared/src/schemas/users/`
- `packages/shared/src/schemas/customers/`
- `packages/shared/src/schemas/courts/`
- `packages/shared/src/schemas/reservations/`
- `packages/shared/src/schemas/payments/`
- `packages/shared/src/schemas/dashboard/`

For exact JSON examples, response envelopes, pagination parameters, sorting options, and error codes, use the schemas and controller/service implementations as the source of truth; this README intentionally does not guess payload shapes that may change as the API evolves.

## Authentication and authorization

The API uses JWT-based authentication and cookie parsing. The admin application is configured to use a shared Axios client and API requests; check its client/interceptor implementation when changing cookie or refresh-token behavior.

Authorization is role-based:

| Resource | Admin | Staff |
|---|---:|---:|
| Authentication endpoints | Based on endpoint | Based on endpoint |
| User management | Yes | No |
| Court management | Yes | No |
| Customer management | Yes | Yes |
| Reservation management | Yes | Yes |
| Payment management | Yes | Yes |
| Dashboard overview | Yes | No |

The auth middleware protects private routes, and route modules explicitly apply role restrictions. Login, user registration, reservation creation/status updates, and other write operations have route-specific rate limiters in addition to the global limiter.

## Validation and error handling

- Shared Zod schemas define accepted input formats and constraints.
- API route middleware validates request bodies, query strings, and route parameters before invoking controllers.
- `AppError` provides a central application error representation.
- Central error middleware formats errors at the end of the Express middleware stack.
- Database constraints remain a final integrity layer, including for conflicting reservations.

When adding an endpoint, update the shared schema/types where appropriate, validate input at the route boundary, keep business rules in the service layer, and use the repository/query layer for database access.

## Development workflow

### Adding or changing a shared contract

1. Edit the relevant schema under `packages/shared/src/schemas/`.
2. Export it through the appropriate index file.
3. Rebuild or watch the shared package.
4. Update the API route/controller/service to use the contract.
5. Update the admin API client, types, hooks, and UI as needed.
6. Run builds for the affected workspaces.

### Adding a backend feature

A typical feature follows this flow:

1. Define shared input/output schemas and types.
2. Add or update database queries and repository methods.
3. Implement service-level business logic.
4. Implement controller handlers.
5. Register routes and attach validation, authentication, authorization, and rate limits.
6. Mount the router in `apps/api/src/app.ts`.
7. Update the frontend feature API module, query/mutation hooks, and page/components.
8. Verify the feature against the local database and run builds.

### Testing

No dedicated test script is currently declared in the root, API, or admin package manifests. Before relying on automated tests in CI, add a test runner and scripts, then cover shared validation schemas, business rules, route behavior, authorization, and database-sensitive operations such as reservation overlap handling.

## Production build

Build the workspaces from the repository root:

```bash
npm run build:shared
npm run build:api
npm run build:admin
```

The API TypeScript compiler emits compiled output into `apps/api/dist`, and its start script runs:

```bash
npm start -w @courtdesk/api
```

The admin build is generated by Vite. Deploy the resulting static assets to a static web host and deploy the API to a Node.js-capable host. Provision PostgreSQL separately or use a managed PostgreSQL service.

Before deploying:

1. Set `NODE_ENV=production` and all production API variables.
2. Set the frontend production variables at build time.
3. Configure the API CORS origin to the deployed admin origin.
4. Configure HTTPS and secure cookie behavior for the deployed domains.
5. Run schema setup/migrations against the production database.
6. Confirm health endpoints and database connectivity.
7. Never run destructive seed scripts against production data without a deliberate, reviewed procedure.

## Security notes

- Do not commit `.env` files or secrets.
- Do not expose server secrets through `VITE_*` variables.
- Use unique, high-entropy access and refresh token secrets in production.
- Use HTTPS in production.
- Configure cookie flags (`HttpOnly`, `Secure`, and an appropriate `SameSite` policy) for the deployment topology.
- Keep CORS origins narrowly scoped to trusted frontend origins.
- Keep rate limits enabled and tune them for expected usage.
- Back up the database and test restoration procedures.
- Review seed scripts before running them against any database containing valuable data.
- Consider database migrations, audit logging, automated tests, and monitoring before treating the application as production-critical.

## Troubleshooting

### API exits with a missing environment variable

The API validates required environment variables during import. Confirm that the expected `.env` file is loaded from the process working directory and that the correct development or production variable names are present.

### API cannot connect to PostgreSQL

Check that PostgreSQL is running, the host and port are correct, the database exists, and the configured user has permission to connect. If the API is running in a container, `localhost` refers to that container, not the host machine or a separate database container.

### Browser reports a CORS error

Make sure `DEV_CLIENT_URL` (development) or `CLIENT_URL` (production) exactly matches the admin origin, including scheme and port. Restart the API after changing environment variables. If the frontend is deployed on a different domain than the API, verify credentialed CORS and cookie settings too.

### Shared package changes do not appear

Run `npm run watch:shared` in a separate terminal or rebuild the package using `npm run build:shared`. Confirm the generated `packages/shared/dist` files reflect the source changes.

### Reservation creation fails because of an overlap

The database rejects overlapping reservations for the same court when the existing reservation is pending or confirmed. Check the court, date, start/end time, and current reservation statuses. Treat the database exclusion constraint as authoritative even if an earlier availability check reported the slot as available, because concurrent requests can race.

### Frontend fails because an environment variable is missing

Ensure the relevant `VITE_*` variables exist before starting Vite or building the frontend. Remember that Vite variables are embedded into the client bundle at build time.

## Potential improvements

These are possible next steps, not claims that they already exist:

- Add automated unit, integration, and API tests.
- Introduce versioned database migrations instead of relying only on an initialization script.
- Document canonical request/response examples and standard error response formats.
- Add CI checks for type-checking, linting, builds, and tests.
- Add structured logging, error monitoring, and production metrics.
- Review token refresh, cookie settings, and logout behavior against the intended deployment model.
- Add audit history for reservation status changes and payment recording.
- Define explicit backup and recovery procedures for PostgreSQL.

## License

No project license is currently specified in this README. Add a `LICENSE` file and update this section if you intend to distribute the project under an open-source license.
