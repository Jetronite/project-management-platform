# API Specification

## Overview

Base URL:

```text
/api
```

Authentication:

```text
JWT Cookie Authentication
```

Content Type:

```text
application/json
```

Standard Response Format:

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Error message"
}
```

---

# Authentication

---

## Register

```http
POST /api/auth/register
```

Creates a new user account.

### Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "user": {}
  }
}
```

---

## Login

```http
POST /api/auth/login
```

### Request

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "user": {},
    "token": "jwt"
  }
}
```

---

## Logout

```http
POST /api/auth/logout
```

### Auth

Required

### Response

```json
{
  "success": true
}
```

---

## Current User

```http
GET /api/auth/me
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "",
    "name": "",
    "email": ""
  }
}
```

---

## Forgot Password

```http
POST /api/auth/forgot-password
```

### Request

```json
{
  "email": "john@example.com"
}
```

---

## Reset Password

```http
POST /api/auth/reset-password
```

### Request

```json
{
  "token": "",
  "password": ""
}
```

---

# Organizations

---

## Create Organization

```http
POST /api/organizations
```

### Auth

Required

### Request

```json
{
  "name": "Acme Inc"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "organization": {}
  }
}
```

---

## List Organizations

```http
GET /api/organizations
```

Returns organizations the user belongs to.

---

## Get Organization

```http
GET /api/organizations/:organizationId
```

---

## Update Organization

```http
PATCH /api/organizations/:organizationId
```

### Roles

OWNER
ADMIN

---

## Delete Organization

```http
DELETE /api/organizations/:organizationId
```

### Roles

OWNER

---

# Memberships

---

## Invite User

```http
POST /api/organizations/:organizationId/invitations
```

### Request

```json
{
  "email": "user@example.com",
  "role": "MEMBER"
}
```

---

## Accept Invitation

```http
POST /api/invitations/:token/accept
```

---

## List Members

```http
GET /api/organizations/:organizationId/members
```

---

## Update Member Role

```http
PATCH /api/organizations/:organizationId/members/:memberId
```

### Request

```json
{
  "role": "ADMIN"
}
```

---

## Remove Member

```http
DELETE /api/organizations/:organizationId/members/:memberId
```

---

# Projects

---

## Create Project

```http
POST /api/organizations/:organizationId/projects
```

### Request

```json
{
  "name": "Website Redesign",
  "description": "Marketing website refresh"
}
```

---

## List Projects

```http
GET /api/organizations/:organizationId/projects
```

### Query Params

```text
?page=1
&limit=20
```

---

## Get Project

```http
GET /api/projects/:projectId
```

---

## Update Project

```http
PATCH /api/projects/:projectId
```

---

## Archive Project

```http
POST /api/projects/:projectId/archive
```

---

## Delete Project

```http
DELETE /api/projects/:projectId
```

---

# Tasks

---

## Create Task

```http
POST /api/projects/:projectId/tasks
```

### Request

```json
{
  "title": "Implement login",
  "description": "Create auth flow",
  "priority": "HIGH",
  "assigneeId": "",
  "dueDate": "2026-07-10"
}
```

---

## List Tasks

```http
GET /api/projects/:projectId/tasks
```

### Query Parameters

```text
status
priority
assigneeId
search
page
limit
```

Example:

```text
/api/projects/1/tasks?status=TODO
```

---

## Get Task

```http
GET /api/tasks/:taskId
```

---

## Update Task

```http
PATCH /api/tasks/:taskId
```

### Request

```json
{
  "title": "Updated title"
}
```

---

## Delete Task

```http
DELETE /api/tasks/:taskId
```

---

## Move Task

Kanban drag-and-drop.

```http
POST /api/tasks/:taskId/move
```

### Request

```json
{
  "status": "IN_PROGRESS",
  "position": 3
}
```

---

## Assign Task

```http
POST /api/tasks/:taskId/assign
```

### Request

```json
{
  "assigneeId": ""
}
```

---

# Comments

---

## Create Comment

```http
POST /api/tasks/:taskId/comments
```

### Request

```json
{
  "content": "Please review this implementation."
}
```

---

## List Comments

```http
GET /api/tasks/:taskId/comments
```

---

## Update Comment

```http
PATCH /api/comments/:commentId
```

---

## Delete Comment

```http
DELETE /api/comments/:commentId
```

---

# Attachments

---

## Generate Upload URL

```http
POST /api/attachments/upload-url
```

### Request

```json
{
  "fileName": "design.pdf",
  "contentType": "application/pdf"
}
```

### Response

```json
{
  "uploadUrl": "",
  "key": ""
}
```

---

## Create Attachment Record

```http
POST /api/tasks/:taskId/attachments
```

### Request

```json
{
  "key": "",
  "fileName": ""
}
```

---

## Delete Attachment

```http
DELETE /api/attachments/:attachmentId
```

---

# Notifications

---

## List Notifications

```http
GET /api/notifications
```

### Query

```text
?page
&limit
```

---

## Mark Notification Read

```http
PATCH /api/notifications/:notificationId/read
```

---

## Mark All Read

```http
POST /api/notifications/read-all
```

---

# Activity Logs

---

## Organization Activity Feed

```http
GET /api/organizations/:organizationId/activity
```

### Query

```text
page
limit
```

---

## Project Activity Feed

```http
GET /api/projects/:projectId/activity
```

---

# Search

---

## Global Search

```http
GET /api/search
```

### Query

```text
?q=login
```

### Response

```json
{
  "projects": [],
  "tasks": [],
  "comments": []
}
```

---

# Analytics

---

## Organization Dashboard

```http
GET /api/organizations/:organizationId/analytics
```

### Response

```json
{
  "tasksCreated": 120,
  "tasksCompleted": 80,
  "completionRate": 67,
  "activeProjects": 12
}
```

---

## Project Analytics

```http
GET /api/projects/:projectId/analytics
```

---

# User Profile

---

## Update Profile

```http
PATCH /api/users/me
```

### Request

```json
{
  "name": "John Doe",
  "avatarUrl": ""
}
```

---

## Change Password

```http
POST /api/users/me/change-password
```

### Request

```json
{
  "currentPassword": "",
  "newPassword": ""
}
```

---

# WebSocket Events

## Client → Server

```text
task:create
task:update
task:delete

comment:create

notification:read

presence:update
```

---

## Server → Client

```text
task_created
task_updated
task_deleted

comment_added

notification_created

user_online
user_offline
```

---

# Error Responses

## Unauthorized

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

Status:

```http
401
```

---

## Forbidden

```json
{
  "success": false,
  "message": "Forbidden"
}
```

Status:

```http
403
```

---

## Not Found

```json
{
  "success": false,
  "message": "Resource not found"
}
```

Status:

```http
404
```

---

## Validation Error

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {}
}
```

Status:

```http
422
```

---

## Server Error

```json
{
  "success": false,
  "message": "Internal server error"
}
```

Status:

```http
500
```

---

# API Versioning

Current Version:

```text
v1
```

Future:

```text
/api/v1/...
```

Versioning ensures backward compatibility as the platform evolves.

---

# API Coverage

This specification covers:

* Authentication
* Organizations
* Memberships
* Projects
* Tasks
* Comments
* Attachments
* Notifications
* Activity Logs
* Search
* Analytics
* User Management
* Real-Time Events

and provides complete CRUD coverage for all core ProjectFlow domains.
