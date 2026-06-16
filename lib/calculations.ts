import { ActivityLevel, Gender } from "@prisma/client";

export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
}

export function calculateBMR(
  weight: number,
  height: number,
  age: number,
  gender: Gender,
): number {
  if (gender === "MALE") {
    return parseFloat((10 * weight + 6.25 * height - 5 * age + 5).toFixed(0));
  } else {
    return parseFloat((10 * weight + 6.25 * height - 5 * age - 161).toFixed(0));
  }
}

export function calculateDailyCalories(
  bmr: number,
  activityLevel: ActivityLevel,
): number {
  const multipliers: Record<ActivityLevel, number> = {
    SEDENTARY: 1.2,
    LIGHTLY_ACTIVE: 1.375,
    MODERATELY_ACTIVE: 1.55,
    VERY_ACTIVE: 1.725,
    EXTREMELY_ACTIVE: 1.9,
  };
  return Math.round(bmr * multipliers[activityLevel]);
}
