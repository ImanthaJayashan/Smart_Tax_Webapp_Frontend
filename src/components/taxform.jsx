import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaxForm = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Individual'); // State to track selected filter

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs7vZKGmx5-WlrJ-539bkuDt9Bz2gtG_CxrA&s"
            alt="Tax Logo"
            className="h-16 w-16 rounded-full border-2 border-white"
          />
          <h1 className="text-lg font-bold">Tax Form</h1>
        </div>
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          Back
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center p-4">
        <div className="w-full max-w-3xl p-4 bg-white rounded shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
            TAX FORMS
          </h2>

          {/* Filter Buttons */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setFilter('Individual')}
              className={`px-4 py-2 rounded ${
                filter === 'Individual' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              } hover:bg-blue-700 transition`}
            >
              Individual
            </button>
            <button
              onClick={() => setFilter('Company')}
              className={`px-4 py-2 rounded ${
                filter === 'Company' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              } hover:bg-blue-700 transition`}
            >
              Company
            </button>
            <button
              onClick={() => setFilter('Partnership')}
              className={`px-4 py-2 rounded ${
                filter === 'Partnership' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              } hover:bg-blue-700 transition`}
            >
              Partnership
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#2b2d78' }} className="text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Smart Tax. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TaxForm;
