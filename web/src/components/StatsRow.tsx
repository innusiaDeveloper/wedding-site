type Stat = {
  label: string;
  value: string;
  description: string;
};

const stats: Stat[] = [
  {
    label: "Guests",
    value: "Up to 80",
    description: "Intimate weddings with close people only.",
  },
  {
    label: "Coverage",
    value: "8–12h",
    description: "Full-day storytelling without rush.",
  },
  {
    label: "Deliverables",
    value: "Photos + Reels",
    description: "Editorial images and short cinematic reels.",
  },
  {
    label: "Mood",
    value: "Editorial",
    description: "Calm, clean and timeless visual language.",
  },
];

export function StatsRow({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      {/* HEADER */}
      <header className="mb-14">
        <h2 className="font-display text-4xl leading-tight text-brand-dark">
          {title}
        </h2>

        <p className="mt-3 max-w-xl font-ui text-base text-brand-brown">
          {subtitle}
        </p>
      </header>

      {/* GRID */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {stats.map((s) => (
          <div
            key={s.label}
            className="
              group relative overflow-hidden
              rounded-3xl
              border border-brand-dark/15
              bg-brand-paper
              p-8
              shadow-[0_10px_30px_rgba(0,0,0,0.04)]
              transition
              hover:-translate-y-0.5
              hover:border-brand-green/35
              hover:shadow-[0_22px_60px_rgba(0,0,0,0.10)]
            "
          >
            {/* subtle accent line on hover */}
            <div
              className="
                pointer-events-none absolute inset-x-0 top-0 h-[2px]
                bg-transparent
                transition
                group-hover:bg-brand-green
              "
            />

            {/* LABEL */}
            <div className="font-ui text-xs uppercase tracking-wide text-brand-deep/80">
              {s.label}
            </div>

            {/* VALUE */}
            <div className="mt-3 font-display text-3xl text-brand-dark">
              {s.value}
            </div>

            {/* DESCRIPTION */}
            <p className="mt-4 font-ui text-sm leading-relaxed text-brand-brown">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
