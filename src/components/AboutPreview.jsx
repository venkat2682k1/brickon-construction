import React, { useEffect, useRef, useState } from "react";
import {
  Hammer,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ArrowRight
} from "lucide-react";

/* -----------------------------------------
   AUTO-COUNT UP HOOK
----------------------------------------- */
const useCountUp = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // If the section is out of view, reset the number to 0
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

      // Smooth ease-out animation so it slows down at the end
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

/* -----------------------------------------
   ABOUT PAGE COMPONENT
----------------------------------------- */
export const AboutPreview = ({
  onNavigate,
  onOpenProjectModal,
}) => {
  const statsRef = useRef(null);
  const [startCounters, setStartCounters] = useState(false);

  /* -----------------------------------------
     TRIGGER ANIMATION ON SCROLL
  ----------------------------------------- */
  useEffect(() => {
    const section = statsRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // This will automatically start the counter when visible,
        // and reset it when the user scrolls away!
        setStartCounters(entry.isIntersecting);
      },
      { threshold: 0.2 } // Triggers when 20% of the section is visible
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /* -----------------------------------------
     STATISTIC COUNTERS
  ----------------------------------------- */
  const projectsCompleted = useCountUp(124, 2500, startCounters);
  const industryAwards = useCountUp(15, 2000, startCounters);
  const safetyRecord = useCountUp(100, 2800, startCounters);

  return (
    <div className="w-full bg-white">
      
      {/* =====================================
          SECTION 1: ABOUT HERO INTRODUCTION
      ===================================== */}
      <section id="about-hero" className="pt-32 pb-20 sm:pt-40 sm:pb-32 bg-[#F9F8F6] relative overflow-hidden">
        {/* Decorative architectural lines */}
        <div className="absolute top-0 right-0 w-1/2 h-full border-l border-gray-200/50 pointer-events-none hidden lg:block" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200/50 pointer-events-none hidden lg:block" />
        <div className="absolute inset-0 bg-grid-pattern-light opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-[#C35A3E]" />
              <span className="text-[#C35A3E] text-[10px] sm:text-xs font-black uppercase tracking-[0.3em]">
                Who we are
              </span>
            </div>

            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-[#1A1A1A] uppercase mb-9">
              Engineering <span className="italic text-[#C35A3E]">precision</span> <br />
              architectural Craftsmanship.
            </h1>

            <p className="text-gray-600 text-lg sm:text-xl lg:text-2xl leading-relaxed font-light max-w-2xl border-l-4 border-[#C35A3E] pl-6">
              We design and build structurally sound, beautifully crafted homes across Tamil Nadu, combining innovative architecture, engineering precision, and quality construction in every project
            </p>
          </div>
        </div>
      </section>

      {/* =====================================
          SECTION 2: OUR STORY & FOUNDATION
      ===================================== */}
      <section id="about-story" className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left Narrative */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-4 block">
                Established 2018
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-6 tracking-tighter text-[#1A1A1A] uppercase">
                We Build More Than <br />
                <span className="italic text-[#C35A3E]">Structures.</span>
              </h2>
              <p className="text-gray-600 text-base leading-relaxed font-light mb-6">
                Founded in <strong className="text-[#1A1A1A] font-semibold">2018</strong>, Brickon Construction is a premier architectural engineering and general contracting firm. We turn complex structural blueprints into enduring, landmark realities through an obsessive dedication to craftsmanship, cutting-edge technology, and client confidence.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed font-light mb-10">
                Whether constructing high-concept luxury villas, commercial headquarters, or industrial complexes, we combine civil precision with radical transparency.
              </p>

              <button
                onClick={() => onNavigate("our-story")}
                className="inline-flex items-center gap-2 pb-1 border-b-2 border-[#1A1A1A] text-[11px] font-bold uppercase tracking-widest hover:text-[#C35A3E] hover:border-[#C35A3E] transition-all cursor-pointer"
              >
                <span>Discover Our History</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Visuals & Values */}
            <div className="lg:col-span-7 space-y-16">
              
              {/* Image Showcase */}
              <div className="relative overflow-hidden border border-gray-200 shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Brickon Construction Architectural Craftsmanship"
                  className="w-full h-80 sm:h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 bg-white/95 backdrop-blur-sm border border-gray-200 flex items-start sm:items-center gap-4">
                  <div className="w-10 h-10 bg-[#C35A3E] flex items-center justify-center shrink-0">
                    <Hammer className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">
                      Precision Formwork & Finishes
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1">
                      Zero tolerance on structural joints and concrete curing.
                    </div>
                  </div>
                </div>
              </div>

              {/* Mission & Values Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 p-8 sm:p-12 bg-[#F9F8F6] border border-gray-200">
                <div className="space-y-3">
                  <div className="w-8 h-8 bg-white border border-gray-200 flex items-center justify-center mb-5">
                    <Compass className="w-4 h-4 text-[#C35A3E]" />
                  </div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
                    Our Mission
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed font-light">
                    To elevate the standard of modern construction by focusing on quality craftsmanship, rigorous safety protocols, and structural innovation across every square foot we build.
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
                    We operate with absolute transparency and meticulous attention to detail. No hidden costs, no compromised materials—just total integrity in every project.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          SECTION 3: STATISTICS & IMPACT
      ===================================== */}
      <section ref={statsRef} className="py-16 bg-[#1A1A1A] text-white border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-800 text-center md:text-left">
            
            <div className="md:px-8 pt-6 md:pt-0">
              <span className="block text-5xl sm:text-6xl font-bold text-white tabular-nums tracking-tight">
                {projectsCompleted}+
              </span>
              <span className="block text-[11px] font-bold uppercase text-gray-400 tracking-widest mt-3">
                Landmarks Completed
              </span>
            </div>

            <div className="md:px-8 pt-8 md:pt-0">
              <span className="block text-5xl sm:text-6xl font-bold text-white tabular-nums tracking-tight">
                {industryAwards}+
              </span>
              <span className="block text-[11px] font-bold uppercase text-gray-400 tracking-widest mt-3">
                Industry Awards
              </span>
            </div>

            <div className="md:px-8 pt-8 md:pt-0">
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

      {/* =====================================
          SECTION 4: THE FIVE PILLARS
      ===================================== */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          
          <div className="mb-16 text-center sm:text-left max-w-3xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#C35A3E]">
              THE BRICKON STANDARD
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] uppercase tracking-tight mt-3 mb-6">
              Five Pillars of Our <br className="hidden sm:block" /> Construction Ethos
            </h3>
            <p className="text-gray-500 font-light text-base sm:text-lg">
              The foundational principles that guide every foundation we pour, every beam we erect, and every finishing touch we apply.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* PILLAR 1 */}
            <div className="bg-[#F9F8F6] border border-gray-200 hover:border-[#C35A3E] p-8 transition-all duration-300 shadow-sm hover:shadow-lg group">
              <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center mb-6 text-[#C35A3E] group-hover:bg-[#C35A3E] group-hover:text-white transition-colors">
                <Hammer className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider mb-3">
                Quality Craftsmanship
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed font-light">
                Artisanal joinery, precision shuttering, and surgical millimeter tolerances on every concrete pour.
              </p>
            </div>

            {/* PILLAR 2 */}
            <div className="bg-[#F9F8F6] border border-gray-200 hover:border-[#C35A3E] p-8 transition-all duration-300 shadow-sm hover:shadow-lg group">
              <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center mb-6 text-[#C35A3E] group-hover:bg-[#C35A3E] group-hover:text-white transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider mb-3">
                Rigorous Safety
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed font-light">
                Strict zero-harm site protocols, certified site safety officers, and full PPE compliance across all trades.
              </p>
            </div>

            {/* PILLAR 3 */}
            <div className="bg-[#F9F8F6] border border-gray-200 hover:border-[#C35A3E] p-8 transition-all duration-300 shadow-sm hover:shadow-lg group">
              <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center mb-6 text-[#C35A3E] group-hover:bg-[#C35A3E] group-hover:text-white transition-colors">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider mb-3">
                Modern Innovation
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed font-light">
                3D BIM clash detection, drone site surveying, and green building thermal optimization.
              </p>
            </div>

            {/* PILLAR 4 */}
            <div className="bg-[#F9F8F6] border border-gray-200 hover:border-[#C35A3E] p-8 transition-all duration-300 shadow-sm hover:shadow-lg group">
              <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center mb-6 text-[#C35A3E] group-hover:bg-[#C35A3E] group-hover:text-white transition-colors">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider mb-3">
                Absolute Integrity
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed font-light">
                Transparent itemized Bill of Quantities (BOQ), zero surprise escalations, and guaranteed timelines.
              </p>
            </div>

            {/* PILLAR 5 */}
            <div className="bg-[#F9F8F6] border border-gray-200 hover:border-[#C35A3E] p-8 transition-all duration-300 shadow-sm hover:shadow-lg group">
              <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center mb-6 text-[#C35A3E] group-hover:bg-[#C35A3E] group-hover:text-white transition-colors">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wider mb-3">
                Attention to Detail
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed font-light">
                From chemical concrete waterproofing to flawless shadow gaps, we perfect the nuances others skip.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          SECTION 5: FINAL CTA
      ===================================== */}
      <section className="py-24 sm:py-32 bg-[#1A1A1A] text-center relative overflow-hidden shadow-2xl">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white mb-6">
            Let's build something that <span className="italic text-[#C35A3E]">lasts.</span>
          </h2>
          
          <p className="text-gray-400 text-base sm:text-lg font-light mb-10 max-w-xl mx-auto leading-relaxed">
            Get a free, no-obligation cost estimate from the founders themselves — with a response within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenProjectModal}
              className="w-full sm:w-auto bg-[#C35A3E] hover:bg-[#b04f35] text-white px-10 py-5 text-[11px] font-bold uppercase tracking-widest shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Get free estimate</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => onNavigate("contact")}
              className="w-full sm:w-auto border border-white/30 text-white px-10 py-5 text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Contact us</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};