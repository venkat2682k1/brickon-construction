import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronDown,
  Volume2,
  VolumeX,
  ShieldCheck,
  Building,
  Home as HomeIcon,
  Factory,
  ArrowRight,
  Sparkles,
  Ruler,
  HardHat,
  Layers3,
  Wrench,
  ClipboardCheck,
  Paintbrush,
  RefreshCw,
  Landmark,
  DraftingCompass,
  Construction,
  Settings,
  CheckCircle2,
} from "lucide-react";

/* =========================================================
   AUTOMATIC COUNT-UP HOOK
========================================================= */

const useAutoCountUp = (
  initialValue,
  duration = 1800,
  start = false,
  incrementEvery = 10000,
  maxValue = null
) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [targetValue, setTargetValue] = useState(initialValue);

  useEffect(() => {
    if (!start) return;

    setTargetValue(initialValue);
    setDisplayValue(0);
  }, [initialValue, start]);

  useEffect(() => {
    if (!start) return;

    const interval = setInterval(() => {
      setTargetValue((previousValue) => {
        const nextValue = previousValue + 1;

        if (maxValue !== null && nextValue > maxValue) {
          return maxValue;
        }

        return nextValue;
      });
    }, incrementEvery);

    return () => clearInterval(interval);
  }, [start, incrementEvery, maxValue]);

  useEffect(() => {
    if (!start) return;

    let animationFrame;
    let startTime = null;

    const startingValue = displayValue;
    const difference = targetValue - startingValue;

    if (difference === 0) return;

    const animate = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentValue =
        startingValue + difference * easeOut;

      setDisplayValue(Math.round(currentValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [targetValue, duration, start]);

  return displayValue;
};

/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const useRevealOnScroll = () => {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");

    if (!elements.length) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
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
   HERO COMPONENT
========================================================= */

export const Hero = ({
  onNavigate,
  onOpenProjectModal,
}) => {
  const videoRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);
  const [startCounters, setStartCounters] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  /* =======================================================
     IMAGES
  ======================================================= */

  const visionImage =
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

  const resImage =
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80";

  const comImage =
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";

  const indImage =
    "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80";

  /* =======================================================
     START COUNTERS
  ======================================================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartCounters(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  /* =======================================================
     COMPANY STATISTICS
  ======================================================= */

  const foundedYear = 2018;

  const projectsDelivered = useAutoCountUp(
    50,
    1800,
    startCounters,
    10000
  );

  const industryAwards = useAutoCountUp(
    15,
    1800,
    startCounters,
    30000
  );

  const safetyRecord = 100;

  /* =======================================================
     REVEAL ANIMATION
  ======================================================= */

  useRevealOnScroll();

  /* =======================================================
     SCROLL PARALLAX
  ======================================================= */

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =======================================================
     VIDEO SOUND
  ======================================================= */

  const toggleMute = () => {
    if (!videoRef.current) return;

    const newMutedState = !isMuted;

    videoRef.current.muted = newMutedState;

    setIsMuted(newMutedState);
  };

  /* =======================================================
     SCROLL TO VISION
  ======================================================= */

  const scrollToVision = () => {
    const nextSection = document.getElementById(
      "home-vision-section"
    );

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  /* =======================================================
     SERVICE DATA
  ======================================================= */

  const services = [
    {
      icon: DraftingCompass,
      number: "01",
      title: "Architectural Design",
      description:
        "Thoughtful architectural planning that balances aesthetics, functionality, structural requirements and long-term value.",
    },
    {
      icon: Construction,
      number: "02",
      title: "Turnkey Construction",
      description:
        "End-to-end construction execution from initial planning and coordination through completion and final handover.",
    },
    {
      icon: HomeIcon,
      number: "03",
      title: "Residential Construction",
      description:
        "Premium villas and homes designed and constructed around your lifestyle, requirements and architectural vision.",
    },
    {
      icon: Building,
      number: "04",
      title: "Commercial Construction",
      description:
        "Professional commercial spaces engineered for functionality, durability, efficiency and long-term performance.",
    },
    {
      icon: Factory,
      number: "05",
      title: "Industrial & PEB",
      description:
        "Industrial facilities, warehouses and structural solutions planned for operational efficiency and durability.",
    },
    {
      icon: Paintbrush,
      number: "06",
      title: "Interior & Fit-Out",
      description:
        "Complete interior execution with attention to material quality, detailing, functionality and finishing.",
    },
    {
      icon: RefreshCw,
      number: "07",
      title: "Renovation & Remodeling",
      description:
        "Professional transformation of existing spaces while improving functionality, appearance and structural value.",
    },
    {
      icon: ClipboardCheck,
      number: "08",
      title: "Project Management",
      description:
        "Coordinated project planning, vendor management, quality monitoring and execution throughout every stage.",
    },
  ];

  /* =======================================================
     CAPABILITY DATA
  ======================================================= */

  const capabilities = [
    {
      icon: Ruler,
      title: "Design & Planning",
      description:
        "From concept development to detailed planning, every project begins with a clear execution strategy.",
    },
    {
      icon: Landmark,
      title: "Structural Engineering",
      description:
        "Engineering-focused construction solutions designed for strength, safety and long-term performance.",
    },
    {
      icon: Layers3,
      title: "Civil Construction",
      description:
        "Precision civil works executed with attention to specifications, materials and construction standards.",
    },
    {
      icon: Settings,
      title: "MEP Coordination",
      description:
        "Integrated coordination of mechanical, electrical and plumbing requirements for seamless execution.",
    },
    {
      icon: ShieldCheck,
      title: "Quality Control",
      description:
        "Systematic quality checks at every stage to maintain consistency, workmanship and project standards.",
    },
    {
      icon: HardHat,
      title: "Safety Management",
      description:
        "Safety-focused site management and disciplined execution designed to protect people and projects.",
    },
    {
      icon: Wrench,
      title: "Project Execution",
      description:
        "Experienced coordination across teams, materials, schedules and site activities.",
    },
    {
      icon: CheckCircle2,
      title: "Handover & Support",
      description:
        "A structured final handover process with attention to completion quality and client satisfaction.",
    },
  ];

  return (
    <>
      <style>{`

        /* =================================================
           BASE
        ================================================= */

        .brickon-page {
          overflow: hidden;
        }

        /* =================================================
           HERO ENTRANCE
        ================================================= */

        @keyframes brickonFadeUp {
          from {
            opacity: 0;
            transform: translateY(35px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes brickonFadeLeft {
          from {
            opacity: 0;
            transform: translateX(-45px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes brickonFadeRight {
          from {
            opacity: 0;
            transform: translateX(45px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes brickonScale {
          from {
            opacity: 0;
            transform: scale(0.94);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes brickonLineGrow {
          from {
            transform: scaleX(0);
            transform-origin: left;
          }

          to {
            transform: scaleX(1);
            transform-origin: left;
          }
        }

        .hero-eyebrow {
          animation:
            brickonFadeUp
            0.8s
            cubic-bezier(.22,1,.36,1)
            0.1s
            both;
        }

        .hero-heading {
          animation:
            brickonFadeLeft
            1s
            cubic-bezier(.22,1,.36,1)
            0.25s
            both;
        }

        .hero-description {
          animation:
            brickonFadeUp
            0.9s
            cubic-bezier(.22,1,.36,1)
            0.5s
            both;
        }

        .hero-buttons {
          animation:
            brickonFadeUp
            0.9s
            cubic-bezier(.22,1,.36,1)
            0.7s
            both;
        }

        .hero-stats {
          animation:
            brickonFadeUp
            1s
            cubic-bezier(.22,1,.36,1)
            0.9s
            both;
        }

        .hero-video {
          animation:
            brickonScale
            1.2s
            cubic-bezier(.22,1,.36,1)
            0.25s
            both;
        }

        /* =================================================
           GRID
        ================================================= */

        @keyframes brickonGridMove {
          from {
            background-position: 0 0;
          }

          to {
            background-position: 48px 48px;
          }
        }

        .brickon-grid {
          animation:
            brickonGridMove
            20s
            linear
            infinite;
        }

        /* =================================================
           FLOATING GLOW
        ================================================= */

        @keyframes brickonFloat {
          0%,
          100% {
            transform:
              translate3d(0,0,0);
          }

          50% {
            transform:
              translate3d(25px,-20px,0);
          }
        }

        .brickon-floating-glow {
          animation:
            brickonFloat
            8s
            ease-in-out
            infinite;
        }

        /* =================================================
           STATUS DOT
        ================================================= */

        @keyframes brickonPulse {
          0%,
          100% {
            box-shadow:
              0 0 0 0
              rgba(195,90,62,0.5);
          }

          50% {
            box-shadow:
              0 0 0 8px
              rgba(195,90,62,0);
          }
        }

        .brickon-status-dot {
          animation:
            brickonPulse
            2s
            infinite;
        }

        /* =================================================
           REVEAL
        ================================================= */

        [data-reveal] {
          opacity: 0;
          transform: translateY(45px);

          transition:
            opacity 0.9s cubic-bezier(.22,1,.36,1),
            transform 0.9s cubic-bezier(.22,1,.36,1);
        }

        [data-reveal="left"] {
          transform: translateX(-55px);
        }

        [data-reveal="right"] {
          transform: translateX(55px);
        }

        [data-reveal="scale"] {
          transform: scale(0.94);
        }

        [data-reveal].is-visible {
          opacity: 1;

          transform:
            translate3d(0,0,0)
            scale(1);
        }

        .reveal-delay-1 {
          transition-delay: 0.1s;
        }

        .reveal-delay-2 {
          transition-delay: 0.2s;
        }

        .reveal-delay-3 {
          transition-delay: 0.3s;
        }

        .reveal-delay-4 {
          transition-delay: 0.4s;
        }

        /* =================================================
           IMAGE
        ================================================= */

        .brickon-image-wrapper {
          position: relative;
          overflow: hidden;
        }

        .brickon-image-wrapper img {
          transition:
            transform 1.2s cubic-bezier(.22,1,.36,1),
            filter 0.8s ease;
        }

        .brickon-image-wrapper:hover img {
          transform: scale(1.06);
          filter: saturate(1.08);
        }

        /* =================================================
           SECTOR CARDS
        ================================================= */

        .brickon-sector-card {
          position: relative;
          transform: translateY(0);

          transition:
            transform 0.5s cubic-bezier(.22,1,.36,1),
            border-color 0.4s ease,
            box-shadow 0.5s ease;
        }

        .brickon-sector-card::after {
          content: "";

          position: absolute;

          left: 0;
          right: 0;
          bottom: 0;

          height: 3px;

          background: #C35A3E;

          transform: scaleX(0);
          transform-origin: left;

          transition:
            transform
            0.5s
            cubic-bezier(.22,1,.36,1);
        }

        .brickon-sector-card:hover {
          transform: translateY(-10px);

          box-shadow:
            0 25px 60px
            rgba(0,0,0,0.28);
        }

        .brickon-sector-card:hover::after {
          transform: scaleX(1);
        }

        /* =================================================
           BUTTON
        ================================================= */

        .brickon-button {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .brickon-button::before {
          content: "";

          position: absolute;

          top: 0;
          left: -120%;

          width: 80%;
          height: 100%;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,0.18),
              transparent
            );

          transform: skewX(-20deg);

          transition:
            left 0.7s ease;

          z-index: -1;
        }

        .brickon-button:hover::before {
          left: 140%;
        }

        .brickon-button svg {
          transition:
            transform
            0.4s
            cubic-bezier(.22,1,.36,1);
        }

        .brickon-button:hover svg {
          transform:
            translate(3px,-3px);
        }

        /* =================================================
           ARCHITECTURAL CORNER
        ================================================= */

        @keyframes brickonCorner {
          0% {
            opacity: 0.08;
            transform: scale(0.96);
          }

          50% {
            opacity: 0.18;
            transform: scale(1);
          }

          100% {
            opacity: 0.08;
            transform: scale(0.96);
          }
        }

        .brickon-corner {
          animation:
            brickonCorner
            5s
            ease-in-out
            infinite;
        }

        /* =================================================
           CTA GRID
        ================================================= */

        @keyframes brickonCtaGrid {
          from {
            background-position: 0 0;
          }

          to {
            background-position: 24px 24px;
          }
        }

        .brickon-cta-grid {
          animation:
            brickonCtaGrid
            8s
            linear
            infinite;
        }

        /* =================================================
           SCROLL LINE
        ================================================= */

        @keyframes brickonScrollLine {
          0% {
            transform: scaleY(0);
            transform-origin: top;
          }

          50% {
            transform: scaleY(1);
            transform-origin: top;
          }

          51% {
            transform-origin: bottom;
          }

          100% {
            transform: scaleY(0);
            transform-origin: bottom;
          }
        }

        .brickon-scroll-line {
          animation:
            brickonScrollLine
            2s
            ease-in-out
            infinite;
        }

        /* =================================================
           NUMBER
        ================================================= */

        .counter-number {
          transition:
            color 0.4s ease,
            transform 0.4s ease;
        }

        /* =================================================
           SERVICE CARD
        ================================================= */

        .brickon-service-card {
          position: relative;
          overflow: hidden;

          transition:
            transform 0.5s cubic-bezier(.22,1,.36,1),
            border-color 0.4s ease,
            background 0.4s ease,
            box-shadow 0.5s ease;
        }

        .brickon-service-card::before {
          content: "";

          position: absolute;

          top: 0;
          left: 0;

          width: 100%;
          height: 2px;

          background: #C35A3E;

          transform: scaleX(0);
          transform-origin: left;

          transition:
            transform
            0.5s
            cubic-bezier(.22,1,.36,1);
        }

        .brickon-service-card::after {
          content: "";

          position: absolute;

          width: 160px;
          height: 160px;

          right: -80px;
          bottom: -80px;

          border-radius: 9999px;

          background: rgba(195,90,62,0.06);

          transition:
            transform
            0.6s
            cubic-bezier(.22,1,.36,1);
        }

        .brickon-service-card:hover {
          transform: translateY(-8px);

          border-color:
            rgba(195,90,62,0.45);

          background:
            rgba(255,255,255,0.07);

          box-shadow:
            0 25px 60px
            rgba(0,0,0,0.25);
        }

        .brickon-service-card:hover::before {
          transform: scaleX(1);
        }

        .brickon-service-card:hover::after {
          transform: scale(1.5);
        }

        .brickon-service-icon {
          transition:
            transform 0.5s
            cubic-bezier(.22,1,.36,1),
            background 0.4s ease;
        }

        .brickon-service-card:hover
        .brickon-service-icon {
          transform:
            translateY(-4px)
            rotate(-3deg);

          background: #C35A3E;
        }

        .brickon-service-number {
          transition:
            color 0.4s ease;
        }

        .brickon-service-card:hover
        .brickon-service-number {
          color: #C35A3E;
        }

        /* =================================================
           CAPABILITY CARD
        ================================================= */

        .brickon-capability-card {
          position: relative;

          transition:
            transform 0.45s
            cubic-bezier(.22,1,.36,1),
            border-color 0.4s ease,
            background 0.4s ease;
        }

        .brickon-capability-card:hover {
          transform: translateY(-6px);

          border-color:
            rgba(195,90,62,0.45);

          background:
            rgba(195,90,62,0.05);
        }

        .brickon-capability-icon {
          transition:
            transform 0.45s
            cubic-bezier(.22,1,.36,1),
            color 0.4s ease;
        }

        .brickon-capability-card:hover
        .brickon-capability-icon {
          transform:
            scale(1.12)
            rotate(-4deg);

          color: #C35A3E;
        }

        /* =================================================
           CAPABILITY LINE
        ================================================= */

        .brickon-capability-line {
          position: relative;
        }

        .brickon-capability-line::before {
          content: "";

          position: absolute;

          left: 0;
          top: 0;
          bottom: 0;

          width: 1px;

          background:
            linear-gradient(
              to bottom,
              #C35A3E,
              rgba(195,90,62,0.05)
            );
        }

        /* =================================================
           REDUCED MOTION
        ================================================= */

        @media (
          prefers-reduced-motion: reduce
        ) {
          *,
          *::before,
          *::after {
            animation-duration:
              0.01ms !important;

            animation-iteration-count:
              1 !important;

            scroll-behavior:
              auto !important;

            transition-duration:
              0.01ms !important;
          }

          [data-reveal] {
            opacity: 1;
            transform: none;
          }
        }

      `}</style>

      {/* =====================================================
          PAGE
      ===================================================== */}

      <div className="brickon-page w-full bg-[#F9F8F6]">

        {/* ===================================================
            HERO
        =================================================== */}

        <section
          id="home-hero-section"
          className="
            relative
            w-full
            min-h-screen
            flex
            items-center
            bg-[#1A1A1A]
            pt-32
            pb-20
            lg:pt-40
            lg:pb-24
            overflow-hidden
          "
        >

          {/* GRID */}

          <div
            className="
              brickon-grid
              absolute
              inset-0
              pointer-events-none
              opacity-[0.16]
            "
            style={{
              backgroundImage: `
                linear-gradient(
                  to right,
                  rgba(255,255,255,0.08) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  to bottom,
                  rgba(255,255,255,0.08) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "48px 48px",
            }}
          />

          {/* GLOW */}

          <div
            className="
              brickon-floating-glow
              absolute
              top-1/4
              -left-24
              w-96
              h-96
              bg-[#C35A3E]/10
              rounded-full
              blur-[120px]
              pointer-events-none
            "
          />

          <div
            className="
              brickon-floating-glow
              absolute
              bottom-0
              right-0
              w-[28rem]
              h-[28rem]
              bg-[#C35A3E]/5
              rounded-full
              blur-[140px]
              pointer-events-none
            "
            style={{
              animationDelay: "-4s",
            }}
          />

          {/* CORNER */}

          <div
            className="
              brickon-corner
              absolute
              bottom-0
              right-0
              w-1/3
              h-1/2
              border-r-4
              border-b-4
              border-[#C35A3E]
              m-8
              sm:m-12
              pointer-events-none
              hidden
              sm:block
            "
          />

          {/* HERO CONTAINER */}

          <div
            className="
              relative
              z-10
              max-w-7xl
              mx-auto
              px-6
              lg:px-10
              w-full
            "
          >

            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-12
                gap-12
                lg:gap-8
                items-center
              "
            >

              {/* LEFT */}

              <div
                className="
                  lg:col-span-7
                  flex
                  flex-col
                  items-start
                  text-left
                  order-2
                  lg:order-1
                "
              >

                <div
                  className="
                    hero-eyebrow
                    inline-flex
                    items-center
                    gap-2.5
                    px-3
                    py-1
                    bg-white/5
                    border
                    border-white/10
                    text-[10px]
                    sm:text-xs
                    font-bold
                    tracking-[0.4em]
                    uppercase
                    text-[#C35A3E]
                    mb-6
                  "
                >
                  <span
                    className="
                      brickon-status-dot
                      w-1.5
                      h-1.5
                      rounded-full
                      bg-[#C35A3E]
                    "
                  />

                  <span>
                    Premium Construction & Architecture
                  </span>
                </div>

                <h1
                  id="hero-main-headline"
                  className="
                    hero-heading
                    text-white
                    text-5xl
                    sm:text-6xl
                    lg:text-7xl
                    xl:text-[5.5rem]
                    font-light
                    tracking-tight
                    leading-[0.92]
                    uppercase
                  "
                >
                  WE BUILD YOUR

                  <br />

                  <span
                    className="
                      font-black
                      italic
                      text-white
                      relative
                      inline-block
                    "
                  >
                    DREAM

                    <span
                      className="
                        absolute
                        left-0
                        bottom-[-10px]
                        w-full
                        h-[2px]
                        bg-[#C35A3E]
                        origin-left
                      "
                      style={{
                        animation: `
                          brickonLineGrow
                          1s
                          cubic-bezier(.22,1,.36,1)
                          1s
                          both
                        `,
                      }}
                    />
                  </span>
                </h1>

                <p
                  id="hero-subtext"
                  className="
                    hero-description
                    mt-7
                    text-gray-400
                    text-base
                    sm:text-lg
                    max-w-xl
                    font-light
                    leading-relaxed
                  "
                >
                  From architectural vision to final
                  handover, we create spaces that combine
                  thoughtful design, engineering precision,
                  and lasting quality.
                </p>

                <div
                  className="
                    hero-buttons
                    flex
                    flex-col
                    sm:flex-row
                    items-center
                    gap-4
                    pt-8
                    w-full
                    sm:w-auto
                  "
                >

                  <button
                    onClick={onOpenProjectModal}
                    className="
                      brickon-button
                      w-full
                      sm:w-auto
                      bg-[#C35A3E]
                      hover:bg-[#b04f35]
                      text-white
                      px-8
                      py-4
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-widest
                      shadow-xl
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-[0_15px_35px_rgba(195,90,62,0.3)]
                      cursor-pointer
                      flex
                      items-center
                      justify-center
                      gap-2
                      min-h-[44px]
                    "
                  >
                    <span>Start Your Project</span>

                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <Link
                    to="/projects"
                    className="
                      brickon-button
                      w-full
                      sm:w-auto
                      border
                      border-white/30
                      text-white
                      px-8
                      py-4
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-widest
                      hover:bg-white/10
                      hover:border-white/60
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      cursor-pointer
                      flex
                      items-center
                      justify-center
                      gap-2
                      min-h-[44px]
                    "
                  >
                    <span>Explore Our Projects</span>

                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                </div>

                {/* STATS */}

                <div
                  className="
                    hero-stats
                    mt-12
                    pt-8
                    border-t
                    border-white/10
                    grid
                    grid-cols-2
                    md:grid-cols-4
                    gap-6
                    w-full
                  "
                >

                  <div
                    className="
                      border-l-2
                      border-[#C35A3E]
                      pl-3
                      hover:translate-x-1
                      transition-transform
                    "
                  >
                    <div
                      className="
                        counter-number
                        text-2xl
                        sm:text-3xl
                        font-bold
                        text-white
                        tracking-tight
                      "
                    >
                      {foundedYear}
                    </div>

                    <div
                      className="
                        text-[9px]
                        text-gray-400
                        font-bold
                        uppercase
                        tracking-widest
                        mt-1
                      "
                    >
                      Founded Year
                    </div>
                  </div>

                  <div
                    className="
                      border-l-2
                      border-[#C35A3E]
                      pl-3
                      hover:translate-x-1
                      transition-transform
                    "
                  >
                    <div
                      className="
                        counter-number
                        text-2xl
                        sm:text-3xl
                        font-bold
                        text-white
                        tracking-tight
                      "
                    >
                      {projectsDelivered}+
                    </div>

                    <div
                      className="
                        text-[9px]
                        text-gray-400
                        font-bold
                        uppercase
                        tracking-widest
                        mt-1
                      "
                    >
                      Projects Delivered
                    </div>
                  </div>

                  <div
                    className="
                      border-l-2
                      border-[#C35A3E]
                      pl-3
                      hover:translate-x-1
                      transition-transform
                    "
                  >
                    <div
                      className="
                        counter-number
                        text-2xl
                        sm:text-3xl
                        font-bold
                        text-white
                        tracking-tight
                      "
                    >
                      {industryAwards}+
                    </div>

                    <div
                      className="
                        text-[9px]
                        text-gray-400
                        font-bold
                        uppercase
                        tracking-widest
                        mt-1
                      "
                    >
                      Industry Awards
                    </div>
                  </div>

                  <div
                    className="
                      border-l-2
                      border-[#C35A3E]
                      pl-3
                      hover:translate-x-1
                      transition-transform
                    "
                  >
                    <div
                      className="
                        counter-number
                        text-2xl
                        sm:text-3xl
                        font-bold
                        text-[#C35A3E]
                        tracking-tight
                      "
                    >
                      {safetyRecord}%
                    </div>

                    <div
                      className="
                        text-[9px]
                        text-gray-400
                        font-bold
                        uppercase
                        tracking-widest
                        mt-1
                      "
                    >
                      Safety Focus
                    </div>
                  </div>

                </div>

              </div>

              {/* VIDEO */}

              <div
                className="
                  lg:col-span-5
                  flex
                  justify-center
                  lg:justify-end
                  order-1
                  lg:order-2
                  w-full
                "
              >

                <div
                  className="
                    hero-video
                    relative
                    w-full
                    max-w-sm
                    sm:max-w-md
                    lg:max-w-[420px]
                    aspect-[8/12]
                    rounded-2xl
                    overflow-hidden
                    shadow-[0_20px_70px_rgba(0,0,0,0.55)]
                    border
                    border-white/10
                    group
                  "
                  style={{
                    transform: `
                      translate3d(
                        0,
                        ${Math.min(scrollY * 0.08, 40)}px,
                        0
                      )
                    `,
                  }}
                >

                  <video
                    ref={videoRef}
                    src="/videos/Home Reels Correction_02.mp4"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="
                      w-full
                      h-full
                      object-cover
                      bg-black
                      scale-[1.01]
                      group-hover:scale-[1.04]
                      transition-transform
                      duration-[1800ms]
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/90
                      via-transparent
                      to-black/10
                      pointer-events-none
                    "
                  />

                  <div
                    className="
                      absolute
                      top-0
                      left-0
                      right-0
                      h-[2px]
                      bg-gradient-to-r
                      from-transparent
                      via-[#C35A3E]
                      to-transparent
                    "
                  />

                  <div
                    className="
                      absolute
                      bottom-6
                      left-6
                      right-6
                      flex
                      items-end
                      justify-between
                    "
                  >

                    <div>

                      <div
                        className="
                          text-white
                          font-bold
                          text-sm
                          tracking-wide
                          uppercase
                        "
                      >
                        Site Execution
                      </div>

                      <div
                        className="
                          text-gray-300
                          text-[10px]
                          mt-1
                          flex
                          items-center
                          gap-1.5
                        "
                      >
                        <span
                          className="
                            w-2
                            h-2
                            rounded-full
                            bg-green-500
                            animate-pulse
                          "
                        />

                        Project Progress
                      </div>

                    </div>

                    <button
                      onClick={toggleMute}
                      className="
                        w-10
                        h-10
                        bg-white/10
                        hover:bg-[#C35A3E]
                        backdrop-blur-md
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-white
                        transition-all
                        duration-300
                        hover:scale-110
                        cursor-pointer
                        shadow-lg
                      "
                      title={
                        isMuted
                          ? "Turn Sound On"
                          : "Mute Sound"
                      }
                      aria-label={
                        isMuted
                          ? "Turn Sound On"
                          : "Mute Sound"
                      }
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* SCROLL */}

          <div
            className="
              absolute
              bottom-8
              left-1/2
              -translate-x-1/2
              hidden
              md:flex
              justify-center
              z-20
            "
          >
            <button
              onClick={scrollToVision}
              className="
                text-gray-400
                hover:text-white
                transition-all
                duration-300
                hover:translate-y-1
                p-2
                flex
                flex-col
                items-center
                gap-2
                text-[10px]
                tracking-widest
                uppercase
                cursor-pointer
              "
            >
              <span>Discover BRICKON</span>

              <span
                className="
                  brickon-scroll-line
                  w-[1px]
                  h-8
                  bg-[#C35A3E]
                "
              />

              <ChevronDown
                className="
                  w-3.5
                  h-3.5
                  text-[#C35A3E]
                "
              />
            </button>
          </div>

        </section>

        {/* =====================================================
            VISION
        ===================================================== */}

        <section
          id="home-vision-section"
          className="
            py-24
            sm:py-32
            bg-white
            relative
            border-t
            border-gray-100
          "
        >

          <div
            className="
              max-w-7xl
              mx-auto
              px-6
              lg:px-10
            "
          >

            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-16
                lg:gap-24
                items-center
              "
            >

              <div data-reveal="left">

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    mb-4
                  "
                >
                  <div
                    className="
                      w-8
                      h-[2px]
                      bg-[#C35A3E]
                    "
                  />

                  <span
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-widest
                      text-[#C35A3E]
                    "
                  >
                    Our Philosophy
                  </span>
                </div>

                <h2
                  className="
                    text-3xl
                    sm:text-5xl
                    font-bold
                    text-[#1A1A1A]
                    uppercase
                    tracking-tight
                    leading-[1.1]
                    mb-6
                  "
                >
                  Engineering

                  <br />

                  <span
                    className="
                      italic
                      text-[#C35A3E]
                    "
                  >
                    Generational
                  </span>{" "}
                  Spaces
                </h2>

                <p
                  className="
                    text-gray-600
                    text-base
                    sm:text-lg
                    leading-relaxed
                    font-light
                    mb-6
                  "
                >
                  We don’t just construct buildings;
                  we engineer enduring landmarks. At
                  BRICKON, we believe that absolute
                  transparency, stringent safety protocols,
                  and precision are essential requirements
                  for modern construction.
                </p>

                <p
                  className="
                    text-gray-500
                    text-sm
                    leading-relaxed
                    font-light
                    mb-10
                  "
                >
                  Whether you are developing a bespoke
                  luxury villa or a commercial project,
                  our team approaches every project with
                  professionalism, care and attention to
                  detail.
                </p>

                <Link
                  to="/about"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    pb-1
                    border-b-2
                    border-[#1A1A1A]
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-widest
                    hover:text-[#C35A3E]
                    hover:border-[#C35A3E]
                    hover:gap-4
                    transition-all
                    duration-300
                  "
                >
                  <span>Read Our Full Story</span>

                  <ArrowRight className="w-4 h-4" />
                </Link>

              </div>

              <div
                data-reveal="right"
                className="
                  reveal-delay-2
                  relative
                "
              >

                <div
                  className="
                    absolute
                    -inset-4
                    bg-[#F9F8F6]
                    -z-10
                    translate-x-4
                    translate-y-4
                  "
                />

                <div
                  className="
                    brickon-image-wrapper
                    relative
                    aspect-[4/5]
                    sm:aspect-square
                    lg:aspect-[4/5]
                    overflow-hidden
                    shadow-xl
                  "
                >

                  <img
                    src={visionImage}
                    alt="BRICKON Architectural Construction"
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/60
                      via-transparent
                      to-transparent
                      opacity-60
                    "
                  />

                  <div
                    className="
                      absolute
                      bottom-6
                      left-6
                      right-6
                      bg-white/95
                      backdrop-blur-sm
                      p-4
                      border
                      border-gray-100
                      flex
                      items-start
                      gap-4
                      shadow-xl
                      transition-transform
                      duration-500
                      hover:-translate-y-2
                    "
                  >

                    <div
                      className="
                        w-10
                        h-10
                        bg-[#C35A3E]
                        flex
                        items-center
                        justify-center
                        shrink-0
                      "
                    >
                      <ShieldCheck
                        className="
                          w-5
                          h-5
                          text-white
                        "
                      />
                    </div>

                    <div>

                      <h4
                        className="
                          text-[#1A1A1A]
                          text-xs
                          font-bold
                          uppercase
                          tracking-wider
                        "
                      >
                        Quality Focused
                      </h4>

                      <p
                        className="
                          text-gray-500
                          text-[10px]
                          mt-1
                        "
                      >
                        Quality control and
                        professional execution
                        at every stage of the
                        construction process.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            CORE DISCIPLINES
        ===================================================== */}

        <section
          className="
            py-24
            sm:py-32
            bg-[#1A1A1A]
            text-white
            relative
            overflow-hidden
          "
        >

          <div
            className="
              absolute
              top-0
              right-0
              w-[500px]
              h-[500px]
              rounded-full
              bg-[#C35A3E]/5
              blur-[120px]
              pointer-events-none
            "
          />

          <div
            className="
              max-w-7xl
              mx-auto
              px-6
              lg:px-10
              relative
              z-10
            "
          >

            <div
              data-reveal
              className="
                flex
                flex-col
                md:flex-row
                md:items-end
                justify-between
                mb-16
                gap-6
              "
            >

              <div>

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    mb-4
                  "
                >
                  <div
                    className="
                      w-8
                      h-[2px]
                      bg-[#C35A3E]
                    "
                  />

                  <span
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-widest
                      text-[#C35A3E]
                    "
                  >
                    What We Build
                  </span>
                </div>

                <h2
                  className="
                    text-3xl
                    sm:text-5xl
                    font-bold
                    uppercase
                    tracking-tight
                    leading-[1.1]
                  "
                >
                  Mastery Across

                  <br />

                  <span
                    className="
                      italic
                      text-[#C35A3E]
                    "
                  >
                    All Sectors
                  </span>
                </h2>

              </div>

              <Link
                to="/services"
                className="
                  inline-flex
                  items-center
                  gap-2
                  pb-1
                  border-b-2
                  border-white/30
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-widest
                  hover:text-white
                  hover:border-white
                  hover:gap-4
                  transition-all
                  duration-300
                "
              >
                <span>View All Services</span>

                <ArrowRight className="w-4 h-4" />
              </Link>

            </div>

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-8
              "
            >

              {/* RESIDENTIAL */}

              <Link
                to="/services"
                data-reveal
                className="
                  brickon-sector-card
                  reveal-delay-1
                  text-left
                  group
                  bg-white/5
                  border
                  border-white/10
                  hover:border-[#C35A3E]/50
                  flex
                  flex-col
                  h-full
                  cursor-pointer
                "
              >

                <div
                  className="
                    brickon-image-wrapper
                    aspect-[4/3]
                    overflow-hidden
                    relative
                  "
                >

                  <img
                    src={resImage}
                    alt="BRICKON Residential Villas"
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/90
                      to-transparent
                      opacity-60
                    "
                  />

                  <div
                    className="
                      absolute
                      bottom-4
                      left-4
                      w-10
                      h-10
                      bg-[#C35A3E]
                      flex
                      items-center
                      justify-center
                      group-hover:scale-110
                      transition-transform
                      duration-300
                    "
                  >
                    <HomeIcon className="w-5 h-5 text-white" />
                  </div>

                </div>

                <div
                  className="
                    p-8
                    flex-1
                    flex
                    flex-col
                  "
                >

                  <h3
                    className="
                      text-xl
                      font-bold
                      uppercase
                      tracking-wider
                      mb-3
                      group-hover:text-[#C35A3E]
                      transition-colors
                    "
                  >
                    Residential Villas
                  </h3>

                  <p
                    className="
                      text-gray-400
                      text-sm
                      font-light
                      leading-relaxed
                      mb-6
                      flex-1
                    "
                  >
                    Bespoke homes and residential
                    spaces built with thoughtful
                    architectural planning, quality
                    materials and professional execution.
                  </p>

                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-widest
                      text-white
                      flex
                      items-center
                      gap-2
                    "
                  >
                    Learn More

                    <ArrowUpRight
                      className="
                        w-3.5
                        h-3.5
                        text-[#C35A3E]
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                        transition-transform
                      "
                    />
                  </span>

                </div>

              </Link>

              {/* COMMERCIAL */}

              <Link
                to="/services"
                data-reveal
                className="
                  brickon-sector-card
                  reveal-delay-2
                  text-left
                  group
                  bg-white/5
                  border
                  border-white/10
                  hover:border-[#C35A3E]/50
                  flex
                  flex-col
                  h-full
                  cursor-pointer
                "
              >

                <div
                  className="
                    brickon-image-wrapper
                    aspect-[4/3]
                    overflow-hidden
                    relative
                  "
                >

                  <img
                    src={comImage}
                    alt="BRICKON Commercial Construction"
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/90
                      to-transparent
                      opacity-60
                    "
                  />

                  <div
                    className="
                      absolute
                      bottom-4
                      left-4
                      w-10
                      h-10
                      bg-[#C35A3E]
                      flex
                      items-center
                      justify-center
                      group-hover:scale-110
                      transition-transform
                      duration-300
                    "
                  >
                    <Building className="w-5 h-5 text-white" />
                  </div>

                </div>

                <div
                  className="
                    p-8
                    flex-1
                    flex
                    flex-col
                  "
                >

                  <h3
                    className="
                      text-xl
                      font-bold
                      uppercase
                      tracking-wider
                      mb-3
                      group-hover:text-[#C35A3E]
                      transition-colors
                    "
                  >
                    Commercial Towers
                  </h3>

                  <p
                    className="
                      text-gray-400
                      text-sm
                      font-light
                      leading-relaxed
                      mb-6
                      flex-1
                    "
                  >
                    Professional commercial spaces
                    engineered for functionality,
                    durability and long-term performance.
                  </p>

                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-widest
                      text-white
                      flex
                      items-center
                      gap-2
                    "
                  >
                    Learn More

                    <ArrowUpRight
                      className="
                        w-3.5
                        h-3.5
                        text-[#C35A3E]
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                        transition-transform
                      "
                    />
                  </span>

                </div>

              </Link>

              {/* INDUSTRIAL */}

              <Link
                to="/services"
                data-reveal
                className="
                  brickon-sector-card
                  reveal-delay-3
                  text-left
                  group
                  bg-white/5
                  border
                  border-white/10
                  hover:border-[#C35A3E]/50
                  flex
                  flex-col
                  h-full
                  cursor-pointer
                "
              >

                <div
                  className="
                    brickon-image-wrapper
                    aspect-[4/3]
                    overflow-hidden
                    relative
                  "
                >

                  <img
                    src={indImage}
                    alt="BRICKON Industrial Construction"
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/90
                      to-transparent
                      opacity-60
                    "
                  />

                  <div
                    className="
                      absolute
                      bottom-4
                      left-4
                      w-10
                      h-10
                      bg-[#C35A3E]
                      flex
                      items-center
                      justify-center
                      group-hover:scale-110
                      transition-transform
                      duration-300
                    "
                  >
                    <Factory className="w-5 h-5 text-white" />
                  </div>

                </div>

                <div
                  className="
                    p-8
                    flex-1
                    flex
                    flex-col
                  "
                >

                  <h3
                    className="
                      text-xl
                      font-bold
                      uppercase
                      tracking-wider
                      mb-3
                      group-hover:text-[#C35A3E]
                      transition-colors
                    "
                  >
                    Industrial & PEB
                  </h3>

                  <p
                    className="
                      text-gray-400
                      text-sm
                      font-light
                      leading-relaxed
                      mb-6
                      flex-1
                    "
                  >
                    Large-scale industrial facilities,
                    warehouses and structural solutions
                    planned for efficiency and durability.
                  </p>

                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-widest
                      text-white
                      flex
                      items-center
                      gap-2
                    "
                  >
                    Learn More

                    <ArrowUpRight
                      className="
                        w-3.5
                        h-3.5
                        text-[#C35A3E]
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                        transition-transform
                      "
                    />
                  </span>

                </div>

              </Link>

            </div>

          </div>

        </section>

        {/* =====================================================
            ALL SERVICES — NEW HOME PAGE SECTION
        ===================================================== */}

        <section
          className="
            py-24
            sm:py-32
            bg-[#F9F8F6]
            relative
            overflow-hidden
          "
        >

          {/* BACKGROUND ARCHITECTURAL ELEMENT */}

          <div
            className="
              absolute
              -right-32
              top-20
              w-[500px]
              h-[500px]
              rounded-full
              border
              border-[#C35A3E]/10
              pointer-events-none
            "
          />

          <div
            className="
              absolute
              -right-20
              top-32
              w-[350px]
              h-[350px]
              rounded-full
              border
              border-[#C35A3E]/10
              pointer-events-none
            "
          />

          <div
            className="
              max-w-7xl
              mx-auto
              px-6
              lg:px-10
              relative
              z-10
            "
          >

            {/* HEADER */}

            <div
              data-reveal
              className="
                flex
                flex-col
                lg:flex-row
                lg:items-end
                justify-between
                gap-8
                mb-16
              "
            >

              <div className="max-w-2xl">

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    mb-5
                  "
                >

                  <div
                    className="
                      w-10
                      h-[2px]
                      bg-[#C35A3E]
                    "
                  />

                  <span
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.3em]
                      text-[#C35A3E]
                    "
                  >
                    What We Do
                  </span>

                </div>

                <h2
                  className="
                    text-4xl
                    sm:text-5xl
                    lg:text-6xl
                    font-bold
                    text-[#1A1A1A]
                    uppercase
                    tracking-tight
                    leading-[1]
                  "
                >
                  All

                  <span
                    className="
                      italic
                      text-[#C35A3E]
                    "
                  >
                    {" "}Services
                  </span>
                </h2>

                <p
                  className="
                    mt-6
                    text-gray-600
                    text-base
                    sm:text-lg
                    font-light
                    leading-relaxed
                    max-w-xl
                  "
                >
                  From the first architectural idea to
                  the final handover, BRICKON provides
                  integrated construction solutions
                  designed around quality, precision and
                  professional execution.
                </p>

              </div>

              <Link
                to="/services"
                className="
                  inline-flex
                  items-center
                  gap-3
                  self-start
                  lg:self-end
                  px-6
                  py-4
                  bg-[#1A1A1A]
                  text-white
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-widest
                  hover:bg-[#C35A3E]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >
                Explore All Services

                <ArrowUpRight className="w-4 h-4" />
              </Link>

            </div>

            {/* SERVICE GRID */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-px
                bg-gray-200
                border
                border-gray-200
              "
            >

              {services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <Link
                    key={service.number}
                    to="/services"
                    data-reveal
                    className={`
                      brickon-service-card
                      bg-white
                      p-7
                      sm:p-8
                      min-h-[300px]
                      flex
                      flex-col
                      group
                      cursor-pointer
                      ${index % 4 === 0 ? "reveal-delay-1" : ""}
                      ${index % 4 === 1 ? "reveal-delay-2" : ""}
                      ${index % 4 === 2 ? "reveal-delay-3" : ""}
                      ${index % 4 === 3 ? "reveal-delay-4" : ""}
                    `}
                  >

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        relative
                        z-10
                      "
                    >

                      <div
                        className="
                          brickon-service-icon
                          w-12
                          h-12
                          bg-[#1A1A1A]
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <Icon
                          className="
                            w-5
                            h-5
                            text-white
                          "
                        />
                      </div>

                      <span
                        className="
                          brickon-service-number
                          text-[11px]
                          font-bold
                          text-gray-300
                          tracking-widest
                        "
                      >
                        {service.number}
                      </span>

                    </div>

                    <div
                      className="
                        mt-auto
                        relative
                        z-10
                      "
                    >

                      <h3
                        className="
                          text-lg
                          font-bold
                          text-[#1A1A1A]
                          uppercase
                          tracking-wide
                          leading-tight
                          mb-3
                        "
                      >
                        {service.title}
                      </h3>

                      <p
                        className="
                          text-gray-500
                          text-xs
                          leading-relaxed
                          font-light
                        "
                      >
                        {service.description}
                      </p>

                      <div
                        className="
                          mt-5
                          flex
                          items-center
                          gap-2
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-widest
                          text-[#1A1A1A]
                          group-hover:text-[#C35A3E]
                          transition-colors
                        "
                      >
                        Explore

                        <ArrowUpRight
                          className="
                            w-3.5
                            h-3.5
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                            group-hover:-translate-y-1
                          "
                        />
                      </div>

                    </div>

                  </Link>
                );
              })}

            </div>

          </div>

        </section>

        {/* =====================================================
            OUR CAPABILITIES — NEW HOME PAGE SECTION
        ===================================================== */}

        <section
          className="
            py-24
            sm:py-32
            bg-[#1A1A1A]
            text-white
            relative
            overflow-hidden
          "
        >

          {/* GRID */}

          <div
            className="
              absolute
              inset-0
              opacity-[0.08]
              pointer-events-none
            "
            style={{
              backgroundImage: `
                linear-gradient(
                  to right,
                  rgba(255,255,255,0.15) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  to bottom,
                  rgba(255,255,255,0.15) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* GLOW */}

          <div
            className="
              absolute
              left-0
              top-1/4
              w-[450px]
              h-[450px]
              rounded-full
              bg-[#C35A3E]/10
              blur-[130px]
              pointer-events-none
            "
          />

          <div
            className="
              max-w-7xl
              mx-auto
              px-6
              lg:px-10
              relative
              z-10
            "
          >

            {/* HEADER */}

            <div
              data-reveal
              className="
                grid
                grid-cols-1
                lg:grid-cols-12
                gap-10
                mb-16
              "
            >

              <div className="lg:col-span-7">

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    mb-5
                  "
                >

                  <div
                    className="
                      w-10
                      h-[2px]
                      bg-[#C35A3E]
                    "
                  />

                  <span
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.3em]
                      text-[#C35A3E]
                    "
                  >
                    Built To Deliver
                  </span>

                </div>

                <h2
                  className="
                    text-4xl
                    sm:text-5xl
                    lg:text-6xl
                    font-bold
                    uppercase
                    tracking-tight
                    leading-[1]
                  "
                >
                  Our

                  <br />

                  <span
                    className="
                      italic
                      text-[#C35A3E]
                    "
                  >
                    Capabilities
                  </span>
                </h2>

              </div>

              <div
                className="
                  lg:col-span-5
                  flex
                  items-end
                "
              >

                <p
                  className="
                    text-gray-400
                    text-base
                    leading-relaxed
                    font-light
                    max-w-lg
                  "
                >
                  Our capabilities bring together
                  architecture, engineering, construction
                  management and quality control to create
                  a disciplined project delivery process
                  from concept to completion.
                </p>

              </div>

            </div>

            {/* CAPABILITY CONTENT */}

            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-12
                gap-12
              "
            >

              {/* LEFT STATEMENT */}

              <div
                data-reveal="left"
                className="
                  lg:col-span-4
                  relative
                "
              >

                <div
                  className="
                    brickon-capability-line
                    pl-8
                    min-h-full
                  "
                >

                  <div className="pt-2">

                    <span
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.3em]
                        text-[#C35A3E]
                      "
                    >
                      Construction Excellence
                    </span>

                    <h3
                      className="
                        mt-5
                        text-2xl
                        sm:text-3xl
                        font-bold
                        uppercase
                        leading-tight
                      "
                    >
                      Precision In
                      <br />
                      Every Detail.
                    </h3>

                    <p
                      className="
                        mt-6
                        text-gray-500
                        text-sm
                        leading-relaxed
                        font-light
                      "
                    >
                      We combine experienced teams,
                      structured processes and technical
                      expertise to maintain consistent
                      quality across every stage of a
                      construction project.
                    </p>

                    <div
                      className="
                        mt-8
                        inline-flex
                        items-center
                        gap-3
                        text-[#C35A3E]
                      "
                    >
                      <ShieldCheck className="w-5 h-5" />

                      <span
                        className="
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-widest
                        "
                      >
                        Quality Driven Execution
                      </span>
                    </div>

                  </div>

                </div>

              </div>

              {/* RIGHT GRID */}

              <div
                className="
                  lg:col-span-8
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-4
                "
              >

                {capabilities.map((capability, index) => {
                  const Icon = capability.icon;

                  return (
                    <div
                      key={capability.title}
                      data-reveal="right"
                      className={`
                        brickon-capability-card
                        border
                        border-white/10
                        bg-white/[0.025]
                        p-6
                        sm:p-7
                        group
                        ${index % 4 === 0 ? "reveal-delay-1" : ""}
                        ${index % 4 === 1 ? "reveal-delay-2" : ""}
                        ${index % 4 === 2 ? "reveal-delay-3" : ""}
                        ${index % 4 === 3 ? "reveal-delay-4" : ""}
                      `}
                    >

                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-4
                        "
                      >

                        <Icon
                          className="
                            brickon-capability-icon
                            w-6
                            h-6
                            text-[#C35A3E]
                          "
                        />

                        <span
                          className="
                            text-[9px]
                            text-gray-600
                            font-bold
                            tracking-widest
                          "
                        >
                          0{index + 1}
                        </span>

                      </div>

                      <h4
                        className="
                          mt-8
                          text-sm
                          sm:text-base
                          font-bold
                          uppercase
                          tracking-wider
                        "
                      >
                        {capability.title}
                      </h4>

                      <p
                        className="
                          mt-3
                          text-gray-500
                          text-xs
                          leading-relaxed
                          font-light
                        "
                      >
                        {capability.description}
                      </p>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* BOTTOM BAR */}

            <div
              data-reveal
              className="
                mt-16
                pt-8
                border-t
                border-white/10
                flex
                flex-col
                md:flex-row
                md:items-center
                justify-between
                gap-6
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <span
                  className="
                    w-2
                    h-2
                    rounded-full
                    bg-[#C35A3E]
                    animate-pulse
                  "
                />

                <span
                  className="
                    text-[10px]
                    text-gray-400
                    uppercase
                    tracking-[0.25em]
                    font-bold
                  "
                >
                  From Concept To Completion
                </span>

              </div>

              <Link
                to="/services"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-widest
                  text-white
                  hover:text-[#C35A3E]
                  transition-colors
                "
              >
                Discover Our Expertise

                <ArrowRight
                  className="
                    w-4
                    h-4
                    transition-transform
                    group-hover:translate-x-1
                  "
                />
              </Link>

            </div>

          </div>

        </section>

        {/* =====================================================
            CTA
        ===================================================== */}

        <section
          className="
            py-24
            bg-[#C35A3E]
            text-white
            text-center
            relative
            overflow-hidden
          "
        >

          <div
            className="
              brickon-cta-grid
              absolute
              inset-0
              pointer-events-none
              opacity-20
            "
            style={{
              backgroundImage: `
                linear-gradient(
                  to right,
                  rgba(255,255,255,0.1) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  to bottom,
                  rgba(255,255,255,0.1) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "24px 24px",
            }}
          />

          <div
            className="
              absolute
              -top-32
              -left-32
              w-64
              h-64
              border
              border-white/10
              rounded-full
            "
          />

          <div
            className="
              absolute
              -bottom-40
              -right-40
              w-96
              h-96
              border
              border-white/10
              rounded-full
            "
          />

          <div
            data-reveal="scale"
            className="
              max-w-3xl
              mx-auto
              px-6
              relative
              z-10
            "
          >

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                border
                border-white/20
                bg-white/5
                text-[10px]
                font-bold
                uppercase
                tracking-[0.3em]
                mb-7
              "
            >

              <Sparkles className="w-3.5 h-3.5" />

              Build With Confidence

            </div>

            <h2
              className="
                text-4xl
                sm:text-5xl
                lg:text-6xl
                font-bold
                uppercase
                tracking-tight
                mb-6
              "
            >
              Ready to Build

              <br className="hidden sm:block" />

              Your Legacy?
            </h2>

            <p
              className="
                text-white/80
                text-base
                sm:text-lg
                font-light
                mb-10
                max-w-xl
                mx-auto
                leading-relaxed
              "
            >
              Start a conversation with the
              BRICKON team about your next
              construction project. Let’s turn
              your vision into a well-planned,
              professionally executed space.
            </p>

            <button
              onClick={onOpenProjectModal}
              className="
                brickon-button
                bg-[#1A1A1A]
                hover:bg-black
                text-white
                px-10
                py-5
                text-[11px]
                font-bold
                uppercase
                tracking-widest
                shadow-2xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]
                cursor-pointer
                inline-flex
                items-center
                gap-3
              "
            >

              <span>Request Consultation</span>

              <ArrowUpRight
                className="
                  w-4
                  h-4
                  text-[#C35A3E]
                "
              />

            </button>

          </div>

        </section>

      </div>
    </>
  );
};

export default Hero;