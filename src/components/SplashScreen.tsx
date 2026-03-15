import { motion } from 'motion/react';
import { Loader2, Sparkles } from 'lucide-react';

export default function SplashScreen() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-950 flex flex-col items-center justify-between py-20"
    >
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.5, duration: 1 }}
          className="w-32 h-32 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-200 p-1 shadow-[0_0_40px_rgba(250,204,21,0.4)] mb-8 flex items-center justify-center"
        >
          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
            <Sparkles className="w-16 h-16 text-yellow-400" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[conic-gradient(transparent_0deg,rgba(250,204,21,0.2)_90deg,transparent_180deg)]"
            />
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 mb-2"
        >
          Lucky Spin Rewards
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-purple-200 font-medium tracking-widest uppercase text-sm"
        >
          Spin and Win
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col items-center"
      >
        <Loader2 className="w-8 h-8 text-yellow-400 animate-spin mb-4" />
        <p className="text-purple-300/60 text-sm">Loading amazing rewards...</p>
      </motion.div>
    </motion.div>
  );
}
