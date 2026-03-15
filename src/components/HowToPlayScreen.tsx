import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Dices, Gift, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface HowToPlayScreenProps {
  onBack: () => void;
}

const HowToPlayScreen: React.FC<HowToPlayScreenProps> = ({ onBack }) => {
  const steps = [
    {
      icon: Dices,
      title: '1. Get Spins',
      description: 'Log in daily or complete tasks to earn free spins.',
      color: 'text-blue-400',
      bg: 'bg-blue-400/10'
    },
    {
      icon: Sparkles,
      title: '2. Spin the Wheel',
      description: 'Tap the SPIN NOW button and wait for the wheel to stop.',
      color: 'text-purple-400',
      bg: 'bg-purple-400/10'
    },
    {
      icon: Gift,
      title: '3. Win Rewards',
      description: 'Land on a prize segment to instantly win data, voice minutes, or ETB.',
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10'
    },
    {
      icon: CheckCircle2,
      title: '4. Claim Prizes',
      description: 'Your rewards are automatically added to your account history.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10'
    }
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
        <h1 className="flex-1 text-center text-lg font-bold mr-10">How to Play</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start gap-4"
            >
              <div className={`w-12 h-12 rounded-full ${step.bg} flex items-center justify-center shrink-0`}>
                <step.icon className={`w-6 h-6 ${step.color}`} />
              </div>
              <div className="flex-1 mt-1">
                <h3 className="font-bold text-white text-lg mb-1">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Need to import Sparkles since it's used in steps array but not imported at top
import { Sparkles } from 'lucide-react';

export default HowToPlayScreen;
