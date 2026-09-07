export interface HeroFeature {
  icon: "instructor" | "live-class" | "certificate";
  title: string;
  description: string;
}

export interface HeroFloatingCard {
  type: "live-class" | "video-lessons" | "certificate" | "rating";
  title?: string;
  description?: string;
  value?: string;
}

export interface HeroStat {
  value: string;
  label: string;
  description?: string;
  icon: "students" | "instructors" | "courses" | "success";
}

export interface HeroData {
  badge?: string;

  title: string;

  highlightedText?: string;

  description: string;

  primaryButtonText: string;
  primaryButtonLink: string;

  secondaryButtonText?: string;
  secondaryButtonLink?: string;

  imageUrl: string;
  imageAlt: string;

  features?: HeroFeature[];

  floatingCards?: HeroFloatingCard[];

  stats?: HeroStat[];
}

export interface heroProps {
  type: "hero";

  variant: "hero-1" | "hero-2" | "hero-3";

  data: HeroData;
}