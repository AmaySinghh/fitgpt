import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db.subscription.upsert({
      where: { userId: session.user.id },
      update: {
        plan: "PREMIUM",
        status: "ACTIVE",
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      create: {
        userId: session.user.id,
        plan: "PREMIUM",
        status: "ACTIVE",
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Simulation error:", error);
    return NextResponse.json({ error: "Simulation failed" }, { status: 500 });
  }
}
