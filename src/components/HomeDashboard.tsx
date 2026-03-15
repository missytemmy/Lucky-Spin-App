import React from 'react';
import { motion } from 'motion/react';
import { User, Bell, Gift, History, Play, Sparkles } from 'lucide-react';
import { Screen } from '../App';
import { soundManager } from '../utils/sound';

interface HomeDashboardProps {
  phone: string;
  spinsLeft: number;
  onNavigate: (screen: Screen) => void;
}

const HomeDashboard: React.FC<HomeDashboardProps> = ({ phone, spinsLeft, onNavigate }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-slate-950 flex flex-col"
    >
      {/* AppBar */}
      <div className="flex items-center justify-between p-6 pt-12">
        <button 
          onClick={() => {
            soundManager.playClick();
            onNavigate('profile');
          }}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity text-left"
        >
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
            <User className="w-5 h-5 text-slate-300" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Welcome back,</p>
            <p className="font-semibold text-sm">{phone || 'Guest User'}</p>
          </div>
        </button>
        <button 
          onClick={() => {
            soundManager.playClick();
            onNavigate('notifications');
          }}
          className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center relative hover:bg-slate-800 transition-colors"
        >
          <Bell className="w-5 h-5 text-slate-300" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>

      <div className="flex-1 px-6 pb-6 flex flex-col gap-6 overflow-y-auto">
        {/* Spin Count Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-6 relative overflow-hidden shadow-lg shadow-purple-900/20"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-purple-200 font-medium mb-1">Available Spins</p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-white">{spinsLeft}</span>
                <span className="text-purple-300 mb-1">spins</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
              <Gift className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </motion.div>

        {/* Big Spin Button */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 flex items-center justify-center py-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              soundManager.playClick();
              onNavigate('spin');
            }}
            disabled={spinsLeft === 0}
            className={`relative group ${spinsLeft === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative w-48 h-48 rounded-full bg-gradient-to-b from-yellow-300 to-yellow-600 p-2 shadow-2xl">
              <div className="w-full h-full rounded-full bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col items-center justify-center border-4 border-yellow-500/50">
                <Sparkles className="w-8 h-8 text-yellow-400 mb-2" />
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-500 tracking-wider">
                  SPIN
                </span>
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-500 tracking-wider">
                  NOW
                </span>
              </div>
            </div>
          </motion.button>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          <button 
            onClick={() => {
              soundManager.playClick();
              onNavigate('history');
            }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-slate-800 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
              <History className="w-6 h-6 text-purple-400" />
            </div>
            <span className="font-medium text-sm">Reward History</span>
          </button>
          
          <button 
            onClick={() => {
              soundManager.playClick();
              onNavigate('howToPlay');
            }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-slate-800 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Play className="w-6 h-6 text-blue-400" />
            </div>
            <span className="font-medium text-sm">How to Play</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default HomeDashboard;
