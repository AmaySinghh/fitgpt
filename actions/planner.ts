"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { generateMealPlan } from "@/lib/gemini";
import { checkUsageLimit, recordUsage } from "@/lib/usage";

export async function generatePlan() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const { allowed, used, limit } = await checkUsageLimit(userId, "MEAL_PLAN");

  if (!allowed) {
    return {
      error: `You've used ${used}/${limit} meal plans this month. Upgrade to Premium for unlimited plans.`,
    };
  }

  const profile = await db.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    return {
      error:
        "Please complete your profile first before generating a meal plan.",
    };
  }

  const plan = await generateMealPlan({
    age: profile.age,
    weight: profile.weight,
    height: profile.height,
    gender: profile.gender,
    goal: profile.goal,
    activityLevel: profile.activityLevel,
    dailyCalories: profile.dailyCalories,
  });

  await db.mealPlan.create({
    data: {
      userId,
      title: plan.title,
      meals: plan.meals,
      totalCals: plan.totalCalories,
      totalProtein: plan.totalProtein,
      totalCarbs: plan.totalCarbs,
      totalFat: plan.totalFat,
    },
  });

  await recordUsage(userId, "MEAL_PLAN");

  return { success: true, plan };
}

export async function getSavedPlans() {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  return await db.mealPlan.findMany({
    where: { userId: session.user.id },
    orderBy: { generatedAt: "desc" },
    take: 5,
  });
}
