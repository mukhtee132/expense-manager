'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from './lib/api';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import SummaryCard from './components/SummaryCard';

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setFetchError('');
      const [expensesData, summaryData] = await Promise.all([
        api.getExpenses(),
        api.getSummary(),
      ]);
      setExpenses(expensesData);
      setSummary(summaryData);
    } catch (err) {
      setFetchError('Could not connect to the server. Make sure the API is running on port 4000.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleAdd(payload) {
    await api.createExpense(payload);
    await loadData();
  }

  async function handleDelete(id) {
    setDeletingId(id);
    try {
      await api.deleteExpense(id);
      await loadData();
    } catch (err) {
      alert(err.message || 'Failed to delete expense.');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Expense Manager</h1>
          <p className="text-gray-500 text-sm mt-1">Track your everyday spending</p>
        </div>

        {fetchError && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {fetchError}
            <button onClick={loadData} className="ml-2 underline font-medium">Retry</button>
          </div>
        )}

        <SummaryCard summary={summary} />
        <AddExpenseForm onAdd={handleAdd} />

        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <p className="text-gray-400 text-sm">Loading expenses...</p>
          </div>
        ) : (
          <ExpenseList
            expenses={expenses}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        )}
      </div>
    </main>
  );
}