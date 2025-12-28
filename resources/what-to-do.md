# Prisma Blog Application 📘

A secure, role-based blogging platform built using **Prisma ORM** and **PostgreSQL**, supporting modern authentication, content creation, and admin moderation.

---

## 📌 Introduction

### Purpose

The Prisma Blog Application is designed to provide a modern blogging platform with secure authentication, role-based access control, and admin moderation. Prisma ORM is used to ensure clean database relations and scalability.

### Scope

The system allows users to:

* Register and log in using **Email/Password** or **Google OAuth**
* Create, update, and delete their own blog posts
* Comment on blog posts

Admins can:

* Manage all blog posts
* Approve or reject user comments

---

## 👥 User Roles & Permissions

| Role    | Description        | Permissions                               |
| ------- | ------------------ | ----------------------------------------- |
| Visitor | Not logged in      | View published posts                      |
| User    | Registered user    | Create/manage own posts, comment          |
| Admin   | Platform moderator | Manage all posts, approve/reject comments |

---

## ⚙️ Functional Requirements

### 🔐 Authentication & Authorization

#### FR-1: User Registration

* Users can register using **email and password**
* Email must be **unique**
* Passwords must be **securely hashed**

#### FR-2: User Login

* Login methods:

  * Email & Password
  * Google OAuth
* If a Google-authenticated user does not exist, the system will **automatically create an account**

#### FR-3: Role-Based Access Control

* Authorization enforced at **API level**
* Users can access **only their own resources**
* Admins can access **all resources**

---

### 👤 User Management

#### FR-4: User Profile

Each user profile must include:

* Name
* Email
* Role (User / Admin)

---

### 📝 Blog Post Management

#### FR-5: Create Post

* Only authenticated users can create posts
* Required fields:

  * Title
  * Content

#### FR-6: Update Post

* Users can update **only their own posts**
* Admins can update **any post**

#### FR-7: Delete Post

* Users can delete **their own posts**
* Admins can delete **any post**

#### FR-8: View Posts

* All users can view published posts
* Post metadata must be visible:

  * Author
  * Date

---

### 💬 Comment Management

#### FR-9: Create Comment

* Authenticated users can comment on published posts
* New comments are created with status **APPROVED**

#### FR-10: Comment Moderation

* Admins can:

  * Approve comments
  * Reject comments

#### FR-11: Comment Visibility

* Only **approved comments** are publicly visible

---

## 🚀 Non-Functional Requirements

### 🔒 Security

* Secure authentication mechanisms
* Prevent unauthorized API access

### ⚡ Performance

* APIs must respond within acceptable time limits
* Pagination implemented for blog posts

### 📈 Scalability

* Database schema supports future growth
* Clean Prisma relations and proper indexing

### 🧹 Maintainability

* Modular project structure
* Clear separation of concerns
* Prisma migrations for schema changes

---

## 🗄️ Database Requirements

### ORM

* **Prisma ORM** is mandatory

### Database

* **PostgreSQL** (Relational Database)

---

## 🛠️ Tech Stack (Suggested)

* Backend: Node.js / Express / Next.js
* ORM: Prisma
* Database: PostgreSQL
* Authentication: JWT + Google OAuth
* API Security: Role-Based Authorization

---

## 📄 License

This project is intended for educational and development purposes.

---

