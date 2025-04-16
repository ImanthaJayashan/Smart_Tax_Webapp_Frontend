import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TaxpayerRegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nicNumber: '',
    passportNumber: '',
    passportExpiryDate: '',
    arrivalDate: '',
    passportIssuanceCountry: '',
    salutation: '',
    nameWithInitialsEnglish: '',
    fullNameEnglish: '',
    dateOfBirth: '',
    countryOfBirth: '',
    gender: '',
    nationality: '',
    preferredLanguage: '',
    sourceOfIncome: '',
    profession: '',
    residentStatus: '',
    citizenship: '',
    dualCitizenship: 'No',
    dualCitizenshipCountry: '',
    mobile: '',
    email: '',
    residentialAddress: '',
    tin: '',
    annualIncome: '',
    maritalStatus: '',
    businessName: '',
    businessRegistrationNo: '',
    businessActivity: '',
    businessStartDate: '',
    declarationName: '',
    declarationId: '',
    declarationSignature: '',
    declarationDate: '',
  });

  const [serverError, setServerError] = useState('');
  const [isForeigner, setIsForeigner] = useState(false);
  const [errors, setErrors] = useState({});

  // Function to generate TIN from NIC
  const generateTINFromNIC = (nic) => {
    if (!nic) return '';
    const numericPart = nic.replace(/[^0-9]/g, '');
    if (numericPart.length < 9) return '';
    return numericPart.substring(0, 9);
  };

  // Effect to update TIN when NIC changes and user is not a foreigner
  useEffect(() => {
    if (!isForeigner && formData.nicNumber) {
      const generatedTIN = generateTINFromNIC(formData.nicNumber);
      setFormData(prev => ({
        ...prev,
        tin: generatedTIN
      }));
    }
  }, [formData.nicNumber, isForeigner]);

  const validateNIC = (nic) => {
    const nicRegex = /^(\d{9}[vVxX]|\d{12})$/;
    return nicRegex.test(nic);
  };

  const validatePassport = (passport) => {
    return passport.length >= 6;
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateAnnualIncome = (income) => {
    return !isNaN(income) && parseFloat(income) >= 1000;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Validate required fields
    if (!formData.residentialAddress) {
      newErrors.residentialAddress = 'Residential Address is required';
      isValid = false;
    }
    if (!formData.annualIncome) {
      newErrors.annualIncome = 'Annual Income is required';
      isValid = false;
    } else if (!validateAnnualIncome(formData.annualIncome)) {
      newErrors.annualIncome = 'Annual Income must be at least LKR 1,000';
      isValid = false;
    }
    if (!formData.maritalStatus) {
      newErrors.maritalStatus = 'Marital Status is required';
      isValid = false;
    }
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile is required';
      isValid = false;
    } else if (!validateMobile(formData.mobile)) {
      newErrors.mobile = 'Mobile must be 10 digits';
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }
    if (!formData.declarationName) {
      newErrors.declarationName = 'Declaration Name is required';
      isValid = false;
    }
    if (!formData.declarationId) {
      newErrors.declarationId = 'Declaration ID is required';
      isValid = false;
    }
    if (!formData.declarationSignature) {
      newErrors.declarationSignature = 'Signature is required';
      isValid = false;
    }
    if (!formData.declarationDate) {
      newErrors.declarationDate = 'Date is required';
      isValid = false;
    }

    // Date validations
    if (formData.dateOfBirth) {
      const dobDate = new Date(formData.dateOfBirth);
      if (dobDate > currentDate) {
        newErrors.dateOfBirth = 'Date of Birth cannot be in the future';
        isValid = false;
      }
    }

    if (formData.passportExpiryDate) {
      const expiryDate = new Date(formData.passportExpiryDate);
      if (expiryDate < currentDate) {
        newErrors.passportExpiryDate = 'Passport expiry date cannot be in the past';
        isValid = false;
      }
    }

    if (formData.arrivalDate) {
      const arrivalDate = new Date(formData.arrivalDate);
      if (arrivalDate > currentDate) {
        newErrors.arrivalDate = 'Arrival date cannot be in the future';
        isValid = false;
      }
    }

    if (formData.businessStartDate) {
      const businessStartDate = new Date(formData.businessStartDate);
      if (businessStartDate > currentDate) {
        newErrors.businessStartDate = 'Business start date cannot be in the future';
        isValid = false;
      }
    }

    if (formData.declarationDate) {
      const declarationDate = new Date(formData.declarationDate);
      if (declarationDate > currentDate) {
        newErrors.declarationDate = 'Declaration date cannot be in the future';
        isValid = false;
      }
    }

    // Validate citizen/foreigner specific fields
    if (!isForeigner) {
      if (!formData.nicNumber) {
        newErrors.nicNumber = 'NIC Number is required';
        isValid = false;
      } else if (!validateNIC(formData.nicNumber)) {
        newErrors.nicNumber = 'NIC must be 10 digits or 12 characters (9 digits + V/X)';
        isValid = false;
      }
    } else {
      if (!formData.passportNumber) {
        newErrors.passportNumber = 'Passport Number is required';
        isValid = false;
      } else if (!validatePassport(formData.passportNumber)) {
        newErrors.passportNumber = 'Passport Number must be at least 6 characters';
        isValid = false;
      }
      if (!formData.passportExpiryDate) {
        newErrors.passportExpiryDate = 'Passport Expiry Date is required';
        isValid = false;
      }
      if (!formData.arrivalDate) {
        newErrors.arrivalDate = 'Arrival Date is required';
        isValid = false;
      }
      if (!formData.passportIssuanceCountry) {
        newErrors.passportIssuanceCountry = 'Passport Issuance Country is required';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await axios.post('http://localhost:5000/taxpayers/register', formData);
      navigate('/documents');
    } catch (error) {
      console.error('Error submitting form:', error);
      setServerError('Failed to submit the form. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 py-4 px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                APPLICATION FORM FOR TAXPAYER REGISTRATION
              </h1>
              <p className="text-blue-100">(For Individuals)</p>
            </div>
            <div className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
              Required fields marked with *
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Section A - For Sri Lanka Citizens */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">
              SECTION A (For Sri Lanka Citizens)
            </h2>
            <div className="flex items-center space-x-4 mb-4">
              <input
                type="checkbox"
                checked={!isForeigner}
                onChange={() => setIsForeigner(false)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <label className="text-gray-700 font-medium">I am a Sri Lanka Citizen</label>
            </div>
            {!isForeigner && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  National Identity Card Number (NIC) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nicNumber"
                  value={formData.nicNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.nicNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2`}
                  required
                  placeholder="Enter NIC number"
                />
                {errors.nicNumber && <p className="mt-1 text-sm text-red-600">{errors.nicNumber}</p>}
              </div>
            )}
          </div>

          {/* Section B - For Foreigner */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">
              SECTION B (For Foreigner)
            </h2>
            <div className="flex items-center space-x-4 mb-4">
              <input
                type="checkbox"
                checked={isForeigner}
                onChange={() => setIsForeigner(true)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <label className="text-gray-700 font-medium">I am a Foreigner</label>
            </div>
            {isForeigner && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Passport No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.passportNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2`}
                    required
                    placeholder="Enter passport number"
                  />
                  {errors.passportNumber && <p className="mt-1 text-sm text-red-600">{errors.passportNumber}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Expiry of Passport <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="passportExpiryDate"
                    value={formData.passportExpiryDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.passportExpiryDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2`}
                    required
                  />
                  {errors.passportExpiryDate && <p className="mt-1 text-sm text-red-600">{errors.passportExpiryDate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Arrival to Sri Lanka <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="arrivalDate"
                    value={formData.arrivalDate}
                    onChange={handleChange}
                    max={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.arrivalDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2`}
                    required
                  />
                  {errors.arrivalDate && <p className="mt-1 text-sm text-red-600">{errors.arrivalDate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country of Issuance of Passport <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="passportIssuanceCountry"
                    value={formData.passportIssuanceCountry}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.passportIssuanceCountry ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2`}
                    required
                    placeholder="Enter country name"
                  />
                  {errors.passportIssuanceCountry && <p className="mt-1 text-sm text-red-600">{errors.passportIssuanceCountry}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Personal Details */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">
              PERSONAL DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salutation
                </label>
                <select
                  name="salutation"
                  value={formData.salutation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name with Initials (English)
                </label>
                <input
                  type="text"
                  name="nameWithInitialsEnglish"
                  value={formData.nameWithInitialsEnglish}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="A.B. Perera"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name (English)
                </label>
                <input
                  type="text"
                  name="fullNameEnglish"
                  value={formData.fullNameEnglish}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Anura Bandara Perera"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.dateOfBirth ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2`}
                />
                {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country of Birth
                </label>
                <input
                  type="text"
                  name="countryOfBirth"
                  value={formData.countryOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Sri Lanka"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nationality
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Sri Lankan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Language
                </label>
                <select
                  name="preferredLanguage"
                  value={formData.preferredLanguage}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Sinhala">Sinhala</option>
                  <option value="Tamil">Tamil</option>
                  <option value="English">English</option>
                </select>
              </div>
            </div>
          </div>

          {/* Employment Details */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">
              EMPLOYMENT DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Source of Income
                </label>
                <select
                  name="sourceOfIncome"
                  value={formData.sourceOfIncome}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Employment">Employment</option>
                  <option value="Business">Business</option>
                  <option value="Investments">Investments</option>
                  <option value="Rental Income">Rental Income</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profession
                </label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your profession"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resident Status
                </label>
                <select
                  name="residentStatus"
                  value={formData.residentStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Resident">Resident</option>
                  <option value="Non-Resident">Non-Resident</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Citizenship
                </label>
                <select
                  name="citizenship"
                  value={formData.citizenship}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Sri Lankan">Sri Lankan</option>
                  <option value="Dual Citizen">Dual Citizen</option>
                  <option value="Foreign">Foreign</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dual Citizenship
                </label>
                <select
                  name="dualCitizenship"
                  value={formData.dualCitizenship}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              {formData.dualCitizenship === 'Yes' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dual Citizenship Country
                  </label>
                  <input
                    type="text"
                    name="dualCitizenshipCountry"
                    value={formData.dualCitizenshipCountry}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter country name"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">
              ADDITIONAL DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Residential Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="residentialAddress"
                  value={formData.residentialAddress}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.residentialAddress ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2`}
                  required
                  placeholder="Enter your address"
                />
                {errors.residentialAddress && <p className="mt-1 text-sm text-red-600">{errors.residentialAddress}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Taxpayer Identification Number (TIN)
                </label>
                <input
                  type="text"
                  name="tin"
                  value={formData.tin}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isForeigner ? 'bg-gray-100' : ''}`}
                  placeholder={!isForeigner ? "Auto-generated from NIC" : "Enter TIN if available"}
                  readOnly={!isForeigner}
                />
                {!isForeigner && (
                  <p className="mt-1 text-xs text-gray-500">TIN is auto-generated from your NIC</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Annual Income <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">LKR</span>
                  <input
                    type="number"
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.annualIncome ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2`}
                    required
                    placeholder="0.00"
                    min="1000"
                  />
                </div>
                {errors.annualIncome && <p className="mt-1 text-sm text-red-600">{errors.annualIncome}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marital Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.maritalStatus ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2`}
                  required
                >
                  <option value="">Select your status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
                {errors.maritalStatus && <p className="mt-1 text-sm text-red-600">{errors.maritalStatus}</p>}
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">
              BUSINESS DETAILS (If Applicable)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter business name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Registration No.
                </label>
                <input
                  type="text"
                  name="businessRegistrationNo"
                  value={formData.businessRegistrationNo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter registration number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Activity
                </label>
                <input
                  type="text"
                  name="businessActivity"
                  value={formData.businessActivity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe business activity"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Start Date
                </label>
                <input
                  type="date"
                  name="businessStartDate"
                  value={formData.businessStartDate}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.businessStartDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2`}
                />
                {errors.businessStartDate && <p className="mt-1 text-sm text-red-600">{errors.businessStartDate}</p>}
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">
              CONTACT DETAILS <span className="text-red-500">*</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">+94</span>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-2 rounded-lg border ${errors.mobile ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2`}
                    required
                    placeholder="77 123 4567"
                  />
                </div>
                {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2`}
                  required
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Declaration */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300">
              DECLARATION
            </h2>
            <p className="text-sm text-gray-600 mb-6 italic">
              I do hereby certify that the particulars furnished by me in this application are true and correct.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="declarationName"
                  value={formData.declarationName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.declarationName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2`}
                  required
                  placeholder="Your full name"
                />
                {errors.declarationName && <p className="mt-1 text-sm text-red-600">{errors.declarationName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  National Identity Card / Passport No. <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="declarationId"
                  value={formData.declarationId}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.declarationId ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2`}
                  required
                  placeholder="NIC or Passport number"
                />
                {errors.declarationId && <p className="mt-1 text-sm text-red-600">{errors.declarationId}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Signature <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="declarationSignature"
                  value={formData.declarationSignature}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.declarationSignature ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2`}
                  required
                  placeholder="Type your full name as signature"
                />
                {errors.declarationSignature && <p className="mt-1 text-sm text-red-600">{errors.declarationSignature}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="declarationDate"
                  value={formData.declarationDate}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.declarationDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2`}
                  required
                />
                {errors.declarationDate && <p className="mt-1 text-sm text-red-600">{errors.declarationDate}</p>}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Submit Registration
            </button>
          </div>

          {serverError && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
              {serverError}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default TaxpayerRegistrationForm;