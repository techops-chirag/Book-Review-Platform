# 📚 Book Review Platform

A full-stack web application built in 48 hours that allows users to browse, add, and review books. Developed using React, Node.js/Express, and SQLite.

---

## 🔍 Features

- ✅ User Authentication using JSON Web Tokens (JWT)
- 📚 Browse Books with author and genre filters
- ➕ Add Books (authenticated users only)
- ⭐ Write and View Reviews with 1–5 star ratings
- 📊 Average Ratings displayed per book
- 🌟 Visual Star Ratings for enhanced UX
- 🧾 Form Validations on both frontend and backend

---

## 🏗️ Tech Stack

| Layer       | Technology                  |
|-------------|------------------------------|
| Frontend    | Next.js, React.js       |
| Backend     | Node.js, Express             |
| Database    | SQLite                       |
| Auth        | JWT                          |
| HTTP Client | Axios                        |

---

## 🧠 Architecture Decisions

1. **Backend: Node.js & Express**  
   Chosen for rapid API development with flexibility and minimal setup.

2. **Database: SQLite**  
   File-based, no setup required, ideal for quick projects and easy local use.

3. **Frontend: React with Hooks**  
   All components use functional patterns with `useState`, `useEffect`, etc.

4. **Authentication: JWT**  
   Stateless and secure, JWT tokens are stored on the client and attached to requests.

5. **API Communication: Axios**  
   Used for clean, promise-based HTTP calls and interceptors to attach tokens.

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js and npm installed

---

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install backend dependencies
npm install

# Start the backend server
npm start
```

---

### 2. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install frontend dependencies
npm install

# Start the React app
npm start
```

> The frontend will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🚧 Known Limitations

- 🔒 **No Role-based Access Control (RBAC):** All authenticated users have the same privileges.
- 💾 **No Persistent Storage:** SQLite is file-based and may not scale for production.
- 🔄 **No Pagination:** All books and reviews are loaded at once.
- ❌ **No Image/File Upload Support:** Book covers are not handled currently.
- 🌐 **No Deployment Scripts:** The project is local-only for now.

---

## 📬 Feedback & Contributions

Feel free to fork, open issues, or submit pull requests. Contributions are welcome!

---
