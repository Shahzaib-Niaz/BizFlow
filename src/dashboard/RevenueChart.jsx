const points = [
  { month: "Jan", value: 34 },
  { month: "Feb", value: 48 },
  { month: "Mar", value: 42 },
  { month: "Apr", value: 61 },
  { month: "May", value: 55 },
  { month: "Jun", value: 75 },
  { month: "Jul", value: 68 },
  { month: "Aug", value: 88 },
  { month: "Sep", value: 79 },
  { month: "Oct", value: 96 },
  { month: "Nov", value: 84 },
  { month: "Dec", value: 100 },
];

const chartPoints = points
  .map((point, index) => `${index * 100},${120 - point.value}`)
  .join(" ");

function RevenueChart() {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Revenue</h2>
          <p className="mt-1 text-sm text-slate-500">Monthly performance</p>
        </div>
        <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          This year
        </span>
      </div>

      <div className="mt-6">
        <svg
          viewBox="0 0 1100 140"
          preserveAspectRatio="none"
          role="img"
          aria-label="Revenue trend rises overall from January to December"
          className="h-44 w-full overflow-visible"
        >
          {[20, 60, 100].map((y) => (
            <line
              key={y}
              x1="0"
              x2="1100"
              y1={y}
              y2={y}
              stroke="#e2e8f0"
              strokeDasharray="4 6"
            />
          ))}
          <polyline
            points={chartPoints}
            fill="none"
            stroke="#4f46e5"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="mt-2 grid grid-cols-6 gap-2 text-center text-xs text-slate-400 sm:grid-cols-12">
          {points.map(({ month }) => <span key={month}>{month}</span>)}
        </div>
      </div>
    </section>
  );
}

export default RevenueChart;