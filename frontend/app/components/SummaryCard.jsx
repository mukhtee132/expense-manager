export default function SummaryCard({ summary }) {
  const formatAmount = (amount) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <p className="text-sm font-medium text-gray-500">Total Spent</p>
      <p className="text-4xl font-bold text-gray-900 mt-1">
        {summary ? formatAmount(summary.total) : '—'}
      </p>

      {summary && summary.by_category.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-400 mb-2">By category</p>
          <div className="flex flex-wrap gap-2">
            {summary.by_category.map(({ category, total }) => (
              <div key={category} className="bg-gray-50 rounded-lg px-3 py-1.5 text-xs">
                <span className="text-gray-500">{category}: </span>
                <span className="font-semibold text-gray-800">{formatAmount(total)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}