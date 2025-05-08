import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const HomePage = () => {
  const navigate = useNavigate(); // Hook to navigate between pages
  const [currentSlide, setCurrentSlide] = useState(0); // State to track the current slide
  const [selectedDistrict, setSelectedDistrict] = useState(''); // State for selected district
  const [mapCenter, setMapCenter] = useState({ lat: 6.9271, lng: 79.8612 }); // Default center (Colombo)
  const [taxOffices, setTaxOffices] = useState([]); // State to store tax office locations

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

  const districts = [
    'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha',
    'Hambantota', 'Jaffna', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
    'Matale', 'Matara', 'Moneragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa',
    'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya', 'Kalutara'
  ];

  const districtCoordinates = {
    Colombo: { lat: 6.9271, lng: 79.8612, offices: [{ lat: 6.9271, lng: 79.8612 }] },
    Kandy: { lat: 7.2906, lng: 80.6337, offices: [{ lat: 7.2906, lng: 80.6337 }] },
    Galle: { lat: 6.0535, lng: 80.2210, offices: [{ lat: 6.0535, lng: 80.2210 }] },
    Jaffna: { lat: 9.6615, lng: 80.0255, offices: [{ lat: 9.6615, lng: 80.0255 }] },
  };

  const handleSearch = () => {
    // Handle search action (e.g., show tax locations based on the selected district)
    console.log('Searching for tax locations in', selectedDistrict);

    // Update map center based on selected district (example coordinates)
    if (districtCoordinates[selectedDistrict]) {
      const { lat, lng, offices } = districtCoordinates[selectedDistrict];
      setMapCenter({ lat, lng });
      setTaxOffices(offices || []);
    } else {
      alert('Coordinates for the selected district are not available.');
    }
  };

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
                Find All Tax Forms
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Discover all the tax forms you need quickly and easily, without any confusion or frustration.
              </p>
              <button
                onClick={() => navigate('/taxform')} // Navigate to the explore page
                className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
              >
                Explore
              </button>
            </div>

            {/* Section 2 */}
            <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <img
                src="https://pictory.ai/wp-content/uploads/2024/04/Teaching-Video-Maker-1.png"
                alt="Tax Benefits"
                className="rounded-lg shadow-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Learn About Tax 
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Learn about taxes with our beginner-friendly guide, featuring a comprehensive video that walks you through the tax-paying system step by step. Perfect for newcomers looking to understand the basics and get started with confidence.
              </p>
              <button
                onClick={() => navigate('/LearnAboutTax')} // Navigate to the 
                className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
              >
                Learn More
              </button>
            </div>

            {/* Section 3 */}
            <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <img
                src="https://c4.wallpaperflare.com/wallpaper/903/792/993/accounting-balance-banking-calculation-wallpaper-preview.jpg"
                alt="Tax Filing"
                className="rounded-lg shadow-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Tax Calculator
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Use our inbuilt smart tax calculator to easily determine how much tax you need to pay. Simply input your details, and the calculator will quickly provide an accurate estimate, making tax calculations effortless.
              </p>
              <button
                onClick={() => navigate('/taxcal')} // Navigate to the filing page
                className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Find Nearest Tax Locations */}
        <div className="bg-gray-100 py-8">
          <div className="container mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Find Nearest Tax Locations
            </h3>
            <div className="flex justify-center items-center space-x-4">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg p-2"
              >
                <option value="">Select District</option>
                {districts.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="bg-gray-100 py-8">
          <div className="container mx-auto">
            <LoadScript googleMapsApiKey="AIzaSyD4qpUk5ccuNhasXzgLi0XukLu4m5_0Pkw">
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={mapCenter}
                zoom={10}
              >
                {taxOffices.map((office, index) => (
                  <Marker key={index} position={office} />
                ))}
              </GoogleMap>
            </LoadScript>
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
