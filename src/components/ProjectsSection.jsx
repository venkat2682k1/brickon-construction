import React, { useEffect, useRef, useState } from "react";
import { projectsData } from "../data/projectsData";
import {
  ArrowUpRight,
  MapPin,
  Calendar,
  X,
  Check,
  Quote,
  Layers,
} from "lucide-react";

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
          observer.disconnect();
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
   PROJECTS SECTION
========================================================= */

export const ProjectsSection = ({
  onNavigate,
  onOpenProjectModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProjectModal, setActiveProjectModal] =
    useState(null);

  const [activeGalleryIndex, setActiveGalleryIndex] =
    useState(0);

  const [sectionRef, sectionVisible] = useReveal();

  const categories = [
    "All",
    "Residential",
    "Commercial",
    "Villas",
    "Industrial",
    "Interiors",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter(
          (project) =>
            project.category === selectedCategory
        );

  /* =========================================================
     OPEN PROJECT
  ========================================================= */

  const handleOpenProject = (project) => {
    setActiveProjectModal(project);
    setActiveGalleryIndex(0);

    document.body.style.overflow = "hidden";
  };

  /* =========================================================
     CLOSE PROJECT
  ========================================================= */

  const handleCloseProject = () => {
    setActiveProjectModal(null);
    document.body.style.overflow = "";
  };

  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleCloseProject();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-heading"
      className="relative overflow-hidden bg-[#F7F6F3] text-[#171717] border-t border-black/10"
    >
      {/* =====================================================
          BACKGROUND DETAIL
      ===================================================== */}

      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        aria-hidden="true"
      >
        <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-[#C35A3E]/5 rounded-full blur-[100px]" />

        <div className="absolute bottom-0 left-0 w-[320px] h-[320px] bg-black/[0.025] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 sm:py-32">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header
          className={`max-w-5xl mb-16 transition-all duration-1000 ease-out ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-5">
            <span
              className="block w-10 h-[2px] bg-[#C35A3E]"
              aria-hidden="true"
            />

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C35A3E]">
              Selected Work
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-end">

            <div className="lg:col-span-8">
              <h1
                id="projects-heading"
                className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-[-0.04em] leading-[0.95] uppercase"
              >
                Projects
                <br />

                <span className="italic font-light text-[#C35A3E]">
                  Built to Last
                </span>
              </h1>
            </div>

            <div className="lg:col-span-4">
              <p className="text-sm sm:text-base text-gray-500 font-light leading-7">
                Explore selected residential, commercial,
                industrial and interior projects delivered
                by BRICKON Construction with a focus on
                architectural quality, engineering precision
                and long-term performance.
              </p>
            </div>

          </div>
        </header>

        {/* =====================================================
            CATEGORY NAVIGATION
        ===================================================== */}

        <nav
          aria-label="Project categories"
          className={`mb-12 border-y border-black/10 py-4 transition-all duration-1000 delay-150 ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex flex-wrap gap-2">

            {categories.map((category) => {
              const isSelected =
                selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  aria-pressed={isSelected}
                  className={`
                    relative px-5 py-2.5
                    text-[10px]
                    sm:text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    transition-all
                    duration-300
                    cursor-pointer
                    overflow-hidden
                    ${
                      isSelected
                        ? "bg-[#171717] text-white"
                        : "bg-transparent text-gray-500 hover:text-[#171717]"
                    }
                  `}
                >
                  <span className="relative z-10">
                    {category}
                  </span>

                  {!isSelected && (
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C35A3E] transition-all duration-300 group-hover:w-full" />
                  )}
                </button>
              );
            })}

          </div>
        </nav>

        {/* =====================================================
            PROJECT GRID
        ===================================================== */}

        <div
          key={selectedCategory}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12"
        >
          {filteredProjects.map((project, index) => (

            <article
              key={project.id}
              onClick={() =>
                handleOpenProject(project)
              }
              className={`
                group
                cursor-pointer
                transition-all
                duration-700
                ease-out
                ${
                  sectionVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }
              `}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >

              {/* =================================================
                  IMAGE
              ================================================= */}

              <div
                className="
                  relative
                  overflow-hidden
                  bg-gray-200
                  aspect-[4/3]
                "
              >

                <img
                  src={project.image}
                  alt={`${project.title} - ${project.category} construction project by BRICKON Construction in ${project.location}`}
                  title={project.title}
                  loading={
                    index < 3
                      ? "eager"
                      : "lazy"
                  }
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-[1200ms]
                    ease-out
                    group-hover:scale-105
                  "
                />

                {/* IMAGE OVERLAY */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/70
                    via-black/10
                    to-transparent
                    opacity-70
                    group-hover:opacity-90
                    transition-opacity
                    duration-500
                  "
                />

                {/* CATEGORY */}

                <div
                  className="
                    absolute
                    top-4
                    left-4
                    px-3
                    py-1.5
                    bg-black/70
                    backdrop-blur-md
                    text-white
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                  "
                >
                  {project.category}
                </div>

                {/* AREA */}

                <div
                  className="
                    absolute
                    top-4
                    right-4
                    px-3
                    py-1.5
                    bg-[#C35A3E]
                    text-white
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                  "
                >
                  {project.areaSqFt.toLocaleString()} Sq.Ft
                </div>

                {/* PROJECT LOCATION */}

                <div
                  className="
                    absolute
                    bottom-5
                    left-5
                    flex
                    items-center
                    gap-2
                    text-white
                    text-xs
                  "
                >
                  <MapPin
                    className="w-3.5 h-3.5 text-[#C35A3E]"
                    aria-hidden="true"
                  />

                  <span>
                    {project.location}
                  </span>
                </div>

                {/* ARROW */}

                <div
                  className="
                    absolute
                    bottom-5
                    right-5
                    w-10
                    h-10
                    bg-white
                    text-[#171717]
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300
                    group-hover:bg-[#C35A3E]
                    group-hover:text-white
                    group-hover:rotate-0
                  "
                >
                  <ArrowUpRight className="w-4 h-4" />
                </div>

              </div>

              {/* =================================================
                  PROJECT INFORMATION
              ================================================= */}

              <div className="pt-5">

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-[10px]
                    uppercase
                    tracking-[0.15em]
                    text-gray-400
                    mb-3
                  "
                >
                  <Calendar
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                  />

                  <span>
                    {project.year}
                  </span>

                  <span className="text-gray-300">
                    /
                  </span>

                  <span>
                    {project.duration}
                  </span>
                </div>

                <h2
                  className="
                    text-xl
                    sm:text-2xl
                    font-semibold
                    tracking-tight
                    leading-tight
                    group-hover:text-[#C35A3E]
                    transition-colors
                    duration-300
                  "
                >
                  {project.title}
                </h2>

                <p
                  className="
                    mt-3
                    text-sm
                    text-gray-500
                    font-light
                    leading-6
                    line-clamp-2
                  "
                >
                  {project.description}
                </p>

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    justify-between
                    border-t
                    border-black/10
                    pt-4
                  "
                >
                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-[#C35A3E]
                    "
                  >
                    View Project
                  </span>

                  <span
                    className="
                      text-[10px]
                      font-mono
                      text-gray-400
                    "
                  >
                    {project.id}
                  </span>
                </div>

              </div>

            </article>

          ))}
        </div>

        {/* =====================================================
            PROJECT CTA
        ===================================================== */}

        <div
          className={`
            mt-20
            border-t
            border-black/10
            pt-10
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-6
            transition-all
            duration-1000
            delay-300
            ${
              sectionVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }
          `}
        >

          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C35A3E]">
              Start Something New
            </span>

            <h3 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
              Have a project in mind?
            </h3>
          </div>

          <button
            type="button"
            onClick={onOpenProjectModal}
            className="
              inline-flex
              items-center
              justify-center
              gap-3
              bg-[#171717]
              hover:bg-[#C35A3E]
              text-white
              px-7
              py-4
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              transition-all
              duration-300
              cursor-pointer
              group
            "
          >
            <span>
              Discuss Your Project
            </span>

            <ArrowUpRight
              className="
                w-4
                h-4
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </button>

        </div>

      </div>

      {/* =====================================================
          PROJECT DETAIL MODAL
      ===================================================== */}

      {activeProjectModal && (

        <div
          id="project-detail-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="
            fixed
            inset-0
            z-50
            bg-black/80
            backdrop-blur-md
            flex
            items-center
            justify-center
            p-4
            sm:p-6
            animate-[fadeIn_0.25s_ease-out]
          "
          onClick={handleCloseProject}
        >

          <div
            className="
              bg-white
              w-full
              max-w-5xl
              max-h-[92vh]
              overflow-hidden
              shadow-2xl
              flex
              flex-col
              text-[#171717]
              animate-[modalIn_0.35s_ease-out]
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div
              className="
                px-5
                sm:px-7
                py-5
                border-b
                border-black/10
                flex
                items-center
                justify-between
                gap-4
              "
            >

              <div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-[#C35A3E]
                    font-bold
                  "
                >
                  <span>
                    {activeProjectModal.category}
                  </span>

                  <span>
                    /
                  </span>

                  <span>
                    {activeProjectModal.location}
                  </span>
                </div>

                <h2
                  id="project-modal-title"
                  className="
                    text-xl
                    sm:text-2xl
                    font-semibold
                    mt-1
                    tracking-tight
                  "
                >
                  {activeProjectModal.title}
                </h2>

              </div>

              <button
                type="button"
                onClick={handleCloseProject}
                aria-label="Close project details"
                className="
                  w-10
                  h-10
                  flex
                  items-center
                  justify-center
                  border
                  border-black/10
                  hover:bg-[#171717]
                  hover:text-white
                  transition-all
                  cursor-pointer
                  shrink-0
                "
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            {/* =================================================
                MODAL CONTENT
            ================================================= */}

            <div className="overflow-y-auto p-5 sm:p-8 space-y-8">

              {/* GALLERY */}

              <div>

                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">

                  <img
                    src={
                      activeProjectModal.gallery[
                        activeGalleryIndex
                      ] ||
                      activeProjectModal.image
                    }
                    alt={`${activeProjectModal.title} project gallery`}
                    className="
                      w-full
                      h-full
                      object-cover
                      animate-[imageFade_0.4s_ease-out]
                    "
                    referrerPolicy="no-referrer"
                  />

                  <div
                    className="
                      absolute
                      bottom-4
                      right-4
                      px-3
                      py-1.5
                      bg-black/70
                      backdrop-blur-md
                      text-[10px]
                      uppercase
                      tracking-wider
                      text-white
                    "
                  >
                    Photo{" "}
                    {activeGalleryIndex + 1}{" "}
                    /{" "}
                    {activeProjectModal.gallery.length}
                  </div>

                </div>

                {/* THUMBNAILS */}

                {activeProjectModal.gallery.length >
                  1 && (

                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-3">

                    {activeProjectModal.gallery.map(
                      (imgUrl, index) => (

                        <button
                          key={index}
                          type="button"
                          onClick={() =>
                            setActiveGalleryIndex(
                              index
                            )
                          }
                          aria-label={`View project image ${
                            index + 1
                          }`}
                          className={`
                            relative
                            aspect-[4/3]
                            overflow-hidden
                            border
                            transition-all
                            cursor-pointer
                            ${
                              activeGalleryIndex ===
                              index
                                ? "border-[#C35A3E] ring-2 ring-[#C35A3E]/20"
                                : "border-black/10 opacity-60 hover:opacity-100"
                            }
                          `}
                        >
                          <img
                            src={imgUrl}
                            alt=""
                            className="
                              w-full
                              h-full
                              object-cover
                            "
                            referrerPolicy="no-referrer"
                          />
                        </button>

                      )
                    )}

                  </div>

                )}

              </div>

              {/* PROJECT FACTS */}

              <div
                className="
                  grid
                  grid-cols-2
                  sm:grid-cols-4
                  border-y
                  border-black/10
                "
              >

                <div className="p-4 border-r border-black/10">
                  <span className="block text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                    Area
                  </span>

                  <strong className="block mt-1 text-sm">
                    {activeProjectModal.areaSqFt.toLocaleString()} Sq.Ft
                  </strong>
                </div>

                <div className="p-4 sm:border-r border-black/10">
                  <span className="block text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                    Duration
                  </span>

                  <strong className="block mt-1 text-sm">
                    {activeProjectModal.duration}
                  </strong>
                </div>

                <div className="p-4 border-r border-black/10 border-t sm:border-t-0">
                  <span className="block text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                    Completed
                  </span>

                  <strong className="block mt-1 text-sm">
                    {activeProjectModal.completionDate}
                  </strong>
                </div>

                <div className="p-4 border-t sm:border-t-0">
                  <span className="block text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                    Warranty
                  </span>

                  <strong className="block mt-1 text-sm text-[#C35A3E]">
                    10-Year Master
                  </strong>
                </div>

              </div>

              {/* DESCRIPTION */}

              <div className="max-w-3xl">

                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#C35A3E]">
                  Project Overview
                </span>

                <p className="mt-3 text-sm sm:text-base text-gray-600 font-light leading-7">
                  {activeProjectModal.description}
                </p>

              </div>

              {/* PROJECT DETAILS */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* CONTRACT SCOPE */}

                <div className="border border-black/10 p-6">

                  <h3 className="text-xs uppercase tracking-widest font-bold flex items-center gap-2 mb-5">
                    <Layers className="w-4 h-4 text-[#C35A3E]" />

                    Contract Scope
                  </h3>

                  <ul className="space-y-3">

                    {activeProjectModal.scope.map(
                      (item, index) => (

                        <li
                          key={index}
                          className="
                            flex
                            items-start
                            gap-3
                            text-sm
                            text-gray-600
                            font-light
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

                          <span>
                            {item}
                          </span>
                        </li>

                      )
                    )}

                  </ul>

                </div>

                {/* STRUCTURAL */}

                <div className="border border-black/10 p-6">

                  <h3 className="text-xs uppercase tracking-widest font-bold flex items-center gap-2 mb-5">
                    <Layers className="w-4 h-4 text-[#C35A3E]" />

                    Structural Engineering
                  </h3>

                  <ul className="space-y-3">

                    {activeProjectModal.structuralHighlights.map(
                      (item, index) => (

                        <li
                          key={index}
                          className="
                            flex
                            items-start
                            gap-3
                            text-sm
                            text-gray-600
                            font-light
                          "
                        >
                          <span
                            className="
                              w-1.5
                              h-1.5
                              rounded-full
                              bg-[#C35A3E]
                              shrink-0
                              mt-2
                            "
                          />

                          <span>
                            {item}
                          </span>
                        </li>

                      )
                    )}

                  </ul>

                </div>

              </div>

              {/* TESTIMONIAL */}

              {activeProjectModal.testimonial && (

                <blockquote
                  className="
                    border-l-2
                    border-[#C35A3E]
                    pl-5
                    py-2
                  "
                >

                  <Quote
                    className="
                      w-5
                      h-5
                      text-[#C35A3E]
                      mb-3
                    "
                  />

                  <p className="text-sm sm:text-base text-gray-600 italic leading-7">
                    "{activeProjectModal.testimonial.quote}"
                  </p>

                  <footer className="mt-3 text-xs font-bold">
                    {activeProjectModal.testimonial.author}

                    <span className="font-normal text-gray-400">
                      {" "}
                      /{" "}
                      {activeProjectModal.testimonial.role}
                    </span>
                  </footer>

                </blockquote>

              )}

            </div>

            {/* =================================================
                MODAL FOOTER
            ================================================= */}

            <div
              className="
                px-5
                sm:px-7
                py-5
                border-t
                border-black/10
                flex
                flex-col
                sm:flex-row
                items-center
                justify-between
                gap-4
              "
            >

              <span className="text-xs text-gray-500">
                Interested in a similar project?
              </span>

              <button
                type="button"
                onClick={() => {
                  handleCloseProject();

                  if (onOpenProjectModal) {
                    onOpenProjectModal();
                  }
                }}
                className="
                  w-full
                  sm:w-auto
                  px-6
                  py-3.5
                  bg-[#C35A3E]
                  hover:bg-[#171717]
                  text-white
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  transition-all
                  flex
                  items-center
                  justify-center
                  gap-2
                  cursor-pointer
                "
              >
                Request an Estimate

                <ArrowUpRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          ANIMATION STYLES
      ===================================================== */}

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes modalIn {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.98);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes imageFade {
            from {
              opacity: 0.4;
            }

            to {
              opacity: 1;
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
        `}
      </style>

    </section>
  );
};