// src/components/MessagesSection.jsx
/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Mail, User, Calendar, PlusCircle, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });
  useEffect(() => { window.localStorage.setItem(key, JSON.stringify(storedValue)); }, [key, storedValue]);
  return [storedValue, setStoredValue];
};

const sampleMessages = [
  { id: uuidv4(), name: 'Priya Sharma', email: 'priya@example.com', message: 'Suggestion: Add more industry workshops for BCA students.', type: 'Suggestion', date: new Date().toISOString() },
  { id: uuidv4(), name: 'Rahul Verma', email: 'rahul@example.com', message: 'Can we have a coding bootcamp next month?', type: 'Feedback', date: new Date(Date.now() - 86400000).toISOString() },
  { id: uuidv4(), name: 'Anjali Nair', email: 'anjali@example.com', message: 'Great work on the annual fest! Looking forward to more events.', type: 'Appreciation', date: new Date(Date.now() - 172800000).toISOString() },
];

export default function MessagesSection() {
  const [messages, setMessages] = useLocalStorage('bca_messages', sampleMessages);

  const simulateIncomingMessage = () => {
    const names = ['Amit Kumar', 'Neha Gupta', 'Vikram Singh', 'Sneha Reddy', 'Rajesh Patil'];
    const suggestions = ['Proposal: Monthly hackathon', 'Suggestion: Improve library resources', 'Request: Guest lecture on AI/ML', 'Feedback: Website needs updates', 'Idea: Alumni networking event'];
    const newMsg = {
      id: uuidv4(),
      name: names[Math.floor(Math.random() * names.length)],
      email: 'frontend@bca.edu',
      message: suggestions[Math.floor(Math.random() * suggestions.length)],
      type: 'Incoming Suggestion',
      date: new Date().toISOString(),
    };
    setMessages([newMsg, ...messages]);
    toast.success('New incoming message received from frontend!', { icon: '📨' });
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter(m => m.id !== id));
    toast.success('Message removed');
  };

  const formatDate = (iso) => {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Incoming Messages</h2>
          <p className="text-slate-500 mt-1">Suggestions & feedback from website visitors</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={simulateIncomingMessage}
          className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg"
        >
          <Sparkles className="w-5 h-5" /> Simulate Frontend Message
        </motion.button>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              layout
              className="glass-card rounded-xl p-5 hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-700"><User className="w-4 h-4" /> {msg.name}</span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-400"><Mail className="w-3.5 h-3.5" /> {msg.email}</span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-400"><Calendar className="w-3.5 h-3.5" /> {formatDate(msg.date)}</span>
                    {msg.type && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{msg.type}</span>}
                  </div>
                  <p className="text-slate-600 leading-relaxed">{msg.message}</p>
                </div>
                <button onClick={() => deleteMessage(msg.id)} className="text-slate-400 hover:text-red-500 transition shrink-0"><Trash2 className="w-5 h-5" /></button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {messages.length === 0 && <div className="text-center py-12 glass-card rounded-2xl"><p className="text-slate-400">No messages yet. Simulate a frontend message!</p></div>}
      </div>
    </div>
  );
}