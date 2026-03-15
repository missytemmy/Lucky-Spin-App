import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, Phone, Trophy, LogOut } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface ProfileScreenProps {
  phone: string;
  totalRewards: number;
  onBack: () => void;
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ phone, totalRewards, onBack, onLogout }) => {
  return (
    <motion.div 
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-slate-950 flex flex-col"
    >
      <div className="flex items-center p-6 pt-12 bg-slate-900 border-b border-slate-800 z-10">
        <button 
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold mr-10">My Profile</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 mb-6 shadow-[0_0_30px_rgba(124,58,237,0.3)]"
        >
          <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-purple-400" />
          </div>
        </motion.div>

        <h2 className="text-2xl font-bold text-white mb-1">Player</h2>
        <p className="text-slate-400 mb-8 flex items-center gap-2">
          <Phone className="w-4 h-4" />
          {phone || 'Guest User'}
        </p>

        <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Rewards Won</p>
              <p className="text-xl font-bold text-white">{totalRewards}</p>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            soundManager.playClick();
            onLogout();
          }}
          className="w-full bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-lg rounded-2xl py-4 mt-auto flex items-center justify-center hover:bg-red-500/20 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProfileScreen;
