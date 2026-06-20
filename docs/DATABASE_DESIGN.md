# Database Design

## Overview

ProjectFlow uses PostgreSQL as its primary database.

The schema is designed around a multi-tenant SaaS architecture where all business data belongs to an Organization.

Goals:

* Strong data integrity
* Tenant isolation
* Efficient querying
* Scalable relationships
* Auditability

---

# Database Principles

## 1. Multi-Tenant First

Every business resource belongs to an Organization.

```text
Organization
 ├── Projects
 ├── Members
 ├── Tasks
 ├── Notifications
 ├── Activity Logs
 └── Attachments
```

Every query must be scoped by:

```sql
organization_id
```

This prevents cross-tenant data leakage.

---

## 2. Referential Integrity

Relationships are enforced using foreign keys.

Example:

```text
Task
 └── Project
      └── Organization
```

Deleting a parent record follows explicit cascade rules.

---

## 3. Auditability

Critical actions are recorded.

Examples:

* Task created
* Task updated
* Project archived
* User invited
* Role changed

Activity logs provide traceability.

---

# Entity Relationship Diagram

```text
User
 │
 ├───────────────┐
 │               │
 ▼               ▼

Membership     Task
     │         Assignee
     │
     ▼

Organization
     │
     ├─────────────┐
     │             │
     ▼             ▼

 Project      Notification
     │
     ▼

 Task
     │
 ┌───┼───────────┐
 ▼   ▼           ▼

Comment Attachment ActivityLog
```

---

# Tables

---

# Users

Represents authenticated platform users.

```sql
users
```

| Column         | Type      |
| -------------- | --------- |
| id             | UUID      |
| email          | VARCHAR   |
| password_hash  | TEXT      |
| name           | VARCHAR   |
| avatar_url     | TEXT      |
| email_verified | BOOLEAN   |
| created_at     | TIMESTAMP |
| updated_at     | TIMESTAMP |

---

## Constraints

```sql
UNIQUE(email)
```

---

## Indexes

```sql
INDEX(email)
```

Used for login lookups.

---

# Organizations

Represents tenant workspaces.

Examples:

* Acme Inc
* Marketing Team
* Engineering Team

```sql
organizations
```

| Column     | Type      |
| ---------- | --------- |
| id         | UUID      |
| name       | VARCHAR   |
| slug       | VARCHAR   |
| created_by | UUID      |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

## Constraints

```sql
UNIQUE(slug)
```

---

## Indexes

```sql
INDEX(slug)
```

Used for workspace routing.

---

# Memberships

Many-to-many relationship between users and organizations.

```sql
memberships
```

| Column          | Type      |
| --------------- | --------- |
| id              | UUID      |
| user_id         | UUID      |
| organization_id | UUID      |
| role            | ENUM      |
| joined_at       | TIMESTAMP |

---

## Role Enum

```text
OWNER
ADMIN
MEMBER
VIEWER
```

---

## Cardinality

```text
User
  ↔
Membership
  ↔
Organization
```

Many users can belong to many organizations.

---

## Constraints

```sql
UNIQUE(user_id, organization_id)
```

Prevents duplicate memberships.

---

## Indexes

```sql
INDEX(user_id)
INDEX(organization_id)
```

---

# Projects

Projects belong to organizations.

```sql
projects
```

| Column          | Type      |
| --------------- | --------- |
| id              | UUID      |
| organization_id | UUID      |
| name            | VARCHAR   |
| description     | TEXT      |
| archived        | BOOLEAN   |
| created_by      | UUID      |
| created_at      | TIMESTAMP |
| updated_at      | TIMESTAMP |

---

## Relationships

```text
Organization
    └── Projects
```

One organization can have many projects.

---

## Indexes

```sql
INDEX(organization_id)
INDEX(created_at)
```

---

# Tasks

Core work-tracking entity.

```sql
tasks
```

| Column          | Type      |
| --------------- | --------- |
| id              | UUID      |
| project_id      | UUID      |
| organization_id | UUID      |
| assignee_id     | UUID      |
| title           | VARCHAR   |
| description     | TEXT      |
| status          | ENUM      |
| priority        | ENUM      |
| due_date        | TIMESTAMP |
| position        | INTEGER   |
| created_by      | UUID      |
| created_at      | TIMESTAMP |
| updated_at      | TIMESTAMP |

---

# Status Enum

```text
BACKLOG
TODO
IN_PROGRESS
REVIEW
DONE
```

---

# Priority Enum

```text
LOW
MEDIUM
HIGH
CRITICAL
```

---

## Why Position Exists

Supports Kanban ordering.

Example:

```text
TODO

Task A → position 1
Task B → position 2
Task C → position 3
```

---

## Relationships

```text
Project
 └── Tasks

User
 └── Assignee
```

---

## Indexes

```sql
INDEX(project_id)

INDEX(organization_id)

INDEX(assignee_id)

INDEX(status)

INDEX(priority)

INDEX(due_date)
```

---

# Comments

Task discussions.

```sql
comments
```

