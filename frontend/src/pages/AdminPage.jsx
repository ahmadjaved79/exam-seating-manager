import React from 'react';
import { useNavigate } from 'react-router-dom';
const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: clear localStorage/session if storing login state
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center justify-between bg-white shadow-md p-6 rounded-lg mb-10">
        <h1 className="text-3xl font-semibold text-blue-700">🎯 Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition"
        >
          🚪 Logout
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">📋 Seat Allocator</h2>
          <p className="text-gray-600">Manage and configure student seat allocation.</p>
          <button
            onClick={() => navigate('/seat-allocator')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Allocator
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">📁 Data & Reports</h2>
          <p className="text-gray-600">View, export or clear current allocation data.</p>
          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
