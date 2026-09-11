export default function SavedVideosLoading() {
  return (
    <div className="bg-white h-full rounded-3xl p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Saved Videos
        </h1>
        <p className="text-slate-400 font-medium mt-1">1 video saved</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="relative flex flex-col justify-between p-5 bg-blue-100/20 backdrop-blur-xl border border-slate-300/80 rounded-2xl">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 animate-pulse" />
            <div className="w-9 h-9 rounded-lg bg-slate-100 animate-pulse" />
          </div>

          <div className="flex-1 space-y-3">
            <div className="space-y-2 animate-pulse">
              <div className="h-4 w-full rounded-md bg-slate-200" />
              <div className="h-4 w-3/4 rounded-md bg-slate-200" />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="h-7 w-32 rounded-lg bg-blue-50 border border-blue-100 animate-pulse" />
              <div className="h-7 w-28 rounded-lg bg-slate-100 border border-slate-200 animate-pulse" />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="h-3.5 w-14 rounded-md bg-slate-100 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
