import "server-only";
import { db } from "@/lib/db";

const FREE_LIMITS = {
  MEAL_PLAN: 3,
  FOOD_SCAN: 5,
  CHAT: 10,
  WORKOUT_PLAN: 3,
};

export async function checkUsageLimit(
  userId: string,
  feature: "MEAL_PLAN" | "FOOD_SCAN" | "CHAT" | "WORKOUT_PLAN",
): Promise<{ allowed: boolean; used: number; limit: number }> {
  const subscription = await db.subscription.findUnique({
    where: { userId },
  });

  if (subscription?.plan === "PREMIUM") {
    return { allowed: true, used: 0, limit: Infinity };
  }

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const used = await db.usageLog.count({
    where: {
      userId,
      feature,
      usedAt: { gte: startOfMonth },
    },
  });

  const limit = FREE_LIMITS[feature];

  return {
    allowed: used < limit,
    used,
    limit,
  };
}

export async function recordUsage(
  userId: string,
  feature: "MEAL_PLAN" | "FOOD_SCAN" | "CHAT" | "WORKOUT_PLAN",
) {
  await db.usageLog.create({
    data: { userId, feature },
  });
}
