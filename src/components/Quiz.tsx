import React, { useState } from 'react';
import { motion } from 'motion/react';
import { quizQuestions } from '../data/protocolData';
import { CheckCircle2, XCircle, ArrowRight, RefreshCcw } from 'lucide-react';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = quizQuestions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mario-block p-8 max-w-md w-full text-black"
        >
          <div className="w-20 h-20 bg-white text-[#e52521] rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-black">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-display font-bold mb-2 drop-shadow-sm">¡Evaluación Completada!</h2>
          <p className="font-bold mb-8">Has respondido todas las preguntas.</p>
          
          <div className="text-5xl font-display font-black text-[#e52521] mb-2 drop-shadow-md">
            {score} <span className="text-2xl text-black/60 font-medium">/ {quizQuestions.length}</span>
          </div>
          <p className="font-bold mb-8">
            {score >= 24 ? '¡Excelente! Eres un maestro del protocolo.' : 
             score >= 15 ? 'Buen trabajo, pero puedes mejorar.' : 
             'Te recomendamos repasar más los bloques de estudio.'}
          </p>

          <button
            onClick={restartQuiz}
            className="w-full py-4 bg-[#43b047] hover:bg-[#348a37] text-white rounded-xl font-display font-bold flex items-center justify-center gap-2 mario-btn border-black border-4"
          >
            <RefreshCcw size={20} />
            Intentar de nuevo
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-3xl mx-auto p-4 md:p-8 h-full">
      <div className="mb-8 flex items-center justify-between bg-white/90 p-4 rounded-2xl border-4 border-black shadow-lg">
        <div>
          <h2 className="text-2xl font-display font-bold text-black">Simulador de Evaluación</h2>
          <p className="text-slate-600 font-bold">Pregunta {currentQuestion + 1} de {quizQuestions.length}</p>
        </div>
        <div className="text-black font-display font-bold bg-[#fbd000] px-4 py-2 rounded-xl border-4 border-black shadow-sm flex items-center gap-2">
          <span className="text-xl">⭐</span> {score}
        </div>
      </div>

      <div className="w-full bg-white border-4 border-black h-4 rounded-full mb-8 overflow-hidden shadow-inner">
        <motion.div 
          className="h-full bg-[#43b047]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestion) / quizQuestions.length) * 100}%` }}
        />
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-white p-6 md:p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] flex-1"
      >
        <h3 className="text-xl md:text-2xl font-bold text-black mb-8 leading-relaxed">
          {question.question}
        </h3>

        <div className="space-y-4">
          {question.options.map((option, index) => {
            let itemClass = "w-full text-left p-4 md:p-6 rounded-xl border-4 transition-all flex items-start gap-4 font-bold ";
            let icon = null;

            if (!showResult) {
              itemClass += "border-black bg-white hover:bg-slate-100 mario-btn cursor-pointer text-black";
            } else {
              if (index === question.correctAnswer) {
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
                <div className="flex-1 text-lg">{option}</div>
                {icon}
              </button>
            );
          })}
        </div>

        {showResult && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-8 flex justify-end"
          >
            <button
              onClick={handleNext}
              className="px-8 py-4 bg-[#e52521] hover:bg-[#c41c19] text-white rounded-xl font-display font-bold flex items-center gap-2 mario-btn border-4 border-black"
            >
              {currentQuestion < quizQuestions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
              <ArrowRight size={20} />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
