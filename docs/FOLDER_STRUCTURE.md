# ProjectFlow Folder Structure

```text
projectflow/

├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── docker/
│   ├── postgres/
│   └── redis/
│
├── docs/
│   ├── SYSTEM_ARCHITECTURE.md
│   ├── DATABASE_DESIGN.md
│   ├── API_SPECIFICATION.md
|   ├── FOLDER_STRUCTURE.md
│   ├── ENGINEERING_DECISIONS.md
│   ├── IMPLMENTATION_ROADMAP.md
│   ├── DEPLOYMENT_GUIDE.md
│   └── CONTRIBUTING.md
│
├── public/
│
├── tests/
│   │
│   ├── integration/
│   ├── e2e/
│   ├── fixtures/
│   └── utils/
│
├── src/
│   │
│   ├── app/
│   │   │
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   │
│   │   ├── dashboard/
│   │   │
│   │   ├── organizations/
│   │   │
│   │   ├── projects/
│   │   │
│   │   ├── tasks/
│   │   │
│   │   ├── settings/
│   │   │
│   │   ├── api/
│   │   │
│   │   │   ├── auth/
│   │   │   ├── organizations/
│   │   │   ├── projects/
│   │   │   ├── tasks/
│   │   │   ├── comments/
│   │   │   ├── notifications/
│   │   │   ├── attachments/
│   │   │   └── analytics/
│   │   │
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   │
│   ├── features/
│   │   │
│   │   ├── auth/
│   │   │   │
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── schemas/
│   │   │   ├── services/
│   │   │   ├── repositories/
│   │   │   ├── types/
│   │   │   └── utils/
│   │   │
│   │   ├── organizations/
│   │   │   │
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── schemas/
│   │   │   ├── services/
│   │   │   ├── repositories/
│   │   │   ├── permissions/
│   │   │   └── types/
│   │   │
│   │   ├── projects/
│   │   │   │
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── schemas/
│   │   │   ├── services/
│   │   │   ├── repositories/
│   │   │   └── types/
│   │   │
│   │   ├── tasks/
│   │   │   │
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── schemas/
│   │   │   ├── services/
│   │   │   ├── repositories/
│   │   │   ├── socket/
│   │   │   └── types/
│   │   │
│   │   ├── comments/
│   │   │
│   │   ├── notifications/
│   │   │
│   │   ├── attachments/
│   │   │
│   │   ├── analytics/
│   │   │
│   │   └── activity-logs/
│   │
│   │
│   ├── components/
│   │   │
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── dropdown.tsx
│   │   │   └── table.tsx
│   │   │
│   │   ├── forms/
│   │   │
│   │   ├── layouts/
│   │   │
│   │   └── providers/
│   │
│   │
│   ├── lib/
│   │   │
│   │   ├── prisma/
│   │   │   └── prisma.ts
│   │   │
│   │   ├── redis/
│   │   │   └── redis.ts
│   │   │
│   │   ├── s3/
│   │   │   └── s3.ts
│   │   │
│   │   ├── socket/
│   │   │   ├── server.ts
│   │   │   └── client.ts
│   │   │
│   │   ├── logger/
│   │   │   └── logger.ts
│   │   │
│   │   ├── email/
│   │   │   └── resend.ts
│   │   │
│   │   └── env/
│   │       └── env.ts
│   │
│   │
│   ├── server/
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── tenant.ts
│   │   │   ├── permissions.ts
│   │   │   └── rate-limit.ts
│   │   │
│   │   ├── permissions/
│   │   │
│   │   ├── cache/
│   │   │
│   │   ├── jobs/
│   │   │
│   │   └── websocket/
│   │
│   │
│   ├── stores/
│   │   ├── auth-store.ts
│   │   ├── ui-store.ts
│   │   ├── socket-store.ts
│   │   └── notification-store.ts
│   │
│   │
│   ├── hooks/
│   │   ├── use-debounce.ts
│   │   ├── use-modal.ts
│   │   └── use-pagination.ts
│   │
│   │
│   ├── types/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── common.ts
│   │   └── socket.ts
│   │
│   │
│   ├── constants/
│   │   ├── roles.ts
│   │   ├── permissions.ts
│   │   ├── routes.ts
│   │   └── events.ts
│   │
│   │
│   ├── utils/
│   │   ├── date.ts
│   │   ├── pagination.ts
│   │   ├── slug.ts
│   │   └── crypto.ts
│   │
│   │
│   ├── validations/
│   │   └── common.ts
│   │
│   │
│   └── generated/
│       └── prisma/
│
├── .env
├── .env.example
│
├── Dockerfile
├── docker-compose.yml
│
├── eslint.config.js
├── prettier.config.js
│
├── vitest.config.ts
├── playwright.config.ts
│
├── next.config.ts
├── tsconfig.json
│
├── package.json
│
└── README.md
```

# Feature Internal Structure

Example:

```text
features/tasks/

├── components/
│   ├── task-card.tsx
│   ├── task-modal.tsx
│   ├── task-list.tsx
│   └── task-details.tsx
│
├── hooks/
│   ├── use-create-task.ts
│   ├── use-update-task.ts
│   └── use-delete-task.ts
│
├── repositories/
│   └── task.repository.ts
│
├── services/
│   └── task.service.ts
│
├── schemas/
│   ├── create-task.schema.ts
│   └── update-task.schema.ts
│
├── socket/
│   └── task-events.ts
│
└── types/
    └── task.types.ts
```

# Backend Flow

```text
Route Handler
      │
      ▼
Validation
      │
      ▼
Service
      │
      ▼
Repository
      │
      ▼
Prisma
      │
      ▼
PostgreSQL
```

# Why This Structure?

Benefits:

1. Feature-oriented architecture
2. Clear domain boundaries
3. Easy onboarding
4. Easier testing
5. Scales to large codebases
6. Supports modular monolith architecture
7. Can evolve into microservices later
8. Keeps business logic out of route handlers
9. Keeps database logic isolated
10. Mirrors real-world SaaS applications

```
```
