import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTodaysWater } from "@/actions/water";
import { getProfile } from "@/actions/profile";
import WaterTracker from "@/components/shared/WaterTracker";

export default async function WaterPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const [{ total, logs }, profile] = await Promise.all([
    getTodaysWater(),
    getProfile(),
  ]);

  const target = profile ? Math.round(profile.weight * 0.033 * 1000) : 2500;

  return (
    <div className="min-h-screen bg-black px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Water Tracker</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Stay hydrated throughout the day
          </p>
        </div>
        <WaterTracker total={total} target={target} logs={logs} />
      </div>
    </div>
  );
}
