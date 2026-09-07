import {HeroData} from "../LandPage/Hero/types"
import HeroVariant1 from "../LandPage/Hero/HeroVariant1"
import HeroVariant2 from "../LandPage/Hero/HeroVariant2"

export function HeroPreview({ section, variant }: { section: HeroData, variant: string }) {
    switch (variant) {
        case "hero-1":
          return <HeroVariant1 data={section} />;
    
        case "hero-2":
          return <HeroVariant2 data={section} />;
    
        case "hero-3":
          return null;
    
        default:
          return null;
      }
  }
  
export function FullHeroPreview({ hero, variant, }: { hero: HeroData; variant: string; }) {
    switch (variant) {
        case "hero-1":
          return <HeroVariant1 data={hero} />;
    
        case "hero-2":
          return <HeroVariant2 data={hero} />;
    
        case "hero-3":
          return null;
    
        default:
          return null;
      }
  }
  
 export function PreviewSection({ title }: { title: string }) {
    return (
      <section className="px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-semibold text-[#635bff]">
              EXPLORE
            </p>
  
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              {title}
            </h2>
          </div>
  
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-52 rounded-2xl border border-slate-200 bg-slate-50"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }