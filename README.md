# Expense Manager

A full-stack expense tracking app built with **Express.js** (backend) and **Next.js** (frontend).

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Backend  | Express.js, Node.js, SQLite         |
| Frontend | Next.js, JavaScript, Tailwind CSS   |

---

## Getting Started

You need **Node.js 22+** and **npm** installed.

### 1. Clone the repo

git clone <your-repo-url>
cd expense-manager

### 2. Start the Backend

cd backend
npm install
npm run dev

API will be running at **http://localhost:4000**

### 3. Start the Frontend

Open a new terminal:

cd frontend
npm install
npm run dev

Open **http://localhost:3000** in your browser.

---

## API Endpoints

| Method | Path                | Description                      |
|--------|---------------------|----------------------------------|
| POST   | /expenses           | Create a new expense             |
| GET    | /expenses           | List all expenses (newest first) |
| GET    | /expenses/summary   | Total + breakdown by category    |
| GET    | /expenses/:id       | Get single expense by ID         |
| PATCH  | /expenses/:id       | Update an expense                |
| DELETE | /expenses/:id       | Delete an expense                |

### Valid categories

Food, Transport, Bills, Shopping, Other

---

## What I Built

- Full CRUD REST API with Express.js and SQLite persistence
- Data persists across server restarts in a local expenses.db file
- Frontend fetches all data from the API over real HTTP
- Empty state, API error handling, and client-side form validation
- Clean white UI built with Tailwind CSS

## What I Skipped

- Edit expense from the UI (PATCH endpoint exists on the API)
- Authentication / API key protection
- Pagination

## Assumptions

- Currency is NGN (Nigerian Naira)
- Date defaults to today if not provided
- SQLite is sufficient for this scope

---

## AI Tool Usage

I used Claude (claude.ai) to help scaffold and structure this project. All logic and architecture decisions were written and understood by me. I can explain any part of this codebase.

---

## Time Spent

Approximately 12 hours across the weekend.