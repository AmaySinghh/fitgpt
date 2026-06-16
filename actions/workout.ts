"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { generateWorkoutPlan } from "@/lib/gemini";
import { revalidatePath } from "next/cache";

export async function generatePlan() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const profile = await db.profile.findUnique({ where: { userId } });

  if (!profile) {
    return {
      error: "Please complete your profile before generating a workout plan.",
    };
  }

  const plan = await generateWorkoutPlan({
    age: profile.age,
    weight: profile.weight,
    height: profile.height,
    gender: profile.gender,
    goal: profile.goal,
    activityLevel: profile.activityLevel,
  });

  await db.workoutPlan.create({
    data: {
      userId,
      title: plan.title,
      goal: plan.goal,
      days: plan.days,
    },
  });

  revalidatePath("/workout");
  return { success: true, plan };
}

export async function getSavedWorkoutPlans() {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  return await db.workoutPlan.findMany({
    where: { userId: session.user.id },
    orderBy: { generatedAt: "desc" },
    take: 3,
  });
}
