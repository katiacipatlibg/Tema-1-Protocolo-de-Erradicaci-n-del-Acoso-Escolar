import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { flashcards } from '../data/protocolData';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export default function FlashCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };

  const card = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-4 h-full">
      <div className="text-center mb-6 bg-white/90 p-4 rounded-2xl border-4 border-black shadow-lg">
        <h2 className="text-2xl font-display font-bold text-black">Bloques de Estudio</h2>
        <p className="text-slate-700 font-bold">Toca el bloque para ver el reverso</p>
      </div>

      <div className="relative w-full aspect-[4/3] max-w-md perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + (isFlipped ? '-flipped' : '-front')}
            initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`absolute inset-0 w-full h-full cursor-pointer p-8 flex flex-col items-center justify-center text-center ${
              isFlipped ? 'mario-brick text-white' : 'mario-block text-black'
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {!isFlipped ? (
              <>
                <div className="text-black/60 font-display font-bold text-xl mb-4">{card.article}</div>
                <h3 className="text-3xl font-display font-bold drop-shadow-sm">{card.title}</h3>
                <div className="mt-8 text-black/60 flex items-center gap-2 font-bold bg-white/30 px-4 py-2 rounded-full border-2 border-black/20">
                  <RotateCcw size={16} />
                  <span className="text-sm">Tocar para girar</span>
                </div>
              </>
            ) : (
              <>
                <div className="text-white/80 font-display font-bold text-lg mb-4">{card.article} - {card.title}</div>
                <p className="text-xl font-bold leading-relaxed drop-shadow-sm">{card.description}</p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between w-full max-w-md mt-8 bg-white/90 p-2 rounded-2xl border-4 border-black shadow-lg">
        <button
          onClick={handlePrev}
          className="p-3 rounded-xl bg-[#e52521] text-white mario-btn border-4 border-black hover:bg-[#c41c19]"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-black font-display font-bold text-xl">
          {currentIndex + 1} / {flashcards.length}
        </span>
        <button
          onClick={handleNext}
          className="p-3 rounded-xl bg-[#e52521] text-white mario-btn border-4 border-black hover:bg-[#c41c19]"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
