/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Droplets, 
  BookOpen, 
  Smartphone, 
  Flame, 
  Check, 
  Trash2,
  Sparkles,
  ShieldAlert,
  Sword,
  Compass
} from 'lucide-react';
import { Quest } from '../types';

interface QuestItemProps {
  quest: Quest;
  onToggle: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const QuestItem: React.FC<QuestItemProps> = ({ quest, onToggle, onDelete }) => {
  // Map string to Lucide icon components
  const renderIcon = () => {
    const iconClass = "w-6 h-6 text-on-primary-container";
    switch (quest.icon.toLowerCase()) {
      case 'droplets':
      case 'water':
      case 'drink water':
        return <Droplets className={iconClass} strokeWidth={1.5} />;
      case 'bookopen':
      case 'book':
      case 'study':
      case 'study session':
        return <BookOpen className={iconClass} strokeWidth={1.5} />;
      case 'smartphonecharging':
      case 'smartphone':
      case 'smartphoneoff':
      case 'phone':
      case 'no phone':
        return <Smartphone className={iconClass} strokeWidth={1.5} />;
      case 'crown':
        return <Sparkles className={iconClass} strokeWidth={1.5} />;
      case 'shield':
        return <ShieldAlert className={iconClass} strokeWidth={1.5} />;
      case 'sword':
        return <Sword className={iconClass} strokeWidth={1.5} />;
      default:
        return <Compass className={iconClass} strokeWidth={1.5} />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
      className={`relative flex items-center justify-between p-4 mb-4 rounded-xl border bg-white select-none transition-all duration-300 ${
        quest.completed 
          ? 'border-primary-container bg-surface-container-low shadow-sm' 
          : 'border-outline-variant hover:border-primary-container hover:shadow-md shadow-sm'
      }`}
    >
      {/* Left section: Icon + Info */}
      <div className="flex items-center space-x-4 min-w-0 flex-1">
        {/* Decorative circle container for icon */}
        <div className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
          quest.completed ? 'bg-primary-container/30' : 'bg-surface-container'
        }`}>
          {renderIcon()}
        </div>

        {/* Quest titles */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-2">
            <h4 className={`font-bold text-base truncate transition-all ${
              quest.completed ? 'text-on-surface-variant line-through opacity-60' : 'text-on-surface'
            }`}>
              {quest.title}
            </h4>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant whitespace-nowrap">
              +{quest.xpReward} XP
            </span>
          </div>
          
          <p className="text-xs text-on-surface-variant truncate mt-0.5 font-medium">
            {quest.description || 'Daily adventure quest'}
          </p>

          {/* Streak indicator */}
          <div className="flex items-center space-x-1 mt-1 text-xs font-semibold">
            {quest.streak > 0 ? (
              <span className="flex items-center text-orange-600">
                <Flame className="w-3.5 h-3.5 fill-current mr-0.5 animate-bounce" />
                {quest.streak} Day Streak
              </span>
            ) : (
              <span className="flex items-center text-on-surface-variant opacity-60">
                <Flame className="w-3.5 h-3.5 mr-0.5" />
                0 Day Streak
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right Section: Checkbox toggle or custom delete */}
      <div className="flex items-center space-x-2 shrink-0">
        {/* Delete custom quest button if editable */}
        {!quest.isDefault && onDelete && (
          <button
            onClick={() => onDelete(quest.id)}
            className="flex items-center justify-center w-10 h-10 text-on-surface-variant hover:text-red-500 rounded-lg opacity-40 hover:opacity-100 transition-all cursor-pointer active:scale-90"
            style={{ minWidth: 44, minHeight: 44 }}
            id={`delete-quest-${quest.id}`}
            title="Abandon Quest"
          >
            <Trash2 className="w-4.5 h-4.5" />
          </button>
        )}

        {/* Squishy tactile Custom Checkbox */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(quest.id)}
          className={`flex items-center justify-center rounded-xl transition-all cursor-pointer shadow-inner ${
            quest.completed 
              ? 'bg-primary border-primary text-white' 
              : 'border-2 border-outline-variant hover:border-primary bg-surface-container-low text-transparent'
          }`}
          style={{ width: 44, height: 44 }} // Satisfy touch target limit
          id={`toggle-quest-${quest.id}`}
          title={quest.completed ? 'Uncheck Quest' : 'Complete Quest'}
        >
          {quest.completed && (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Check className="w-6 h-6 stroke-[3]" />
            </motion.div>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};
