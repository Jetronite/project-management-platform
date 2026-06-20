# ProjectFlow System Architecture

## Overview

ProjectFlow is a multi-tenant SaaS project management platform designed around organizations, projects, tasks, collaboration, and real-time communication.

The system follows a modular architecture that separates concerns across:

* Presentation Layer
* Application Layer
* Domain Layer
* Infrastructure Layer

The architecture prioritizes:

* Scalability
* Security
* Maintainability
* Developer Experience
* Real-Time Collaboration

---

# High-Level Architecture

```text
                    ┌────────────────────┐
                    │      Browser       │
                    │  Next.js Client    │
                    └─────────┬──────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │      Next.js App        │
                 │  Server Components      │
                 │  Client Components      │
                 └─────────┬───────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼

 ┌─────────────┐  ┌────────────────┐  ┌─────────────┐
 │ Route       │  │ WebSocket      │  │ Middleware  │
 │ Handlers    │  │ Gateway        │  │ Layer       │
 └──────┬──────┘  └───────┬────────┘  └──────┬──────┘
        │                 │                  │
        ▼                 ▼                  ▼

 ┌─────────────────────────────────────────────┐
 │             Application Layer               │
 │                                             │
 │ Auth Service                                │
 │ Organization Service                        │
 │ Project Service                             │
 │ Task Service                                │
 │ Comment Service                             │
 │ Notification Service                        │
 │ Analytics Service                           │
 └──────────────────┬──────────────────────────┘
                    │
                    ▼

         ┌───────────────────────────┐
         │        Prisma ORM         │
         └─────────────┬─────────────┘
                       │

        ┌──────────────┼──────────────┐
        ▼              ▼              ▼

 ┌───────────┐  ┌───────────┐  ┌───────────┐
 │PostgreSQL │  │   Redis   │  │ AWS S3    │
 │ Primary DB│  │ Cache     │  │ Storage   │
 └───────────┘  └───────────┘  └───────────┘
```

---

# Architectural Principles

## 1. Multi-Tenant First

All business entities belong to an Organization.

```text
Organization
    ├── Members
    ├── Projects
    ├── Tasks
    ├── Files
    └── Activity Logs
```

Tenant isolation is enforced at:

* API Layer
* Database Queries
* Authorization Layer

Every query must include organization scope.

Example:

```ts
where: {
  organizationId,
}
```

---

## 2. Service-Oriented Feature Structure

Features are organized by business domain.

```text
src/features

├── auth
├── organizations
├── projects
├── tasks
├── comments
├── notifications
├── analytics
└── files
```

Each feature owns:

```text
feature
├── api
├── services
├── validations
├── hooks
├── components
└── types
```

Benefits:

* High cohesion
* Low coupling
* Easier scaling

---

# Request Lifecycle

Example:

Create Task

```text
Client
   │
   ▼
API Request
   │
   ▼
Middleware
(Auth + Tenant Validation)
   │
   ▼
Route Handler
   │
   ▼
Task Service
   │
   ▼
Prisma Repository
   │
   ▼
PostgreSQL
   │
   ▼
Response
   │
   ▼
Socket Event
   │
   ▼
Connected Clients
```

---

# Frontend Architecture

## Responsibilities

Frontend handles:

* User interactions
* State management
* Forms
* Data fetching
* Real-time updates

---

## UI Layer

```text
app/
components/
features/
```

Component hierarchy:

```text
Page

 ├── Layout
 │
 ├── Feature Components
 │
 └── Shared Components
```

Examples:

```text
Button
Modal
Dropdown
Avatar
Table
```

Reusable UI components live inside:

```text
src/components
```

---

## State Management

### Server State

Managed by:

TanStack Query

Responsibilities:

* Fetching
* Caching
* Background revalidation
* Optimistic updates

---

### Client State

Managed by:

Zustand

Stores:

```text
authStore
uiStore
notificationStore
socketStore
```

---

# Backend Architecture

## Route Handlers

Next.js Route Handlers act as controllers.

Responsibilities:

* Parse requests
* Validate input
* Invoke services
* Return responses

Example:

```text
POST /api/tasks
```

Should not contain:

* Business logic
* Database logic

---

## Services Layer

Services contain business rules.

Example:

```text
TaskService
```

Responsibilities:

* Validate permissions
* Create task
* Generate activity log
* Send notifications
* Broadcast socket event

---

## Validation Layer

Validation is performed using:

* Zod

Example:

```ts
CreateTaskSchema
UpdateTaskSchema
InviteUserSchema
```

Validation occurs before business logic executes.

---

# Database Architecture

Database Engine:

PostgreSQL

ORM:

Prisma

---

## Core Entities

```text
User
Organization
Membership
Project
Task
Comment
Notification
ActivityLog
Attachment
```

---

# Entity Relationships

