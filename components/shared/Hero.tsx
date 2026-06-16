import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.15),transparent)]" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm mb-8">
          <Sparkles className="w-3 h-3" />
          Powered by Gemini AI
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
          Your AI-powered
          <br />
          <span className="text-emerald-400">nutrition coach</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Track calories, generate personalized meal plans, scan food with your
          camera, and chat with an AI coach that actually understands your
          fitness goals.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 h-12 text-base"
            asChild
          >
            <Link href="/register">
              Start for free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 px-8 h-12 text-base bg-transparent"
            asChild
          >
            <Link href="#features">See features</Link>
          </Button>
        </div>

        {/* Social proof */}
        <p className="mt-10 text-sm text-zinc-500">
          No credit card required · Free plan available · Cancel anytime
        </p>
      </div>
    </section>
  );
}
