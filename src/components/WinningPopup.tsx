import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface WinningPopupProps {
  reward: string;
  onClose: () => void;
}

const WinningPopup: React.FC<WinningPopupProps> = ({ reward, onClose }) => {
  useEffect(() => {
    soundManager.playWin();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 50, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="w-full max-w-sm bg-gradient-to-b from-indigo-900 to-slate-900 rounded-[2rem] p-1 relative overflow-hidden shadow-2xl shadow-yellow-500/20"
      >
        {/* Animated border gradient */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(250,204,21,1)_360deg)]"
        />
        
        <div className="relative bg-slate-900 rounded-[1.8rem] p-8 flex flex-col items-center text-center">
          {/* Confetti/Stars background */}
          <div className="absolute inset-0 overflow-hidden rounded-[1.8rem] pointer-events-none">
            {[...Array(30)].map((_, i) => {
              const randomColor = ['bg-yellow-400', 'bg-purple-400', 'bg-blue-400', 'bg-pink-400', 'bg-emerald-400'][Math.floor(Math.random() * 5)];
              const isCircle = Math.random() > 0.5;
              return (
                <motion.div
                  key={i}
                  initial={{ 
                    y: 100, 
                    x: 0,
                    opacity: 1,
                    scale: 0,
                    rotate: 0
                  }}
                  animate={{ 
                    y: -300 - Math.random() * 200,
                    x: (Math.random() - 0.5) * 400,
                    opacity: [1, 1, 0],
                    scale: Math.random() * 1 + 0.5,
                    rotate: Math.random() * 360 * 3
                  }}
                  transition={{ 
                    duration: 1.5 + Math.random() * 1.5,
                    ease: "easeOut",
                    delay: Math.random() * 0.2
                  }}
                  className={`absolute bottom-1/4 left-1/2 w-3 h-3 ${randomColor} ${isCircle ? 'rounded-full' : 'rounded-sm'}`}
                />
              );
            })}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                initial={{ 
                  y: 100, 
                  x: Math.random() * 200 - 100,
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  y: -200,
                  x: Math.random() * 200 - 100,
                  opacity: [0, 1, 0],
                  scale: Math.random() * 1 + 0.5
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                className="absolute bottom-0 left-1/2"
              >
                <Sparkles className="w-6 h-6 text-yellow-400/80" />
              </motion.div>
            ))}
          </div>

          <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(250,204,21,0.4)] relative z-10">
            <Trophy className="w-12 h-12 text-slate-900" />
          </div>
          
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 mb-2 relative z-10">
            YOU WON!
          </h2>
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl py-4 px-8 mb-8 w-full relative z-10">
            <p className="text-2xl font-bold text-white">{reward}</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-slate-900 font-bold text-lg rounded-xl py-4 shadow-[0_0_20px_rgba(250,204,21,0.3)] relative z-10"
          >
            Take Reward
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default WinningPopup;
