import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function generateMealPlan(profile: {
  age: number;
  weight: number;
  height: number;
  gender: string;
  goal: string;
  activityLevel: string;
  dailyCalories: number;
}) {
  const goalMap: Record<string, string> = {
    LOSE_WEIGHT: "lose weight",
    GAIN_MUSCLE: "gain muscle",
    MAINTAIN: "maintain current weight",
    IMPROVE_FITNESS: "improve overall fitness",
  };

  const activityMap: Record<string, string> = {
    SEDENTARY: "sedentary (little or no exercise)",
    LIGHTLY_ACTIVE: "lightly active (exercise 1-3 days/week)",
    MODERATELY_ACTIVE: "moderately active (exercise 3-5 days/week)",
    VERY_ACTIVE: "very active (exercise 6-7 days/week)",
    EXTREMELY_ACTIVE: "extremely active (very hard exercise, physical job)",
  };

  const prompt = `You are a professional nutritionist. Generate a personalized one-day meal plan for the following person:

Age: ${profile.age}
Weight: ${profile.weight}kg
Height: ${profile.height}cm
Gender: ${profile.gender}
Goal: ${goalMap[profile.goal] || profile.goal}
Activity level: ${activityMap[profile.activityLevel] || profile.activityLevel}
Daily calorie target: ${profile.dailyCalories} kcal

Generate exactly 4 meals: breakfast, lunch, dinner, and a snack.
The total calories must be close to ${profile.dailyCalories} kcal.

Respond ONLY with a valid JSON object. No markdown, no explanation, no code blocks. Just raw JSON.

The JSON must follow this exact structure:
{
  "title": "Personalized Meal Plan",
  "meals": [
    {
      "type": "Breakfast",
      "name": "meal name here",
      "description": "brief description",
      "calories": 500,
      "protein": 30,
      "carbs": 60,
      "fat": 15
    },
    {
      "type": "Lunch",
      "name": "meal name here",
      "description": "brief description",
      "calories": 700,
      "protein": 40,
      "carbs": 80,
      "fat": 20
    },
    {
      "type": "Dinner",
      "name": "meal name here",
      "description": "brief description",
      "calories": 600,
      "protein": 35,
      "carbs": 70,
      "fat": 18
    },
    {
      "type": "Snack",
      "name": "meal name here",
      "description": "brief description",
      "calories": 200,
      "protein": 10,
      "carbs": 25,
      "fat": 8
    }
  ],
  "totalCalories": 2000,
  "totalProtein": 115,
  "totalCarbs": 235,
  "totalFat": 61
}`;

  const result = await geminiModel.generateContent(prompt);
  const text = result.response.text();
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

export async function analyzeFoodImage(imageBase64: string, mimeType: string) {
  const prompt = `You are a professional nutritionist and food recognition expert. Analyze this food image and estimate its nutritional content.

Respond ONLY with a valid JSON object. No markdown, no explanation, no code blocks. Just raw JSON.

The JSON must follow this exact structure:
{
  "name": "food name here",
  "description": "brief description of what you see",
  "calories": 450,
  "protein": 25,
  "carbs": 50,
  "fat": 15,
  "confidence": "high"
}

The confidence field should be "high", "medium", or "low" based on how clearly you can identify the food.
Provide realistic nutritional estimates for a typical serving size of what you see in the image.`;

  const result = await geminiModel.generateContent([
    {
      inlineData: {
        data: imageBase64,
        mimeType: mimeType,
      },
    },
    prompt,
  ]);

  const text = result.response.text();
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

export async function generateWorkoutPlan(profile: {
  age: number;
  weight: number;
  height: number;
  gender: string;
  goal: string;
  activityLevel: string;
}) {
  const goalMap: Record<string, string> = {
    LOSE_WEIGHT: "lose weight and burn fat",
    GAIN_MUSCLE: "build muscle and strength",
    MAINTAIN: "maintain fitness and stay active",
    IMPROVE_FITNESS: "improve overall fitness and endurance",
  };

  const activityMap: Record<string, string> = {
    SEDENTARY: "beginner (little or no exercise)",
    LIGHTLY_ACTIVE: "beginner to intermediate (exercise 1-3 days/week)",
    MODERATELY_ACTIVE: "intermediate (exercise 3-5 days/week)",
    VERY_ACTIVE: "advanced (exercise 6-7 days/week)",
    EXTREMELY_ACTIVE: "elite (very hard exercise daily)",
  };

  const prompt = `You are a certified personal trainer. Generate a personalized weekly workout plan for the following person:

Age: ${profile.age}
Weight: ${profile.weight}kg
Height: ${profile.height}cm
Gender: ${profile.gender}
Goal: ${goalMap[profile.goal] || profile.goal}
Fitness level: ${activityMap[profile.activityLevel] || profile.activityLevel}

Generate a 5-day workout plan (Monday to Friday, rest on weekends).

Respond ONLY with a valid JSON object. No markdown, no explanation, no code blocks. Just raw JSON.

The JSON must follow this exact structure:
{
  "title": "Weekly Workout Plan",
  "goal": "goal description here",
  "days": [
    {
      "day": "Monday",
      "focus": "Upper Body",
      "duration": 45,
      "exercises": [
        {
          "name": "Push-ups",
          "sets": 3,
          "reps": "12-15",
          "rest": "60 seconds",
          "notes": "Keep core tight"
        }
      ]
    }
  ]
}`;

  const result = await geminiModel.generateContent(prompt);
  const text = result.response.text();
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

export async function chatWithCoach(
  messages: { role: string; content: string }[],
  userProfile: {
    age: number;
    weight: number;
    height: number;
    goal: string;
    dailyCalories: number;
  } | null,
) {
  const systemContext = userProfile
    ? `You are FitGPT, an expert AI nutrition and fitness coach. You are helping a user with the following profile:
- Age: ${userProfile.age}
- Weight: ${userProfile.weight}kg  
- Height: ${userProfile.height}cm
- Goal: ${userProfile.goal}
- Daily calorie target: ${userProfile.dailyCalories} kcal

Provide personalized, evidence-based advice. Be encouraging, specific, and practical.`
    : `You are FitGPT, an expert AI nutrition and fitness coach. Provide evidence-based nutrition and fitness advice. Be encouraging, specific, and practical.`;

  const chat = geminiModel.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: systemContext }],
      },
      {
        role: "model",
        parts: [
          {
            text: "I understand. I'm ready to provide personalized nutrition and fitness coaching.",
          },
        ],
      },
      ...messages.slice(0, -1).map((msg) => ({
        role: msg.role === "USER" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
    ],
  });

  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessage(lastMessage.content);
  return result.response.text();
}
