import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import PricingClient from "@/components/shared/PricingClient";

export default async function DashboardPricingPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const subscription = await db.subscription.findUnique({
    where: { userId: session.user.id },
  });

  const isPremium = subscription?.plan === "PREMIUM";

  return (
    <div className="min-h-screen bg-black px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Upgrade to Premium</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Unlock unlimited access to all AI features
          </p>
        </div>
        <PricingClient isPremium={isPremium} userEmail={session.user.email!} />
      </div>
    </div>
  );
}
