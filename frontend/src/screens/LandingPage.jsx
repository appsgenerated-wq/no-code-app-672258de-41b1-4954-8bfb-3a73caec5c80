import React from 'react';
import config from '../constants.js';

const LandingPage = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-green-600">MonkeyPedia</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Discover and document the fascinating world of monkeys. Built entirely with React and the Manifest backend platform.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => onLogin('researcher@manifest.build', 'password')} // Default demo user credentials
            className="w-full sm:w-auto bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Login as Demo Researcher
          </button>
          <a 
            href={`${config.BACKEND_URL}/admin`} 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Admin Panel
          </a>
        </div>
         <p className="text-sm text-gray-500 mt-8">
          Admin credentials: admin@manifest.build / admin
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
