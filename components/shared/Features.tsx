import {
  Brain,
  Camera,
  ChartBar,
  MessageCircle,
  Salad,
  Target,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Meal Planner",
    description:
      "Generate personalized meal plans based on your goals, preferences, and dietary restrictions.",
  },
  {
    icon: Camera,
    title: "Food Scanner",
    description:
      "Upload a photo of any meal and get instant calorie and macro estimates powered by Gemini Vision.",
  },
  {
    icon: MessageCircle,
    title: "Nutrition Coach",
    description:
      "Chat with an AI coach 24/7. Ask anything about nutrition, fitness, or your progress.",
  },
  {
    icon: Target,
    title: "Goal Tracking",
    description:
      "Set weight loss, muscle gain, or maintenance goals and track your daily progress.",
  },
  {
    icon: ChartBar,
    title: "Nutrition Analytics",
    description:
      "Visualize your calorie intake, macro splits, and weekly trends with beautiful charts.",
  },
  {
    icon: Salad,
    title: "Calorie Tracking",
    description:
      "Log meals quickly and accurately. Track protein, carbs, and fat with every entry.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Everything you need to
            <br />
            <span className="text-emerald-400">reach your goals</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            A complete fitness platform powered by AI — not just another calorie
            counter.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                <feature.icon className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
