import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTodaysMeals } from "@/actions/meals";
import { getProfile } from "@/actions/profile";
import MealLogger from "@/components/shared/MealLogger";
import MealList from "@/components/shared/MealList";
import CalorieSummary from "@/components/shared/CalorieSummary";

export default async function MealsPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const [meals, profile] = await Promise.all([getTodaysMeals(), getProfile()]);

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);
  const dailyTarget = profile?.dailyCalories ?? 2000;

  return (
    <div className="min-h-screen bg-black px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Calorie Tracker</h1>
          <p className="text-zinc-400 text-sm mt-1">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Calorie Summary */}
        <CalorieSummary
          consumed={totalCalories}
          target={dailyTarget}
          protein={totalProtein}
          carbs={totalCarbs}
          fat={totalFat}
        />

        {/* Log a meal */}
        <MealLogger />

        {/* Today's meals */}
        <MealList meals={meals} />
      </div>
    </div>
  );
}
