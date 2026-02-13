
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../../../types';
import { ChatService } from '../../../services/chatService';

export const MarketingChat: React.FC<{ variant?: 'light' | 'dark' }> = ({ variant = 'light' }) => {
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

  const isDark = variant === 'dark';
  return (
    <div className={`overflow-hidden flex flex-col h-[420px] ${isDark ? 'bg-transparent' : 'bg-white rounded-3xl border border-stone-200 shadow-2xl'}`}>
      <div className={`p-4 flex items-center gap-3 ${isDark ? 'bg-cyan-500/20 border-b border-white/10' : 'bg-teal-600'} text-white`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${isDark ? 'bg-white/10' : 'bg-white/20'}`}>🤖</div>
        <div>
          <p className="font-bold leading-none">Vraag het FLO8</p>
          <p className="text-xs opacity-80">AI Assistent</p>
        </div>
      </div>

      <div className={`flex-grow overflow-y-auto p-6 space-y-4 ${isDark ? 'bg-stone-900/30' : 'bg-stone-50'}`}>
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-cyan-500/80 text-white rounded-br-none' : isDark ? 'bg-white/10 text-stone-200 rounded-bl-none border border-white/10' : 'bg-white text-stone-800 rounded-bl-none shadow-sm border border-stone-100'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-stone-400 text-xs italic">Typen...</div>}
        <div ref={scrollRef}></div>
      </div>

      <form onSubmit={handleSend} className={`p-4 flex gap-2 ${isDark ? 'border-t border-white/10 bg-stone-900/50' : 'border-t border-stone-100 bg-white'}`}>
        <input
          type="text"
          className={`flex-grow p-3 rounded-xl outline-none text-sm ${isDark ? 'bg-white/10 border border-white/20 text-white placeholder-stone-500 focus:ring-2 focus:ring-cyan-500' : 'border border-stone-200 focus:ring-2 focus:ring-teal-500'}`}
          placeholder="Stel je vraag over het programma..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" disabled={loading} className={isDark ? 'bg-cyan-500 text-white p-3 rounded-xl hover:bg-cyan-400 disabled:opacity-50' : 'bg-teal-600 text-white p-3 rounded-xl hover:bg-teal-700 disabled:opacity-50'}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </form>
    </div>
  );
};
