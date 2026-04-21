// src/components/TeamSection.jsx
/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, UserPlus, Mail, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);
  return [storedValue, setStoredValue];
};

export default function TeamSection() {
  const [team, setTeam] = useLocalStorage('bca_team', [
    { id: uuidv4(), name: 'Dr. Sarah Johnson', role: 'Faculty Advisor', email: 'sarah@bca.edu', avatar: 'https://ui-avatars.com/api/?background=3b82f6&color=fff&name=SJ' },
    { id: uuidv4(), name: 'Michael Chen', role: 'President', email: 'michael@bca.edu', avatar: 'https://ui-avatars.com/api/?background=8b5cf6&color=fff&name=MC' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', email: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role) {
      toast.error('Please fill name and role');
      return;
    }
    const newMember = {
      id: uuidv4(),
      name: formData.name,
      role: formData.role,
      email: formData.email || '',
      avatar: `https://ui-avatars.com/api/?background=6366f1&color=fff&name=${encodeURIComponent(formData.name.charAt(0))}`,
    };
    setTeam([newMember, ...team]);
    setFormData({ name: '', role: '', email: '' });
    setShowForm(false);
    toast.success('Team member added successfully');
  };

  const handleDelete = (id) => {
    setTeam(team.filter(m => m.id !== id));
    toast.success('Member removed');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Team Management</h2>
          <p className="text-slate-500 mt-1">Add or manage executive committee members</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(!showForm)}
          className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
        >
          <UserPlus className="w-5 h-5" /> Add New Member
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card rounded-2xl p-6 mb-6 overflow-hidden"
          >
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" placeholder="Full Name *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="px-4 py-2 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition" />
                <input type="text" placeholder="Role / Position *" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="px-4 py-2 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition" />
                <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="px-4 py-2 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition" />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" /> Add Member</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {team.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-5 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img src={member.avatar} alt={member.name} className="w-14 h-14 rounded-xl object-cover shadow-md" />
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{member.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-slate-500 mt-0.5"><Briefcase className="w-3.5 h-3.5" /> {member.role}</div>
                    {member.email && <div className="flex items-center gap-1 text-xs text-slate-400 mt-1"><Mail className="w-3 h-3" /> {member.email}</div>}
                  </div>
                </div>
                <button onClick={() => handleDelete(member.id)} className="text-slate-400 hover:text-red-500 transition p-1"><Trash2 className="w-4.5 h-4.5" /></button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {team.length === 0 && <div className="text-center py-12 glass-card rounded-2xl"><p className="text-slate-400">No team members yet. Add your first member!</p></div>}
    </div>
  );
}