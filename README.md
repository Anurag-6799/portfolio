# SDE-2 Blueprint Portfolio

![System](https://img.shields.io/badge/Architecture-SDE--2-purple)
![React](https://img.shields.io/badge/Frontend-Cyberpunk-cyan)
![FastAPI](https://img.shields.io/badge/Backend-Async-green)

A high-performance personal portfolio built as a reference architecture for scalable systems.

## Key Features
- **Design:** Deep Space Cyberpunk theme with Glassmorphism.
- **Architecture:** Modular FastAPI backend with Service Layer and Dependency Injection.
- **Tech Stack:** React (Vite), Tailwind CSS, Framer Motion, Python (FastAPI), Pydantic.

## Quick Start

### 1. Backend
Must run in a virtual environment to avoid conflicts.
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```
*Server: http://localhost:8000*

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
*App: http://localhost:5173*

## Documentation
See **[LEARNING_JOURNEY.md](LEARNING_JOURNEY.md)** for the architectural deep dive.
