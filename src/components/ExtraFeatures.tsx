import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Flame, 
  Trophy, 
  TrendingUp, 
  Award, 
  Calendar, 
  ChevronRight, 
  Compass, 
  Crown,
  Volume2,
  X,
  Compass as QuestIcon,
  BookOpen,
  Camera,
  Upload,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { UserProgress, Quest } from "../types";

// ==========================================
// 1. REPRODUCIBLE WEB AUDIO RETRO GAME SFX
// ==========================================
export const playMagicSFX = (type: "chime" | "level" | "coin" | "fizzle") => {
  try {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.connect(gain);
    gain.connect(context.destination);

    if (type === "chime") {
      // Shimmering harp sound (C5 to G5 to C6 fast sweep)
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, context.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, context.currentTime + 0.1); // G5
      osc.frequency.exponentialRampToValueAtTime(1046.50, context.currentTime + 0.25); // C6
      gain.gain.setValueAtTime(0.12, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3);
      osc.start();
      osc.stop(context.currentTime + 0.35);
    } else if (type === "level") {
      // Grand fan-fare chord
      osc.type = "triangle";
      osc.frequency.setValueAtTime(261.63, context.currentTime); // C4
      osc.frequency.setValueAtTime(329.63, context.currentTime + 0.08); // E4
      osc.frequency.setValueAtTime(392.00, context.currentTime + 0.16); // G4
      osc.frequency.exponentialRampToValueAtTime(523.25, context.currentTime + 0.3); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.50, context.currentTime + 0.6); // C6
      gain.gain.setValueAtTime(0.15, context.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, context.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.85);
      osc.start();
      osc.stop(context.currentTime + 0.9);
    } else if (type === "coin") {
      // Gold falling sound (Ding!)
      osc.type = "sine";
      osc.frequency.setValueAtTime(987.77, context.currentTime); // B5
      osc.frequency.setValueAtTime(1318.51, context.currentTime + 0.08); // E6
      gain.gain.setValueAtTime(0.12, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.25);
      osc.start();
      osc.stop(context.currentTime + 0.3);
    } else if (type === "fizzle") {
      // Lower disappointment tone
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220.00, context.currentTime); // A3
      osc.frequency.exponentialRampToValueAtTime(110.00, context.currentTime + 0.3); // A2
      gain.gain.setValueAtTime(0.08, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.35);
      osc.start();
      osc.stop(context.currentTime + 0.4);
    }
  } catch (e) {
    console.warn("AudioContext failed to start (interaction required?):", e);
  }
};

// ==========================================
// 2. MAGICAL SYSTEM CONFETTI EMITTER COMPONENT
// ==========================================
export const CanvasConfetti: React.FC<{ active: boolean }> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    const colors = [
      "#f43f5e", "#ec4899", "#d946ef", "#a855f7", "#8b5cf6", 
      "#6366f1", "#3b82f6", "#0ea5e9", "#06b6d4", "#14b8a6", 
      "#10b981", "#22c55e", "#eab308", "#f97316"
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initial Burst
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 12,
        speedY: (Math.random() - 0.7) * 14 - 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 6,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.22; // Gravity
        p.speedX *= 0.98; // Drag
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        // Draw confetti square or star
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        // Remove fallen particles
        if (p.y > canvas.height) {
          particles.splice(idx, 1);
        }
      });

      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

// ==========================================
// 3. DAILY MOTIVATIONAL PARCHMENT SCROLL
// ==========================================
const DAILY_QUOTES = [
  { quotes: "Do not gaze at the peak; watch only where your staff strikes the path. Consistency breeds the mightiest wizard.", author: "Archmage Loras" },
  { quotes: "A single glass of pristine elixir fuels the roots of your magical soul. Water is the primordial magic.", author: "High Sylvan Oracle" },
  { quotes: "Stillness is not empty. When your screen is dark, your inner lantern casts the widest beams.", author: "Zen Master of Eldoria" },
  { quotes: "The scholar does not rush. Read one page. Master one rune. Rome was not built in a day, nor was Arcane Citadel.", author: "Grand Scriptorium Chancellor" },
  { quotes: "Streaks are like embers. Guard them from the cold wind of delay, and they will become a raging forge of victory.", author: "Blacksmith Throm" }
];

