import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    taxId: "",
    username: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    // Tax ID Validation
    if (!formData.taxId) newErrors.taxId = "Tax ID is required";
    else if (!/^[A-Z0-9]{9,12}$/.test(formData.taxId))
      newErrors.taxId = "Invalid Tax ID format";

    // Username Validation
    if (!formData.username) newErrors.username = "Username is required";

    // Email Validation
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";

    // Phone Validation
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/\+?[1-9]\d{1,14}$/.test(formData.phone))
      newErrors.phone = "Invalid phone number";

    // Address Validation
    if (!formData.street) newErrors.street = "Street address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.postalCode) newErrors.postalCode = "Postal code is required";
    else if (!/^\d{5}(-\d{4})?$/.test(formData.postalCode))
      newErrors.postalCode = "Invalid postal code";

    // Password Validation
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    else if (!/[A-Z]/.test(formData.password))
      newErrors.password = "Must contain an uppercase letter";
    else if (!/[a-z]/.test(formData.password))
      newErrors.password = "Must contain a lowercase letter";
    else if (!/\d/.test(formData.password))
      newErrors.password = "Must contain a number";
    else if (!/[\W_]/.test(formData.password))
      newErrors.password = "Must contain a special character";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const payload = {
        ...formData,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
        },
      };
  
      // Remove individual address fields from the payload
      delete payload.street;
      delete payload.city;
      delete payload.state;
      delete payload.postalCode;
  
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccessMessage(data.message || "Signup Successful!");
        setFormData({
          taxId: "",
          username: "",
          email: "",
          phone: "",
          street: "",
          city: "",
          state: "",
          postalCode: "",
          password: "",
        });

      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-10">
      <div className="w-full max-w-lg bg-gradient-to-b from-[#20224e] to-[#2b2d78] text-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-[#eeb029] mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Success Message */}
          {successMessage && (
            <p className="text-green-500 text-sm text-center">{successMessage}</p>
          )}

          {/* Tax ID */}
          <div>
            <label className="text-sm font-semibold">Tax ID</label>
            <input
              type="text"
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
              className="text-black w-full mt-1 px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
            />
            <p className="text-red-500 text-xs">{errors.taxId}</p>
          </div>

          {/* Username */}
          <div>
            <label className="text-sm font-semibold">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="text-black w-full mt-1 px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
            />
            <p className="text-red-500 text-xs">{errors.username}</p>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="text-black w-full mt-1 px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
            />
            <p className="text-red-500 text-xs">{errors.email}</p>
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-semibold">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="text-black w-full mt-1 px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
            />
            <p className="text-red-500 text-xs">{errors.phone}</p>
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-semibold">Street Address</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="text-black w-full mt-1 px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
            />
            <p className="text-red-500 text-xs">{errors.street}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="text-black w-full mt-1 px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
              />
              <p className="text-red-500 text-xs">{errors.city}</p>
            </div>
            <div>
              <label className="text-sm font-semibold">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="text-black w-full mt-1 px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
              />
              <p className="text-red-500 text-xs">{errors.state}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="text-black w-full mt-1 px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
            />
            <p className="text-red-500 text-xs">{errors.postalCode}</p>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="text-black w-full mt-1 px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
            />
            <p className="text-red-500 text-xs">{errors.password}</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-[#eeb029] text-[#2b2d78] py-2 rounded-md font-semibold hover:scale-105 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-[#eeb029] font-semibold hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;