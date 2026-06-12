import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI securely server-side
  let ai: GoogleGenAI | null = null;
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI:", err);
  }

  // API: Health probe
  app.get("/api/health", (req, res) => {
    res.json({ status: "alive", geminiConfigured: !!ai });
  });

  // API: AI Nightmare Generator
  app.post("/api/generate-nightmare", async (req, res) => {
    const { idea } = req.body;
    if (!idea || typeof idea !== "string") {
      return res.status(400).json({ error: "გთხოვთ მიუთითოთ კოშმარის იდეა / Please provide a nightmare idea" });
    }

    if (!ai) {
      // Return a backup joke nightmare if Gemini API key isn't active
      return res.json({
        name: `მძინარე კოშმარი: ${idea}`,
        origin: "შეცდომა სერვერზე: Gemini API არ არის აქტიური, მაგრამ კოშმარი მაინც დაიბადა ოფისის ყავის აპარატის ნარჩენებისგან.",
        stats: {
          fearLevel: 30,
          reliability: 95,
          voiceScore: 45,
          disappearanceChance: 90
        },
        abilities: ["ყოველთვის დაგვიანება", "ყავის სუნი", "დოკუმენტების აბურდვა"],
        weakness: "ორშაბათი დილა და ძლიერი ესპრესო",
        funnySlogan: "„გემინიმ ვერ მიპასუხა, მაგრამ მე მაინც აქ ვარ!“"
      });
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `ჩაატარე კრეატიული გენერაცია. დააგენერირე სასაცილო და საინტერესო კოშმარი/მონსტრი (პაროდიული სტილით) შემდეგი იდეის საფუძველზე: "${idea}". 
პასუხი უნდა იყოს ექსკლუზიურად ქართულ ენაზე. 
 origin: უნდა იყოს სასაცილო, საინტერესო მოკლე ისტორია.
 stats (სიძლიერეები):
   fearLevel: შიშის დონე (0-100)
   reliability: საიმედოობა (0-100)
   voiceScore: საშინელი ხმის ტემბრი (0-100)
   disappearanceChance: საიდუმლო გაუჩინარების შანსი (0-100)
 abilities: 3 სასაცილო და არა-ძალადობრივი უნარი (მაგ. მაცივრის ჩუმად გაღება, წინდების გაქრობა).
 weakness: სასაცილო სისუსტე (მაგ. მწიფე ატამი, კატის ხავილი).
 funnySlogan: მოკლე, ეპიკური და პაროდიული სლოგანი.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "კოშმარის/არსების სახელი ქართულად" },
              origin: { type: Type.STRING, description: "მონსტრის წარმოშობის ისტორია ქართულად (სასაცილო)" },
              stats: {
                type: Type.OBJECT,
                properties: {
                  fearLevel: { type: Type.INTEGER, description: "შიშის დონე 0-დან 100-მდე" },
                  reliability: { type: Type.INTEGER, description: "საიმედოობა 0-დან 100-მდე" },
                  voiceScore: { type: Type.INTEGER, description: "საშინელი ხმის შეფასება 0-დან 100-მდე" },
                  disappearanceChance: { type: Type.INTEGER, description: "იდუმალი გაქრობის შანსი" }
                },
                required: ["fearLevel", "reliability", "voiceScore", "disappearanceChance"]
              },
              abilities: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3 სასაცილო უნარი ქართულად"
              },
              weakness: { type: Type.STRING, description: "მისი სასაცილო სისუსტე ქართულად" },
              funnySlogan: { type: Type.STRING, description: "კოშმარის სასაცილო სარეკლამო სლოგანი" }
            },
            required: ["name", "origin", "stats", "abilities", "weakness", "funnySlogan"]
          }
        }
      });

      const textOutput = response.text;
      if (!textOutput) {
        throw new Error("Empty response from Gemini API");
      }
      const data = JSON.parse(textOutput);
      res.json(data);
    } catch (err: any) {
      console.error("Gemini Generation Error:", err);
      // Fallback response with the idea
      res.json({
        name: `იდუმალი ${idea}`,
        origin: `კოშმარული არსება, რომელიც დაიბადა ქართულ სივრცეში იდეიდან „${idea}“, თუმცა მისი ბიოგრაფია იმდენად დაცულია, რომ Gemini-ს სერვერები გადაიწვა.`,
        stats: {
          fearLevel: 88,
          reliability: 50,
          voiceScore: 75,
          disappearanceChance: 99
        },
        abilities: ["მოულოდნელად გამოჩენა", "ყურებში ჩურჩული", "WiFi სიგნალის ჩახშობა"],
        weakness: "ქართული სუფრა და თბილი ხაჭაპური",
        funnySlogan: "„ჩემს შესახებ ინფორმაცია გასაიდუმლოებულია, მაგრამ მე მაინც გითვალთვალებ!“"
      });
    }
  });

  // Vite Integration
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
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();
