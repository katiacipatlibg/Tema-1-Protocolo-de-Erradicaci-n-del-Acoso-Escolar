import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { Send, Loader2 } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export default function AIChat() {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: '¡Hola! Soy tu asistente de estudio con IA. Puedes preguntarme cualquier duda sobre el Protocolo de Erradicación del Acoso Escolar (Artículos 23 al 43).' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Eres un experto en el Protocolo de Erradicación del Acoso Escolar (Artículos 23 al 43). Responde de manera clara, educativa y concisa a la siguiente pregunta del estudiante:\n\n${userMessage}`,
        config: {
          systemInstruction: 'Actúa como un tutor amigable y experto en el protocolo escolar contra el acoso. Usa lenguaje claro, viñetas si es necesario, y siempre mantén un tono educativo y de apoyo. Puedes usar un tono ligeramente divertido o hacer referencias sutiles a videojuegos clásicos si encaja, pero mantén la seriedad del tema.'
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || 'Lo siento, no pude generar una respuesta.' }]);
    } catch (error) {
      console.error('Error calling Gemini:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Hubo un error al conectar con la IA. Por favor, intenta de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-2 md:p-4">
      <div className="mb-6 text-center bg-white/90 p-4 rounded-2xl border-4 border-black shadow-lg">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#fbd000] text-black mb-4 border-4 border-black shadow-sm overflow-hidden">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Toad_3D_Land.png/220px-Toad_3D_Land.png" alt="Toad" className="w-16 h-16 object-contain mt-2" referrerPolicy="no-referrer" />
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-black mb-2">Asistente de Estudio IA</h2>
        <p className="text-slate-700 font-bold max-w-2xl mx-auto">
          Resuelve tus dudas sobre el protocolo al instante con la ayuda de Gemini.
        </p>
      </div>

      <div className="flex-1 bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-[#f8f9fa]">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 md:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 border-black overflow-hidden ${
                msg.role === 'user' ? 'bg-[#43b047] text-white' : 'bg-white text-white'
              }`}>
                {msg.role === 'user' 
                  ? <img src="https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Luigi_NSMBUD.png/220px-Luigi_NSMBUD.png" alt="Luigi" className="w-10 h-10 object-contain mt-1" referrerPolicy="no-referrer" /> 
                  : <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Toad_3D_Land.png/220px-Toad_3D_Land.png" alt="Toad" className="w-10 h-10 object-contain mt-1" referrerPolicy="no-referrer" />}
              </div>
              <div className={`max-w-[85%] md:max-w-[80%] rounded-2xl p-4 border-4 border-black font-bold ${
                msg.role === 'user' 
                  ? 'bg-[#e52521] text-white rounded-tr-none shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]' 
                  : 'bg-white text-black rounded-tl-none shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]'
              }`}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-white text-white flex items-center justify-center shrink-0 border-2 border-black overflow-hidden">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Toad_3D_Land.png/220px-Toad_3D_Land.png" alt="Toad" className="w-10 h-10 object-contain mt-1" referrerPolicy="no-referrer" />
              </div>
              <div className="bg-white border-4 border-black rounded-2xl rounded-tl-none p-4 flex items-center gap-2 text-black font-bold shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
                <Loader2 className="animate-spin" size={20} />
                <span>Pensando...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-[#c84c0c] border-t-4 border-black">
          <div className="flex gap-2 max-w-3xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu pregunta sobre el protocolo..."
              className="flex-1 px-4 md:px-6 py-3 md:py-4 rounded-xl border-4 border-black focus:outline-none focus:ring-4 focus:ring-[#fbd000] bg-white text-black font-bold shadow-inner"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-[#e52521] hover:bg-[#c41c19] disabled:bg-slate-400 text-white flex items-center justify-center transition-colors border-4 border-black shrink-0 mario-btn"
            >
              <Send size={24} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
