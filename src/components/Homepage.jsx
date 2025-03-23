import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header style={{ backgroundColor: '#2b2d78' }} className="text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo and Name */}
          <div className="flex items-center space-x-4">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs7vZKGmx5-WlrJ-539bkuDt9Bz2gtG_CxrA&s" 
              alt="Tax Logo" 
              className="h-16 w-16 rounded-full border-2 border-white" // Circular logo with border
            />
            <h1 className="text-lg font-bold">Smart Tax Webapp</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <ul className="flex space-x-6">
              <li><a href="#" className="hover:text-gray-300">Home</a></li>
              <li><a href="#" className="hover:text-gray-300">About</a></li>
              <li><a href="#" className="hover:text-gray-300">Services</a></li>
              <li><a href="#" className="hover:text-gray-300">Contact</a></li>
            </ul>
            {/* Login and Sign Up Buttons */}
            <div className="flex space-x-4">
              <button
                style={{ backgroundColor: '#eeb029' }}
                className="hover:opacity-90 text-white py-2 px-4 rounded"
              >
                Login
              </button>
              <button
                style={{ backgroundColor: '#eeb029' }}
                className="hover:opacity-90 text-white py-2 px-4 rounded"
              >
                Sign Up
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content with Background Image */}
      <main className="relative flex-grow">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center h-full"
          style={{
            backgroundImage: `url('https://w0.peakpx.com/wallpaper/8/305/HD-wallpaper-finance-concepts-charts-background-with-graphs-stock-exchanges-money-business-concepts-finance.jpg')`,
            opacity: 0.25, // Background image opacity set to 25%
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-4xl text-white font-bold">Welcome to Smart Tax</h1>
          <p className="text-xl text-white mt-4">Your trusted platform for tax filing and management , you can manage all the tax task in one application easy and clearly .dfefsdfsdfdfsfsdffdsfdsfdsfdsfdsffs</p>
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

export default HomePage;
