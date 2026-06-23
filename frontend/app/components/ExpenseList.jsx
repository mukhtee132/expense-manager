'use client';

const CATEGORY_COLORS = {
  Food: 'bg-gray-100 text-gray-800',
  Transport: 'bg-gray-100 text-gray-800',
  Bills: 'bg-gray-100 text-gray-800',
  Shopping: 'bg-gray-100 text-gray-800',
  Other: 'bg-gray-100 text-gray-800',
};

function formatAmount(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function ExpenseList({ expenses, onDelete, deletingId }) {
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="text-4xl mb-3">🧾</div>
        <p className="text-gray-500 font-medium">No expenses yet</p>
        <p className="text-gray-400 text-sm mt-1">Add your first expense using the form above.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">
          Expenses <span className="text-gray-400 font-normal text-base">({expenses.length})</span>
        </h2>
      </div>

      <ul className="divide-y divide-gray-50">
        {expenses.map((expense) => (
          <li key={expense.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4 min-w-0">
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0 ${CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.Other}`}>
                {expense.category}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {expense.description || <span className="text-gray-400 italic">No description</span>}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{formatDate(expense.date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <span className="text-sm font-semibold text-gray-800">
                {formatAmount(expense.amount)}
              </span>
              <button
                onClick={() => onDelete(expense.id)}
                disabled={deletingId === expense.id}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                title="Delete expense"
              >
                {deletingId === expense.id ? '...' : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}