# Kommunal Felanmälan

A lightweight, mobile-first web application for Swedish municipalities that allows employees and citizens to report facility issues (broken equipment, maintenance needs, IT problems) directly from their phone — without complex login systems or navigating large intranets.

## Problem Statement

Municipal employees (teachers, healthcare workers, facility staff) currently report issues via paper forms, email chains, or by navigating complex intranet systems on desktop computers. This leads to delayed responses, lost reports, and frustrated staff.

This application solves that by providing a dead-simple interface accessible from any mobile browser.

## Features

- Submit a fault report with category, description, location, and optional photo
- View status of submitted reports (open / in progress / resolved)
- Admin dashboard to manage and update report statuses
- No account required for basic reporting (optional PIN-based tracking)
- Fully responsive, mobile-first design

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TailwindCSS |
| Backend | Node.js, Express |
| Database | SQLite (easily swappable to PostgreSQL) |
| API | RESTful JSON API |

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/reports` | Get all reports |
| POST | `/api/reports` | Submit a new report |
| GET | `/api/reports/:id` | Get a specific report |
| PATCH | `/api/reports/:id/status` | Update report status (admin) |
| GET | `/api/categories` | Get report categories |

## Getting Started

### Backend

```bash
cd backend
npm install
npm start
```

Server runs on `http://localhost:3001`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:5173`

## Project Structure

```
kommunal-felanmalan/
├── backend/
│   ├── models/          # Database models
│   ├── routes/          # API route handlers
│   └── server.js        # Express server entry point
├── frontend/
│   └── src/
│       ├── components/  # Reusable UI components
│       └── pages/       # Page-level components
└── docs/                # Documentation and screenshots
```

## Use Case

This project was built as a proof-of-concept for Swedish municipalities looking to digitize their internal fault reporting processes. It demonstrates how a simple, focused web application can replace manual paper-based workflows at minimal cost.

The application is designed to be deployed within a municipality's existing infrastructure and can be customized for specific departments (schools, healthcare facilities, public spaces).

## License

MIT
