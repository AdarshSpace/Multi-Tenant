import { Trash2, Check } from "lucide-react";
import { Toggle, Input, Textarea, EditorGroup } from "./InputReusable";
import { HeroFeature, HeroFloatingCard, HeroStat } from "../LandPage/Hero/types";

const variants = ["hero-1", "hero-2", "hero-3"] as const;

export function HeroForm({ hero, heroVariant, heroEnabled, setHeroVariant, setHeroEnabled, updateHero, updateFeature,
    addFeature, removeFeature, updateFloatingCard, addFloatingCard, removeFloatingCard, updateStat, addStat, removeStat, }: any) {
    return (
      <>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Hero Section
          </h2>
  
          <p className="mt-1 text-sm text-slate-500">
            Select a variant and customize all hero content.
          </p>
        </div>
  
        {/* Enable */}
        <div className="mt-5 flex items-center justify-between border-b pb-5">
          <span className="text-sm font-medium">
            Enable Hero Section
          </span>
  
          <Toggle
            checked={heroEnabled}
            onChange={setHeroEnabled}
          />
        </div>
  
        {/* Variants */}
        <div className="mt-5">
          <label className="mb-3 block text-sm font-medium">
            Select Hero Variant
          </label>
  
          <div className="grid grid-cols-3 gap-3">
            {variants.map((variant) => (
              <button
                key={variant}
                onClick={() => setHeroVariant(variant)}
                className={`relative h-24 rounded-lg border-2 p-2 ${
                  heroVariant === variant
                    ? "border-[#635bff]"
                    : "border-slate-200"
                }`}
              >
                {heroVariant === variant && (
                  <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#635bff] text-white">
                    <Check className="h-3 w-3" />
                  </span>
                )}
  
                <div className="h-full rounded bg-slate-50 p-2">
                  <div className="h-2 w-1/2 rounded bg-slate-300" />
                  <div className="mt-3 h-3 w-3/4 rounded bg-slate-200" />
                  <div className="mt-2 h-2 w-1/2 rounded bg-slate-200" />
                </div>
  
                <span className="absolute bottom-1 left-0 right-0 text-[10px]">
                  {variant}
                </span>
              </button>
            ))}
          </div>
        </div>
  
        {/* Basic Information */}
        <div className="mt-7 space-y-5">
          <Input
            label="Badge"
            value={hero.badge}
            onChange={(value) => updateHero("badge", value)}
          />
  
          <Input
            label="Title"
            value={hero.title}
            onChange={(value) => updateHero("title", value)}
          />
  
          <Input
            label="Highlighted Text"
            value={hero.highlightedText}
            onChange={(value) =>
              updateHero("highlightedText", value)
            }
          />
  
          <Textarea
            label="Description"
            value={hero.description}
            onChange={(value) =>
              updateHero("description", value)
            }
          />
  
          <div>
            <label className="mb-2 block text-sm font-medium">
              Primary Button
            </label>
  
            <div className="grid grid-cols-2 gap-3">
              <Input
                value={hero.primaryButtonText}
                onChange={(value) =>
                  updateHero("primaryButtonText", value)
                }
              />
  
              <Input
                value={hero.primaryButtonLink}
                onChange={(value) =>
                  updateHero("primaryButtonLink", value)
                }
              />
            </div>
          </div>
  
          <div>
            <label className="mb-2 block text-sm font-medium">
              Secondary Button
            </label>
  
            <div className="grid grid-cols-2 gap-3">
              <Input
                value={hero.secondaryButtonText}
                onChange={(value) =>
                  updateHero("secondaryButtonText", value)
                }
              />
  
              <Input
                value={hero.secondaryButtonLink}
                onChange={(value) =>
                  updateHero("secondaryButtonLink", value)
                }
              />
            </div>
          </div>
  
          <Input
            label="Image URL"
            value={hero.imageUrl}
            onChange={(value) => updateHero("imageUrl", value)}
          />
  
          <Input
            label="Image Alt Text"
            value={hero.imageAlt}
            onChange={(value) => updateHero("imageAlt", value)}
          />
        </div>
  
        {/* Features */}
        <EditorGroup title="Features" onAdd={addFeature}>
          {hero.features.map((feature: HeroFeature, index: number) => (
            <div
              key={index}
              className="rounded-lg border border-slate-200 p-4"
            >
              <div className="mb-3 flex justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Feature {index + 1}
                </span>
  
                <button
                  onClick={() => removeFeature(index)}
                  className="text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
  
              <div className="space-y-3">
                <Input
                  label="Icon"
                  value={feature.icon}
                  onChange={(value) =>
                    updateFeature(index, "icon", value)
                  }
                />
  
                <Input
                  label="Title"
                  value={feature.title}
                  onChange={(value) =>
                    updateFeature(index, "title", value)
                  }
                />
  
                <Input
                  label="Description"
                  value={feature.description}
                  onChange={(value) =>
                    updateFeature(index, "description", value)
                  }
                />
              </div>
            </div>
          ))}
        </EditorGroup>
  
        {/* Floating Cards */}
        <EditorGroup
          title="Floating Cards"
          onAdd={addFloatingCard}
        >
          {hero.floatingCards.map(
            (card: HeroFloatingCard, index: number) => (
              <div
                key={index}
                className="rounded-lg border border-slate-200 p-4"
              >
                <div className="mb-3 flex justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    Floating Card {index + 1}
                  </span>
  
                  <button
                    onClick={() => removeFloatingCard(index)}
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
  
                <div className="space-y-3">
                  <Input
                    label="Type"
                    value={card.type}
                    onChange={(value) =>
                      updateFloatingCard(index, "type", value)
                    }
                  />
  
                  <Input
                    label="Title"
                    value={card.title || ""}
                    onChange={(value) =>
                      updateFloatingCard(index, "title", value)
                    }
                  />
  
                  <Input
                    label="Value"
                    value={card.value || ""}
                    onChange={(value) =>
                      updateFloatingCard(index, "value", value)
                    }
                  />
  
                  <Input
                    label="Description"
                    value={card.description || ""}
                    onChange={(value) =>
                      updateFloatingCard(
                        index,
                        "description",
                        value
                      )
                    }
                  />
                </div>
              </div>
            )
          )}
        </EditorGroup>
  
        {/* Stats */}
        <EditorGroup title="Stats" onAdd={addStat}>
          {hero.stats.map((stat: HeroStat, index: number) => (
            <div
              key={index}
              className="rounded-lg border border-slate-200 p-4"
            >
              <div className="mb-3 flex justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Stat {index + 1}
                </span>
  
                <button
                  onClick={() => removeStat(index)}
                  className="text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
  
              <div className="space-y-3">
                <Input
                  label="Value"
                  value={stat.value}
                  onChange={(value) =>
                    updateStat(index, "value", value)
                  }
                />
  
                <Input
                  label="Label"
                  value={stat.label}
                  onChange={(value) =>
                    updateStat(index, "label", value)
                  }
                />
  
                <Input
                  label="Icon"
                  value={stat.icon}
                  onChange={(value) =>
                    updateStat(index, "icon", value)
                  }
                />
              </div>
            </div>
          ))}
        </EditorGroup>
      </>
    );
  }