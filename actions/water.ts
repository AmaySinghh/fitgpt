"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function logWater(amountMl: number) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  await db.waterLog.create({
    data: {
      userId: session.user.id,
      amount: amountMl,
    },
  });

  revalidatePath("/water");
  return { success: true };
}

export async function deleteWaterLog(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const waterLog = await db.waterLog.findUnique({
    where: { id },
  });

  if (!waterLog || waterLog.userId !== session.user.id) {
    return { error: "Unauthorized" };
  }

  await db.waterLog.delete({
    where: { id },
  });

  revalidatePath("/water");
  return { success: true };
}

export async function getTodaysWater() {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return await db.waterLog.findMany({
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

export async function getTodaysWaterTotal() {
  const logs = await getTodaysWater();
  return logs.reduce((total, log) => total + log.amount, 0);
}
