const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('./database');

const router = express.Router();

const VALID_CATEGORIES = ['Food', 'Transport', 'Bills', 'Shopping', 'Other'];

// Create an expense
router.post('/', (req, res) => {
  const { amount, category, date, description } = req.body;

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'amount must be a number greater than 0' });
  }

  if (!category || !VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ error: `category must be one of: ${VALID_CATEGORIES.join(', ')}` });
  }

  const id = uuidv4();
  const expenseDate = date || new Date().toISOString().split('T')[0];
  const created_at = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO expenses (id, amount, category, date, description, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  stmt.run(id, amount, category, expenseDate, description || null, created_at);

  const expense = db.prepare('SELECT * FROM expenses WHERE id = ?').get(id);
  res.status(201).json(expense);
});

// Get all expenses
router.get('/', (req, res) => {
  const expenses = db.prepare('SELECT * FROM expenses ORDER BY date DESC, created_at DESC').all();
  res.json(expenses);
});

// Get summary
router.get('/summary', (req, res) => {
  const total = db.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM expenses').get();
  const byCategory = db.prepare(`
    SELECT category, COALESCE(SUM(amount), 0) as total
    FROM expenses
    GROUP BY category
    ORDER BY total DESC
  `).all();

  res.json({ total: total.total, by_category: byCategory });
});

// Get single expense
router.get('/:id', (req, res) => {
  const expense = db.prepare('SELECT * FROM expenses WHERE id = ?').get(req.params.id);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  res.json(expense);
});

// Update an expense
router.patch('/:id', (req, res) => {
  const expense = db.prepare('SELECT * FROM expenses WHERE id = ?').get(req.params.id);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  const { amount, category, date, description } = req.body;

  if (amount !== undefined && (typeof amount !== 'number' || amount <= 0)) {
    return res.status(400).json({ error: 'amount must be a number greater than 0' });
  }

  if (category !== undefined && !VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ error: `category must be one of: ${VALID_CATEGORIES.join(', ')}` });
  }

  const updated = {
    amount: amount ?? expense.amount,
    category: category ?? expense.category,
    date: date ?? expense.date,
    description: description ?? expense.description,
  };

  db.prepare(`
    UPDATE expenses SET amount = ?, category = ?, date = ?, description = ? WHERE id = ?
  `).run(updated.amount, updated.category, updated.date, updated.description, req.params.id);

  res.json(db.prepare('SELECT * FROM expenses WHERE id = ?').get(req.params.id));
});

// Delete an expense
router.delete('/:id', (req, res) => {
  const expense = db.prepare('SELECT * FROM expenses WHERE id = ?').get(req.params.id);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  db.prepare('DELETE FROM expenses WHERE id = ?').run(req.params.id);
  res.status(204).send();
});

module.exports = router;