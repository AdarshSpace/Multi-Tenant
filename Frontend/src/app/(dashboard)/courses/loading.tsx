import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";

function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden max-w-sm border-2 border-slate-200 rounded-xl flex flex-col gap-1 h-full p-0">
      {/* Thumbnail — matches card.tsx */}
      <div className="aspect-video relative overflow-hidden shrink-0 bg-slate-100 animate-pulse">
        <div className="absolute top-3 left-3 flex gap-2">
          <div className="h-5 w-18 rounded-full bg-white/90 shadow-sm" />
        </div>
      </div>

      <CardHeader className="px-5 py-0">
        <div className="h-7 w-4/5 rounded-md bg-slate-200 animate-pulse" />
      </CardHeader>

      <CardContent className="px-5 py-0 space-y-0 grow">
        <div className="min-h-[40px] space-y-[0.35rem] animate-pulse">
          <div className="h-5 w-full rounded-sm bg-slate-100" />
          <div className="h-5 w-[92%] rounded-sm bg-slate-100" />
        </div>

        <div className="flex items-center justify-between text-xs font-medium pt-2 border-t border-slate-50 animate-pulse">
          <div className="flex gap-4">
            <div className="h-3.5 w-13 rounded-sm bg-slate-100" />
            <div className="h-3.5 w-8 rounded-sm bg-slate-100" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3.5 w-9 rounded-sm bg-slate-100" />
            <div className="h-7 w-11 rounded-sm bg-slate-200" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-5 py-5 flex gap-2">
        <div className="h-8 w-full rounded-lg bg-slate-200 animate-pulse" />
      </CardFooter>
    </div>
  );
}

export default function CoursesLoading() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 animate-pulse">
        <div>
          <div className="h-9 w-48 md:w-56 rounded-lg bg-slate-200" />
          <div className="h-5 w-64 md:w-80 rounded-md bg-slate-100 mt-1" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
        {Array.from({ length: 2 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
