import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LearnAboutTax = () => {
  const navigate = useNavigate(); // Hook to navigate between pages

  // State to manage filter options and video list
  const [educationLevel, setEducationLevel] = useState('');
  const [hasPaidTax, setHasPaidTax] = useState('');
  const [taxCategory, setTaxCategory] = useState('');
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [description, setDescription] = useState(''); // State for description
  const [errors, setErrors] = useState({ educationLevel: false, hasPaidTax: false, taxCategory: false });

  // YouTube videos for different filters (sample data)
  const allVideos = [
    {
      title: 'Beginner Tax Guide - Video 1',
      level: 'Beginner',
      paidTaxBefore: 'Yes',
      category: 'Personal',
      url: 'https://www.youtube.com/embed/GllI44uCbRc?si=3kLKWAO6oJsCpitx',
    },
    {
      title: 'Beginner Tax Guide - Video 2',
      level: 'Beginner',
      paidTaxBefore: 'Yes',
      category: 'Personal',
      url: 'https://www.youtube.com/embed/j1MfixXJDbw?si=QfiL1Sx1DzMTBr1J',
    },
    {
      title: 'Basics of Sri Lankan Tax System 1',
      level: 'Beginner',
      paidTaxBefore: 'No',
      category: 'Personal',
      url: 'https://www.youtube.com/embed/watch?v=8sh66_7id6s&list=PLT61k8OdDMeOUo_tLsYldtIp3kii7CEQr&index=2&ab_channel=GayanAbeyrathna',
    },
    {
      title: 'Basics of Sri Lankan Tax System 2',
      level: 'Beginner',
      paidTaxBefore: 'No',
      category: 'Personal',
      url: 'https://www.youtube.com/embed/watch?v=Rv74dlgYK-M&list=PLT61k8OdDMeOUo_tLsYldtIp3kii7CEQr&index=1&ab_channel=GayanAbeyrathna',
    },

    //Intermediate/yes/Personal
    {
      title: 'Taxation for an Individual - Video 1',
      level: 'Intermediate',
      paidTaxBefore: 'Yes', // Added this property
      category: 'Personal',
      url: 'https://www.youtube.com/embed/watch?v=O85YlwKVipw&list=PLT61k8OdDMeOUo_tLsYldtIp3kii7CEQr&index=9&ab_channel=GayanAbeyrathna'
    },
    {
      title: 'VAT - Video 2',
      level: 'Intermediate',
      paidTaxBefore: 'Yes', // Added this property
      category: 'Personal',
      url: 'https://www.youtube.com/embed/watch?v=YA6ylPibkLc&list=PLT61k8OdDMeOUo_tLsYldtIp3kii7CEQr&index=11&ab_channel=GayanAbeyrathna'
    },
    //advanced 
    {
      title: 'Calculation of Taxable income of an individual',
      level: 'Advanced',
      paidTaxBefore: 'Yes', // Added this property
      category: 'Personal',
      url: 'https://www.youtube.com/embed/watch?v=5zjDWnXElJw&list=PLT61k8OdDMeOUo_tLsYldtIp3kii7CEQr&index=5&ab_channel=GayanAbeyrathna'
    },
    {
      title: 'Income Tax & Administration - Video 1',
      level: 'Advanced',
      paidTaxBefore: 'Yes', // Added this property
      category: 'Personal',
      url: 'https://www.youtube.com/embed/watch?v=XYxY9ZNsa4o&list=PL_IWrf861Ze6npqqKswnRprjAlq9XExY-&ab_channel=CAOnlineAcademy'
    },
    {
      title: 'Income Tax & Administration - Video 2',
      level: 'Advanced',
      paidTaxBefore: 'Yes', // Added this property
      category: 'Personal',
      url: 'https://www.youtube.com/embed/watch?v=tHM5UAKEKo4&list=PL_IWrf861Ze6npqqKswnRprjAlq9XExY-&index=2&ab_channel=CAOnlineAcademy'
    },
    {
      title: 'Taxation of Other Persons and Entities',
      level: 'Advanced',
      paidTaxBefore: 'Yes', // Added this property
      category: 'Personal',
      url: 'https://www.youtube.com/embed/watch?v=MNqz5z6uAOE&list=PL_IWrf861Ze6npqqKswnRprjAlq9XExY-&index=3&ab_channel=CAOnlineAcademy'
    },
    {
      title: 'Individual Tax Calculation Advanced',
      level: 'Advanced',
      paidTaxBefore: 'Yes', // Added this property
      category: 'Personal',
      url: 'https://www.youtube.com/embed/watch?v=nBUu53yhE-o&list=PL_IWrf861Ze6npqqKswnRprjAlq9XExY-&index=6&ab_channel=CAOnlineAcademy'
    }
    
    
    // Add more videos with different categories, levels, or tax status here
  ];

  const handleSearch = () => {
    // Validation: Check if all filter options are selected
    const newErrors = {
      educationLevel: !educationLevel,
      hasPaidTax: !hasPaidTax,
      taxCategory: !taxCategory,
    };

    setErrors(newErrors);

    // If any errors exist, stop the search
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    // Filter videos based on selected filters
    const filtered = allVideos.filter((video) => {
      return (
        (educationLevel ? video.level === educationLevel : true) &&
        (hasPaidTax ? video.paidTaxBefore === hasPaidTax : true) &&
        (taxCategory ? video.category === taxCategory : true)
      );
    });

    setFilteredVideos(filtered);

    // Set description based on selected filters
    if (filtered.length > 0) {
      setDescription(`
        Payment of Tax:
        Income Tax is payable on a self-assessment basis. A person who is an “instalment payer” shall pay tax by quarterly instalments.

        Furnishing Income Tax (IT) Return/Statement of Estimated Tax Payable (SET):
        - **Due Date for Furnishing SET**: On or before the 15th day of the month of August of the current year of assessment.
        - **Due Date for Furnishing Returns**: On or before the 30th day of the month of November of the next succeeding year of assessment.

        Submit to:
        - Online through e-Services.
        - The relevant Inland Revenue Metropolitan/Regional Office in the area nearby.
        - Central Document Management Unit (CDMU), 1st Floor of Inland Revenue Head Office Building.
      `);
    } else {
      setDescription('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header style={{ backgroundColor: '#2b2d78' }} className="text-white p-4 relative">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs7vZKGmx5-WlrJ-539bkuDt9Bz2gtG_CxrA&s"
              alt="Tax Logo"
              className="h-16 w-16 rounded-full border-2 border-white"
            />
            <h1 className="text-lg font-bold">Smart Tax Webapp</h1>
          </div>
          <nav className="flex justify-center items-center w-full space-x-6">
            <ul className="flex space-x-6">
              <li><a href="/" className="hover:text-gray-300">Home</a></li>
              <li><a href="/about" className="hover:text-gray-300">About</a></li>
              <li><a href="/services" className="hover:text-gray-300">Services</a></li>
              <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
            </ul>
          </nav>
        </div>
        <button
          onClick={() => navigate('/tax_learning_home')}
          className="absolute top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          Back
        </button>
      </header>

      {/* Filter Options */}
      <div className="bg-gray-200 py-4 px-6">
        <div className="container mx-auto flex flex-wrap justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-wrap space-x-4 items-center">
            {/* Education Level Dropdown */}
            <div>
              <select
                value={educationLevel}
                onChange={(e) => {
                  const selectedLevel = e.target.value;
                  setEducationLevel(selectedLevel);

                  // Automatically set "Have you paid tax before?" to "Yes" and disable it for Intermediate/Advanced
                  if (selectedLevel === 'Intermediate' || selectedLevel === 'Advanced') {
                    setHasPaidTax('Yes');
                  } else {
                    setHasPaidTax(''); // Reset if Beginner is selected
                  }
                }}
                className={`bg-white border ${errors.educationLevel ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
              >
                <option value="">Select Education Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              {errors.educationLevel && <p className="text-red-500 text-sm mt-1">Please select an education level.</p>}
            </div>

            {/* Paid Tax Before Dropdown */}
            <div>
              <select
                value={hasPaidTax}
                onChange={(e) => setHasPaidTax(e.target.value)}
                disabled={educationLevel === 'Intermediate' || educationLevel === 'Advanced'} // Disable for Intermediate/Advanced
                className={`bg-white border ${errors.hasPaidTax ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 ${
                  educationLevel === 'Intermediate' || educationLevel === 'Advanced' ? 'bg-gray-200 cursor-not-allowed' : ''
                }`}
              >
                <option value="">Have you paid tax before?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.hasPaidTax && <p className="text-red-500 text-sm mt-1">Please select an option.</p>}
            </div>

            {/* Tax Category Dropdown */}
            <div>
              <select
                value={taxCategory}
                onChange={(e) => setTaxCategory(e.target.value)}
                className={`bg-white border ${errors.taxCategory ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2`}
              >
                <option value="">Select Tax Category</option>
                <option value="Personal">Personal</option>
                <option value="Business">Business</option>
                <option value="Corporate">Corporate</option>
              </select>
              {errors.taxCategory && <p className="text-red-500 text-sm mt-1">Please select a tax category.</p>}
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
            >
              Search
            </button>
          </div>

          {/* How to Fill Form Button */}
          <button
            onClick={() => navigate('/parc_video')}
            className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition"
          >
            How to Fill Form
          </button>
        </div>
      </div>

      {/* Display Videos */}
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto">
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/X2Qrmi450nM?autoplay=1"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Introduction to Tax"
            className="rounded-lg shadow-lg"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          ></iframe>
          <p
            style={{ display: 'none' }}
            className="text-red-500 mt-2"
          >
            Unable to load video. <a href="https://www.youtube.com/watch?v=X2Qrmi450nM" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Watch on YouTube</a>.
          </p>
        </div>
      </div>

      {/* Main Content - YouTube Video Embed */}
      <main className="flex-grow flex flex-col items-center bg-gray-100 p-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Learn About Tax</h1>

        {/* Display Filtered Videos */}
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <div key={index} className="mb-8 w-full max-w-2xl">
              <h2 className="text-2xl font-semibold text-gray-800">{video.title}</h2>
              <iframe
                width="100%"
                height="400"
                src={video.url}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              ></iframe>
              <p
                style={{ display: 'none' }}
                className="text-red-500 mt-2"
              >
                Unable to load video. <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Watch on YouTube</a>.
              </p>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-600">No videos found. Please adjust your filters.</p>
        )}

        {/* Display Description */}
        {description && (
          <div className="mt-6 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{description}</p>
          </div>
        )}
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

export default LearnAboutTax;
