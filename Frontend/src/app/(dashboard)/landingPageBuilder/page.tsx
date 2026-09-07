"use client";

import { useState } from "react";
import {HeroFeature, HeroFloatingCard, HeroData, HeroStat } from "@/components/LandPage/Hero/types"
import { SimpleSection,  } from "@/components/landingPageBuilder/InputReusable";
import {HeroForm} from "@/components/landingPageBuilder/Heroform"
import {HeroPreview, FullHeroPreview, PreviewSection } from "@/components/landingPageBuilder/preview"
import { Eye, Save, Sparkles, BookOpen, Video, FileText, Settings, X} from "lucide-react";


const initialHero: HeroData = {
  badge: "Your Partner in Learning & Growth",
  title: "Learn From Industry Experts",
  highlightedText: "Industry Experts",
  description:
    "Build real-world skills through structured courses, live classes, and hands-on learning.",
  primaryButtonText: "Explore Courses",
  primaryButtonLink: "/courses",
  secondaryButtonText: "Join Now",
  secondaryButtonLink: "/register",
  imageUrl:
    "https://ik.imagekit.io/s8amuuyxt/Blender_3BSS26BQt.webp?updatedAt=1786322440200",
  imageAlt: "Students learning together",

  features: [
    {
      icon: "instructor",
      title: "Expert Instructors",
      description: "Learn from the best",
    },
    {
      icon: "live-class",
      title: "Live Interactive Classes",
      description: "Learn. Ask. Grow.",
    },
    {
      icon: "certificate",
      title: "Certification",
      description: "Boost your career",
    },
  ],

  floatingCards: [
    {
      type: "live-class",
      title: "Live Classes",
      description: "Join interactive sessions",
    },
    {
      type: "video-lessons",
      title: "Video Lessons",
      value: "20K+",
    },
    {
      type: "certificate",
      title: "Certified",
      description: "Complete & get certified",
    },
    {
      type: "rating",
      value: "4.8/5",
      description: "Loved by 20,000+ students",
    },
  ],

  stats: [
    {
      value: "25K+",
      label: "Happy Students",
      icon: "students",
    },
    {
      value: "350+",
      label: "Expert Instructors",
      icon: "instructors",
    },
    {
      value: "1200+",
      label: "Courses",
      icon: "courses",
    },
    {
      value: "98%",
      label: "Success Rate",
      icon: "success",
    },
  ],
};

const variants = ["hero-1", "hero-2", "hero-3"];

