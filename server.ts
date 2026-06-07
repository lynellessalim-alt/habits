import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Create Gemini Client - Graceful fallback if missing API key
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("GEMINI_API_KEY not found in environment. AI features will run in mock/simulated mode.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "15mb" }));

  // API 1: Verify Water Intake Photo
  app.post("/api/habit/verify-water", async (req, res) => {
    try {
      const { image, currentTotalMl = 0 } = req.body;
      if (!image) {
        return res.status(400).json({ error: "Missing image attachment." });
      }

      // Base64 cleanup
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

      if (!ai) {
        // Fallback simulation mode
        const waterEstimated = Math.floor(Math.random() * 300) + 250; // 250 - 550ml
        const newTotal = currentTotalMl + waterEstimated;
        const reached = newTotal >= 2000;
        return res.json({
          success: true,
          estimatedMl: waterEstimated,
          newTotalMl: Math.min(newTotal, 2000),
          goalReached: reached,
          feedback: `[Simulation Mode] The elven mirror scans your goblet and detects roughly ${waterEstimated}ml of crystalline, refreshing water! Keep up the sacred hydration!`,
          tip: "Drink filtered spring water to enhance your elven aura and mana regeneration.",
        });
      }

      const promptString = 
        "Analyze this photo of a water bottle or glass. Estimate the amount of water in milliliters that the user has consumed from this vessel (or the full volume of this drink if it is newly presented to be consumed). Your estimate must be a plausible integer number of milliliters, typically between 200ml and 1000ml. Generate a fantasy RPG/medieval style encouraging response from an elven hydration mentor. Finally, provide 1 useful tip on hydration.";

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          {
            inlineData: {
              data: base64Data,
              mimeType: "image/png", // Standard transmission mime type
            },
          },
          { text: promptString },
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              estimatedMl: {
                type: Type.INTEGER,
                description: "Estimated milliliters consumed from the photo container (e.g. 350, 500 etc). Keep it realistic based on the photo.",
              },
              feedback: {
                type: Type.STRING,
                description: "Encouraging response in fantasy RPG elven mentor persona.",
              },
              tip: {
                type: Type.STRING,
                description: "A short elven/nature hydration tip.",
              },
            },
            required: ["estimatedMl", "feedback", "tip"],
          },
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      const estimatedMl = Math.max(0, parsed.estimatedMl || 300);
      const newTotal = currentTotalMl + estimatedMl;
      const reached = newTotal >= 2000;

      return res.json({
        success: true,
        estimatedMl,
        newTotalMl: Math.min(newTotal, 2000),
        goalReached: reached,
        feedback: parsed.feedback,
        tip: parsed.tip,
      });

    } catch (error: any) {
      console.error("Water verification error: ", error);
      res.status(500).json({ error: error.message || "Failed to analyze water photo." });
    }
  });

  // API 2: Verify No Phone Zone Complete
  app.post("/api/habit/verify-no-phone", async (req, res) => {
    try {
      const { secondsStill, scoreQuality, hasMicAudio, averageVolumeDb } = req.body;

      const durationText = `${Math.floor(secondsStill / 60)} minutes`;

      if (!ai) {
        return res.json({
          success: true,
          feedback: `[Simulation Mode] Excellent stillness! You preserved silence for ${durationText}. The ancient runes of focus glow bright! Your concentration levels are pure.`,
          cheer: "A silent environment allows your elven mana to pool and flourish.",
        });
      }

      const promptString = `The user completed a Phone-Free focus zone for ${durationText} of total stillness. Motion sensors confirmed no device movements. Ambient microphone checks show: mic active (${hasMicAudio}), decibel average: ${averageVolumeDb} dB. Review this focus quality and provide a calming medieval or fantasy RPG styled motivational blessing from a quiet forest sage. Also suggest an aura-strengthening tip.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptString,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              feedback: {
                type: Type.STRING,
                description: "Calming elven/fantasy sage evaluation and motivational blessing.",
              },
              cheer: {
                type: Type.STRING,
                description: "A beautiful elven focus/mana proverb.",
              },
            },
            required: ["feedback", "cheer"],
          },
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({
        success: true,
        feedback: parsed.feedback,
        cheer: parsed.cheer,
      });

    } catch (error: any) {
      console.error("No phone verification error: ", error);
      res.status(500).json({ error: error.message || "Failed to process focus results." });
    }
  });

  // API 3: Verify Study Accomplishments
  app.post("/api/habit/verify-study", async (req, res) => {
    try {
      const { topic, accomplishment, minutesStudied = 45 } = req.body;

      if (!topic || !accomplishment) {
        return res.status(400).json({ error: "Please enter what you studied and what you accomplished." });
      }

      if (!ai) {
        return res.json({
          success: true,
          summary: `[Simulation Mode] Amazing efforts! You successfully studied "${topic}" and accomplished: "${accomplishment}". Keep climbing the mountain of knowledge!`,
          tips: "Organize your study desk in patterns of golden triangles to maximize productivity aura.",
        });
      }

      const promptString = `The student has finished a focused ${minutesStudied}-minute study session.
      Topic of Study: "${topic}"
      Accomplished Tasks: "${accomplishment}"
      You are the Archmage of the Mage Guild Academy. Generate a beautiful, wise summary of their scholarly progress, a productivity tip to reduce future procrastination in a fantasy master style, and a word of radiant magical encouragement.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptString,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: {
                type: Type.STRING,
                description: "Wise fantasy-style Archmage summary analyzing the output and validating the intellectual growth.",
              },
              tips: {
                type: Type.STRING,
                description: "Creative master-level productivity tip to banish procrastination.",
              },
            },
            required: ["summary", "tips"],
          },
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({
        success: true,
        summary: parsed.summary,
        tips: parsed.tips,
      });

    } catch (error: any) {
      console.error("Study session verification error: ", error);
      res.status(500).json({ error: error.message || "Failed to parse study highlights." });
    }
  });

  // API 4: Verify Prestige Sanctuary Challenges
  app.post("/api/habit/verify-prestige", async (req, res) => {
    try {
      const { challengeId, challengeTitle, proofText, image } = req.body;

      if (!challengeId || !proofText) {
        return res.status(400).json({ error: "Please enter your written proof of completion." });
      }

      if (!ai) {
        // Fallback simulation mode
        const approved = proofText.trim().length > 15;
        const feedback = approved
          ? `[Simulation Mode] The Archmage of the Mage Guild has inspected your sacred testament for the "${challengeTitle}" challenge. Your written chronicle, of some ${proofText.trim().length} runes, shows extreme sylvan diligence and absolute integrity! The crystal shards and XP have been certified.`
          : `[Simulation Mode] The Archmage frowned. Your written testament is too short or lacking in magical essence. Speak more descriptively of thy journey to convince the Sages.`;

        return res.json({
          success: true,
          approved,
          feedback,
          criticism: approved ? "" : "Thy written text is too brief to substantiate a Grand Prestige Challenge. Expand thy scroll of deeds!"
        });
      }

      const promptString = `The user is presenting their petition to verify a Prestige Sanctuary Challenge.
      Challenge ID: "${challengeId}"
      Challenge Title: "${challengeTitle}"
      User's Written Testament: "${proofText}"
      
      Requirements to verify:
      1. For "epic-hydrate" (Prestige Hydration): They swear oath to drink 3L of cold elven elixir (water). They must state how many bottles/glasses they drank or how they achieved 3 Liters.
      2. For "epic-offline" (Abyss of Peace Focus): They pass focus challenge for 2 continuous hours. They must describe how they maintained stillness/silence offline without any phone, what they chose to read, write, or practice.

      Evaluate their written description (and optional photo if attached) carefully. Determine whether their testament is realistic, robust, and authentic (not blank, random gibberish, letters or simple shortcuts like 'done' or 'good').
      Generate a fantasy RPG/medieval style encouraging response from the High Sages of the Sylvan Sanctuary.
      If approved is false, write a constructive, mystic criticism guiding them on how to enrich their petition.`;

      const contents: any[] = [];
      if (image) {
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        contents.push({
          inlineData: {
            data: base64Data,
            mimeType: "image/png"
          }
        });
      }
      contents.push({ text: promptString });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              approved: {
                type: Type.BOOLEAN,
                description: "True if the proof is realistic and meets the challenge requirements; false if too vague, blank, or nonsense.",
              },
              feedback: {
                type: Type.STRING,
                description: "Fantasy / RPG persona speech from the High Sages evaluating and blessing their accomplishment.",
              },
              criticism: {
                type: Type.STRING,
                description: "If approved is false, mystically explain what other deeds or details they must provide.",
              },
            },
            required: ["approved", "feedback", "criticism"],
          },
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({
        success: true,
        approved: parsed.approved ?? true,
        feedback: parsed.feedback || "Your trial is blessed.",
        criticism: parsed.criticism || "",
      });

    } catch (error: any) {
      console.error("Prestige verification error: ", error);
      res.status(500).json({ error: error.message || "Failed to analyze prestige challenge." });
    }
  });

  // API Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", aiEnabled: !!ai });
  });

  // Vite Integration for development / static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[HabitBloom Server] running on http://localhost:${PORT}`);
  });
}

startServer();
