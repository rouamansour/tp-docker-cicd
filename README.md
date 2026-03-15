# tp-docker-cicd

A full-stack practice project demonstrating **Docker containerization** and **CI/CD automation** with GitHub Actions — featuring a frontend, backend, and database, all orchestrated with Docker Compose and deployed to Vercel.

🔗 **Live demo** → [tp-docker-cicd-sigma.vercel.app](https://tp-docker-cicd-sigma.vercel.app)

---

## 🗂️ Project Structure

```
tp-docker-cicd/
├── .github/
│   └── workflows/        → GitHub Actions CI/CD pipelines
├── backend/              → REST API server
├── frontend/             → Web application
├── database/             → DB init scripts / migrations
├── docker-compose.yml    → Multi-container orchestration
└── package-lock.json
```

---

## 🛠️ Tech Stack

| Layer      | Technology              | Role                                   |
|------------|-------------------------|----------------------------------------|
| Frontend   | HTML / CSS / JavaScript | UI served as static files              |
| Backend    | Node.js / Express.js    | REST API & business logic              |
| Database   | (see /database folder)  | Data persistence                       |
| Container  | Docker + Docker Compose | Multi-service orchestration            |
| CI/CD      | GitHub Actions          | Automated build, test & deploy         |
| Hosting    | Vercel                  | Frontend deployment                    |

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose installed
- Node.js >= 18 (for local development without Docker)

### Run with Docker Compose

```bash
# Clone the repo
git clone https://github.com/rouamansour/tp-docker-cicd.git
cd tp-docker-cicd

# Start all services (frontend + backend + database)
docker-compose up --build
```

| Service    | URL                      |
|------------|--------------------------|
| Frontend   | http://localhost:3000    |
| Backend    | http://localhost:5000    |
| Database   | http://localhost:27017   |

### Stop all services

```bash
docker-compose down
```

---

## ⚙️ CI/CD Pipeline

The `.github/workflows/` directory contains the GitHub Actions pipeline that runs automatically on every push to `main`:

```
Push to main
     ↓
Checkout code
     ↓
Build Docker images
     ↓
Run tests
     ↓
Deploy to Vercel ✅
```

---

## 🐳 Docker Overview

Each service has its own `Dockerfile`:

```bash
# Build manually (if needed)
docker build -t tp-backend  ./backend
docker build -t tp-frontend ./frontend
```

`docker-compose.yml` wires all services together with shared networking and environment variables.

---

## 📁 Environment Variables

Create a `.env` file at the root if needed:

```env
# Backend
PORT=5000
DB_URI=mongodb://database:27017/tp-docker

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> ⚠️ Never commit `.env` to version control.

---

## 📚 Resources

- [Docker Docs](https://docs.docker.com/)
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Vercel Docs](https://vercel.com/docs)

---

## 👩‍💻 Author

**Roua Mansour** — [@rouamansour](https://github.com/rouamansour)
