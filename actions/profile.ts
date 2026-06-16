"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  calculateBMI,
  calculateBMR,
  calculateDailyCalories,
} from "@/lib/calculations";
import { Gender, FitnessGoal, ActivityLevel } from "@prisma/client";

export async function saveProfile(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const age = parseInt(formData.get("age") as string);
  const height = parseFloat(formData.get("height") as string);
  const weight = parseFloat(formData.get("weight") as string);
  const gender = formData.get("gender") as Gender;
  const goal = formData.get("goal") as FitnessGoal;
  const activityLevel = formData.get("activityLevel") as ActivityLevel;

  if (!age || !height || !weight || !gender || !goal || !activityLevel) {
    return { error: "All fields are required" };
  }

  const bmi = calculateBMI(weight, height);
  const bmr = calculateBMR(weight, height, age, gender);
  const dailyCalories = calculateDailyCalories(bmr, activityLevel);

  await db.profile.upsert({
    where: { userId: session.user.id },
    update: {
      age,
      height,
      weight,
      gender,
      goal,
      activityLevel,
      bmi,
      bmr,
      dailyCalories,
    },
    create: {
      userId: session.user.id,
      age,
      height,
      weight,
      gender,
      goal,
      activityLevel,
      bmi,
      bmr,
      dailyCalories,
    },
  });

  redirect("/dashboard");
}

export async function getProfile() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  return await db.profile.findUnique({
    where: { userId: session.user.id },
  });
}
