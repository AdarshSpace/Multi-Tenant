// A standard modern education landing page.

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Play, Radio, ShieldCheck, Star, Users,} from "lucide-react";
import { HeroFeature, HeroFloatingCard, HeroStat, HeroData } from "./types";


const featureIconMap = {
  instructor: Users,
  "live-class": Radio,
  certificate: ShieldCheck,
};

const statIconMap = {
  students: Users,
  instructors: BookOpen,
  courses: Play,
  success: ShieldCheck,
};

function FeatureIcon({ type }: { type: HeroFeature["icon"] }) {
  const Icon = featureIconMap[type];

  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--tenant-primary) 8%, white)",
        color: "var(--tenant-primary)",
      }}
    >
      <Icon className="h-4 w-4" strokeWidth={2} />
    </div>
  );
}

function StatIcon({ type }: { type: HeroStat["icon"] }) {
  const Icon = statIconMap[type];

  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--tenant-primary) 8%, white)",
        color: "var(--tenant-primary)",
      }}
    >
      <Icon className="h-5 w-5" strokeWidth={2} />
    </div>
  );
}

function HeroTitle({ title, highlightedText,}: { title: string; highlightedText?: string; }) {
  if (!highlightedText || !title.includes(highlightedText)) {
    return <>{title}</>;
  }

  const [beforeHighlight, afterHighlight] =
    title.split(highlightedText);

  return (
    <>
      {beforeHighlight}

      <span
        className="relative inline-block bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--tenant-primary), color-mix(in srgb, var(--tenant-primary) 75%, white))",
        }}
      >
        {highlightedText}

        <span
          aria-hidden="true"
          className="absolute -bottom-2 left-[42%] h-[4px] w-[82px] -rotate-[3deg] rounded-full"
          style={{
            backgroundColor: "var(--tenant-primary)",
          }}
        />
      </span>

      {afterHighlight}
    </>
  );
}

function FloatingCard({ card,}: {  card: HeroFloatingCard;}) {
  const primaryColor = "var(--tenant-primary)";

  const softPrimaryBackground =
    "color-mix(in srgb, var(--tenant-primary) 8%, white)";

  const lightPrimaryBackground =
    "color-mix(in srgb, var(--tenant-primary) 14%, white)";

  switch (card.type) {
    case "live-class":
      return (
        <div className="absolute -left-8 top-8 z-20 hidden w-[170px] rounded-2xl border border-white/80 bg-white px-4 py-3 shadow-[0_12px_35px_rgba(30,41,59,0.12)] lg:block">
          <div className="flex items-start gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
              style={{
                backgroundColor: primaryColor,
              }}
            >
              <Users className="h-4 w-4" />
            </div>

            <div>
              {card.title && (
                <p className="text-xs font-semibold text-slate-900">
                  {card.title}
                </p>
              )}

              {card.description && (
                <p className="mt-1 text-[10px] leading-4 text-slate-500">
                  {card.description}
                </p>
              )}
            </div>
          </div>
        </div>
      );

    case "video-lessons":
      return (
        <div className="absolute -right-8 top-10 z-20 hidden w-[145px] rounded-2xl border border-white/80 bg-white px-4 py-3 shadow-[0_12px_35px_rgba(30,41,59,0.12)] lg:block">
          <div className="flex items-start gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
              style={{
                backgroundColor: primaryColor,
              }}
            >
              <Play className="ml-0.5 h-4 w-4 fill-current" />
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

              {card.title && (
                <p className="text-[10px] text-slate-500">
                  {card.title}
                </p>
              )}
            </div>
          </div>
        </div>
      );

    case "certificate":
      return (
        <div className="absolute -right-8 bottom-12 z-20 hidden w-[155px] rounded-2xl border border-white/80 bg-white px-4 py-3 shadow-[0_12px_35px_rgba(30,41,59,0.12)] lg:block">
          <div className="flex items-start gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              style={{
                backgroundColor: lightPrimaryBackground,
                color: primaryColor,
              }}
            >
              <CheckCircle2 className="h-5 w-5" />
            </div>

            <div>
              {card.title && (
                <p className="text-xs font-semibold text-slate-900">
                  {card.title}
                </p>
              )}

              {card.description && (
                <p className="mt-1 text-[10px] leading-4 text-slate-500">
                  {card.description}
                </p>
              )}
            </div>
          </div>
        </div>
      );

    case "rating":
      return (
        <div className="absolute -left-8 bottom-4 z-20 hidden rounded-2xl border border-white/80 bg-white px-4 py-3 shadow-[0_12px_35px_rgba(30,41,59,0.12)] lg:block">
          <div className="flex items-center gap-3">
            {/* User avatars */}
            <div className="flex -space-x-2">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-semibold"
                style={{
                  backgroundColor: softPrimaryBackground,
                  color: primaryColor,
                }}
              >
                A
              </div>

              <div
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-semibold"
                style={{
                  backgroundColor: lightPrimaryBackground,
                  color: primaryColor,
                }}
              >
                R
              </div>

              <div
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-semibold"
                style={{
                  backgroundColor: softPrimaryBackground,
                  color: primaryColor,
                }}
              >
                S
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1">
                {card.value && (
                  <span
                    className="text-sm font-semibold"
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
                <p className="mt-0.5 text-[10px] text-slate-500">
                  {card.description}
                </p>
              )}
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function HeroVariant1({
  data,
}: {
  data: HeroData;
}) {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-180px] top-[160px] h-[360px] w-[360px] rounded-full blur-3xl"
        style={{
          backgroundColor: "color-mix(in srgb, var(--tenant-primary) 12%, transparent)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-180px] top-[40px] h-[420px] w-[420px] rounded-full blur-3xl"
        style={{
          backgroundColor: "color-mix(in srgb, var(--tenant-primary) 10%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-14 sm:px-8 lg:px-10 lg:pb-20 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-12 xl:gap-16">
          
          {/* LEFT CONTENT */}
          <div className="relative z-10 max-w-2xl">
            
            {data.badge && (
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium"
                style={{
                  borderColor:
                    "color-mix(in srgb, var(--tenant-primary) 15%, white)",
                  backgroundColor:
                    "color-mix(in srgb, var(--tenant-primary) 7%, white)",
                  color: "var(--tenant-primary)",
                }}
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm"
                  style={{
                    color: "var(--tenant-primary)",
                  }}
                >
                  ★
                </span>

                {data.badge}
              </div>
            )}

            <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-[64px]">
              <HeroTitle
                title={data.title}
                highlightedText={data.highlightedText}
              />
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-slate-500 sm:text-lg">
              {data.description}
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={data.primaryButtonLink}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "var(--tenant-primary)",
                  boxShadow:
                    "0 10px 25px color-mix(in srgb, var(--tenant-primary) 25%, transparent)",
                }}
              >
                <BookOpen className="h-4 w-4" />

                {data.primaryButtonText}

                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              {data.secondaryButtonText &&
                data.secondaryButtonLink && (
                  <Link
                    href={data.secondaryButtonLink}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <Users className="h-4 w-4" />

                    {data.secondaryButtonText}
                  </Link>
                )}
            </div>

            {/* Features */}
            {data.features && data.features.length > 0 && (
              <div className="mt-9 grid max-w-2xl grid-cols-1 gap-2.5 sm:grid-cols-3">
                {data.features.map((feature, index) => (
                  <div
                    key={`${feature.title}-${index}`}
                    className="flex min-h-[66px] items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-3 py-3 shadow-[0_5px_20px_rgba(15,23,42,0.035)]"
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, var(--tenant-primary) 8%, white)",
                        color: "var(--tenant-primary)",
                      }}
                    >
                      <FeatureIcon type={feature.icon} />
                    </div>

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

          {/* RIGHT IMAGE */}
          {/* RIGHT IMAGE */}
<div className="relative mx-auto w-full max-w-[650px] lg:ml-auto">
  <div
    aria-hidden="true"
    className="absolute left-[8%] top-[5%] h-[88%] w-[82%] rotate-[-8deg] rounded-[35%]"
    style={{
      background:
        "linear-gradient(135deg, color-mix(in srgb, var(--tenant-primary) 18%, white), color-mix(in srgb, var(--tenant-primary) 5%, white), white)",
    }}
  />

  <div
    aria-hidden="true"
    className="absolute left-[15%] top-[10%] h-[78%] w-[72%] rounded-[40%] border"
    style={{
      borderColor: "color-mix(in srgb, var(--tenant-primary) 12%, white)",
    }}
  />

  <div
    className="relative z-10 mx-auto aspect-[1.08/1] w-[82%] overflow-hidden bg-slate-100 shadow-[0_25px_70px_rgba(30,41,59,0.12)] sm:w-[78%] lg:w-[82%]"
    style={{
      borderRadius: "90% 90% 40% 60% / 90% 100% 50% 50%",
    }}
  >
    <Image
      src="/teacher 2.jpg"
      alt={data.imageAlt}
      fill
      priority
      sizes="(max-width: 640px) 75vw, (max-width: 1024px) 55vw, 42vw"
      className="object-cover"
    />
  </div>

  {data.floatingCards?.map((card, index) => (
    <FloatingCard key={`${card.type}-${index}`} card={card} />
  ))}
</div>
        </div>

        {/* STATS */}
        {data.stats && data.stats.length > 0 && (
          <div className="relative z-20 mx-auto mt-14 max-w-6xl rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_15px_45px_rgba(15,23,42,0.07)] sm:p-5 lg:mt-20">
            <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 lg:grid-cols-4 lg:divide-y-0">
              {data.stats.map((stat, index) => (
                <div
                  key={`${stat.label}-${index}`}
                  className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:justify-center lg:py-3"
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, var(--tenant-primary) 8%, white)",
                      color: "var(--tenant-primary)",
                    }}
                  >
                    <StatIcon type={stat.icon} />
                  </div>

                  <div>
                    <p
                      className="text-xl font-bold tracking-tight sm:text-2xl"
                      style={{
                        color: "var(--tenant-primary)",
                      }}
                    >
                      {stat.value}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}