"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function logMeal(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const name = formData.get("name") as string;
  const calories = parseInt(formData.get("calories") as string);
  const protein = parseFloat(formData.get("protein") as string);
  const carbs = parseFloat(formData.get("carbs") as string);
  const fat = parseFloat(formData.get("fat") as string);

  if (!name || !calories) {
    return { error: "Name and calories are required" };
  }

  await db.mealLog.create({
    data: {
      userId: session.user.id,
      name,
      calories,
      protein: protein || 0,
      carbs: carbs || 0,
      fat: fat || 0,
      source: "MANUAL",
    },
  });

  revalidatePath("/meals");
  return { success: true };
}

export async function deleteMeal(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  await db.mealLog.delete({
    where: {
      id,
      userId: session.user.id,
    },
  });

  revalidatePath("/meals");
}

export async function getTodaysMeals() {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return await db.mealLog.findMany({
    where: {
      userId: session.user.id,
      loggedAt: {
        gte: start,
        lte: end,
      },
    },
    orderBy: { loggedAt: "desc" },
  });
}

export async function getWeeklyMeals() {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return await db.mealLog.findMany({
    where: {
      userId: session.user.id,
      loggedAt: { gte: sevenDaysAgo },
    },
    orderBy: { loggedAt: "desc" },
  });
}
