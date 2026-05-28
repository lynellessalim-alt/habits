import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, 
  Droplet, 
  Smartphone, 
  BookOpen, 
  Sparkles, 
  VolumeX, 
  Upload, 
  Compass,
  AlertCircle,
  Clock,
  Mic,
  Smile,
  Zap,
  CheckCircle,
  Play,
  RotateCcw
} from "lucide-react";
import { playMagicSFX } from "./ExtraFeatures";
import { playSylvanSFX } from "../utils/sylvanAudio";

interface AIHabitsVerificationProps {
  onAwardProgress: (xp: number, crystals: number, isWaterGoalReached?: boolean, questId?: string) => void;
  currentWaterTotalMl: number;
  onUpdateWaterProgress: (newTotal: number) => void;
}

export const AIHabitsVerification: React.FC<AIHabitsVerificationProps> = ({
  onAwardProgress,
  currentWaterTotalMl,
  onUpdateWaterProgress,
}) => {
  const [activeFeature, setActiveFeature] = useState<"water" | "phone" | "study">("water");

  // Loading/Verifying State
  const [verifying, setVerifying] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [processingStep, setProcessingStep] = useState<number>(0);
  const [processingStatus, setProcessingStatus] = useState<string>("");

  // ------------------------------------------------------------
  // FEATURE 1: WATER 2L DRINK SCANNER (Camera + Image upload + AI)
  // ------------------------------------------------------------
  const [waterCameraActive, setWaterCameraActive] = useState(false);
  const [capturedWaterPhoto, setCapturedWaterPhoto] = useState<string | null>(null);
  const [waterAnalysisResult, setWaterAnalysisResult] = useState<{
    estimatedMl: number;
    newTotalMl: number;
    goalReached: boolean;
    feedback: string;
    tip: string;
  } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start Camera
  const startWaterCamera = async () => {
    try {
      setErrorText(null);
      setCapturedWaterPhoto(null);
      setWaterAnalysisResult(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setWaterCameraActive(true);
    } catch (err: any) {
      console.warn("Could not initiate device camera, falling back to upload: ", err);
      setErrorText("Camera API is restricted, please use the manual parchment upload options.");
    }
  };

  // Stop Camera
  const stopWaterCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setWaterCameraActive(false);
  };

  // Capture Frame
  const snapWaterPhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64 = canvas.toDataURL("image/png");
      setCapturedWaterPhoto(base64);
      stopWaterCamera();
    }
  };

  // Handle manual image file selection
  const handleWaterFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCapturedWaterPhoto(event.target.result as string);
        setWaterAnalysisResult(null);
      }
    };
    reader.readAsDataURL(file);
  };

  // Submit and verify water picture
  const verifyWaterWithAI = async () => {
    if (!capturedWaterPhoto) return;
    setVerifying(true);
    setErrorText(null);
    playMagicSFX("chime");

    setProcessingStep(0);
    setProcessingStatus("📡 Fetching Gemini Neural Engine...");

    const p1 = new Promise((resolve) => {
      setTimeout(() => {
        setProcessingStep(1);
        setProcessingStatus("👁️ Scanning goblet image pixels and container boundaries...");
        resolve(null);
      }, 950);
    });

    const p2 = p1.then(() => new Promise((resolve) => {
      setTimeout(() => {
        setProcessingStep(2);
        setProcessingStatus("🧪 Estimating elixir fluid density and intake volume...");
        resolve(null);
      }, 950);
    }));

    const p3 = p2.then(() => new Promise((resolve) => {
      setTimeout(() => {
        setProcessingStep(3);
        setProcessingStatus("🔮 Authorizing celestial aqua hydration rewards...");
        resolve(null);
      }, 950);
    }));

    const delayPromise = p3.then(() => new Promise((resolve) => setTimeout(resolve, 950)));

    try {
      const fetchPromise = fetch("/api/habit/verify-water", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: capturedWaterPhoto,
          currentTotalMl: currentWaterTotalMl,
        }),
      });

      const [res] = await Promise.all([fetchPromise, delayPromise]);
      const data = await res.json();
      if (data.success) {
        setWaterAnalysisResult(data);
        onUpdateWaterProgress(data.newTotalMl);
        
        // Award XP + Coin: e.g. estimated proportion or 25 XP
        const baseXP = 30;
        const crystalReward = data.goalReached ? 25 : 8;
        onAwardProgress(baseXP, crystalReward, data.goalReached, "q-water");
        playMagicSFX("coin");
      } else {
        throw new Error(data.error || "AI scanning failure.");
      }
    } catch (err: any) {
      setErrorText(`AI analysis error: ${err.message || "Failed to parse. Please try again."}`);
      playMagicSFX("fizzle");
    } finally {
      setVerifying(false);
    }
  };

  const resetWaterState = () => {
    setCapturedWaterPhoto(null);
    setWaterAnalysisResult(null);
    setErrorText(null);
    stopWaterCamera();
  };

  // ------------------------------------------------------------
  // FEATURE 2: 1-HOUR NO PHONE ZONE (Motion detector + Sound check)
  // ------------------------------------------------------------
  const [phoneFocusActive, setPhoneFocusActive] = useState(false);
  const [focusTicks, setFocusTicks] = useState(0); // Simulated focus progress
  const [shakeDetected, setShakeDetected] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [ambientDb, setAmbientDb] = useState(15);
  const [focusResult, setFocusResult] = useState<{
    feedback: string;
    cheer: string;
  } | null>(null);

  const phoneTimerRef = useRef<NodeJS.Timeout | null>(null);
  const phoneMicContextRef = useRef<AudioContext | null>(null);
  const phoneAnalyserRef = useRef<AnalyserNode | null>(null);

  // Setup device mic analysis of background decibel noise
  const startMicAnalysis = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      phoneMicContextRef.current = audioContext;
      phoneAnalyserRef.current = analyser;
      setMicActive(true);

      // Loop to periodically sample sound decimals
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateVolume = () => {
        if (!phoneAnalyserRef.current) return;
        phoneAnalyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        // Map average volume amplitude 0-255 to dynamic dB
        const dB = Math.round((average / 255) * 60) + 10;
        setAmbientDb(dB);
        if (dB > 50) {
          // Alert user that noise was detected
        }
        if (phoneFocusActive) {
          requestAnimationFrame(updateVolume);
        }
      };
      updateVolume();
    } catch (err) {
      console.warn("Ambient mic check disabled or blocked (normal in sandbox/iframe):", err);
    }
  };

  // Start Focus Session
  const startPhoneFocus = async () => {
    setErrorText(null);
    setFocusResult(null);
    setShakeDetected(false);
    setFocusTicks(0);
    setPhoneFocusActive(true);
    playSylvanSFX("focus_start");

    // Start simulated countdown ticks
    phoneTimerRef.current = setInterval(() => {
      setFocusTicks((prev) => {
        if (prev >= 60) {
          clearInterval(phoneTimerRef.current!);
          return 60;
        }
        return prev + 1;
      });
    }, 1000);

    // Setup device accelerometer if allowed
    const handleMotion = (event: DeviceMotionEvent) => {
      const acc = event.acceleration;
      if (acc && acc.x && acc.y && acc.z) {
        const magnitude = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);
        if (magnitude > 12) {
          setShakeDetected(true);
          playMagicSFX("fizzle");
        }
      }
    };
    window.addEventListener("devicemotion", handleMotion);
    // Cleanup acceleration listener inside stopFocus
    (startPhoneFocus as any).motionCleaner = () => {
      window.removeEventListener("devicemotion", handleMotion);
    };

    // Microphone setup
    await startMicAnalysis();
  };

  const stopPhoneFocus = () => {
    if (phoneFocusActive) {
      playSylvanSFX("focus_end");
    }
    if (phoneTimerRef.current) clearInterval(phoneTimerRef.current);
    if (phoneMicContextRef.current) {
      phoneMicContextRef.current.close();
      phoneMicContextRef.current = null;
    }
    phoneAnalyserRef.current = null;
    setMicActive(false);
    setPhoneFocusActive(false);

    if ((startPhoneFocus as any).motionCleaner) {
      (startPhoneFocus as any).motionCleaner();
    }
  };

  // Finish session and verify with AI
  const verifyPhoneFocusWithAI = async () => {
    stopPhoneFocus();
    setVerifying(true);
    setErrorText(null);
    playMagicSFX("chime");

    setProcessingStep(0);
    setProcessingStatus("📡 Initializing silence rune calibration...");

    const p1 = new Promise((resolve) => {
      setTimeout(() => {
        setProcessingStep(1);
        setProcessingStatus("👂 Listening to microsecond ambient decibel levels...");
        resolve(null);
      }, 950);
    });

    const p2 = p1.then(() => new Promise((resolve) => {
      setTimeout(() => {
        setProcessingStep(2);
        setProcessingStatus("📉 Scanning accelerometer focus stillness logs...");
        resolve(null);
      }, 950);
    }));

    const p3 = p2.then(() => new Promise((resolve) => {
      setTimeout(() => {
        setProcessingStep(3);
        setProcessingStatus("🔮 Minting golden crystal zone tokens...");
        resolve(null);
      }, 950);
    }));

    const delayPromise = p3.then(() => new Promise((resolve) => setTimeout(resolve, 950)));

    try {
      const fetchPromise = fetch("/api/habit/verify-no-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secondsStill: focusTicks,
          scoreQuality: shakeDetected ? "Corrupted" : "Perfect",
          hasMicAudio: micActive,
          averageVolumeDb: ambientDb,
        }),
      });

      const [res] = await Promise.all([fetchPromise, delayPromise]);
      const data = await res.json();
      if (data.success) {
        setFocusResult(data);
        // Award XP & coin: 40 XP + 15 crystals
        onAwardProgress(40, 15, false, "q-phone");
        playMagicSFX("coin");
      } else {
        throw new Error(data.error || "Focus analysis failed.");
      }
    } catch (e: any) {
      setErrorText(`Verifying failure: ${e.message}`);
      playMagicSFX("fizzle");
    } finally {
      setVerifying(false);
    }
  };

  // ------------------------------------------------------------
  // FEATURE 3: FOCUS 45-MINUTE STUDY GOALS (Text Analysis AI)
  // ------------------------------------------------------------
  const [studyTopic, setStudyTopic] = useState("");
  const [studyAccomplished, setStudyAccomplished] = useState("");
  const [studyResult, setStudyResult] = useState<{
    summary: string;
    tips: string;
  } | null>(null);

  const verifyStudyWithAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studyTopic.trim() || !studyAccomplished.trim()) return;

    setVerifying(true);
    setErrorText(null);
    setStudyResult(null);
    playMagicSFX("chime");

    setProcessingStep(0);
    setProcessingStatus("📡 Opening Citadel scholar archives...");

    const p1 = new Promise((resolve) => {
      setTimeout(() => {
        setProcessingStep(1);
        setProcessingStatus("📖 Reading thy research summaries & text logs...");
        resolve(null);
      }, 950);
    });

    const p2 = p1.then(() => new Promise((resolve) => {
      setTimeout(() => {
        setProcessingStep(2);
        setProcessingStatus("🧠 Parsing topic terminology & intellectual effort...");
        resolve(null);
      }, 950);
    }));

    const p3 = p2.then(() => new Promise((resolve) => {
      setTimeout(() => {
        setProcessingStep(3);
        setProcessingStatus("🔮 Verifying study accomplishment with Archmages...");
        resolve(null);
      }, 950);
    }));

    const delayPromise = p3.then(() => new Promise((resolve) => setTimeout(resolve, 950)));

    try {
      const fetchPromise = fetch("/api/habit/verify-study", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: studyTopic,
          accomplishment: studyAccomplished,
          minutesStudied: 45,
        }),
      });

      const [res] = await Promise.all([fetchPromise, delayPromise]);
      const data = await res.json();
      if (data.success) {
        setStudyResult(data);
        // Award 50 XP, 20 Crystals
        onAwardProgress(50, 20, false, "q-study");
        playMagicSFX("coin");
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      setErrorText(`Could not post study highlights: ${err.message}`);
      playMagicSFX("fizzle");
    } finally {
      setVerifying(false);
    }
  };

  const clearStudyState = () => {
    setStudyTopic("");
    setStudyAccomplished("");
    setStudyResult(null);
    setErrorText(null);
  };

  return (
    <div className="bg-white rounded-[28px] border border-rose-100 p-5.5 shadow-md space-y-5">
      {/* Category header tabs */}
      <div className="flex items-center justify-between border-b border-rose-100/40 pb-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-rose-500 animate-pulse" />
          <h3 className="font-serif italic font-bold text-base text-[#514344]">
            AI Guild Verification Sanctum
          </h3>
        </div>
        <span className="text-[10px] font-black tracking-widest text-[#74584d]/50 uppercase font-mono">
          Model: Flash 3.5
        </span>
      </div>

      {/* Grid Tabs selection */}
      <div className="grid grid-cols-3 gap-2.5">
        <button
          onClick={() => {
            setActiveFeature("water");
            setErrorText(null);
          }}
          className={`flex flex-col items-center py-2 px-1.5 rounded-2xl border transition-all cursor-pointer ${
            activeFeature === "water"
              ? "bg-[#fff2f3] border-rose-300 text-rose-600 font-extrabold"
              : "bg-slate-50 border-slate-100 text-[#74584d]/70 hover:bg-slate-105"
          }`}
        >
          <Droplet className="w-4.5 h-4.5 mb-1" />
          <span className="text-[9px] uppercase tracking-wider text-center leading-none">
            Aqua Goblet
          </span>
        </button>

        <button
          onClick={() => {
            setActiveFeature("phone");
            setErrorText(null);
          }}
          className={`flex flex-col items-center py-2 px-1.5 rounded-2xl border transition-all cursor-pointer ${
            activeFeature === "phone"
              ? "bg-[#fff2f3] border-rose-300 text-rose-600 font-extrabold"
              : "bg-slate-50 border-slate-100 text-[#74584d]/70 hover:bg-slate-105"
          }`}
        >
          <Smartphone className="w-4.5 h-4.5 mb-1" />
          <span className="text-[9px] uppercase tracking-wider text-center leading-none">
            Silence Rune
          </span>
        </button>

        <button
          onClick={() => {
            setActiveFeature("study");
            setErrorText(null);
          }}
          className={`flex flex-col items-center py-2 px-1.5 rounded-2xl border transition-all cursor-pointer ${
            activeFeature === "study"
              ? "bg-[#fff2f3] border-rose-300 text-rose-600 font-extrabold"
              : "bg-slate-50 border-slate-100 text-[#74584d]/70 hover:bg-slate-105"
          }`}
        >
          <BookOpen className="w-4.5 h-4.5 mb-1" />
          <span className="text-[9px] uppercase tracking-wider text-center leading-none">
            Mage Scholars
          </span>
        </button>
      </div>

      {/* VERIFYING LOADING PANEL */}
      <AnimatePresence>
        {verifying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-slate-900 border-2 border-primary/20 text-white rounded-3xl p-6 text-center space-y-5 relative overflow-hidden select-none shadow-2xl"
          >
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/45 via-slate-905 to-rose-950/20 pointer-events-none" />

            {/* Glowing active spinner */}
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
              <div className="absolute w-10 h-10 rounded-full bg-primary/20 blur-md animate-pulse" />
              <Sparkles className="w-5 h-5 text-primary-container animate-bounce" />
            </div>

            <div className="space-y-1 relative z-10">
              <span className="text-[9px] font-black tracking-widest text-[#ebd5d7] bg-primary/20 px-3 py-1 rounded-full uppercase">
                🧠 Gemini AI Verification Sanctum
              </span>
              <h4 className="font-serif italic text-lg text-rose-100 pt-2 font-bold">
                AI Model Processing...
              </h4>
            </div>

            {/* Custom Processing Status with animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={processingStatus}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-[#241a1c] border border-primary/25 rounded-2xl p-4 min-h-[70px] flex items-center justify-center relative z-10"
              >
                <div className="space-y-1.5 w-full">
                  <div className="text-sm font-black text-rose-200 tracking-wide leading-relaxed animate-pulse">
                    {processingStatus}
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold italic">
                    {processingStep === 0 && "Locating the optimal neural nodes..."}
                    {processingStep === 1 && (
                      activeFeature === "water" ? "Inspecting glass outline, hydration levels, and illumination..." :
                      activeFeature === "phone" ? "Verifying background soundwaves, microphone frequency, and stillness index..." :
                      "Analyzing typography, written context, sylvan syntax, and scholarly substance..."
                    )}
                    {processingStep === 2 && "Analyzing geometric parameters and calculating habit validity indices..."}
                    {processingStep === 3 && "Constructing the magical reward payload..."}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Beautiful Step-By-Step Progression HUD */}
            <div className="relative z-10 space-y-2">
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                {[
                  { label: "Connect", icon: "📡" },
                  { 
                    label: activeFeature === "water" ? "Scan" : activeFeature === "phone" ? "Listen" : "Read", 
                    icon: activeFeature === "water" ? "👁️" : activeFeature === "phone" ? "👂" : "📖" 
                  },
                  { label: "Analyze", icon: "🧠" },
                  { label: "Certify", icon: "💎" }
                ].map((step, idx) => {
                  const isActive = processingStep === idx;
                  const isCompleted = processingStep > idx;

                  return (
                    <div 
                      key={step.label}
                      className={`flex flex-col items-center p-2 rounded-xl border transition-all duration-300 ${
                        isActive 
                          ? "bg-primary/20 border-primary text-primary-container font-black scale-102"
                          : isCompleted
                          ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-300 opacity-90"
                          : "bg-slate-800/40 border-slate-700/30 text-slate-500 opacity-60"
                      }`}
                    >
                      <span className="text-base mb-1">{step.icon}</span>
                      <span className="text-[10px] tracking-wider uppercase font-black">{step.label}</span>
                      <span className="text-[8px] font-mono mt-0.5 opacity-60">Step {idx + 1}</span>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Progress Bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/20 p-0.5">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-500 via-primary to-emerald-400 rounded-full"
                  animate={{ width: `${((processingStep + 1) / 4) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Output block */}
      {errorText && !verifying && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start space-x-2 text-rose-800 text-xs">
          <AlertCircle className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-0.5" />
          <span className="font-bold leading-relaxed">{errorText}</span>
        </div>
      )}

      {/* =========================================================
                     UI AREA 1: WATER GOBLET SCANNER
         ========================================================= */}
      {activeFeature === "water" && !verifying && (
        <div className="space-y-4">
          <p className="text-xs text-[#74584d]/80 leading-relaxed font-medium">
            Take a screenshot/photo of your water container. AI estimates your intake in milliliters to fill the 2L crystal orb!
          </p>

          {/* Quick Stats overview */}
          <div className="bg-[#f0f9ff] border border-sky-100 rounded-2xl p-4 flex items-center justify-between select-none">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-serif text-lg font-bold">
                🏺
              </div>
              <div>
                <span className="text-[10px] text-sky-800/60 uppercase font-black block leading-none">
                  Elixir Guzzled
                </span>
                <span className="text-base font-black text-sky-600 mt-1 block font-serif">
                  {currentWaterTotalMl}ml / 2000ml
                </span>
              </div>
            </div>

            <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
              currentWaterTotalMl >= 2000 
                ? "bg-sky-500 text-white border border-sky-600 shadow-sm" 
                : "bg-sky-100 text-sky-800"
            }`}>
              {currentWaterTotalMl >= 2000 ? "Water Magic Active" : "Unfulfilled"}
            </span>
          </div>

          <div className="border-2 border-dashed border-sky-200 bg-[#f7fcff] p-5 rounded-2xl text-center space-y-4 relative overflow-hidden">
            {/* Real device camera feed handle */}
            {waterCameraActive ? (
              <div className="space-y-3">
                <video
                  ref={videoRef}
                  className="w-full max-h-48 rounded-xl object-cover border border-sky-300 shadow-inner"
                  playsInline
                />
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={snapWaterPhoto}
                    className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center space-x-1.5 cursor-pointer shadow"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Snap Water Orb</span>
                  </button>
                  <button
                    onClick={stopWaterCamera}
                    className="bg-slate-200 text-[#514344] text-xs font-black px-4 py-2 rounded-xl hover:bg-slate-205 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : capturedWaterPhoto ? (
              <div className="space-y-3">
                <img
                  src={capturedWaterPhoto}
                  alt="Water consumed scan"
                  className="w-full max-h-48 rounded-xl object-contain border border-sky-200 mx-auto"
                />
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={verifyWaterWithAI}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black px-5 py-2.5 rounded-xl shadow cursor-pointer flex items-center space-x-1.5"
                  >
                    <Sparkles className="w-4 h-4 animate-spin-slow" />
                    <span>Initiate AI Scan</span>
                  </button>
                  <button
                    onClick={resetWaterState}
                    className="bg-slate-100 hover:bg-slate-150 text-[#514344] text-xs font-black px-4 py-2 rounded-xl cursor-pointer"
                  >
                    Re-take
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 flex flex-col items-center">
                <div className="w-14 h-14 bg-sky-50 rounded-full flex items-center justify-center text-sky-600 border border-sky-100 text-2xl animate-pulse">
                  🧊
                </div>
                <div className="text-center">
                  <h4 className="font-extrabold text-xs text-[#514344]">Capture goblet and verify</h4>
                  <p className="text-[10px] text-[#74584d]/60 mt-1 max-w-[240px]">
                    Position your bottle or vessel inside the elven mirror scanner.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full justify-center">
                  <button
                    onClick={startWaterCamera}
                    className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-black px-4 py-2.5 rounded-xl flex items-center justify-center space-x-2 shadow cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Launch Device Camera</span>
                  </button>

                  <label className="bg-slate-150 hover:bg-slate-200 text-[#514344] text-xs font-black px-4 py-2.5 rounded-xl flex items-center justify-center space-x-2 cursor-pointer transition-all border border-slate-200">
                    <Upload className="w-4 h-4" />
                    <span>Parchment Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleWaterFileSelect}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* WATER ANALYSIS ANSWER POP */}
          {waterAnalysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#f0fdfa] border border-teal-100 rounded-2xl p-4 space-y-3"
            >
              <div className="flex items-center space-x-2 text-teal-700">
                <CheckCircle className="w-5 h-5 text-teal-600" />
                <h4 className="font-extrabold text-xs uppercase tracking-wide leading-none">
                  AI Goblet Verification Decisive!
                </h4>
              </div>

              <div className="text-xl font-black text-teal-600 font-serif">
                Estimated Consumed: +{waterAnalysisResult.estimatedMl}ml
              </div>

              <p className="text-xs text-teal-900 leading-relaxed italic pr-2 font-medium">
                "{waterAnalysisResult.feedback}"
              </p>

              <div className="w-full h-[1px] bg-teal-100/60 my-2" />

              <span className="text-[10px] text-teal-800/80 font-black block leading-snug">
                📖 Elven Wisdom Tip: {waterAnalysisResult.tip}
              </span>

              {waterAnalysisResult.goalReached && (
                <div className="bg-gradient-to-r from-sky-400 to-indigo-500 text-white p-3 rounded-xl text-center text-[10px] font-black uppercase tracking-widest mt-2 animate-bounce flex items-center justify-center space-x-1.5">
                  <span>🌊 Pastel Water Magic Summoned!</span>
                </div>
              )}
            </motion.div>
          )}
        </div>
      )}

      {/* =========================================================
                     UI AREA 2: 1-HOUR NO PHONE ZONE
         ========================================================= */}
      {activeFeature === "phone" && !verifying && (
        <div className="space-y-4">
          <p className="text-xs text-[#74584d]/80 leading-relaxed font-medium">
            Lock thy device into inactivity for 1 hour. Ambient stillness is verified using device Microphone volume analyzer! Keep noise low and avoid shaking.
          </p>

          <div className="bg-white rounded-2xl border border-rose-100 p-4.5 space-y-4 text-center">
            {phoneFocusActive ? (
              <div className="space-y-4">
                {/* Simulated Tick / Pulse indicator */}
                <div className="relative inline-flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-rose-500/15 animate-ping" />
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 text-white flex items-center justify-center text-xl font-black shadow-lg">
                    {focusTicks}s
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-extrabold text-[#514344]">Focus Spell Invoking...</h4>
                  <p className="text-[10px] text-[#74584d]/60 max-w-[220px] mx-auto">
                    The sensors require absolute stillness. Ambient Sound:
                  </p>
                </div>

                {/* DB Level scale */}
                <div className="w-full max-w-xs mx-auto">
                  <div className="flex justify-between items-center text-[9px] font-black text-[#74584d]/75 mb-1 px-1">
                    <span>QUIET ROOM</span>
                    <span className={ambientDb > 45 ? "text-rose-500" : "text-emerald-500"}>
                      {ambientDb} dB {ambientDb > 45 ? "(LOUD)" : "(CALM)"}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-250 flex items-center p-0.5">
                    <motion.div
                      className={`h-full rounded-full ${
                        ambientDb > 45 ? "bg-red-400" : "bg-emerald-400"
                      }`}
                      style={{ width: `${Math.min((ambientDb / 80) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {shakeDetected && (
                  <div className="p-3 bg-[#ffe9eb] border border-red-200 rounded-xl text-[10px] text-red-700 font-extrabold flex items-center justify-center space-x-1 animate-pulse">
                    <VolumeX className="w-4 h-4 shrink-0" />
                    <span>⚠️ PHYSICAL ANOMALY DETECTED: Shake movement flagged!</span>
                  </div>
                )}

                <div className="flex justify-center space-x-2">
                  <button
                    onClick={verifyPhoneFocusWithAI}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black px-4.5 py-2.5 rounded-xl shadow cursor-pointer"
                  >
                    Finish & Analyze (AI Verify)
                  </button>
                  <button
                    onClick={() => {
                      stopPhoneFocus();
                      playMagicSFX("fizzle");
                    }}
                    className="bg-slate-200 hover:bg-slate-250 text-[#514344] text-xs font-black px-4.5 py-2.5 rounded-xl cursor-pointer"
                  >
                    Abort
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-4">
                <div className="w-14 h-14 bg-rose-50 border border-rose-100 text-rose-500 rounded-full flex items-center justify-center text-2xl mx-auto animate-pulse">
                  🔮
                </div>

                <div>
                  <h4 className="font-extrabold text-xs text-[#514344]">Begin focus stillness zone</h4>
                  <p className="text-[10px] text-[#74584d]/60 max-w-[200px] mx-auto mt-1">
                    Pledges 1 hour of Phone-free concentration. Micro-shakes will break the spell.
                  </p>
                </div>

                <div className="flex justify-center space-x-2.5">
                  <button
                    onClick={startPhoneFocus}
                    className="bg-[#854f54] text-white text-xs font-black px-5 py-3 rounded-xl flex items-center space-x-2 shadow hover:bg-[#854f54]/95 cursor-pointer leading-none"
                  >
                    <Play className="w-4.5 h-4.5" />
                    <span>Inscribe Focus Focus</span>
                  </button>
                </div>

                {/* Simulative Fast Track for testing */}
                <span className="text-[9px] text-[#74584d]/45 block italic font-bold">
                  *Tip: Let focus timer run a few seconds, then click Finish to run AI analysis scan.
                </span>
              </div>
            )}
          </div>

          {/* FOCUS RESULT ATTAINED */}
          {focusResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50/70 border border-emerald-250 rounded-2xl p-4 space-y-3"
            >
              <div className="flex items-center space-x-2 text-emerald-800">
                <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
                <h4 className="text-xs font-extrabold uppercase tracking-wider leading-none">
                  Focus Zone Authenticated!
                </h4>
              </div>

              <p className="text-xs text-emerald-950 font-bold leading-relaxed italic pr-1">
                "{focusResult.feedback}"
              </p>

              <div className="w-full h-[1px] bg-emerald-200/50" />

              <span className="text-[10px] font-black text-[#514344] leading-normal block uppercase">
                🌸 Sage Bless: {focusResult.cheer}
              </span>
            </motion.div>
          )}
        </div>
      )}

      {/* =========================================================
                     UI AREA 3: STUDY ACCOMPLISHMENT SUMMARIES
         ========================================================= */}
      {activeFeature === "study" && !verifying && (
        <div className="space-y-4">
          <p className="text-xs text-[#74584d]/80 leading-relaxed font-medium">
            Did you finish a study/reading session? Type what you researched, and our Sages will authorize accomplishments and reward crystal tokens!
          </p>

          <form onSubmit={verifyStudyWithAI} className="space-y-3">
            <div>
              <label className="text-[10px] uppercase font-black text-[#74584d] tracking-wide block mb-1">
                Topic of Research (e.g. Alchemy, React, Latin)
              </label>
              <input
                required
                type="text"
                placeholder="Topic of study"
                value={studyTopic}
                onChange={(e) => setStudyTopic(e.target.value)}
                className="w-full text-xs font-bold border border-rose-100 rounded-xl px-3 py-2.5 bg-[#fffcfa] outline-none focus:ring-1 focus:ring-rose-200 transition-all font-sans"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-black text-[#74584d] tracking-wide block mb-1">
                Exact Accomplishments (What did you learn / build?)
              </label>
              <textarea
                required
                rows={3}
                placeholder="I compiled 12 lines of sylvan CSS and mastered typography hierarchy."
                value={studyAccomplished}
                onChange={(e) => setStudyAccomplished(e.target.value)}
                className="w-full text-xs font-bold border border-rose-100 rounded-xl px-3 py-2.5 bg-[#fffcfa] outline-none focus:ring-1 focus:ring-rose-200 transition-all font-sans leading-normal"
              />
            </div>

            <div className="flex space-x-2 justify-end pt-1">
              {studyResult && (
                <button
                  type="button"
                  onClick={clearStudyState}
                  className="bg-slate-100 hover:bg-slate-150 text-[#514344] text-xs font-black px-4 py-2.5 rounded-xl transition-colors"
                >
                  Clear Session
                </button>
              )}
              <button
                type="submit"
                className="bg-[#854f54] text-white text-xs font-black px-5 py-2.5 rounded-xl shadow hover:bg-[#854f54]/95 transition-all flex items-center space-x-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Publish to Archmage</span>
              </button>
            </div>
          </form>

          {/* STUDY RESULT */}
          {studyResult && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#f0fdff] border border-sky-100 rounded-2xl p-4 space-y-3"
            >
              <div className="flex items-center space-x-2 text-sky-800">
                <CheckCircle className="w-4.5 h-4.5 text-sky-600" />
                <h4 className="text-xs font-black uppercase tracking-wider leading-none">
                  Archmage Evaluation Rendered!
                </h4>
              </div>

              <p className="text-xs text-sky-900 leading-relaxed font-bold italic">
                "{studyResult.summary}"
              </p>

              <div className="w-full h-[1px] bg-sky-200/50 my-1" />

              <span className="text-[10px] font-black text-sky-800 block uppercase">
                📜 Archmage tip to banish procrastination: {studyResult.tips}
              </span>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};
