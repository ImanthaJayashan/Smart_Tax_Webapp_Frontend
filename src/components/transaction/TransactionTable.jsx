import React from 'react';

function TransactionTable({ transactions, onEdit, onDelete }) {
  const formatDate = (inputDate) => {
    if (!inputDate) return '';
    
    if (/^\d{4}-\d{2}-\d{2}$/.test(inputDate)) {
      return inputDate;
    }
    
    if (/^\d{2}-\d{2}-\d{4}$/.test(inputDate)) {
      const [day, month, year] = inputDate.split('-');
      return `${year}-${month}-${day}`;
    }
    
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(inputDate)) {
      const [month, day, year] = inputDate.split('/');
      return `${year}-${month}-${day}`;
    }
    
    return inputDate;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Receipt</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction._id || transaction.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(transaction.date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.category}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">LKR {transaction.amount.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {transaction.imageUrl && (
                  <button 
                    className="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition"
                    onClick={() => window.open(transaction.imageUrl, '_blank')}
                  >
                    View
                  </button>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 space-x-2">
                <button
                  onClick={() => onEdit(transaction)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(transaction._id || transaction.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable; 