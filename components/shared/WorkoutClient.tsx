"use client";

import { useState } from "react";
import { generatePlan } from "@/actions/workout";
import { Button } from "@/components/ui/button";
import { Dumbbell, Sparkles, Clock, AlertCircle } from "lucide-react";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes: string;
}

interface WorkoutDay {
  day: string;
  focus: string;
  duration: number;
  exercises: Exercise[];
}

interface WorkoutPlan {
  title: string;
  goal: string;
  days: WorkoutDay[];
}

interface SavedPlan {
  id: string;
  title: string;
  goal: string;
  days: unknown;
  generatedAt: Date;
}

interface Props {
  hasProfile: boolean;
  savedPlans: SavedPlan[];
}

const dayColors: Record<string, string> = {
  Monday: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  Tuesday: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  Wednesday: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Thursday: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Friday: "text-rose-400 bg-rose-500/10 border-rose-500/20",
};

function WorkoutDayCard({ day }: { day: WorkoutDay }) {
  const [expanded, setExpanded] = useState(false);
  const colorClass =
    dayColors[day.day] || "text-zinc-400 bg-zinc-500/10 border-zinc-500/20";

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${colorClass}`}
          >
            {day.day}
          </span>
          <div className="text-left">
            <p className="text-white font-semibold">{day.focus}</p>
            <p className="text-zinc-400 text-xs mt-0.5">
              {day.exercises.length} exercises
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs">{day.duration} min</span>
          </div>
          <span className="text-zinc-500 text-xs">{expanded ? "▲" : "▼"}</span>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-white/10 divide-y divide-white/5">
          {day.exercises.map((exercise, i) => (
            <div key={i} className="px-5 py-4">
              <div className="flex items-start justify-between mb-1">
                <p className="text-white font-medium text-sm">
                  {exercise.name}
                </p>
                <div className="flex items-center gap-3 text-xs text-zinc-400 shrink-0 ml-4">
                  <span>{exercise.sets} sets</span>
                  <span>{exercise.reps} reps</span>
                  <span>{exercise.rest} rest</span>
                </div>
              </div>
              {exercise.notes && (
                <p className="text-zinc-500 text-xs mt-1">{exercise.notes}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function WorkoutClient({ hasProfile, savedPlans }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<WorkoutPlan | null>(null);

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
          Please complete your profile before generating a workout plan.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Generate button */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
            <Dumbbell className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <h2 className="text-white font-semibold">Generate workout plan</h2>
            <p className="text-zinc-400 text-xs">
              Powered by Gemini AI · 5-day personalized program
            </p>
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <Button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-rose-600 hover:bg-rose-500 text-white font-semibold h-11"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin" />
              Generating your plan...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Generate workout plan
            </span>
          )}
        </Button>
      </div>

      {/* Current plan */}
      {currentPlan && (
        <div className="space-y-4">
          <div>
            <h2 className="text-white font-semibold">{currentPlan.title}</h2>
            <p className="text-zinc-400 text-sm mt-0.5">{currentPlan.goal}</p>
          </div>
          {currentPlan.days.map((day) => (
            <WorkoutDayCard key={day.day} day={day} />
          ))}
        </div>
      )}

      {/* Saved plans */}
      {savedPlans.length > 0 && !currentPlan && (
        <div className="space-y-4">
          <h2 className="text-white font-semibold">Previous plans</h2>
          {savedPlans.map((plan) => {
            const days = plan.days as WorkoutDay[];
            return (
              <div
                key={plan.id}
                className="bg-zinc-900 border border-white/10 rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-medium">{plan.title}</h3>
                  <p className="text-zinc-500 text-xs">
                    {new Date(plan.generatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {days.map((day) => (
                    <span
                      key={day.day}
                      className={`text-xs px-2.5 py-1 rounded-lg border ${
                        dayColors[day.day] ||
                        "text-zinc-400 bg-zinc-800 border-zinc-700"
                      }`}
                    >
                      {day.day}: {day.focus}
                    </span>
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
