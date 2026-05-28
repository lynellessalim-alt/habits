/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home as HomeIcon,
  BarChart2,
  BookMarked,
  ShieldCheck,
  Sword,
  Gem,
  Sparkles,
  Flame,
  Clock,
  Plus,
  Compass,
  Smile,
  LogOut,
  LogIn,
  PartyPopper,
  Settings as SettingsIcon,
  User,
} from "lucide-react";

import {
  UserProgress,
  Quest,
  ActivityLog,
  JournalEntry,
  BazaarItem,
} from "./types";
import { StatsTab } from "./components/StatsTab";
import { JournalTab } from "./components/JournalTab";
import { SettingsTab } from "./components/SettingsTab";
import { BazaarTab } from "./components/BazaarTab";
import { QuestItem } from "./components/QuestItem";
import { ProfileTab } from "./components/ProfileTab";
import {
  DailyQuoteCard,
  HabitHeatmap,
  HabitCompletionRing,
  ShineStreakCounter,
  BonusQuestsPanel,
  CinematicLevelUpScreen,
  CanvasConfetti,
  playMagicSFX
} from "./components/ExtraFeatures";
import { playSylvanSFX } from "./utils/sylvanAudio";
import { AIHabitsVerification } from "./components/AIHabitsVerification";
import {
  AuraBelleAvatar,
  EnemySleepySprite,
  EnemyDoubtWitch,
  EnemyEclipseQueen,
} from "./components/illustrations";
import {
  db,
  auth,
  isFirebaseConfigured,
  signInWithGoogle,
  logOutUser,
  handleFirestoreError,
  OperationType,
} from "./firebase";

import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

interface ActiveTierBackgroundProps {
  level: number;
}

export const ActiveTierBackground: React.FC<ActiveTierBackgroundProps> = ({ level }) => {
  const tier = level <= 1 ? 1 : level === 2 ? 2 : level === 3 ? 3 : level === 4 ? 4 : 5;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-all duration-1000 select-none">
      {/* Dynamic Ambient Background Gradients based on Level Tier */}
      {tier === 1 && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#fff3f5] via-[#fffdf5] to-[#fff5ec] transition-all duration-1000">
          {/* Blossom Meadow Scene Details */}
          {/* Soft floating clouds */}
          <div className="absolute top-10 left-4 w-12 h-6 bg-white/70 rounded-full blur-[1.5px] opacity-60 animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute top-24 right-6 w-16 h-8 bg-white/60 rounded-full blur-[1.5px] opacity-50 animate-pulse" style={{ animationDuration: '8s' }} />
          
          {/* Meadow flowers & sparkles */}
          <div className="absolute bottom-16 left-8 text-lg opacity-40">🌸</div>
          <div className="absolute bottom-24 right-12 text-base opacity-30">🌼</div>
          <div className="absolute bottom-12 right-24 text-sm opacity-45">🌷</div>
          
          {/* Sparkles */}
          <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-ping" />
          <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-pink-300 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-amber-200 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />

          {/* Cozy village signpost representation at bottom */}
          <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-emerald-100/40 to-transparent flex items-end justify-center pb-1">
            <span className="text-[10px] font-black tracking-widest text-[#a8826c] uppercase opacity-75">🏡 Blossom Meadow 🏡</span>
          </div>
        </div>
      )}

      {tier === 2 && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#fff4eb] via-[#ffe8d6] to-[#f5f0fa] transition-all duration-1000">
          {/* Sunset Garden Scene Details */}
          {/* Glowing lanterns */}
          <div className="absolute top-16 right-10 w-4 h-4 bg-amber-400 rounded-full shadow-[0_0_12px_#fbbf24] animate-pulse" />
          <div className="absolute top-28 left-8 w-3 h-3 bg-orange-300 rounded-full shadow-[0_0_10px_#f97316] animate-pulse" style={{ animationDelay: '1.5s' }} />
          
          {/* Floating petals & cherry blossoms */}
          <div className="absolute top-12 left-1/3 text-xs opacity-40 animate-bounce" style={{ animationDuration: '4s' }}>🌸</div>
          <div className="absolute top-36 right-1/4 text-xs opacity-50 animate-bounce" style={{ animationDuration: '5s', animationDelay: '0.8s' }}>🌸</div>
          <div className="absolute bottom-32 left-10 text-xs opacity-30">🌸</div>
          
          {/* Crystal Pond highlight at bottom */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-12 bg-sky-200/25 rounded-[100%] filter blur-md mix-blend-screen animate-pulse" style={{ animationDuration: '7s' }} />
          
          <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-orange-100/35 to-transparent flex items-end justify-center pb-1">
            <span className="text-[10px] font-black tracking-widest text-amber-700/60 uppercase opacity-80">🏮 Sunset Garden 🏮</span>
          </div>
        </div>
      )}

      {tier === 3 && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0ebfc] via-[#e6effe] to-[#f9eaf2] transition-all duration-1000">
          {/* Moonlit Crystal Forest Scene Details */}
          {/* Glowing mushrooms and lights */}
          <div className="absolute bottom-16 left-6 text-sm opacity-50">🍄</div>
          <div className="absolute bottom-10 right-8 text-sm opacity-40">🍄</div>
          
          {/* Glowing crystal shapes */}
          <div className="absolute bottom-14 left-1/4 text-xs opacity-50 animate-pulse">💎</div>
          <div className="absolute bottom-20 right-1/3 text-xs opacity-40 animate-pulse" style={{ animationDelay: '1.2s' }}>💎</div>
          
          {/* Floating lights */}
          <div className="absolute top-16 left-12 w-2 h-2 bg-indigo-300 rounded-full shadow-[0_0_8px_#818cf8] animate-pulse" />
          <div className="absolute top-32 right-12 w-2.5 h-2.5 bg-purple-300 rounded-full shadow-[0_0_10px_#c084fc] animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-48 left-1/3 w-1.5 h-1.5 bg-sky-300 rounded-full shadow-[0_0_8px_#38bdf8] animate-pulse" style={{ animationDelay: '1s' }} />
          
          {/* Magical deer shadow representation */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-35 text-lg">🦌</div>

          <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-indigo-100/40 to-transparent flex items-end justify-center pb-1">
            <span className="text-[10px] font-black tracking-widest text-[#6366f1] uppercase opacity-75 font-mono">✨ Crystal Forest ✨</span>
          </div>
        </div>
      )}

      {tier === 4 && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#fff7e6] via-[#e3f0ff] to-[#fff0e6] transition-all duration-1000">
          {/* Celestial Sky Kingdom Scene Details */}
          {/* Giant moon background */}
          <div className="absolute top-10 right-6 w-16 h-16 rounded-full bg-[#fef3c7] opacity-25 blur-[1px] shadow-[0_0_20px_#fef3c7]" />
          
          {/* Floating castles & bridges representation */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-2xl opacity-20 filter drop-shadow">🏰</div>
          
          {/* Floating islands clouds */}
          <div className="absolute top-1/3 left-4 w-20 h-6 bg-white/80 rounded-full blur-[2px] opacity-70 animate-pulse" style={{ animationDuration: '9s' }} />
          <div className="absolute bottom-1/3 right-4 w-24 h-8 bg-white/70 rounded-full blur-[2px] opacity-65 animate-pulse" style={{ animationDuration: '11s' }} />
          
          {/* Angelic representation */}
          <div className="absolute top-24 left-8 text-xl opacity-20">👼</div>

          <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-sky-100/45 to-transparent flex items-end justify-center pb-1">
            <span className="text-[10px] font-black tracking-widest text-[#b45309] uppercase opacity-75 font-serif">☁️ Sky Kingdom ☁️</span>
          </div>
        </div>
      )}

      {tier === 5 && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffeef4] via-[#f7ebff] to-[#e6e2ff] transition-all duration-1000">
          {/* Eternal Starlight Palace Scene Details */}
          {/* Pink galaxy radial nebula */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-56 h-56 bg-pink-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-24 left-1/4 w-44 h-44 bg-indigo-400/10 rounded-full blur-3xl" />
          
          {/* Connected constellation lines / dots */}
          <svg className="absolute inset-0 w-full h-1/2 opacity-25" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="15" cy="20" r="1.5" fill="#ec4899" />
            <circle cx="35" cy="15" r="2" fill="#f43f5e" />
            <circle cx="55" cy="25" r="1.5" fill="#ec4899" />
            <circle cx="75" cy="10" r="2.5" fill="#d946ef" className="animate-ping" />
            <line x1="15" y1="20" x2="35" y2="15" stroke="#ec4899" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="35" y1="15" x2="55" y2="25" stroke="#ec4899" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="55" y1="25" x2="75" y2="10" stroke="#ec4899" strokeWidth="0.5" strokeDasharray="2 2" />
          </svg>
          
          {/* Radiant stars and waterfall shadow */}
          <div className="absolute top-8 left-10 text-xs opacity-50 animate-ping" style={{ animationDuration: '4s' }}>⭐</div>
          <div className="absolute top-28 right-12 text-xs opacity-40 animate-ping" style={{ animationDuration: '3s' }}>⭐</div>
          <div className="absolute top-44 left-1/3 text-[10px] opacity-60 animate-bounce">⭐</div>
          
          {/* Massive crystal throne representation */}
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 text-3xl opacity-20 filter drop-shadow">👑</div>
          
          <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-purple-100/40 to-transparent flex items-end justify-center pb-1">
            <span className="text-[10px] font-black tracking-widest text-[#a21caf] uppercase opacity-75 font-mono">👑 Starlight Palace 👑</span>
          </div>
        </div>
      )}
    </div>
  );
};

const getCompletedBadgeIds = (
  lvl: number,
  streak: number,
  crystals: number,
  water: number,
  journalCount: number,
  relicsCount: number
) => {
  const ids: string[] = [];
  if (streak >= 7) ids.push("streak_7");
  if (water >= 2000) ids.push("hydration_hero");
  if (lvl >= 2) ids.push("novice_florist");
  if (crystals >= 200) ids.push("crystal_collector");
  if (relicsCount >= 2) ids.push("relic_hunter");
  if (journalCount >= 1) ids.push("chronicle_historian");
  return ids;
};

