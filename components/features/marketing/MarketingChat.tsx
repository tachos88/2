
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../../../types';
import { ChatService } from '../../../services/chatService';

export const MarketingChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Hoi! Ik ben de FLO8 assistent. Heb je een vraag over hoe wij je kunnen helpen met meer rust en energie?', timestamp: new Date().toISOString() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await ChatService.sendMessage(messages, input, 'sales');
      const modelMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: response, timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, modelMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { id: 'err', role: 'model', text: 'Er ging iets mis. Maar ik vertel je graag meer over onze coaching!', timestamp: new Date().toISOString() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden flex flex-col h-[500px]">
      <div className="bg-teal-600 p-4 text-white flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🤖</div>
        <div>
          <p className="font-bold leading-none">Vraag het FLO8</p>
          <p className="text-xs opacity-80">AI Assistent</p>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-stone-50">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-teal-600 text-white rounded-br-none' : 'bg-white text-stone-800 rounded-bl-none shadow-sm border border-stone-100'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-stone-400 text-xs italic">Typen...</div>}
        <div ref={scrollRef}></div>
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-stone-100 bg-white flex gap-2">
        <input
          type="text"
          className="flex-grow p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-teal-500 outline-none text-sm"
          placeholder="Stel je vraag over het programma..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" disabled={loading} className="bg-teal-600 text-white p-3 rounded-xl hover:bg-teal-700 disabled:opacity-50">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </form>
    </div>
  );
};
