import React, { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({});

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token-based authentication
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();
      setUser(data.user);

      setFormData({
        name: data.user.name || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
        street: data.user.address?.street || "",
        city: data.user.address?.city || "",
        state: data.user.address?.state || "",
        postalCode: data.user.address?.postalCode || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Failed to load profile. Please try again.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address";

    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/\+?[1-9]\d{1,14}$/.test(formData.phone))
      newErrors.phone = "Invalid phone number";

    if (!formData.street) newErrors.street = "Street address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.postalCode) newErrors.postalCode = "Postal code is required";
    else if (!/^\d{5}(-\d{4})?$/.test(formData.postalCode))
      newErrors.postalCode = "Invalid postal code";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      alert("Profile updated successfully!");
      setIsEditing(false);
      fetchUserData(); 
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleDeleteProfile = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?")) return;

    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete profile");

      alert("Profile deleted successfully!");
      localStorage.removeItem("token"); 
      window.location.href = "/login"; 
    } catch (error) {
      console.error("Error deleting profile:", error);
      alert("Failed to delete profile. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <p className="text-lg text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-[40%] p-10 bg-[#2b2d78] text-white rounded-xl shadow-lg space-y-6 relative">
   
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-[#eeb029] rounded-full flex items-center justify-center">
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2" />
              <path
                d="M4 21c0-5 8-5 8-5s8 0 8 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-semibold">{user.name}</h2>
          <p className="text-sm opacity-80">{user.email}</p>
        </div>

        {!isEditing ? (
          <div className="space-y-2">
            <p>
              <strong>📞 Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>🏠 Address:</strong> {user.address.street}, {user.address.city},{" "}
              {user.address.state} {user.address.postalCode}
            </p>
          </div>
        ) : (
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.username}
              onChange={handleChange}
              className="text-black w-full px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
            />
            <p className="text-red-500 text-xs">{errors.name}</p>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="text-black w-full px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
            />
            <p className="text-red-500 text-xs">{errors.email}</p>

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="text-black w-full px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
            />
            <p className="text-red-500 text-xs">{errors.phone}</p>

            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
              className="text-black w-full px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
            />
            <p className="text-red-500 text-xs">{errors.street}</p>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="text-black w-full px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
              />
              <p className="text-red-500 text-xs">{errors.city}</p>

              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="text-black w-full px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
              />
              <p className="text-red-500 text-xs">{errors.state}</p>
            </div>

            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              className="text-black w-full px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
            />
            <p className="text-red-500 text-xs">{errors.postalCode}</p>

            <button
              type="submit"
              className="w-full bg-[#eeb029] text-[#2b2d78] py-2 rounded-md font-semibold hover:scale-105 transition"
            >
              Save Changes
            </button>
          </form>
        )}

        <div className="flex justify-between gap-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 bg-[#eeb029] px-4 py-2 rounded-md text-[#2b2d78] font-semibold shadow-lg hover:scale-105 transition"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.2 3.8c-.5-.5-1.3-.5-1.8 0l-7.4 7.4-2.8 2.8c-.5.5-.5 1.3 0 1.8l2.8 2.8 7.4 7.4c.5.5 1.3.5 1.8 0l2.8-2.8c.5-.5.5-1.3 0-1.8l-2.8-2.8 2.8-2.8c.5-.5.5-1.3 0-1.8l-2.8-2.8-7.4-7.4c-.5-.5-1.3-.5-1.8 0l-2.8 2.8zM17.2 6.2l-5.4 5.4-2.8 2.8 2.8-2.8 5.4-5.4z"
                fill="currentColor"
              />
            </svg>
            {isEditing ? "Cancel Edit" : "Edit Profile"}
          </button>

          <button
            onClick={handleDeleteProfile}
            className="flex items-center gap-2 bg-[#2b2d78] text-white px-4 py-2 rounded-md border border-[#eeb029] font-semibold shadow-lg hover:scale-105 transition"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"
                fill="currentColor"
              />
            </svg>
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;