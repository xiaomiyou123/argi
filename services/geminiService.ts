import { GoogleGenAI, Chat, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';
import { CropData, AIReport } from '../types';

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

// Initialize the API client
const initGemini = () => {
  if (process.env.API_KEY) {
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
};

export const startChat = async () => {
  if (!genAI) initGemini();
  
  if (!genAI) {
    console.warn("Agri-OS: No API Key found, running in SIMULATION mode.");
    return;
  }

  try {
    chatSession = genAI.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

  } catch (error) {
    console.error("Failed to initialize chat:", error);
  }
};

export const sendMessageToCeres = async (message: string, context?: CropData | null): Promise<string> => {
  // 1. Fallback Simulation Mode
  if (!genAI || !chatSession) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return "I'm running in simulation mode. Connect a valid API Key to get real AI insights.";
  }

  // 2. Real API Call
  try {
    let fullPrompt = message;
    if (context) {
      fullPrompt = `[Context: ${context.name}, Health: ${context.health}%, Stage: ${context.growthStages[context.currentStageIndex].name}] ${message}`;
    }

    const result = await chatSession.sendMessage({ message: fullPrompt });
    return result.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection error. Please try again.";
  }
};

export const generateCropReport = async (crop: CropData, lang: string): Promise<AIReport | null> => {
    if (!genAI) initGemini();
    if (!genAI) return null; // Simulation fallback handled in UI

    try {
        const prompt = `Analyze this ${crop.name} (${crop.variety}). 
        Current Stage: ${crop.growthStages[crop.currentStageIndex].name}.
        Health: ${crop.health}%. 
        Moisture: ${crop.moisture}%. 
        Nutrients: N${crop.npk.n}-P${crop.npk.p}-K${crop.npk.k}.
        Environment: pH ${crop.environment.ph}, Sunlight ${crop.environment.sunlight} DLI, Pest Risk ${crop.pestRisk.level}.
        
        Provide a JSON report in ${lang === 'en' ? 'English' : 'Chinese'}.`;

        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        statusCheck: { type: Type.STRING, description: "Brief summary of current health status" },
                        yieldForecast: { type: Type.STRING, description: "Prediction for harvest quantity/quality" },
                        riskAssessment: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 2-3 potential risks" },
                        actionItems: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 2-3 recommended actions" }
                    },
                    required: ["statusCheck", "yieldForecast", "riskAssessment", "actionItems"]
                }
            }
        });

        if (response.text) {
            return JSON.parse(response.text) as AIReport;
        }
        return null;

    } catch (e) {
        console.error("Report Generation Failed", e);
        return null;
    }
}