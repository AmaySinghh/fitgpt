"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { chatWithCoach } from "@/lib/gemini";
import { checkUsageLimit, recordUsage } from "@/lib/usage";
import { revalidatePath } from "next/cache";

export async function sendMessage(content: string) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const { allowed, used, limit } = await checkUsageLimit(userId, "CHAT");

  if (!allowed) {
    return {
      error: `You've used ${used}/${limit} messages this month. Upgrade to Premium for unlimited coaching.`,
    };
  }

  await db.chatMessage.create({
    data: { userId, role: "USER", content },
  });

  const allMessages = await db.chatMessage.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
    take: 20,
  });

  const profile = await db.profile.findUnique({ where: { userId } });

  const response = await chatWithCoach(
    allMessages.map((m) => ({ role: m.role, content: m.content })),
    profile
      ? {
          age: profile.age,
          weight: profile.weight,
          height: profile.height,
          goal: profile.goal,
          dailyCalories: profile.dailyCalories,
        }
      : null,
  );

  await db.chatMessage.create({
    data: { userId, role: "ASSISTANT", content: response },
  });

  await recordUsage(userId, "CHAT");
  revalidatePath("/coach");

  return { success: true, response };
}

export async function getChatHistory() {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  return await db.chatMessage.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
    take: 50,
  });
}

export async function clearChat() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  await db.chatMessage.deleteMany({
    where: { userId: session.user.id },
  });

  revalidatePath("/coach");
}
