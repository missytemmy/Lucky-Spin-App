/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import HomeDashboard from './components/HomeDashboard';
import SpinWheelScreen from './components/SpinWheelScreen';
import RewardHistoryScreen from './components/RewardHistoryScreen';
import WinningPopup from './components/WinningPopup';
import NotificationsScreen from './components/NotificationsScreen';
import ProfileScreen from './components/ProfileScreen';
import HowToPlayScreen from './components/HowToPlayScreen';

export type Screen = 'splash' | 'login' | 'home' | 'spin' | 'history' | 'notifications' | 'profile' | 'howToPlay';

export interface Reward {
  id: string;
  name: string;
  date: string;
  time: string;
  status: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [phone, setPhone] = useState('');
  const [spinsLeft, setSpinsLeft] = useState(3);
  const [history, setHistory] = useState<Reward[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [wonReward, setWonReward] = useState<string | null>(null);

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => setCurrentScreen('login'), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleLogin = (phoneNumber: string) => {
    setPhone(phoneNumber);
    setCurrentScreen('home');
  };

  const handleSpinResult = (reward: string) => {
    setWonReward(reward);
    setShowPopup(true);
    setSpinsLeft(prev => Math.max(0, prev - 1));
    
    const now = new Date();
    const newReward: Reward = {
      id: Math.random().toString(36).substring(2, 9),
      name: reward,
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      status: 'Claimed'
    };
    setHistory(prev => [newReward, ...prev]);
  };

  const closePopup = () => {
    setShowPopup(false);
    setWonReward(null);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setPhone('');
    setHistory([]);
    setSpinsLeft(3);
    setCurrentScreen('login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center overflow-hidden font-sans">
      {/* Mobile App Container */}
      <div className="w-full max-w-md h-[100dvh] sm:h-[850px] sm:rounded-[2.5rem] sm:border-[8px] border-slate-900 bg-slate-950 relative overflow-hidden shadow-2xl shadow-purple-900/20">
        <AnimatePresence mode="wait">
          {currentScreen === 'splash' && <SplashScreen key="splash" />}
          {currentScreen === 'login' && <LoginScreen key="login" onLogin={handleLogin} />}
          {currentScreen === 'home' && (
            <HomeDashboard 
              key="home" 
              phone={phone} 
              spinsLeft={spinsLeft} 
              onNavigate={setCurrentScreen} 
            />
          )}
          {currentScreen === 'spin' && (
            <SpinWheelScreen 
              key="spin" 
              spinsLeft={spinsLeft} 
              onBack={() => setCurrentScreen('home')}
              onSpinComplete={handleSpinResult}
            />
          )}
          {currentScreen === 'history' && (
            <RewardHistoryScreen 
              key="history" 
              history={history} 
              onBack={() => setCurrentScreen('home')} 
            />
          )}
          {currentScreen === 'notifications' && (
            <NotificationsScreen 
              key="notifications" 
              onBack={() => setCurrentScreen('home')} 
            />
          )}
          {currentScreen === 'profile' && (
            <ProfileScreen 
              key="profile" 
              phone={phone}
              totalRewards={history.length}
              onBack={() => setCurrentScreen('home')} 
              onLogout={handleLogout}
            />
          )}
          {currentScreen === 'howToPlay' && (
            <HowToPlayScreen 
              key="howToPlay" 
              onBack={() => setCurrentScreen('home')} 
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showPopup && wonReward && (
            <WinningPopup 
              key="popup" 
              reward={wonReward} 
              onClose={closePopup} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
