import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, CheckSquare, BookOpen, MessageSquare, ShieldAlert } from 'lucide-react';
import FlashCards from './components/FlashCards';
import Quiz from './components/Quiz';
import CaseStudies from './components/CaseStudies';
import AIChat from './components/AIChat';

type Tab = 'flashcards' | 'quiz' | 'cases' | 'chat';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('flashcards');

  const tabs = [
    { id: 'flashcards', label: 'Tarjetas', icon: Layers },
    { id: 'quiz', label: 'Evaluación', icon: CheckSquare },
    { id: 'cases', label: 'Casos', icon: BookOpen },
    { id: 'chat', label: 'Asistente IA', icon: MessageSquare },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      <header className="bg-[#e52521] border-b-4 border-black sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <ShieldAlert size={28} className="drop-shadow-md" />
            <h1 className="text-xl sm:text-2xl font-display font-bold tracking-wide hidden sm:block drop-shadow-md text-white">
              Protocolo Acoso Escolar
            </h1>
          </div>
          
          <nav className="flex items-center gap-1 sm:gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-3 sm:px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all border-2 ${
                    isActive 
                      ? 'bg-[#fbd000] text-black border-black shadow-[0_4px_0_0_#000]' 
                      : 'bg-white/20 text-white border-transparent hover:bg-white/30'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon size={18} />
                    <span className="hidden md:block font-display tracking-wide">{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1 overflow-hidden relative pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 overflow-y-auto p-4"
          >
            {activeTab === 'flashcards' && <FlashCards />}
            {activeTab === 'quiz' && <Quiz />}
            {activeTab === 'cases' && <CaseStudies />}
            {activeTab === 'chat' && <AIChat />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Watermark */}
      <div className="fixed bottom-2 right-4 z-50 pointer-events-none flex items-end gap-2">
        <img src="https://upload.wikimedia.org/wikipedia/en/1/16/Princess_Peach_Stock_Art.png" alt="Peach" className="h-16 md:h-20 object-contain drop-shadow-md" referrerPolicy="no-referrer" />
        <p className="font-display font-bold text-xl md:text-2xl text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] opacity-90 mb-2">
          Miss Karu
        </p>
      </div>
    </div>
  );
}
