import Image from "next/image";
import { Check, MessageSquare, MonitorUp, PieChart, Play, Users } from "lucide-react";

export default function LiveClasses() {
  return (
    <section className="w-full bg-white px-6 py-20 sm:py-5">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-20">
      
        {/* LEFT CONTENT */}
        <div className="flex flex-col gap-5">
          

          <h1 className="font-['General_Sans'] text-[34px] font-medium leading-[1.08] tracking-[-0.03em] text-slate-900 sm:text-[40px] md:text-[46px]">
            Live-interactive Classes
          </h1>

          <p className="max-w-[530px] text-lg leading-relaxed text-slate-500">
            Make every live class more engaging with real-time interaction and powerful tools. Make every live class more engaging with real-time interaction and powerful tools.
          </p>

          <ul className="mt-3 flex flex-col gap-1">
            {[
              "Share the screen and explain the concept",
              "In chat section student ask the doubt",
              "By the polls understand the students response quickly",
              "Participate and learn together in real time",
            ].map((line) => (
              <li key={line} className="flex items-center gap-3 py-2">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#ECFDF5" }}
                >
                  <Check className="h-4 w-4" strokeWidth={2.5} style={{ color: "#10B981" }} />
                </span>
                <span className="text-[15px] font-medium leading-relaxed text-slate-600">
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: LIVE CLASS MOCKUP */}
        <div className="relative mx-auto my-20  aspect-square w-full max-w-[440px]">
          {/* dot grid */}
          <svg
            className="absolute -left-2 -top-6 hidden sm:block"
            width="79"
            height="75"
            viewBox="0 0 79 75"
            fill="none"
            aria-hidden="true"
          >
            {Array.from({ length: 5 }).map((_, row) =>
              Array.from({ length: 5 }).map((_, col) => (
                <circle key={`${row}-${col}`} cx={8 + col * 16} cy={8 + row * 16} r="2" fill="#CBD5E1" />
              ))
            )}
          </svg>

          {/* squiggle arrow */}
          <svg
            className="absolute -right-2 -top-8 hidden rotate-90 sm:block"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 36 C 18 36, 18 8, 36 8 S 50 16, 46 6"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              d="M42 3 L46 6 L41 10"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.5"
            />
          </svg>

          {/* soft glow */}
          <div
            className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
            style={{
              background: "radial-gradient(circle, #EFF6FF, transparent 70%)",
            }}
          />
          {/* decorative ring */}
          <div
            className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{ borderColor: "#DBEAFE" }}
          >
            <div className="absolute left-1/2 top-1/2 h-[410px] w-[410px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{ borderColor: "#DBEAFE", background:
        "radial-gradient(circle, #FFFFFF 0%, rgba(219,234,254,0.35) 70%, rgba(147,197,253,0.50) 100%)",
 }}>
              <div className="absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{ borderColor: "#DBEAFE",  background:
              "radial-gradient(circle, #FFFFFF 0%, #F8FBFF 55%, #DBEAFE 78%, #BFDBFE 100%)", }}>

            </div>
            </div>
          </div>

          {/* central video card */}
          <div className="relative mx-auto my-15 aspect-[3/4] w-[55%] overflow-hidden rounded-3xl shadow-[0_25px_60px_rgba(15,23,42,0.18)]">
            <Image
              src="/teacher 1.jpeg"
              alt="Teacher conducting a live interactive class"
              fill
              className="object-cover object-[70%_center]"
              sizes="(max-width: 640px) 60vw, 280px"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-3 py-3">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                Live Class
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-900">
                <Play className="h-3.5 w-3.5 fill-current" />
              </span>
            </div>
          </div>

          {/* Screen Share card */}
          <div className="absolute left-0 top-[8%] z-20 hidden w-[150px] rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-[0_10px_35px_rgba(15,23,42,0.08)] sm:-left-15 sm:block">
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: "#EFF6FF" }}
              >
                <MonitorUp
                  className="h-[18px] w-[18px]"
                  style={{ color: "#3B82F6" }}
                />
              </span>
          
              <p className="text-sm font-bold text-slate-800">
                Share Screen
              </p>
            </div>
          </div>
          
          
          {/* Chat Section card */}
          <div className="absolute right-0 top-[8%] z-20 hidden w-[150px] rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-[0_10px_35px_rgba(15,23,42,0.08)] sm:-right-10 sm:block">
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: "#EEF2FF" }}
              >
                <MessageSquare
                  className="h-[18px] w-[18px]"
                  style={{ color: "#6366F1" }}
                />
              </span>
          
              <p className="text-sm font-bold text-slate-800">
                Chat Section
              </p>
            </div>
          </div>
          
          
          {/* Create Polls card */}
          <div className="absolute right-0 bottom-[10%] z-20 hidden w-[150px] rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-[0_10px_35px_rgba(15,23,42,0.08)] sm:-right-15 sm:block">
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: "#FEF3C7" }}
              >
                <PieChart
                  className="h-[18px] w-[18px]"
                  style={{ color: "#D97706" }}
                />
              </span>
          
              <p className="text-sm font-bold text-slate-800">
                Create Polls
              </p>
            </div>
          </div>
          
          
          {/* 100K+ Active Learners card */}
          <div className="absolute left-0 bottom-[10%] z-20 hidden w-[180px] rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-[0_10px_35px_rgba(15,23,42,0.08)] sm:-left-19 sm:block">
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: "#EFF6FF" }}
              >
                <Users
                  className="h-[18px] w-[18px]"
                  style={{ color: "#3B82F6" }}
                />
              </span>
          
              <p className="text-sm font-bold text-slate-800">
                100+ Active Learners
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}