"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function logWater(amount: number) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  await db.waterLog.create({
    data: {
      userId: session.user.id,
      amount,
    },
  });

  revalidatePath("/water");
  return { success: true };
}

export async function getTodaysWater() {
  const session = await auth();

  if (!session?.user?.id) {
    return { total: 0, logs: [] };
  }

  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const logs = await db.waterLog.findMany({
    where: {
      userId: session.user.id,
      loggedAt: { gte: start, lte: end },
    },
    orderBy: { loggedAt: "desc" },
  });

  const total = logs.reduce((sum, log) => sum + log.amount, 0);

  return { total, logs };
}

export async function deleteWaterLog(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  await db.waterLog.delete({
    where: { id, userId: session.user.id },
  });

  revalidatePath("/water");
}
