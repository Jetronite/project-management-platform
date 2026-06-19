# ProjectFlow

A modern multi-tenant SaaS project management platform built with Next.js, TypeScript, PostgreSQL, and WebSockets.

ProjectFlow helps teams organize work, collaborate in real time, and manage projects through a Kanban-based workflow inspired by Trello and Jira.

---

## Overview

ProjectFlow is a full-stack project management application designed around organizations, projects, tasks, and team collaboration.

The platform supports:

* Multi-tenant workspaces
* Role-based access control
* Kanban task management
* Real-time collaboration
* File uploads
* Team notifications
* Activity tracking
* Analytics dashboard

The goal of this project is to demonstrate production-grade software engineering practices including authentication, authorization, database design, API development, real-time systems, testing, and deployment.

---

## Features

### Authentication & User Management

* User registration and login
* JWT-based authentication
* Secure password hashing with bcrypt
* Email verification
* Password reset workflow
* Google OAuth integration
* Profile management

### Multi-Tenant Organizations

Create and manage independent workspaces.

Examples:

* Acme Inc
* Marketing Team
* Engineering Team

Supported roles:

| Role   | Description               |
| ------ | ------------------------- |
| Owner  | Full access               |
| Admin  | Manage projects and users |
| Member | Create and update tasks   |
| Viewer | Read-only access          |

Role-based permissions are enforced throughout the platform.

---

### Project Management

Each organization can contain multiple projects.

Examples:

* Website Redesign
* Mobile Application
* Internal CRM

Features:

* Create projects
* Edit project details
* Archive projects
* Manage project members

---

### Kanban Board

Visual workflow management with drag-and-drop support.

Columns:

* Backlog
* To Do
* In Progress
* Review
* Done

Capabilities:

* Reorder tasks
* Move tasks between columns
* Real-time board updates
* Optimistic UI updates

---

### Task Management

Comprehensive task tracking system.

Task fields include:

* Title
* Description
* Priority
* Status
* Assignee
* Due Date

Priority levels:

* Low
* Medium
* High
* Critical

Features:

* Create tasks
* Update tasks
* Assign users
* Set deadlines
* Track progress

---

### Comments & Collaboration

Collaborate directly within tasks.

Features:

* Create comments
* Edit comments
* Delete comments
* Mention users
* Discussion history

Example:

@john please review this implementation before deployment.

---

### Notifications

Real-time user notifications.

Examples:

* Task assigned
* User mentioned
* Workspace invitation
* Task status changed

Features:

* Notification center
* Read/unread tracking
* Real-time delivery

---

### Activity Logs

Complete audit trail of user actions.

Tracked events:

* Project creation
* Task updates
* Role changes
* File uploads
* User invitations

---

### File Attachments

Upload and manage project assets.

Supported file types:

* Images
* PDFs
* Documents

Powered by AWS S3.

---

### Dashboard & Analytics

Visual insights into team productivity.

Metrics include:

* Tasks completed
* Tasks created
* Completion rate
* Active projects
* Most active users
* Upcoming deadlines

Built with Recharts.

---

### Search & Filtering

Powerful search functionality using PostgreSQL full-text search.

Filter by:

* Assignee
* Priority
* Status
* Due date
* Project

---

### Real-Time Collaboration

Built using Socket.IO.

Supported events:

* task_created
* task_updated
* task_deleted
* comment_added
* notification_created
* user_online

Features:

* Live Kanban updates
* Instant notifications
* Presence indicators
* Collaborative workflows

---

## Tech Stack

### Frontend

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* Zustand
* TanStack Query
* React Hook Form
* Zod
* Socket.IO Client

### Backend

* Next.js Route Handlers
* PostgreSQL
* Prisma ORM
* Redis
* Socket.IO

### Infrastructure

* Docker
* GitHub Actions
* AWS S3
* Vercel
* Resend

---

## System Architecture

```text
┌─────────────┐
│   Next.js   │
│ Frontend UI │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ API Layer       │
│ Route Handlers  │
└──────┬──────────┘
       │
 ┌─────┴─────┐
 ▼           ▼
PostgreSQL   Redis
(Prisma)     Cache
               │
               ▼
          WebSockets

       ▼
      S3
(File Storage)
```

---

## Project Structure

```text
src
│
├── app
├── components
├── features
│   ├── auth
│   ├── projects
│   ├── tasks
│   └── notifications
│
├── hooks
├── lib
├── services
├── stores
├── types
├── prisma
└── tests
```

---

## Getting Started

### Prerequisites

* Node.js 20+
* PostgreSQL
* Redis
* Docker (optional)

### Clone Repository

```bash
git clone https://github.com/yourusername/projectflow.git

cd projectflow
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=
REDIS_URL=

JWT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=
AWS_REGION=

RESEND_API_KEY=

NEXT_PUBLIC_APP_URL=
```

### Run Database Migrations

```bash
npx prisma migrate dev
```

### Start Development Server

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:3000
```

---

## Testing

### Unit Tests

```bash
npm run test
```

Tools:

* Vitest
* Testing Library

Coverage includes:

* Components
* Hooks
* Utilities
* Validation logic

### End-to-End Tests

```bash
npm run test:e2e
```

Powered by Playwright.

Scenarios:

* Authentication flow
* Project creation
* Task management
* Kanban drag-and-drop
* Notifications

---

## CI/CD

GitHub Actions automatically performs:

1. Install dependencies
2. Lint code
3. Run tests
4. Build application
5. Deploy to production

Pipeline:

```yaml
lint
test
build
deploy
```

---

## Roadmap

### Phase 1

* Authentication
* Organizations
* Role-based access control
* Database setup

### Phase 2

* Projects
* Kanban board
* Task CRUD

### Phase 3

* Comments
* Notifications
* Activity logs

### Phase 4

* File uploads
* Dashboard analytics
* Search & filtering

### Phase 5

* WebSockets
* Presence indicators
* Optimistic updates

### Phase 6

* Testing
* Docker
* CI/CD
* Production deployment

---

## Learning Outcomes

This project demonstrates experience with:

* Full-stack application architecture
* Multi-tenant SaaS design
* Authentication and authorization
* PostgreSQL database modeling
* Prisma ORM
* Real-time systems with WebSockets
* Redis caching
* API design
* Cloud storage integration
* Testing strategies
* CI/CD pipelines
* Docker containerization
* Production deployment

---

## Future Enhancements

* Sprint planning
* Gantt charts
* Time tracking
* Team chat
* AI-powered task suggestions
* Mobile application
* Advanced reporting
* Public API
* Webhooks
* Enterprise SSO

---

## License

This project is unlicensed.

---

## Author
Awa Jethro

---

## Purpose
Built to showcase modern full-stack engineering practices using the Next.js ecosystem and cloud-native tooling.
