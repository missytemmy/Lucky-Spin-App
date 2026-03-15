import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, KeyRound, ArrowRight, Dices } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface LoginScreenProps {
  onLogin: (phone: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length > 5) {
      soundManager.playClick();
      onLogin(phone);
    }
  };

  return (
    <motion.div 
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-slate-950 flex flex-col"
    >
      <div className="h-1/3 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-b-[3rem] p-8 flex flex-col items-center justify-end relative overflow-hidden shadow-lg shadow-purple-900/20">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-64 h-64 border-[40px] border-white/5 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-10 -left-10 w-40 h-40 border-[20px] border-white/5 rounded-full"
        />
        
        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-xl border border-white/20 z-10">
          <Dices className="w-10 h-10 text-yellow-400" />
        </div>
        <h1 className="text-3xl font-bold text-white z-10">Welcome</h1>
        <p className="text-purple-200 mt-2 z-10">Sign in to claim your rewards</p>
      </div>

      <div className="flex-1 p-8 flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 ml-1">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+251 911 234 567"
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 ml-1">OTP Verification</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <KeyRound className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 4-digit OTP"
                maxLength={4}
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-slate-900 font-bold text-lg rounded-2xl py-4 mt-8 flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.3)]"
          >
            Login to Play
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}

export default LoginScreen;
