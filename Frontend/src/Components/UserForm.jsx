import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserList from "./UserList";

const UserForm = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId === null) {
        // create user
        const response = await axios.post(
         `${API_URL}/users`,
          {
            name,
            password,
          }
        );

        toast.success(response.data.message);

        // Add new user dynamically
        setUsers([...users, response.data.user]);

      } else {
        //update only name
        const response = await axios.put(
         `${API_URL}/users/${editId}`,
          {
            name,
          }
        );

        toast.success(response.data.message);

        // Update UI dynamically
        setUsers(
          users.map((user) =>
            user.id === editId
              ? { ...user, name: response.data.user.name }
              : user
          )
        );

        setEditId(null);
      }

      setName("");
      setPassword("");

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const toggleUsers = async () => {
    if (showUsers) {
      setShowUsers(false);
    } else {
      try {
        const response = await axios.get(
         `${API_URL}/users`
        );

        setUsers(response.data);
        setShowUsers(true);

      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch users");
      }
    }
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEditId(user.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
       `${API_URL}/users/${id}`
      );

      toast.success(response.data.message);

      // Remove user from UI dynamically
      setUsers(users.filter((user) => user.id !== id));

    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  return (
  <div className="min-h-screen bg-gray-100 p-4">
    <ToastContainer position="top-right" autoClose={2000} />

    <div className="max-w-7xl mx-auto">
  {/* Main Heading */}
  <div className="text-center mb-8">
    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
      User Registration Form
    </h1>
    <p className="text-gray-500 mt-2">
      Create, update, and manage user details
    </p>
  </div>
      {/* Form card */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {editId === null ? "User Registration" : "Update User"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

           
            {editId === null && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {editId === null ? "Submit" : "Update"}
            </button>
          </form>
        </div>
      </div>

      {/* fetch & hide toogle */}
      <div className="flex  mb-6">
        <button
          onClick={toggleUsers}
          className="bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
        >
          {showUsers ? "Hide Users" : "Fetch Users"}
        </button>
      </div>

      
      {showUsers && (
         <UserList
  users={users}
  showUsers={showUsers}
  handleEdit={handleEdit}
  handleDelete={handleDelete}
/>
      )}
    </div>
  </div>
);
};

export default UserForm;