import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { companyInfo, faqItems } from '../data/companyData';

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Upload,
  Shield,
} from 'lucide-react';

// =====================================================
// EMAILJS CONFIGURATION
// =====================================================

const EMAILJS_SERVICE_ID = 'service_bcy7wb5';
const EMAILJS_TEMPLATE_ID = 'template_1lvzztg';
const EMAILJS_PUBLIC_KEY = 'v064GnO7GQRIslB0G';

const BRICKON_EMAIL = 'brickcon2025@gmail.com';

// =====================================================
// CONTACT SECTION
// =====================================================

export const ContactSection = ({
  initialEstimateSummary,
  onNavigate,
}) => {
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    projectCategory: 'Luxury Villa',
    location: '',
    builtUpArea: '3500',
    budgetRange: '₹50 Lakhs - ₹1.5 Cr',
    timeline: 'Within 1-3 Months',
    message: initialEstimateSummary || '',
    uploadedFileName: '',
  });

  const [uploadedFile, setUploadedFile] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const [submitError, setSubmitError] = useState('');

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // HANDLE FILE
  // =====================================================

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // 25MB validation
      const maxSize = 25 * 1024 * 1024;

      if (file.size > maxSize) {
        setSubmitError(
          'The selected file is larger than 25MB. Please choose a smaller file.'
        );

        e.target.value = '';
        return;
      }

      setUploadedFile(file);

      setFormData((prev) => ({
        ...prev,
        uploadedFileName: file.name,
      }));

      setSubmitError('');
    }
  };

  // =====================================================
  // GENERATE TICKET
  // =====================================================

  const generateTicketNumber = () => {
    return `BK-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  // =====================================================
  // EMAILJS SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const generatedTicketNumber = generateTicketNumber();

    const templateParams = {
      ticket_number: generatedTicketNumber,

      full_name: formData.fullName,

      phone: formData.phone,

      email: formData.email,

      project_category: formData.projectCategory,

      location: formData.location || 'Not provided',

      built_up_area: formData.builtUpArea || 'Not provided',

      budget_range: formData.budgetRange,

      timeline: formData.timeline,

      message: formData.message || 'No additional requirements provided',

      uploaded_file:
        formData.uploadedFileName || 'No file attached',

      to_email: BRICKON_EMAIL,

      company_name: 'BRICKON CONSTRUCTION',
    };

    try {
      console.log('Sending Brickon enquiry...');
      console.log('EmailJS parameters:', templateParams);

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        }
      );

      console.log('EmailJS response:', response);

      if (response.status === 200) {
        console.log('Brickon enquiry sent successfully.');

        setTicketNumber(generatedTicketNumber);

        setIsSubmitted(true);

        setIsSubmitting(false);
      } else {
        throw new Error('EmailJS returned an unexpected response.');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);

      setSubmitError(
        error?.text ||
          error?.message ||
          'Unable to submit your project inquiry right now. Please try again.'
      );

      setIsSubmitting(false);
    }
  };

  // =====================================================
  // FAQ
  // =====================================================

  const toggleFaq = (index) => {
    setActiveFaqIndex(
      activeFaqIndex === index ? null : index
    );
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setIsSubmitted(false);

    setSubmitError('');

    setTicketNumber('');

    setUploadedFile(null);

    setFormData({
      fullName: '',
      phone: '',
      email: '',
      projectCategory: 'Luxury Villa',
      location: '',
      builtUpArea: '3500',
      budgetRange: '₹50 Lakhs - ₹1.5 Cr',
      timeline: 'Within 1-3 Months',
      message: '',
      uploadedFileName: '',
    });
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 bg-[#F9F8F6] text-[#1A1A1A] relative overflow-hidden border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="max-w-3xl mb-16">

          <div className="flex items-center gap-3 mb-3">

            <div className="w-8 h-[2px] bg-[#C35A3E]" />

            <span className="text-[10px] font-black uppercase tracking-widest text-[#C35A3E]">
              GET IN TOUCH
            </span>

          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase leading-[1.1] text-[#1A1A1A]">

            LET'S CONSTRUCT
            <br />

            <span className="italic text-[#C35A3E]">
              YOUR MASTERPIECE
            </span>

          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-600 font-light leading-relaxed">
            Ready to break ground on your residential villa,
            commercial facility, or architectural addition?
            Schedule a direct site consultation with our
            principal civil engineers.
          </p>

        </div>

        {/* =====================================================
            CONTACT + FORM
        ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">

          {/* =====================================================
              COMPANY DETAILS
          ===================================================== */}

          <div className="lg:col-span-5 space-y-6">

            <div className="bg-white border border-gray-200 p-6 sm:p-8 space-y-6 shadow-sm">

              <h3 className="text-base font-bold text-[#1A1A1A] uppercase tracking-wider border-b border-gray-200 pb-4">
                Corporate Headquarters
              </h3>

              <div className="space-y-4 text-sm text-gray-700">

                {/* ADDRESS */}

                <div className="flex items-start gap-3.5">

                  <div className="w-8 h-8 bg-[#C35A3E]/10 text-[#C35A3E] flex items-center justify-center shrink-0 mt-0.5">

                    <MapPin className="w-4 h-4" />

                  </div>

                  <div>

                    <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                      Head Office
                    </div>

                    <div className="text-[#1A1A1A] font-semibold mt-0.5">
                      {companyInfo.contact.address}
                    </div>

                    <div className="text-gray-500 text-xs mt-0.5">
                      {companyInfo.contact.city}
                    </div>

                  </div>

                </div>

                {/* PHONE */}

                <div className="flex items-start gap-3.5">

                  <div className="w-8 h-8 bg-[#C35A3E]/10 text-[#C35A3E] flex items-center justify-center shrink-0 mt-0.5">

                    <Phone className="w-4 h-4" />

                  </div>

                  <div>

                    <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                      Direct Engineering Desk
                    </div>

                    <div className="text-[#1A1A1A] font-semibold mt-0.5">
                      {companyInfo.contact.phone}
                    </div>

                    <div className="text-gray-500 text-xs mt-0.5">
                      {companyInfo.contact.altPhone}
                    </div>

                  </div>

                </div>

                {/* EMAIL */}

                <div className="flex items-start gap-3.5">

                  <div className="w-8 h-8 bg-[#C35A3E]/10 text-[#C35A3E] flex items-center justify-center shrink-0 mt-0.5">

                    <Mail className="w-4 h-4" />

                  </div>

                  <div>

                    <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                      Blueprint Submissions
                    </div>

                    <div className="text-[#1A1A1A] font-semibold mt-0.5">
                      {companyInfo.contact.email}
                    </div>

                    <div className="text-gray-500 text-xs mt-0.5">
                      {companyInfo.contact.inquiriesEmail}
                    </div>

                  </div>

                </div>

                {/* HOURS */}

                <div className="flex items-start gap-3.5">

                  <div className="w-8 h-8 bg-[#C35A3E]/10 text-[#C35A3E] flex items-center justify-center shrink-0 mt-0.5">

                    <Clock className="w-4 h-4" />

                  </div>

                  <div>

                    <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                      Consultation Hours
                    </div>

                    <div className="text-[#1A1A1A] font-semibold mt-0.5">
                      {companyInfo.contact.hours}
                    </div>

                  </div>

                </div>

              </div>

              {/* NDA */}

              <div className="p-4 bg-[#F9F8F6] border border-gray-200 text-xs text-gray-600 flex items-start gap-3">

                <Shield className="w-4 h-4 text-[#C35A3E] shrink-0 mt-0.5" />

                <span>
                  All project discussions and architectural
                  drawings are protected under strict
                  non-disclosure (NDA) protocols.
                </span>

              </div>

            </div>

            {/* =====================================================
                STUDIO MAP
            ===================================================== */}

            <div className="bg-white border border-gray-200 p-4 shadow-sm">

              <div className="relative h-44 overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">

                <div
                  className="absolute inset-0 bg-cover bg-center opacity-60"
                  style={{
                    backgroundImage:
                      'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80)',
                  }}
                />

                <div className="relative z-10 text-center p-4 bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm">

                  <div className="w-8 h-8 mx-auto mb-1 bg-[#C35A3E] flex items-center justify-center text-white">

                    <MapPin className="w-4 h-4" />

                  </div>

                  <div className="font-bold text-[#1A1A1A] text-xs uppercase tracking-wide">
                    BRICKON DESIGN STUDIO & LAB
                  </div>

                  <div className="text-[11px] text-gray-500">
                    Metro Skyline Tower, Suite 700
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* =====================================================
              PROJECT FORM
          ===================================================== */}

          <div className="lg:col-span-7 bg-white border border-gray-200 p-8 sm:p-10 relative shadow-sm">

            {!isSubmitted ? (

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* FORM HEADER */}

                <div>

                  <span className="text-[10px] font-black uppercase tracking-widest text-[#C35A3E]">
                    PROJECT INTAKE PORTAL
                  </span>

                  <h3 className="text-2xl font-bold text-[#1A1A1A] uppercase tracking-tight mt-1">
                    Start Your Project Consultation
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Fill in your project details for an itemized
                    initial feasibility report within 24 hours.
                  </p>

                </div>

                {/* ERROR */}

                {submitError && (

                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">

                    <strong className="block mb-1">
                      Submission Failed
                    </strong>

                    {submitError}

                  </div>

                )}

                {/* NAME + PHONE */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>

                    <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1.5">
                      Full Name *
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Vikram Sharma"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C35A3E] focus:bg-white"
                    />

                  </div>

                  <div>

                    <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1.5">
                      Phone Number *
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C35A3E] focus:bg-white"
                    />

                  </div>

                </div>

                {/* EMAIL + CATEGORY */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>

                    <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1.5">
                      Email Address *
                    </label>

                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="customer@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C35A3E] focus:bg-white"
                    />

                  </div>

                  <div>

                    <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1.5">
                      Project Category
                    </label>

                    <select
                      name="projectCategory"
                      value={formData.projectCategory}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C35A3E] focus:bg-white"
                    >

                      <option value="Luxury Villa">
                        Luxury Custom Villa
                      </option>

                      <option value="Residential Standard">
                        Residential Standard
                      </option>

                      <option value="Commercial Office">
                        Commercial Corporate Office
                      </option>

                      <option value="Industrial Logistics">
                        Industrial Warehouse / PEB
                      </option>

                      <option value="Interior Architecture">
                        Turnkey Interior Fitout
                      </option>

                      <option value="Renovation">
                        Structural Renovation
                      </option>

                    </select>

                  </div>

                </div>

                {/* LOCATION + AREA */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>

                    <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1.5">
                      Site Location / City
                    </label>

                    <input
                      type="text"
                      name="location"
                      placeholder="e.g. OMR, Chennai / Bengaluru"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C35A3E] focus:bg-white"
                    />

                  </div>

                  <div>

                    <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1.5">
                      Approx Built-up Area (Sq.Ft)
                    </label>

                    <input
                      type="number"
                      name="builtUpArea"
                      min="1"
                      placeholder="e.g. 4500"
                      value={formData.builtUpArea}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C35A3E] focus:bg-white"
                    />

                  </div>

                </div>

                {/* BUDGET + TIMELINE */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>

                    <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1.5">
                      Budget Range
                    </label>

                    <select
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C35A3E] focus:bg-white"
                    >

                      <option value="₹25 Lakhs - ₹50 Lakhs">
                        ₹25 Lakhs - ₹50 Lakhs
                      </option>

                      <option value="₹50 Lakhs - ₹1.5 Cr">
                        ₹50 Lakhs - ₹1.5 Cr
                      </option>

                      <option value="₹1.5 Cr - ₹3 Cr">
                        ₹1.5 Cr - ₹3 Cr
                      </option>

                      <option value="₹3 Cr - ₹5 Cr">
                        ₹3 Cr - ₹5 Cr
                      </option>

                      <option value="₹5 Cr+">
                        ₹5 Cr+
                      </option>

                    </select>

                  </div>

                  <div>

                    <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1.5">
                      Expected Timeline
                    </label>

                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C35A3E] focus:bg-white"
                    >

                      <option value="Within 1-3 Months">
                        Within 1-3 Months
                      </option>

                      <option value="Within 3-6 Months">
                        Within 3-6 Months
                      </option>

                      <option value="Within 6-12 Months">
                        Within 6-12 Months
                      </option>

                      <option value="More than 12 Months">
                        More than 12 Months
                      </option>

                    </select>

                  </div>

                </div>

                {/* FILE */}

                <div>

                  <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1.5">
                    Attach Blueprint / Plot Sketch / Architectural CAD
                  </label>

                  <label className="flex items-center justify-center gap-2 p-3 bg-[#F9F8F6] border border-dashed border-gray-300 rounded cursor-pointer hover:border-[#C35A3E] transition-colors">

                    <Upload className="w-4 h-4 text-[#C35A3E]" />

                    <span className="text-xs text-gray-600 text-center">

                      {formData.uploadedFileName
                        ? `Attached: ${formData.uploadedFileName}`
                        : 'Upload PDF, DWG, PNG, or JPG (Max 25MB)'}

                    </span>

                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.dwg,.png,.jpg,.jpeg"
                    />

                  </label>

                </div>

                {/* MESSAGE */}

                <div>

                  <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1.5">
                    Project Requirements / Notes
                  </label>

                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Describe any specific spatial requirements, materials, or target delivery dates..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C35A3E] focus:bg-white"
                  />

                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#C35A3E] hover:bg-[#b04f35] text-white font-bold text-[11px] uppercase tracking-widest transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >

                  {isSubmitting ? (

                    <>

                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />

                      <span>
                        SENDING PROJECT BRIEF...
                      </span>

                    </>

                  ) : (

                    <>

                      <span>
                        Submit Project for Feasibility Review
                      </span>

                      <ArrowUpRight className="w-4 h-4" />

                    </>

                  )}

                </button>

                <p className="text-[10px] text-gray-400 text-center">
                  Your project information will be sent securely
                  to the Brickon Construction team.
                </p>

              </form>

            ) : (

              /* =====================================================
                 SUCCESS SCREEN
              ===================================================== */

              <div className="py-12 text-center space-y-6">

                {/* SUCCESS ICON */}

                <div className="w-20 h-20 bg-green-50 border-2 border-green-500 text-green-600 rounded-full mx-auto flex items-center justify-center">

                  <CheckCircle2 className="w-10 h-10" />

                </div>

                {/* SUCCESS TITLE */}

                <div>

                  <span className="text-[10px] font-black uppercase tracking-widest text-green-600">
                    PROJECT BRIEF RECEIVED
                  </span>

                  <h3 className="text-3xl font-bold text-[#1A1A1A] uppercase mt-2">
                    Thank You, {formData.fullName}!
                  </h3>

                  <p className="text-sm text-gray-600 mt-3 max-w-md mx-auto leading-relaxed">
                    Your project inquiry has been successfully
                    submitted to the Brickon Construction team.
                  </p>

                </div>

                {/* REFERENCE ID */}

                <div className="bg-[#F9F8F6] border border-gray-200 p-5 max-w-sm mx-auto">

                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Your Reference ID
                  </div>

                  <div className="text-2xl font-bold text-[#C35A3E] font-mono mt-1">
                    {ticketNumber}
                  </div>

                  <div className="text-xs text-gray-500 mt-2">
                    Please keep this reference number for future
                    communication.
                  </div>

                </div>

                {/* SUBMITTED DETAILS */}

                <div className="p-4 bg-white border border-gray-200 max-w-sm mx-auto text-left text-xs text-gray-600 space-y-2">

                  <div>
                    <strong className="text-[#1A1A1A]">
                      Project:
                    </strong>{' '}
                    {formData.projectCategory}
                  </div>

                  <div>
                    <strong className="text-[#1A1A1A]">
                      Area:
                    </strong>{' '}
                    {formData.builtUpArea} Sq.Ft
                  </div>

                  <div>
                    <strong className="text-[#1A1A1A]">
                      Location:
                    </strong>{' '}
                    {formData.location || 'Not provided'}
                  </div>

                  <div>
                    <strong className="text-[#1A1A1A]">
                      Phone:
                    </strong>{' '}
                    {formData.phone}
                  </div>

                  <div>
                    <strong className="text-[#1A1A1A]">
                      Email:
                    </strong>{' '}
                    {formData.email}
                  </div>

                  <div>
                    <strong className="text-[#1A1A1A]">
                      Attachment:
                    </strong>{' '}
                    {formData.uploadedFileName || 'None'}
                  </div>

                </div>

                {/* TEAM MESSAGE */}

                <div className="bg-green-50 border border-green-200 p-4 max-w-md mx-auto">

                  <p className="text-sm text-green-700 leading-relaxed">
                    Our Brickon Construction team will review
                    your requirements and contact you within
                    24 business hours.
                  </p>

                </div>

                {/* RESET */}

                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#C35A3E] text-xs font-bold text-white uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Submit Another Project
                </button>

              </div>

            )}

          </div>

        </div>

        {/* =====================================================
            FAQ
        ===================================================== */}

        <div className="mt-16 pt-16 border-t border-gray-200">

          <div className="mb-10 text-center sm:text-left">

            <span className="text-[10px] font-black uppercase tracking-widest text-[#C35A3E]">
              FREQUENTLY ASKED QUESTIONS
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] uppercase tracking-tight mt-1">
              Clear Answers on Building with Brickon
            </h3>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {faqItems.map((faq, idx) => {

              const isOpen = activeFaqIndex === idx;

              return (

                <div
                  key={idx}
                  className="bg-white border border-gray-200 overflow-hidden transition-colors shadow-sm"
                >

                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50"
                  >

                    <span className="font-bold text-sm text-[#1A1A1A] leading-snug">
                      {faq.q}
                    </span>

                    <ChevronDown
                      className={`w-4 h-4 text-[#C35A3E] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />

                  </button>

                  {isOpen && (

                    <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 font-light leading-relaxed border-t border-gray-100 pt-3">

                      {faq.a}

                    </div>

                  )}

                </div>

              );

            })}

          </div>

        </div>

      </div>
    </section>
  );
};