import { HeroData, heroProps } from "./types";
import HeroVariant1 from "./HeroVariant1";
import HeroVariant2 from "./HeroVariant2";
import HeroVariant3 from "./HeroVariant3";



export default function Hero({ section }: { section: heroProps }) {
  switch (section.variant) {
    case "hero-1":
      return <HeroVariant1 data={section.data} />;

    case "hero-2":
      return <HeroVariant2 data={section.data} />;

    case "hero-3":
      return null;

    default:
      return null;
  }
}