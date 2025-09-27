import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService.js';
import './index.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [monkeys, setMonkeys] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest();

  useEffect(() => {
    const checkConnectionAndSession = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const result = await testBackendConnection();
      setBackendConnected(result.success);
      
      if (result.success) {
        console.log('✅ [APP] Backend connection successful. Checking user session.');
        try {
          const user = await manifest.from('User').me();
          setCurrentUser(user);
          setCurrentScreen('dashboard');
        } catch (error) {
          setCurrentUser(null);
          setCurrentScreen('landing');
        }
      } else {
        console.error('❌ [APP] Backend connection failed. App may not function correctly.');
        console.error('❌ [APP] Connection error:', result.error);
      }
    };
    
    checkConnectionAndSession();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const user = await manifest.from('User').me();
      setCurrentUser(user);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setCurrentUser(null);
    setMonkeys([]);
    setCurrentScreen('landing');
  };

  const loadMonkeys = async () => {
    try {
      const response = await manifest.from('Monkey').find({
        include: ['researcher'],
        sort: { createdAt: 'desc' }
      });
      setMonkeys(response.data);
    } catch (error) {
      console.error('Failed to load monkeys:', error);
    }
  };

  const createMonkey = async (monkeyData) => {
    try {
      const newMonkey = await manifest.from('Monkey').create(monkeyData);
      // Refetch all monkeys to get the newly created one with researcher info
      await loadMonkeys();
    } catch (error) {
      console.error('Failed to create monkey:', error);
      alert(`Error creating monkey: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-xs font-medium text-gray-700">{backendConnected ? 'Backend Connected' : 'Disconnected'}</span>
      </div>
      
      {currentScreen === 'landing' ? (
        <LandingPage onLogin={handleLogin} />
      ) : (
        <DashboardPage 
          user={currentUser} 
          monkeys={monkeys} 
          onLogout={handleLogout} 
          onLoadMonkeys={loadMonkeys}
          onCreateMonkey={createMonkey}
        />
      )}
    </div>
  );
}

export default App;
