import { getTodaysWater } from "@/actions/water";
import { getProfile } from "@/actions/profile";
import WaterTracker from "@/components/shared/WaterTracker";

export default async function WaterPage() {
  const [logs, profile] = await Promise.all([getTodaysWater(), getProfile()]);

  const total = logs.reduce((sum, log) => sum + log.amount, 0);
  const target = profile ? Math.round(profile.weight * 33) : 2000;

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Water Tracker</h1>
        <WaterTracker total={total} target={target} logs={logs} />
      </div>
    </div>
  );
}
