import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-black" fill="black" />
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">
            FitGPT
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            How it works
          </Link>
          <Link
            href="#pricing"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Pricing
          </Link>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Sign in
          </Link>
          <Button
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
            asChild
          >
            <Link href="/register">Get started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
