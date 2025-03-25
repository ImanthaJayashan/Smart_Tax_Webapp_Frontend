import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate(); // Hook to navigate between pages
  const [currentSlide, setCurrentSlide] = useState(0); // State to track the current slide

  const images = [
    'https://4kwallpapers.com/images/wallpapers/forex-trading-3440x1440-13938.jpg',
    'https://wallpapercave.com/wp/wp9223603.jpg',
    'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?cs=srgb&dl=pexels-pixabay-164527.jpg&fm=jpg',
  ];

  // Automatically change slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length); // Update slide index
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Exit Button */}
      <button
        onClick={() => navigate('/')} // Navigate to the home page
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Exit
      </button>

      {/* Header */}
      <header style={{ backgroundColor: '#2b2d78' }} className="text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo and Name aligned to the left */}
          <div className="flex items-center space-x-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs7vZKGmx5-WlrJ-539bkuDt9Bz2gtG_CxrA&s"
              alt="Tax Logo"
              className="h-16 w-16 rounded-full border-2 border-white"
            />
            <h1 className="text-lg font-bold">Smart Tax Webapp</h1>
          </div>

          {/* Navigation Bar */}
          <nav className="flex justify-center w-full">
            <ul className="flex space-x-8">
              <li><a href="#" className="hover:text-gray-300">Home</a></li>
              <li><a href="#" className="hover:text-gray-300">About</a></li>
              <li><a href="#" className="hover:text-gray-300">Services</a></li>
              <li><a href="#" className="hover:text-gray-300">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Title */}
      <div className="bg-gray-100 py-4">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          Welcome To Tax Learning Hub
        </h2>
      </div>

      {/* Main Content */}
      <main className="relative flex-grow">
        {/* Slider */}
        <div className="relative w-full mt-8 overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`, // Slide animation
              width: `${images.length * 100}%`, // Ensure all images fit in the container
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="w-full h-96 flex-shrink-0 bg-gray-100 flex items-center justify-center"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover', // Ensure the entire image is visible
                  backgroundPosition: 'center', // Center the image
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Text Below Slider */}
        <div className="bg-gray-100 py-6">
          <div className="container mx-auto text-center">
            <p className="text-gray-700 text-lg leading-relaxed text-center px-6 md:px-12">
              Welcome to the Smart Tax Learning Hub! Whether you're just starting out or looking for a simpler way to handle your taxes, our platform is designed to guide you every step of the way.
              We offer a comprehensive A-Z tax guide to help you understand everything from the basics of taxes to filing procedures. This guide is perfect for beginners, breaking down complex topics into easy-to-follow lessons.
              One of our standout features is the Google Maps integration, which allows you to easily find tax offices and service centers near you, helping you get the support you need without any hassle. Additionally, 
              our Tax Calculator makes it easy to estimate how much you need to pay, simplifying the process based on your income, deductions, and applicable rates. With the Smart Tax Learning Hub, managing your taxes has never been easier or more straightforward.
            </p>
          </div>
        </div>

        {/* Horizontal Sections */}
        <div className="bg-gray-100 py-8">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6">
            {/* Section 1 */}
            <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <img
                src="https://c0.wallpaperflare.com/preview/975/981/276/hand-pen-paper-white.jpg"
                alt="Explore Section"
                className="rounded-lg shadow-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Explore Our Tax Solutions
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Discover how our platform can simplify your tax filing and management process. Get started today!
              </p>
              <button
                onClick={() => navigate('/explore')} // Navigate to the explore page
                className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
              >
                Explore
              </button>
            </div>

            {/* Section 2 */}
            <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <img
                src="https://via.placeholder.com/600x400"
                alt="Tax Benefits"
                className="rounded-lg shadow-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Learn About Tax Benefits
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Understand the various tax benefits available to you and how to maximize them.
              </p>
              <button
                onClick={() => navigate('/benefits')} // Navigate to the benefits page
                className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
              >
                Learn More
              </button>
            </div>

            {/* Section 3 */}
            <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <img
                src="https://via.placeholder.com/600x400"
                alt="Tax Filing"
                className="rounded-lg shadow-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Simplify Your Tax Filing
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Use our platform to file your taxes quickly and accurately with minimal effort.
              </p>
              <button
                onClick={() => navigate('/filing')} // Navigate to the filing page
                className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
              >
                Get Started
              </button>
            </div>
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
