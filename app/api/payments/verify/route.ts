import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    } = await req.json();

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 },
      );
    }

    await db.subscription.upsert({
      where: { userId: session.user.id },
      update: {
        plan: "PREMIUM",
        status: "ACTIVE",
        razorpaySubscriptionId: razorpay_subscription_id,
      },
      create: {
        userId: session.user.id,
        plan: "PREMIUM",
        status: "ACTIVE",
        razorpaySubscriptionId: razorpay_subscription_id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 },
    );
  }
}
