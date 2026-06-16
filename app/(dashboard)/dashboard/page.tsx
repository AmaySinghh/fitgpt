import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { logout } from "@/actions/auth";
import { getTodaysMeals } from "@/actions/meals";
import { getProfile } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Utensils,
  Camera,
  Brain,
  MessageCircle,
  User,
  ArrowRight,
} from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const [meals, profile] = await Promise.all([getTodaysMeals(), getProfile()]);

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const dailyTarget = profile?.dailyCalories ?? 2000;
  const remaining = dailyTarget - totalCalories;
  const percentage = Math.min(
    Math.round((totalCalories / dailyTarget) * 100),
    100,
  );

  const quickActions = [
    {
      icon: Utensils,
      label: "Log meal",
      href: "/meals",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      icon: Camera,
      label: "Scan food",
      href: "/scanner",
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      icon: Brain,
      label: "Meal plan",
      href: "/planner",
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
    },
    {
      icon: MessageCircle,
      label: "AI coach",
      href: "/coach",
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-black px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Good{" "}
              {new Date().getHours() < 12
                ? "morning"
                : new Date().getHours() < 17
                  ? "afternoon"
                  : "evening"}
              , {session.user?.name?.split(" ")[0]}
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Here&apos;s your nutrition overview for today
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/profile">
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </Link>
            <form action={logout}>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                Sign out
              </Button>
            </form>
          </div>
        </div>

        {/* Calorie Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
            <p className="text-zinc-400 text-sm mb-1">Calories consumed</p>
            <p className="text-3xl font-bold text-white">{totalCalories}</p>
            <p className="text-zinc-500 text-xs mt-1">kcal today</p>
          </div>
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
            <p className="text-zinc-400 text-sm mb-1">Remaining</p>
            <p
              className={`text-3xl font-bold ${
                remaining < 0 ? "text-red-400" : "text-emerald-400"
              }`}
            >
              {Math.abs(remaining)}
            </p>
            <p className="text-zinc-500 text-xs mt-1">
              {remaining < 0 ? "kcal over target" : "kcal left"}
            </p>
          </div>
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
            <p className="text-zinc-400 text-sm mb-1">Daily target</p>
            <p className="text-3xl font-bold text-white">{dailyTarget}</p>
            <p className="text-zinc-500 text-xs mt-1">{percentage}% complete</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-zinc-400">Daily progress</span>
            <span className="text-sm text-white font-medium">
              {totalCalories} / {dailyTarget} kcal
            </span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-500"
              style={{
                width: `${percentage}%`,
                backgroundColor:
                  percentage >= 100
                    ? "#ef4444"
                    : percentage >= 80
                      ? "#f59e0b"
                      : "#10b981",
              }}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-white font-semibold mb-3">Quick actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="bg-zinc-900 border border-white/10 rounded-xl p-4 hover:border-white/20 hover:bg-zinc-800 transition-all group"
              >
                <div
                  className={`w-10 h-10 rounded-lg border flex items-center justify-center mb-3 ${action.bg}`}
                >
                  <action.icon className={`w-5 h-5 ${action.color}`} />
                </div>
                <p className="text-white text-sm font-medium">{action.label}</p>
                <ArrowRight className="w-3 h-3 text-zinc-500 mt-1 group-hover:text-white transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent meals */}
        {meals.length > 0 && (
          <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-white font-semibold">Recent meals</h2>
              <Link
                href="/meals"
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                View all
              </Link>
            </div>
            <div className="divide-y divide-white/5">
              {meals.slice(0, 3).map((meal) => (
                <div
                  key={meal.id}
                  className="flex items-center justify-between px-6 py-3"
                >
                  <p className="text-sm text-zinc-300">{meal.name}</p>
                  <span className="text-sm text-white font-medium">
                    {meal.calories} kcal
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!profile && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-emerald-400 font-medium text-sm">
                Complete your profile
              </p>
              <p className="text-zinc-400 text-xs mt-1">
                Set your goals to get a personalized calorie target
              </p>
            </div>
            <Link href="/profile">
              <Button
                size="sm"
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
              >
                Set up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
