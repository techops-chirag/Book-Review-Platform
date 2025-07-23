# 📚 Book Review Platform

A full-stack web application built in 48 hours that allows users to browse, add, and review books. Developed using **React**, **Node.js/Express**, and **SQLite**.

## 🔍 Features

- ✅ **User Authentication** using JSON Web Tokens (JWT)
- 📚 **Browse Books** with author and genre filters
- ➕ **Add Books** (authenticated users only)
- ⭐ **Write and View Reviews** with 1–5 star ratings
- 📊 **Average Ratings** displayed per book
- 🌟 **Visual Star Ratings** for enhanced UX
- 🧾 **Form Validations** on both frontend and backend

## 🏗️ Tech Stack

| Layer       | Technology        |
|-------------|-------------------|
| Frontend    | React with Hooks (`create-react-app`) |
| Backend     | Node.js, Express  |
| Database    | SQLite            |
| Auth        | JWT               |
| HTTP Client | Axios             |

## 🧠 Architecture Decisions

### 1. Backend: Node.js & Express
Chosen for rapid API development with flexibility and minimal setup.

### 2. Database: SQLite
File-based, no setup required, ideal for quick projects and easy local use.

### 3. Frontend: React with Hooks
All components use functional patterns with `useState`, `useEffect`, etc.

### 4. Authentication: JWT
Stateless and secure, JWT tokens are stored on the client and attached to requests.

### 5. API Communication: Axios
Used for clean, promise-based HTTP calls and interceptors to attach tokens.

## 🚀 Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) and npm installed

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the server
node server.js
