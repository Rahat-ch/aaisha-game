"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// Tug of War Game with Bluey!
export default function TugOfWarGame() {
  const [ropePosition, setRopePosition] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [blueyPulling, setBlueyPulling] = useState(false);
  const [bingoPulling, setBingoPulling] = useState(false);
  const [winner, setWinner] = useState<null | "bluey" | "aaisha">(null);
  const [taps, setTaps] = useState(0);

  useEffect(() => {
    if (!isPlaying || winner) return;
    
    const interval = setInterval(() => {
      setRopePosition(prev => {
        // EASIER: Bluey and Bingo pull much slower now (0.3-0.8 per tick instead of 0.5-2.5)
        const newPos = prev - (Math.random() * 0.5 + 0.3);
        if (newPos <= 10) {
          setWinner("bluey");
          setIsPlaying(false);
        }
        return Math.max(0, newPos);
      });
      
      setBlueyPulling(Math.random() > 0.5);
      setBingoPulling(Math.random() > 0.5);
    }, 150); // Slower interval too (was 100ms)
    
    return () => clearInterval(interval);
  }, [isPlaying, winner]);

  const handlePull = () => {
    if (!isPlaying) return;
    
    setTaps(prev => prev + 1);
    setRopePosition(prev => {
      // EASIER: Aaisha pulls stronger now (4 instead of 2.5)
      const newPos = prev + 4;
      if (newPos >= 85) { // Lower threshold to win (was 90)
        setWinner("aaisha");
        setIsPlaying(false);
        setScore(s => s + 1);
        confetti({
          particleCount: 150, // More confetti!
          spread: 100,
          origin: { y: 0.6 },
          colors: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#FF6B9D", "#95E1D3", "#F38181"]
        });
      }
      return Math.min(100, newPos);
    });
  };

  const startGame = () => {
    setRopePosition(50);
    setIsPlaying(true);
    setWinner(null);
    setTaps(0);
    setBlueyPulling(false);
    setBingoPulling(false);
  };

  const resetGame = () => {
    setRopePosition(50);
    setIsPlaying(false);
    setWinner(null);
    setTaps(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-blue-300 to-yellow-200 overflow-hidden relative">
      {/* Sun */}
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-10 text-8xl"
      >☀️</motion.div>

      {/* Clouds */}
      <motion.div 
        animate={{ x: [0, 120, 0] }} 
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-16 left-10 text-6xl opacity-70"
      >☁️</motion.div>
      <motion.div 
        animate={{ x: [0, -100, 0] }} 
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-24 right-32 text-5xl opacity-60"
      >☁️</motion.div>

      {/* Palm Trees */}
      <div className="absolute bottom-32 left-5 text-8xl">🌴</div>
      <div className="absolute bottom-28 right-8 text-7xl">🌴</div>
      <div className="absolute bottom-36 left-36 text-6xl">🌴</div>

      {/* Beach Elements */}
      <div className="absolute bottom-24 right-32 text-5xl">🏖️</div>
      <div className="absolute bottom-20 left-28 text-4xl">🐚</div>
      <div className="absolute bottom-16 right-48 text-3xl">⭐</div>

      {/* Waves */}
      <motion.div 
        animate={{ x: [-20, 20, -20] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-48 left-0 right-0 text-4xl opacity-50"
      >🌊 🌊 🌊 🌊 🌊</motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4 text-center"
        >
          🐾 Tug of War! 🐾
        </motion.h1>

        <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 mb-6 shadow-lg">
          <span className="text-2xl font-bold text-green-700">🏆 Wins: {score}</span>
        </div>

        <div className="relative w-full max-w-2xl h-64 bg-yellow-300/60 rounded-3xl border-4 border-yellow-500 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute bottom-0 w-full h-20 bg-yellow-400"></div>
          </div>

          {/* Bluey Character */}
          <motion.div 
            animate={{ x: blueyPulling ? 10 : 0 }}
            className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col items-center"
          >
            {/* Bluey - Blue Heeler with darker blue ears and spots */}
            <div className="relative">
              {/* Body */}
              <div className="w-20 h-20 bg-[#4A90D9] rounded-full flex items-center justify-center border-4 border-[#2E5A8C] shadow-lg">
                {/* Inner ear color */}
                <div className="absolute -top-2 left-2 w-6 h-8 bg-[#2E5A8C] rounded-full transform -rotate-12"></div>
                <div className="absolute -top-2 right-2 w-6 h-8 bg-[#2E5A8C] rounded-full transform rotate-12"></div>
                {/* Light blue belly */}
                <div className="w-10 h-10 bg-[#87CEEB] rounded-full"></div>
              </div>
              {/* Tail */}
              <div className="absolute -bottom-1 right-0 w-4 h-12 bg-[#4A90D9] rounded-full transform rotate-45 border-2 border-[#2E5A8C]"></div>
            </div>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold mt-1 shadow-md">Bluey</span>
          </motion.div>

          {/* Bingo Character */}
          <motion.div 
            animate={{ x: bingoPulling ? 8 : 0 }}
            className="absolute left-20 top-1/2 -translate-y-1/2 flex flex-col items-center"
          >
            {/* Bingo - Orange/Cream Heeler */}
            <div className="relative">
              {/* Body */}
              <div className="w-16 h-16 bg-[#F4A460] rounded-full flex items-center justify-center border-4 border-[#D2691E] shadow-lg">
                {/* Inner ear color */}
                <div className="absolute -top-1 left-2 w-5 h-6 bg-[#D2691E] rounded-full transform -rotate-12"></div>
                <div className="absolute -top-1 right-2 w-5 h-6 bg-[#D2691E] rounded-full transform rotate-12"></div>
                {/* Cream belly */}
                <div className="w-8 h-8 bg-[#FFE4C4] rounded-full"></div>
              </div>
              {/* Tail */}
              <div className="absolute -bottom-1 right-0 w-3 h-10 bg-[#F4A460] rounded-full transform rotate-45 border-2 border-[#D2691E]"></div>
            </div>
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold mt-1 shadow-md">Bingo</span>
          </motion.div>

          {/* Aaisha Character */}
          <motion.div 
            animate={{ x: winner === "aaisha" ? -5 : 0 }}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center"
          >
            {/* Aaisha - Girl character */}
            <div className="relative">
              {/* Body */}
              <div className="w-20 h-20 bg-[#FFB6C1] rounded-full flex items-center justify-center border-4 border-[#FF69B4] shadow-lg">
                {/* Face */}
                <div className="text-4xl">👧</div>
              </div>
              {/* Hair bow */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl">🎀</div>
            </div>
            <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold mt-1 shadow-md">Aaisha</span>
          </motion.div>

          {/* Rope */}
          <div 
            className="absolute top-1/2 h-4 bg-amber-700 rounded-full transition-all duration-100"
            style={{ 
              left: '20%', 
              width: '60%',
              transform: `translateX(${(ropePosition - 50) * 0.8}%) translateY(-50%)`
            }}
          ></div>

          {/* Center marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-400"></div>

          {/* Power meter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-gray-200 rounded-full overflow-hidden border-2 border-gray-400">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-pink-500 transition-all duration-100"
              style={{ width: `${ropePosition}%` }}
            ></div>
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white"></div>
          </div>
        </div>

        <AnimatePresence>
          {winner && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="mt-6 text-center"
            >
              {winner === "aaisha" ? (
                <div className="bg-pink-500 text-white px-8 py-4 rounded-2xl shadow-xl">
                  <div className="text-4xl mb-2">🎉</div>
                  <div className="text-2xl font-bold">You Win, Aaisha!</div>
                  <div className="text-lg">Great job! You beat Bluey and Bingo!</div>
                </div>
              ) : (
                <div className="bg-blue-500 text-white px-8 py-4 rounded-2xl shadow-xl">
                  <div className="text-4xl mb-2">🐾</div>
                  <div className="text-2xl font-bold">Bluey & Bingo Win!</div>
                  <div className="text-lg">Try again! You can do it!</div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {isPlaying && !winner && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handlePull}
            className="mt-8 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white text-3xl font-bold px-12 py-8 rounded-3xl shadow-2xl border-4 border-pink-300"
          >
            💪 TAP TO PULL! 💪
          </motion.button>
        )}

        <div className="mt-8 flex gap-4">
          {!isPlaying && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white text-2xl font-bold px-8 py-4 rounded-2xl shadow-xl"
            >
              🎮 {score > 0 ? "Play Again" : "Start Game"}
            </motion.button>
          )}
          
          {(winner || isPlaying) && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="bg-gradient-to-r from-gray-500 to-gray-600 text-white text-xl font-bold px-6 py-4 rounded-2xl shadow-xl"
            >
              🔄 Reset
            </motion.button>
          )}
        </div>

        {!isPlaying && score === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-2xl max-w-md text-center"
          >
            <p className="text-gray-700 text-lg">
              🎯 <strong>How to play:</strong><br/>
              Tap the pink button fast!<br/>
              Pull the rope to your side!<br/>
              Beat Bluey and Bingo! 🐕🐕
            </p>
          </motion.div>
        )}

        {isPlaying && (
          <div className="mt-4 bg-white/60 px-4 py-2 rounded-full">
            <span className="text-gray-700 font-bold">Taps: {taps}</span>
          </div>
        )}
      </div>

      {/* Beach decorations */}
      <div className="absolute bottom-10 left-10 text-3xl">🐚</div>
      <div className="absolute bottom-8 left-24 text-2xl">⭐</div>
      <div className="absolute bottom-12 right-16 text-3xl">🦀</div>
      <div className="absolute bottom-6 right-32 text-2xl">🏐</div>
    </div>
  );
}
