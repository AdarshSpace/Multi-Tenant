// This gives the tenant a more visually powerful option.

import Image from "next/image";
import Link from "next/link";
import { HeroData } from "./types";

interface Props {
  data: HeroData;
}

export default function HeroVariant3({ data }: Props) {
  return (
    <section className="relative min-h-[650px] overflow-hidden">
      
      {/* Background Image */}
      {data.imageUrl && (
        <Image
          src={data.imageUrl}
          alt={data.imageAlt || data.title}
          fill
          priority
          className="object-cover"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[650px] max-w-7xl items-center px-6 py-20 lg:px-8">
        <div className="max-w-3xl text-white">
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
            {data.title}
          </h1>

          {data.description && (
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
              {data.description}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            {data.primaryButtonText && data.primaryButtonLink && (
              <Link
                href={data.primaryButtonLink}
                className="rounded-lg bg-white px-6 py-3 font-medium text-gray-900 transition hover:bg-gray-100"
              >
                {data.primaryButtonText}
              </Link>
            )}

            {data.secondaryButtonText && data.secondaryButtonLink && (
              <Link
                href={data.secondaryButtonLink}
                className="rounded-lg border border-white/50 px-6 py-3 font-medium text-white transition hover:bg-white/10"
              >
                {data.secondaryButtonText}
              </Link>
            )}
          </div>

        </div>
      </div>

    </section>
  );
}