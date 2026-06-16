"use client";

import { useState } from "react";
import { generatePlan } from "@/actions/planner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, Utensils, AlertCircle } from "lucide-react";

interface Meal {
  type: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface MealPlan {
  title: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

interface SavedPlan {
  id: string;
  title: string;
  meals: unknown;
  totalCals: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  generatedAt: Date;
}

interface Props {
  hasProfile: boolean;
  savedPlans: SavedPlan[];
  usage: { allowed: boolean; used: number; limit: number };
}

const mealTypeColors: Record<string, string> = {
  Breakfast: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Lunch: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  Dinner: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  Snack: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

function MealCard({ meal }: { meal: Meal }) {
  const colorClass =
    mealTypeColors[meal.type] ||
    "text-zinc-400 bg-zinc-500/10 border-zinc-500/20";

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md border text-xs font-medium mb-2 ${colorClass}`}
          >
            {meal.type}
          </span>
          <h3 className="text-white font-semibold">{meal.name}</h3>
          <p className="text-zinc-400 text-sm mt-1">{meal.description}</p>
        </div>
        <div className="text-right shrink-0 ml-4">
          <p className="text-white font-bold text-lg">{meal.calories}</p>
          <p className="text-zinc-500 text-xs">kcal</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10">
        <div className="text-center">
          <p className="text-blue-400 text-sm font-semibold">{meal.protein}g</p>
          <p className="text-zinc-500 text-xs">Protein</p>
        </div>
        <div className="text-center">
          <p className="text-amber-400 text-sm font-semibold">{meal.carbs}g</p>
          <p className="text-zinc-500 text-xs">Carbs</p>
        </div>
        <div className="text-center">
          <p className="text-rose-400 text-sm font-semibold">{meal.fat}g</p>
          <p className="text-zinc-500 text-xs">Fat</p>
        </div>
      </div>
    </div>
  );
}

export default function MealPlannerClient({
  hasProfile,
  savedPlans,
  usage,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<MealPlan | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);

    const result = await generatePlan();

    if (result?.error) {
      setError(result.error);
    } else if (result?.plan) {
      setCurrentPlan(result.plan);
    }

    setLoading(false);
  }

  if (!hasProfile) {
    return (
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-12 text-center">
        <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-6 h-6 text-zinc-500" />
        </div>
        <p className="text-white font-semibold mb-2">Profile required</p>
        <p className="text-zinc-400 text-sm">
          Please complete your profile before generating a meal plan.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Generate button */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-white font-semibold">Generate meal plan</h2>
              <p className="text-zinc-400 text-xs">
                Powered by Gemini AI · Personalized to your goals
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="border-white/20 text-zinc-400 text-xs"
          >
            {usage.used}/{usage.limit === Infinity ? "∞" : usage.limit} used
          </Badge>
        </div>

        {error && (
          <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <Button
          onClick={handleGenerate}
          disabled={loading || !usage.allowed}
          className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold h-11"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin" />
              Generating your plan...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Generate meal plan
            </span>
          )}
        </Button>
      </div>

      {/* Current plan */}
      {currentPlan && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold">Your meal plan</h2>
            <div className="flex items-center gap-4 text-sm text-zinc-400">
              <span>{currentPlan.totalCalories} kcal</span>
              <span>P: {currentPlan.totalProtein}g</span>
              <span>C: {currentPlan.totalCarbs}g</span>
              <span>F: {currentPlan.totalFat}g</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPlan.meals.map((meal) => (
              <MealCard key={meal.type} meal={meal} />
            ))}
          </div>
        </div>
      )}

      {/* Saved plans */}
      {savedPlans.length > 0 && !currentPlan && (
        <div className="space-y-4">
          <h2 className="text-white font-semibold">Previous plans</h2>
          {savedPlans.map((plan) => {
            const meals = plan.meals as Meal[];
            return (
              <div
                key={plan.id}
                className="bg-zinc-900 border border-white/10 rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-medium">{plan.title}</h3>
                    <p className="text-zinc-400 text-xs mt-0.5">
                      {new Date(plan.generatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">
                      {plan.totalCals} kcal
                    </p>
                    <p className="text-zinc-500 text-xs">total</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {meals.map((meal) => (
                    <div
                      key={meal.type}
                      className="flex items-center justify-between py-2 border-t border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <Utensils className="w-3.5 h-3.5 text-zinc-500" />
                        <div>
                          <p className="text-sm text-zinc-300">{meal.name}</p>
                          <p className="text-xs text-zinc-500">{meal.type}</p>
                        </div>
                      </div>
                      <span className="text-sm text-zinc-400">
                        {meal.calories} kcal
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
