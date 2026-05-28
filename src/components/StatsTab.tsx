/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Gem, 
  Sparkles, 
  Flame, 
  TrendingUp, 
  Droplet, 
  BookOpen, 
  Smartphone,
  CheckCircle2,
  CalendarDays
} from 'lucide-react';
import { UserProgress, Quest, ActivityLog } from '../types';
import { AuraBelleAvatar } from './illustrations';

interface StatsTabProps {
  progress: UserProgress;
  quests: Quest[];
  activityLogs: ActivityLog[];
  equippedCosmetics?: string[];
}

export const StatsTab: React.FC<StatsTabProps> = ({ progress, quests, activityLogs, equippedCosmetics = [] }) => {
  // Weekly Activity Days (Mon-Sun)
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // Initialize weekly activity data from cache or high-fidelity default values matching user image
  const [weeklyData, setWeeklyData] = React.useState<{ day: string; completed: number; total: number }[]>(() => {
    const cached = localStorage.getItem('hb_weekly_activity_v2');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.warn(e);
      }
    }
    // Matching the image height proportions exactly:
    // M: 2/3 (66.6%), T: 4/4 (Perfect!), W: 1/3 (33.3%), T: 3/3 (Perfect!), F: 4/4 (Perfect!), S: 3/3 (Perfect!), S: 2/4 (50%)
    return [
      { day: 'M', completed: 2, total: 3 },
      { day: 'T', completed: 4, total: 4 },
      { day: 'W', completed: 1, total: 3 },
      { day: 'T', completed: 3, total: 3 },
      { day: 'F', completed: 4, total: 4 },
      { day: 'S', completed: 3, total: 3 },
      { day: 'S', completed: 2, total: 4 },
    ];
  });

  // Monday is index 0, Sunday is index 6
  const todayIndex = (new Date().getDay() + 6) % 7;
  const completedToday = quests.filter(q => q.completed).length;
  const totalToday = quests.length || 3;

  // Sync today's live toggled habits into the weekly state
  const syncedWeeklyData = weeklyData.map((item, idx) => {
    if (idx === todayIndex) {
      return {
        ...item,
        completed: completedToday,
        total: totalToday
      };
    }
    return item;
  });

  // Local storage synchronization
  React.useEffect(() => {
    localStorage.setItem('hb_weekly_activity_v2', JSON.stringify(syncedWeeklyData));
  }, [completedToday, totalToday, weeklyData]);

  // Generate 28 Days for the calendar grid
  // Fill each with a dynamic completed state
  // Days 1-28. We'll mark some as fully completed (bloomed - dark rose), partially (light rose), or none (light base)
  const calendarDays = Array.from({ length: 28 }, (_, i) => {
    const dayNum = i + 1;
    // We can simulate which days were active based on our model
    let bloomLevel: 'none' | 'light' | 'medium' | 'full' = 'none';
    if ([1, 3, 5, 8, 11, 12, 15, 16, 19, 20, 22, 24, 25, 27].includes(dayNum)) {
      bloomLevel = 'full';
    } else if ([2, 10, 17, 21, 26, 28].includes(dayNum)) {
      bloomLevel = 'medium';
    } else if ([4, 6, 9, 13, 18, 23].includes(dayNum)) {
      bloomLevel = 'light';
    }
    return { dayNum, bloomLevel };
  });

  return (
    <div className="pb-24">
      {/* 1. Elf Profile Progress Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl border border-outline-variant p-6 shadow-sm mb-6 flex flex-col items-center"
      >
        <div className="relative">
          <AuraBelleAvatar size={110} showBorder={true} level={progress.level} xp={progress.xp} equippedCosmetics={equippedCosmetics} />
          {/* Level Badge Overlay */}
          <div className="absolute -bottom-2 -right-1 bg-primary text-white text-sm font-black border-2 border-white rounded-full w-8 h-8 flex items-center justify-center shadow">
            {progress.level}
          </div>
        </div>

        <h3 className="font-extrabold text-xl text-on-surface mt-4">{progress.displayName}</h3>
        <p className="text-sm font-semibold text-on-surface-variant tracking-sm">Level {progress.level} Adventurer</p>

        {/* Level XP Progress Slider */}
        <div className="w-full mt-4">
          <div className="flex justify-between items-center text-xs font-bold text-on-surface-variant mb-1.5">
            <span>{progress.level === 5 ? "1000 / 1000" : `${progress.xp % 1000} / 1000`} XP</span>
            <span className="text-secondary font-black">
              {progress.level === 5 ? "Max Level!" : `Level ${progress.level + 1}`}
            </span>
          </div>
          
          {/* Custom Glowing XP Bar Container */}
          <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden border border-outline-variant/30">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress.level === 5 ? 100 : (progress.xp % 1000) / 10}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary-container to-primary rounded-full shadow-inner"
            />
          </div>
          
          <p className="text-center text-xs text-on-surface-variant mt-2 font-medium">
            {progress.level === 5 ? "🌟 Garden Sage Master 🌟" : `${1000 - (progress.xp % 1000)} XP to Lv. ${progress.level + 1}`}
          </p>
        </div>
      </motion.div>

      {/* 2. Stat Blocks Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { label: 'Total XP', value: progress.xp.toLocaleString(), icon: <Trophy className="w-5 h-5 text-yellow-600" />, id: 'xp-block' },
          { label: 'Total Crystals', value: progress.crystals.toLocaleString(), icon: <Gem className="w-5 h-5 text-indigo-500" />, id: 'crystals-block' },
          { label: 'Perfect Days', value: progress.perfectDays, icon: <Sparkles className="w-5 h-5 text-amber-500" />, id: 'perfect-block' },
          { label: 'Best Streak', value: `${progress.bestStreak} days`, icon: <Flame className="w-5 h-5 text-red-500" />, id: 'best-streak' }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl border border-outline-variant p-4 text-center flex flex-col items-center justify-center shadow-sm"
            id={stat.id}
          >
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center mb-1">
              {stat.icon}
            </div>
            <span className="text-lg font-black text-on-surface">{stat.value}</span>
            <span className="text-xs font-semibold text-on-surface-variant opacity-80 mt-0.5">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* 3. 7-Day Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-2xl border border-outline-variant p-6 shadow-sm mb-6"
      >
        <div className="flex justify-between items-baseline mb-6 px-1 select-none">
          <h4 className="font-extrabold text-[#7c515a] text-lg tracking-tight">7-Day Activity</h4>
          <span className="text-[#7c515a]/90 font-semibold text-xs sm:text-sm tracking-tight">
            +12% vs last week
          </span>
        </div>

        {/* Bar Chart Container */}
        <div className="flex justify-between items-end h-[140px] px-1 pb-2 border-b border-rose-100/30 relative">
          {syncedWeeklyData.map((item, idx) => {
            const isPerfect = item.completed === item.total && item.total > 0;
            const isToday = idx === todayIndex;

            return (
              <div key={idx} className="flex flex-col items-center flex-1 relative group">
                
                {/* Floating Star/Crystal above full-completion days */}
                {isPerfect && (
                  <motion.div 
                    initial={{ y: 0 }}
                    animate={{ y: [-2, 2, -2], rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="absolute -top-6 text-xs drop-shadow-sm select-none"
                    title="Perfect Completed Day! ✨"
                  >
                    ✨
                  </motion.div>
                )}

                {/* Tactile Tooltip display on hover/focus */}
                <div className="absolute bottom-full mb-3 bg-[#543b44] text-white text-[10px] sm:text-xs font-black tracking-wide py-1.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-30 shadow-[0_4px_12px_rgba(84,59,68,0.25)] select-none">
                  {isToday ? "🗓️ Today: " : ""}{item.completed}/{item.total} habits completed 
                  {isPerfect ? " (Perfect Day! 🌟)" : ""}
                </div>

                <div className="w-full flex justify-center px-1">
                  {/* Glowing Elven Capsule Track for Stacked Segmented Pink Bars */}
                  <div className={`w-7 sm:w-9 md:w-10 h-[108px] bg-[#fff0f2]/50 border ${isToday ? 'border-primary/30 bg-rose-50/70' : 'border-rose-100/40'} rounded-2xl p-1 flex flex-col-reverse gap-1.5 justify-start relative transition-all duration-300`}>
                    {Array.from({ length: item.total || 3 }).map((_, slotIdx) => {
                      const isCompleted = slotIdx < item.completed;
                      
                      // Individual habit block entry animations
                      return (
                        <motion.div
                          key={slotIdx}
                          initial={{ scaleY: 0, opacity: 0 }}
                          animate={{ scaleY: 1, opacity: 1 }}
                          transition={{ delay: idx * 0.04 + slotIdx * 0.03, duration: 0.35, ease: "easeOut" }}
                          className={`flex-1 w-full rounded-xl transition-all duration-300 relative overflow-hidden ${
                            isCompleted
                              ? 'bg-gradient-to-r from-[#ffb3bd] to-[#f9a8d4] shadow-[0_1.5px_4px_rgba(249,168,212,0.3)] border-t border-white/30'
                              : 'bg-rose-100/15 border border-rose-200/10'
                          }`}
                        >
                          {/* Inner 3D glare for completed elven crystals */}
                          {isCompleted && (
                            <div className="absolute inset-x-0 top-0.5 h-1 bg-white/25 rounded-t-full opacity-60" />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Days labels */}
                <span className={`text-xs sm:text-sm font-bold tracking-tight mt-3 text-[#5e414c] ${isToday ? 'text-primary font-black scale-105' : ''}`}>
                  {item.day}
                </span>

                {/* Active day underline helper indicator */}
                {isToday && (
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1 animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 4. Habit Bloom 28-Day Heatmap Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-outline-variant p-5 shadow-sm mb-6"
      >
        <div className="flex items-center space-x-2 mb-4">
          <CalendarDays className="w-5 h-5 text-primary" />
          <h4 className="font-bold text-sm text-on-surface">Habit Bloom Calendar</h4>
        </div>

        {/* Calendar Grid 7 columns */}
        <div className="grid grid-cols-7 gap-2.5 mb-4">
          {calendarDays.map((item) => {
            let bgClass = "bg-surface-container text-on-surface-variant";
            if (item.bloomLevel === 'full') {
              bgClass = "bg-primary text-white font-bold";
            } else if (item.bloomLevel === 'medium') {
              bgClass = "bg-primary-container text-on-primary-container font-semibold";
            } else if (item.bloomLevel === 'light') {
              bgClass = "bg-surface-container-high text-on-surface font-normal";
            }

            return (
              <motion.div
                key={item.dayNum}
                whileHover={{ scale: 1.1 }}
                className={`aspect-square flex items-center justify-center rounded-xl text-xs cursor-pointer shadow-sm border border-outline-variant/10 ${bgClass}`}
                title={`Day ${item.dayNum}: ${item.bloomLevel} active`}
              >
                {item.dayNum}
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-[11px] font-bold text-on-surface-variant border-t border-outline-variant/20 pt-3">
          <span>Less Active</span>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded-md bg-surface-container border border-outline-variant/20" />
            <span className="w-4 h-4 rounded-md bg-surface-container-high border border-outline-variant/20" />
            <span className="w-4 h-4 rounded-md bg-primary-container border border-outline-variant/20" />
            <span className="w-4 h-4 rounded-md bg-primary border" />
          </div>
          <span>Bloomed</span>
        </div>
      </motion.div>

      {/* 5. Active Streaks List */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white rounded-2xl border border-outline-variant p-5 shadow-sm"
      >
        <h4 className="font-extrabold text-sm text-on-surface mb-4">Current Streaks</h4>
        
        <div className="space-y-4">
          {quests.map((quest) => {
            const getIcon = () => {
              switch (quest.icon.toLowerCase()) {
                case 'droplets':
                  return <Droplet className="w-4 h-4 text-sky-600" />;
                case 'bookopen':
                  return <BookOpen className="w-4 h-4 text-amber-700" />;
                default:
                  return <Smartphone className="w-4 h-4 text-neutral-600" />;
              }
            };

            return (
              <div key={quest.id} className="flex items-center justify-between p-3 rounded-xl border border-outline-variant/30 bg-surface-container-low">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-outline-variant/20 flex items-center justify-center">
                    {getIcon()}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">{quest.title}</p>
                    <p className="text-[10px] text-on-surface-variant font-medium opacity-80">{quest.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 font-extrabold text-sm text-orange-600">
                  <span>{quest.streak}</span>
                  <Flame className="w-4 h-4 fill-current text-orange-600" />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