| Column     | Type      |
| ---------- | --------- |
| id         | UUID      |
| task_id    | UUID      |
| user_id    | UUID      |
| content    | TEXT      |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

## Relationships

```text
Task
 └── Comments

User
 └── Author
```

---

## Indexes

```sql
INDEX(task_id)
INDEX(user_id)
```

---

# Attachments

Stores file metadata.

Actual files reside in S3.

```sql
attachments
```

| Column          | Type      |
| --------------- | --------- |
| id              | UUID      |
| task_id         | UUID      |
| organization_id | UUID      |
| uploaded_by     | UUID      |
| file_name       | VARCHAR   |
| file_size       | BIGINT    |
| mime_type       | VARCHAR   |
| s3_key          | TEXT      |
| created_at      | TIMESTAMP |

---

## Why Store Metadata?

Database queries remain fast.

Large files stay outside PostgreSQL.

---

## Indexes

```sql
INDEX(task_id)
INDEX(organization_id)
```

---

# Notifications

User-specific notifications.

```sql
notifications
```

| Column          | Type      |
| --------------- | --------- |
| id              | UUID      |
| user_id         | UUID      |
| organization_id | UUID      |
| type            | VARCHAR   |
| title           | VARCHAR   |
| message         | TEXT      |
| read            | BOOLEAN   |
| created_at      | TIMESTAMP |

---

## Examples

```text
TASK_ASSIGNED

MENTION_CREATED

PROJECT_INVITATION
```

---

## Indexes

```sql
INDEX(user_id)

INDEX(read)

INDEX(created_at)
```

---

# Activity Logs

Immutable audit trail.

```sql
activity_logs
```

| Column          | Type      |
| --------------- | --------- |
| id              | UUID      |
| organization_id | UUID      |
| user_id         | UUID      |
| entity_type     | VARCHAR   |
| entity_id       | UUID      |
| action          | VARCHAR   |
| metadata        | JSONB     |
| created_at      | TIMESTAMP |

---

## Example Record

```json
{
  "entityType": "TASK",
  "entityId": "123",
  "action": "TASK_UPDATED"
}
```

---

## Why JSONB?

Allows flexible event metadata.

Example:

```json
{
  "oldStatus": "TODO",
  "newStatus": "DONE"
}
```

---

## Indexes

```sql
INDEX(organization_id)

INDEX(entity_id)

INDEX(action)

INDEX(created_at)
```

---

# Sessions

Optional refresh token storage.

```sql
sessions
```

| Column        | Type      |
| ------------- | --------- |
| id            | UUID      |
| user_id       | UUID      |
| refresh_token | TEXT      |
| expires_at    | TIMESTAMP |
| created_at    | TIMESTAMP |

---

## Purpose

Supports:

* Session revocation
* Multi-device login
* Refresh token rotation

---

# Full-Text Search

ProjectFlow uses PostgreSQL Full-Text Search.

---

## Searchable Fields

Tasks:

```text
title
description
```

Projects:

```text
name
description
```

Comments:

```text
content
```

---

## Search Vector

```sql
tsvector
```

Generated column:

```sql
search_vector
```

---

## Index

```sql
GIN(search_vector)
```

Provides extremely fast searches.

---

# Cascading Rules

## Organization Deleted

```text
Organization
 ├── Memberships
 ├── Projects
 ├── Tasks
 ├── Notifications
 ├── Activity Logs
 └── Attachments
```

All tenant data removed.

```sql
ON DELETE CASCADE
```

---

## User Deleted

Tasks should remain.

Therefore:

```sql
assignee_id -> SET NULL
```

Preserves history.

---

## Project Deleted

```sql
Project
 └── Tasks
```

Tasks deleted.

```sql
CASCADE
```

---

## Task Deleted

```sql
Comments
Attachments
```

Deleted automatically.

---

# Query Optimization

Most common queries:

---

## Fetch Organization Projects

```sql
WHERE organization_id = ?
```

Index:

```sql
INDEX(organization_id)
```

---

## Fetch Kanban Board

```sql
WHERE project_id = ?
```

Index:

```sql
INDEX(project_id)
```

---

## Fetch User Tasks

```sql
WHERE assignee_id = ?
```

Index:

```sql
INDEX(assignee_id)
```

---

## Fetch Notifications

```sql
WHERE user_id = ?
```

Index:

```sql
INDEX(user_id)
```

---

# Composite Indexes

Critical for production performance.

---

## Tasks

```sql
(project_id, status)
```

Supports Kanban board rendering.

---

## Memberships

```sql
(user_id, organization_id)
```

Supports permission checks.

---

## Notifications

```sql
(user_id, read)
```

Supports notification center.

---

# Future Database Evolution

Potential future tables:

```text
sprints
sprint_tasks

time_entries

team_chats

webhooks

api_keys

automation_rules
```

---

# Database Assessment

The schema is designed to support:

* Multi-tenant SaaS architecture
* Real-time collaboration
* Kanban workflows
* Audit logging
* Analytics
* File storage
* Search

while remaining simple enough to evolve into a large-scale production system without requiring major redesigns.
