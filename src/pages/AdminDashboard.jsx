import React, { useEffect, useState } from "react";
import UserManagement from "../components/UserManagement";

const AdminDashboard = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if the user is an admin
  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to verify admin");

        const data = await response.json();
        setIsAdmin(data.user.role === "manager");
      } catch (error) {
        console.error("Error verifying admin:", error);
        alert("You are not authorized to access this page.");
        window.location.href = "/";
      }
    };

    if (token) verifyAdmin();
  }, [token]);

  if (!isAdmin) {
    return <div className="text-center mt-10">Access Denied. Only admins can access this page.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#2b2d78] text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </header>

      <main className="p-6">
        <UserManagement />
      </main>
    </div>
  );
};

export default AdminDashboard;