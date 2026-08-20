import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { AboutPreview } from './components/AboutPreview.jsx';
import { OurStorySection } from './components/OurStorySection.jsx';
import { ServicesSection } from './components/ServicesSection.jsx';
import { ProjectsSection } from './components/ProjectsSection.jsx';
import { PricingSection } from './components/PricingSection.jsx';
import { ContactSection } from './components/ContactSection.jsx';
import { ProjectInquiryModal } from './components/ProjectInquiryModal.jsx';
import { Footer } from './components/Footer.jsx';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [estimateSummaryForInquiry, setEstimateSummaryForInquiry] = useState('');

  const handleOpenProjectModal = () => {
    setEstimateSummaryForInquiry('');
    setIsModalOpen(true);
  };

  const handleOpenProjectModalWithEstimate = (estimateNote) => {
    setEstimateSummaryForInquiry(estimateNote);
    setIsModalOpen(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] selection:bg-[#C35A3E] selection:text-white flex flex-col justify-between">
        {/* Navbar appears on every page */}
        <Navbar onOpenProjectModal={handleOpenProjectModal} />

        {/* The pt-20 adds padding to the top so the fixed navbar doesn't cover your content */}
        <main className="flex-1 pt-20">
          <Routes>
            <Route path="/" element={<Hero onOpenProjectModal={handleOpenProjectModal} />} />
            <Route path="/about" element={<AboutPreview onOpenProjectModal={handleOpenProjectModal} />} />
            <Route path="/our-story" element={<OurStorySection onOpenProjectModal={handleOpenProjectModal} />} />
            <Route path="/services" element={<ServicesSection onOpenProjectModal={handleOpenProjectModal} />} />
            <Route path="/projects" element={<ProjectsSection onOpenProjectModal={handleOpenProjectModal} />} />
            <Route path="/pricing" element={<PricingSection onOpenProjectModalWithEstimate={handleOpenProjectModalWithEstimate} />} />
            <Route path="/contact" element={<ContactSection initialEstimateSummary={estimateSummaryForInquiry} />} />
          </Routes>
        </main>

        <ProjectInquiryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialEstimateNote={estimateSummaryForInquiry}
        />

        {/* Footer appears on every page */}
        <Footer onOpenProjectModal={handleOpenProjectModal} />
      </div>
    </Router>
  );
}