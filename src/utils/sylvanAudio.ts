export type SylvanSFXType =
  | "task_completed"
  | "perfect_day"
  | "level_up"
  | "item_purchased"
  | "open_bazaar"
  | "focus_start"
  | "focus_end"
  | "journal_saved"
  | "badge_earned";

/**
 * Procedural Web Audio API sound effect synthesizer.
 * Generates custom, pure, high-fidelity sylvan-themed sounds mathematically
 * without loading external audio assets, ensuring offline-first reliability.
 */
export const playSylvanSFX = (type: SylvanSFXType) => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) {
      console.warn("Web Audio API is not supported in this browser environment.");
      return;
    }
    const ctx = new AudioContextClass();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    const now = ctx.currentTime;

    const playTaskCompleted = () => {
      // Soft sparkle chime ✨ rapid fluttering high-pitched sine sweep
      const freqs = [1046.5, 1318.51, 1567.98, 2093.0]; // C6, E6, G6, C7
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now + idx * 0.04);
        gain.gain.setValueAtTime(0, now + idx * 0.04);
        gain.gain.linearRampToValueAtTime(0.05, now + idx * 0.04 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.25);
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.28);
      });
    };

    const playPerfectDay = () => {
      // Magical harp + fairy sparkle sound
      const harpNotes = [196.00, 261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // G3, C4, E4, G4, C5, E5, G5, C6
      harpNotes.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, now + idx * 0.035);
        gain.gain.setValueAtTime(0, now + idx * 0.035);
        gain.gain.linearRampToValueAtTime(0.04, now + idx * 0.035 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.035 + 0.65);
        osc.start(now + idx * 0.035);
        osc.stop(now + idx * 0.035 + 0.7);
      });

      // Shimmering randomized high fairy sparkles
      for (let i = 0; i < 10; i++) {
        const offset = 0.25 + i * 0.05;
        const randomFreq = 1600 + Math.random() * 1200;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(randomFreq, now + offset);
        gain.gain.setValueAtTime(0, now + offset);
        gain.gain.linearRampToValueAtTime(0.02, now + offset + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.2);
        osc.start(now + offset);
        osc.stop(now + offset + 0.22);
      }
    };

    const playLevelUp = () => {
      // Rising crystal chime with whoosh
      // 1. Cozy Sylvan wind whoosh channel
      const bufferSize = ctx.sampleRate * 0.85;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.Q.value = 5.0;
      filter.frequency.setValueAtTime(250, now);
      filter.frequency.exponentialRampToValueAtTime(1500, now + 0.65);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.025, now);
      noiseGain.gain.linearRampToValueAtTime(0.045, now + 0.3);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.8);

      // 2. Crystal chimes ascending
      const chimeNotes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
      chimeNotes.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now + idx * 0.045);
        osc.frequency.linearRampToValueAtTime(f * 1.04, now + idx * 0.045 + 0.15);
        gain.gain.setValueAtTime(0, now + idx * 0.045);
        gain.gain.linearRampToValueAtTime(0.045, now + idx * 0.045 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.045 + 0.45);
        osc.start(now + idx * 0.045);
        osc.stop(now + idx * 0.045 + 0.48);
      });
    };

    const playItemPurchased = () => {
      // Magical cash register "Ching!" + sparkle pop
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      const gain2 = ctx.createGain();

      osc1.connect(gain1);
      osc2.connect(gain2);
      gain1.connect(ctx.destination);
      gain2.connect(ctx.destination);

      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(987.77, now); // B5 (Bright register bell accent)
      gain1.gain.setValueAtTime(0.06, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1318.51, now + 0.025); // E6
      gain2.gain.setValueAtTime(0.04, now + 0.025);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.start(now);
      osc1.stop(now + 0.3);
      osc2.start(now + 0.025);
      osc2.stop(now + 0.38);

      // Register coin drawer click (Quick high-pass crunch)
      const bufferSize = ctx.sampleRate * 0.06;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 3500;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.02, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.07);

      // Sparkle pop element
      const popOsc = ctx.createOscillator();
      const popGain = ctx.createGain();
      popOsc.connect(popGain);
      popGain.connect(ctx.destination);
      popOsc.type = "sine";
      popOsc.frequency.setValueAtTime(1400, now + 0.16);
      popOsc.frequency.exponentialRampToValueAtTime(350, now + 0.25); // Quick downward bubble sweep
      popGain.gain.setValueAtTime(0.05, now + 0.16);
      popGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);
      popOsc.start(now + 0.16);
      popOsc.stop(now + 0.27);
    };

    const playOpenBazaar = () => {
      // Warm bell chime with ambient sparkle
      const bellFreqs = [261.63, 392.00, 523.25, 659.25]; // C4, G4, C5, E5
      bellFreqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);
        gain.gain.setValueAtTime(0.05 / (idx + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);
        osc.start(now);
        osc.stop(now + 2.05);
      });

      // Delicate ambient starry chimes floating in
      for (let i = 0; i < 7; i++) {
        const offset = 0.12 + i * 0.14;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(2000 - i * 180, now + offset);
        gain.gain.setValueAtTime(0.025, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.45);
        osc.start(now + offset);
        osc.stop(now + offset + 0.48);
      }
    };

    const playFocusStart = () => {
      // Calm, warming, pure bell tone resembling a Tibetan singing bowl
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(293.66, now); // D4 key

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(294.66, now); // Detuned by 1Hz to synthesize an acoustic beating shimmer

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.85);
      osc2.stop(now + 1.85);
    };

    const playFocusEnd = () => {
      // Soft fairy notification sounding dual cascade
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      const gain2 = ctx.createGain();

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(880.0, now); // A5
      gain1.gain.setValueAtTime(0.05, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1109.73, now + 0.14); // C#6
      gain2.gain.setValueAtTime(0.05, now + 0.14);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc1.start(now);
      osc1.stop(now + 0.38);
      osc2.start(now + 0.14);
      osc2.stop(now + 0.58);
    };

    const playJournalSaved = () => {
      // Pen stroke / soft paper ink rustle + minor twinkle chime
      const bufferSize = ctx.sampleRate * 0.28;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.Q.value = 1.2;
      filter.frequency.setValueAtTime(750, now);
      filter.frequency.linearRampToValueAtTime(380, now + 0.22);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.02, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.26);

      // Sparkly chime overlay
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, now + 0.08);
      gain.gain.setValueAtTime(0.035, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
      osc.start(now + 0.08);
      osc.stop(now + 0.48);
    };

    const playBadgeEarned = () => {
      // Triumphant fantasy quest jingle (medieval brassy arpeggio chord)
      const fanfareNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
      fanfareNotes.forEach((f, idx) => {
        const oscTri = ctx.createOscillator();
        const oscSine = ctx.createOscillator();
        const gain = ctx.createGain();

        oscTri.connect(gain);
        oscSine.connect(gain);
        gain.connect(ctx.destination);

        oscTri.type = "triangle"; // Warm, horn-like trumpet texture
        oscTri.frequency.setValueAtTime(f, now + idx * 0.055);

        oscSine.type = "sine"; // Pure bright harmonic shine
        oscSine.frequency.setValueAtTime(f * 2, now + idx * 0.055);

        gain.gain.setValueAtTime(0, now + idx * 0.055);
        gain.gain.linearRampToValueAtTime(0.035, now + idx * 0.055 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.055 + 0.55);

        oscTri.start(now + idx * 0.055);
        oscSine.start(now + idx * 0.055);
        oscTri.stop(now + idx * 0.055 + 0.6);
        oscSine.stop(now + idx * 0.055 + 0.6);
      });
    };

    switch (type) {
      case "task_completed":
        playTaskCompleted();
        break;
      case "perfect_day":
        playPerfectDay();
        break;
      case "level_up":
        playLevelUp();
        break;
      case "item_purchased":
        playItemPurchased();
        break;
      case "open_bazaar":
        playOpenBazaar();
        break;
      case "focus_start":
        playFocusStart();
        break;
      case "focus_end":
        playFocusEnd();
        break;
      case "journal_saved":
        playJournalSaved();
        break;
      case "badge_earned":
        playBadgeEarned();
        break;
      default:
        break;
    }
  } catch (e) {
    console.warn("Sylvan procedural audio synthesis skipped: ", e);
  }
};
