"use client";

import { useState } from "react";
import { logMeal } from "@/actions/meals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

export default function MealLogger() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await logMeal(formData);
    if (result?.error) {
      setError(result.error);
    } else {
      setOpen(false);
    }
    setLoading(false);
  }

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
            <Plus className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-sm">Log a meal</span>
        </button>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Log a meal</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-zinc-300 text-sm">
                Meal name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. Chicken rice bowl"
                required
                className="bg-zinc-800 border-white/10 text-white placeholder:text-zinc-500 focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="calories" className="text-zinc-300 text-sm">
                  Calories
                </Label>
                <Input
                  id="calories"
                  name="calories"
                  type="number"
                  placeholder="450"
                  required
                  className="bg-zinc-800 border-white/10 text-white placeholder:text-zinc-500 focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="protein" className="text-zinc-300 text-sm">
                  Protein (g)
                </Label>
                <Input
                  id="protein"
                  name="protein"
                  type="number"
                  placeholder="30"
                  className="bg-zinc-800 border-white/10 text-white placeholder:text-zinc-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="carbs" className="text-zinc-300 text-sm">
                  Carbs (g)
                </Label>
                <Input
                  id="carbs"
                  name="carbs"
                  type="number"
                  placeholder="50"
                  className="bg-zinc-800 border-white/10 text-white placeholder:text-zinc-500 focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="fat" className="text-zinc-300 text-sm">
                  Fat (g)
                </Label>
                <Input
                  id="fat"
                  name="fat"
                  type="number"
                  placeholder="15"
                  className="bg-zinc-800 border-white/10 text-white placeholder:text-zinc-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
              >
                {loading ? "Saving..." : "Log meal"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
