"use client";

import Image from "next/image";
import {
  MonitorUp,
  MessageCircle,
  BarChart3,
  UsersRound,
  Play,
  MousePointer2,
  Sparkles,
} from "lucide-react";

import type { LiveClassesData } from "./types";

const iconMap = {
  "screen-share": MonitorUp,
  chat: MessageCircle,
  polls: BarChart3,
};

export default function LiveInteractiveClasses({
  data,
}: {
  data: LiveClassesData;
}) {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Heading */}
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="font-['General_Sans'] text-[34px] font-medium leading-[1.08] tracking-[-0.03em] text-slate-900 sm:text-[40px] md:text-[46px]">
            {data.title}
          </h2>

          <p className="mx-auto mt-4 max-w-xl font-['Manrope'] text-[11px] leading-[1.6] text-slate-500 sm:text-xs md:text-sm">
            {data.description}
          </p>
        </div>

        {/* Main Design */}
        <div className="relative mx-auto mt-10 h-[390px] max-w-[900px] sm:mt-12 md:h-[440px] lg:mt-8">

          {/* Background Glow */}
          <div
            className="
              absolute
              left-1/2
              top-[52%]
              h-[245px]
              w-[245px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              opacity-70
              blur-[1px]
              sm:h-[285px]
              sm:w-[285px]
              md:h-[320px]
              md:w-[320px]
            "
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--tenant-primary) 20%, white) 0%, color-mix(in srgb, var(--tenant-primary) 8%, white) 48%, transparent 72%)",
            }}
          />

          {/* Outer Circle */}
          <div
            className="
              absolute
              left-1/2
              top-[52%]
              h-[260px]
              w-[260px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              sm:h-[300px]
              sm:w-[300px]
              md:h-[335px]
              md:w-[335px]
            "
            style={{
              borderColor:
                "color-mix(in srgb, var(--tenant-primary) 12%, transparent)",
            }}
          />

          {/* Left Dots */}
          <div
            className="
              absolute
              left-[7%]
              top-[25%]
              hidden
              grid-cols-3
              gap-[6px]
              opacity-60
              sm:grid
            "
          >
            {Array.from({ length: 15 }).map((_, index) => (
              <span
                key={index}
                className="h-[3px] w-[3px] rounded-full"
                style={{
                  backgroundColor: "var(--tenant-primary)",
                }}
              />
            ))}
          </div>

          {/* Top Right Decoration */}
          <div
            className="
              absolute
              right-[20%]
              top-[12%]
              hidden
              rotate-[12deg]
              sm:block
            "
            style={{
              color: "var(--tenant-primary)",
            }}
          >
            <MousePointer2
              className="h-7 w-7"
              strokeWidth={1.5}
            />
          </div>

          {/* Bottom Left Decoration */}
          <div
            className="
              absolute
              bottom-[5%]
              left-[24%]
              hidden
              -rotate-[30deg]
              sm:block
            "
            style={{
              color: "var(--tenant-primary)",
            }}
          >
            <Sparkles
              className="h-8 w-8"
              strokeWidth={1.4}
            />
          </div>

          {/* Center Image */}
          <div
            className="
              absolute
              left-1/2
              top-[52%]
              z-20
              h-[225px]
              w-[145px]
              -translate-x-1/2
              -translate-y-1/2
              overflow-hidden
              rounded-[12px]
              bg-slate-100
              shadow-[0_20px_50px_rgba(0,0,0,0.12)]
              sm:h-[250px]
              sm:w-[160px]
              md:h-[270px]
              md:w-[175px]
            "
          >
            {data.imageUrl ? (
              <Image
                src={data.imageUrl}
                alt={data.imageAlt || data.title}
                fill
                className="object-cover"
                sizes="175px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-100">
                <MonitorUp className="h-10 w-10 text-slate-300" />
              </div>
            )}

            {/* Bottom Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Video Label */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className="font-['Manrope'] text-[10px] font-medium text-white">
                Live Class
              </span>

              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90">
                <Play
                  className="ml-[1px] h-3 w-3 fill-current"
                  style={{
                    color: "var(--tenant-primary)",
                  }}
                />
              </span>
            </div>
          </div>

          {/* Left Top Card */}
          <FeatureCard
            className="
              absolute
              left-[4%]
              top-[17%]
              z-10
              w-[155px]
              sm:left-[11%]
              sm:w-[175px]
              md:left-[14%]
              md:w-[190px]
            "
            feature={data.features[0]}
          />

          {/* Left Bottom Stat */}
          <div
            className="
              absolute
              bottom-[12%]
              left-[4%]
              z-10
              hidden
              w-[155px]
              rounded-[14px]
              border
              border-slate-100
              bg-white
              px-4
              py-4
              shadow-[0_8px_30px_rgba(0,0,0,0.06)]
              sm:block
              sm:left-[11%]
              sm:w-[175px]
              md:left-[14%]
              md:w-[190px]
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                "
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--tenant-primary) 10%, white)",
                  color: "var(--tenant-primary)",
                }}
              >
                <UsersRound
                  className="h-5 w-5"
                  strokeWidth={1.7}
                />
              </div>

              <div>
                <p className="font-['General_Sans'] text-sm font-medium text-slate-800">
                  100K+
                </p>

                <p className="mt-0.5 font-['Manrope'] text-[8px] text-slate-400">
                  Worldwide Active Users
                </p>
              </div>
            </div>
          </div>

          {/* Right Top Card */}
          <FeatureCard
            className="
              absolute
              right-[4%]
              top-[18%]
              z-10
              w-[155px]
              sm:right-[11%]
              sm:w-[175px]
              md:right-[14%]
              md:w-[190px]
            "
            feature={data.features[1]}
          />

          {/* Right Bottom Card */}
          <FeatureCard
            className="
              absolute
              bottom-[12%]
              right-[4%]
              z-10
              w-[155px]
              sm:right-[11%]
              sm:w-[175px]
              md:right-[14%]
              md:w-[190px]
            "
            feature={data.features[2]}
          />
        </div>
      </div>
    </section>
  );
}


/* ============================================================
   FEATURE CARD
============================================================ */

function FeatureCard({
  className,
  feature,
}: {
  className: string;
  feature?: LiveClassesData["features"][number];
}) {
  if (!feature) {
    return null;
  }

  const Icon = iconMap[feature.icon];

  return (
    <div
      className={`
        rounded-[14px]
        border
        border-slate-100
        bg-white
        px-4
        py-4
        shadow-[0_8px_30px_rgba(0,0,0,0.06)]
        sm:px-5
        sm:py-5
        ${className}
      `}
    >
      {/* Icon */}
      <div
        className="
          mb-3
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
        "
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--tenant-primary) 9%, white)",
          color: "var(--tenant-primary)",
        }}
      >
        <Icon
          className="h-5 w-5"
          strokeWidth={1.6}
        />
      </div>

      {/* Title */}
      <h3 className="font-['General_Sans'] text-[12px] font-medium leading-tight text-slate-800 sm:text-[13px]">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="mt-1.5 line-clamp-2 font-['Manrope'] text-[8px] leading-[1.5] text-slate-400 sm:text-[9px]">
        {feature.description}
      </p>

      {/* Button */}
      <button
        type="button"
        className="
          mt-3
          rounded-full
          px-3
          py-1.5
          font-['Manrope']
          text-[8px]
          font-medium
          text-white
          transition-opacity
          hover:opacity-90
        "
        style={{
          backgroundColor: "var(--tenant-primary)",
        }}
      >
        Learn More
      </button>
    </div>
  );
}