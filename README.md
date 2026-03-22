# 🛡️ Police Online Citizen Portal

A modern, secure, and centralized portal developed for the **State Police Department** to streamline citizen services and enhance public safety through digital innovation.

![Project Preview](https://images.unsplash.com/photo-1593115057322-e94b77572f20?auto=format&fit=crop&q=80&w=1200)

## ✨ Key Features

*   **Centralized Search:** Quickly find any police service (FIR, Missing Persons, CSR) from the global search bar.
*   **Secure Reporting:** File online complaints with incident details, dates, and locations.
*   **Missing Persons Directory:** A real-time database with photographic uploads and tracking IDs.
*   **Vehicle & Document Enquiry:** Integrated tools to check stolen vehicle status or report lost documents.
*   **Dynamic UI:** A state-of-the-art, glassmorphic dark-theme interface built for speed and accessibility.
*   **Persistent Data:** Fully integrated with **MySQL** for robust, long-term data storage.

## 🛠️ Tech Stack

### Frontend
- **React 19** (Vite)
- **React Router 7** (SPA Architecture)
- **Lucide Icons** (Premium SVG Icons)
- **Glassmorphic CSS** (Vanilla CSS)

### Backend
- **Node.js & Express**
- **MySQL2** (Persistent Database)
- **JSON Web Tokens (JWT)** (Secure Session Management)
- **Multer** (High-Resolution Image Uploads)
- **Bcrypt.js** (Industrial-Grade Password Hashing)

## 🚀 Getting Started

### 1. Database Setup
1.  Ensure **MySQL** is running on your system.
2.  Login: `mysql -u root -p`
3.  Create the database: `CREATE DATABASE fd_police_db;`

### 2. Environment Configuration
Create a `.env` file in the `backend/` folder with the following:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=fd_police_db
JWT_SECRET=your_secure_secret_key
PORT=5000
```

### 3. Installation
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### 4. Launching the App
For development:
```bash
# Run both frontend and backend
npm run dev:all
```

For production:
```bash
# Build the frontend
npm run build

# Start the unified server
node backend/server.js
```

## 🛡️ Security Best Practices
- Implemented **JWT Authentication** for sensitive routes.
- **Bcrypt** hashing used for citizen passwords.
- **Multipart/form-data** validation for secure image uploads.
- **SQL Sanitization** to prevent injection attacks.

---
© 2026 State Police Department | Built for a Safer Tomorrow.
