import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === "subscription.activated") {
      const subscription = event.payload.subscription.entity;
      const razorpaySubscriptionId = subscription.id;
      const customerEmail = event.payload.subscription.entity.notes?.email;

      if (customerEmail) {
        const user = await db.user.findUnique({
          where: { email: customerEmail },
        });

        if (user) {
          await db.subscription.upsert({
            where: { userId: user.id },
            update: {
              plan: "PREMIUM",
              status: "ACTIVE",
              razorpaySubscriptionId,
              currentPeriodEnd: new Date(subscription.current_end * 1000),
            },
            create: {
              userId: user.id,
              plan: "PREMIUM",
              status: "ACTIVE",
              razorpaySubscriptionId,
              currentPeriodEnd: new Date(subscription.current_end * 1000),
            },
          });
        }
      }
    }

    if (event.event === "subscription.cancelled") {
      const razorpaySubscriptionId = event.payload.subscription.entity.id;

      await db.subscription.updateMany({
        where: { razorpaySubscriptionId },
        data: {
          plan: "FREE",
          status: "CANCELLED",
        },
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
