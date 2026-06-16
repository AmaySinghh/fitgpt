interface CalorieSummaryProps {
  consumed: number;
  target: number;
  protein: number;
  carbs: number;
  fat: number;
}

export default function CalorieSummary({
  consumed,
  target,
  protein,
  carbs,
  fat,
}: CalorieSummaryProps) {
  const remaining = target - consumed;
  const percentage = Math.min((consumed / target) * 100, 100);

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold">Today&apos;s summary</h2>
        <span className="text-sm text-zinc-400">{target} kcal target</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-zinc-800 rounded-full h-3 mb-4">
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

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">{consumed}</p>
          <p className="text-xs text-zinc-400">Consumed</p>
        </div>
        <div className="text-center">
          <p
            className={`text-2xl font-bold ${
              remaining < 0 ? "text-red-400" : "text-emerald-400"
            }`}
          >
            {Math.abs(remaining)}
          </p>
          <p className="text-xs text-zinc-400">
            {remaining < 0 ? "Over" : "Remaining"}
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-white">
            {Math.round(percentage)}%
          </p>
          <p className="text-xs text-zinc-400">Complete</p>
        </div>
      </div>

      {/* Macros */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
        <div className="bg-zinc-800 rounded-xl p-3 text-center">
          <p className="text-sm font-semibold text-blue-400">
            {protein.toFixed(1)}g
          </p>
          <p className="text-xs text-zinc-400">Protein</p>
        </div>
        <div className="bg-zinc-800 rounded-xl p-3 text-center">
          <p className="text-sm font-semibold text-amber-400">
            {carbs.toFixed(1)}g
          </p>
          <p className="text-xs text-zinc-400">Carbs</p>
        </div>
        <div className="bg-zinc-800 rounded-xl p-3 text-center">
          <p className="text-sm font-semibold text-rose-400">
            {fat.toFixed(1)}g
          </p>
          <p className="text-xs text-zinc-400">Fat</p>
        </div>
      </div>
    </div>
  );
}
