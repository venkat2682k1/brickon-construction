import React, { useEffect, useRef, useState } from "react";
import { storyMilestones } from "../data/companyData";
import {
  ArrowUpRight,
  Award,
  Calendar,
  CheckCircle2,
  Users,
} from "lucide-react";

/* =========================================
   COUNT UP HOOK
========================================= */
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

      // Smooth ease-out
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

/* =========================================
   OUR STORY SECTION
========================================= */
export const OurStorySection = ({
  onNavigate,
  onOpenProjectModal,
}) => {
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState(0);

  /* =========================================
     COUNTER SECTION REFERENCE
  ========================================= */
  const sectionRef = useRef(null);

  const [startCounters, setStartCounters] = useState(false);

  /* =========================================
     DETECT WHEN SECTION ENTERS VIEWPORT
  ========================================= */
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounters(true);

          // Start only once
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

  /* =========================================
     ANIMATED COUNTERS
  ========================================= */

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

  return (
    <section
      ref={sectionRef}
      id="our-story"
      className="py-20 sm:py-28 bg-[#F9F8F6] text-[#1A1A1A] relative overflow-hidden border-t border-gray-200"
    >
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 bg-grid-pattern-light opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        {/* =========================================
            HEADER
        ========================================= */}
        <div className="max-w-3xl mb-14">

          <div className="flex items-center gap-3 mb-3">

            <div className="w-8 h-[2px] bg-[#C35A3E]" />

            <span className="text-[10px] font-black uppercase tracking-widest text-[#C35A3E]">
              THE JOURNEY SINCE 2018
            </span>

          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight uppercase leading-[1.1] text-[#1A1A1A]">
            OUR STORY & <br />

            <span className="italic text-[#C35A3E]">
              ARCHITECTURAL HERITAGE
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-600 font-light leading-relaxed">
            In 2018, Brickon Construction started with a radical ambition:
            to eliminate the compromises and opacity historically associated
            with general contracting. By integrating deep structural civil
            engineering with artisanal craftsmanship, we build spaces that
            stand the test of generations.
          </p>

        </div>

        {/* =========================================
            STORY + STATS
        ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

          {/* FOUNDER'S CREDO */}
          <div className="lg:col-span-7 bg-white border border-gray-200 p-8 sm:p-10 shadow-sm relative overflow-hidden flex flex-col justify-between">

            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C35A3E]/5 rounded-full blur-2xl pointer-events-none" />

            <div>

              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C35A3E] mb-4">
                FOUNDER'S CREDO
              </div>

              <blockquote className="text-base sm:text-lg font-light text-gray-700 italic leading-relaxed">
                "A building is not merely concrete and rebar; it is an
                enduring sanctuary for families, enterprises, and future
                generations. When you entrust us with your vision, we honor
                that trust with unshakeable integrity, surgical quality
                checks, and uncompromising respect for time."
              </blockquote>

            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">

              <div>

                <div className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider">
                  Executive Engineering Board
                </div>

                <div className="text-xs text-gray-500">
                  Brickon Construction | Est. 2018
                </div>

              </div>

              <div className="w-10 h-10 bg-[#F9F8F6] border border-gray-200 flex items-center justify-center text-[#C35A3E] font-bold text-xs tracking-wider">
                BC
              </div>

            </div>

          </div>

          {/* =========================================
              ANIMATED STATISTICS
          ========================================= */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">

            {/* YEARS */}
            <div className="bg-white border border-gray-200 p-6 shadow-sm flex flex-col justify-between">

              <Calendar className="w-5 h-5 text-[#C35A3E] mb-4" />

              <div>

                <div className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tabular-nums">
                  {years}+
                </div>

                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                  Unbroken Excellence
                </div>

              </div>

            </div>

            {/* ON-TIME HANDOVER */}
            <div className="bg-white border border-gray-200 p-6 shadow-sm flex flex-col justify-between">

              <Award className="w-5 h-5 text-[#C35A3E] mb-4" />

              <div>

                <div className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tabular-nums">
                  {onTimeHandover}%
                </div>

                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                  On-Time Handover
                </div>

              </div>

            </div>

            {/* STRUCTURES BUILT */}
            <div className="bg-white border border-gray-200 p-6 shadow-sm flex flex-col justify-between">

              <Users className="w-5 h-5 text-[#C35A3E] mb-4" />

              <div>

                <div className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tabular-nums">
                  {structuresBuilt}+
                </div>

                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                  Structures Built
                </div>

              </div>

            </div>

            {/* NABL */}
            <div className="bg-white border border-gray-200 p-6 shadow-sm flex flex-col justify-between">

              <CheckCircle2 className="w-5 h-5 text-[#C35A3E] mb-4" />

              <div>

                <div className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                  NABL
                </div>

                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                  Lab Tested Materials
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* =========================================
            TIMELINE
        ========================================= */}
        <div className="mt-14">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200">

            <div>

              <span className="text-[10px] font-black uppercase tracking-widest text-[#C35A3E]">
                EVOLUTION TIMELINE
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] uppercase tracking-tight mt-1">
                Milestones of Growth & Innovation
              </h3>

            </div>

            <p className="text-xs text-gray-500 mt-2 md:mt-0">
              Click any milestone year below to inspect our key achievements.
            </p>

          </div>

          {/* MILESTONE BUTTONS */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-8">

            {storyMilestones.map((milestone, idx) => {

              const isSelected =
                selectedMilestoneIndex === idx;

              return (
                <button
                  key={milestone.year}
                  onClick={() =>
                    setSelectedMilestoneIndex(idx)
                  }
                  className={`py-3 sm:py-4 px-2 sm:px-4 border transition-all text-center cursor-pointer ${
                    isSelected
                      ? "bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-md"
                      : "bg-white border-gray-200 text-gray-500 hover:text-[#1A1A1A] hover:border-gray-300"
                  }`}
                >

                  <div className="text-sm sm:text-xl font-bold">
                    {milestone.year}
                  </div>

                  <div className="text-[10px] uppercase tracking-wider truncate mt-0.5 opacity-80 hidden sm:block">
                    {milestone.title.split(" ")[0]}
                  </div>

                </button>
              );
            })}

          </div>

          {/* SELECTED MILESTONE */}
          {storyMilestones[selectedMilestoneIndex] && (

            <div className="bg-white border border-gray-200 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">

              <div className="lg:col-span-7 space-y-4">

                <div className="inline-block px-3 py-1 bg-[#C35A3E]/10 border border-[#C35A3E]/20 text-[10px] font-bold uppercase tracking-widest text-[#C35A3E]">
                  {storyMilestones[selectedMilestoneIndex].metric}
                </div>

                <h4 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] uppercase tracking-tight">
                  {storyMilestones[selectedMilestoneIndex].year}{" "}
                  |{" "}
                  {storyMilestones[selectedMilestoneIndex].title}
                </h4>

                <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
                  {storyMilestones[selectedMilestoneIndex].description}
                </p>

                <div className="pt-2 flex items-center gap-4">

                  <button
                    onClick={onOpenProjectModal}
                    className="bg-[#1A1A1A] hover:bg-[#C35A3E] text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  >

                    <span>
                      Start a Project With Us
                    </span>

                    <ArrowUpRight className="w-3.5 h-3.5" />

                  </button>

                </div>

              </div>

              {/* IMAGE */}
              <div className="lg:col-span-5">

                <div className="overflow-hidden border border-gray-200 shadow-sm relative group">

                  <img
                    src={
                      storyMilestones[
                        selectedMilestoneIndex
                      ].image
                    }
                    alt={
                      storyMilestones[
                        selectedMilestoneIndex
                      ].title
                    }
                    className="w-full h-60 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-white/95 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] border border-gray-200">
                    Brickon Archive |{" "}
                    {
                      storyMilestones[
                        selectedMilestoneIndex
                      ].year
                    }
                  </div>

                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};