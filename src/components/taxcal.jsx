import React from 'react';
import { useNavigate } from 'react-router-dom';

const TaxCal = () => {
  const navigate = useNavigate(); // Hook to navigate between pages

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with Taskbar */}
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs7vZKGmx5-WlrJ-539bkuDt9Bz2gtG_CxrA&s"
            alt="Tax Logo"
            className="h-16 w-16 rounded-full border-2 border-white"
          />
          <h1 className="text-lg font-bold">Tax Calculator</h1>
        </div>

        {/* Taskbar Navigation */}
        <nav className="flex space-x-6">
          <ul className="flex space-x-6">
            <li><a href="/" className="hover:text-gray-300">Home</a></li>
            <li><a href="/about" className="hover:text-gray-300">About</a></li>
            <li><a href="/services" className="hover:text-gray-300">Services</a></li>
            <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
          </ul>
        </nav>
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/tax_learning_home')}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          Back
        </button>
      </header>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600">Hello World</h1>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Smart Tax. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TaxCal;
