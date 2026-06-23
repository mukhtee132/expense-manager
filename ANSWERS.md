# Assessment Written Answers

## 1. What does your app do and how is it structured?

The app is a full-stack Expense Manager split into two parts:

**Backend (`/backend`):** A REST API built with Express.js. Data is persisted in a SQLite file via better-sqlite3. The API exposes endpoints for creating, listing, retrieving, updating, and deleting expenses, plus a summary endpoint that returns the total and a per-category breakdown.

**Frontend (`/frontend`):** A Next.js single-page app. All data is fetched from the backend API using the native fetch API — there is no hardcoded data. Components are split by responsibility: AddExpenseForm, ExpenseList, and SummaryCard.

---

## 2. What would you do differently if this were a production app?

- **Auth:** Add JWT-based authentication so expenses are scoped per user
- **Database:** Move from SQLite to PostgreSQL for concurrent writes and cloud hosting
- **Error monitoring:** Add structured logging and an error tracking tool like Sentry
- **Testing:** Add unit tests for the service layer and integration tests for the API endpoints
- **Pagination:** Add cursor-based pagination to the list endpoint for large datasets

---

## 3. How did you handle validation and errors?

**Backend:** Each route manually validates the request body and returns a clear 400 error message if fields are missing or invalid. A 404 is returned when an expense ID doesn't exist.

**Frontend:** The form validates client-side before any request is made — it blocks submission if amount is 0 or category is empty. If the API call fails, the error message is displayed inline. A global error is shown if the API is unreachable, with a retry button.

---

## 4. If you had more time, what extras would you add?

- Edit expense from the UI (the PATCH endpoint is already built on the API)
- Filter expenses by category or date range
- A bar chart showing spending by category
- Monthly total in the summary card