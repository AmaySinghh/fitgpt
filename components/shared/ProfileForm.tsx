"use client";

import { useState } from "react";
import { saveProfile } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Profile } from "@prisma/client";

interface ProfileFormProps {
  profile: Profile | null;
}

function calculateBMI(height: number, weight: number) {
  if (height <= 0 || weight <= 0) return null;
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

function getBMICategory(bmi: number) {
  if (bmi < 18.5) return { category: "Underweight", color: "text-blue-400" };
  if (bmi < 25) return { category: "Normal weight", color: "text-green-400" };
  if (bmi < 30) return { category: "Overweight", color: "text-yellow-400" };
  return { category: "Obese", color: "text-red-400" };
}

export default function ProfileForm({ profile }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [height, setHeight] = useState(profile?.height || "");
  const [weight, setWeight] = useState(profile?.weight || "");

  const bmi =
    height && weight ? calculateBMI(Number(height), Number(weight)) : null;
  const bmiCategory = bmi ? getBMICategory(bmi) : null;

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await saveProfile(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* Personal Info */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-white font-semibold">Personal information</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="age" className="text-zinc-300 text-sm">
              Age
            </Label>
            <Input
              id="age"
              name="age"
              type="number"
              placeholder="25"
              defaultValue={profile?.age}
              required
              className="bg-zinc-800 border-white/10 text-white placeholder:text-zinc-500 focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="gender" className="text-zinc-300 text-sm">
              Gender
            </Label>
            <select
              id="gender"
              name="gender"
              defaultValue={profile?.gender ?? ""}
              required
              className="w-full h-10 px-3 rounded-md bg-zinc-800 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="height" className="text-zinc-300 text-sm">
              Height (cm)
            </Label>
            <Input
              id="height"
              name="height"
              type="number"
              placeholder="175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
              className="bg-zinc-800 border-white/10 text-white placeholder:text-zinc-500 focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="weight" className="text-zinc-300 text-sm">
              Weight (kg)
            </Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              placeholder="70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              className="bg-zinc-800 border-white/10 text-white placeholder:text-zinc-500 focus:border-emerald-500"
            />
          </div>
        </div>

        {bmi && bmiCategory && (
          <div className="mt-4 p-4 rounded-xl bg-zinc-800 border border-white/10">
            <p className="text-zinc-400 text-sm mb-2">Your BMI</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">
                {bmi.toFixed(1)}
              </span>
              <span className={`text-lg font-semibold ${bmiCategory.color}`}>
                {bmiCategory.category}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Fitness Goals */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-white font-semibold">Fitness goal</h2>

        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "LOSE_WEIGHT", label: "Lose weight" },
            { value: "GAIN_MUSCLE", label: "Gain muscle" },
            { value: "MAINTAIN", label: "Maintain weight" },
            { value: "IMPROVE_FITNESS", label: "Improve fitness" },
          ].map((goal) => (
            <label
              key={goal.value}
              className="relative flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-zinc-800 cursor-pointer hover:border-emerald-500/50 transition-colors has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-500/10"
            >
              <input
                type="radio"
                name="goal"
                value={goal.value}
                defaultChecked={profile?.goal === goal.value}
                className="sr-only"
                required
              />
              <span className="text-sm text-zinc-300">{goal.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Activity Level */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-white font-semibold">Activity level</h2>

        <div className="space-y-2">
          {[
            {
              value: "SEDENTARY",
              label: "Sedentary",
              desc: "Little or no exercise",
            },
            {
              value: "LIGHTLY_ACTIVE",
              label: "Lightly active",
              desc: "Exercise 1-3 days/week",
            },
            {
              value: "MODERATELY_ACTIVE",
              label: "Moderately active",
              desc: "Exercise 3-5 days/week",
            },
            {
              value: "VERY_ACTIVE",
              label: "Very active",
              desc: "Exercise 6-7 days/week",
            },
            {
              value: "EXTREMELY_ACTIVE",
              label: "Extremely active",
              desc: "Very hard exercise, physical job",
            },
          ].map((level) => (
            <label
              key={level.value}
              className="relative flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-zinc-800 cursor-pointer hover:border-emerald-500/50 transition-colors has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-500/10"
            >
              <input
                type="radio"
                name="activityLevel"
                value={level.value}
                defaultChecked={profile?.activityLevel === level.value}
                className="sr-only"
                required
              />
              <div>
                <p className="text-sm font-medium text-white">{level.label}</p>
                <p className="text-xs text-zinc-400">{level.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold h-11"
      >
        {loading ? "Saving..." : profile ? "Save changes" : "Complete setup"}
      </Button>
    </form>
  );
}
