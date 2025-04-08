import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaxForm = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('Individual'); // State to track active section
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false); // State to toggle Registration section
  const [isReturnsOpen, setIsReturnsOpen] = useState(false); // State to toggle Returns of Income section
  const [isIssuesOpen, setIsIssuesOpen] = useState(false); // State to toggle Issues of Shares section
  const [isSpecialTaxesOpen, setIsSpecialTaxesOpen] = useState(false); // State to toggle Special Taxes section
  const [isClearancesOpen, setIsClearancesOpen] = useState(false); // State to toggle Clearances section
  const [isWriteOffOpen, setIsWriteOffOpen] = useState(false); // State to toggle Write off the Default Tax section
  const [isEstimatesOpen, setIsEstimatesOpen] = useState(false); // State to toggle Estimates section
  const [isEscOpen, setIsEscOpen] = useState(false); // State to toggle Economic Service Charge (ESC) section
  const [isStOpen, setIsStOpen] = useState(false); // State to toggle Surcharge Tax (ST) section
  const [isSsclOpen, setIsSsclOpen] = useState(false); // State to toggle Social Security Contribution Levy (SSCL) section
  const [isCgtOpen, setIsCgtOpen] = useState(false); // State to toggle Capital Gains Tax (CGT) section

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

              {/* Registration Section */}
              <div className="mt-6">
                <button
                  onClick={() => setIsRegistrationOpen(!isRegistrationOpen)}
                  className="w-full bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition text-left"
                >
                  {isRegistrationOpen ? 'Hide Registration' : 'Show Registration'}
                </button>

                {isRegistrationOpen && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* TAXPAYER REGISTRATION */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">TAXPAYER REGISTRATION</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/TaxpayerRegistrationDocs/TPR_003_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* CHANGE TAXPAYER REGISTRATION */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">CHANGE TAXPAYER REGISTRATION</h3>
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
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* Add/Remove/Update of Proprietorship details */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Add/Remove/Update of Proprietorship details</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/TaxpayerRegistrationDocs/TPR_013_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* Change Tax Type */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Change Tax Type</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/TaxpayerRegistrationDocs/TPR_012_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                      >
                        Open Form
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Issues of Shares Section */}
              <div className="mt-6">
                <button
                  onClick={() => setIsIssuesOpen(!isIssuesOpen)}
                  className="w-full bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition text-left"
                >
                  {isIssuesOpen ? 'Hide Issues of Shares' : 'Show Issues of Shares'}
                </button>

                {isIssuesOpen && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Issue of Shares */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Issue of Shares</h3>
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
                        href="https://www.ird.gov.lk/en/publications/Unit%20Profiles_Tax%20Payer%20Service%20Unit/Form_Shares_Issue.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* Transfer of Shares */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Transfer of Shares</h3>
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
                        href="https://www.ird.gov.lk/en/publications/Unit%20Profiles_Tax%20Payer%20Service%20Unit/Form_Shares_Transfer.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                      >
                        Open Form
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Special Taxes Section */}
              <div className="mt-6">
                <button
                  onClick={() => setIsSpecialTaxesOpen(!isSpecialTaxesOpen)}
                  className="w-full bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition text-left"
                >
                  {isSpecialTaxesOpen ? 'Hide Special Taxes' : 'Show Special Taxes'}
                </button>

                {isSpecialTaxesOpen && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Land Tax Payments */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Land Tax Payments</h3>
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
                        href="https://www.ird.gov.lk/en/publications/Unit%20Profiles_Tax%20Payer%20Service%20Unit/Form_Land_Tax.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* Stamp Duty */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Stamp Duty</h3>
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
                        href="https://www.ird.gov.lk/en/publications/Unit%20Profiles_Tax%20Payer%20Service%20Unit/Form_SD_Registration.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* Stamp Duty Payments */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Stamp Duty Payments</h3>
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
                        href="https://www.ird.gov.lk/en/publications/Unit%20Profiles_Tax%20Payer%20Service%20Unit/Form_SD_Lease_Rent_And_Other.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                      >
                        Open Form
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {activeSection === 'Company' && (
            <div>
              <h2 className="text-2xl font-bold text-red-600 mb-4">Company Tax Form</h2>
              <p className="text-gray-700">This section is for companies to fill out their tax forms.</p>

              {/* Registration Section */}
              <div className="mt-6">
                <button
                  onClick={() => setIsRegistrationOpen(!isRegistrationOpen)}
                  className="w-full bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition text-left"
                >
                  {isRegistrationOpen ? 'Hide Registration' : 'Show Registration'}
                </button>

                {isRegistrationOpen && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* TAXPAYER REGISTRATION */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">TAXPAYER REGISTRATION</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/TaxpayerRegistrationDocs/TPR_001_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* CHANGE TAXPAYER REGISTRATION DETAILS */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">CHANGE TAXPAYER REGISTRATION DETAILS</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/TaxpayerRegistrationDocs/TPR_008_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* Add/Remove/Update of Director */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Add/Remove/Update of Director</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/TaxpayerRegistrationDocs/TPR_014_STE.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* Add/Remove of Authorized Credit Voucher Signature details */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Add/Remove of Authorized Credit Voucher Signature details</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/TaxpayerRegistrationDocs/TPR_015_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* Add/Update Non Individual Related Entity/Partner */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Add/Update Non Individual Related Entity/Partner</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/TaxpayerRegistrationDocs/TPR_017_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* TEMPORARY REGISTRATION OF VAT */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">TEMPORARY REGISTRATION OF VAT</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/TaxpayerRegistrationDocs/TPR_018_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* TAX AGENT REGISTRATION */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">TAX AGENT REGISTRATION</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/TaxpayerRegistrationDocs/TPR_019_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
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
                  className="w-full bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition text-left"
                >
                  {isReturnsOpen ? 'Hide Returns of Income' : 'Show Returns of Income'}
                </button>

                {isReturnsOpen && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Return of Income */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Return of Income (Form No- Asmt_CIT_001_E)</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/IT_Corporate_Doc/Asmt_CIT_001_2023_2024_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* SCHEDULES TO RETURN OF INCOME – PART A */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Schedules to Return of Income – Part A</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/IT_Corporate_Doc/Asmt_CIT_002A_2023_2024_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* SCHEDULES TO RETURN OF INCOME – PART B */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Schedules to Return of Income – Part B</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/IT_Corporate_Doc/Asmt_CIT_002B_2023_2024_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* GUIDE TO CORPORATE RETURN OF INCOME TAX */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Guide to Corporate Return of Income Tax</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/IT_Corporate_Doc/Asmt_CIT_003_2023_2024_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* Transfer Pricing Disclosure Form */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Transfer Pricing Disclosure Form</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/IT_Corporate_Doc/Asmt_TPDF_01_2023_2024_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Clearances Section */}
              <div className="mt-6">
                <button
                  onClick={() => setIsClearancesOpen(!isClearancesOpen)}
                  className="w-full bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition text-left"
                >
                  {isClearancesOpen ? 'Hide Clearances' : 'Show Clearances'}
                </button>

                {isClearancesOpen && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* INCOME TAX CLEARANCE CERTIFICATE */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">INCOME TAX CLEARANCE CERTIFICATE</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/Forms_Clearances/Form_App_Clearance_Certificate.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* TAX CONFIRMATION FOR LIQUOR */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">TAX CONFIRMATION FOR LIQUOR</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/Forms_Clearances/CLR_002_2024_STE.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* LIQUOR TAX 2 */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">LIQUOR TAX 2</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/Forms_Clearances/CLR_003_2024_STE.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* Tax Clearance (Outward Remittances) */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Tax Clearance (Outward Remittances)</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/Forms_Clearances/Form_App_Clearance_Outward.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* CONFIRMATION OF VAT LIABILITY */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">CONFIRMATION OF VAT LIABILITY</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/Forms_Clearances/CLR_003_E%20-%20Application%20Form%20for%20Confirmation%20of%20VAT%20Liability.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* TAX CLEARANCE ON OTHER PURPOSE */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">TAX CLEARANCE ON OTHER PURPOSE</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/Forms_Clearances/CLR_004_E%20-%20Application%20Form%20for%20Tax%20Clearance%20on%20Other%20Purpose.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Write off the Default Tax Section */}
              <div className="mt-6">
                <button
                  onClick={() => setIsWriteOffOpen(!isWriteOffOpen)}
                  className="w-full bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition text-left"
                >
                  {isWriteOffOpen ? 'Hide Write off the Default Tax' : 'Show Write off the Default Tax'}
                </button>

                {isWriteOffOpen && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* AFFIDAVIT OF GRANTING CONSENT OF BUSINESS ACTIVITY */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">AFFIDAVIT OF GRANTING CONSENT OF BUSINESS ACTIVITY</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/Forms_WoDT/WoDT_Affidavit_Entity_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Estimates Section */}
              <div className="mt-6">
                <button
                  onClick={() => setIsEstimatesOpen(!isEstimatesOpen)}
                  className="w-full bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition text-left"
                >
                  {isEstimatesOpen ? 'Hide Estimates' : 'Show Estimates'}
                </button>

                {isEstimatesOpen && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* STATEMENT OF ESTIMATED TAX PAYABLE */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">STATEMENT OF ESTIMATED TAX PAYABLE</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/IT_SET_2021_Doc/SET_2024_2025_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* (SET) Credit Schedule */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">(SET) Credit Schedule</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/IT_SET_2021_Doc/SET_Schedule_24_25(Tax_Credit)_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* SET- E 2024/2025 */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">SET- E 2024/2025</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/IT_SET_2021_Doc/SET_24_25_Guide_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Economic Service Charge (ESC) Section */}
              <div className="mt-6">
                <button
                  onClick={() => setIsEscOpen(!isEscOpen)}
                  className="w-full bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition text-left"
                >
                  {isEscOpen ? 'Hide Economic Service Charge (ESC)' : 'Show Economic Service Charge (ESC)'}
                </button>

                {isEscOpen && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Return of Economic Service Charge */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Return of Economic Service Charge</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/Other_ESC_Doc/ASMT_ESC_20_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* Guide to Filling (ESC) */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Guide to Filling (ESC)</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/Other_ESC_Doc/ASMT_ESC_Guide_1920_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Surcharge Tax (ST) Section */}
              <div className="mt-6">
                <button
                  onClick={() => setIsStOpen(!isStOpen)}
                  className="w-full bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition text-left"
                >
                  {isStOpen ? 'Hide Surcharge Tax (ST)' : 'Show Surcharge Tax (ST)'}
                </button>

                {isStOpen && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Surcharge Tax Return */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Surcharge Tax Return</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/Other_SurT_Doc/Asmt_SURT_001_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* Guide to Surcharge Tax Return */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Guide to Surcharge Tax Return</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/Other_SurT_Doc/ST_Return_Guide_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Security Contribution Levy (SSCL) Section */}
              <div className="mt-6">
                <button
                  onClick={() => setIsSsclOpen(!isSsclOpen)}
                  className="w-full bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition text-left"
                >
                  {isSsclOpen ? 'Hide Social Security Contribution Levy (SSCL)' : 'Show Social Security Contribution Levy (SSCL)'}
                </button>

                {isSsclOpen && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Social Security Contribution Levy */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Social Security Contribution Levy</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/Other_SSCL_Doc/SSCL_20_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Capital Gains Tax (CGT) Section */}
              <div className="mt-6">
                <button
                  onClick={() => setIsCgtOpen(!isCgtOpen)}
                  className="w-full bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition text-left"
                >
                  {isCgtOpen ? 'Hide Capital Gains Tax (CGT)' : 'Show Capital Gains Tax (CGT)'}
                </button>

                {isCgtOpen && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* CGT Return Form */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">CGT Return Form</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/IT_CGT_Doc/Asmt_CGT_001_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>

                    {/* Schedule of CGT Return */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Schedule of CGT Return</h3>
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
                        href="https://www.ird.gov.lk/en/Downloads/IT_CGT_Doc/Asmt_CGT_002_E.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                      >
                        Open Form
                      </a>
                    </div>
                  </div>
                )}
              </div>
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