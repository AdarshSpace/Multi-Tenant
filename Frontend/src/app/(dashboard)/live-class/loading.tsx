import { Radio, RefreshCw } from "lucide-react";

export default function LiveClassLoading() {
  return (
    <div className="min-h-[80vh] p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0039a6] via-[#002d85] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold backdrop-blur-md">
              <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>Live Class Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Join Live Classes
            </h1>
            <p className="text-white/80 text-sm max-w-xl font-medium">
              Join active live sessions directly with one click.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 text-white rounded-xl">
              <RefreshCw className="w-5 h-5 animate-spin" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-slate-800">
              Available Live Classes
            </h2>
            <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-xs font-bold">
              0
            </span>
          </div>
          <div className="h-3 w-36 rounded-md bg-slate-100 animate-pulse hidden sm:block" />
        </div>

        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-8 bg-slate-50/80 rounded-3xl border border-slate-200/80 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center">
            <Radio className="w-8 h-8 text-slate-200 animate-pulse" />
          </div>
          <div className="space-y-2 max-w-sm w-full">
            <div className="h-4 w-48 mx-auto rounded-md bg-slate-200 animate-pulse" />
            <div className="h-3 w-full rounded-md bg-slate-100 animate-pulse" />
            <div className="h-3 w-4/5 mx-auto rounded-md bg-slate-100 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
