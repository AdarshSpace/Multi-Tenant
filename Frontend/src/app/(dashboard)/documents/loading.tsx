export default function DocumentsLoading() {
  return (
    <div className="bg-white rounded-3xl p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Available Notes
        </h1>
        <p className="text-slate-400 font-medium mt-1">
          Lecture Notes from your purchased courses
        </p>
      </div>

      <div className="space-y-12">
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 animate-pulse shrink-0" />
            <div className="space-y-1.5">
              <div className="h-2.5 w-12 rounded bg-slate-100 animate-pulse" />
              <div className="h-4 w-40 rounded-md bg-slate-200 animate-pulse" />
            </div>
            <span className="ml-auto h-6 w-14 rounded-full bg-slate-100 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col justify-between p-6 bg-slate-50 border border-gray-200 rounded-2xl"
              >
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 animate-pulse" />
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 animate-pulse" />
                </div>

                <div className="space-y-3">
                  <div className="space-y-2 animate-pulse">
                    <div className="h-4 w-full rounded-md bg-slate-200" />
                    <div className="h-4 w-2/3 rounded-md bg-slate-200" />
                  </div>
                  <div className="h-3 w-28 rounded-md bg-slate-100 animate-pulse" />
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div className="h-3 w-24 rounded bg-slate-100 animate-pulse" />
                  <div className="h-3 w-10 rounded bg-slate-100 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
