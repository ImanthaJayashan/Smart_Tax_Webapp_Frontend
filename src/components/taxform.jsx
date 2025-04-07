import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaxForm = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('Individual'); // State to track active section
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false); // State to toggle Registration section
  const [isReturnsOpen, setIsReturnsOpen] = useState(false); // State to toggle Returns of Income section

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
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          Back
        </button>
      </header>

      {/* Main Content */}
      <main
        className="flex-grow flex flex-col items-center bg-gray-100 p-6"
        style={{
          backgroundImage:
            activeSection === 'Individual'
              ? "url('https://www.sage.com/en-ca/blog/wp-content/uploads/sites/12/2019/01/GettyImages-525498442_super.jpg')"
              : activeSection === 'Partnership'
              ? "url('https://img.forconstructionpros.com/files/base/acbm/fcp/image/2021/01/hand_shake_happy.5ff4ae142cb21.png?auto=format%2Ccompress&fit=max&q=70&w=1200')"
              : activeSection === 'Company'
              ? "url('https://as2.ftcdn.net/jpg/01/94/69/57/1000_F_194695700_v8f4UQLhrxeRFh81lT4nnpkhAZfbrisd.jpg')"
              : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Tax Form</h1>

        {/* Section Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveSection('Individual')}
            className={`px-6 py-2 rounded text-white font-bold ${
              activeSection === 'Individual' ? 'bg-blue-500' : 'bg-blue-300 hover:bg-blue-400'
            }`}
          >
            Individual
          </button>
          <button
            onClick={() => setActiveSection('Partnership')}
            className={`px-6 py-2 rounded text-white font-bold ${
              activeSection === 'Partnership' ? 'bg-green-500' : 'bg-green-300 hover:bg-green-400'
            }`}
          >
            Partnership
          </button>
          <button
            onClick={() => setActiveSection('Company')}
            className={`px-6 py-2 rounded text-white font-bold ${
              activeSection === 'Company' ? 'bg-red-500' : 'bg-red-300 hover:bg-red-400'
            }`}
          >
            Company
          </button>
        </div>

        {/* Section Content */}
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
          {activeSection === 'Individual' && (
            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Individual Tax Form</h2>
              <p className="text-gray-700">This section is for individuals to fill out their tax forms.</p>

              {/* Registration Section */}
              <div className="mt-6">
                <button
                  onClick={() => setIsRegistrationOpen(!isRegistrationOpen)}
                  className="w-full bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition text-left"
                >
                  {isRegistrationOpen ? 'Hide Registration' : 'Show Registration'}
                </button>

                {isRegistrationOpen && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Tax Registration Form */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Tax Registration Form</h3>
                      <a
                        href="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                          alt="PDF Icon"
                          className="w-32 h-32 mb-4"
                        />
                      </a>
                      <a
                        href="https://www.ird.gov.lk/en/Downloads/TaxpayerRegistrationDocs/TPR_002_E-R2.0.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* Change Taxpayer Details */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Change Taxpayer Details</h3>
                      <a
                        href="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                          alt="PDF Icon"
                          className="w-32 h-32 mb-4"
                        />
                      </a>
                      <a
                        href="https://www.ird.gov.lk/en/Downloads/TaxpayerRegistrationDocs/TPR_009_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                      >
                        Open Form
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Returns of Income Section */}
              <div className="mt-6">
                <button
                  onClick={() => setIsReturnsOpen(!isReturnsOpen)}
                  className="w-full bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition text-left"
                >
                  {isReturnsOpen ? 'Hide Returns of Income' : 'Show Returns of Income'}
                </button>

                {isReturnsOpen && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Return of Income */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Return of Income</h3>
                      <a
                        href="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                          alt="PDF Icon"
                          className="w-32 h-32 mb-4"
                        />
                      </a>
                      <a
                        href="https://www.ird.gov.lk/en/Downloads/IT_Individuals_Doc/Asmt_IIT_001_2023_2024_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* Schedules to Return of Income */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Schedules to Return of Income</h3>
                      <a
                        href="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                          alt="PDF Icon"
                          className="w-32 h-32 mb-4"
                        />
                      </a>
                      <a
                        href="https://www.ird.gov.lk/en/Downloads/IT_Individuals_Doc/Asmt_IIT_002_2023_2024_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* Statement of Assets and Liabilities */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Statement of Assets and Liabilities</h3>
                      <a
                        href="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                          alt="PDF Icon"
                          className="w-32 h-32 mb-4"
                        />
                      </a>
                      <a
                        href="https://www.ird.gov.lk/en/Downloads/IT_Individuals_Doc/Asmt_IIT_003_2023_2024_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* Guide to Filling the Return & Schedules */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Guide to Filling the Return & Schedules</h3>
                      <a
                        href="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                          alt="PDF Icon"
                          className="w-32 h-32 mb-4"
                        />
                      </a>
                      <a
                        href="https://www.ird.gov.lk/en/Downloads/IT_Individuals_Doc/Asmt_IIT_004_2023_2024_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* Guide to File Individual Return of Income Online */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Guide to File Individual Return of Income Online</h3>
                      <a
                        href="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                          alt="PDF Icon"
                          className="w-32 h-32 mb-4"
                        />
                      </a>
                      <a
                        href="https://www.ird.gov.lk/en/Downloads/IT_Individuals_Doc/Guide_to_IIT_2324.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                      >
                        Open Form
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {activeSection === 'Partnership' && (
            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-4">Partnership Tax Form</h2>
              <p className="text-gray-700">This section is for partnerships to fill out their tax forms.</p>
            </div>
          )}
          {activeSection === 'Company' && (
            <div>
              <h2 className="text-2xl font-bold text-red-600 mb-4">Company Tax Form</h2>
              <p className="text-gray-700">This section is for companies to fill out their tax forms.</p>
            </div>
          )}
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