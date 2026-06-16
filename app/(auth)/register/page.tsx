"use client";

import { useState } from "react";
import Link from "next/link";
import { register } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap } from "lucide-react";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const result = await register(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-black" fill="black" />
          </div>
          <span className="text-white font-semibold text-lg">FitGPT</span>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-white mb-1">
              Create an account
            </h1>
            <p className="text-sm text-zinc-400">
              Start your fitness journey with FitGPT
            </p>
          </div>

          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-zinc-300 text-sm">
                Full name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                className="bg-zinc-800 border-white/10 text-white placeholder:text-zinc-500 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-zinc-300 text-sm">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="bg-zinc-800 border-white/10 text-white placeholder:text-zinc-500 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-zinc-300 text-sm">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="bg-zinc-800 border-white/10 text-white placeholder:text-zinc-500 focus:border-emerald-500"
              />
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold h-10"
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <p className="text-center text-sm text-zinc-400 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-emerald-400 hover:text-emerald-300"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
