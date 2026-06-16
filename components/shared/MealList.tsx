"use client";

import { deleteMeal } from "@/actions/meals";
import { Trash2, Utensils } from "lucide-react";
import type { MealLog } from "@prisma/client";

interface MealListProps {
  meals: MealLog[];
}

export default function MealList({ meals }: MealListProps) {
  if (meals.length === 0) {
    return (
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-12 text-center">
        <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mx-auto mb-4">
          <Utensils className="w-6 h-6 text-zinc-500" />
        </div>
        <p className="text-zinc-400 text-sm">No meals logged today</p>
        <p className="text-zinc-500 text-xs mt-1">
          Click &quot;Log a meal&quot; above to get started
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-white font-semibold">
          Today&apos;s meals ({meals.length})
        </h2>
      </div>

      <div className="divide-y divide-white/5">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Utensils className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">{meal.name}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-zinc-400">
                    P: {meal.protein.toFixed(0)}g
                  </span>
                  <span className="text-xs text-zinc-400">
                    C: {meal.carbs.toFixed(0)}g
                  </span>
                  <span className="text-xs text-zinc-400">
                    F: {meal.fat.toFixed(0)}g
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-white font-semibold text-sm">
                {meal.calories} kcal
              </span>
              <form
                action={async () => {
                  await deleteMeal(meal.id);
                }}
              >
                <button
                  type="submit"
                  className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
