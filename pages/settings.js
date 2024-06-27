import React, { useState } from "react";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

const Settings = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCreateUserMode, setIsCreateUserMode] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Church Admin" },
    { id: 2, name: "Jane Smith", role: "Accounts Clerk" },
    { id: 3, name: "Mark Johnson", role: "Minister In Charge" },
  ]);

  const [newUser, setNewUser] = useState({
    fullName: "",
    username: "",
    password: "password",
    role: "Super Admin",
  });

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleToggleCreateUser = () => {
    setIsCreateUserMode(!isCreateUserMode);
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    setUsers([
      ...users,
      { id: users.length + 1, name: newUser.fullName, role: newUser.role },
    ]);
    setNewUser({
      fullName: "",
      username: "",
      password: "password",
      role: "Super Admin",
    });
    setIsCreateUserMode(false);
  };

  return (
    <Layout>
      <div>
        <div className="max-w-4xl mx-auto px-4 bg-white mb-2 py-4 rounded">
          {/* User Profile Settings */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">User Profile</h2>
            {!isEditMode && (
              <button
                onClick={handleEditClick}
                className="bg-transparent hover:bg-gray-100 text-gray-500 hover:text-gray-700 px-2 rounded"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            )}
          </div>
          <hr className="mb-4"></hr>
          <div>
            {isEditMode ? (
              <form className="">
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">
                    Full Name
                  </label>
                  <input type="text" className="w-full border rounded p-2" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">
                    Username
                  </label>
                  <input type="text" className="w-full border rounded p-2" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">
                    Change Password
                  </label>
                  <input
                    type="password"
                    className="w-full border rounded p-2"
                  />
                </div>
                {/* Button to save changes */}
                <button className="text-sm hover:bg-green-300 bg-gray-300 font-semibold text-black py-1 px-4 rounded">
                  Save Changes
                </button>
              </form>
            ) : (
              <div>
                {/* Display user profile settings */}
                <p>Name: John Doe</p>
                <p>Role: Church Administrator</p>
              </div>
            )}
          </div>
        </div>

        {/* Theme Settings */}
        <div className="max-w-4xl mx-auto px-4 py-2 bg-white rounded">
          <h2 className="text-lg font-semibold mb-4">
            Theme
            <hr className="mb-4"></hr>
          </h2>
          {/* Radio buttons for theme options */}
          <div className="flex items-center mb-4">
            <input type="radio" id="lightTheme" name="theme" className="mr-2" />
            <label htmlFor="lightTheme">Light Theme</label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="darkTheme" name="theme" className="mr-2" />
            <label htmlFor="darkTheme">Dark Theme</label>
          </div>
        </div>

        <h1 className="text-center text-xs font-bold text-gray-700 my-4">
          ADMIN ONLY
        </h1>
        <div className="max-w-4xl mx-auto px-4 py-4 bg-white rounded">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              {isCreateUserMode ? "Create New User" : "User Accounts"}
            </h2>
            <button
              onClick={handleToggleCreateUser}
              className="bg-transparent hover:bg-gray-100 text-gray-500 hover:text-gray-700 px-2 rounded"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <hr className="mb-4"></hr>
          {isCreateUserMode ? (
            <form className="mb-4" onSubmit={handleCreateUser}>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={newUser.fullName}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Role</label>
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                >
                  <option>Super Admin</option>
                  <option>Church Administrator</option>
                  <option>Accounts Clerk</option>
                  <option>Minister In Charge</option>
                  <option>Cathecist</option>
                  <option>Senior Presbyter</option>
                </select>
              </div>
              <button className="text-sm hover:bg-green-300 bg-gray-300 font-semibold text-black py-1 px-4 rounded">
                Create User
              </button>
            </form>
          ) : (
            <div>
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center mb-2 p-2 border rounded"
                >
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.role}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="bg-transparent hover:bg-gray-100 text-gray-500 hover:text-gray-700 px-2 rounded">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="bg-transparent hover:bg-red-100 text-red-500 hover:text-red-700 px-2 rounded">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
