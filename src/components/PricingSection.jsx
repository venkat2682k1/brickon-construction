import React, { useMemo, useState } from "react";
import { pricingTiers } from "../data/companyData";
import {
  Check,
  ArrowUpRight,
  Calculator,
  ShieldCheck,
  Sparkles,
  Building2,
  Ruler,
  Layers3,
} from "lucide-react";

/* =========================================================
   PRICING SECTION
   Premium / International Construction Website Style
========================================================= */

export const PricingSection = ({
  onNavigate,
  onOpenProjectModalWithEstimate,
}) => {
  const [projectType, setProjectType] = useState("luxury_villa");
  const [areaSqFt, setAreaSqFt] = useState(3500);
  const [finishQuality, setFinishQuality] = useState("premium");
  const [floors, setFloors] = useState(2);

  const [addons, setAddons] = useState({
    smartHome: true,
    solarPanels: true,
    landscaping: false,
    interiorDesign: true,
    rainwaterHarvesting: true,
    basementParking: false,
  });

  /* =========================================================
     ADDON TOGGLE
  ========================================================= */

  const toggleAddon = (key) => {
    setAddons((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  /* =========================================================
     CALCULATION
  ========================================================= */

  const calculation = useMemo(() => {
    let rate = 2350;

    if (finishQuality === "standard") {
      rate = 1850;
    }

    if (finishQuality === "ultra_luxury") {
      rate = 3150;
    }

    if (projectType === "commercial_office") {
      rate *= 1.08;
    }

    if (projectType === "industrial_warehouse") {
      rate *= 0.75;
    }

    if (projectType === "duplex_home") {
      rate *= 1.03;
    }

    /* Floor adjustment */

    if (floors >= 4) {
      rate *= 1.08;
    }

    const baseConstructionCost = Math.round(areaSqFt * rate);

    let addonTotal = 0;

    if (addons.smartHome) {
      addonTotal += 280000;
    }

    if (addons.solarPanels) {
      addonTotal += 350000;
    }

    if (addons.landscaping) {
      addonTotal += 220000;
    }

    if (addons.interiorDesign) {
      addonTotal += Math.round(areaSqFt * 450);
    }

    if (addons.rainwaterHarvesting) {
      addonTotal += 140000;
    }

    if (addons.basementParking) {
      addonTotal += Math.round(areaSqFt * 0.3 * 1600);
    }

    const architecturalAndApprovals = Math.round(
      baseConstructionCost * 0.04
    );

    const grandTotal =
      baseConstructionCost +
      addonTotal +
      architecturalAndApprovals;

    let months = 8;

    if (areaSqFt > 2000) months = 10;
    if (areaSqFt > 4000) months = 12;
    if (areaSqFt > 7000) months = 15;
    if (areaSqFt > 15000) months = 20;

    return {
      baseConstructionCost,
      addonTotal,
      architecturalAndApprovals,
      grandTotal,
      effectiveRatePerSqFt: Math.round(grandTotal / areaSqFt),
      timelineMonths: months,
    };
  }, [
    projectType,
    areaSqFt,
    finishQuality,
    floors,
    addons,
  ]);

  /* =========================================================
     ESTIMATE HANDLER
  ========================================================= */

  const handleApplyEstimate = () => {
    const summary = `
Estimated ${areaSqFt.toLocaleString()} Sq.Ft
${projectType.replaceAll("_", " ").toUpperCase()}
with ${finishQuality.replaceAll("_", " ").toUpperCase()} finish.

Approximate investment:
₹${(calculation.grandTotal / 100000).toFixed(2)} Lakhs

Estimated timeline:
${calculation.timelineMonths}–${calculation.timelineMonths + 2} months.
`;

    if (onOpenProjectModalWithEstimate) {
      onOpenProjectModalWithEstimate(summary);
    } else if (onNavigate) {
      onNavigate("contact");
    }
  };

  /* =========================================================
     PROJECT TYPES
  ========================================================= */

  const projectTypes = [
    {
      id: "luxury_villa",
      label: "Luxury Villa",
      icon: Building2,
    },
    {
      id: "residential_standard",
      label: "Private Residence",
      icon: Building2,
    },
    {
      id: "duplex_home",
      label: "Duplex Residence",
      icon: Building2,
    },
    {
      id: "commercial_office",
      label: "Commercial",
      icon: Layers3,
    },
    {
      id: "industrial_warehouse",
      label: "Industrial / PEB",
      icon: Layers3,
    },
  ];

  /* =========================================================
     FINISH LEVELS
  ========================================================= */

  const finishLevels = [
    {
      id: "standard",
      label: "Essential",
      price: "₹1,850",
    },
    {
      id: "premium",
      label: "Premium",
      price: "₹2,350",
    },
    {
      id: "ultra_luxury",
      label: "Signature",
      price: "₹3,150",
    },
  ];

  /* =========================================================
     ADDONS
  ========================================================= */

  const addonOptions = [
    {
      key: "smartHome",
      label: "Smart Home Automation",
      cost: "+ ₹2.8L",
    },
    {
      key: "solarPanels",
      label: "Rooftop Solar PV",
      cost: "+ ₹3.5L",
    },
    {
      key: "landscaping",
      label: "Landscape & Water Feature",
      cost: "+ ₹2.2L",
    },
    {
      key: "interiorDesign",
      label: "Turnkey Interior Fit-out",
      cost: "+ ₹450/sq.ft",
    },
    {
      key: "rainwaterHarvesting",
      label: "Rainwater Harvesting",
      cost: "+ ₹1.4L",
    },
    {
      key: "basementParking",
      label: "Basement Parking",
      cost: "Custom",
    },
  ];

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="
        relative overflow-hidden
        bg-[#F7F5F1]
        text-[#202020]
        border-t border-[#E6E1D9]
        py-20 sm:py-28
      "
    >
      {/* =====================================================
          SUBTLE BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="
            absolute -top-32 -right-32
            w-96 h-96
            rounded-full
            bg-[#C35A3E]/5
            blur-3xl
          "
        />

        <div
          className="
            absolute -bottom-40 -left-40
            w-96 h-96
            rounded-full
            bg-[#C35A3E]/5
            blur-3xl
          "
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        {/* =====================================================
            SEO HEADER
        ===================================================== */}

        <header className="max-w-4xl mb-14 animate-[fadeUp_.7s_ease-out]">

          <div className="flex items-center gap-3 mb-4">

            <span
              className="
                w-9 h-px
                bg-[#C35A3E]
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#C35A3E]
              "
            >
              Construction Pricing
            </span>

          </div>

          <h2
            id="pricing-heading"
            className="
              text-3xl
              sm:text-5xl
              lg:text-6xl
              font-semibold
              tracking-[-0.03em]
              leading-[1.05]
              text-[#1E1E1E]
            "
          >
            Construction Costs,
            <br />

            <span className="font-light italic text-[#C35A3E]">
              Clearly Defined.
            </span>
          </h2>

          <p
            className="
              mt-6
              max-w-2xl
              text-sm
              sm:text-base
              text-[#68645E]
              font-light
              leading-7
            "
          >
            Explore transparent construction pricing for luxury homes,
            private residences, commercial spaces and architectural
            projects. Build your project around your requirements,
            finish level and investment range.
          </p>

        </header>

        {/* =====================================================
            PRICING TIERS
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
            lg:gap-6
            mb-20
          "
        >

          {pricingTiers.map((tier, index) => {

            const isHighlighted = tier.id === "premium";

            return (
              <article
                key={tier.id}
                className={`
                  group
                  relative
                  flex
                  flex-col
                  bg-white
                  border
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                  animate-[fadeUp_.7s_ease-out]
                  ${
                    isHighlighted
                      ? "border-[#C35A3E]/50 shadow-[0_10px_40px_rgba(195,90,62,0.08)]"
                      : "border-[#E4E0D9]"
                  }
                `}
                style={{
                  animationDelay: `${index * 120}ms`,
                }}
              >

                {/* Accent line */}

                <div
                  className={`
                    absolute
                    top-0
                    left-0
                    right-0
                    h-[2px]
                    ${
                      isHighlighted
                        ? "bg-[#C35A3E]"
                        : "bg-transparent group-hover:bg-[#C35A3E]/40"
                    }
                  `}
                />

                {/* Recommended */}

                {tier.badge && (
                  <div
                    className="
                      absolute
                      top-5
                      right-5
                      px-3
                      py-1
                      bg-[#F7E9E4]
                      text-[#A84730]
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                    "
                  >
                    {tier.badge}
                  </div>
                )}

                <div className="p-7 sm:p-8">

                  <div
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-[#9A958D]
                    "
                  >
                    {tier.name}
                  </div>

                  <div className="flex items-baseline gap-1 mt-4">

                    <span
                      className="
                        text-3xl
                        sm:text-4xl
                        font-semibold
                        tracking-tight
                        text-[#1F1F1F]
                      "
                    >
                      ₹{tier.pricePerSqFt.toLocaleString()}
                    </span>

                    <span className="text-xs text-[#8A857E]">
                      / sq.ft
                    </span>

                  </div>

                  <p
                    className="
                      mt-4
                      text-sm
                      text-[#6E6962]
                      font-light
                      leading-6
                    "
                  >
                    {tier.description}
                  </p>

                  {/* Features */}

                  <div className="mt-7 pt-6 border-t border-[#ECE8E2]">

                    <div
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-[#C35A3E]
                        mb-4
                      "
                    >
                      Included
                    </div>

                    <ul className="space-y-3">

                      {tier.features
                        .slice(0, 6)
                        .map((feature, i) => (

                          <li
                            key={i}
                            className="
                              flex
                              items-start
                              gap-2.5
                              text-xs
                              text-[#66615A]
                            "
                          >

                            <Check
                              className="
                                w-4
                                h-4
                                text-[#C35A3E]
                                shrink-0
                                mt-0.5
                              "
                            />

                            <span>{feature}</span>

                          </li>

                        ))}

                    </ul>

                  </div>

                  {/* Specification */}

                  <div
                    className="
                      mt-7
                      p-4
                      bg-[#FAF9F7]
                      border
                      border-[#ECE8E2]
                    "
                  >

                    <div className="grid gap-2 text-[11px]">

                      <div>
                        <span className="text-[#9A958D]">
                          Structure
                        </span>
                        <span className="ml-2 font-medium text-[#35322F]">
                          {tier.specifications.structure}
                        </span>
                      </div>

                      <div>
                        <span className="text-[#9A958D]">
                          Flooring
                        </span>
                        <span className="ml-2 font-medium text-[#35322F]">
                          {tier.specifications.flooring}
                        </span>
                      </div>

                      <div>
                        <span className="text-[#9A958D]">
                          Windows
                        </span>
                        <span className="ml-2 font-medium text-[#35322F]">
                          {tier.specifications.doorsWindows}
                        </span>
                      </div>

                    </div>

                  </div>

                </div>

                {/* Button */}

                <div className="mt-auto px-7 sm:px-8 pb-7 sm:pb-8">

                  <button
                    type="button"
                    onClick={() => {
                      setFinishQuality(tier.id);

                      document
                        .getElementById("interactive-calculator")
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }}
                    className={`
                      w-full
                      py-3.5
                      flex
                      items-center
                      justify-center
                      gap-2
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      transition-all
                      duration-300
                      cursor-pointer
                      ${
                        isHighlighted
                          ? "bg-[#C35A3E] text-white hover:bg-[#AD4C32]"
                          : "bg-[#262626] text-white hover:bg-[#C35A3E]"
                      }
                    `}
                  >
                    Select Package

                    <ArrowUpRight className="w-3.5 h-3.5" />

                  </button>

                </div>

              </article>
            );
          })}

        </div>

        {/* =====================================================
            CALCULATOR
        ===================================================== */}

        <div
          id="interactive-calculator"
          className="
            bg-white
            border
            border-[#E2DED7]
            shadow-[0_15px_50px_rgba(0,0,0,0.05)]
            overflow-hidden
            scroll-mt-24
          "
        >

          {/* Calculator Header */}

          <div
            className="
              p-6
              sm:p-8
              lg:p-10
              border-b
              border-[#ECE8E2]
              bg-[#FCFBF9]
            "
          >

            <div className="flex items-start gap-4">

              <div
                className="
                  w-11
                  h-11
                  shrink-0
                  bg-[#F7E9E4]
                  text-[#C35A3E]
                  flex
                  items-center
                  justify-center
                "
              >

                <Calculator className="w-5 h-5" />

              </div>

              <div>

                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#C35A3E]
                  "
                >
                  Project Estimator
                </span>

                <h3
                  className="
                    mt-1
                    text-2xl
                    sm:text-3xl
                    font-semibold
                    tracking-tight
                    text-[#222]
                  "
                >
                  Build Your Estimate
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    text-[#77716A]
                    font-light
                    leading-6
                    max-w-2xl
                  "
                >
                  Adjust the specifications below to create an
                  indicative construction investment estimate.
                </p>

              </div>

            </div>

          </div>

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-12
              gap-8
              lg:gap-12
              p-6
              sm:p-8
              lg:p-10
            "
          >

            {/* =================================================
                CONTROLS
            ================================================= */}

            <div className="lg:col-span-7 space-y-8">

              {/* Project Type */}

              <div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mb-3
                  "
                >

                  <Building2
                    className="w-4 h-4 text-[#C35A3E]"
                  />

                  <label
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.15em]
                      font-bold
                      text-[#4B4742]
                    "
                  >
                    Project Type
                  </label>

                </div>

                <div
                  className="
                    grid
                    grid-cols-2
                    sm:grid-cols-3
                    gap-2
                  "
                >

                  {projectTypes.map((type) => {

                    const Icon = type.icon;

                    const active =
                      projectType === type.id;

                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() =>
                          setProjectType(type.id)
                        }
                        className={`
                          p-3
                          border
                          text-left
                          transition-all
                          duration-300
                          cursor-pointer
                          ${
                            active
                              ? "border-[#C35A3E] bg-[#FDF4F1] text-[#A84730]"
                              : "border-[#E4E0D9] bg-white text-[#68635D] hover:border-[#C8C2BA]"
                          }
                        `}
                      >

                        <Icon
                          className={`
                            w-4 h-4 mb-2
                            ${
                              active
                                ? "text-[#C35A3E]"
                                : "text-[#9A958D]"
                            }
                          `}
                        />

                        <span
                          className="
                            block
                            text-[11px]
                            font-semibold
                          "
                        >
                          {type.label}
                        </span>

                      </button>
                    );
                  })}

                </div>

              </div>

              {/* Area */}

              <div>

                <div
                  className="
                    flex
                    justify-between
                    items-center
                    mb-3
                  "
                >

                  <div className="flex items-center gap-2">

                    <Ruler
                      className="w-4 h-4 text-[#C35A3E]"
                    />

                    <label
                      className="
                        text-[10px]
                        uppercase
                        tracking-[0.15em]
                        font-bold
                        text-[#4B4742]
                      "
                    >
                      Built-up Area
                    </label>

                  </div>

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-[#C35A3E]
                    "
                  >
                    {areaSqFt.toLocaleString()} Sq.Ft
                  </span>

                </div>

                <input
                  aria-label="Built-up area"
                  type="range"
                  min="800"
                  max="25000"
                  step="100"
                  value={areaSqFt}
                  onChange={(e) =>
                    setAreaSqFt(Number(e.target.value))
                  }
                  className="
                    w-full
                    h-1.5
                    bg-[#E5E1DB]
                    rounded
                    appearance-none
                    cursor-pointer
                    accent-[#C35A3E]
                  "
                />

                <div
                  className="
                    flex
                    justify-between
                    mt-2
                    text-[9px]
                    text-[#A09A92]
                  "
                >
                  <span>800 Sq.Ft</span>
                  <span>10,000 Sq.Ft</span>
                  <span>25,000+ Sq.Ft</span>
                </div>

              </div>

              {/* Finish Quality */}

              <div>

                <label
                  className="
                    block
                    text-[10px]
                    uppercase
                    tracking-[0.15em]
                    font-bold
                    text-[#4B4742]
                    mb-3
                  "
                >
                  Finish Level
                </label>

                <div className="grid grid-cols-3 gap-2">

                  {finishLevels.map((level) => {

                    const active =
                      finishQuality === level.id;

                    return (
                      <button
                        key={level.id}
                        type="button"
                        onClick={() =>
                          setFinishQuality(level.id)
                        }
                        className={`
                          p-3
                          border
                          text-center
                          transition-all
                          duration-300
                          cursor-pointer
                          ${
                            active
                              ? "border-[#C35A3E] bg-[#FDF4F1]"
                              : "border-[#E4E0D9] bg-white hover:border-[#C8C2BA]"
                          }
                        `}
                      >

                        <span
                          className={`
                            block
                            text-xs
                            font-semibold
                            ${
                              active
                                ? "text-[#A84730]"
                                : "text-[#48443F]"
                            }
                          `}
                        >
                          {level.label}
                        </span>

                        <span
                          className="
                            block
                            mt-1
                            text-[10px]
                            text-[#9A958D]
                          "
                        >
                          {level.price}/sq.ft
                        </span>

                      </button>
                    );
                  })}

                </div>

              </div>

              {/* Floors */}

              <div>

                <label
                  className="
                    block
                    text-[10px]
                    uppercase
                    tracking-[0.15em]
                    font-bold
                    text-[#4B4742]
                    mb-3
                  "
                >
                  Number of Floors
                </label>

                <div className="grid grid-cols-5 gap-2">

                  {[1, 2, 3, 4, 5].map((num) => {

                    const active = floors === num;

                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFloors(num)}
                        className={`
                          py-3
                          border
                          text-xs
                          font-semibold
                          transition-all
                          cursor-pointer
                          ${
                            active
                              ? "bg-[#262626] border-[#262626] text-white"
                              : "bg-white border-[#E4E0D9] text-[#68635D] hover:border-[#C8C2BA]"
                          }
                        `}
                      >
                        G+{num - 1}
                      </button>
                    );
                  })}

                </div>

              </div>

              {/* Addons */}

              <div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mb-3
                  "
                >

                  <Sparkles
                    className="w-4 h-4 text-[#C35A3E]"
                  />

                  <label
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.15em]
                      font-bold
                      text-[#4B4742]
                    "
                  >
                    Optional Enhancements
                  </label>

                </div>

                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    gap-2
                  "
                >

                  {addonOptions.map((addon) => {

                    const active =
                      addons[addon.key];

                    return (
                      <button
                        key={addon.key}
                        type="button"
                        onClick={() =>
                          toggleAddon(addon.key)
                        }
                        className={`
                          p-3
                          border
                          flex
                          items-center
                          justify-between
                          text-left
                          transition-all
                          duration-300
                          cursor-pointer
                          ${
                            active
                              ? "border-[#C35A3E]/50 bg-[#FDF8F5]"
                              : "border-[#E4E0D9] bg-white hover:border-[#C8C2BA]"
                          }
                        `}
                      >

                        <div className="flex items-center gap-2">

                          <div
                            className={`
                              w-4
                              h-4
                              border
                              flex
                              items-center
                              justify-center
                              ${
                                active
                                  ? "bg-[#C35A3E] border-[#C35A3E]"
                                  : "bg-white border-[#D5D0C9]"
                              }
                            `}
                          >

                            {active && (
                              <Check className="w-3 h-3 text-white" />
                            )}

                          </div>

                          <span
                            className="
                              text-[11px]
                              text-[#57524C]
                            "
                          >
                            {addon.label}
                          </span>

                        </div>

                        <span
                          className="
                            text-[9px]
                            text-[#9A958D]
                            font-mono
                            ml-2
                          "
                        >
                          {addon.cost}
                        </span>

                      </button>
                    );
                  })}

                </div>

              </div>

            </div>

            {/* =================================================
                ESTIMATE SUMMARY
            ================================================= */}

            <aside
              className="
                lg:col-span-5
                lg:sticky
                lg:top-24
                self-start
              "
            >

              <div
                className="
                  bg-[#242321]
                  text-white
                  p-6
                  sm:p-8
                  shadow-[0_20px_50px_rgba(0,0,0,0.12)]
                "
              >

                <div
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-white/50
                    font-bold
                  "
                >
                  Indicative Investment
                </div>

                <div
                  className="
                    mt-3
                    text-4xl
                    sm:text-5xl
                    font-semibold
                    tracking-tight
                  "
                >
                  ₹
                  {(calculation.grandTotal / 100000).toFixed(
                    2
                  )}

                  <span
                    className="
                      ml-2
                      text-lg
                      font-light
                      text-white/60
                    "
                  >
                    Lakhs
                  </span>

                </div>

                <p
                  className="
                    mt-2
                    text-xs
                    text-white/50
                  "
                >
                  Approx. ₹
                  {calculation.grandTotal.toLocaleString()} total
                  project investment
                </p>

                <div className="mt-7 space-y-3">

                  <div
                    className="
                      flex
                      justify-between
                      gap-4
                      pb-3
                      border-b
                      border-white/10
                      text-xs
                    "
                  >

                    <span className="text-white/50">
                      Construction
                    </span>

                    <span className="font-medium">
                      ₹
                      {(
                        calculation.baseConstructionCost /
                        100000
                      ).toFixed(2)}
                      L
                    </span>

                  </div>

                  <div
                    className="
                      flex
                      justify-between
                      gap-4
                      pb-3
                      border-b
                      border-white/10
                      text-xs
                    "
                  >

                    <span className="text-white/50">
                      Enhancements
                    </span>

                    <span className="font-medium">
                      ₹
                      {(
                        calculation.addonTotal /
                        100000
                      ).toFixed(2)}
                      L
                    </span>

                  </div>

                  <div
                    className="
                      flex
                      justify-between
                      gap-4
                      pb-3
                      border-b
                      border-white/10
                      text-xs
                    "
                  >

                    <span className="text-white/50">
                      Design & Approvals
                    </span>

                    <span className="font-medium">
                      ₹
                      {(
                        calculation.architecturalAndApprovals /
                        100000
                      ).toFixed(2)}
                      L
                    </span>

                  </div>

                  <div
                    className="
                      flex
                      justify-between
                      gap-4
                      pb-3
                      border-b
                      border-white/10
                      text-xs
                    "
                  >

                    <span className="text-white/50">
                      Effective Rate
                    </span>

                    <span className="font-medium text-[#E58A70]">
                      ₹
                      {calculation.effectiveRatePerSqFt.toLocaleString()}
                      / Sq.Ft
                    </span>

                  </div>

                  <div
                    className="
                      flex
                      justify-between
                      gap-4
                      text-xs
                    "
                  >

                    <span className="text-white/50">
                      Estimated Timeline
                    </span>

                    <span className="font-medium">
                      {calculation.timelineMonths}–
                      {calculation.timelineMonths + 2} Months
                    </span>

                  </div>

                </div>

                {/* Trust */}

                <div
                  className="
                    mt-7
                    p-3
                    bg-white/5
                    border
                    border-white/10
                    flex
                    items-start
                    gap-2
                  "
                >

                  <ShieldCheck
                    className="
                      w-4
                      h-4
                      text-[#E58A70]
                      shrink-0
                      mt-0.5
                    "
                  />

                  <span
                    className="
                      text-[10px]
                      leading-5
                      text-white/60
                    "
                  >
                    Final pricing is confirmed after site
                    assessment, architectural drawings and
                    detailed BOQ review.
                  </span>

                </div>

                <button
                  type="button"
                  onClick={handleApplyEstimate}
                  className="
                    mt-6
                    w-full
                    py-4
                    bg-[#C35A3E]
                    hover:bg-[#D06A4D]
                    text-white
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    transition-all
                    duration-300
                    flex
                    items-center
                    justify-center
                    gap-2
                    cursor-pointer
                  "
                >

                  Request Detailed Estimate

                  <ArrowUpRight className="w-4 h-4" />

                </button>

              </div>

            </aside>

          </div>

        </div>

        {/* =====================================================
            SEO SUPPORTING CONTENT
        ===================================================== */}

        <div
          className="
            mt-12
            max-w-4xl
            text-center
            mx-auto
          "
        >

          <p
            className="
              text-xs
              sm:text-sm
              leading-6
              text-[#8A857E]
              font-light
            "
          >
            Brickon Construction provides construction planning,
            residential construction, luxury villa construction,
            commercial building solutions and turnkey
            design-and-build services in Chennai and across
            Tamil Nadu. Project costs are indicative and subject
            to site conditions, design requirements, material
            specifications and final bill of quantities.
          </p>

        </div>

      </div>

      {/* =====================================================
          ANIMATION
      ===================================================== */}

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
};