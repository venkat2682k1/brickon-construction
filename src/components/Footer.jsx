import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUp,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import brickonLogo from "../assets/brickon-logo.png";

export const Footer = ({ onOpenProjectModal }) => {
  const contactDetails = {
    phone: "9884495559",
    address: "Chennai, Tamil Nadu, India",
    email: "brickcon2025@gmail.com",
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/pricing", label: "Pricing" },
    { path: "/contact", label: "Contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="
        relative
        bg-[#151515]
        text-white
        border-t
        border-white/10
        overflow-hidden
      "
    >

      {/* SUBTLE ARCHITECTURAL GRID */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-[0.025]
          bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
          bg-[size:50px_50px]
        "
      />

      {/* TOP ACCENT */}

      <div
        className="
          absolute
          top-0
          left-0
          w-full
          h-[2px]
          bg-[#C35A3E]
        "
      />

      {/* MAIN */}

      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-6
          lg:px-10
          py-12
          sm:py-14
        "
      >

        {/* TOP ROW */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-12
            gap-10
            md:gap-8
          "
        >

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="md:col-span-5">

            <img
              src={brickonLogo}
              alt="BRICKON CONSTRUCTION"
              className="
                w-44
                h-auto
                max-h-14
                object-contain
                brightness-0
                invert
                mb-5
              "
            />

            <p
              className="
                text-sm
                text-gray-500
                leading-relaxed
                max-w-sm
                font-light
              "
            >
              Building exceptional spaces through
              precision, quality and thoughtful design.
            </p>

          </div>


          {/* =================================================
              NAVIGATION
          ================================================= */}

          <div className="md:col-span-3">

            <h4
              className="
                text-[10px]
                uppercase
                tracking-[0.2em]
                font-bold
                text-gray-400
                mb-5
              "
            >
              Company
            </h4>

            <div className="grid grid-cols-2 gap-y-3">

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={scrollToTop}
                  className="
                    text-xs
                    uppercase
                    tracking-wider
                    text-gray-500
                    hover:text-[#C35A3E]
                    transition-colors
                    w-fit
                  "
                >
                  {link.label}
                </Link>
              ))}

            </div>

          </div>


          {/* =================================================
              CONTACT
          ================================================= */}

          <div className="md:col-span-4">

            <h4
              className="
                text-[10px]
                uppercase
                tracking-[0.2em]
                font-bold
                text-gray-400
                mb-5
              "
            >
              Contact
            </h4>

            <div className="space-y-3">

              {/* ADDRESS */}

              <div className="flex items-center gap-3">

                <MapPin
                  className="
                    w-4
                    h-4
                    text-[#C35A3E]
                    shrink-0
                  "
                />

                <span className="text-xs text-gray-500">
                  {contactDetails.address}
                </span>

              </div>


              {/* PHONE */}

              <a
                href={`tel:${contactDetails.phone}`}
                className="
                  flex
                  items-center
                  gap-3
                  text-xs
                  text-gray-500
                  hover:text-white
                  transition-colors
                "
              >

                <Phone
                  className="
                    w-4
                    h-4
                    text-[#C35A3E]
                    shrink-0
                  "
                />

                +91 {contactDetails.phone}

              </a>


              {/* EMAIL */}

              <a
                href={`mailto:${contactDetails.email}`}
                className="
                  flex
                  items-center
                  gap-3
                  text-xs
                  text-gray-500
                  hover:text-white
                  transition-colors
                  break-all
                "
              >

                <Mail
                  className="
                    w-4
                    h-4
                    text-[#C35A3E]
                    shrink-0
                  "
                />

                {contactDetails.email}

              </a>

            </div>

          </div>

        </div>


        {/* =================================================
            CTA
        ================================================= */}

        <div
          className="
            mt-10
            pt-8
            border-t
            border-white/10
            flex
            flex-col
            sm:flex-row
            items-start
            sm:items-center
            justify-between
            gap-6
          "
        >

          <div>

            <p
              className="
                text-xs
                uppercase
                tracking-[0.15em]
                text-gray-500
                mb-1
              "
            >
              Have a project in mind?
            </p>

            <p
              className="
                text-lg
                font-light
                text-white
              "
            >
              Let's build it together.
            </p>

          </div>


          <button
            type="button"
            onClick={onOpenProjectModal}
            className="
              group
              inline-flex
              items-center
              gap-3
              bg-[#C35A3E]
              hover:bg-[#b04f35]
              px-6
              py-3.5
              text-[10px]
              font-bold
              uppercase
              tracking-widest
              text-white
              transition-all
            "
          >

            Start Your Project

            <ArrowUpRight
              className="
                w-4
                h-4
                group-hover:translate-x-1
                group-hover:-translate-y-1
                transition-transform
              "
            />

          </button>

        </div>


        {/* =================================================
            COPYRIGHT
        ================================================= */}

        <div
          className="
            mt-8
            pt-5
            border-t
            border-white/5
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-3
          "
        >

          <p
            className="
              text-[9px]
              uppercase
              tracking-widest
              text-gray-600
              text-center
              sm:text-left
            "
          >
            © {new Date().getFullYear()} BRICKON CONSTRUCTION.
            ALL RIGHTS RESERVED.
          </p>


          <button
            onClick={scrollToTop}
            className="
              group
              flex
              items-center
              gap-2
              text-[9px]
              uppercase
              tracking-widest
              text-gray-600
              hover:text-white
              transition-colors
            "
          >

            Back to Top

            <span
              className="
                w-7
                h-7
                border
                border-white/10
                group-hover:border-[#C35A3E]
                flex
                items-center
                justify-center
                transition-colors
              "
            >

              <ArrowUp
                className="
                  w-3
                  h-3
                  text-[#C35A3E]
                  group-hover:-translate-y-0.5
                  transition-transform
                "
              />

            </span>

          </button>

        </div>

      </div>

    </footer>
  );
};