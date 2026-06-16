import { Zap } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-emerald-500 rounded-md flex items-center justify-center">
            <Zap className="w-3 h-3 text-black" fill="black" />
          </div>
          <span className="text-white font-semibold">FitGPT</span>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/login"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Sign in
          </Link>
        </div>

        <p className="text-sm text-zinc-500">
          © 2025 FitGPT. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
