import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { checkUsageLimit } from "@/lib/usage";
import FoodScanner from "@/components/shared/FoodScanner";

export default async function ScannerPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const usage = await checkUsageLimit(session.user.id, "FOOD_SCAN");

  return (
    <div className="min-h-screen bg-black px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Food Scanner</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Upload a photo of your meal and get instant nutrition estimates
          </p>
        </div>
        <FoodScanner usage={usage} />
      </div>
    </div>
  );
}
