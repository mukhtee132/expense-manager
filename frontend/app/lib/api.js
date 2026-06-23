const API_URL = 'http://localhost:4000';

async function handleResponse(res) {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'An unexpected error occurred' }));
    throw new Error(error.message || `Request failed with status ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  async getExpenses() {
    const res = await fetch(`${API_URL}/expenses`);
    return handleResponse(res);
  },

  async createExpense(payload) {
    const res = await fetch(`${API_URL}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  async deleteExpense(id) {
    const res = await fetch(`${API_URL}/expenses/${id}`, { method: 'DELETE' });
    return handleResponse(res);
  },

  async getSummary() {
    const res = await fetch(`${API_URL}/expenses/summary`);
    return handleResponse(res);
  },
};