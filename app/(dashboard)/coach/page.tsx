import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getChatHistory } from "@/actions/coach";
import { checkUsageLimit } from "@/lib/usage";
import CoachChat from "@/components/shared/CoachChat";

export default async function CoachPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const [history, usage] = await Promise.all([
    getChatHistory(),
    checkUsageLimit(session.user.id, "CHAT"),
  ]);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="max-w-3xl mx-auto w-full px-4 py-8 flex flex-col flex-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">AI Nutrition Coach</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Ask anything about nutrition, fitness, or your goals
          </p>
        </div>
        <CoachChat initialHistory={history} usage={usage} />
      </div>
    </div>
  );
}
