import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface SpinWheelScreenProps {
  spinsLeft: number;
  onBack: () => void;
  onSpinComplete: (reward: string) => void;
}

const SEGMENTS = [
  { label: '5 Min Voice', color: '#4F46E5' }, // Indigo 600
  { label: '100 Min Voice', color: '#7C3AED' }, // Violet 600
  { label: 'Weekly 100 SMS', color: '#2563EB' }, // Blue 600
  { label: 'Unlimited Data', color: '#9333EA' }, // Purple 600
  { label: '10 ETB', color: '#EAB308' }, // Yellow 500
  { label: '50 ETB', color: '#F59E0B' }, // Amber 500
  { label: '100 ETB', color: '#D97706' }, // Amber 600
  { label: '500 ETB', color: '#B45309' }, // Amber 700
];

function getCoordinatesForPercent(percent: number) {
  const x = Math.cos(2 * Math.PI * percent);
  const y = Math.sin(2 * Math.PI * percent);
  return [x, y];
}

const SpinWheelScreen: React.FC<SpinWheelScreenProps> = ({ spinsLeft, onBack, onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (isSpinning || spinsLeft <= 0) return;

    soundManager.playClick();
    setIsSpinning(true);
    
    const segmentAngle = 360 / SEGMENTS.length;
    const winningIndex = Math.floor(Math.random() * SEGMENTS.length);
    
    // 5 full spins (1800 deg) + offset to land on the winning segment
    const extraSpins = 5 * 360;
    const winningAngle = winningIndex * segmentAngle;
    
    // Add a random offset within the segment so it doesn't always land dead center
    // We want to land somewhere in the middle 80% of the segment
    const randomOffset = (Math.random() * 0.8 + 0.1) * segmentAngle - (segmentAngle / 2);
    
    // Target rotation: Current rotation + extra spins + angle to reach winning segment
    // Since the wheel rotates clockwise, and segment 0 is at the top (if we don't rotate SVG),
    // we need to subtract the winning angle to bring it to the top.
    const targetRotation = rotation + extraSpins + (360 - winningAngle) + randomOffset;

    setRotation(targetRotation);

    // Sound effect loop
    let currentDelay = 50;
    let elapsed = 0;
    const totalDuration = 5000;
    
    const playTick = () => {
      if (elapsed >= totalDuration) return;
      soundManager.playTick();
      
      const progress = elapsed / totalDuration;
      currentDelay = 50 + Math.pow(progress, 3) * 400; 
      
      elapsed += currentDelay;
      if (elapsed < totalDuration) {
        setTimeout(playTick, currentDelay);
      }
    };
    
    setTimeout(playTick, currentDelay);

    setTimeout(() => {
      setIsSpinning(false);
      onSpinComplete(SEGMENTS[winningIndex].label);
    }, totalDuration); // matches transition duration
  };

  const renderWheel = () => {
    return (
      <svg viewBox="-100 -100 200 200" className="w-full h-full rounded-full -rotate-90 drop-shadow-xl">
        {SEGMENTS.map((segment, index) => {
          const startPercent = index / SEGMENTS.length;
          const endPercent = (index + 1) / SEGMENTS.length;
          
          const [startX, startY] = getCoordinatesForPercent(startPercent);
          const [endX, endY] = getCoordinatesForPercent(endPercent);
          
          const x1 = startX * 100;
          const y1 = startY * 100;
          const x2 = endX * 100;
          const y2 = endY * 100;
          
          const largeArcFlag = endPercent - startPercent > 0.5 ? 1 : 0;
          
          const pathData = [
            `M 0 0`,
            `L ${x1} ${y1}`,
            `A 100 100 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `Z`,
          ].join(' ');

          const midPercent = (startPercent + endPercent) / 2;
          const textAngle = midPercent * 360;
          
          return (
            <g key={index}>
              <path d={pathData} fill={segment.color} stroke="#0f172a" strokeWidth="1" />
              <text
                x="65"
                y="0"
                fill="white"
                fontSize="8"
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="middle"
                transform={`rotate(${textAngle})`}
                className="drop-shadow-md"
              >
                {segment.label}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <motion.div 
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-slate-950 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center p-6 pt-12 relative z-10">
        <button 
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold mr-10">Lucky Spin</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Wheel Container */}
        <div className="relative w-80 h-80 sm:w-96 sm:h-96 mb-12">
          {/* Pointer */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
            <div className="w-8 h-10 bg-gradient-to-b from-yellow-300 to-yellow-600" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}></div>
          </div>

          {/* The Wheel */}
          <div className="w-full h-full rounded-full p-2 bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 shadow-[0_0_40px_rgba(234,179,8,0.2)]">
            <div 
              className="w-full h-full rounded-full relative overflow-hidden border-4 border-slate-900 bg-slate-900"
              style={{ 
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 5s cubic-bezier(0.2, 0.8, 0.1, 1)' : 'none'
              }}
            >
              {renderWheel()}
              
              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-900 rounded-full border-4 border-yellow-500 z-10 flex items-center justify-center shadow-inner">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center w-full max-w-xs">
          <p className="text-slate-400 mb-4 font-medium">
            Remaining Spins: <span className="text-white font-bold text-lg">{spinsLeft}</span>
          </p>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSpin}
            disabled={isSpinning || spinsLeft <= 0}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(250,204,21,0.2)] transition-all ${
              isSpinning || spinsLeft <= 0 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-slate-900 hover:shadow-[0_0_30px_rgba(250,204,21,0.4)]'
            }`}
          >
            {isSpinning ? 'SPINNING...' : 'SPIN NOW'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default SpinWheelScreen;