export const getCoinMultiplier = (streak: number) => {
  if (streak <= 0) return 1.0;
  if (streak <= 2) return 1.2;
  return 1.5;
};

export default function App() {
  // Badge detection states
  const [completedBadgeIds, setCompletedBadgeIds] = useState<string[]>([]);
  const isBadgeSystemInitialized = React.useRef(false);

  // Current active navigation tab
  const [activeTab, setActiveTab] = useState<
    "home" | "stats" | "bazaar" | "settings" | "journal" | "profile"
  >("home");

  // Active Antagonist Attack state
  const [activeAttack, setActiveAttack] = useState<{
    level: number;
    name: string;
    description: string;
    warningText: string;
    triggerDate: string;
    dismissed: boolean;
  } | null>(() => {
    const cached = localStorage.getItem("hb_active_attack");
    return cached ? JSON.parse(cached) : null;
  });

  // Toggle state to show/hide the debug simulation portal
  const [showIncursionPortal, setShowIncursionPortal] =
    useState<boolean>(false);

  // Midnight Mode state
  const [isMidnightMode, setIsMidnightMode] = useState<boolean>(() => {
    return localStorage.getItem("hb_midnight_mode") === "true";
  });

  const handleToggleMidnightMode = () => {
    setIsMidnightMode((prev) => {
      const newVal = !prev;
      localStorage.setItem("hb_midnight_mode", String(newVal));
      return newVal;
    });
  };

  // Core User state
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Stats Progress defaults mirroring the screenshots exactly
  const [progress, setProgress] = useState<UserProgress>({
    uid: "local-user",
    displayName: "Elara Weaver",
    email: "info@habitbloom.fantasy",
    photoURL: null,
    xp: 1650,
    level: 2,
    xpToNextLevel: 1000,
    crystals: 240,
    perfectDays: 18,
    bestStreak: 12,
    currentStreak: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // Today's Quests state (starts with screenshot defaults)
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: "q-water",
      userId: "local-user",
      title: "Drink 2L Water",
      description: "Easy • +5 XP • +5 Crystals on 3d streak",
      xpReward: 5,
      icon: "droplets",
      streak: 5,
      completed: false,
      lastCompletedAt: null,
      isDefault: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "q-study",
      userId: "local-user",
      title: "45m Study",
      description: "Medium • +10 XP • +10 Crystals",
      xpReward: 10,
      icon: "bookopen",
      streak: 12,
      completed: true,
      lastCompletedAt: new Date().toISOString(),
      isDefault: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "q-phone",
      userId: "local-user",
      title: "1hr No Phone",
      description: "Hard • +15 XP • +15 Crystals",
      xpReward: 15,
      icon: "smartphonecharging",
      streak: 0,
      completed: false,
      lastCompletedAt: null,
      isDefault: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  // History logs and mental journals
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [purchasedRelics, setPurchasedRelics] = useState<string[]>([]);
  const [equippedCosmetics, setEquippedCosmetics] = useState<string[]>(() => {
    const saved = localStorage.getItem("hb_equipped_cosmetics");
    return saved ? JSON.parse(saved) : [];
  });

  // Interactive popup/toast details
  const [toast, setToast] = useState<{
    id: number;
    message: string;
    type: "success" | "level" | "info";
  } | null>(null);
  const [levelUpModal, setLevelUpModal] = useState<number | null>(null);

  // New states for extra RPG Features and AI trackers
  const [currentWaterTotalMl, setCurrentWaterTotalMl] = useState<number>(() => {
    const saved = localStorage.getItem("hb_water_total_ml");
    return saved ? Number(saved) : 450;
  });
  const [questConfettiActive, setQuestConfettiActive] = useState<boolean>(false);

  // Sparkly sound effects using browser SpeechSynthesis or Audio Synthesis
  const playQuestSFX = (isCheck: boolean) => {
    try {
      if (isCheck) {
        // Trigger visual confetti burst across the screen!
        setQuestConfettiActive(true);
        setTimeout(() => setQuestConfettiActive(false), 2000);
        playSylvanSFX("task_completed");
      } else {
        // Simple downward tick for unchecking
        const context = new (
          window.AudioContext || (window as any).webkitAudioContext
        )();
        if (context.state === "suspended") {
          context.resume();
        }
        const osc = context.createOscillator();
        const gain = context.createGain();
        osc.connect(gain);
        gain.connect(context.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(392.0, context.currentTime); // G4
        osc.frequency.exponentialRampToValueAtTime(
          261.63,
          context.currentTime + 0.15,
        ); // C4
        gain.gain.setValueAtTime(0.08, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.01,
          context.currentTime + 0.3,
        );
        osc.start();
        osc.stop(context.currentTime + 0.35);
      }
    } catch (e) {
      console.log(
        "Audio contextual oscillator silenced or restricted by iframe permission",
      );
    }
  };

  // Setup visual feedback toast
  const triggerToast = (
    message: string,
    type: "success" | "level" | "info" = "success",
  ) => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev && prev.id === id ? null : prev));
    }, 3000);
  };

  // Auth Status triggers
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      loadLocalState();
      return;
    }

    const unsub = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await syncUserFromCloud(currentUser.uid);
      } else {
        setUser(null);
        loadLocalState();
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // Dynamic Real-time Badge Unlocking Engine
  useEffect(() => {
    if (loading) return;

    const currentBadges = getCompletedBadgeIds(
      progress.level,
      progress.bestStreak,
      progress.crystals,
      currentWaterTotalMl,
      journalEntries.length,
      purchasedRelics.length
    );

    if (!isBadgeSystemInitialized.current) {
      // Initialize completed list on boot without firing sound effects
      setCompletedBadgeIds(currentBadges);
      isBadgeSystemInitialized.current = true;
    } else {
      // Find badges that are newly completed
      const newlyEarned = currentBadges.filter(id => !completedBadgeIds.includes(id));
      if (newlyEarned.length > 0) {
        setCompletedBadgeIds(currentBadges);
        
        // Play Achievement Badge Earned → triumphant fantasy jingle!
        playSylvanSFX("badge_earned");

        const badgeNames: Record<string, string> = {
          streak_7: "7-Day Streak Master 🏆",
          hydration_hero: "Hydration Hero 💧",
          novice_florist: "Novice Florist 🌿",
          crystal_collector: "Crystal Collector 💎",
          relic_hunter: "Aura Alchemist 🧪",
          chronicle_historian: "Citadel Historian 📜"
        };

        newlyEarned.forEach(bId => {
          const name = badgeNames[bId] || "Sylvan Achievement";
          triggerToast(`🏆 ADVENTURER BADGE EARNED: ${name}! 🎉✨`, "success");
        });
      }
    }
  }, [
    progress.level,
    progress.bestStreak,
    progress.crystals,
    currentWaterTotalMl,
    journalEntries.length,
    purchasedRelics.length,
    loading
  ]);

  // Overwrite local state with Level 2 and 1650 XP once during initialization to cleanly transition testing state
  useEffect(() => {
    if (loading) return;

    const forcedV5 = localStorage.getItem("hb_force_level2_cumulative_v5");
    if (forcedV5 !== "true") {
      setProgress((prev) => {
        const updated = {
          ...prev,
          level: 2,
          xp: 1650,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem("hb_force_level2_cumulative_v5", "true");
        localStorage.setItem("hb_progress", JSON.stringify(updated));
        
        if (user && db) {
          const userRef = doc(db, "users", user.uid);
          updateDoc(userRef, {
            level: 2,
            xp: 1650,
            updatedAt: new Date().toISOString()
          }).catch((err) => console.warn("Failed to sync forced level 2 reset to cloud: ", err));
        }
        return updated;
      });
    }
  }, [loading, user]);

  // Yesterday missed check tracker
  useEffect(() => {
    if (loading) return;

    const checkYesterdayHabits = async () => {
      const todayStr = new Date().toISOString().split("T")[0];
      const lastCheckedDate = localStorage.getItem("hb_last_checked_date");

      // If we have a lastCheckedDate and it is a new day
      if (lastCheckedDate && lastCheckedDate !== todayStr) {
        // Did we miss any habit yesterday?
        const missedAny = quests.some((q) => !q.completed);

        let updatedProgress = { ...progress };

        if (missedAny) {
          // Trigger corresponding level's attack!
          await triggerAttackForXP(progress.xp, todayStr);
          
          updatedProgress = {
            ...progress,
            currentStreak: 0,
            updatedAt: new Date().toISOString()
          };
          setProgress(updatedProgress);
          triggerToast("Thy consecutive daily streak was broken! Multiplier dropped to 1.0x 📉", "info");
        } else {
          // All completed! Success, reward client
          triggerToast(
            "All yesterday's quests were completed! The Citadel is safe! 🌟",
            "success",
          );
          
          const newStreak = progress.currentStreak + 1;
          const newBest = Math.max(progress.bestStreak, newStreak);
          updatedProgress = {
            ...progress,
            currentStreak: newStreak,
            bestStreak: newBest,
            updatedAt: new Date().toISOString()
          };
          setProgress(updatedProgress);
        }

        // Reset all quests completed state for today!
        const resetQuests = quests.map((q) => ({
          ...q,
          completed: false,
          updatedAt: new Date().toISOString(),
        }));
        setQuests(resetQuests);

        localStorage.setItem("hb_last_checked_date", todayStr);
        persistLocalState(
          updatedProgress,
          resetQuests,
          journalEntries,
          purchasedRelics,
        );

        if (user && db) {
          try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { 
              lastCheckedDate: todayStr,
              currentStreak: updatedProgress.currentStreak,
              bestStreak: updatedProgress.bestStreak,
              updatedAt: new Date().toISOString()
            });
            for (const q of resetQuests) {
              const qRef = doc(db, "users", user.uid, "quests", q.id);
              await updateDoc(qRef, { completed: false });
            }
          } catch (e) {
            console.warn(e);
          }
        }
      } else if (!lastCheckedDate) {
        // First load registration safeguard
        localStorage.setItem("hb_last_checked_date", todayStr);
      }
    };

    checkYesterdayHabits();
  }, [loading]);

  const triggerAttackForXP = async (
    xpValue: number,
    dateStr: string,
    forceLevel?: number,
  ) => {
    const levelToTrigger =
      forceLevel ?? (xpValue <= 500 ? 1 : xpValue <= 1500 ? 2 : 3);
    let newAttack = null;

    if (levelToTrigger === 1) {
      newAttack = {
        level: 1,
        name: "The Sleepy Sprite",
        description:
          "A small pastel shadow creature with droopy eyes, floating clouds, and sleepy sparkles.",
        warningText:
          "Drowsy Aura: Streak froze for 1 day! Screen is slightly dimmed, and sad rain clouds surround your profile.",
        triggerDate: dateStr,
        dismissed: false,
      };
      triggerToast("The Sleepy Sprite attacked! You feel drowsy... ❄️", "info");
    } else if (levelToTrigger === 2) {
      newAttack = {
        level: 2,
        name: "The Doubt Witch",
        description:
          "A floating dark fairy with faded pink wings, smoky magic, and glowing purple eyes.",
        warningText:
          "Whisper of Doubt: XP gain is reduced by 25% today! Your avatar glow faded, and the motivational quotes vanished.",
        triggerDate: dateStr,
        dismissed: false,
      };
      triggerToast(
        "The Doubt Witch whispered doubts in your ear... 🔮",
        "info",
      );
    } else {
      newAttack = {
        level: 3,
        name: "The Eclipse Queen",
        description:
          "A powerful shadow empress covered in dark crystal armour with black-and-pink energy swirling around her.",
        warningText:
          "Total Eclipse: Lost 50 Crystals immediately! Your streak statistics are hidden, and a dark eclipse covers the citadel.",
        triggerDate: dateStr,
        dismissed: false,
      };

      // Level 3 Attack: Deduct 50 crystals immediately
      setProgress((prev) => {
        const finalCrystals = Math.max(0, prev.crystals - 50);
        return {
          ...prev,
          crystals: finalCrystals,
          updatedAt: new Date().toISOString(),
        };
      });

      triggerToast(
        "The Eclipse Queen triggered a total eclipse! Lost 50 Crystals! 🌑",
        "info",
      );
    }

    setActiveAttack(newAttack);
    localStorage.setItem("hb_active_attack", JSON.stringify(newAttack));
  };

  // Gracefully read local values if offline or cloud database pending
  const loadLocalState = () => {
    const savedProgress = localStorage.getItem("hb_progress");
    const savedQuests = localStorage.getItem("hb_quests");
    const savedJournals = localStorage.getItem("hb_journals");
    const savedRelics = localStorage.getItem("hb_relics");
    const savedEquipped = localStorage.getItem("hb_equipped_cosmetics");

    if (savedProgress) setProgress(JSON.parse(savedProgress));
    if (savedQuests) setQuests(JSON.parse(savedQuests));
    if (savedJournals) setJournalEntries(JSON.parse(savedJournals));
    if (savedRelics) setPurchasedRelics(JSON.parse(savedRelics));
    if (savedEquipped) setEquippedCosmetics(JSON.parse(savedEquipped));
  };

  // Write changes to local DB helper
  const persistLocalState = (
    p: UserProgress,
    q: Quest[],
    j: JournalEntry[],
    r: string[],
    eq: string[] = equippedCosmetics,
  ) => {
    localStorage.setItem("hb_progress", JSON.stringify(p));
    localStorage.setItem("hb_quests", JSON.stringify(q));
    localStorage.setItem("hb_journals", JSON.stringify(j));
    localStorage.setItem("hb_relics", JSON.stringify(r));
    localStorage.setItem("hb_equipped_cosmetics", JSON.stringify(eq));
  };

  // Synchronize Cloud Firestore records
  const syncUserFromCloud = async (userId: string) => {
    if (!db) return;
    try {
      // 1. User Info check
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      let activeProgress = progress;
      let activeEquipped = equippedCosmetics;
      if (userSnap.exists()) {
        const userData = userSnap.data();
        activeProgress = {
          ...progress,
          ...userData,
          uid: userId,
        } as UserProgress;
        setProgress(activeProgress);
        if (userData.equippedCosmetics) {
          activeEquipped = userData.equippedCosmetics;
          setEquippedCosmetics(activeEquipped);
        }
      } else {
        // First Login - Provision cloud documents with the screenshot defaults
        const initialProfile = {
          ...progress,
          uid: userId,
          displayName: auth?.currentUser?.displayName || "Elara Weaver",
          email: auth?.currentUser?.email || "",
          photoURL: auth?.currentUser?.photoURL || null,
        };
        await setDoc(userRef, {
          ...initialProfile,
          equippedCosmetics: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        activeProgress = initialProfile;
      }

      // 2. Quests list syncing
      const questsCol = collection(db, "users", userId, "quests");
      const questsSnap = await getDocs(questsCol);
      let activeQuests = quests;

      if (!questsSnap.empty) {
        activeQuests = questsSnap.docs.map((doc) => doc.data() as Quest);
        setQuests(activeQuests);
      } else {
        // Store our default habits to Cloud Firestore
        for (const q of quests) {
          const questDocRef = doc(db, "users", userId, "quests", q.id);
          await setDoc(questDocRef, { ...q, userId });
        }
      }

      // 3. Journal entries
      const journalCol = collection(db, "users", userId, "journals");
      const journalSnap = await getDocs(journalCol);
      let activeJournals: JournalEntry[] = [];
      if (!journalSnap.empty) {
        activeJournals = journalSnap.docs.map(
          (doc) => doc.data() as JournalEntry,
        );
        setJournalEntries(activeJournals);
      }

      // 4. Relics list from local state
      const relicsDoc = doc(db, "users", userId, "relics", "unlocked");
      const relicsSnap = await getDoc(relicsDoc);
      let activeRelics = purchasedRelics;
      if (relicsSnap.exists()) {
        activeRelics = relicsSnap.data().items || [];
        setPurchasedRelics(activeRelics);
      }

      persistLocalState(
        activeProgress,
        activeQuests,
        activeJournals,
        activeRelics,
        activeEquipped,
      );
    } catch (error) {
      console.warn(
        "Network sync warning - proceeding safely in local sandbox cache mode: ",
        error,
      );
    }
  };

  // Login click
  const handleAuthClick = async () => {
    try {
      const loggedUser = await signInWithGoogle();
      if (loggedUser) {
        setUser(loggedUser);
        await syncUserFromCloud(loggedUser.uid);
        triggerToast(
          `Welcome to the Citadels, ${loggedUser.displayName}! 🏰`,
          "info",
        );
      }
    } catch (error) {
      console.error("Google Auth error:", error);
      const msg = error instanceof Error ? error.message : String(error);
      if (msg.includes("popup")) {
        triggerToast("Sign-in popup was dismissed. Please try again.", "info");
      } else {
        triggerToast("Google authentication failed. Please retry.", "info");
      }
    }
  };

  // Sign out click
  const handleSignOut = async () => {
    await logOutUser();
    setUser(null);
    loadLocalState();
    triggerToast("Logged out of the cloud. Safe travels, Adventurer!", "info");
  };

  // QUESTS LOGIC ACTIONS
  const handleToggleQuest = async (questId: string) => {
    if (questId === "q-water" || questId === "q-study" || questId === "q-phone") {
      triggerToast("⚠️ This habit can only be completed by running its AI Verification check below!", "info");
      playQuestSFX(false);
      return;
    }

    let nextAttackState = activeAttack;

    const updatedQuests = quests.map((q) => {
      if (q.id === questId) {
        const isNowCompleted = !q.completed;
        const newCompletedAt = isNowCompleted ? new Date().toISOString() : null;

        // Attack Level 1: Streak freezes
        const isFrozen = activeAttack?.level === 1;
        const newStreak = isNowCompleted
          ? isFrozen
            ? q.streak
            : q.streak + 1
          : Math.max(0, q.streak - 1);

        // Play SFX
        playQuestSFX(isNowCompleted);

        // Adjust stats progress instantly (XP and Crystals rewards)
        let xpGained = isNowCompleted ? q.xpReward : -q.xpReward;

        // Attack Level 2: XP reduced by 25%
        if (isNowCompleted && activeAttack?.level === 2 && xpGained > 0) {
          xpGained = Math.round(xpGained * 0.75);
        }

        let crystalGained = isNowCompleted
          ? Math.round(q.xpReward / 3)
          : -Math.round(q.xpReward / 3);

        if (isNowCompleted && crystalGained > 0) {
          const coinMultiplier = getCoinMultiplier(progress.currentStreak);
          crystalGained = Math.round(crystalGained * coinMultiplier);
        }

        updateStats(xpGained, crystalGained, isNowCompleted);

        return {
          ...q,
          completed: isNowCompleted,
          streak: newStreak,
          lastCompletedAt: newCompletedAt,
          updatedAt: new Date().toISOString(),
        };
      }
      return q;
    });

    setQuests(updatedQuests);

    // Check if boss defeated today
    const countCompletedToday = updatedQuests.filter((q) => q.completed).length;
    const isAllDone =
      updatedQuests.length > 0 && countCompletedToday === updatedQuests.length;

    if (nextAttackState && isAllDone) {
      const bonus =
        nextAttackState.level === 1
          ? 10
          : nextAttackState.level === 2
            ? 25
            : 50;
      nextAttackState = null;
      localStorage.removeItem("hb_active_attack");
      setActiveAttack(null);

      triggerToast(
        `⚔️ Victory! You defeated the boss and dispelled the curse! Bonus +${bonus} Crystals awarded! 🎉`,
        "level",
      );

      // Award crystal victory bonus to active progression
      setProgress((prev) => {
        const newVal = prev.crystals + bonus;
        // Also save to Firestore
        if (user && db) {
          const userRef = doc(db, "users", user.uid);
          updateDoc(userRef, { crystals: newVal }).catch(console.warn);
        }
        return {
          ...prev,
          crystals: newVal,
          updatedAt: new Date().toISOString(),
        };
      });
    }

    // Save to Firestore if database live
    if (user && db) {
      try {
        const questRef = doc(db, "users", user.uid, "quests", questId);
        const questToUpdate = updatedQuests.find((q) => q.id === questId);
        if (questToUpdate) {
          await updateDoc(questRef, {
            completed: questToUpdate.completed,
            streak: questToUpdate.streak,
            lastCompletedAt: questToUpdate.lastCompletedAt,
            updatedAt: questToUpdate.updatedAt,
          });
        }
      } catch (e) {
        handleFirestoreError(
          e,
          OperationType.UPDATE,
          `users/${user.uid}/quests/${questId}`,
        );
      }
    }

    const matchedQuest = quests.find((q) => q.id === questId);
    if (matchedQuest) {
      if (!matchedQuest.completed) {
        triggerToast(
          `Completed: ${matchedQuest.title}! +${matchedQuest.xpReward} XP & Gold! ✨`,
          "success",
        );
      } else {
        triggerToast(
          `Recalled Quest Progress for ${matchedQuest.title}.`,
          "info",
        );
      }
    }

    persistLocalState(progress, updatedQuests, journalEntries, purchasedRelics);
  };

  // Add Custom Habit Quest
  const handleAddQuest = async (
    title: string,
    description: string,
    xpReward: number,
    icon: string,
  ) => {
    const newQuest: Quest = {
      id: `q-${Date.now()}`,
      userId: user?.uid || "local-user",
      title,
      description: description || "Noble daily task",
      xpReward,
      icon,
      streak: 0,
      completed: false,
      lastCompletedAt: null,
      isDefault: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedQuests = [...quests, newQuest];
    setQuests(updatedQuests);

    // Persist to Cloud
    if (user && db) {
      try {
        const questRef = doc(db, "users", user.uid, "quests", newQuest.id);
        await setDoc(questRef, newQuest);
      } catch (e) {
        handleFirestoreError(
          e,
          OperationType.CREATE,
          `users/${user.uid}/quests/${newQuest.id}`,
        );
      }
    }

    triggerToast(`Created Custom Quest: "${title}"! 📜`, "info");
    persistLocalState(progress, updatedQuests, journalEntries, purchasedRelics);
  };

  // Delete Quest
  const handleDeleteQuest = async (questId: string) => {
    const updatedQuests = quests.filter((q) => q.id !== questId);
    setQuests(updatedQuests);

    if (user && db) {
      try {
        const questRef = doc(db, "users", user.uid, "quests", questId);
        await deleteDoc(questRef);
      } catch (e) {
        handleFirestoreError(
          e,
          OperationType.DELETE,
          `users/${user.uid}/quests/${questId}`,
        );
      }
    }

    triggerToast("Quest abandoned and removed from Ledger.", "info");
    persistLocalState(progress, updatedQuests, journalEntries, purchasedRelics);
  };

  // JOURNAL ACTIONS
  const handleAddJournal = async (
    title: string,
    content: string,
    mood: JournalEntry["mood"],
  ) => {
    const newEntry: JournalEntry = {
      id: `j-${Date.now()}`,
      userId: user?.uid || "local-user",
      title,
      content,
      mood,
      date: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    };

    const updatedJournals = [newEntry, ...journalEntries];
    setJournalEntries(updatedJournals);

    // Award bonus gold and XP for journaling reflection (Noble Action!)
    updateStats(20, 10, false);

    if (user && db) {
      try {
        const docRef = doc(db, "users", user.uid, "journals", newEntry.id);
        await setDoc(docRef, newEntry);
      } catch (e) {
        handleFirestoreError(
          e,
          OperationType.CREATE,
          `users/${user.uid}/journals/${newEntry.id}`,
        );
      }
    }

    playSylvanSFX("journal_saved");
    triggerToast(
      "Annals of Reflection updated! Gained +20 XP & +10 Crystals! 🕯️",
      "success",
    );
    persistLocalState(progress, quests, updatedJournals, purchasedRelics);
  };

  // Delete Journal
  const handleDeleteJournal = async (id: string) => {
    const updatedJournals = journalEntries.filter((e) => e.id !== id);
    setJournalEntries(updatedJournals);

    if (user && db) {
      try {
        const docRef = doc(db, "users", user.uid, "journals", id);
        await deleteDoc(docRef);
      } catch (e) {
        handleFirestoreError(
          e,
          OperationType.DELETE,
          `users/${user.uid}/journals/${id}`,
        );
      }
    }

    triggerToast("Chronicle torn from Scroll.", "info");
    persistLocalState(progress, quests, updatedJournals, purchasedRelics);
  };

  // BAZAAR PURCHASE ACTIONS
  const handlePurchaseBazaarItem = async (item: BazaarItem) => {
    if (progress.crystals < item.cost) {
      triggerToast(
        "You need more crystals! Complete quests to earn gold crystals.",
        "info",
      );
      return;
    }

    const updatedCrystals = progress.crystals - item.cost;
    const updatedRelics = [...purchasedRelics, item.id];

    // Earn immediate relics XP bonus!
    const bonusXP = item.bonusXP;

    // Direct stats adjustments
    let newXP = Math.max(0, progress.xp + bonusXP);
    let newLevel = Math.min(5, Math.floor(newXP / 1000) + 1);
    const didLevelUp = newLevel > progress.level;

    const updatedProgress = {
      ...progress,
      crystals: updatedCrystals,
      xp: newXP,
      level: newLevel,
      updatedAt: new Date().toISOString(),
    };

    setProgress(updatedProgress);
    setPurchasedRelics(updatedRelics);

    if (didLevelUp) {
      setLevelUpModal(newLevel);
      setQuestConfettiActive(true);
      setTimeout(() => setQuestConfettiActive(false), 2000);
      playSylvanSFX("level_up");
    }

    if (user && db) {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          crystals: updatedCrystals,
          xp: newXP,
          level: newLevel,
          updatedAt: new Date().toISOString(),
        });

        const relicsRef = doc(db, "users", user.uid, "relics", "unlocked");
        await setDoc(relicsRef, { items: updatedRelics });
      } catch (e) {
        handleFirestoreError(
          e,
          OperationType.WRITE,
          `users/${user.uid}/relics/unlocked`,
        );
      }
    }

    playSylvanSFX("item_purchased");
    triggerToast(
      `Unlocked the ${item.title}! XP scaled by +${item.bonusXP}! 🎁`,
      "success",
    );
    persistLocalState(updatedProgress, quests, journalEntries, updatedRelics);
  };

  const handleToggleEquipCosmetic = async (itemId: string) => {
    const isCurrentlyEquipped = equippedCosmetics.includes(itemId);
    const updatedEquipped = isCurrentlyEquipped
      ? equippedCosmetics.filter((id) => id !== itemId)
      : [...equippedCosmetics, itemId];

    setEquippedCosmetics(updatedEquipped);
    localStorage.setItem("hb_equipped_cosmetics", JSON.stringify(updatedEquipped));

    // Persist to Cloud Firestore if connected
    if (user && db) {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { equippedCosmetics: updatedEquipped });
      } catch (e) {
        console.warn("Failed to sync equipped cosmetics to cloud: ", e);
      }
    }
    
    // Also update local state
    persistLocalState(progress, quests, journalEntries, purchasedRelics, updatedEquipped);
  };

  const handleUpdateDisplayName = async (newName: string) => {
    const updatedProgress = {
      ...progress,
      displayName: newName,
      updatedAt: new Date().toISOString(),
    };
    setProgress(updatedProgress);
    if (user && db) {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          displayName: newName,
          updatedAt: new Date().toISOString(),
        });
      } catch (e) {
        console.warn(e);
      }
    }
    triggerToast(`Name updated to "${newName}"! 🏷️`, "info");
    persistLocalState(
      updatedProgress,
      quests,
      journalEntries,
      purchasedRelics,
    );
  };

  // Manual bypass ascension system - instantly bypass requirements & advance user to the next level
  const handleBypassLevelUp = async () => {
    let nextLevel = progress.level + 1;
    if (nextLevel > 5) {
      nextLevel = 1; // Wrap around to level 1 so users can easily cycle-test all beautiful tiers!
    }
    const updatedProgress: UserProgress = {
      ...progress,
      level: nextLevel,
      xp: (nextLevel - 1) * 1000, // Reset standard level-up XP loop tracker back to the start of the next level so they can ascend again seamlessly
      updatedAt: new Date().toISOString(),
    };

    setProgress(updatedProgress);

    // If there's an active attack, transition it instantly to match the new level's tier
    let updatedAttack = activeAttack;
    if (activeAttack) {
      if (nextLevel === 1) {
        updatedAttack = {
          level: 1,
          name: "The Sleepy Sprite",
          description: "A small pastel shadow creature with droopy eyes, floating clouds, and sleepy sparkles.",
          warningText: "Drowsy Aura: Streak froze for 1 day! Screen is slightly dimmed, and sad rain clouds surround your profile.",
          triggerDate: new Date().toISOString(),
          dismissed: false,
        };
      } else if (nextLevel >= 2 && nextLevel <= 4) {
        updatedAttack = {
          level: 2,
          name: "The Doubt Witch",
          description: "A floating dark fairy with faded pink wings, smoky magic, and glowing purple eyes.",
          warningText: "Whisper of Doubt: XP gain is reduced by 25% today! Your avatar glow faded, and the motivational quotes vanished.",
          triggerDate: new Date().toISOString(),
          dismissed: false,
        };
      } else {
        updatedAttack = {
          level: 3,
          name: "The Eclipse Queen",
          description: "A powerful shadow empress covered in dark crystal armour with black-and-pink energy swirling around her.",
          warningText: "Total Eclipse: Lost 50 Crystals immediately! Your streak statistics are hidden, and a dark eclipse covers the citadel.",
          triggerDate: new Date().toISOString(),
          dismissed: false,
        };
      }
      setActiveAttack(updatedAttack);
      localStorage.setItem("hb_active_attack", JSON.stringify(updatedAttack));
    }
    
    // Display the new level in the cinematic Level Up screen modal
    setLevelUpModal(nextLevel);

    // Play the success/level upgrade audio sweeps & particle explosions
    setQuestConfettiActive(true);
    setTimeout(() => setQuestConfettiActive(false), 2000);
    playSylvanSFX("level_up");

    if (nextLevel === 1) {
      triggerToast(`✨ Stepped through the Celestial Void! Returned to Level 1's Blossom Meadow! 🌸`, "level");
    } else {
      triggerToast(`✨ Realm Ascension Complete! Welcome to Level ${nextLevel}! 🎉`, "level");
    }

    if (user && db) {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          level: nextLevel,
          xp: (nextLevel - 1) * 1000,
          updatedAt: new Date().toISOString(),
        });
      } catch (e) {
        console.warn("Failed to sync manual level up to cloud database: ", e);
      }
    }

    persistLocalState(updatedProgress, quests, journalEntries, purchasedRelics);
  };

  // Helper calculation function to update XP and Crystals currencies
  const updateStats = async (
    xpValue: number,
    crystalsValue: number,
    isQuestCheck: boolean,
  ) => {
    let currentXP = Math.max(0, progress.xp + xpValue);
    let currentLevel = Math.min(5, Math.floor(currentXP / 1000) + 1);
    const didLevelUp = currentLevel > progress.level;

    const newCrystals = Math.max(0, progress.crystals + crystalsValue);

    // Check if yesterday was completed to update perfect stats
    let newPerfectDays = progress.perfectDays;
    if (isQuestCheck && quests.every((q) => q.completed)) {
      newPerfectDays += 1;
    }

    const updatedProgress: UserProgress = {
      ...progress,
      xp: currentXP,
      level: currentLevel,
      crystals: newCrystals,
      perfectDays: newPerfectDays,
      updatedAt: new Date().toISOString(),
    };

    setProgress(updatedProgress);

    if (didLevelUp) {
      setLevelUpModal(currentLevel);
      setQuestConfettiActive(true);
      setTimeout(() => setQuestConfettiActive(false), 2000);
      playSylvanSFX("level_up");
    }

    if (user && db) {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          xp: currentXP,
          level: currentLevel,
          crystals: newCrystals,
          perfectDays: newPerfectDays,
          updatedAt: new Date().toISOString(),
        });
      } catch (e) {
        console.warn(
          "Trouble committing updates to Cloud (Offline Cache Mode holds): ",
          e,
        );
      }
    }

    persistLocalState(updatedProgress, quests, journalEntries, purchasedRelics);
  };

  const handleAwardProgress = (xpValOriginal: number, crystalsValOriginal: number, isWaterGoalReached?: boolean, questId?: string) => {
    const targetQuestId = questId || (isWaterGoalReached ? "q-water" : undefined);

    if (!targetQuestId) {
      const coinMultiplier = getCoinMultiplier(progress.currentStreak);
      const finalCrystals = Math.round(crystalsValOriginal * coinMultiplier);
      const coinBoostLabel = coinMultiplier > 1.0 ? ` (${coinMultiplier}x Coin Boost! 💎)` : "";
      updateStats(xpValOriginal, finalCrystals, false);
      triggerToast(`✨ Quest verified! Gained +${xpValOriginal} XP & +${finalCrystals} Crystals${coinBoostLabel}! 💎`, "success");
      return;
    }

    // 1. Determine base XP and Crystal values for the respective RPG habits
    let baseXP = 0;
    let baseCrystals = 0;
    let habitTitle = "";

    const currentQuest = quests.find(q => q.id === targetQuestId);
    const prevStreak = currentQuest ? currentQuest.streak : 0;
    const newStreak = prevStreak + 1;

    if (targetQuestId === "q-water") {
      baseXP = 5; // Easy [Health]
      // 5 Crystals ONLY awarded on a 3-day consecutive streak (recurring multiples of 3 are best)
      baseCrystals = (newStreak % 3 === 0) ? 5 : 0;
      habitTitle = "Drink 2L Water";
    } else if (targetQuestId === "q-study") {
      baseXP = 10; // Medium [Academics]
      baseCrystals = 10; // Awarded on every completion
      habitTitle = "45m Study";
    } else if (targetQuestId === "q-phone") {
      baseXP = 15; // Hard [Mind]
      baseCrystals = 15; // Awarded on every completion
      habitTitle = "1hr No Phone";
    } else {
      baseXP = xpValOriginal;
      baseCrystals = crystalsValOriginal;
      habitTitle = currentQuest ? currentQuest.title : "Quest";
    }

    // 2. STREAK XP MULTIPLIER: Apply 1.15x XP multiplier when user maintains a consecutive daily streak
    const hasDailyStreak = progress.currentStreak > 0;
    const xpMultiplier = hasDailyStreak ? 1.15 : 1.0;
    const finalXP = Math.round(baseXP * xpMultiplier);
    
    const coinMultiplier = getCoinMultiplier(progress.currentStreak);
    const finalCrystals = Math.round(baseCrystals * coinMultiplier);

    let isNowPerfect = false;

    // 3. Update the quests state and detect Perfect Day transitions
    setQuests(prev => {
      const updated = prev.map(q => {
        if (q.id === targetQuestId) {
          return {
            ...q,
            completed: true,
            streak: newStreak,
            lastCompletedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
        }
        return q;
      });

      // Perfect Day checks: Are all three core habits completed today?
      const targetIds = ["q-water", "q-study", "q-phone"];
      const coreInitiallyCount = prev.filter(q => targetIds.includes(q.id) && q.completed).length;
      const coreFinallyCompleted = updated.filter(q => targetIds.includes(q.id) && q.completed).length;

      if (coreFinallyCompleted === 3 && coreInitiallyCount < 3) {
        isNowPerfect = true;
      }

      persistLocalState(progress, updated, journalEntries, purchasedRelics);
      return updated;
    });

    // 4. Update progress and award standard currencies immediately
    updateStats(finalXP, finalCrystals, false);

    // Provide cosmetic bonus unlock if water goal is achieved
    if (targetQuestId === "q-water") {
      if (!equippedCosmetics.includes("water_magic")) {
        const newCosmetics = [...equippedCosmetics, "water_magic"];
        setEquippedCosmetics(newCosmetics);
        localStorage.setItem("hb_equipped_cosmetics", JSON.stringify(newCosmetics));
      }
    }

    // 5. Trigger notifications showing calculations
    const multiplierLabel = hasDailyStreak ? " (1.15x XP Multiplier! 🔥)" : "";
    const coinBoostLabel = coinMultiplier > 1.0 ? ` (Boost: ${coinMultiplier}x! 💎)` : "";
    
    if (targetQuestId === "q-water") {
      if (finalCrystals > 0) {
        triggerToast(`🌊 Drink 2L Water Verified! Gained +${finalXP} XP${multiplierLabel} & +${finalCrystals} Crystals${coinBoostLabel}! 💎`, "success");
      } else {
        triggerToast(`🌊 Drink 2L Water Verified! Gained +${finalXP} XP${multiplierLabel}! (Streak: ${newStreak}d • 3d needed for Crystals)`, "info");
      }
    } else {
      triggerToast(`✨ ${habitTitle} Verified! Gained +${finalXP} XP${multiplierLabel} & +${finalCrystals} Crystals${coinBoostLabel}! 💎`, "success");
    }

    // Play visual party confetti and celebratory feedback
    playQuestSFX(true);

    // 6. Perfect Day Bonus Engine: +20 Crystals + confetti + increment Badge Counter!
    if (isNowPerfect) {
      setTimeout(() => {
        updateStats(0, 20, false);
        setProgress(prev => {
          const updatedProgress = {
            ...prev,
            perfectDays: prev.perfectDays + 1
          };
          persistLocalState(updatedProgress, quests, journalEntries, purchasedRelics);
          return updatedProgress;
        });

        triggerToast("🏆 PERFECT DAY UNLOCKED! All 3 habits verified! +20 Bonus Crystals & 'Perfect Day' Badge! 🌟🎉", "success");
        setQuestConfettiActive(true);
        setTimeout(() => setQuestConfettiActive(false), 2000);
        playSylvanSFX("perfect_day");
      }, 850);
    }
  };

  const handleUpdateWaterProgress = (newTotal: number) => {
    setCurrentWaterTotalMl(newTotal);
    localStorage.setItem("hb_water_total_ml", String(newTotal));
    
    if (newTotal >= 2000) {
      handleAwardProgress(0, 0, true);
    }
  };

  return (
    <div className="min-h-screen bg-[#6a4246]/10 flex items-center justify-center p-0 md:p-6 select-none bg-gradient-to-br from-[#ffdacf]/30 via-transparent to-[#fff8f7]/40">
      {/* Dynamic Floating Toast Alerts */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 16, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-4 z-[999] max-w-sm px-4.5 py-3.5 rounded-2xl shadow-xl flex items-center space-x-3 border text-xs font-black select-none ${
              toast.type === "success"
                ? "bg-[#ffe9eb] text-primary border-[#f7b2b7]"
                : toast.type === "level"
                  ? "bg-amber-100 text-amber-900 border-amber-300"
                  : "bg-indigo-50 text-indigo-900 border-indigo-200"
            }`}
          >
            <Sparkles className="w-5.5 h-5.5 shrink-0 animate-spin-slow" />
            <span className="leading-snug">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Immersive Level-Up Cinematic Screen with Multi-Color Canvas Confetti Particles */}
      <CinematicLevelUpScreen
        level={levelUpModal || 1}
        isOpen={levelUpModal !== null}
        onClose={() => setLevelUpModal(null)}
      />

      {/* Standalone quest completion confetti burst */}
      <CanvasConfetti active={questConfettiActive} />



      {/* 
        -------------------------------------------------------------
        THE PHONE SHELL CONTAINER
        Restricts standard mobile screen dimensions (max viewport width 480px)
        -------------------------------------------------------------
      */}
      <div
        className="w-full max-w-md h-screen md:h-[820px] bg-transparent md:rounded-[36px] shadow-2xl border-0 md:border-8 border-neutral-800 flex flex-col overflow-hidden relative"
        id="mobile-shell"
      >
        {!user ? (
          <div className="flex-1 flex flex-col justify-between p-7 bg-gradient-to-br from-[#1c0e15] via-[#29131d] to-[#0f070b] text-[#fff0eb] overflow-y-auto relative select-none">
            {/* Beautiful landing gate UI */}
            <div className="text-center pt-8">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#fae3e5]/10 border border-[#f7b2b7]/20 flex items-center justify-center text-[#ffccd1] shadow-lg mb-6 relative">
                <div className="absolute inset-0 rounded-full bg-pink-500/5 filter blur-md animate-pulse" />
                <Sparkles className="w-10 h-10 text-rose-300 animate-spin-slow" />
              </div>
              <h1 className="font-serif text-3xl font-black text-[#fdd8ca] bg-clip-text tracking-wide drop-shadow-md mb-2">
                HABITBLOOM CITADEL
              </h1>
              <p className="text-xs text-[#ebd5d7] max-w-xs mx-auto leading-relaxed font-serif italic mb-4">
                "Where real-world habits forge eternal heroes"
              </p>
            </div>

            <div className="space-y-4 my-6">
              <div className="bg-[#fad4cf]/5 border border-[#ffdacf]/10 p-3.5 rounded-2xl flex items-center space-x-3 shadow-inner">
                <span className="text-xl">👤</span>
                <div>
                  <h3 className="text-xs font-bold text-[#faf0eb]">Personalized Characters</h3>
                  <p className="text-[10px] text-[#cca5a8] leading-normal">Evolve your custom level-up sylvan avatar and cosmetic items sync'd directly to your profile.</p>
                </div>
              </div>

              <div className="bg-[#fad4cf]/5 border border-[#ffdacf]/10 p-3.5 rounded-2xl flex items-center space-x-3 shadow-inner">
                <span className="text-xl">💎</span>
                <div>
                  <h3 className="text-xs font-bold text-[#faf0eb]">Persisted Inventory & Relics</h3>
                  <p className="text-[10px] text-[#cca5a8] leading-normal">Earn crystals, browse the Bloom Bazaar, and store valuable ancient relics securely on the cloud.</p>
                </div>
              </div>

              <div className="bg-[#fad4cf]/5 border border-[#ffdacf]/10 p-3.5 rounded-2xl flex items-center space-x-3 shadow-inner">
                <span className="text-xl">📈</span>
                <div>
                  <h3 className="text-xs font-bold text-[#faf0eb]">Immutable Sylvan Ledger</h3>
                  <p className="text-[10px] text-[#cca5a8] leading-normal">Safeguard stats, complete active quests, and retain consecutive day streak multipliers across devices.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pb-6">
              {isFirebaseConfigured ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAuthClick}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 text-[#faf0eb] font-extrabold shadow-lg flex items-center justify-center space-x-2 border border-rose-400/20 cursor-pointer text-xs"
                >
                  <LogIn className="w-4 h-4 text-[#ffebed]" />
                  <span>SIGN IN WITH GOOGLE ACCOUNT</span>
                </motion.button>
              ) : (
                <div className="p-4 rounded-xl bg-[#612b32]/40 border border-[#8f444d]/50 text-center text-[#ffdae0] text-[11px] leading-relaxed select-none">
                  <p className="font-extrabold mb-1">🏰 CLOUD PORTAL CONSTRUCTING...</p>
                  <p className="text-[#ebd5d7] opacity-90">
                    Awaiting database terms activation. Please accept the Firebase Terms of service in the setup UI above to auto-deploy Google Authentication and enable secure cloud storage.
                  </p>
                </div>
              )}
              <p className="text-center text-[9px] text-[#865d64] select-none font-medium">
                Google authenticated logins required • No anonymous databases permitted
              </p>
            </div>
          </div>
        ) : (
          <>
            <ActiveTierBackground level={progress.level} />

            {isMidnightMode && (
              <>
                <div className="absolute inset-0 bg-[#341b21]/15 pointer-events-none z-[99] mix-blend-color-burn" />
                <div className="absolute inset-0 bg-[#161230]/20 pointer-events-none z-[99] mix-blend-multiply" />
              </>
            )}

        {/* 
          1. THE FIXED HEADER SECTION (Pinnand to top)
        */}
        {activeTab !== "settings" && (
          <header
            className="shrink-0 bg-[#fff8f7]/80 backdrop-blur-md border-b border-[#ffdacf]/30 pt-6 pb-4 px-5 flex items-center justify-between z-40 select-none shadow-sm"
            id="header-section"
          >
            {/* Logo Brand with small image tag or fallback with Level */}
            <div className="flex items-center space-x-2">
              <div 
                className="bg-[#fff0eb] border border-[#fdd1c6] px-2.5 py-1 rounded-full flex items-center select-none text-[10px] font-black text-[#8d3240] uppercase tracking-wider shadow-sm"
                title={`You are currently Level ${progress.level}`}
              >
                LV {progress.level}
              </div>
            </div>

            {/* Core Stats overview (XP and Crystals) */}
            <div className="flex items-center space-x-2">
              {/* XP Badge */}
              <div className="bg-surface-container border border-outline-variant/30 px-3 py-1.5 rounded-full flex items-center space-x-1.5 select-none hover:bg-surface-container-high transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse-slow" />
                <div className="text-right">
                  <span
                    className="text-xs font-black text-[#514344]"
                    id="xp-header-text"
                  >
                    {progress.xp} XP
                  </span>
                </div>
              </div>

              {/* Crystals Badge (Interactive: Opens Bazaar!) */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("bazaar")}
                className={`px-3 py-1.5 rounded-full flex items-center space-x-1 transition-all select-none border cursor-pointer border-indigo-200 bg-indigo-50/60 hover:bg-indigo-155`}
                id="crystals-header-badge"
                title="Open Bloom Bazaar"
              >
                <Gem className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500 animate-bounce" />
                <span className="text-xs font-black text-indigo-600">
                  {progress.crystals} Crystals
                </span>
              </motion.button>

              {/* Multiplier Badge */}
              <div
                className={`px-2.5 py-1.5 rounded-full flex items-center space-x-1 select-none border transition-all text-xs font-black ${
                  progress.currentStreak <= 0
                    ? "bg-zinc-50 border-zinc-200 text-zinc-500"
                    : progress.currentStreak <= 2
                    ? "bg-amber-50/85 border-amber-200 text-amber-600"
                    : "bg-rose-50/90 border-rose-200 text-rose-600 animate-pulse"
                }`}
                id="streak-multiplier-badge"
                title={`Active coin boost: ${getCoinMultiplier(progress.currentStreak).toFixed(1)}x based on consecutive ${progress.currentStreak}-day habit logging streak!`}
              >
                <Flame
                  className={`w-3.5 h-3.5 ${
                    progress.currentStreak <= 0
                      ? "text-zinc-400"
                      : progress.currentStreak <= 2
                      ? "text-amber-500 fill-amber-300 animate-pulse"
                      : "text-rose-500 fill-rose-300 animate-bounce"
                  }`}
                />
                <span>
                  {getCoinMultiplier(progress.currentStreak).toFixed(1)}x
                </span>
              </div>
            </div>
          </header>
        )}

        {/* 
          2. THE INDEPENDENTLY SCROLLING CENTER VIEWPORT CONTAINER
        */}
        <main
          className={`flex-1 overflow-y-auto px-5 pt-4 transition-all relative ${activeAttack?.level === 1 ? "brightness-[0.88] saturate-[0.85] contrast-[1.05]" : ""}`}
          id="center-viewport"
        >
          {/* Level 3: Dark eclipse effect covers the home screen temporarily */}
          {activeAttack?.level === 3 && activeTab === "home" && (
            <div className="absolute inset-0 bg-gradient-to-b from-purple-950/25 via-pink-900/15 to-black/35 pointer-events-none z-[8] mix-blend-color-burn" />
          )}

          {/* TAB 1: HOME PAGE ROUTE VIEW */}
          {activeTab === "home" && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Profile Overview section */}
              <div className="flex flex-col items-center select-none pt-2">
                {/* Circular image avatar placeholder or illustrations */}
                <motion.div
                  onClick={() => setActiveTab("profile")}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Level 2 Attack: Avatar glow temporarily fades. Otherwise, render a mystical pink-to-blue glow ring around the elven child! */}
                  <div className="relative">
                    {activeAttack?.level !== 2 && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-300 scale-102 blur-md opacity-70 animate-pulse" />
                    )}
                    <AuraBelleAvatar
                      size={160}
                      showBorder={true}
                      level={progress.level}
                      xp={progress.xp}
                      equippedCosmetics={equippedCosmetics}
                    />

                    {/* Level 1 Attack: Sad cloud animation appears floating around avatar */}
                    {activeAttack?.level === 1 && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none z-30 flex flex-col items-center">
                        {/* SVG of an animated sad rain cloud */}
                        <svg
                          className="w-16 h-10 drop-shadow-md animate-bounce"
                          viewBox="0 0 100 60"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 40 C10 40 5 30 15 20 C10 10 30 5 45 15 C55 5 75 10 75 25 C85 25 88 35 78 40 Z"
                            fill="#4B5563"
                          />
                          <g
                            stroke="#3B82F6"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            className="animate-pulse"
                          >
                            <line x1="28" y1="46" x2="24" y2="54" />
                            <line x1="42" y1="48" x2="38" y2="56" />
                            <line x1="56" y1="48" x2="52" y2="56" />
                            <line x1="70" y1="46" x2="66" y2="54" />
                          </g>
                          <circle cx="15" cy="15" r="1.5" fill="#fbcfe8" />
                          <circle cx="85" cy="20" r="1.5" fill="#fbcfe8" />
                        </svg>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">
                          Drowsy cloud
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Level Tag text */}
                <h2 className="font-extrabold text-xl text-on-surface mt-4 tracking-sm">
                  Level {progress.level} Adventurer
                </h2>

                {/* Level Up progress bar */}
                <div className="w-full max-w-xs mt-2.5">
                  <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden border border-outline-variant/30 shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress.level === 5 ? 100 : (progress.xp % 1000) / 10}%` }}
                      transition={{ duration: 1 }}
                      className="h-full bg-gradient-to-r from-primary-container to-primary rounded-full"
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-black text-on-surface-variant opacity-80 mt-1.5 px-1 p-0.5">
                    <span>{progress.level === 5 ? "1000" : progress.xp % 1000} XP / 1000</span>
                    <span>
                      {progress.level === 5 ? "Max Level!" : `${1000 - (progress.xp % 1000)} XP to Lv. ${progress.level + 1}`}
                    </span>
                  </div>
                </div>
              </div>



              {/* -----------------------------------------------
                   🛡️ ANTAGONIST / SHADOW BATTLE ARENA CARD
                   ----------------------------------------------- */}
              <div className="bg-white rounded-2xl border border-outline-variant p-5 shadow-sm relative overflow-hidden flex flex-col items-center">
                <div className="w-full flex justify-between items-center mb-1 select-none">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs">⚔️</span>
                    <h4 className="font-black text-sm text-primary uppercase tracking-wide">
                      {activeAttack ? (
                        activeAttack.level === 1 ? (
                          "The Sleepy Sprite"
                        ) : activeAttack.level === 2 ? (
                          "The Doubt Witch"
                        ) : (
                          "The Eclipse Queen"
                        )
                      ) : progress.level === 1 ? (
                        "The Sleepy Sprite"
                      ) : (progress.level >= 2 && progress.level <= 4) ? (
                        "The Doubt Witch"
                      ) : (
                        "The Eclipse Queen"
                      )}
                    </h4>
                  </div>
                  <span
                    className={`text-[9px] font-black px-2.5 py-0.5 rounded-full ${
                      activeAttack
                        ? "bg-[#ffe9eb] text-primary border border-primary/20 animate-pulse"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {activeAttack ? "Invasion Active" : "Defeated"}
                  </span>
                </div>

                {/* Illustrate Current Enemy */}
                <div className="relative my-2 select-none">
                  {activeAttack ? (
                    activeAttack.level === 1 ? (
                      <EnemySleepySprite size={190} className="my-[-15px]" />
                    ) : activeAttack.level === 2 ? (
                      <EnemyDoubtWitch size={190} className="my-[-15px]" />
                    ) : (
                      <EnemyEclipseQueen size={190} className="my-[-15px]" />
                    )
                  ) : progress.level === 1 ? (
                    <EnemySleepySprite size={190} className="my-[-15px]" />
                  ) : (progress.level >= 2 && progress.level <= 4) ? (
                    <EnemyDoubtWitch size={190} className="my-[-15px]" />
                  ) : (
                    <EnemyEclipseQueen size={190} className="my-[-15px]" />
                  )}
                </div>

                {/* Interactive Boss HP Bar */}
                <div className="w-full mt-3 select-none">
                  <div className="flex justify-between items-center mb-1 px-1">
                    <span className="text-[10px] font-extrabold text-[#74584d] uppercase tracking-wide font-sans">
                      Boss Health (remaining goals)
                    </span>
                    <span className="text-xs font-black text-primary">
                      {quests.filter((q) => !q.completed).length} /{" "}
                      {quests.length} HP
                    </span>
                  </div>
                  <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 shadow-inner p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${quests.length > 0 ? (quests.filter((q) => !q.completed).length / quests.length) * 100 : 0}%`,
                      }}
                      transition={{ duration: 0.5 }}
                      className={`h-full rounded-full ${
                        quests.filter((q) => !q.completed).length > 0
                          ? "bg-gradient-to-r from-red-500 via-rose-600 to-pink-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                          : "bg-gradient-to-r from-emerald-400 to-teal-500"
                      }`}
                    />
                  </div>
                </div>

                {/* Active Curse/Effect Statement Banners */}
                {activeAttack ? (
                  <div className="w-full bg-[#fcd3d5]/75 text-[#854f54] p-3.5 rounded-xl border border-[#f7b2b7] flex flex-col space-y-1 mt-4 shadow-inner">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">⚠️</span>
                      <span className="text-[10px] uppercase font-black tracking-widest text-[#a25157] font-sans">
                        ACTIVE CURSE: {activeAttack.name} Attack
                      </span>
                    </div>
                    <p className="text-[11px] font-bold leading-relaxed opacity-90 font-sans">
                      {activeAttack.warningText}
                    </p>
                  </div>
                ) : (
                  <div className="w-full bg-emerald-50 text-emerald-800 p-3.5 rounded-xl border border-emerald-200 flex items-center space-x-2.5 mt-4 shadow-sm select-none">
                    <span className="text-base">🏆</span>
                    <p className="text-[11px] font-black leading-normal font-sans">
                      Citadel secured! Clear all quests to ward off the shadow
                      invasion.
                    </p>
                  </div>
                )}

                {/* COLLAPSIBLE SHADOW INVASION TESTING SIMULATOR PANEL */}
                <div className="w-full border-t border-slate-105 mt-4 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowIncursionPortal((prev) => !prev)}
                    className="w-full flex items-center justify-between text-[11px] font-extrabold text-neutral-500 hover:text-primary transition-colors cursor-pointer py-1 select-none"
                  >
                    <span>⚙️ Shadow Invasion Simulator</span>
                    <span>{showIncursionPortal ? "Hide" : "Show"}</span>
                  </button>

                  {showIncursionPortal && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="grid grid-cols-3 gap-1.5 mt-2 pt-1 select-none"
                    >
                      {progress.level === 1 && (
                        <button
                          type="button"
                          onClick={async () => {
                            await triggerAttackForXP(
                              200,
                              new Date().toISOString(),
                              1,
                            );
                          }}
                          className="col-span-3 py-2 px-1 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-black text-slate-700 hover:bg-slate-100 cursor-pointer"
                        >
                          Trigger Lv 1 Enemy (The Sleepy Sprite)
                        </button>
                      )}
                      {progress.level >= 2 && progress.level <= 4 && (
                        <button
                          type="button"
                          onClick={async () => {
                            await triggerAttackForXP(
                              800,
                              new Date().toISOString(),
                              2,
                            );
                          }}
                          className="col-span-3 py-2 px-1 rounded-lg bg-pink-50 border border-pink-200 text-[10px] font-black text-pink-700 hover:bg-pink-100 cursor-pointer"
                        >
                          Trigger Lv 2-4 Enemy (The Doubt Witch)
                        </button>
                      )}
                      {progress.level === 5 && (
                        <button
                          type="button"
                          onClick={async () => {
                            await triggerAttackForXP(
                              2605,
                              new Date().toISOString(),
                              3,
                            );
                          }}
                          className="col-span-3 py-2 px-1 rounded-lg bg-purple-50 border border-purple-200 text-[10px] font-black text-purple-700 hover:bg-purple-100 cursor-pointer"
                        >
                          Trigger Lv 5 Enemy (The Eclipse Queen)
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setProgress((prev) => {
                            const newStreak = prev.currentStreak + 1;
                            const newBest = Math.max(prev.bestStreak, newStreak);
                            const updated = {
                              ...prev,
                              currentStreak: newStreak,
                              bestStreak: newBest,
                              updatedAt: new Date().toISOString()
                            };
                            persistLocalState(updated, quests, journalEntries, purchasedRelics);
                            if (user && db) {
                              const userRef = doc(db, "users", user.uid);
                              updateDoc(userRef, { currentStreak: newStreak, bestStreak: newBest, updatedAt: new Date().toISOString() }).catch(() => {});
                            }
                            return updated;
                          });
                          playSylvanSFX("task_completed");
                          triggerToast("Simulated consecutive day logged! Streak increased 🚀", "success");
                        }}
                        className="col-span-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-black hover:bg-indigo-100 transition-colors cursor-pointer mt-1"
                      >
                        🔥 Increment Streak (+1 Day Option)
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setProgress((prev) => {
                            const updated = {
                              ...prev,
                              currentStreak: 0,
                              updatedAt: new Date().toISOString()
                            };
                            persistLocalState(updated, quests, journalEntries, purchasedRelics);
                            if (user && db) {
                              const userRef = doc(db, "users", user.uid);
                              updateDoc(userRef, { currentStreak: 0, updatedAt: new Date().toISOString() }).catch(() => {});
                            }
                            return updated;
                          });
                          triggerToast("Missed day simulated! Streak set to 0 (Multiplier: 1.0x) 📉", "info");
                        }}
                        className="col-span-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-black hover:bg-rose-100 transition-colors cursor-pointer mt-1"
                      >
                        💔 Simulate Missed Day (Reset Streak & Multiplier to 1.0x)
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveAttack(null);
                          localStorage.removeItem("hb_active_attack");
                          triggerToast(
                            "Shadows purged! The Citadel is fully purified. 💖",
                            "success",
                          );
                        }}
                        className="col-span-3 py-1.5 rounded-lg bg-emerald-500 text-white text-[10px] font-black shadow-sm hover:bg-emerald-600 transition-colors cursor-pointer mt-1"
                      >
                        ✨ Cleanse & Defeat Shadow Boss
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Reset schedule timer info */}
              <div className="flex justify-center select-none py-1">
                <div className="inline-flex items-center space-x-1.5 text-xs font-black text-[#74584d] bg-[#fdd8ca]/40 border border-[#fdd8ca]/60 px-4.5 py-2 rounded-full shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-secondary" />
                  <span>Daily reset in 14h 22m</span>
                </div>
              </div>

              {/* Daily Elven Citadel Scroll of light - Now dynamic! */}
              {activeAttack?.level !== 2 ? (
                <DailyQuoteCard />
              ) : (
                <div className="bg-purple-50/70 rounded-2xl border border-purple-200/50 p-4 text-center relative shadow-sm select-none">
                  <p className="text-purple-600 font-extrabold text-[11px] italic">
                    🔮 The daily motivation scroll has been corrupted by the
                    Doubt Witch's shadow...
                  </p>
                  <div className="text-[8px] font-black text-purple-400 uppercase tracking-widest mt-1.5">
                    Curse of Negative thoughts
                  </div>
                </div>
              )}

              {/* Today's Quests list */}
              <div>
                <div className="flex justify-between items-center mb-4 select-none">
                  <h3 className="font-extrabold text-lg text-on-surface">
                    Today's Quests
                  </h3>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className="text-xs font-black text-primary hover:underline cursor-pointer"
                  >
                    View Settings
                  </button>
                </div>

                <div className="space-y-1">
                  {quests.slice(0, 3).map((quest) => {
                    const countCompletedToday = quests.filter(
                      (q) => q.completed,
                    ).length;
                    const isStreakHidden =
                      activeAttack?.level === 3 && countCompletedToday === 0;
                    const adjustedQuest = isStreakHidden
                      ? { ...quest, description: "Streak Hidden 🌑" }
                      : quest;
                    return (
                      <QuestItem
                        key={quest.id}
                        quest={adjustedQuest}
                        onToggle={handleToggleQuest}
                      />
                    );
                  })}
                </div>
              </div>

              {/* 10 & 11. AI Verification Sanctum, Heatmaps, Badges, and Challenges */}
              <AIHabitsVerification
                onAwardProgress={handleAwardProgress}
                currentWaterTotalMl={currentWaterTotalMl}
                onUpdateWaterProgress={handleUpdateWaterProgress}
              />

              <HabitHeatmap quests={quests} />

              <BonusQuestsPanel
                onCompleteChallenge={(xp, c) => {
                  handleAwardProgress(xp, c);
                }}
              />

              {/* Realm Tier Ascension Portal */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-rose-200/50 p-5 shadow-sm text-center select-none mt-4 relative overflow-hidden group">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-300 via-amber-300 to-purple-300" />
                <h4 className="font-sans font-extrabold text-sm text-neutral-800 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span>Ascension Citadel Portal</span>
                </h4>
                <p className="text-[11px] text-[#74584d] mt-1 mb-3.5 leading-relaxed font-sans max-w-xs mx-auto">
                  Ascend instantly to the next magical realm tier. Bypasses standard daily task and experience requirements.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBypassLevelUp}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 via-[#854f54] to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-extrabold text-xs shadow-md transition-all duration-300 cursor-pointer select-none hover:shadow-lg flex items-center justify-center gap-2 border border-white/20"
                >
                  <PartyPopper className="w-4 h-4 animate-bounce" />
                  <span>{progress.level === 5 ? "Transcend to Level 1 (Loop)" : `Ascend to Level ${progress.level + 1}`}</span>
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* TAB 2: DETAILED STATS SHEET */}
          {activeTab === "stats" && (
            <StatsTab
              progress={progress}
              quests={quests}
              activityLogs={activityLogs}
              equippedCosmetics={equippedCosmetics}
            />
          )}

          {/* TAB 3: BLOOM BAZAAR SHOP */}
          {activeTab === "bazaar" && (
            <BazaarTab
              crystals={progress.crystals}
              purchasedRelics={purchasedRelics}
              onPurchaseItem={handlePurchaseBazaarItem}
            />
          )}

          {/* TAB 4: SETTINGS CONFIG */}
          {activeTab === "settings" && (
            <SettingsTab
              progress={progress}
              purchasedRelics={purchasedRelics}
              isMidnightMode={isMidnightMode}
              onToggleMidnightMode={handleToggleMidnightMode}
              onUpdateDisplayName={handleUpdateDisplayName}
              onResetProgress={async () => {
                const defaultProgress: UserProgress = {
                  uid: user?.uid || "local-user",
                  displayName: "Elara Weaver",
                  email: user?.email || "info@habitbloom.fantasy",
                  photoURL: null,
                  xp: 1650,
                  level: 2,
                  xpToNextLevel: 1000,
                  crystals: 240,
                  perfectDays: 18,
                  bestStreak: 12,
                  currentStreak: 5,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                };

                const defaultQuests: Quest[] = [
                  {
                    id: "q-water",
                    userId: user?.uid || "local-user",
                    title: "Drink 2L Water",
                    description: "Easy • +5 XP • +5 Crystals on 3d streak",
                    xpReward: 5,
                    icon: "droplets",
                    streak: 5,
                    completed: false,
                    lastCompletedAt: null,
                    isDefault: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  },
                  {
                    id: "q-study",
                    userId: user?.uid || "local-user",
                    title: "45m Study",
                    description: "Medium • +10 XP • +10 Crystals",
                    xpReward: 10,
                    icon: "bookopen",
                    streak: 12,
                    completed: true,
                    lastCompletedAt: new Date().toISOString(),
                    isDefault: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  },
                  {
                    id: "q-phone",
                    userId: user?.uid || "local-user",
                    title: "1hr No Phone",
                    description: "Hard • +15 XP • +15 Crystals",
                    xpReward: 15,
                    icon: "smartphone",
                    streak: 0,
                    completed: false,
                    lastCompletedAt: null,
                    isDefault: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  },
                ];

                setProgress(defaultProgress);
                setQuests(defaultQuests);
                setJournalEntries([]);
                setPurchasedRelics([]);
                setIsMidnightMode(false);
                localStorage.removeItem("hb_midnight_mode");

                if (user && db) {
                  try {
                    const userRef = doc(db, "users", user.uid);
                    await setDoc(userRef, defaultProgress);
                    const relicsRef = doc(
                      db,
                      "users",
                      user.uid,
                      "relics",
                      "unlocked",
                    );
                    await setDoc(relicsRef, { items: [] });
                  } catch (e) {
                    console.warn(e);
                  }
                }

                triggerToast(
                  "All progress reset back to elven defaults. Clean seed planted! 🌱",
                  "level",
                );
                playQuestSFX(false);
                persistLocalState(defaultProgress, defaultQuests, [], []);
              }}
              onBackToHome={() => setActiveTab("home")}
              onGoToProfile={() => setActiveTab("profile")}
            />
          )}

          {/* TAB 5: JOURNAL NOTES REFLECTIONS */}
          {activeTab === "journal" && (
            <JournalTab
              entries={journalEntries}
              onAddEntry={handleAddJournal}
              onDeleteEntry={handleDeleteJournal}
            />
          )}

          {/* TAB 6: PROFILE & AVATAR CUSTOMIZER */}
          {activeTab === "profile" && (
            <ProfileTab
              progress={progress}
              purchasedRelics={purchasedRelics}
              equippedCosmetics={equippedCosmetics}
              onToggleEquipCosmetic={handleToggleEquipCosmetic}
              onUpdateDisplayName={handleUpdateDisplayName}
              onGoToBazaar={() => setActiveTab("bazaar")}
            />
          )}

          {/* Pushing space for footer safe-area */}
          <div className="h-16" />
        </main>

        {/* 
          3. USER CONFIG & LOG-IN DRAWER BAR OVER FOOTER
        */}
        <div className="absolute bottom-[72px] inset-x-0 bg-[#ffdacf]/30 border-t border-[#ffdacf]/40 py-2 px-5 flex items-center justify-between z-30 select-none text-[10px] font-bold">
          <div className="flex items-center space-x-2 text-on-surface-variant">
            {isFirebaseConfigured ? (
              <span className="inline-flex items-center text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                <ShieldCheck className="w-3 h-3 mr-1" />
                Cloud Connected
              </span>
            ) : (
              <span className="inline-flex items-center text-[#74584d] bg-[#fdd8ca]/50 px-2 py-0.5 rounded border border-[#fdd8ca]">
                <Compass className="w-3 h-3 mr-1" />
                Offline Sandbox
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-on-surface-variant truncate max-w-[120px]">
                  {user.displayName || "Hero"}
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-0.5 text-primary hover:text-red-650 cursor-pointer active:scale-95 border border-[#fcb3b7] bg-white px-2 py-1 rounded-md"
                  title="Abandon Cloud Profile"
                >
                  <LogOut className="w-2.5 h-2.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleAuthClick}
                className="flex items-center space-x-1 text-on-primary bg-primary border hover:bg-primary/95 px-3 py-1 rounded-lg shadow-sm cursor-pointer active:scale-95 text-[10px] font-extrabold"
                title="Connect Cloud Account"
              >
                <LogIn className="w-2.5 h-2.5" />
                <span>Sync Account</span>
              </button>
            )}
          </div>
        </div>

        {/* 
          4. THE FIXED BOTTOM APPLICATION NAVIGATION MENU (Pinned to bottom)
        */}
        <nav
          className="shrink-0 bg-[#fff8f7]/80 backdrop-blur-md border-t border-[#ebd5d7] h-[72px] px-4 flex items-center justify-between z-40 relative shadow"
          id="bottom-navigation"
        >
          {[
            {
              id: "home",
              label: "Home",
              icon: <HomeIcon className="w-5.5 h-5.5" />,
            },
            {
              id: "stats",
              label: "Stats",
              icon: <BarChart2 className="w-5.5 h-5.5" />,
            },
            {
              id: "bazaar",
              label: "Bazaar",
              icon: <Gem className="w-5.5 h-5.5" />,
            },
            {
              id: "journal",
              label: "Journal",
              icon: <BookMarked className="w-5.5 h-5.5" />,
            },
            {
              id: "settings",
              label: "Settings",
              icon: <SettingsIcon className="w-5.5 h-5.5" />,
            },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id as any)}
                className="flex flex-col items-center justify-center flex-1 h-full select-none relative transition-all cursor-pointer"
                style={{ minWidth: 44, minHeight: 44 }} // Touch target size limit satisfied
                id={`nav-${tab.id}`}
                title={`Open ${tab.label}`}
              >
                {/* Active glow backing highlight (Screenshot 1 and design specs) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute w-12 h-12 rounded-full bg-secondary-container opacity-70 z-0 select-none pointer-events-none"
                      style={{ top: "50%", transform: "translateY(-50%)" }}
                    />
                  )}
                </AnimatePresence>

                {/* Tab icon and label */}
                <div
                  className={`relative z-10 flex flex-col items-center ${isActive ? "text-on-primary-container font-black" : "text-on-surface-variant opacity-70 font-medium"}`}
                >
                  {tab.icon}
                  <span className="text-[10px] tracking-wide mt-1 uppercase font-bold">
                    {tab.label}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </nav>

            {/* Comfortable bottom spacing for edge-to-edge native mobile safe area bar padding */}
            <div className="h-safe-area bg-[#fff8f7]/80 backdrop-blur-md" />
          </>
        )}
      </div>
    </div>
  );
}
