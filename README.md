# Anurag Singh | Software Developer Portfolio

![React](https://img.shields.io/badge/Frontend-React_Cyberpunk-cyan?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI_Async-green?style=for-the-badge&logo=fastapi)
![Tailwind](https://img.shields.io/badge/Style-Tailwind_CSS-blue?style=for-the-badge&logo=tailwindcss)
![Python](https://img.shields.io/badge/Core-Python_3.10+-yellow?style=for-the-badge&logo=python)

A next-generation personal portfolio website engineered with a **Cyberpunk Glassmorphism** aesthetic. Built to demonstrate proficiency in Full Stack development, System Design, and Modern UI/UX principles.

## 🚀 Features

*   **Immersive U/I:** Deep Space theme with dynamic particles, floating animations, and glassmorphism cards.
*   **High Performance:** Optimized React frontend with Framer Motion for 60fps animations.
*   **Scalable Backend:** Modular **FastAPI** architecture with Dependency Injection, Pydantic validation, and Middleware logging.
*   **Observability:** Comprehensive request/response logging and error tracking.
*   **Email System:** Integrated SMTP service with graceful fallbacks (Real/Mock modes).

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React.js (Vite), Tailwind CSS, Framer Motion, Lucide Icons |
| **Backend** | Python, FastAPI, Uvicorn, Pydantic |
| **Services** | SMTP (Email), Logging Middleware |
| **Tools** | Git, Postman, VS Code |

## ⚡ Quick Start

### 1. Backend Setup
The backend powers the dynamic content and email services.

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# (Optional) Setup Real Email
# Create a .env file and add your SMTP credentials (see .env.example)

# Run Server
python -m uvicorn app.main:app --reload
```
*API docs available at: `http://localhost:8000/docs`*

### 2. Frontend Setup
The client-side application.

```bash
cd frontend

# Install dependencies
npm install

# Start Development Server
npm run dev
```
*Live App: `http://localhost:5173`*

## 📂 Project Structure

```bash
portfolio/
├── backend/
│   ├── app/
│   │   ├── api/          # Route handlers
│   │   ├── core/         # Config & Middleware
│   │   ├── models/       # Pydantic Schemas
│   │   └── services/     # Business Logic (Email)
│   └── logs/             # Application Logs
└── frontend/
    ├── src/
    │   ├── components/   # React Components
    │   └── hooks/        # Custom Hooks
    └── public/           # Static Assets
```

## 📬 Contact
Designed and Engineered by **Anurag Singh**.
