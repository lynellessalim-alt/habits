/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookMarked, PenTool, Smile, Zap, Coffee, Sparkles, Moon, Sun, Trash2 } from 'lucide-react';
import { JournalEntry } from '../types';

interface JournalTabProps {
  entries: JournalEntry[];
  onAddEntry: (title: string, content: string, mood: JournalEntry['mood']) => void;
  onDeleteEntry: (id: string) => void;
}

export const JournalTab: React.FC<JournalTabProps> = ({ entries, onAddEntry, onDeleteEntry }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<JournalEntry['mood']>('peaceful');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onAddEntry(title, content, mood);
    setTitle('');
    setContent('');
  };

  const moods: { type: JournalEntry['mood']; icon: React.ReactNode; label: string; color: string }[] = [
    { type: 'peaceful', icon: <Sun className="w-4 h-4" />, label: 'Peaceful', color: 'bg-green-100 text-green-800 border-green-300' },
    { type: 'energetic', icon: <Zap className="w-4 h-4" />, label: 'Energetic', color: 'bg-yellow-105 text-yellow-800 border-yellow-300' },
    { type: 'thoughtful', icon: <Sparkles className="w-4 h-4" />, label: 'Thoughtful', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
    { type: 'tired', icon: <Coffee className="w-4 h-4" />, label: 'Tired', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    { type: 'comfy', icon: <Moon className="w-4 h-4" />, label: 'Comfy', color: 'bg-pink-100 text-pink-800 border-pink-300' },
  ];

  return (
    <div className="pb-24">
      {/* 1. Magical Scroll-Style Reflection Form */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-[#fffcf5] border-2 border-dashed border-[#ebd5d7] rounded-2xl p-6 shadow-sm mb-6 overflow-hidden"
      >
        {/* Decorative corner scrolls */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary opacy-45"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary opacity-45"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary opacity-45"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary opacity-45"></div>

        <div className="flex items-center space-x-2 text-primary mb-4">
          <PenTool className="w-5 h-5" />
          <h4 className="font-extrabold text-sm tracking-wide">Write in Daily Scroll</h4>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title input */}
          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">Quest Title / Header</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cleared the hydration dungeon, gained study insight..."
              className="w-full text-sm font-semibold p-3 border border-outline-variant rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 bg-opacity-70"
              style={{ minHeight: 44 }}
              maxLength={80}
              required
            />
          </div>

          {/* Body Reflection */}
          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">Adventures Log / Reflections</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="How did completing your quests make you feel today? Write a reflection of your journey..."
              rows={4}
              className="w-full text-sm font-medium p-3 border border-outline-variant rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 bg-opacity-70 resize-none"
              required
            />
          </div>

          {/* Mood Selector row */}
          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-wider">Current Mental Mood</label>
            <div className="flex flex-wrap gap-2">
              {moods.map((m) => (
                <button
                  key={m.type}
                  type="button"
                  onClick={() => setMood(m.type)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                    mood === m.type
                      ? `${m.color} ring-2 ring-primary-container scale-105 shadow-sm`
                      : 'border-outline-variant bg-white text-on-surface-variant hover:border-primary'
                  }`}
                  style={{ minHeight: 44 }}
                >
                  {m.icon}
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Scroll Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-primary hover:bg-primary/95 text-white font-extrabold py-3 px-4 rounded-xl shadow-md cursor-pointer transition-colors active:scale-95 text-sm"
          >
            Seize Log Entry & Bloom
          </motion.button>
        </form>
      </motion.div>

      {/* 2. Scroll Entry List */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-2">
          <BookMarked className="w-5 h-5 text-primary" />
          <h4 className="font-extrabold text-sm text-on-surface">Past Chronicles ({entries.length})</h4>
        </div>

        {entries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-outline-variant p-8 text-center flex flex-col items-center justify-center">
            <BookMarked className="w-12 h-12 text-outline mb-3 stroke-[1]" />
            <p className="font-bold text-on-surface text-sm">No chronicles written yet.</p>
            <p className="text-xs text-on-surface-variant opacity-80 mt-1">Submit your first reflection using the ledger above!</p>
          </div>
        ) : (
          <AnimatePresence>
            {entries.map((entry) => {
              const currentMood = moods.find((m) => m.type === entry.mood) || moods[0];

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="bg-white rounded-xl border border-outline-variant p-5 shadow-sm"
                >
                  {/* Header info */}
                  <div className="flex justify-between items-start mb-2">
                    <div className="min-w-0 flex-1">
                      <h5 className="font-bold text-sm text-on-surface truncate pr-2">{entry.title}</h5>
                      <p className="text-[10px] text-on-surface-variant font-medium mt-0.5 opacity-80">{entry.date}</p>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      {/* Mood Stamp Badge */}
                      <span className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-full border text-[10px] font-extrabold ${currentMood.color}`}>
                        {currentMood.icon}
                        <span>{currentMood.label}</span>
                      </span>

                      {/* Trash Delete */}
                      <button
                        onClick={() => onDeleteEntry(entry.id)}
                        className="flex items-center justify-center w-8 h-8 text-on-surface-variant hover:text-red-500 rounded-lg cursor-pointer transition-colors opacity-70 hover:opacity-100"
                        title="Tear from Annals"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Body written text */}
                  <p className="text-xs text-on-surface-variant font-medium leading-relaxed border-t border-outline-variant/10 pt-2 bg-[#fffdfb] rounded-lg p-2 mt-1 border">
                    {entry.content}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
