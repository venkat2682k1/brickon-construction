import React, { useState } from 'react';
import { X, ArrowUpRight, CheckCircle2, Shield } from 'lucide-react';

export const ProjectInquiryModal = ({ isOpen, onClose, initialEstimateNote = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Luxury Residential Villa',
    plotArea: '3500 Sq.Ft',
    location: '',
    notes: initialEstimateNote || ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div id="start-project-modal-backdrop" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto" onClick={onClose}>
      <div id="start-project-modal-card" className="bg-white border border-gray-200 w-full max-w-xl shadow-2xl overflow-hidden my-8 text-[#1A1A1A]" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 bg-[#F9F8F6] border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#C35A3E] flex items-center justify-center text-white font-extrabold text-sm">B</div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#C35A3E] font-black">BRICKON CONSTRUCTION</div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] uppercase">Start Your Project</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-[#1A1A1A] hover:bg-gray-200 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 sm:p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs sm:text-sm text-gray-600 font-light mb-4">
                Schedule a confidential consultation with our Senior Project Engineers. We will review your site specifications and provide an itemized timeline estimate.
              </p>
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1">Full Name *</label>
                <input type="text" required placeholder="e.g. Vikram Singhania" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C35A3E] focus:bg-white" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1">Phone Number *</label>
                  <input type="tel" required placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C35A3E] focus:bg-white" />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1">Email Address *</label>
                  <input type="email" required placeholder="vikram@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C35A3E] focus:bg-white" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1">Project Type</label>
                  <select value={formData.projectType} onChange={(e) => setFormData({ ...formData, projectType: e.target.value })} className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C35A3E] focus:bg-white">
                    <option>Luxury Residential Villa</option>
                    <option>Standard Home Construction</option>
                    <option>Commercial Headquarters</option>
                    <option>Industrial Logistics / PEB</option>
                    <option>Architectural Renovation</option>
                    <option>Turnkey Interior Fitout</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1">Site Location</label>
                  <input type="text" placeholder="e.g. OMR / Anna Nagar / Bengaluru" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C35A3E] focus:bg-white" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1">Project Notes / Calculated Estimate</label>
                <textarea rows={2} placeholder="Any specific architectural preferences, budget, or timelines..." value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C35A3E] focus:bg-white" />
              </div>
              <div className="pt-2">
                <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-[#C35A3E] hover:bg-[#b04f35] text-white font-bold text-[11px] uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60">
                  {isSubmitting ? <span>DISPATCHING BRIEF...</span> : <><main>Confirm & Request Consultation</main><ArrowUpRight className="w-4 h-4" /></>}
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 text-center pt-2">
                <Shield className="w-3.5 h-3.5 text-[#C35A3E]" />
                <span>Protected under client privacy policy | Est. 2018</span>
              </div>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-[#C35A3E]/10 border border-[#C35A3E] text-[#C35A3E] rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-[#1A1A1A] uppercase">Consultation Request Confirmed</h4>
              <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                Thank you, {formData.name}. Our principal civil engineering team will reach out at <strong className="text-[#1A1A1A]">{formData.phone}</strong> within 24 hours to schedule your preliminary site review.
              </p>
              <div className="pt-4">
                <button onClick={onClose} className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-gray-800 text-white text-xs font-bold uppercase tracking-wider cursor-pointer">
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};