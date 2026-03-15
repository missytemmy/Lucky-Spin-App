import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Gift, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { Reward } from '../App';
import { soundManager } from '../utils/sound';

interface RewardHistoryScreenProps {
  history: Reward[];
  onBack: () => void;
}

const RewardHistoryScreen: React.FC<RewardHistoryScreenProps> = ({ history, onBack }) => {
  return (
    <motion.div 
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-slate-950 flex flex-col"
    >
      {/* Header */}
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
        <h1 className="flex-1 text-center text-lg font-bold mr-10">Reward History</h1>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-6">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500">
            <Gift className="w-16 h-16 mb-4 opacity-20" />
            <p>No rewards yet.</p>
            <p className="text-sm">Spin the wheel to win!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => (
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 flex items-center justify-center shrink-0">
                  <Gift className="w-6 h-6 text-yellow-500" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-lg truncate mb-1">{item.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <div className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md text-xs font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{item.status}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default RewardHistoryScreen;
