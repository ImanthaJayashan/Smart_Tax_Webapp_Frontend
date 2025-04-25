import React, { useEffect, useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    role: "",
  });

  // Fetch All Users
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to load users. Please try again.");
    }
  };

  // Fetch User Details
  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user details");

      const data = await response.json();
      setSelectedUser(data.user);
      setFormData({
        name: data.user.name || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
        street: data.user.address?.street || "",
        city: data.user.address?.city || "",
        state: data.user.address?.state || "",
        postalCode: data.user.address?.postalCode || "",
        role: data.user.role || "",
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
      alert("Failed to load user details. Please try again.");
    }
  };

  // Update User
  const handleUpdateUser = async (e, userId) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update user");

      alert("User updated successfully!");
      fetchUsers(); 
      setSelectedUser(null); 
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  // Delete User
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete user");

      alert("User deleted successfully!");
      fetchUsers(); 
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {/* User List */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">User List</h2>
        <table className="w-full bg-white rounded shadow text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.phone}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => fetchUserDetails(user._id)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Form */}
      {selectedUser && (
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Edit User</h2>
          <form onSubmit={(e) => handleUpdateUser(e, selectedUser._id)} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="text-black w-full px-3 py-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="text-black w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="text-black w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              className="text-black w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="text-black w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="text-black w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              className="text-black w-full px-3 py-2 border rounded"
            />
            <select
              name="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="text-black w-full px-3 py-2 border rounded"
            >
              <option value="user">User</option>
              <option value="admin">admin</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              className="w-full bg-[#2b2d78] text-white py-2 rounded hover:bg-[#eeb029]"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserManagement;