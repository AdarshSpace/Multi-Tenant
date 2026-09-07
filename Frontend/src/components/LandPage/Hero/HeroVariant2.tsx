 // This one focuses heavily on the teacher/institute's message.

"use client";

import Link from "next/link";
import { ArrowRight, Award, BookOpen, CheckCircle2, Play, Trophy, Sparkles, Star, Users, GraduationCap,} from "lucide-react";

import type { HeroData, HeroFeature, HeroFloatingCard, HeroStat,} from "./types";

interface HeroVariant2Props {
  data: HeroData;
}

const featureIconMap = {
  instructor: GraduationCap,
  "live-class": Users,
  certificate: Award,
};

const statIconMap = {
  students: Users,
  instructors: GraduationCap,
  courses: BookOpen,
  success: Trophy,
};


function FeatureIcon({
  type,
}: {
  type: HeroFeature["icon"];
}) {
  const Icon = featureIconMap[type];

  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--tenant-primary) 9%, white)",
        color: "var(--tenant-primary)",
      }}
    >
      <Icon
        className="h-4 w-4"
        strokeWidth={2}
      />
    </div>
  );
}

function StatIcon({ type, }: { type: HeroStat["icon"];}) {
  const Icon = statIconMap[type];

  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--tenant-primary) 9%, white)",
        color: "var(--tenant-primary)",
      }}
    >
      <Icon
        className="h-5 w-5"
        strokeWidth={2}
      />
    </div>
  );
}

function FloatingCard({ card, }: { card: HeroFloatingCard;}) {
  const primaryColor = "var(--tenant-primary)";

  const softPrimary =
    "color-mix(in srgb, var(--tenant-primary) 8%, white)";

  const lightPrimary =
    "color-mix(in srgb, var(--tenant-primary) 14%, white)";

  if (card.type === "live-class") {
    return (
      <div className="absolute left-[-35px] top-[100px] z-30 hidden w-[210px] rounded-2xl border border-white/80 bg-white/95 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur-md xl:block">
        <div className="flex gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white"
            style={{
              backgroundColor: primaryColor,
            }}
          >
            <Users className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">
              {card.title}
            </p>

            {card.description && (
              <p className="mt-1 text-xs leading-4 text-slate-500">
                {card.description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (card.type === "video-lessons") {
    return (
      <div className="absolute right-[-35px] top-[125px] z-30 hidden w-[205px] rounded-2xl border border-white/80 bg-white/95 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur-md xl:block">
        <div className="flex gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white"
            style={{
              backgroundColor: primaryColor,
            }}
          >
            <Play
              className="ml-0.5 h-5 w-5 fill-current"
            />
          </div>

          <div>
            {card.value && (
              <p
                className="text-sm font-bold"
                style={{
                  color: primaryColor,
                }}
              >
                {card.value}
              </p>
            )}

            <p className="text-xs font-medium text-slate-900">
              {card.title}
            </p>

            {card.description && (
              <p className="mt-1 text-xs text-slate-500">
                {card.description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (card.type === "certificate") {
    return (
      <div className="absolute bottom-[150px] right-[-25px] z-30 hidden w-[205px] rounded-2xl border border-white/80 bg-white/95 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur-md xl:block">
        <div className="flex gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{
              backgroundColor: lightPrimary,
              color: primaryColor,
            }}
          >
            <CheckCircle2 className="h-5 w-5" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">
              {card.title}
            </p>

            {card.description && (
              <p className="mt-1 text-xs leading-4 text-slate-500">
                {card.description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (card.type === "rating") {
    return (
      <div className="absolute bottom-[70px] left-[-25px] z-30 hidden rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur-md xl:block">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {["A", "R", "S", "M"].map((letter) => (
              <div
                key={letter}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold"
                style={{
                  backgroundColor: softPrimary,
                  color: primaryColor,
                }}
              >
                {letter}
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center gap-2">
              {card.value && (
                <span
                  className="text-sm font-bold"
                  style={{
                    color: primaryColor,
                  }}
                >
                  {card.value}
                </span>
              )}

              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-3 w-3 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </div>

            {card.description && (
              <p className="mt-1 text-[10px] text-slate-500">
                {card.description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default function HeroVariant2({
  data,
}: HeroVariant2Props) {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background decorative glow */}
      <div
        className="pointer-events-none absolute -left-[180px] -top-[180px] h-[500px] w-[500px] rounded-full blur-3xl opacity-30"
        style={{
          backgroundColor: "var(--tenant-primary)",
        }}
      />

      <div
        className="pointer-events-none absolute right-[-180px] top-[100px] h-[550px] w-[550px] rounded-full blur-3xl opacity-20"
        style={{
          backgroundColor: "var(--tenant-primary)",
        }}
      />

      {/* Main Hero */}
      <div className="relative mx-auto max-w-7xl px-5 pb-0 pt-6 sm:px-8 lg:px-10">
        <div className="relative min-h-[760px] overflow-hidden rounded-[32px]">
          {/* Background gradient */}
          <div
            className="absolute inset-0 opacity-[0.13]"
            style={{
              background:
                "radial-gradient(circle at 65% 35%, var(--tenant-primary), transparent 55%)",
            }}
          />

          {/* Decorative rings */}
          <div
            className="pointer-events-none absolute right-[8%] top-[17%] h-[520px] w-[520px] rounded-full border"
            style={{
              borderColor:
                "color-mix(in srgb, var(--tenant-primary) 18%, transparent)",
            }}
          />

          <div
            className="pointer-events-none absolute right-[13%] top-[22%] h-[420px] w-[420px] rounded-full border"
            style={{
              borderColor:
                "color-mix(in srgb, var(--tenant-primary) 12%, transparent)",
            }}
          />

          {/* Content */}
          <div className="relative z-20 flex min-h-[760px] items-center">
            <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              {/* LEFT */}
              <div className="relative z-40 flex flex-col justify-center px-3 py-16 sm:px-8 lg:px-12">
                {data.badge && (
                  <div
                    className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold"
                    style={{
                      borderColor:
                        "color-mix(in srgb, var(--tenant-primary) 18%, transparent)",
                      backgroundColor:
                        "color-mix(in srgb, var(--tenant-primary) 7%, white)",
                      color: "var(--tenant-primary)",
                    }}
                  >
                    <Sparkles className="h-4 w-4" />

                    {data.badge}
                  </div>
                )}

                <h1 className="max-w-[650px] text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-[72px]">
                  {data.title}
                </h1>

                {data.highlightedText && (
                  <h1
                    className="max-w-[650px] text-5xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-[72px]"
                    style={{
                      color: "var(--tenant-primary)",
                    }}
                  >
                    {data.highlightedText}
                  </h1>
                )}

                <p className="mt-7 max-w-[560px] text-base leading-7 text-slate-500 sm:text-lg">
                  {data.description}
                </p>

                {/* CTA */}
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link
                    href={data.primaryButtonLink}
                    className="group inline-flex h-14 items-center justify-center gap-3 rounded-2xl px-7 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                    style={{
                      backgroundColor:
                        "var(--tenant-primary)",
                    }}
                  >
                    {data.primaryButtonText}

                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {data.secondaryButtonText &&
                    data.secondaryButtonLink && (
                      <Link
                        href={data.secondaryButtonLink}
                        className="group inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                      >
                        {data.secondaryButtonText}

                        <span
                          className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                          style={{
                            backgroundColor:
                              "var(--tenant-primary)",
                          }}
                        >
                          <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
                        </span>
                      </Link>
                    )}
                </div>

                {/* Features */}
                {data.features &&
                  data.features.length > 0 && (
                    <div className="mt-9 grid max-w-[600px] grid-cols-1 gap-3 sm:grid-cols-3">
                      {data.features
                        .slice(0, 3)
                        .map((feature, index) => (
                          <div
                            key={`${feature.title}-${index}`}
                            className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-white/80 px-3 py-3 shadow-sm backdrop-blur-sm"
                          >
                            <FeatureIcon
                              type={feature.icon}
                            />

                            <div className="min-w-0">
                              <p className="truncate text-[11px] font-semibold text-slate-800">
                                {feature.title}
                              </p>

                              <p className="mt-0.5 truncate text-[9px] text-slate-400">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
              </div>

              {/* RIGHT VISUAL */}
              <div className="relative min-h-[650px] lg:min-h-[760px]">
                {/* Main visual background */}
                <div
                  className="absolute inset-y-8 right-[-12%] w-[115%] overflow-hidden rounded-[40px]"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--tenant-primary) 10%, white)",
                  }}
                >
                  {/* Image */}
                  <img
                    src={data.imageUrl}
                    alt={data.imageAlt}
                    className="h-full w-full object-cover object-[68%_50%]"
                  />

                  {/* Soft overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, color-mix(in srgb, var(--tenant-primary) 20%, transparent), transparent 45%)",
                    }}
                  />
                </div>

                {/* Floating cards */}
                <div className="absolute inset-0">
                  {data.floatingCards?.map(
                    (card, index) => (
                      <FloatingCard
                        key={`${card.type}-${index}`}
                        card={card}
                      />
                    )
                  )}
                </div>

                {/* Decorative play button */}
                <div
                  className="absolute left-[12%] top-[48%] z-20 hidden h-16 w-16 items-center justify-center rounded-full border border-white/60 bg-white/25 text-white shadow-lg backdrop-blur-md lg:flex"
                >
                  <Play className="ml-1 h-6 w-6 fill-current" />
                </div>

                {/* Small decorative marks */}
                <div
                  className="absolute right-[16%] top-[16%] z-20 hidden lg:block"
                  style={{
                    color: "var(--tenant-primary)",
                  }}
                >
                  <span className="block h-3 w-3 rounded-full" />
                  <div className="flex gap-2">
                    <span className="h-2 w-2 rounded-full bg-current" />
                    <span className="h-2 w-2 rounded-full bg-current" />
                    <span className="h-2 w-2 rounded-full bg-current" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        {data.stats &&
          data.stats.length > 0 && (
            <div className="relative z-50 -mt-8 px-4 pb-10 sm:px-10">
              <div className="grid overflow-hidden rounded-[24px] border border-white/80 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
                {data.stats.slice(0, 4).map(
                  (stat, index) => (
                    <div
                      key={`${stat.label}-${index}`}
                      className="flex items-center gap-4 border-b border-slate-100 px-6 py-6 last:border-b-0 sm:px-8 lg:border-b-0 lg:border-r lg:last:border-r-0"
                    >
                      <StatIcon type={stat.icon} />

                      <div>
                        <p
                          className="text-2xl font-bold tracking-tight"
                          style={{
                            color:
                              "var(--tenant-primary)",
                          }}
                        >
                          {stat.value}
                        </p>

                        <p className="mt-0.5 text-sm font-semibold text-slate-800">
                          {stat.label}
                        </p>

                        {stat.description && (
                          <p className="mt-0.5 text-xs text-slate-400">
                            {stat.description}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
      </div>
    </section>
  );
}