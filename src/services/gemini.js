import { GoogleGenAI } from "@google/genai";

const HARDCODED_API_KEY = "AIzaSyAyoe_X9Wo82lfCsPvnrI3iDd2MCH_9YoE";
const ai = new GoogleGenAI({ apiKey: HARDCODED_API_KEY });

export const analyzeMeal = async (mealDescription) => {
  const prompt = `
    Analyze the following meal description: "${mealDescription}".
    Provide a JSON response with the following structure:
    {
      "summary": "Brief summary of the meal",
      "nutrients": {
        "calories": number,
        "protein": "number (grams)",
        "carbs": "number (grams)",
        "fats": "number (grams)",
        "fiber": "number (grams)",
        "vitamins": ["list", "of", "vitamins"],
        "minerals": ["list", "of", "minerals"]
      }
    }
    Return ONLY valid JSON. Do not use Markdown code blocks.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    const text = response.text;
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

// New function: Analyze ALL meals of a day and provide comprehensive recommendations
export const analyzeDailyNutrition = async (allMealsDescriptions) => {
  if (!allMealsDescriptions || allMealsDescriptions.length === 0) {
    return null;
  }

  const mealsText = allMealsDescriptions.map((meal, i) => `Meal ${i + 1}: ${meal}`).join('\n');

  const prompt = `
    A person has eaten the following meals today:
    ${mealsText}

    Analyze their OVERALL daily nutrition based on ALL these meals combined.
    Consider recommended daily allowances for an average adult.
    
    Provide a JSON response with this structure:
    {
      "overallAssessment": "Brief 1-2 sentence assessment of the day's nutrition",
      "deficiencies": [
        {
          "nutrient": "Name of deficient nutrient (e.g., Vitamin C, Protein, Iron)",
          "severity": "low/medium/high",
          "reason": "Why this is lacking based on today's meals"
        }
      ],
      "recommendations": [
        {
          "deficiency": "Nutrient name",
          "suggestion": "What to eat or supplement",
          "jan_aushadhi_product": "Specific product available at Jan Aushadhi Kendra (affordable Indian govt pharmacy)"
        }
      ],
      "adequateNutrients": ["List of nutrients that are adequately covered by today's meals"]
    }
    
    Be specific and realistic. If the meals cover most nutrients, say so.
    Only flag genuine deficiencies based on the actual meals eaten.
    Return ONLY valid JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    const text = response.text;
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Daily Analysis Error:", error);
    throw error;
  }
};

export const generateYogaRoutine = async (ailment) => {
  const prompt = `
    Create a yoga routine for a user suffering from: "${ailment}".
    Provide a JSON response with this structure:
    {
      "routineName": "Name of the routine",
      "duration": "Estimated duration (e.g. 15 mins)",
      "focus": "Main focus area",
      "steps": [
        {
          "pose": "Name of Pose (Sanskrit/English)",
          "duration": "Time to hold",
          "instructions": "Brief instructions",
          "benefits": "Why this helps the ailment"
        }
      ],
      "advice": "General advice for this condition"
    }
    Return ONLY valid JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    const text = response.text;
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Gemini Yoga Error:", error);
    throw error;
  }
};
