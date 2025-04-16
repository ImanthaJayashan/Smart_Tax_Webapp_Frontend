import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header style={{ backgroundColor: '#2b2d78' }} className="text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo and Name */}
          <div className="flex items-center space-x-4">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs7vZKGmx5-WlrJ-539bkuDt9Bz2gtG_CxrA&s" 
              alt="Tax Logo" 
              className="h-16 w-16 rounded-full border-2 border-white"
            />
            <h1 className="text-xl font-bold">Smart Tax Webapp</h1>
          </div>
          {/* Navigation Bar */}
          <nav className="hidden md:flex justify-center items-center w-full space-x-6">
            <ul className="flex space-x-8">
              <li><a href="#" className="hover:text-yellow-300 transition-colors duration-200 font-medium">Home</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors duration-200 font-medium">About</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors duration-200 font-medium">Services</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors duration-200 font-medium">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex-grow">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center h-full"
          style={{
            backgroundImage: `url('https://w0.peakpx.com/wallpaper/8/305/HD-wallpaper-finance-concepts-charts-background-with-graphs-stock-exchanges-money-business-concepts-finance.jpg')`,
          }}
        ></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 drop-shadow-lg">
            Manage Your Tax Documents <br className="hidden md:block" />With Ease
          </h1>
          
          {/* Primary Button */}
          <div className="mb-8">
            <button
              onClick={() => window.location.href='/add-tax-document'}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Tax Document
              </span>
            </button>
          </div>
          
          {/* Secondary Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.location.href='/update-tax-document'}
              className="bg-white hover:bg-gray-100 text-blue-800 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 border-blue-800 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Update Documents
            </button>
            
            <button
              onClick={() => window.location.href='/tax-documents'}
              className="bg-white hover:bg-gray-100 text-blue-800 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 border-blue-800 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Documents
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#2b2d78' }} className="text-white p-4 shadow-inner">
        <div className="container mx-auto text-center">
          <p className="text-sm md:text-base">&copy; 2025 Smart Tax. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;