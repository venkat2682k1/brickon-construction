import React, { useEffect, useRef, useState } from "react";
import {
  Hammer,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Leaf,
  Maximize,
  Layers,
  Home,
  Building2,
  Map,
  Briefcase,
  Factory,
} from "lucide-react";

/* =========================================================
   COUNT UP HOOK
========================================================= */

const useCountUp = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) {
      setCount(0);
      return;
    }

    let animationFrame;
    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, duration, start]);

  return count;
};

/* =========================================================
   SCROLL REVEAL HOOK
========================================================= */

const useReveal = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".brickon-reveal");

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("brickon-reveal-visible");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
};

/* =========================================================
   ABOUT PAGE
========================================================= */

export const AboutPreview = ({
  onNavigate,
  onOpenProjectModal,
}) => {
  const statsRef = useRef(null);
  const heroImageRef = useRef(null);

  const [startCounters, setStartCounters] = useState(false);

  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  useReveal();

  /* =======================================================
     COUNTER OBSERVER
  ======================================================= */

  useEffect(() => {
    const section = statsRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setStartCounters(entry.isIntersecting);
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* =======================================================
     IMAGE PARALLAX
  ======================================================= */

  useEffect(() => {
    const handleScroll = () => {
      if (!heroImageRef.current) return;

      const rect = heroImageRef.current.getBoundingClientRect();

      const windowHeight = window.innerHeight;

      if (
        rect.bottom > 0 &&
        rect.top < windowHeight
      ) {
        const progress =
          (windowHeight - rect.top) /
          (windowHeight + rect.height);

        const translate =
          (progress - 0.5) * 30;

        heroImageRef.current.style.transform = `translateY(${translate}px) scale(1.05)`;
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  /* =======================================================
     COUNTERS
  ======================================================= */

  const projectsCompleted = useCountUp(
    124,
    2500,
    startCounters
  );

  const industryAwards = useCountUp(
    15,
    2000,
    startCounters
  );

  const safetyRecord = useCountUp(
    100,
    2800,
    startCounters
  );

  /* =======================================================
     SERVICES
  ======================================================= */

  const serviceOfferings = [
    {
      title: "Residential Construction",
      icon: Home,
    },
    {
      title: "Residential Developments",
      icon: Building2,
    },
    {
      title: "Plotted Land Developments",
      icon: Map,
    },
    {
      title: "Commercial & Offices",
      icon: Briefcase,
    },
    {
      title: "Factory",
      icon: Factory,
    },
  ];

  /* =======================================================
     AREAS
  ======================================================= */

  const areasCovered = [
    "Kundrathur",
    "Chrompet",
    "CTO Colony",
    "West Tambaram",
    "RKV Avenue",
    "Pallavaram",
    "Mappedu",
    "East Tambaram",
    "Jalladianpet",
    "Perumbakkam",
  ];

  /* =======================================================
     BRANDS
  ======================================================= */

  const brands = [
    {
      category: "Cements",
      names: "Ramco, Zuari Cement, UltraTech",
    },
    {
      category: "Steel",
      names: "ARS, JSW, Tata Steel",
    },
    {
      category: "Paints",
      names: "Birla HIL, Asian Paints, Dr. Fixit",
    },
    {
      category: "Plumbing",
      names: "Ashirvad, Jaquar",
    },
    {
      category: "Electrical",
      names: "Orbit, Finolex, Anchor, Legrand",
    },
    {
      category: "Tiles",
      names: "VP Chettinad, KAG, Somany",
    },
    {
      category: "Carpenter",
      names: "Godrej",
    },
  ];

  return (
    <div className="w-full bg-white overflow-hidden">

      {/* =====================================================
          GLOBAL ANIMATION STYLES
      ===================================================== */}

      <style>{`

        .brickon-reveal {
          opacity: 0;
          transform: translateY(45px);
          transition:
            opacity 0.9s ease,
            transform 0.9s cubic-bezier(.16,1,.3,1);
        }

        .brickon-reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .brickon-delay-1 {
          transition-delay: 100ms;
        }

        .brickon-delay-2 {
          transition-delay: 200ms;
        }

        .brickon-delay-3 {
          transition-delay: 300ms;
        }

        .brickon-delay-4 {
          transition-delay: 400ms;
        }

        .brickon-delay-5 {
          transition-delay: 500ms;
        }

        .brickon-grid {
          background-image:
            linear-gradient(
              rgba(0,0,0,0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0,0,0,0.035) 1px,
              transparent 1px
            );

          background-size: 40px 40px;

          animation:
            brickonGridMove 18s linear infinite;
        }

        @keyframes brickonGridMove {
          0% {
            background-position: 0 0;
          }

          100% {
            background-position: 40px 40px;
          }
        }

        .brickon-scan {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(195,90,62,.8),
            transparent
          );

          animation:
            brickonScan 5s ease-in-out infinite;
        }

        @keyframes brickonScan {
          0% {
            top: 0%;
            opacity: 0;
          }

          15% {
            opacity: 1;
          }

          50% {
            opacity: 1;
          }

          85% {
            opacity: 1;
          }

          100% {
            top: 100%;
            opacity: 0;
          }
        }

        .brickon-line {
          position: relative;
          overflow: hidden;
        }

        .brickon-line::after {
          content: "";
          position: absolute;
          left: -100%;
          top: 0;
          width: 100%;
          height: 2px;
          background: #C35A3E;

          animation:
            brickonLineMove 3s ease-in-out infinite;
        }

        @keyframes brickonLineMove {
          0% {
            left: -100%;
          }

          50% {
            left: 100%;
          }

          100% {
            left: 100%;
          }
        }

        .brickon-float {
          animation:
            brickonFloat 5s ease-in-out infinite;
        }

        @keyframes brickonFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        .brickon-pulse {
          animation:
            brickonPulse 2.5s ease-in-out infinite;
        }

        @keyframes brickonPulse {
          0%,
          100% {
            opacity: .35;
          }

          50% {
            opacity: 1;
          }
        }

        .brickon-service {
          transition:
            transform .45s cubic-bezier(.16,1,.3,1),
            box-shadow .45s ease,
            border-color .45s ease;
        }

        .brickon-service:hover {
          transform:
            translateY(-10px);
          box-shadow:
            0 25px 60px rgba(0,0,0,.09);
        }

        .brickon-number {
          transition:
            transform .4s ease;
        }

        .brickon-number:hover {
          transform: translateY(-4px);
        }

        .brickon-brand {
          transition:
            transform .4s ease,
            box-shadow .4s ease,
            border-color .4s ease;
        }

        .brickon-brand:hover {
          transform: translateY(-6px);
          box-shadow:
            0 20px 45px rgba(0,0,0,.07);
        }

        .brickon-area {
          transition:
            transform .35s ease,
            border-color .35s ease;
        }

        .brickon-area:hover {
          transform: translateY(-4px);
        }

        .brickon-image {
          transition:
            transform 1.5s cubic-bezier(.16,1,.3,1);
        }

        .brickon-cta-grid {
          background-image:
            linear-gradient(
              to right,
              rgba(255,255,255,.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255,255,255,.05) 1px,
              transparent 1px
            );

          background-size: 32px 32px;

          animation:
            brickonDarkGrid 20s linear infinite;
        }

        @keyframes brickonDarkGrid {
          0% {
            background-position: 0 0;
          }

          100% {
            background-position: 32px 32px;
          }
        }

        .brickon-blueprint {
          position: absolute;
          width: 180px;
          height: 180px;
          border: 1px solid rgba(195,90,62,.2);
          transform: rotate(45deg);
          animation:
            blueprintRotate 18s linear infinite;
        }

        @keyframes blueprintRotate {
          from {
            transform:
              rotate(45deg);
          }

          to {
            transform:
              rotate(405deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
          }
        }

      `}</style>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        id="about-hero"
        className="pt-32 pb-20 sm:pt-40 sm:pb-32 bg-[#F9F8F6] relative overflow-hidden"
      >

        <div className="absolute inset-0 brickon-grid pointer-events-none opacity-60" />

        <div className="brickon-scan pointer-events-none" />

        <div className="absolute top-0 right-0 w-1/2 h-full border-l border-gray-200/50 pointer-events-none hidden lg:block" />

        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200/50 pointer-events-none hidden lg:block" />

        {/* Engineering marker */}

        <div className="absolute right-[8%] top-[28%] hidden lg:block brickon-float">

          <div className="w-28 h-28 border border-[#C35A3E]/20 rotate-45 flex items-center justify-center">

            <div className="w-16 h-16 border border-[#C35A3E]/30 flex items-center justify-center">

              <div className="w-2 h-2 bg-[#C35A3E] rounded-full brickon-pulse" />

            </div>

          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

          <div className="max-w-4xl brickon-reveal">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-8 h-[2px] bg-[#C35A3E] brickon-line" />

              <span className="text-[#C35A3E] text-[10px] sm:text-xs font-black uppercase tracking-[0.3em]">

                Who We Are

              </span>

            </div>

            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-[#1A1A1A] uppercase mb-9">

              Engineering{" "}

              <span className="italic text-[#C35A3E]">

                Precision

              </span>

              <br />

              Architectural Craftsmanship.

            </h1>

            <p className="text-gray-600 text-lg sm:text-xl lg:text-2xl leading-relaxed font-light max-w-2xl border-l-4 border-[#C35A3E] pl-6">

              We design and build structurally sound,
              beautifully crafted homes across Tamil Nadu,
              combining innovative architecture, engineering
              precision, and quality construction in every
              project.

            </p>

          </div>

          {/* Technical information strip */}

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-200 border border-gray-200 brickon-reveal brickon-delay-2">

            {[
              ["01", "Engineering"],
              ["02", "Architecture"],
              ["03", "Construction"],
              ["04", "Quality Control"],
            ].map(([number, label]) => (

              <div
                key={number}
                className="bg-white px-5 py-5 flex items-center gap-3"
              >

                <span className="font-mono text-[10px] text-[#C35A3E]">
                  {number}
                </span>

                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                  {label}
                </span>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          STORY
      ===================================================== */}

      <section
        id="about-story"
        className="py-24 sm:py-32 relative"
      >

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

            {/* LEFT */}

            <div className="lg:col-span-5 lg:sticky lg:top-32 brickon-reveal">

              <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-4 block">
                Established 2018
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-6 tracking-tighter text-[#1A1A1A] uppercase">

                We Build More Than{" "}

                <br />

                <span className="italic text-[#C35A3E]">
                  Structures.
                </span>

              </h2>

              <p className="text-gray-600 text-base leading-relaxed font-light mb-6">

                Founded in{" "}

                <strong className="text-[#1A1A1A] font-semibold">
                  2018
                </strong>
                , Brickon Construction is a premier
                architectural engineering and general
                contracting firm. We turn complex structural
                blueprints into enduring realities through
                craftsmanship, technology, and client
                confidence.

              </p>

              <p className="text-gray-500 text-sm leading-relaxed font-light mb-10">

                Whether constructing high-concept luxury
                villas, commercial headquarters, or industrial
                complexes, we combine civil precision with
                radical transparency.

              </p>

              <button
                onClick={() =>
                  onNavigate("our-story")
                }
                className="inline-flex items-center gap-2 pb-1 border-b-2 border-[#1A1A1A] text-[11px] font-bold uppercase tracking-widest hover:text-[#C35A3E] hover:border-[#C35A3E] transition-all cursor-pointer"
              >

                <span>
                  Discover Our History
                </span>

                <ArrowRight className="w-4 h-4" />

              </button>

            </div>

            {/* RIGHT */}

            <div className="lg:col-span-7 space-y-16">

              <div
                className="relative overflow-hidden border border-gray-200 shadow-xl group brickon-reveal brickon-delay-2"
              >

                <img
                  ref={heroImageRef}
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                  alt="Brickon Construction Architectural Craftsmanship"
                  className="brickon-image w-full h-80 sm:h-[500px] object-cover"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                <div className="absolute top-5 left-5 px-3 py-2 bg-black/60 backdrop-blur text-white text-[9px] uppercase tracking-widest font-bold">
                  BRICKON / PROJECT 001
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 bg-white/95 backdrop-blur-sm border border-gray-200 flex items-start sm:items-center gap-4">

                  <div className="w-10 h-10 bg-[#C35A3E] flex items-center justify-center shrink-0">

                    <Hammer className="w-5 h-5 text-white" />

                  </div>

                  <div>

                    <div className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">

                      Precision Formwork & Finishes

                    </div>

                    <div className="text-[11px] text-gray-500 mt-1">

                      Zero tolerance on structural joints
                      and concrete curing.

                    </div>

                  </div>

                </div>

              </div>

              {/* VALUES */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 p-8 sm:p-12 bg-[#F9F8F6] border border-gray-200 brickon-reveal brickon-delay-3">

                <div className="space-y-3">

                  <div className="w-8 h-8 bg-white border border-gray-200 flex items-center justify-center mb-5">

                    <Compass className="w-4 h-4 text-[#C35A3E]" />

                  </div>

                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
                    Our Mission
                  </h4>

                  <p className="text-sm text-gray-600 leading-relaxed font-light">

                    To elevate the standard of modern
                    construction through quality
                    craftsmanship, rigorous safety protocols,
                    and structural innovation.

                  </p>

                </div>

                <div className="space-y-3">

                  <div className="w-8 h-8 bg-white border border-gray-200 flex items-center justify-center mb-5">

                    <ShieldCheck className="w-4 h-4 text-[#C35A3E]" />

                  </div>

                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
                    Our Values
                  </h4>

                  <p className="text-sm text-gray-600 leading-relaxed font-light">

                    Absolute transparency and meticulous
                    attention to detail. No hidden costs,
                    no compromised materials—just integrity.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          STATS
      ===================================================== */}

      <section
        ref={statsRef}
        className="py-16 bg-[#1A1A1A] text-white border-y border-gray-800 relative overflow-hidden"
      >

        <div className="absolute inset-0 brickon-cta-grid opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-800 text-center md:text-left">

            <div className="md:px-8 pt-6 md:pt-0 brickon-number">

              <span className="block text-5xl sm:text-6xl font-bold text-white tabular-nums tracking-tight">

                {projectsCompleted}+

              </span>

              <span className="block text-[11px] font-bold uppercase text-gray-400 tracking-widest mt-3">

                Landmarks Completed

              </span>

            </div>

            <div className="md:px-8 pt-8 md:pt-0 brickon-number">

              <span className="block text-5xl sm:text-6xl font-bold text-white tabular-nums tracking-tight">

                {industryAwards}+

              </span>

              <span className="block text-[11px] font-bold uppercase text-gray-400 tracking-widest mt-3">

                Industry Awards

              </span>

            </div>

            <div className="md:px-8 pt-8 md:pt-0 brickon-number">

              <span className="block text-5xl sm:text-6xl font-bold text-[#C35A3E] tabular-nums tracking-tight">

                {safetyRecord}%

              </span>

              <span className="block text-[11px] font-bold uppercase text-gray-400 tracking-widest mt-3">

                Impeccable Safety Record

              </span>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section className="py-24 bg-[#F9F8F6]">

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="mb-16 text-center max-w-2xl mx-auto brickon-reveal">

            <span className="text-[10px] font-black uppercase tracking-widest text-[#C35A3E]">

              What We Do

            </span>

            <h3 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] uppercase tracking-tight mt-3 mb-4">

              Service Offerings

            </h3>

            <p className="text-gray-500 font-light text-base">

              We provide committed work with fine finishes
              across a diverse range of construction sectors.

            </p>

          </div>

          <div className="flex flex-wrap justify-center gap-6">

            {serviceOfferings.map(
              (service, index) => {

                const Icon = service.icon;

                return (

                  <div
                    key={index}
                    className={`brickon-service brickon-reveal brickon-delay-${Math.min(
                      index + 1,
                      5
                    )} w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white border border-gray-200 p-8 text-center group`}
                  >

                    <div className="w-16 h-16 mx-auto bg-[#F9F8F6] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#C35A3E] transition-colors duration-500">

                      <Icon className="w-8 h-8 text-[#C35A3E] group-hover:text-white transition-colors duration-500" />

                    </div>

                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">

                      {service.title}

                    </h4>

                    <div className="mt-5 h-[1px] bg-gray-100 overflow-hidden">

                      <div className="h-full w-0 bg-[#C35A3E] group-hover:w-full transition-all duration-700" />

                    </div>

                  </div>

                );
              }
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          KEY HIGHLIGHTS
      ===================================================== */}

      <section className="py-24 bg-white border-y border-gray-200">

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="mb-16 text-center brickon-reveal">

            <span className="text-[10px] font-black uppercase tracking-widest text-[#C35A3E]">

              Our Differentiation

            </span>

            <h3 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] uppercase tracking-tight mt-3">

              Key Highlights

            </h3>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

            {[
              [ShieldCheck, "Multi Level Checks"],
              [Sparkles, "Unique Design"],
              [Maximize, "Zero Dead Space"],
              [Layers, "Sustainability"],
              [Leaf, "Green Building"],
            ].map(([Icon, title], index) => (

              <div
                key={title}
                className={`brickon-reveal brickon-delay-${Math.min(
                  index + 1,
                  5
                )} p-6 border border-gray-200 text-center hover:border-[#C35A3E] transition-colors group`}
              >

                <Icon className="w-8 h-8 mx-auto mb-4 text-[#C35A3E] group-hover:scale-110 transition-transform duration-300" />

                <h4 className="text-sm font-bold uppercase text-[#1A1A1A]">
                  {title}
                </h4>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          AREAS
      ===================================================== */}

      <section className="py-24 bg-[#F9F8F6] border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">

          <div className="mb-12 brickon-reveal">

            <span className="text-[10px] font-black uppercase tracking-widest text-[#C35A3E]">

              Our Footprint

            </span>

            <h3 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] uppercase tracking-tight mt-3">

              Areas Covered

            </h3>

          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">

            {areasCovered.map(
              (area, index) => (

                <div
                  key={index}
                  className={`brickon-area brickon-reveal brickon-delay-${Math.min(
                    (index % 5) + 1,
                    5
                  )} bg-white border border-gray-200 px-5 py-3 flex items-center gap-2 hover:border-[#C35A3E] transition-colors shadow-sm`}
                >

                  <MapPin className="w-4 h-4 text-[#C35A3E]" />

                  <span className="text-sm font-semibold text-[#1A1A1A]">
                    {area}
                  </span>

                </div>

              )
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          BRANDS
      ===================================================== */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <div className="mb-16 text-center max-w-3xl mx-auto brickon-reveal">

            <span className="text-[10px] font-black uppercase tracking-widest text-[#C35A3E]">

              Quality Assurance

            </span>

            <h3 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] uppercase tracking-tight mt-3 mb-4">

              Premium Brands We Use

            </h3>

            <p className="text-gray-500 font-light text-base">

              We never compromise on materials. Every
              structure is fortified with trusted,
              industry-leading brands.

            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {brands.map((brand, idx) => (

              <div
                key={idx}
                className={`brickon-brand brickon-reveal brickon-delay-${Math.min(
                  (idx % 5) + 1,
                  5
                )} border border-gray-200 p-6`}
              >

                <div className="flex items-center gap-3 mb-4">

                  <div className="w-8 h-8 bg-[#F9F8F6] flex items-center justify-center">

                    <CheckCircle2 className="w-4 h-4 text-[#C35A3E]" />

                  </div>

                  <h4 className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]">

                    {brand.category}

                  </h4>

                </div>

                <p className="text-sm text-gray-600 font-light">

                  {brand.names}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="py-24 sm:py-32 bg-[#1A1A1A] text-center relative overflow-hidden shadow-2xl">

        <div className="absolute inset-0 brickon-cta-grid pointer-events-none opacity-40" />

        <div className="absolute left-[8%] top-[25%] hidden lg:block brickon-blueprint opacity-40" />

        <div className="absolute right-[8%] bottom-[15%] hidden lg:block brickon-blueprint opacity-20" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 brickon-reveal">

          <div className="flex items-center justify-center gap-3 mb-6">

            <div className="w-12 h-[1px] bg-[#C35A3E]" />

            <span className="text-[#C35A3E] text-[10px] font-black uppercase tracking-[0.3em]">

              Start Building

            </span>

            <div className="w-12 h-[1px] bg-[#C35A3E]" />

          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white mb-6">

            Let's build something
            that{" "}

            <span className="italic text-[#C35A3E]">
              lasts.
            </span>

          </h2>

          <p className="text-gray-400 text-base sm:text-lg font-light mb-10 max-w-xl mx-auto leading-relaxed">

            Get a free, no-obligation cost estimate
            from the founders themselves — with a
            response within 24 hours.

          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            <button
              onClick={onOpenProjectModal}
              className="w-full sm:w-auto bg-[#C35A3E] hover:bg-[#b04f35] text-white px-10 py-5 text-[11px] font-bold uppercase tracking-widest shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 hover:-translate-y-1"
            >

              <span>
                Get Free Estimate
              </span>

              <ArrowUpRight className="w-4 h-4" />

            </button>

            <button
              onClick={() =>
                onNavigate("contact")
              }
              className="w-full sm:w-auto border border-white/30 text-white px-10 py-5 text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center gap-2 hover:-translate-y-1"
            >

              <span>
                Contact Us
              </span>

            </button>

          </div>

        </div>

      </section>

    </div>
  );
};