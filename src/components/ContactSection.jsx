import React, { useState } from 'react';
import { companyInfo, faqItems } from '../data/companyData';
import { Phone, Mail, MapPin, Clock, ArrowUpRight, CheckCircle2, ChevronDown, Upload, Shield } from 'lucide-react';

export const ContactSection = ({ initialEstimateSummary, onNavigate }) => {
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
    uploadedFileName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, uploadedFileName: e.target.files[0].name }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTicketNumber(`BK-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 900);
  };

  const toggleFaq = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#F9F8F6] text-[#1A1A1A] relative overflow-hidden border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[2px] bg-[#C35A3E]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#C35A3E]">
              GET IN TOUCH
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase leading-[1.1] text-[#1A1A1A]">
            LET'S CONSTRUCT <br />
            <span className="italic text-[#C35A3E]">YOUR MASTERPIECE</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 font-light leading-relaxed">
            Ready to break ground on your residential villa, commercial facility, or architectural addition? Schedule a direct site consultation with our principal civil engineers.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-gray-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-base font-bold text-[#1A1A1A] uppercase tracking-wider border-b border-gray-200 pb-4">
                Corporate Headquarters
              </h3>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 bg-[#C35A3E]/10 text-[#C35A3E] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Head Office</div>
                    <div className="text-[#1A1A1A] font-semibold mt-0.5">{companyInfo.contact.address}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{companyInfo.contact.city}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 bg-[#C35A3E]/10 text-[#C35A3E] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Direct Engineering Desk</div>
                    <div className="text-[#1A1A1A] font-semibold mt-0.5">{companyInfo.contact.phone}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{companyInfo.contact.altPhone} (Office Landline)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 bg-[#C35A3E]/10 text-[#C35A3E] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Blueprint Submissions</div>
                    <div className="text-[#1A1A1A] font-semibold mt-0.5">{companyInfo.contact.email}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{companyInfo.contact.inquiriesEmail}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 bg-[#C35A3E]/10 text-[#C35A3E] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Consultation Hours</div>
                    <div className="text-[#1A1A1A] font-semibold mt-0.5">{companyInfo.contact.hours}</div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[#F9F8F6] border border-gray-200 text-xs text-gray-600 flex items-start gap-3">
                <Shield className="w-4 h-4 text-[#C35A3E] shrink-0 mt-0.5" />
                <span>All project discussions and architectural drawings are protected under strict non-disclosure (NDA) protocols.</span>
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-4 shadow-sm">
              <div className="relative h-44 overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80)` }} />
                <div className="relative z-10 text-center p-4 bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm">
                  <div className="w-8 h-8 mx-auto mb-1 bg-[#C35A3E] flex items-center justify-center text-white">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-[#1A1A1A] text-xs uppercase tracking-wide">BRICKON DESIGN STUDIO & LAB</div>
                  <div className="text-[11px] text-gray-500">Metro Skyline Tower, Suite 700</div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 bg-white border border-gray-200 p-8 sm:p-10 relative shadow-sm">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#C35A3E]">
                    PROJECT INTAKE PORTAL
                  </span>
                  <h3 className="text-2xl font-bold text-[#1A1A1A] uppercase tracking-tight mt-1">
                    Start Your Project Consultation
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Fill in your project details for an itemized initial feasibility report within 24 hours.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1.5">
                      Full Name *
                    </label>
                    <input type="text" name="fullName" required placeholder="e.g. Vikram Sharma" value={formData.fullName} onChange={handleInputChange} className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C35A3E] focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input type="tel" name="phone" required placeholder="+91 98765 43210" value={formData.phone} onChange={handleInputChange} className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C35A3E] focus:bg-white" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1.5">
                      Email Address *
                    </label>
                    <input type="email" name="email" required placeholder="vikram@example.com" value={formData.email} onChange={handleInputChange} className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C35A3E] focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1.5">
                      Project Category
                    </label>
                    <select name="projectCategory" value={formData.projectCategory} onChange={handleInputChange} className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C35A3E] focus:bg-white">
                      <option value="Luxury Villa">Luxury Custom Villa</option>
                      <option value="Residential Standard">Residential Standard</option>
                      <option value="Commercial Office">Commercial Corporate Office</option>
                      <option value="Industrial Logistics">Industrial Warehouse / PEB</option>
                      <option value="Interior Architecture">Turnkey Interior Fitout</option>
                      <option value="Renovation">Structural Renovation</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1.5">
                      Site Location / City
                    </label>
                    <input type="text" name="location" placeholder="e.g. OMR, Chennai / Bengaluru" value={formData.location} onChange={handleInputChange} className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C35A3E] focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1.5">
                      Approx Built-up Area (Sq.Ft)
                    </label>
                    <input type="number" name="builtUpArea" placeholder="e.g. 4500" value={formData.builtUpArea} onChange={handleInputChange} className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C35A3E] focus:bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1.5">
                    Attach Blueprint / Plot Sketch / Architectural CAD (Optional)
                  </label>
                  <label className="flex items-center justify-center gap-2 p-3 bg-[#F9F8F6] border border-dashed border-gray-300 rounded cursor-pointer hover:border-[#C35A3E] transition-colors">
                    <Upload className="w-4 h-4 text-[#C35A3E]" />
                    <span className="text-xs text-gray-600">
                      {formData.uploadedFileName ? `Attached: ${formData.uploadedFileName}` : 'Upload PDF, DWG, PNG, or JPG (Max 25MB)'}
                    </span>
                    <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.dwg,.png,.jpg,.jpeg" />
                  </label>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-1.5">
                    Project Requirements / Notes
                  </label>
                  <textarea name="message" rows={3} placeholder="Describe any specific spatial requirements, materials, or target delivery dates..." value={formData.message} onChange={handleInputChange} className="w-full px-3.5 py-2.5 bg-[#F9F8F6] border border-gray-200 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#C35A3E] focus:bg-white" />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[#C35A3E] hover:bg-[#b04f35] text-white font-bold text-[11px] uppercase tracking-widest transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-70">
                  {isSubmitting ? (
                    <span>INITIALIZING PROJECT BRIEF...</span>
                  ) : (
                    <>
                      <span>Submit Project for Feasibility Review</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 bg-[#C35A3E]/10 border border-[#C35A3E] text-[#C35A3E] rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#C35A3E]">
                    PROJECT BRIEF RECEIVED
                  </span>
                  <h3 className="text-2xl font-bold text-[#1A1A1A] uppercase mt-1">
                    Thank You, {formData.fullName}!
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto">
                    Your inquiry has been assigned Reference ID <strong className="text-[#1A1A1A] font-mono">{ticketNumber}</strong>. Our Lead Civil Engineer will contact you within 24 business hours with an initial feasibility assessment.
                  </p>
                </div>
                <div className="p-4 bg-[#F9F8F6] border border-gray-200 max-w-sm mx-auto text-left text-xs text-gray-600 space-y-1">
                  <div><strong>Category:</strong> {formData.projectCategory}</div>
                  <div><strong>Area:</strong> {formData.builtUpArea} Sq.Ft</div>
                  <div><strong>Phone:</strong> {formData.phone}</div>
                </div>
                <button onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ fullName: '', phone: '', email: '', projectCategory: 'Luxury Villa', location: '', builtUpArea: '3500', budgetRange: '₹50 Lakhs - ₹1.5 Cr', timeline: 'Within 1-3 Months', message: '', uploadedFileName: '' });
                }} className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-gray-800 text-xs font-bold text-white uppercase tracking-wider cursor-pointer">
                  Submit Another Project
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-16 pt-16 border-t border-gray-200">
          <div className="mb-10 text-center sm:text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#C35A3E]">FREQUENTLY ASKED QUESTIONS</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] uppercase tracking-tight mt-1">
              Clear Answers on Building with Brickon
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqItems.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div key={idx} className="bg-white border border-gray-200 overflow-hidden transition-colors shadow-2xs">
                  <button onClick={() => toggleFaq(idx)} className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50">
                    <span className="font-bold text-sm text-[#1A1A1A] leading-snug">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#C35A3E] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
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