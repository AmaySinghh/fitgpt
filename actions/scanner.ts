"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { analyzeFoodImage } from "@/lib/gemini";
import { checkUsageLimit, recordUsage } from "@/lib/usage";
import { revalidatePath } from "next/cache";

export async function scanFood(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const { allowed, used, limit } = await checkUsageLimit(userId, "FOOD_SCAN");

  if (!allowed) {
    return {
      error: `You've used ${used}/${limit} food scans this month. Upgrade to Premium for unlimited scans.`,
    };
  }

  const imageUrl = formData.get("imageUrl") as string;

  if (!imageUrl) {
    return { error: "Please select an image to scan." };
  }

  // Fetch the image from Cloudinary URL and convert to base64
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const mimeType = response.headers.get("content-type") || "image/jpeg";

    const result = await analyzeFoodImage(base64, mimeType);

    await db.mealLog.create({
      data: {
        userId,
        name: result.name,
        calories: result.calories,
        protein: result.protein,
        carbs: result.carbs,
        fat: result.fat,
        imageUrl: imageUrl,
        source: "AI_SCAN",
      },
    });

    await recordUsage(userId, "FOOD_SCAN");
    revalidatePath("/meals");

    return { success: true, result };
  } catch (error) {
    console.error("Scanner error:", error);
    return { error: "Failed to analyze image. Please try again." };
  }
}
