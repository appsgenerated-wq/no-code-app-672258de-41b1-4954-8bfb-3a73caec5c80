import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, monkeys, onLogout, onLoadMonkeys, onCreateMonkey }) => {
  const [newMonkey, setNewMonkey] = useState({ name: '', species: '', bio: '', habitat: 'Rainforest' });

  useEffect(() => {
    onLoadMonkeys();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMonkey(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateMonkey = async (event) => {
    event.preventDefault();
    if (!newMonkey.name || !newMonkey.species) {
      alert('Name and species are required.');
      return;
    }
    await onCreateMonkey(newMonkey);
    setNewMonkey({ name: '', species: '', bio: '', habitat: 'Rainforest' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">MonkeyPedia Dashboard</h1>
            <p className="text-gray-600">Welcome, {user?.name}! ({user?.role})</p>
          </div>
          <div className="flex items-center gap-4">
             <a 
              href={`${config.BACKEND_URL}/admin`} 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
            >
              Admin
            </a>
            <button 
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create New Monkey Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Monkey</h2>
            <form onSubmit={handleCreateMonkey} className="space-y-4">
              <input type="text" name="name" placeholder="Name" value={newMonkey.name} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" required />
              <input type="text" name="species" placeholder="Species" value={newMonkey.species} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" required />
              <textarea name="bio" placeholder="Biography" value={newMonkey.bio} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md h-24 focus:ring-green-500 focus:border-green-500" />
              <select name="habitat" value={newMonkey.habitat} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-green-500 focus:border-green-500">
                <option>Rainforest</option>
                <option>Savannah</option>
                <option>Mountains</option>
                <option>Woodland</option>
              </select>
              <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors">Add Monkey</button>
            </form>
          </div>

          {/* Monkeys List */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Monkey Catalog</h2>
            {monkeys.length === 0 ? (
              <p className="text-gray-500">No monkeys have been added yet. Add one using the form!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {monkeys.map(monkey => (
                  <div key={monkey.id} className="border border-gray-200 rounded-lg p-4 flex flex-col">
                    <h3 className="font-bold text-lg text-gray-900">{monkey.name}</h3>
                    <p className="text-gray-600 text-sm italic mb-2">{monkey.species}</p>
                    <p className="text-gray-700 flex-grow text-sm mb-3">{monkey.bio}</p>
                    <div className="mt-auto pt-3 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
                      <span>Habitat: <span className="font-medium text-gray-700">{monkey.habitat}</span></span>
                      <span>By: {monkey.researcher?.name || 'N/A'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
