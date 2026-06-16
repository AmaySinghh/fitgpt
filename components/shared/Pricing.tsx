import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "3 AI meal plans per month",
      "5 food scans per month",
      "10 AI coach messages per month",
      "3 workout plans per month",
      "Basic calorie tracking",
      "BMR & BMI calculator",
      "Water intake tracker",
    ],
    cta: "Get started free",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "₹499",
    period: "per month",
    description: "For serious fitness enthusiasts",
    features: [
      "Unlimited AI meal plans",
      "Unlimited food scans",
      "Unlimited AI coach messages",
      "Unlimited workout plans",
      "Advanced nutrition analytics",
      "Weekly progress reports",
      "Priority AI responses",
    ],
    cta: "Start Premium",
    href: "/register?plan=premium",
    highlighted: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6 border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Simple, transparent
            <br />
            <span className="text-emerald-400">pricing</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Start free. Upgrade when you need more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                plan.highlighted
                  ? "border-emerald-500/50 bg-emerald-500/5"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-white font-semibold text-lg mb-1">
                  {plan.name}
                </h3>
                <p className="text-zinc-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-zinc-400 text-sm">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-zinc-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full font-semibold ${
                  plan.highlighted
                    ? "bg-emerald-500 hover:bg-emerald-400 text-black"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                }`}
                asChild
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
