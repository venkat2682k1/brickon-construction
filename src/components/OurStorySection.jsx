import React, { useEffect, useRef, useState } from "react";
import { storyMilestones } from "../data/companyData";
import {
  ArrowUpRight,
  Award,
  Calendar,
  CheckCircle2,
  Users,
} from "lucide-react";

/* =========================================================
   COUNT UP HOOK
========================================================= */

const useCountUp = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

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
      cancelAnimationFrame(animationFrame);
    };
  }, [target, duration, start]);

  return count;
};

/* =========================================================
   REVEAL ANIMATION HOOK
========================================================= */

const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

/* =========================================================
   OUR STORY SECTION
========================================================= */

export const OurStorySection = ({
  onNavigate,
  onOpenProjectModal,
}) => {
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] =
    useState(0);

  const sectionRef = useRef(null);

  const [startCounters, setStartCounters] = useState(false);

  /* =========================================================
     REVEAL SECTIONS
  ========================================================= */

  const [headerRef, headerVisible] = useReveal();
  const [storyRef, storyVisible] = useReveal();
  const [timelineRef, timelineVisible] = useReveal();

  /* =========================================================
     COUNTER OBSERVER
  ========================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounters(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =========================================================
     ANIMATED COUNTERS
  ========================================================= */

  const years = useCountUp(
    8,
    1800,
    startCounters
  );

  const onTimeHandover = useCountUp(
    100,
    2000,
    startCounters
  );

  const structuresBuilt = useCountUp(
    250,
    2200,
    startCounters
  );

  /* =========================================================
     SELECTED MILESTONE
  ========================================================= */

  const selectedMilestone =
    storyMilestones[selectedMilestoneIndex];

  return (
    <section
      ref={sectionRef}
      id="our-story"
      aria-labelledby="our-story-heading"
      className="
        relative
        overflow-hidden
        border-t
        border-gray-200
        bg-[#F9F8F6]
        py-20
        sm:py-28
        text-[#1A1A1A]
      "
    >

      {/* =====================================================
          SEO SEMANTIC CONTENT
      ===================================================== */}

      <header
        ref={headerRef}
        className={`
          relative
          z-10
          mx-auto
          max-w-7xl
          px-6
          lg:px-10
          transition-all
          duration-1000
          ease-out
          ${
            headerVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }
        `}
      >

        <div className="max-w-3xl">

          {/* LABEL */}

          <div className="mb-3 flex items-center gap-3">

            <div
              className="
                h-[2px]
                w-8
                bg-[#C35A3E]
              "
            />

            <span
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.2em]
                text-[#C35A3E]
              "
            >
              The Journey Since 2018
            </span>

          </div>

          {/* MAIN SEO HEADING */}

          <h1
            id="our-story-heading"
            className="
              text-3xl
              font-bold
              uppercase
              leading-[1.05]
              tracking-tight
              sm:text-5xl
            "
          >
            Our Story &

            <br />

            <span className="italic text-[#C35A3E]">
              Architectural Heritage
            </span>
          </h1>

          {/* SEO DESCRIPTION */}

          <p
            className="
              mt-5
              text-base
              font-light
              leading-relaxed
              text-gray-600
              sm:text-lg
            "
          >
            Discover the story behind BRICKON Construction,
            a construction and architectural company focused
            on quality, precision, engineering and
            professionally executed residential, commercial
            and industrial projects.
          </p>

        </div>

      </header>


      {/* =====================================================
          BACKGROUND GRID
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-grid-pattern-light
          opacity-50
        "
      />


      {/* =====================================================
          STORY + STATISTICS
      ===================================================== */}

      <div
        ref={storyRef}
        className={`
          relative
          z-10
          mx-auto
          mt-14
          max-w-7xl
          px-6
          lg:px-10
          transition-all
          duration-1000
          ${
            storyVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
          }
        `}
      >

        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12">

          {/* =================================================
              FOUNDER'S CREDO
          ================================================= */}

          <article
            className="
              group
              relative
              flex
              flex-col
              justify-between
              overflow-hidden
              border
              border-gray-200
              bg-white
              p-8
              shadow-sm
              transition-all
              duration-500
              hover:-translate-y-1
              hover:shadow-xl
              sm:p-10
              lg:col-span-7
            "
          >

            {/* ANIMATED CORNER */}

            <div
              className="
                pointer-events-none
                absolute
                -right-16
                -top-16
                h-40
                w-40
                rounded-full
                bg-[#C35A3E]/10
                blur-3xl
                transition-transform
                duration-700
                group-hover:scale-150
              "
            />

            <div className="relative">

              <div
                className="
                  mb-4
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-[#C35A3E]
                "
              >
                Founder&apos;s Credo
              </div>

              <blockquote
                className="
                  text-base
                  font-light
                  italic
                  leading-relaxed
                  text-gray-700
                  sm:text-lg
                "
              >
                &quot;A building is not merely concrete and
                rebar; it is an enduring sanctuary for
                families, enterprises, and future
                generations. When you entrust us with your
                vision, we honor that trust with unshakeable
                integrity, surgical quality checks, and
                uncompromising respect for time.&quot;
              </blockquote>

            </div>

            <div
              className="
                relative
                mt-8
                flex
                items-center
                justify-between
                border-t
                border-gray-100
                pt-6
              "
            >

              <div>

                <div
                  className="
                    text-sm
                    font-bold
                    uppercase
                    tracking-wider
                  "
                >
                  Executive Engineering Board
                </div>

                <div className="mt-1 text-xs text-gray-500">
                  BRICKON Construction | Est. 2018
                </div>

              </div>

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  border
                  border-gray-200
                  bg-[#F9F8F6]
                  text-xs
                  font-bold
                  tracking-wider
                  text-[#C35A3E]
                  transition-all
                  duration-300
                  group-hover:rotate-6
                "
              >
                BC
              </div>

            </div>

          </article>


          {/* =================================================
              STATISTICS
          ================================================= */}

          <div
            className="
              grid
              grid-cols-2
              gap-4
              lg:col-span-5
            "
          >

            {/* YEARS */}

            <article
              className="
                group
                flex
                flex-col
                justify-between
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-lg
              "
            >

              <Calendar
                className="
                  mb-4
                  h-5
                  w-5
                  text-[#C35A3E]
                  transition-transform
                  duration-500
                  group-hover:rotate-12
                "
              />

              <div>

                <div
                  className="
                    tabular-nums
                    text-2xl
                    font-bold
                    sm:text-3xl
                  "
                >
                  {years}+
                </div>

                <div
                  className="
                    mt-1
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-widest
                    text-gray-400
                  "
                >
                  Years of Excellence
                </div>

              </div>

            </article>


            {/* ON-TIME HANDOVER */}

            <article
              className="
                group
                flex
                flex-col
                justify-between
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-lg
              "
            >

              <Award
                className="
                  mb-4
                  h-5
                  w-5
                  text-[#C35A3E]
                  transition-transform
                  duration-500
                  group-hover:scale-110
                "
              />

              <div>

                <div
                  className="
                    tabular-nums
                    text-2xl
                    font-bold
                    sm:text-3xl
                  "
                >
                  {onTimeHandover}%
                </div>

                <div
                  className="
                    mt-1
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-widest
                    text-gray-400
                  "
                >
                  On-Time Handover
                </div>

              </div>

            </article>


            {/* STRUCTURES */}

            <article
              className="
                group
                flex
                flex-col
                justify-between
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-lg
              "
            >

              <Users
                className="
                  mb-4
                  h-5
                  w-5
                  text-[#C35A3E]
                  transition-transform
                  duration-500
                  group-hover:translate-x-1
                "
              />

              <div>

                <div
                  className="
                    tabular-nums
                    text-2xl
                    font-bold
                    sm:text-3xl
                  "
                >
                  {structuresBuilt}+
                </div>

                <div
                  className="
                    mt-1
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-widest
                    text-gray-400
                  "
                >
                  Structures Built
                </div>

              </div>

            </article>


            {/* MATERIAL TESTING */}

            <article
              className="
                group
                flex
                flex-col
                justify-between
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-lg
              "
            >

              <CheckCircle2
                className="
                  mb-4
                  h-5
                  w-5
                  text-[#C35A3E]
                  transition-transform
                  duration-500
                  group-hover:scale-110
                "
              />

              <div>

                <div
                  className="
                    text-2xl
                    font-bold
                    sm:text-3xl
                  "
                >
                  NABL
                </div>

                <div
                  className="
                    mt-1
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-widest
                    text-gray-400
                  "
                >
                  Lab Tested Materials
                </div>

              </div>

            </article>

          </div>

        </div>


        {/* =====================================================
            TIMELINE
        ===================================================== */}

        <div
          ref={timelineRef}
          className={`
            transition-all
            duration-1000
            ${
              timelineVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }
          `}
        >

          {/* TIMELINE HEADER */}

          <div
            className="
              mb-8
              flex
              flex-col
              justify-between
              border-b
              border-gray-200
              pb-4
              md:flex-row
              md:items-end
            "
          >

            <div>

              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-widest
                  text-[#C35A3E]
                "
              >
                Evolution Timeline
              </span>

              <h2
                className="
                  mt-1
                  text-2xl
                  font-bold
                  uppercase
                  tracking-tight
                  sm:text-3xl
                "
              >
                Milestones of Growth
              </h2>

            </div>

            <p
              className="
                mt-2
                text-xs
                text-gray-500
                md:mt-0
              "
            >
              Explore BRICKON&apos;s journey and key milestones.
            </p>

          </div>


          {/* =================================================
              MILESTONE BUTTONS
          ================================================= */}

          <div
            className="
              grid
              grid-cols-2
              gap-2
              sm:grid-cols-5
              sm:gap-3
            "
          >

            {storyMilestones.map((milestone, idx) => {

              const isSelected =
                selectedMilestoneIndex === idx;

              return (
                <button
                  key={milestone.year}
                  type="button"
                  onClick={() =>
                    setSelectedMilestoneIndex(idx)
                  }
                  aria-pressed={isSelected}
                  className={`
                    group
                    relative
                    overflow-hidden
                    border
                    px-3
                    py-3
                    text-center
                    transition-all
                    duration-300
                    sm:px-4
                    sm:py-4
                    ${
                      isSelected
                        ? "border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-lg"
                        : "border-gray-200 bg-white text-gray-500 hover:-translate-y-1 hover:border-[#C35A3E] hover:text-[#1A1A1A]"
                    }
                  `}
                >

                  <div
                    className={`
                      text-lg
                      font-bold
                      transition-transform
                      duration-300
                      sm:text-xl
                      ${
                        isSelected
                          ? ""
                          : "group-hover:scale-105"
                      }
                    `}
                  >
                    {milestone.year}
                  </div>

                  <div
                    className="
                      mt-0.5
                      hidden
                      truncate
                      text-[10px]
                      uppercase
                      tracking-wider
                      opacity-80
                      sm:block
                    "
                  >
                    {milestone.title.split(" ")[0]}
                  </div>

                  {/* ACTIVE INDICATOR */}

                  <span
                    className={`
                      absolute
                      bottom-0
                      left-0
                      h-[2px]
                      bg-[#C35A3E]
                      transition-all
                      duration-500
                      ${
                        isSelected
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }
                    `}
                  />

                </button>
              );
            })}

          </div>


          {/* =================================================
              SELECTED MILESTONE
          ================================================= */}

          {selectedMilestone && (

            <article
              key={selectedMilestone.year}
              className="
                mt-8
                grid
                grid-cols-1
                items-center
                gap-8
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                animate-[fadeIn_0.5s_ease-out]
                lg:grid-cols-12
                sm:p-10
              "
            >

              {/* CONTENT */}

              <div className="space-y-4 lg:col-span-7">

                <div
                  className="
                    inline-block
                    border
                    border-[#C35A3E]/20
                    bg-[#C35A3E]/10
                    px-3
                    py-1
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-widest
                    text-[#C35A3E]
                  "
                >
                  {selectedMilestone.metric}
                </div>

                <h3
                  className="
                    text-2xl
                    font-bold
                    uppercase
                    tracking-tight
                    sm:text-3xl
                  "
                >
                  {selectedMilestone.year}
                  {" | "}
                  {selectedMilestone.title}
                </h3>

                <p
                  className="
                    text-sm
                    font-light
                    leading-relaxed
                    text-gray-600
                    sm:text-base
                  "
                >
                  {selectedMilestone.description}
                </p>

                <button
                  type="button"
                  onClick={onOpenProjectModal}
                  className="
                    group
                    mt-2
                    inline-flex
                    items-center
                    gap-2
                    bg-[#1A1A1A]
                    px-6
                    py-3
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-widest
                    text-white
                    shadow-sm
                    transition-all
                    duration-300
                    hover:bg-[#C35A3E]
                  "
                >

                  Start a Project With Us

                  <ArrowUpRight
                    className="
                      h-3.5
                      w-3.5
                      transition-transform
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                    "
                  />

                </button>

              </div>


              {/* IMAGE */}

              <div className="lg:col-span-5">

                <div
                  className="
                    group
                    relative
                    overflow-hidden
                    border
                    border-gray-200
                    shadow-sm
                  "
                >

                  <img
                    src={selectedMilestone.image}
                    alt={`${selectedMilestone.title} - BRICKON Construction`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="
                      h-60
                      w-full
                      object-cover
                      transition-transform
                      duration-1000
                      ease-out
                      group-hover:scale-105
                      sm:h-72
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
                    "
                  />

                  <div
                    className="
                      absolute
                      bottom-3
                      right-3
                      border
                      border-gray-200
                      bg-white/95
                      px-3
                      py-1
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-[#1A1A1A]
                      backdrop-blur-sm
                    "
                  >
                    BRICKON Archive | {selectedMilestone.year}
                  </div>

                </div>

              </div>

            </article>

          )}

        </div>

      </div>


      {/* =====================================================
          INLINE ANIMATION
      ===================================================== */}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
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