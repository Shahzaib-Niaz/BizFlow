function StatCard({ title, value, change, icon: Icon }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">{value}</p>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
          <Icon size={20} aria-hidden="true" />
        </span>
      </div>
      <p className="mt-4 text-sm font-medium text-emerald-700">
        {change} <span className="font-normal text-slate-500">from last month</span>
      </p>
    </article>
  );
}

export default StatCard;