import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getSavedWorkoutPlans } from "@/actions/workout";
import { getProfile } from "@/actions/profile";
import WorkoutClient from "@/components/shared/WorkoutClient";

export default async function WorkoutPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const [profile, savedPlans] = await Promise.all([
    getProfile(),
    getSavedWorkoutPlans(),
  ]);

  return (
    <div className="min-h-screen bg-black px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Workout Planner</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Generate a personalized weekly workout plan based on your goals
          </p>
        </div>
        <WorkoutClient hasProfile={!!profile} savedPlans={savedPlans} />
      </div>
    </div>
  );
}
