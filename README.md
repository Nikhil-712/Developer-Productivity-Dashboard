# Developer Productivity Dashboard

A modern, feature-rich task management web application designed to help developers track their work, manage priorities, and visualize productivity—all in one place.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Testing](#testing)
- [Production Build](#production-build)
- [Docker](#docker)
- [Kubernetes](#kubernetes)
- [CI/CD](#cicd)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Task Management** – Create, edit, delete, and complete tasks with rich metadata (title, priority, category, due date, tags).
- **Quick Add** – Floating action button for rapid task creation without navigating away.
- **Filtering & Sorting** – Filter tasks by status (All / Completed / Pending) or category; sort by date, priority, or default order.
- **Search** – Live full-text search across task titles.
- **Collapsible Sections** – Group and collapse tasks to reduce visual noise.
- **View Modes** – Switch between a detailed list view and a compact card view.
- **Statistics Panel** – At-a-glance counts for total, completed, pending, and high-priority tasks.
- **Progress Bar** – Visual completion percentage of all tasks.
- **Completion History** – Timeline of the five most recently completed tasks.
- **Toast Notifications** – Non-intrusive feedback for every user action.
- **Time-based Greeting** – Dynamic "Good Morning / Afternoon / Evening" header.
- **Dark Theme** – Polished dark UI with gradient accents and smooth animations.
- **Local Storage Persistence** – Tasks survive page refreshes without a backend.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | [React](https://react.dev/) 18 |
| Build Tool | [Vite](https://vitejs.dev/) 5 + SWC |
| Testing | [Vitest](https://vitest.dev/) + Testing Library |
| Containerisation | Docker (Node 20 → Nginx 1.27, multi-stage) |
| Orchestration | Kubernetes |
| CI/CD | GitHub Actions |
| Language | JavaScript (JSX) |
| Styling | CSS3 with custom properties |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 20.x and **npm** ≥ 10.x
- **Docker** (optional – for container deployment)
- **kubectl** + a running cluster (optional – for Kubernetes deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/Nikhil-712/Developer-Productivity-Dashboard.git
cd Developer-Productivity-Dashboard

# Install frontend dependencies
cd frontend
npm install
```

### Running Locally

```bash
# Inside the frontend/ directory
npm run dev
```

The app will be available at **http://localhost:5173** with hot-module replacement enabled.

---

## Testing

```bash
# Inside the frontend/ directory

# Run the full test suite once
npm test

# Interactive watch mode
npm test -- --watch

# Open the Vitest browser UI
npm test -- --ui
```

All component tests live in `frontend/src/tests/` and use **Vitest** with **@testing-library/react** and **jsdom**.

---

## Production Build

```bash
# Inside the frontend/ directory
npm run build        # Outputs to frontend/dist/
npm run preview      # Serves the production build locally
```

---

## Docker

A multi-stage `Dockerfile` is provided at the repository root. The first stage builds the React app with Node 20-alpine; the second stage serves the static files with Nginx 1.27-alpine.

```bash
# Build the image
docker build -t dev-prod-dashboard:latest .

# Run the container
docker run -p 80:80 dev-prod-dashboard:latest
```

Open **http://localhost** in your browser.

---

## Kubernetes

Manifests are located in the `kubernetes/` directory.

```bash
# Deploy
kubectl apply -f kubernetes/frontend-deployment.yaml
kubectl apply -f kubernetes/frontend-service.yaml

# Verify
kubectl get pods
kubectl get svc developer-productivity-frontend
```

The service is exposed via a **LoadBalancer** on port 80. Use the external IP or hostname returned by `kubectl get svc` to access the app.

**Resource limits per pod:**

| Resource | Request | Limit |
|----------|---------|-------|
| CPU | 100 m | 500 m |
| Memory | 128 Mi | 256 Mi |

---

## CI/CD

Two GitHub Actions workflows are included under `.github/workflows/`:

| Workflow | Trigger | What it does |
|----------|---------|--------------|
| `ci.yml` | Push to `main`, pull requests | Installs deps → runs tests → builds the app → validates Docker image |
| `cd.yml` | Push to `main` | Builds & pushes the Docker image to GitHub Container Registry (ghcr.io) → deploys to the Kubernetes cluster |

---

## Project Structure

```
Developer-Productivity-Dashboard/
├── .github/
│   └── workflows/
│       ├── ci.yml                   # CI pipeline
│       └── cd.yml                   # CD pipeline
├── frontend/
│   ├── src/
│   │   ├── main.jsx                 # React entry point
│   │   ├── App.jsx                  # Root component & state management
│   │   ├── index.css                # Global styles
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── AddTask.jsx
│   │   │   ├── EditTask.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── StatisticsPanel.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── Notification.jsx
│   │   │   ├── QuickAddButton.jsx
│   │   │   ├── QuickAddModal.jsx
│   │   │   ├── CompletionHistory.jsx
│   │   │   └── CollapsibleTaskSection.jsx
│   │   └── tests/                   # Vitest component tests
│   ├── index.html
│   ├── vite.config.mts
│   └── package.json
├── kubernetes/
│   ├── frontend-deployment.yaml
│   └── frontend-service.yaml
└── Dockerfile
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes with a descriptive message.
4. Open a pull request against `main`.

Please ensure all existing tests pass (`npm test`) and add new tests for any added functionality.

---

## License

This project is open-source. See the repository for license details.
