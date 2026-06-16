"use client";

import { useState } from "react";
import { logWater, deleteWaterLog } from "@/actions/water";
import { Button } from "@/components/ui/button";
import { Droplets, Plus, Trash2 } from "lucide-react";

interface WaterLog {
  id: string;
  amount: number;
  loggedAt: Date;
}

interface Props {
  total: number;
  target: number;
  logs: WaterLog[];
}

const quickAmounts = [150, 250, 350, 500];

export default function WaterTracker({
  total: initialTotal,
  target,
  logs: initialLogs,
}: Props) {
  const [total, setTotal] = useState(initialTotal);
  const [logs, setLogs] = useState(initialLogs);
  const [loading, setLoading] = useState(false);
  const [custom, setCustom] = useState("");

  const percentage = Math.min((total / target) * 100, 100);

  const getColor = () => {
    if (percentage >= 100) return "#10b981";
    if (percentage >= 60) return "#3b82f6";
    if (percentage >= 30) return "#f59e0b";
    return "#ef4444";
  };

  async function handleLog(amount: number) {
    setLoading(true);
    await logWater(amount);
    setTotal((prev) => prev + amount);
    setLogs((prev) => [
      {
        id: Date.now().toString(),
        amount,
        loggedAt: new Date(),
      },
      ...prev,
    ]);
    setLoading(false);
  }

  async function handleDelete(id: string, amount: number) {
    await deleteWaterLog(id);
    setTotal((prev) => prev - amount);
    setLogs((prev) => prev.filter((l) => l.id !== id));
  }

  async function handleCustom() {
    const amount = parseInt(custom);
    if (!amount || amount <= 0) return;
    await handleLog(amount);
    setCustom("");
  }

  return (
    <div className="space-y-4">
      {/* Progress circle */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 flex flex-col items-center">
        <div className="relative w-44 h-44 mb-6">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#27272a"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={getColor()}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Droplets className="w-6 h-6 mb-1" style={{ color: getColor() }} />
            <p className="text-2xl font-bold text-white">
              {total}
              <span className="text-sm font-normal text-zinc-400">ml</span>
            </p>
            <p className="text-xs text-zinc-500">of {target}ml</p>
          </div>
        </div>

        <p className="text-zinc-400 text-sm">
          {percentage >= 100
            ? "🎉 Daily goal reached!"
            : `${target - total}ml remaining`}
        </p>
      </div>

      {/* Quick add */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-4">Quick add</h2>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => handleLog(amount)}
              disabled={loading}
              className="flex flex-col items-center gap-1 p-3 rounded-xl bg-zinc-800 border border-white/10 hover:border-blue-500/30 hover:bg-blue-500/10 transition-all group"
            >
              <Droplets className="w-4 h-4 text-blue-400" />
              <span className="text-white text-sm font-medium">{amount}</span>
              <span className="text-zinc-500 text-xs">ml</span>
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Custom amount (ml)"
            className="flex-1 h-10 px-3 rounded-lg bg-zinc-800 border border-white/10 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-blue-500"
          />
          <Button
            onClick={handleCustom}
            disabled={!custom || loading}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Log history */}
      {logs.length > 0 && (
        <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-white font-semibold">
              Today&apos;s log ({logs.length})
            </h2>
          </div>
          <div className="divide-y divide-white/5">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between px-6 py-3"
              >
                <div className="flex items-center gap-3">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="text-white text-sm font-medium">
                      {log.amount}ml
                    </p>
                    <p className="text-zinc-500 text-xs">
                      {new Date(log.loggedAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(log.id, log.amount)}
                  className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
