import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronDown,
  Volume2,
  VolumeX,
  ShieldCheck,
  Ruler,
  HardHat,
  BadgeCheck,
  Building,
  Home as HomeIcon,
  Factory,
  ArrowRight,
} from "lucide-react";

/* -----------------------------------------
   AUTOMATIC COUNT-UP HOOK
----------------------------------------- */
const useAutoCountUp = (
  initialValue,
  duration = 2000,
  start = false,
  incrementEvery = 10000,
  maxValue = null
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let animationFrame;
    let startTime = null;

    /* -----------------------------------------
       INITIAL COUNT-UP ANIMATION
    ----------------------------------------- */
    const animate = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out animation
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easeOut * initialValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(initialValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    /* -----------------------------------------
       AUTOMATIC INCREMENT
    ----------------------------------------- */
    const interval = setInterval(() => {
      setCount((previousValue) => {
        const nextValue = previousValue + 1;

        // Optional maximum limit
        if (maxValue !== null && nextValue > maxValue) {
          return maxValue;
        }

        return nextValue;
      });
    }, incrementEvery);

    /* -----------------------------------------
       CLEANUP
    ----------------------------------------- */
    return () => {
      cancelAnimationFrame(animationFrame);
      clearInterval(interval);
    };
  }, [
    initialValue,
    duration,
    start,
    incrementEvery,
    maxValue,
  ]);

  return count;
};

