import React from "react";

const UserList = ({ users, showUsers, handleEdit, handleDelete }) => {
  if (!showUsers) return null;

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Users List
      </h3>

      <div className="flex flex-wrap justify-start gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-xl shadow-md p-4 w-full sm:w-[48%] md:w-[31%] lg:w-[23%]"
          >
            <div className="mb-4">
              <p className="text-gray-500 text-sm">Username</p>
              <p className="text-lg font-semibold text-gray-800">
                {user.name}
              </p>
            </div>

            <div className="flex justify-between gap-2">
              <button
                onClick={() => handleEdit(user)}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
              >
                Update
              </button>

              <button
                onClick={() => handleDelete(user.id)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;