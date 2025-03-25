import React from 'react';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Main Content with Background Image */}
      <main className="relative flex-grow">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center h-full"
          style={{
            backgroundImage: `url('https://w0.peakpx.com/wallpaper/8/305/HD-wallpaper-finance-concepts-charts-background-with-graphs-stock-exchanges-money-business-concepts-finance.jpg')`,
          }}
        ></div>
        
        {/* Black Overlay */}
        <div
          className="absolute inset-0 bg-black opacity-50"
        ></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-4xl text-white font-bold">Welcome to Smart Tax</h1>
          <p className="text-xl text-white mt-4">Your trusted platform for tax filing and management, you can manage all the tax tasks in one application easily and clearly.</p>
          {/* Login and Sign Up Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              style={{ backgroundColor: '#eeb029' }}
              className="hover:opacity-90 text-white py-2 px-4 rounded"
              onClick={()=> navigate("/login")}
            >
              Login
            </button>
            <button
              style={{ backgroundColor: '#eeb029' }}
              className="hover:opacity-90 text-white py-2 px-4 rounded"
              onClick={()=> navigate("/signup")}            >
              Sign Up
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

export default HomePage;
