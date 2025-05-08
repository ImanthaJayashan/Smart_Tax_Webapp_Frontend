import React, { useState, useEffect } from 'react';

function AddTransactionForm({ addTransaction, editingTransaction, updateTransaction, cancelEdit }) {
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    category: '',
    amount: '',
  });
  const [errors, setErrors] = useState({
    description: '',
    category: ''
  });

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        date: editingTransaction.date,
        description: editingTransaction.description,
        category: editingTransaction.category,
        amount: editingTransaction.amount.toString(),
      });
    } else {
      setFormData({
        date: '',
        description: '',
        category: '',
        amount: ''
      });
    }
  }, [editingTransaction]);

  const validateText = (value) => {
    return /^[a-zA-Z\s'-]*$/.test(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'description' || name === 'category') {
      if (value === '' || validateText(value)) {
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
      } else {
        setErrors({ ...errors, [name]: 'Numbers and special characters are not allowed' });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Final validation before submission
    let isValid = true;
    const newErrors = { description: '', category: '' };

    if (!validateText(formData.description)) {
      newErrors.description = 'Please enter only letters and spaces';
      isValid = false;
    }

    if (!validateText(formData.category)) {
      newErrors.category = 'Please enter only letters and spaces';
      isValid = false;
    }

    if (!formData.date) {
      isValid = false;
    }

    if (!formData.amount || isNaN(formData.amount)) {
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    const transactionData = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    if (editingTransaction) {
      updateTransaction({
        ...transactionData,
        _id: editingTransaction._id || editingTransaction.id,
        imageUrl: editingTransaction.imageUrl || null
      });
    } else {
      addTransaction(transactionData);
    }
    
    setFormData({ date: '', description: '', category: '', amount: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-wrap -mx-2 mb-4">
        {/* Date Field */}
        <div className="w-full md:w-1/4 px-2 mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Description Field */}
        <div className="w-full md:w-1/4 px-2 mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.description ? 'border-red-500' : ''
            }`}
            name="description"
            placeholder="Please enter valid description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>
        
        {/* Category Field */}
        <div className="w-full md:w-1/4 px-2 mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            type="text"
            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.category ? 'border-red-500' : ''
            }`}
            name="category"
            placeholder="Please enter valid category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">{errors.category}</p>
          )}
        </div>
        
        {/* Amount Field */}
        <div className="w-full md:w-1/6 px-2 mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount (LKR)</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            name="amount"
            placeholder="0.00"
            value={formData.amount}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
          />
        </div>
        
        {/* Submit Button */}
        <div className="w-full md:w-1/12 px-2 mb-4 flex items-end">
          <button 
            type="submit" 
            className={`w-full p-2 text-white rounded-lg transition ${
              errors.description || errors.category 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={!!errors.description || !!errors.category}
          >
            {editingTransaction ? 'Update' : 'Add'}
          </button>
        </div>
        
        {/* Cancel Button (only shown when editing) */}
        {editingTransaction && (
          <div className="w-full md:w-1/12 px-2 mb-4 flex items-end">
            <button 
              type="button"
              onClick={cancelEdit}
              className="w-full p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

export default AddTransactionForm; 