/* -----------------------------------------
   HERO / HOME COMPONENT
----------------------------------------- */
export const Hero = ({
  onNavigate,
  onOpenProjectModal,
}) => {
  const videoRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);
  const [startCounters, setStartCounters] = useState(false);

  /* -----------------------------------------
     IMAGES
  ----------------------------------------- */
  const visionImage =
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

  const resImage =
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80";

  const comImage =
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";

  const indImage =
    "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80";

  /* -----------------------------------------
     START COUNTERS
  ----------------------------------------- */
  useEffect(() => {
    setStartCounters(true);
  }, []);

  /* -----------------------------------------
     COMPANY STATISTICS
     
     IMPORTANT:
     These should represent actual BRICKON
     company figures in the production website.
  ----------------------------------------- */

  // Founded year does NOT increase
  const foundedYear = 2018;

  // Projects increase every 10 seconds
  const projectsDelivered = useAutoCountUp(
    124,
    2200,
    startCounters,
    10000
  );

  // Awards increase every 30 seconds
  const industryAwards = useAutoCountUp(
    15,
    1700,
    startCounters,
    30000
  );

  // Safety percentage remains fixed
  const safetyRecord = 100;

  /* -----------------------------------------
     VIDEO SOUND TOGGLE
  ----------------------------------------- */
  const toggleMute = () => {
    if (!videoRef.current) return;

    const newMutedState = !isMuted;

    videoRef.current.muted = newMutedState;

    setIsMuted(newMutedState);
  };

  return (
    <div className="w-full bg-[#F9F8F6]">

      {/* =====================================================
          PART 1: HERO SECTION
      ===================================================== */}
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

        {/* -----------------------------------------
            BACKGROUND GRID
        ----------------------------------------- */}
        <div
          className="
            absolute
            inset-0
            bg-grid-pattern
            opacity-30
            pointer-events-none
          "
        />

        {/* -----------------------------------------
            ARCHITECTURAL CORNER
        ----------------------------------------- */}
        <div
          className="
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
            opacity-10
            pointer-events-none
            hidden
            sm:block
          "
        />

        {/* -----------------------------------------
            GLOW
        ----------------------------------------- */}
        <div
          className="
            absolute
            top-1/4
            left-0
            w-96
            h-96
            bg-[#C35A3E]/10
            rounded-full
            blur-[120px]
            pointer-events-none
          "
        />

        {/* -----------------------------------------
            MAIN HERO CONTAINER
        ----------------------------------------- */}
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

            {/* =================================================
                LEFT: HERO CONTENT
            ================================================= */}
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

              {/* -----------------------------------------
                  EYEBROW
              ----------------------------------------- */}
              <div
                className="
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
                    w-1.5
                    h-1.5
                    rounded-full
                    bg-[#C35A3E]
                    animate-ping
                  "
                />

                <span>
                  Premium Construction & Architecture
                </span>
              </div>

              {/* -----------------------------------------
                  HEADLINE
              ----------------------------------------- */}
              <h1
                id="hero-main-headline"
                className="
                  text-white
                  text-5xl
                  sm:text-6xl
                  lg:text-7xl
                  font-light
                  tracking-tight
                  leading-[0.95]
                  uppercase
                "
              >
                WE BUILD YOUR
                <br />

                <span className="font-black italic text-white">
                  DREAM
                </span>
              </h1>

              {/* -----------------------------------------
                  SUBTEXT
              ----------------------------------------- */}
              <p
                id="hero-subtext"
                className="
                  mt-6
                  text-gray-400
                  text-base
                  sm:text-lg
                  max-w-xl
                  font-light
                  leading-relaxed
                "
              >
                From architectural vision to final handover,
                we create spaces that combine thoughtful design,
                engineering precision, and lasting quality.
              </p>

              {/* -----------------------------------------
                  CTA BUTTONS
              ----------------------------------------- */}
              <div
                className="
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

                {/* PRIMARY CTA */}
                <button
                  onClick={onOpenProjectModal}
                  className="
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
                    cursor-pointer
                    flex
                    items-center
                    justify-center
                    gap-2
                    min-h-[44px]
                  "
                >
                  <span>
                    Start Your Project
                  </span>

                  <ArrowUpRight className="w-4 h-4" />
                </button>

                {/* SECONDARY CTA */}
                <Link
                  to="/projects"
                  className="
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
                    transition-all
                    cursor-pointer
                    flex
                    items-center
                    justify-center
                    gap-2
                    min-h-[44px]
                  "
                >
                  <span>
                    Explore Our Projects
                  </span>

                  <ArrowUpRight className="w-4 h-4" />
                </Link>

              </div>

              {/* =================================================
                  STATISTICS
              ================================================= */}
              <div
                className="
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

                {/* -----------------------------------------
                    FOUNDED YEAR
                ----------------------------------------- */}
                <div
                  className="
                    border-l-2
                    border-[#C35A3E]
                    pl-3
                  "
                >
                  <div
                    className="
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

                {/* -----------------------------------------
                    PROJECTS DELIVERED
                ----------------------------------------- */}
                <div
                  className="
                    border-l-2
                    border-[#C35A3E]
                    pl-3
                  "
                >
                  <div
                    className="
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

                {/* -----------------------------------------
                    AWARDS
                ----------------------------------------- */}
                <div
                  className="
                    border-l-2
                    border-[#C35A3E]
                    pl-3
                  "
                >
                  <div
                    className="
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

                {/* -----------------------------------------
                    SAFETY
                ----------------------------------------- */}
                <div
                  className="
                    border-l-2
                    border-[#C35A3E]
                    pl-3
                  "
                >
                  <div
                    className="
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

            {/* =================================================
                RIGHT: FOREGROUND VIDEO
            ================================================= */}
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
                  relative
                  w-full
                  max-w-sm
                  sm:max-w-md
                  lg:max-w-[420px]
                  aspect-[9/16]
                  rounded-2xl
                  overflow-hidden
                  shadow-[0_20px_50px_rgba(0,0,0,0.5)]
                  border
                  border-white/10
                  group
                "
              >

                {/* VIDEO */}
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
                  "
                />

                {/* OVERLAY */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/80
                    via-transparent
                    to-transparent
                    pointer-events-none
                  "
                />

                {/* -----------------------------------------
                    VIDEO INFORMATION
                ----------------------------------------- */}
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

                  {/* SOUND */}
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

        {/* -----------------------------------------
            SCROLL INDICATOR
        ----------------------------------------- */}
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
            onClick={() => {
              const nextSection =
                document.getElementById(
                  "home-vision-section"
                );

              if (nextSection) {
                nextSection.scrollIntoView({
                  behavior: "smooth",
                });
              }
            }}
            className="
              text-gray-400
              hover:text-white
              transition-colors
              p-2
              flex
              flex-col
              items-center
              gap-1
              text-[10px]
              tracking-widest
              uppercase
              cursor-pointer
            "
          >
            <span>
              Discover BRICKON
            </span>

            <ChevronDown
              className="
                w-3.5
                h-3.5
                animate-bounce
                text-[#C35A3E]
              "
            />
          </button>
        </div>

      </section>

      {/* =====================================================
          PART 2: VISION & PHILOSOPHY
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

            {/* TEXT */}
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
                  transition-all
                  cursor-pointer
                "
              >
                <span>
                  Read Our Full Story
                </span>

                <ArrowRight className="w-4 h-4" />
              </Link>

            </div>

            {/* IMAGE */}
            <div className="relative">

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
                  relative
                  aspect-[4/5]
                  sm:aspect-square
                  lg:aspect-[4/5]
                  overflow-hidden
                  shadow-xl
                  group
                "
              >

                <img
                  src={visionImage}
                  alt="BRICKON Architectural Construction"
                  className="
                    w-full
                    h-full
                    object-cover
                    group-hover:scale-105
                    transition-transform
                    duration-1000
                  "
                />

                {/* QUALITY CARD */}
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
                      Quality control and professional
                      execution at every stage of the
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
          PART 3: CORE DISCIPLINES
      ===================================================== */}
      <section
        className="
          py-24
          sm:py-32
          bg-[#1A1A1A]
          text-white
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

          {/* HEADER */}
          <div
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
                transition-all
                cursor-pointer
              "
            >
              <span>
                View All Services
              </span>

              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>

          {/* CARDS */}
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
              className="
                text-left
                group
                bg-white/5
                border
                border-white/10
                hover:border-[#C35A3E]/50
                transition-colors
                flex
                flex-col
                h-full
                cursor-pointer
              "
            >

              <div
                className="
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
                    group-hover:scale-105
                    transition-transform
                    duration-700
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/80
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
                  "
                >
                  <HomeIcon
                    className="
                      w-5
                      h-5
                      text-white
                    "
                  />
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
                  Bespoke homes and residential spaces
                  built with thoughtful architectural
                  planning, quality materials and
                  professional execution.
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
                    "
                  />
                </span>

              </div>

            </Link>

            {/* COMMERCIAL */}
            <Link
              to="/services"
              className="
                text-left
                group
                bg-white/5
                border
                border-white/10
                hover:border-[#C35A3E]/50
                transition-colors
                flex
                flex-col
                h-full
                cursor-pointer
              "
            >

              <div
                className="
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
                    group-hover:scale-105
                    transition-transform
                    duration-700
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/80
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
                  "
                >
                  <Building
                    className="
                      w-5
                      h-5
                      text-white
                    "
                  />
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
                    "
                  />
                </span>

              </div>

            </Link>

            {/* INDUSTRIAL */}
            <Link
              to="/services"
              className="
                text-left
                group
                bg-white/5
                border
                border-white/10
                hover:border-[#C35A3E]/50
                transition-colors
                flex
                flex-col
                h-full
                cursor-pointer
              "
            >

              <div
                className="
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
                    group-hover:scale-105
                    transition-transform
                    duration-700
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/80
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
                  "
                >
                  <Factory
                    className="
                      w-5
                      h-5
                      text-white
                    "
                  />
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
                    "
                  />
                </span>

              </div>

            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          PART 4: CALL TO ACTION
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

        {/* BACKGROUND GRID */}
        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]
            bg-[size:24px_24px]
            opacity-20
            pointer-events-none
          "
        />

        <div
          className="
            max-w-3xl
            mx-auto
            px-6
            relative
            z-10
          "
        >

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
            "
          >
            Start a conversation with the BRICKON
            team about your next construction project.
            Let’s turn your vision into a well-planned,
            professionally executed space.
          </p>

          <button
            onClick={onOpenProjectModal}
            className="
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
              cursor-pointer
              inline-flex
              items-center
              gap-3
            "
          >
            <span>
              Request Consultation
            </span>

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
  );
};

