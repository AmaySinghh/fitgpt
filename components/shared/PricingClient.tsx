"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  isPremium: boolean;
  userEmail: string;
}

const freeFeatures = [
  "3 AI meal plans per month",
  "5 food scans per month",
  "10 AI coach messages per month",
  "3 workout plans per month",
  "Basic calorie tracking",
  "Water intake tracker",
];

const premiumFeatures = [
  "Unlimited AI meal plans",
  "Unlimited food scans",
  "Unlimited AI coach messages",
  "Unlimited workout plans",
  "Advanced nutrition analytics",
  "Weekly progress reports",
  "Priority AI responses",
];

export default function PricingClient({ isPremium, userEmail }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSimulatePayment() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/payments/simulate", {
        method: "POST",
      });

      const data = await res.json();

      if (data.success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError("Payment simulation failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  if (isPremium) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
          <Crown className="w-7 h-7 text-emerald-400" />
        </div>
        <h2 className="text-white font-bold text-xl mb-2">
          You&apos;re on Premium
        </h2>
        <p className="text-zinc-400 text-sm">
          You have unlimited access to all FitGPT features.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
        <div className="mb-6">
          <h3 className="text-white font-semibold text-lg mb-1">Free</h3>
          <p className="text-zinc-400 text-sm mb-4">Your current plan</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-white">₹0</span>
            <span className="text-zinc-400 text-sm">/forever</span>
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          {freeFeatures.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <Check className="w-4 h-4 text-zinc-500 shrink-0" />
              <span className="text-zinc-400 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          disabled
          className="w-full bg-white/5 text-zinc-500 cursor-not-allowed border border-white/10"
        >
          Current plan
        </Button>
      </div>

      <div className="relative bg-emerald-500/5 border border-emerald-500/50 rounded-2xl p-6">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Zap className="w-3 h-3" fill="black" />
            RECOMMENDED
          </span>
        </div>

        <div className="mb-6">
          <h3 className="text-white font-semibold text-lg mb-1">Premium</h3>
          <p className="text-zinc-400 text-sm mb-4">Unlimited everything</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-white">₹499</span>
            <span className="text-zinc-400 text-sm">/month</span>
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          {premiumFeatures.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-zinc-300 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {error && (
          <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <Button
          onClick={handleSimulatePayment}
          disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold h-11"
        >
          {loading ? "Processing..." : "Upgrade to Premium"}
        </Button>

        <p className="text-center text-xs text-zinc-500 mt-3">
          Test mode · No payment required
        </p>
      </div>
    </div>
  );
}
