import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Bell, Sparkles, Gift } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface NotificationsScreenProps {
  onBack: () => void;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onBack }) => {
  const notifications = [
    { id: 1, title: 'Welcome to Lucky Spin!', message: 'Enjoy your first 3 free spins on us.', icon: Sparkles, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { id: 2, title: 'Daily Reward Available', message: 'Come back tomorrow for more free spins.', icon: Gift, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];

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
        <h1 className="flex-1 text-center text-lg font-bold mr-10">Notifications</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {notifications.map((notif, index) => (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              key={notif.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start gap-4"
            >
              <div className={`w-12 h-12 rounded-full ${notif.bg} flex items-center justify-center shrink-0`}>
                <notif.icon className={`w-6 h-6 ${notif.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-md mb-1">{notif.title}</h3>
                <p className="text-sm text-slate-400">{notif.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationsScreen;
