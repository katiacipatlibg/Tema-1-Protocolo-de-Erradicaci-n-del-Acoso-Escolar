import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { caseStudies } from '../data/protocolData';
import { BookOpen, CheckCircle2, XCircle, ArrowRight, RefreshCcw } from 'lucide-react';

export default function CaseStudies() {
  const [currentCase, setCurrentCase] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const caseData = caseStudies[currentCase];

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === caseData.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentCase < caseStudies.length - 1) {
      setCurrentCase(currentCase + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const restartCases = () => {
    setCurrentCase(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mario-block p-8 max-w-md w-full text-black"
        >
          <div className="h-32 flex items-center justify-center mx-auto mb-6">
            <img 
              src={score >= 10 ? "https://upload.wikimedia.org/wikipedia/en/thumb/d/db/Yoshi_%28Nintendo_character%29.png/220px-Yoshi_%28Nintendo_character%29.png" : "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Bowser_-_New_Super_Mario_Bros_2.png/220px-Bowser_-_New_Super_Mario_Bros_2.png"} 
              alt="Result Character" 
              className="h-full object-contain drop-shadow-lg"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2 className="text-3xl font-display font-bold mb-2 drop-shadow-sm">¡Nivel Completado!</h2>
          <p className="font-bold mb-6">Has resuelto todos los casos.</p>
          
          <div className="text-5xl font-display font-black text-[#e52521] mb-2 drop-shadow-md">
            {score} <span className="text-2xl text-black/60 font-medium">/ {caseStudies.length}</span>
          </div>
          <p className="font-bold mb-8">
            {score >= 16 ? '¡Eres un experto en el protocolo!' : 
             score >= 10 ? '¡Buen trabajo! Sigue practicando.' : 
             '¡No te rindas! Inténtalo de nuevo.'}
          </p>

          <button
            onClick={restartCases}
            className="w-full py-4 bg-[#43b047] hover:bg-[#348a37] text-white rounded-xl font-display font-bold flex items-center justify-center gap-2 mario-btn border-black border-4"
          >
            <RefreshCcw size={20} />
            Jugar de nuevo
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-3xl mx-auto p-2 md:p-4 h-full">
      <div className="mb-6 flex items-center justify-between bg-white/90 p-4 rounded-2xl border-4 border-black shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-[#e52521] p-2 rounded-lg border-2 border-black text-white">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-display font-bold text-black">Mundo de Casos</h2>
            <p className="text-sm font-bold text-slate-600">Nivel {currentCase + 1} - {caseStudies.length}</p>
          </div>
        </div>
        <div className="text-black font-display font-bold bg-[#fbd000] px-4 py-2 rounded-xl border-4 border-black shadow-sm flex items-center gap-2">
          <span className="text-xl">⭐</span> {score}
        </div>
      </div>

      <motion.div
        key={currentCase}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-white p-6 md:p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] flex-1 flex flex-col"
      >
        <div className="bg-[#5c94fc] text-white p-4 rounded-xl border-4 border-black mb-6 shadow-inner">
          <h3 className="text-lg md:text-xl font-bold leading-relaxed">
            {caseData.description}
          </h3>
        </div>

        <div className="space-y-4 flex-1">
          {caseData.options.map((option, index) => {
            let itemClass = "w-full text-left p-4 md:p-5 rounded-xl border-4 transition-all flex items-start gap-4 font-bold ";
            let icon = null;

            if (!showResult) {
              itemClass += "border-black bg-white hover:bg-slate-100 mario-btn cursor-pointer text-black";
            } else {
              if (index === caseData.correctAnswer) {
                itemClass += "border-black bg-[#43b047] text-white shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]";
                icon = <CheckCircle2 className="text-white shrink-0 mt-1" size={24} />;
              } else if (index === selectedAnswer) {
                itemClass += "border-black bg-[#e52521] text-white";
                icon = <XCircle className="text-white shrink-0 mt-1" size={24} />;
              } else {
                itemClass += "border-slate-300 bg-slate-100 text-slate-400 opacity-50";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={itemClass}
              >
                <div className="flex-1 text-base md:text-lg">{option}</div>
                {icon}
              </button>
            );
          })}
        </div>

        {showResult && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-6"
          >
            <div className="bg-[#fbd000] p-4 rounded-xl border-4 border-black mb-6 text-black">
              <div className="flex items-center gap-2 font-display font-bold mb-2">
                <span className="text-xl">🍄</span> Solución ({caseData.article}):
              </div>
              <p className="font-bold">{caseData.solution}</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="px-8 py-4 bg-[#e52521] hover:bg-[#c41c19] text-white rounded-xl font-display font-bold flex items-center gap-2 mario-btn border-4 border-black"
              >
                {currentCase < caseStudies.length - 1 ? 'Siguiente Nivel' : 'Ver Resultados'}
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