export default function LandingPageBuilder() {
  const [activeTab, setActiveTab] = useState("hero");
  const [hero, setHero] = useState(initialHero);
  const [heroVariant, setHeroVariant] = useState("hero-1");
  const [heroEnabled, setHeroEnabled] = useState(true);
  const [showPreview, setShowPreview] = useState(false);`1 `

  const updateHero = <K extends keyof HeroData>(
    key: K,
    value: HeroData[K]
  ) => {
    setHero((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateFeature = (
    index: number,
    key: keyof HeroFeature,
    value: string
  ) => {
    const features = [...hero.features];
    features[index] = {
      ...features[index],
      [key]: value,
    };

    updateHero("features", features);
  };

  const addFeature = () => {
    updateHero("features", [
      ...hero.features,
      {
        icon: "instructor",
        title: "",
        description: "",
      },
    ]);
  };

  const removeFeature = (index: number) => {
    updateHero(
      "features",
      hero.features.filter((_, i) => i !== index)
    );
  };

  const updateFloatingCard = (
    index: number,
    key: keyof HeroFloatingCard,
    value: string
  ) => {
    const cards = [...hero.floatingCards];

    cards[index] = {
      ...cards[index],
      [key]: value,
    };

    updateHero("floatingCards", cards);
  };

  const addFloatingCard = () => {
    updateHero("floatingCards", [
      ...hero.floatingCards,
      {
        type: "live-class",
        title: "",
        description: "",
      },
    ]);
  };

  const removeFloatingCard = (index: number) => {
    updateHero(
      "floatingCards",
      hero.floatingCards.filter((_, i) => i !== index)
    );
  };

  const updateStat = (
    index: number,
    key: keyof HeroStat,
    value: string
  ) => {
    const stats = [...hero.stats];

    stats[index] = {
      ...stats[index],
      [key]: value,
    };

    updateHero("stats", stats);
  };

  const addStat = () => {
    updateHero("stats", [
      ...hero.stats,
      {
        value: "",
        label: "",
        icon: "students",
      },
    ]);
  };

  const removeStat = (index: number) => {
    updateHero(
      "stats",
      hero.stats.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      <div className="min-h-screen bg-[#fafbff]">
        {/* Header */}
        <div className="border-b border-slate-200 bg-white">
          <div className="px-8 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                  Landing Page Builder
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Customize your landing page sections and content
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPreview(true)}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Eye className="h-4 w-4" />
                  Preview Landing Page
                </button>

                <button className="flex items-center gap-2 rounded-lg bg-[#635bff] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#554df0]">
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-7 flex gap-7">
              {[
                [Sparkles, "hero", "Hero Section"],
                [BookOpen, "courses", "Course Card"],
                [Video, "live", "Live Class Card"],
                [FileText, "footer", "Footer"],
                [Settings, "settings", "General Settings"],
              ].map(([Icon, id, label]: any) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`relative flex items-center gap-2 pb-4 text-sm font-medium ${
                    activeTab === id
                      ? "text-[#635bff]"
                      : "text-slate-500"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}

                  {activeTab === id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#635bff]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 p-8 xl:grid-cols-[460px_minmax(0,1fr)]">
          {/* FORM */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            {activeTab === "hero" && (
              <HeroForm
                hero={hero}
                heroVariant={heroVariant}
                heroEnabled={heroEnabled}
                setHeroVariant={setHeroVariant}
                setHeroEnabled={setHeroEnabled}
                updateHero={updateHero}
                updateFeature={updateFeature}
                addFeature={addFeature}
                removeFeature={removeFeature}
                updateFloatingCard={updateFloatingCard}
                addFloatingCard={addFloatingCard}
                removeFloatingCard={removeFloatingCard}
                updateStat={updateStat}
                addStat={addStat}
                removeStat={removeStat}
              />
            )}

            {activeTab === "courses" && (
              <SimpleSection
                title="Course Card"
                description="Select the course card design for your landing page."
              />
            )}

            {activeTab === "live" && (
              <SimpleSection
                title="Live Class Card"
                description="Select the live class card design."
              />
            )}

            {activeTab === "footer" && (
              <SimpleSection
                title="Footer"
                description="Choose a footer variant and customize your details."
              />
            )}

            {activeTab === "settings" && (
              <SimpleSection
                title="General Settings"
                description="Configure general landing page settings."
              />
            )}
          </div>

          {/* LIVE PREVIEW */}
          <div className="min-w-0 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-semibold text-slate-900">
                Live Preview
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Changes will appear in your landing page preview.
              </p>
            </div>

            <div className="p-5">
              <HeroPreview section={hero} variant={heroVariant}/>
            </div>
          </div>
        </div>
      </div>

      {/* FULL LANDING PAGE PREVIEW */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-white">
          <div className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
            <div>
              <p className="font-semibold text-slate-900">
                Landing Page Preview
              </p>
              <p className="text-xs text-slate-500">
                This is how your public landing page will look.
              </p>
            </div>

            <button
              onClick={() => setShowPreview(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Entire Landing Page */}
          <div>
            {heroEnabled && (
              <FullHeroPreview
                hero={hero}
                variant={heroVariant}
              />
            )}

            {/* Placeholder for your actual sections */}
            <PreviewSection title="Popular Courses" />
            <PreviewSection title="Live Interactive Classes" />
            <PreviewSection title="Learn From Expert Instructors" />

            <footer className="border-t bg-slate-950 px-8 py-16 text-white">
              <div className="mx-auto max-w-6xl">
                <h3 className="text-xl font-semibold">
                  Motionkart Academy
                </h3>

                <p className="mt-3 max-w-lg text-sm text-slate-400">
                  Empowering learners with industry-grade skills and
                  interactive learning experiences.
                </p>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}