const steps = [
  {
    number: "01",
    title: "Create your profile",
    description:
      "Enter your age, height, weight, and fitness goal. We calculate your BMR and daily calorie target automatically.",
  },
  {
    number: "02",
    title: "Track your nutrition",
    description:
      "Log meals manually, scan food photos with AI, or generate a full meal plan tailored to your macros.",
  },
  {
    number: "03",
    title: "Achieve your goals",
    description:
      "Chat with your AI coach, monitor weekly trends, and adjust your plan as you make progress.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Up and running
            <br />
            <span className="text-emerald-400">in minutes</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            No complicated setup. Start tracking and improving from day one.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-full h-px bg-gradient-to-r from-emerald-500/40 to-transparent" />
              )}

              <div className="relative">
                <div className="text-5xl font-bold text-emerald-500/20 mb-4 font-mono">
                  {step.number}
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">
                  {step.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
