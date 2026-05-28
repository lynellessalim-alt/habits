/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Moon, 
  Archive, 
  Palette, 
  BookOpen, 
  ChevronRight, 
  RotateCcw, 
  AlertTriangle,
  Sparkles,
  Award,
  BookMarked,
  Feather,
  Check,
  Edit2,
  User
} from 'lucide-react';
import { UserProgress, BazaarItem } from '../types';
import { BAZAAR_ITEMS_DATA } from '../data/bazaarItems';

interface SettingsTabProps {
  progress: UserProgress;
  purchasedRelics: string[];
  isMidnightMode: boolean;
  onToggleMidnightMode: () => void;
  onUpdateDisplayName: (newName: string) => void;
  onResetProgress: () => void;
  onBackToHome: () => void;
  onGoToProfile?: () => void;
}

export function SettingsTab({
  progress,
  purchasedRelics,
  isMidnightMode,
  onToggleMidnightMode,
  onUpdateDisplayName,
  onResetProgress,
  onBackToHome,
  onGoToProfile
}: SettingsTabProps) {
  // Local UI States
  const [showInventory, setShowInventory] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(progress.displayName);

  // Read water tally and journals count from localStorage
  const currentWater = Number(localStorage.getItem("hb_water_total_ml") || "0");
  
  let journalsCount = 0;
  try {
    const savedJournals = localStorage.getItem("hb_journals");
    if (savedJournals) {
      journalsCount = JSON.parse(savedJournals).length;
    }
  } catch (e) {
    console.warn("Journals parsing error inside settings achievements", e);
  }

  const badges = [
    {
      id: "streak_7",
      title: "7-Day Streak Master",
      description: "Maintain a habit streak of 7 days or more. Proof of continuous daily dedication.",
      requirement: "Reach a streak of 7 days",
      current: progress.bestStreak,
      target: 7,
      completed: progress.bestStreak >= 7,
      icon: "🏆",
      bgGradient: "from-amber-100 to-orange-100",
      activeText: "text-amber-750",
      activeBorder: "border-amber-300",
    },
    {
      id: "hydration_hero",
      title: "Hydration Hero",
      description: "Drink at least 2000 ml of healing elixirs in a single day.",
      requirement: "Drink 2000ml of water",
      current: currentWater,
      target: 2000,
      completed: currentWater >= 2000,
      icon: "💧",
      bgGradient: "from-sky-100 to-blue-100",
      activeText: "text-blue-750",
      activeBorder: "border-sky-300",
    },
    {
      id: "novice_florist",
      title: "Novice Florist",
      description: "Prove commitment by growing past your rookie boundaries to Level 2.",
      requirement: "Reach level 2 status",
      current: progress.level,
      target: 2,
      completed: progress.level >= 2,
      icon: "🌿",
      bgGradient: "from-emerald-100 to-teal-100",
      activeText: "text-emerald-750",
      activeBorder: "border-emerald-300",
    },
    {
      id: "crystal_collector",
      title: "Crystal Collector",
      description: "Gather 200 pristine Crystals inside your celestial satchel.",
      requirement: "Have at least 200 crystals",
      current: progress.crystals,
      target: 200,
      completed: progress.crystals >= 200,
      icon: "💎",
      bgGradient: "from-violet-100 to-fuchsia-100",
      activeText: "text-violet-750",
      activeBorder: "border-violet-300",
    },
    {
      id: "relic_hunter",
      title: "Aura Alchemist",
      description: "Unlock at least 2 ancient relics from the enchanted Bazaar.",
      requirement: "Own 2 or more relics",
      current: purchasedRelics.length,
      target: 2,
      completed: purchasedRelics.length >= 2,
      icon: "🧪",
      bgGradient: "from-rose-100 to-pink-100",
      activeText: "text-rose-750",
      activeBorder: "border-rose-300",
    },
    {
      id: "chronicle_historian",
      title: "Citadel Historian",
      description: "Log at least 1 contemplative journal entry about your inner feelings.",
      requirement: "Write 1 journal entry",
      current: journalsCount,
      target: 1,
      completed: journalsCount >= 1,
      icon: "📜",
      bgGradient: "from-yellow-100 to-amber-100",
      activeText: "text-amber-850",
      activeBorder: "border-yellow-300",
    }
  ];

  const completedCount = badges.filter(b => b.completed).length;

  // Dynamic Class/Title based on user Level (Novice Florist for Lvl 12, etc.)
  const getUserTitle = (level: number) => {
    if (level < 5) return 'Seed Sower';
    if (level < 10) return 'Budding Gardener';
    if (level < 15) return 'Novice Florist'; // matches Lvl 12 Novice Florist perfectly!
    if (level < 20) return 'Master Herbalist';
    return 'Legendary Flora Sage';
  };

  const handleSaveName = () => {
    if (editedName.trim()) {
      onUpdateDisplayName(editedName.trim());
      setIsEditingName(false);
    }
  };

  return (
    <div className="space-y-6 pt-1 select-none">
      
      {/* 
        SETTINGS HEADER
        Matches the top section in the image: Back arrow, "Settings" text, and right rounded pill badge
      */}
      <div className="flex items-center justify-between pb-2 bg-[#fff8f7] sticky top-0 z-10 py-1">
        <div className="flex items-center space-x-3.5">
          <button 
            onClick={onBackToHome}
            className="p-1 rounded-full hover:bg-[#ffdacf]/40 transition-colors text-[#854f54] cursor-pointer"
            id="settings-back-btn"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
          <h1 className="font-extrabold text-2xl text-[#854f54] tracking-tight">Settings</h1>
        </div>

        {/* Currency summary badge: 4820 XP • 240 Crystals (styled beautifully to match) */}
        <div className="bg-[#ebd5d7]/50 border border-[#ffdacf]/40 px-3.5 py-1.5 rounded-full text-[11px] font-black text-[#854f54] tracking-wide select-none">
          {progress.xp} XP • {progress.crystals} Crystals
        </div>
      </div>

      {/* 
        AURA HERO PROFILE / CLASS CARD
        Circular profile portrait, opens dressing room & profile
      */}
      <div 
        onClick={onGoToProfile}
        className="bg-[#fffcfc] rounded-3xl border-2 border-dashed border-[#fcd5da]/70 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            
            {/* Visual Portrait Avatar frame with pink boundary */}
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#ffe9eb] to-[#fdd8ca] p-0.5 border border-[#f7b2b7] overflow-hidden flex items-center justify-center shrink-0">
              {/* Cute default avatar or mirror icon */}
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-3xl overflow-hidden">
                🧝‍♀️
              </div>
              <div className="absolute inset-0 bg-[#854f54]/5 rounded-full" />
            </div>

            {/* Profile identity info */}
            <div>
              <h3 className="font-extrabold text-[#514344] text-lg leading-tight group-hover:text-primary transition-colors flex items-center gap-1.5">
                {progress.displayName}
                <Sparkles className="w-3.5 h-3.5 text-rose-450 animate-pulse" />
              </h3>
              <p className="text-xs font-bold text-[#74584d] opacity-80 mt-1">
                Lvl {progress.level} {getUserTitle(progress.level)}
              </p>
            </div>
          </div>

          {/* Trigger dressing room */}
          <div className="flex items-center space-x-1.5 text-xs font-black text-rose-500 bg-rose-50/50 border border-[#fdd8ca]/30 px-3 py-2 rounded-2xl group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500 group-hover:shadow-sm transition-all">
            <span>DRESS UP</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* 
        VISUAL KINGDOM SECTION
      */}
      <div>
        <span className="text-[#854f54] font-black tracking-wider text-[11px] uppercase ml-1 block mb-2 select-none">
          Visual Kingdom
        </span>
        <div className="bg-white rounded-3xl border border-[#ffdacf]/40 divide-y divide-[#ffdacf]/20 overflow-hidden shadow-sm">
          
          {/* Dressing Room & Profile Entry */}
          <button
            onClick={onGoToProfile}
            className="w-full flex items-center justify-between p-4.5 hover:bg-[#fffcfc] transition-colors text-left cursor-pointer group"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-8 h-8 rounded-full bg-[#fce8ea] flex items-center justify-center text-[#854f54] group-hover:text-rose-500 group-hover:bg-[#ffeef0] transition-all">
                <User className="w-4.5 h-4.5 stroke-[2.5]" />
              </div>
              <span className="text-xs font-extrabold text-[#514344] tracking-wide group-hover:text-primary transition-colors">Dressing Room & Profile</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black text-rose-500 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full select-none animate-pulse">
                New Style
              </span>
              <ChevronRight className="w-4.5 h-4.5 text-[#74584d]/50 stroke-[2.5]" />
            </div>
          </button>

          {/* Midnight Mode Toggle Row */}
          <div className="flex items-center justify-between p-4.5">
            <div className="flex items-center space-x-3.5">
              <div className="w-8 h-8 rounded-full bg-[#fce8ea] flex items-center justify-center text-[#854f54]">
                <Moon className="w-4.5 h-4.5 stroke-[2]" />
              </div>
              <span className="text-xs font-extrabold text-[#514344] tracking-wide">Midnight Mode</span>
            </div>
            
            {/* Custom Interactive Switch Toggle Box */}
            <button
              onClick={onToggleMidnightMode}
              className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none cursor-pointer p-0.5 ${
                isMidnightMode ? 'bg-[#854f54]' : 'bg-[#ebd5d7]'
              }`}
            >
              <motion.div
                layout
                className="w-5 h-5 rounded-full bg-white shadow-md"
                animate={{ x: isMidnightMode ? 20 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>

          {/* See Inventory Row */}
          <button
            onClick={() => setShowInventory(true)}
            className="w-full flex items-center justify-between p-4.5 hover:bg-[#fffcfc] transition-colors text-left cursor-pointer group"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-8 h-8 rounded-full bg-[#ebd5d7]/50 flex items-center justify-center text-[#854f54] group-hover:bg-[#fcd5da]/60 transition-all">
                <Archive className="w-4.5 h-4.5 stroke-[2]" />
              </div>
              <span className="text-xs font-extrabold text-[#514344] tracking-wide group-hover:text-primary transition-colors">See Inventory</span>
            </div>
            <ChevronRight className="w-4.5 h-4.5 text-[#74584d]/50 stroke-[2.5]" />
          </button>

          {/* Achievements & Badges Row */}
          <button
            onClick={() => setShowAchievements(true)}
            className="w-full flex items-center justify-between p-4.5 hover:bg-[#fffcfc] transition-colors text-left cursor-pointer group"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-8 h-8 rounded-full bg-[#fae3e5] flex items-center justify-center text-primary group-hover:bg-[#ffeef0] transition-all">
                <Award className="w-4.5 h-4.5 stroke-[2.5]" />
              </div>
              <span className="text-xs font-extrabold text-[#514344] tracking-wide group-hover:text-primary transition-colors">Achievements & Badges</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black text-rose-500 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full select-none">
                {completedCount} / {badges.length} Unlocked
              </span>
              <ChevronRight className="w-4.5 h-4.5 text-[#74584d]/50 stroke-[2.5]" />
            </div>
          </button>

          {/* Thematic Parchment (Coming Soon) Row */}
          <div className="flex items-center justify-between p-4.5 opacity-60 bg-[#fffcfc]/10 cursor-not-allowed">
            <div className="flex items-center space-x-3.5">
              <div className="w-8 h-8 rounded-full bg-[#f8ecec] flex items-center justify-center text-[#a88286]">
                <Palette className="w-4.5 h-4.5 stroke-[2]" />
              </div>
              <span className="text-xs font-extrabold text-[#74584d]/80 tracking-wide">Thematic Parchment</span>
            </div>
            <span className="text-[10px] font-black text-[#74584d]/50 bg-[#fff3f3] px-2.5 py-1 rounded-full border border-[#fdd8ca]/40 select-none">
              Coming Soon
            </span>
          </div>
        </div>
      </div>

      {/* 
        THE CHRONICLES SECTION
      */}
      <div>
        <span className="text-[#854f54] font-black tracking-wider text-[11px] uppercase ml-1 block mb-2 select-none">
          The Chronicles
        </span>
        
        <div className="bg-white rounded-3xl border border-[#ffdacf]/40 p-5 shadow-sm space-y-4">
          
          {/* Main About Garden banner */}
          <div className="flex items-start space-x-4">
            <div className="w-11 h-11 rounded-2xl bg-[#ffdacf]/40 border border-[#f7b2b7]/35 flex items-center justify-center text-[#854f54] shrink-0">
              <BookOpen className="w-5.5 h-5.5 stroke-[2]" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-sm text-[#514344] tracking-wide">About HabitBloom</h4>
              <p className="text-xs text-[#74584d] leading-relaxed font-semibold opacity-90">
                Within these digital gardens, every task is a seed and every habit a blooming flower. We built this realm for those who seek growth through gentleness rather than force.
              </p>
            </div>
          </div>

          <div className="border-t border-[#ffdacf]/30 w-full pt-3.5 space-y-3.5">
            {/* App version row */}
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-[#74584d]/80">App Version</span>
              <span className="text-[#514344] font-black bg-[#fff3f3] px-2 py-0.5 rounded border border-[#fdd8ca]/30">2.4.0 (Petal)</span>
            </div>

            {/* Royal Credits trigger row */}
            <button
              onClick={() => setShowCredits(true)}
              className="w-full border-t border-[#ffdacf]/15 pt-3.5 flex items-center justify-between text-xs font-bold text-[#74584d] hover:text-[#854f54] cursor-pointer"
            >
              <span>Royal Credits</span>
              <ChevronRight className="w-4.5 h-4.5 text-[#74584d]/50 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* 
        DANGER ZONE SECTION
      */}
      <div>
        <span className="text-red-750 font-black tracking-wider text-[11px] uppercase ml-1 block mb-2 select-none">
          Danger Zone
        </span>
        <div className="bg-white rounded-3xl border border-red-200/50 overflow-hidden shadow-sm">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full flex items-center justify-between p-4.5 hover:bg-rose-50/20 active:bg-rose-50/45 transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-red-650">
                <RotateCcw className="w-4.5 h-4.5 stroke-[2.5]" />
              </div>
              <span className="text-xs font-black text-red-650 tracking-wide">Reset Progress</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-rose-50/40 flex items-center justify-center text-red-650/80 border border-rose-100">
              <AlertTriangle className="w-4.5 h-4.5 stroke-[2]" />
            </div>
          </button>
        </div>
      </div>

      {/* 
        INVENTORY MODAL OVERLAY
        Renders an incredible Elven inventory cabinet displaying purchased relics
      */}
      <AnimatePresence>
        {showInventory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white w-full max-w-sm rounded-[28px] border border-[#ffdacf] shadow-2xl p-6 relative overflow-hidden flex flex-col max-h-[520px]"
            >
              {/* Header inside modal */}
              <div className="flex justify-between items-center pb-3.5 border-b border-[#ffdacf]/30">
                <div className="flex items-center space-x-2">
                  <Archive className="w-5.5 h-5.5 text-[#854f54]" />
                  <h3 className="text-base font-extrabold text-[#514344]">Royal Inventory</h3>
                </div>
                <button 
                  onClick={() => setShowInventory(false)}
                  className="text-[#74584d]/60 hover:text-primary transition-colors text-xs font-bold border border-[#fdd8ca]/40 px-3 py-1 bg-[#fff8f7] rounded-full cursor-pointer"
                >
                  Close
                </button>
              </div>

              {/* Inventory items scroll region */}
              <div className="flex-1 overflow-y-auto pt-4 space-y-3 pr-1">
                {purchasedRelics.length === 0 ? (
                  <div className="py-12 text-center text-xs font-semibold text-[#74584d]/60 space-y-3">
                    <Feather className="w-10 h-10 mx-auto text-[#74584d]/30" />
                    <p>Your treasure chests are currently empty.</p>
                    <p className="text-[10px] text-[#74584d]/50 bg-[#fff3f3] px-4 py-2 rounded-xl border border-[#fdd8ca]/20 max-w-[240px] mx-auto">
                      Visit the Bloom Bazaar and exchange your gold crystals for powerful ancient relics!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2.5">
                    {BAZAAR_ITEMS_DATA.filter(item => purchasedRelics.includes(item.id)).map((item) => (
                      <div 
                        key={item.id}
                        className="p-3 bg-gradient-to-r from-[#fffcfc] to-white rounded-2xl border border-[#ffdacf]/35 flex items-start space-x-3 hover:border-[#f7b2b7]/60"
                      >
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-xl shrink-0 shadow-inner">
                          {item.icon === 'double_xp_potion' && '🧪'}
                          {item.icon === 'streak_shield' && '🛡️'}
                          {item.icon === 'motivation_fairy' && '🧚'}
                          {item.icon === 'crystal_luck_elixir' && '🏺'}
                          {item.icon === 'phoenix_feather' && '🪶'}
                          {item.icon === 'starfall_dice' && '🎲'}
                          {item.icon === 'pastel_butterfly_wings' && '🦋'}
                          {item.icon === 'golden_crystal_crown' && '👑'}
                          {item.icon === 'magical_fairy_companion' && '🧚‍♀️'}
                          {item.icon === 'sakura_blossom_outfit' && '👘'}
                          {item.icon === 'pink_star_wand' && '🪄'}
                          {item.icon === 'celestial_princess_gown' && '👗'}
                          {item.icon === 'angel_halo_effect' && '😇'}
                          {item.icon === 'rose_petal_magic_effect' && '🌹'}
                          {item.icon === 'moonlight_fairy_wings' && '🌙'}
                          {item.icon === 'golden_sunflower_hairpin' && '🌻'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <h4 className="text-xs font-black text-[#514344] truncate">{item.title}</h4>
                          </div>
                          <p className="text-[10px] text-[#74584d] font-semibold mt-1 leading-relaxed opacity-90">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-3.5 border-t border-[#ffdacf]/20 text-center">
                <span className="text-[10px] text-[#74584d]/60 font-bold block">
                  Total Relics Unlocked: {purchasedRelics.length} / {BAZAAR_ITEMS_DATA.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        ROYAL CREDITS POPUP MODAL
      */}
      <AnimatePresence>
        {showCredits && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white w-full max-w-xs rounded-3xl border border-[#f7b2b7]/50 shadow-2xl p-6 relative text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-[#fce8ea] flex items-center justify-center text-primary mx-auto border border-outline-variant/30">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>

              <div>
                <h3 className="font-extrabold text-[#514344] text-base">Royal Chronicles</h3>
                <p className="text-[10px] font-black tracking-wider text-[#854f54] uppercase mt-0.5">Realm Crafting Guild</p>
              </div>

              <div className="bg-[#fff8f7] p-3.5 rounded-2xl border border-[#ffdacf]/30 divide-y divide-[#ffdacf]/25 text-left text-xs font-semibold text-[#74584d] space-y-2.5">
                <div className="pt-0 flex justify-between">
                  <span>Botanical Architect</span>
                  <span className="font-extrabold text-[#514344]">Flora the Elf</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span>Ethereal Interface</span>
                  <span className="font-extrabold text-[#514344]">Aura Belle Elf</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span>Companion Sprite</span>
                  <span className="font-extrabold text-[#514344]">Sleepy Sprite</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span>Inspiration Key</span>
                  <span className="font-extrabold text-[#514344]">Gentle Self-Growth</span>
                </div>
              </div>

              <button
                onClick={() => setShowCredits(false)}
                className="w-full py-2.5 rounded-xl bg-[#854f54] text-white text-xs font-black shadow cursor-pointer hover:bg-[#854f54]/95"
              >
                Accept Royal Decree
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        ACHIEVEMENTS & BADGES MODAL OVERLAY
        Displays permanent proof of mastery badges that are dynamically computed
      */}
      <AnimatePresence>
        {showAchievements && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#fffcfc] w-full max-w-md rounded-[32px] border-2 border-amber-300 shadow-2xl p-6 relative overflow-hidden flex flex-col max-h-[580px]"
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-300 via-yellow-500 to-[#854f54]" />

              {/* Header inside modal */}
              <div className="flex justify-between items-center pb-4 border-b border-[#ffdacf]/30 select-none">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-605">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#514344]">Citadel Achievements</h3>
                    <p className="text-[10px] text-[#74584d] font-bold">Proof of Lifetime Realm Mastery</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAchievements(false)}
                  className="text-[#74584d]/60 hover:text-primary transition-colors text-xs font-bold border border-[#fdd8ca]/40 px-3.5 py-1.5 bg-[#fff8f7] rounded-full cursor-pointer hover:bg-rose-50"
                >
                  Close
                </button>
              </div>

              {/* Achievements Progress Bar Summary */}
              <div className="mt-4 p-3.5 bg-gradient-to-r from-amber-50/50 to-orange-50/30 rounded-2xl border border-amber-200/30 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-[#514344] block">Mastery Progress</span>
                  <span className="text-[10px] text-amber-800 font-extrabold">
                    {completedCount === badges.length ? "✨ Perfect Garden Sage Master! 🎉" : `${completedCount} of ${badges.length} badges unlocked`}
                  </span>
                </div>
                <div className="w-24 bg-gray-200/60 rounded-full h-2 overflow-hidden shadow-inner flex border border-gray-300/10">
                  <div 
                    className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(completedCount / badges.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Badges scroll region */}
              <div className="flex-1 overflow-y-auto mt-4 space-y-3.5 pr-1 select-none scrollbar-thin">
                {badges.map((badge) => {
                  const percent = Math.min(100, Math.max(0, (badge.current / badge.target) * 100));

                  return (
                    <div 
                      key={badge.id}
                      className={`p-4 rounded-2xl transition-all duration-300 border-2 overflow-hidden relative flex flex-col ${
                        badge.completed 
                          ? `${badge.activeBorder} bg-white shadow-md hover:shadow-lg` 
                          : "border-neutral-200/30 bg-[#fffcfc]/40 opacity-70"
                      }`}
                    >
                      {/* Shiny subtle visual background badge sweep for completed ones */}
                      {badge.completed && (
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-100/30 via-transparent to-transparent pointer-events-none rounded-bl-full" />
                      )}

                      <div className="flex items-start gap-4">
                        {/* Huge Round Badge Icon */}
                        <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-2xl relative shadow-sm border ${
                          badge.completed 
                            ? `bg-gradient-to-br ${badge.bgGradient} border-amber-200` 
                            : "bg-neutral-100 border-neutral-250/40 grayscale"
                        }`}>
                          <span>{badge.icon}</span>

                          {/* Level stamp label */}
                          {badge.completed && (
                            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-full p-0.5 border border-white shadow-sm flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`text-xs font-extrabold ${badge.completed ? "text-[#514344]" : "text-[#74584d]/75"}`}>
                              {badge.title}
                            </h4>
                            <span className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded ${
                              badge.completed 
                                ? "bg-amber-100/70 text-amber-800" 
                                : "bg-neutral-150 text-neutral-400"
                            }`}>
                              {badge.completed ? "UNLOCKED" : "LOCKED"}
                            </span>
                          </div>
                          
                          <p className={`text-[10px] leading-relaxed font-semibold ${badge.completed ? "text-[#74584d]" : "text-[#74584d]/60"}`}>
                            {badge.description}
                          </p>

                          {/* Target and Progress fraction bar */}
                          <div className="pt-2">
                            <div className="flex justify-between items-center text-[9px] font-bold text-[#74584d]/80 mb-1">
                              <span>{badge.requirement}</span>
                              <span>
                                {badge.completed ? `${badge.target}+` : `${badge.current}`} / {badge.target}
                              </span>
                            </div>
                            <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden border border-neutral-200/10 shadow-inner">
                              <div 
                                className={`h-full rounded-full transition-all duration-300 ${
                                  badge.completed ? "bg-amber-400" : "bg-neutral-300"
                                }`}
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 pt-3 border-t border-[#ffdacf]/20 text-center">
                <span className="text-[10px] text-[#74584d]/60 font-black block tracking-wide uppercase">
                  🏆 Permanent Proof of Citadel Fellowship 🏆
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        RESET PROGRESS DANGER DIALOG
      */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 40 }}
              className="bg-white rounded-3xl border-2 border-red-350 p-6 max-w-xs w-full text-center relative shadow-2xl space-y-4"
            >
              <div className="w-14 h-14 rounded-full bg-rose-50 border border-red-200 flex items-center justify-center text-red-650 mx-auto">
                <AlertTriangle className="w-7 h-7 stroke-[2]" />
              </div>

              <div>
                <h3 className="text-lg font-black text-[#514344] leading-tight">Reset Progress?</h3>
                <p className="text-xs font-semibold text-[#74584d] mt-1 lead-snug">
                  You are about to restore initial seed status. This will reset your level, clear purchased relics inventory, and wipe all diary entries.
                </p>
              </div>

              <div className="bg-rose-50/40 p-3 rounded-2xl border border-rose-100 text-[10px] text-red-650 font-black tracking-wide leading-relaxed uppercase">
                ⚠️ THIS ACTION IS ABSOLUTELY IRREVERSIBLE
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#ffdacf] text-[#74584d] text-xs font-black hover:bg-[#fff8f7] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onResetProgress();
                    setShowResetConfirm(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-red-650 text-white text-xs font-black shadow hover:bg-red-750 cursor-pointer"
                >
                  Reset Realm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