```text
User
 │
 ├── Membership
 │       │
 │       ▼
 │  Organization
 │
 ▼
Task Assignment


Organization
 │
 ├── Projects
 │
 ├── Members
 │
 ├── Notifications
 │
 └── Activity Logs


Project
 │
 ├── Tasks
 │
 └── Attachments


Task
 │
 ├── Comments
 │
 ├── Assignee
 │
 └── Activity Records
```

---

# Role-Based Access Control

Roles:

```text
OWNER
ADMIN
MEMBER
VIEWER
```

Authorization Flow:

```text
Request
    │
    ▼
Authentication
    │
    ▼
Membership Lookup
    │
    ▼
Permission Check
    │
    ▼
Allowed / Denied
```

Example Policy:

```text
OWNER  -> all permissions

ADMIN  -> manage projects/users

MEMBER -> manage tasks

VIEWER -> read only
```

---

# Authentication Architecture

Authentication Method:

JWT

Workflow:

```text
Login
  │
  ▼
Credentials Validation
  │
  ▼
Password Verification
  │
  ▼
JWT Creation
  │
  ▼
HTTP Cookie
```

Security:

* bcrypt hashing
* httpOnly cookies
* secure cookies
* CSRF protection
* rate limiting

---

# Real-Time Architecture

Technology:

Socket.IO

Purpose:

Synchronize workspace activity.

---

## Connection Flow

```text
User Login
    │
    ▼
Socket Connection
    │
    ▼
Authenticate Socket
    │
    ▼
Join Organization Room
```

Example:

```text
org:123
project:456
```

---

## Events

Client → Server

```text
task:create
task:update
comment:create
presence:update
```

Server → Client

```text
task_created
task_updated
comment_added
notification_created
user_online
```

---

# Redis Architecture

Redis responsibilities:

## Cache

```text
Project Lists
Analytics Data
User Permissions
```

## Session Data

```text
Socket Connections
Presence Tracking
```

## Rate Limiting

```text
Login Attempts
Password Reset Requests
API Limits
```

---

# File Storage Architecture

Storage Provider:

AWS S3

Upload Flow:

```text
Client
   │
   ▼
Generate Signed URL
   │
   ▼
Upload Directly To S3
   │
   ▼
Save Metadata In DB
```

Benefits:

* Reduced server load
* Faster uploads
* Better scalability

---

# Notification Architecture

Notification Sources:

```text
Task Assigned
Task Updated
Mention Created
Workspace Invitation
```

Workflow:

```text
Action
   │
   ▼
Notification Service
   │
   ▼
Database
   │
   ▼
WebSocket Event
   │
   ▼
User Notification Center
```

---

# Activity Logging

Purpose:

Auditability and analytics.

Tracked Actions:

```text
TASK_CREATED
TASK_UPDATED
TASK_DELETED

PROJECT_CREATED

USER_INVITED

ROLE_CHANGED
```

Workflow:

```text
Business Action
       │
       ▼
Activity Service
       │
       ▼
Activity Log Table
```

---

# Search Architecture

Search Engine:

PostgreSQL Full-Text Search

Indexed Fields:

```text
Task Title
Task Description
Project Name
Comments
```

Query Flow:

```text
Search Input
     │
     ▼
tsvector Index
     │
     ▼
Ranked Results
```

---

# Analytics Architecture

Metrics Generated:

```text
Tasks Created
Tasks Completed
Completion Rate
Active Users
Project Velocity
```

Data Sources:

```text
Tasks
Projects
Activity Logs
```

Heavy queries are cached using Redis.

---

# Security Architecture

Security Controls:

## Authentication

* JWT
* Cookie-based sessions

## Authorization

* RBAC
* Tenant isolation

## Infrastructure

* HTTPS
* Secure cookies
* Environment secrets

## Application

* Input validation
* Rate limiting
* SQL injection protection
* XSS protection

---

# Deployment Architecture

Frontend:

Vercel

Backend:

Next.js Server

Database:

PostgreSQL

Cache:

Redis

Storage:

AWS S3

Email:

Resend

---

## Production Infrastructure

```text
                     Internet
                         │
                         ▼

                 ┌───────────────┐
                 │    Vercel     │
                 └───────┬───────┘
                         │
      ┌──────────────────┼─────────────────┐
      ▼                  ▼                 ▼

 PostgreSQL          Redis             AWS S3
     │                 │                 │
     └─────────┬───────┴─────────────────┘
               │
               ▼

          Socket.IO
```

---

# Monitoring & Observability

Logging:

```text
Pino
```

Metrics:

```text
Response Time
Error Rate
Database Queries
Socket Connections
```

Future:

```text
OpenTelemetry
Grafana
Prometheus
Sentry
```

---

# Scalability Strategy

Horizontal Scaling Targets:

1. Stateless API servers
2. Redis-backed socket adapter
3. PostgreSQL read replicas
4. CDN asset delivery
5. Background job workers

Future Architecture:

```text
API Cluster
     │
     ▼
Redis Adapter
     │
     ▼
Multiple Socket Nodes
```

This allows ProjectFlow to scale from a portfolio application into a production-grade SaaS platform capable of supporting thousands of organizations and concurrent users.
