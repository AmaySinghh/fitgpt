import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getSavedPlans } from "@/actions/planner";
import { getProfile } from "@/actions/profile";
import { checkUsageLimit } from "@/lib/usage";
import MealPlannerClient from "@/components/shared/MealPlannerClient";

export default async function PlannerPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const [profile, savedPlans, usage] = await Promise.all([
    getProfile(),
    getSavedPlans(),
    checkUsageLimit(session.user.id, "MEAL_PLAN"),
  ]);

  return (
    <div className="min-h-screen bg-black px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Meal Planner</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Generate a personalized meal plan based on your profile and goals
          </p>
        </div>

        <MealPlannerClient
          hasProfile={!!profile}
          savedPlans={savedPlans}
          usage={usage}
        />
      </div>
    </div>
  );
}