export const DailyQuoteCard: React.FC = () => {
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    // Pick daily quote based on calendar day
    const day = new Date().getDate();
    setQuoteIdx(day % DAILY_QUOTES.length);
  }, []);

  const current = DAILY_QUOTES[quoteIdx];

  return (
    <div className="bg-[#fefaf6] rounded-2xl border border-[#fae5d3] p-5 shadow-sm text-center relative overflow-hidden flex flex-col items-center">
      {/* Scroll decorative corner seals */}
      <div className="absolute top-2 left-2 text-amber-900/10 text-xl font-black">⚙️</div>
      <div className="absolute top-2 right-2 text-amber-900/10 text-xl font-black">⚙️</div>
      <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#fae5d3]/40 rounded-full" />
      <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#fae5d3]/40 rounded-full" />

      <span className="text-xl mb-1.5 animate-pulse">📜</span>
      <p className="text-[#a0522d] font-serif italic text-xs leading-relaxed max-w-[320px] px-2">
        "{current.quotes}"
      </p>
      <div className="w-16 h-[1px] bg-amber-200 mt-2.5 mb-1" />
      <span className="text-[9px] font-black text-amber-600/70 uppercase tracking-widest leading-none">
        {current.author}
      </span>
    </div>
  );
};

// ==========================================
// 4. HEARTMAP 7-DAY CRYSTAL HEATMAP CALENDAR
// ==========================================
export const HabitHeatmap: React.FC<{ quests: Quest[] }> = ({ quests }) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDayOfWeek = new Date().getDay();

  // Calculate status for past 7 days (simulated completion for previous days)
  return (
    <div className="bg-white rounded-2xl border border-[#ffdacf]/40 p-4.5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-rose-500" />
          <h4 className="font-extrabold text-[#514344] text-xs uppercase tracking-wider">
            7-Day Bloom Heatmap
          </h4>
        </div>
        <span className="text-[10px] font-black text-rose-500 bg-rose-50 border border-rose-100 px-2.5 py-0.5 rounded-full select-none">
          Active Streak
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2.5 text-center">
        {days.map((day, idx) => {
          const isToday = idx === currentDayOfWeek;
          // Completed status logic
          let status: "full" | "partial" | "empty" = "empty";
          
          if (idx < currentDayOfWeek) {
            // Previous days completed in simulation
            status = idx % 3 === 0 ? "partial" : "full";
          } else if (idx === currentDayOfWeek) {
            // Check real today's quests
            const completed = quests.filter(q => q.completed).length;
            const total = quests.length;
            if (completed === total && total > 0) status = "full";
            else if (completed > 0) status = "partial";
            else status = "empty";
          }

          return (
            <div key={day} className="flex flex-col items-center">
              <span className={`text-[9px] font-bold ${isToday ? "text-rose-500 font-black" : "text-[#74584d]/60"} mb-1.5`}>
                {day}
              </span>
              
              <div 
                className={`w-9 h-9 rounded-xl flex items-center justify-center border-2 transition-all shadow-sm ${
                  status === "full" 
                    ? "bg-gradient-to-tr from-emerald-100 to-emerald-300 border-emerald-400 text-emerald-800" 
                    : status === "partial"
                      ? "bg-gradient-to-tr from-amber-50 to-amber-200 border-amber-300 text-amber-700"
                      : "bg-[#fffcfc] border-dashed border-[#fcd5da]/50 text-slate-300"
                } ${isToday ? "ring-2 ring-rose-300 ring-offset-1" : ""}`}
                title={isToday ? "Today's progress" : `${day} history`}
              >
                <span className="text-base select-none">
                  {status === "full" ? "💎" : status === "partial" ? "✨" : "🕯️"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// 5. CIRCULAR HABIT COMPLETION RING PROGRESS
// ==========================================
export const HabitCompletionRing: React.FC<{ quests: Quest[] }> = ({ quests }) => {
  const completed = quests.filter(q => q.completed).length;
  const total = quests.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // SVG parameters
  const size = 56;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center space-x-3 bg-[#fff9f9] border border-rose-100 rounded-2xl p-3 shadow-inner">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background Circle */}
        <svg className="absolute transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#fce8ea"
            strokeWidth={strokeWidth}
          />
          {/* Active Progress Circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#f43f5e"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        {/* Percentage Center Text */}
        <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center">
          <span className="text-[11px] font-black text-rose-600 leading-none">
            {percentage}%
          </span>
        </div>
      </div>

      <div>
        <h5 className="text-[11px] font-black text-[#514344] uppercase tracking-wide">
          Sovereign Sanctum Completed
        </h5>
        <p className="text-xs font-bold text-rose-500">
          {completed} of {total} daily quests complete
        </p>
      </div>
    </div>
  );
};

// ==========================================
// 6. EPIC WEEKLY RECAP SCROLL SCREEN
// ==========================================
export const WeeklyRecapModal: React.FC<{ isOpen: boolean; onClose: () => void; progress: UserProgress }> = ({
  isOpen,
  onClose,
  progress,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-[#faf5f0] w-full max-w-sm rounded-[32px] border-2 border-[#e6ccb2] shadow-2xl p-6 overflow-hidden relative"
          initial={{ y: 50, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 50, scale: 0.95 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#e6ccb2]/45">
            <div className="flex items-center space-x-2 text-[#7f5539]">
              <TrendingUp className="w-5 h-5 text-rose-500" />
              <h3 className="font-serif italic text-lg font-black font-semibold">Weekly Scroll Recap</h3>
            </div>
            <button 
              onClick={onClose} 
              className="p-1 hover:bg-[#eddcd2] rounded-full transition-colors"
            >
              <X className="w-4.5 h-4.5 text-[#7f5539]" />
            </button>
          </div>

          {/* Stats recap blocks */}
          <div className="space-y-4">
            <p className="text-xs font-medium text-[#7f5539] italic leading-relaxed text-center">
              "Thy deeds from this solar cycle are inscribed within the magical parchment. Behold level achievements!"
            </p>

            <div className="grid grid-cols-2 gap-3.5 select-none">
              <div className="bg-white rounded-2xl border border-[#ede0d4]/60 p-3 text-center">
                <span className="text-xl">🏆</span>
                <span className="block text-xs font-black text-[#514344] mt-1.5">Streak Retained</span>
                <span className="block text-lg font-black text-rose-500 mt-0.5">{progress.currentStreak} Days</span>
                <span className="block text-[10px] font-extrabold text-[#74584d] tracking-normal mt-0.5">
                  ({progress.currentStreak <= 0 ? "1.0" : progress.currentStreak <= 2 ? "1.2" : "1.5"}x Coin Boost)
                </span>
              </div>
              <div className="bg-white rounded-2xl border border-[#ede0d4]/60 p-3 text-center">
                <span className="text-xl">⭐</span>
                <span className="block text-xs font-black text-[#514344] mt-1.5">Perfect Weeks</span>
                <span className="block text-lg font-black text-indigo-500 mt-0.5">3 Cycles</span>
              </div>
              <div className="bg-white rounded-2xl border border-[#ede0d4]/60 p-3 text-center">
                <span className="text-xl">⚡</span>
                <span className="block text-xs font-black text-[#514344] mt-1.5">Perfect Days</span>
                <span className="block text-lg font-black text-amber-500 mt-0.5">{progress.perfectDays} Days</span>
              </div>
              <div className="bg-white rounded-2xl border border-[#ede0d4]/60 p-3 text-center">
                <span className="text-xl">✨</span>
                <span className="block text-xs font-black text-[#514344] mt-1.5">Aura Prestige</span>
                <span className="block text-lg font-black text-emerald-500 mt-0.5">Grade A</span>
              </div>
            </div>

            {/* Simulated week visual graph wrapper */}
            <div className="bg-[#fff9f6] rounded-2xl border border-[#ede0d4] p-3">
              <span className="text-[10px] font-black text-amber-900/40 uppercase tracking-widest block mb-2">
                Mana Expending Chart
              </span>
              <div className="flex justify-between items-end h-16 pt-2">
                {[40, 75, 90, 50, 100, 30, 85].map((val, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1">
                    <div className="w-2.5 bg-[#fbdcd5] rounded-t-full relative flex flex-col justify-end overflow-hidden" style={{ height: "100%" }}>
                      <motion.div 
                        className="w-full bg-rose-500" 
                        initial={{ height: 0 }}
                        animate={{ height: `${val}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                      />
                    </div>
                    <span className="text-[9px] font-bold text-amber-800/60 mt-2">
                      {["S", "M", "T", "W", "T", "F", "S"][idx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-[#854f54] text-white py-3.5 rounded-2xl font-black text-xs shadow-md shadow-rose-900/10 hover:bg-[#854f54]/95 transition-all mt-5"
          >
            Purify My Focus
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ==========================================
// 7. EPIC TROPHY MILSETONE BADGES
// ==========================================
export const TrophyBadgesPanel: React.FC<{ progress: UserProgress; quests: Quest[] }> = ({ progress, quests }) => {
  const completed = quests.filter(q => q.completed).length;

  const BADGES = [
    { id: "hydra", title: "Prime Hydration", desc: "Scan and confirm water consumption", icon: "💧", cond: progress.xp > 1000 },
    { id: "mindful", title: "Stillness Sage", desc: "Verify 1hr No Phone focus stillness", icon: "🍄", cond: progress.currentStreak >= 4 },
    { id: "scholar", title: "Scribe Grandmaster", desc: "Summarize 3 study sessions", icon: "📜", cond: progress.level >= 5 },
    { id: "conq", title: "Boss Purger", desc: "Cleanse level 3 Eclipse Queen", icon: "👑", cond: progress.xp > 3000 }
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#ffdacf]/40 p-4.5 shadow-sm">
      <div className="flex items-center space-x-2 mb-3.5">
        <Trophy className="w-4 h-4 text-amber-500" />
        <h4 className="font-extrabold text-[#514344] text-xs uppercase tracking-wider">
          Quest Milestones & Trophies
        </h4>
      </div>

      <div className="grid grid-cols-4 gap-2.5">
        {BADGES.map((b) => (
          <div 
            key={b.id}
            className={`rounded-2xl border p-2 text-center transition-all ${
              b.cond 
                ? "bg-[#fffafa] border-[#fcd5da] shadow-sm saturate-[1.1] opacity-100" 
                : "bg-slate-50 border-slate-100 opacity-40 grayscale"
            }`}
            title={`${b.title}: ${b.desc}`}
          >
            <div className="text-2xl mb-1">{b.icon}</div>
            <div className="text-[8px] font-black text-[#514344] truncate leading-none">
              {b.title}
            </div>
            <span className="text-[7px] font-medium text-amber-800 opacity-80 block truncate mt-0.5">
              {b.cond ? "UNLOCKED" : "LOCKED"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 8. DAY STREAK SHINING FIRE COUNTER
// ==========================================
export const ShineStreakCounter: React.FC<{ streak: number }> = ({ streak }) => {
  return (
    <div className="bg-gradient-to-tr from-amber-500 via-rose-500 to-red-500 text-white rounded-2xl px-4 py-3 flex items-center justify-between shadow-md relative overflow-hidden select-none">
      <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-xl pointer-events-none" />
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-xl animate-bounce">
          🔥
        </div>
        <div>
          <h4 className="font-extrabold text-[#fff0ef] text-[10px] uppercase tracking-wider leading-none">
            Citadel Guard Streak
          </h4>
          <span className="text-lg font-black font-serif leading-none mt-1 block">
            {streak} Perfect Days In a Row!
          </span>
        </div>
      </div>
      <div className="bg-white/15 border border-white/20 whitespace-nowrap text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl">
        Aura x1.5
      </div>
    </div>
  );
};

// ==========================================
// 9. BONUS CHALLENGE QUESTS
// ==========================================
export const BonusQuestsPanel: React.FC<{ onCompleteChallenge: (xp: number, crystals: number) => void }> = ({
  onCompleteChallenge,
}) => {
  const [completeMap, setCompleteMap] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("hb_prestige_completed");
    return saved ? JSON.parse(saved) : {};
  });

  const CHALLENGES = [
    { id: "epic-hydrate", title: "Prestige Hydration", desc: "Swear oath to drink 3L of cold elven elixir.", xp: 50, crystals: 15, icon: "🍼" },
    { id: "epic-offline", title: "Abyss of Peace Focus", desc: "Pass focus challenge for 2 continuous hours.", xp: 90, crystals: 30, icon: "🌌" }
  ];

  const [activeChallenge, setActiveChallenge] = useState<any | null>(null);
  const [proofText, setProofText] = useState("");
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const handleChallengeClick = (challenge: any) => {
    if (completeMap[challenge.id]) return;
    setActiveChallenge(challenge);
    setProofText("");
    setCapturedPhoto(null);
    setErrorText(null);
    setAiResponse(null);
    setStep(0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCapturedPhoto(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const verifyChallengeWithAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofText.trim() || !activeChallenge) return;
    
    setIsVerifying(true);
    setErrorText(null);
    setAiResponse(null);
    playMagicSFX("chime");

    setStep(0);
    setStatusText("📡 Aligning the sylvan verification matrix...");
    
    const p1 = new Promise((resolve) => {
      setTimeout(() => {
        setStep(1);
        setStatusText("📖 Translating scroll testament and proof index...");
        resolve(null);
      }, 950);
    });

    const p2 = p1.then(() => new Promise((resolve) => {
      setTimeout(() => {
        setStep(2);
        setStatusText("👁️ Auditing vessel volume and physical constraints...");
        resolve(null);
      }, 950);
    }));

    const p3 = p2.then(() => new Promise((resolve) => {
      setTimeout(() => {
        setStep(3);
        setStatusText("🔮 Submitting to the Sages of Sylvan Sanctuary...");
        resolve(null);
      }, 950);
    }));

    const delayPromise = p3.then(() => new Promise((resolve) => setTimeout(resolve, 950)));

    try {
      const fetchPromise = fetch("/api/habit/verify-prestige", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeId: activeChallenge.id,
          challengeTitle: activeChallenge.title,
          proofText,
          image: capturedPhoto
        })
      });

      const [res] = await Promise.all([fetchPromise, delayPromise]);
      const data = await res.json();

      if (data.success) {
        if (data.approved) {
          playMagicSFX("coin");
          const updated = { ...completeMap, [activeChallenge.id]: true };
          setCompleteMap(updated);
          localStorage.setItem("hb_prestige_completed", JSON.stringify(updated));
          onCompleteChallenge(activeChallenge.xp, activeChallenge.crystals);
          setAiResponse(data.feedback);
        } else {
          playMagicSFX("fizzle");
          setErrorText(data.criticism || "The High Sages found thy testament unconvincing.");
        }
      } else {
        throw new Error(data.error || "AI Server error.");
      }
    } catch (e: any) {
      playMagicSFX("fizzle");
      setErrorText(`Failed to transmit petition: ${e.message}`);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-rose-100 p-4 shadow-sm select-none">
      <div className="flex items-center space-x-2 mb-3">
        <Crown className="w-4 h-4 text-purple-500" />
        <h4 className="font-extrabold text-[#514344] text-[11px] uppercase tracking-wider">
          Prestige Sanctuary Challenges (AI Verified)
        </h4>
      </div>

      <div className="space-y-2">
        {CHALLENGES.map((c) => {
          const done = completeMap[c.id];
          return (
            <div 
              key={c.id} 
              className={`flex items-center justify-between p-3 rounded-xl border-2 border-dashed transition-all ${
                done 
                  ? "bg-slate-50 border-slate-100 opacity-60" 
                  : "bg-[#fffbfb] border-pink-100 hover:bg-[#fff9f9]"
              }`}
            >
              <div className="flex items-center space-x-3 max-w-[70%]">
                <span className="text-xl" role="img" aria-label={c.title}>{c.icon}</span>
                <div>
                  <h5 className="text-[11px] font-extrabold text-[#514344] leading-normal">{c.title}</h5>
                  <p className="text-[10px] font-bold text-[#74584d]/75 leading-tight">{c.desc}</p>
                </div>
              </div>

              <button
                disabled={done}
                onClick={() => handleChallengeClick(c)}
                className={`text-[9px] font-black px-3 py-1.5 rounded-xl shadow-inner cursor-pointer select-none transition-all uppercase tracking-widest ${
                  done 
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                    : "bg-[#854f54] text-white hover:bg-[#854f54]/95"
                }`}
              >
                {done ? "SOLVED" : `VERIFY`}
              </button>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {activeChallenge && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[99999] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              className="bg-white border-2 border-[#854f54]/40 w-full max-w-md rounded-[32px] overflow-hidden relative shadow-2xl p-6 text-neutral-800 animate-fade-in"
            >
              {/* Corner decor */}
              <div className="absolute top-4 right-4">
                <button
                  type="button"
                  disabled={isVerifying}
                  onClick={() => setActiveChallenge(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center mb-5">
                <span className="text-4xl block mb-2">{activeChallenge.icon}</span>
                <span className="text-[9px] font-black tracking-widest text-[#854f54] bg-[#fff2f3] px-3 py-1 rounded-full uppercase inline-block border border-red-100 font-mono">
                  👑 Prestige Challenge Verification
                </span>
                <h3 className="text-base font-extrabold text-[#514344] mt-2 leading-snug">
                  {activeChallenge.title}
                </h3>
                <p className="text-xs text-[#74584d]/85 leading-normal max-w-xs mx-auto mt-1 font-sans">
                  {activeChallenge.desc}
                </p>
                <div className="flex justify-center space-x-3 mt-2 text-[10px] font-black text-rose-600 uppercase tracking-wider font-mono">
                  <span>💎 +{activeChallenge.crystals} Crystals</span>
                  <span>•</span>
                  <span>✨ +{activeChallenge.xp} XP</span>
                </div>
              </div>

              {/* Dynamic steps indicator when verifying */}
              {isVerifying ? (
                <div className="space-y-5 py-4 text-center">
                  <div className="relative w-12 h-12 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-[#854f54]/10 border-t-[#854f54] animate-spin" />
                    <Sparkles className="w-4 h-4 text-[#854f54] animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-extrabold text-[#514344] animate-pulse">
                      {statusText}
                    </p>
                    <p className="text-[10px] text-slate-400 italic">
                      Evaluating sylvan credentials...
                    </p>
                  </div>
                  {/* Progress indicators */}
                  <div className="grid grid-cols-4 gap-1.5 max-w-xs mx-auto">
                    {[0, 1, 2, 3].map((s) => (
                      <div 
                        key={s} 
                        className={`h-1.5 rounded-full ${
                          s <= step 
                            ? "bg-gradient-to-r from-pink-500 to-[#854f54]" 
                            : "bg-slate-100"
                        }`} 
                      />
                    ))}
                  </div>
                </div>
              ) : aiResponse ? (
                /* Success view */
                <div className="space-y-4 py-2">
                  <div className="bg-emerald-50 border border-emerald-100 p-4.5 rounded-2xl text-center space-y-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-lg mb-1">
                      👑
                    </div>
                    <h4 className="text-xs font-black text-emerald-800 uppercase tracking-widest block leading-none">
                      Petition Authenticated!
                    </h4>
                    <p className="text-xs text-emerald-950 font-bold leading-relaxed italic pr-1">
                      "{aiResponse}"
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveChallenge(null)}
                    className="w-full bg-[#854f54] hover:bg-[#854f54]/95 text-white font-black text-xs py-3 rounded-xl transition-all cursor-pointer shadow-md uppercase tracking-widest text-center"
                    id="prestige-done-ok-btn"
                  >
                    Receive Sylvan Blessings
                  </button>
                </div>
              ) : (
                /* Edit & Verify view */
                <form onSubmit={verifyChallengeWithAI} className="space-y-4 pt-1">
                  {errorText && (
                    <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-start space-x-2 text-rose-800 text-[10px] leading-relaxed">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span className="font-extrabold whitespace-pre-line">{errorText}</span>
                    </div>
                  )}

                  <div>
                    <label className="text-[10px] uppercase font-black text-[#74584d] tracking-wide block mb-1">
                      Write scroll testimony / proof details
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={proofText}
                      onChange={(e) => setProofText(e.target.value)}
                      placeholder={
                        activeChallenge.id === "epic-hydrate"
                          ? "E.g., I drank 3 full 1L bottles of pure spring water and kept tracking inside my journal."
                          : "E.g., I locked my phone into the focus chest, studied React fundamentals for 2 continuous hours, and did not check notifications once."
                      }
                      className="w-full text-xs font-bold border border-rose-105 rounded-2xl px-3 py-2.5 bg-[#fdfbfb] outline-none focus:ring-1 focus:ring-rose-200 transition-all font-sans leading-normal text-neutral-700"
                    />
                  </div>

                  {/* Attachment area */}
                  <div>
                    <label className="text-[10px] uppercase font-black text-[#74584d] tracking-wide block mb-1.5">
                      Parchment Evidence (Optional photo)
                    </label>
                     {capturedPhoto ? (
                       <div className="relative border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 p-2 text-center">
                         <img 
                           src={capturedPhoto} 
                           alt="Evidence" 
                           className="max-h-24 object-contain mx-auto rounded-lg" 
                         />
                         <button
                           type="button"
                           onClick={() => setCapturedPhoto(null)}
                           className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-[8px] font-black cursor-pointer uppercase transition-colors hover:bg-red-700"
                         >
                           Remove
                         </button>
                       </div>
                     ) : (
                       <label className="border-2 border-dashed border-rose-105 hover:border-rose-300 bg-[#fffdfd] h-20 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all">
                         <Upload className="w-5 h-5 text-[#854f54]/45 mb-1" />
                         <span className="text-[10px] text-[#74584d]/60 font-extrabold font-sans">Upload parchment screenshot / image</span>
                         <input 
                           type="file" 
                           accept="image/*" 
                           onChange={handleFileChange} 
                           className="hidden" 
                         />
                       </label>
                     )}
                  </div>

                  <div className="pt-2 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setActiveChallenge(null)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-black px-4 py-2.5 rounded-xl cursor-pointer"
                    >
                      Banish
                    </button>
                    <button
                      type="submit"
                      className="bg-[#854f54] text-white text-xs font-black px-5 py-2.5 rounded-xl shadow hover:bg-[#854f54]/95 cursor-pointer flex items-center space-x-1.5 transition-colors uppercase tracking-widest border border-rose-400/20"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Submit Petition</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// 10. LEVEL-UP CINEMATIC SCREEN WITH CONFETTI
// ==========================================
export const CinematicLevelUpScreen: React.FC<{ level: number; isOpen: boolean; onClose: () => void }> = ({
  level,
  isOpen,
  onClose,
}) => {
  const [animTrigger, setAnimTrigger] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimTrigger(true);
      playMagicSFX("level");
    } else {
      setAnimTrigger(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-[#16122d]/85 backdrop-blur-xl z-[99999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Star Sparkle Particles Overlay */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(251,113,133,0.15),transparent_60%)] pointer-events-none" />
        <CanvasConfetti active={animTrigger} />

        <motion.div 
          className="bg-gradient-to-tr from-[#1f1729] to-[#341b21] w-full max-w-sm rounded-[36px] border border-pink-500/30 p-8 text-center relative overflow-hidden shadow-2xl z-10"
          initial={{ scale: 0.8, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 100 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          {/* Sylvan Ornate Borders */}
          <div className="absolute top-3 left-3 text-pink-500/20 font-black text-xs select-none">✦ ✦</div>
          <div className="absolute top-3 right-3 text-pink-500/20 font-black text-xs select-none">✦ ✦</div>

          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center mx-auto mb-6 border border-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.4)] animate-pulse">
            <QuestIcon className="w-12 h-12 text-white animate-spin-slow" />
          </div>

          <span className="text-[10px] font-black text-pink-400 tracking-widest uppercase block mb-1">
            ✨ Sovereign Advancement ✨
          </span>
          <h2 className="text-3xl font-black text-white hover:text-rose-300 font-serif leading-none tracking-tight transition-all">
            LEVEL UP!
          </h2>

          <div className="text-6xl font-black bg-gradient-to-tr from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent my-6 select-none leading-none animate-bounce">
            Level {level}
          </div>

          <p className="text-xs text-rose-100 font-bold leading-relaxed px-4 opacity-85">
            Thy wizardly focus has elevated! The Arcane Garden bloomed new life. Enchanted artifacts inside the **Bazaar** have unsealed!
          </p>

          <div className="bg-[#fff9f6]/5 border border-pink-500/20 rounded-2xl p-4.5 mt-6 mb-2 select-none">
            <span className="text-[9px] font-black text-pink-400/80 uppercase tracking-widest block mb-2.5">
              👑 Newly Unlocked Title Reward
            </span>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-xl">🧝‍♀️</span>
              <span className="text-sm font-black text-white uppercase tracking-wider">
                Elite Garden Guardian
              </span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white text-xs font-black shadow-lg shadow-rose-900/40 cursor-pointer hover:saturate-120 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Accept Sovereign Blessing
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
