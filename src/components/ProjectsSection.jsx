import React, { useState } from 'react';
import { projectsData } from '../data/projectsData';
import { ArrowUpRight, MapPin, Calendar, X, Check, Quote, Layers } from 'lucide-react';

export const ProjectsSection = ({ onNavigate, onOpenProjectModal }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const categories = ['All', 'Residential', 'Commercial', 'Villas', 'Industrial', 'Interiors'];
  const filteredProjects = selectedCategory === 'All' ? projectsData : projectsData.filter(p => p.category === selectedCategory);

  const handleOpenProject = (project) => {
    setActiveProjectModal(project);
    setActiveGalleryIndex(0);
  };

  return (
    <section id="projects" className="py-20 sm:py-28 bg-[#F9F8F6] relative overflow-hidden border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-[#C35A3E]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#C35A3E]">PORTFOLIO OF EXCELLENCE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#1A1A1A] uppercase tracking-tight leading-[1.1]">
              FEATURED LANDMARKS & <br />
              <span className="italic text-[#C35A3E]">ARCHITECTURAL BUILDS</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-500 font-light max-w-md mt-4 md:mt-0 leading-relaxed">
            Explore a curated selection of residential estates, corporate headquarters, and high-performance industrial spaces crafted by Brickon Construction.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-gray-200">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button key={category} onClick={() => setSelectedCategory(category)} className={`px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer ${isSelected ? 'bg-[#1A1A1A] text-white shadow-sm' : 'bg-white text-gray-600 hover:text-[#1A1A1A] hover:bg-gray-50 border border-gray-200'}`}>
                {category}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} onClick={() => handleOpenProject(project)} className="group bg-white border border-gray-200 hover:border-[#C35A3E] overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between">
              <div>
                <div className="relative h-60 sm:h-68 overflow-hidden bg-gray-100">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/75 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-white">
                    {project.category}
                  </div>
                  <div className="absolute top-4 right-4 px-2.5 py-1 bg-[#C35A3E] text-[10px] font-bold tracking-wider text-white">
                    {project.areaSqFt.toLocaleString()} Sq.Ft
                  </div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 bg-white/90 group-hover:bg-[#C35A3E] group-hover:text-white backdrop-blur-sm flex items-center justify-center text-[#1A1A1A] transition-colors duration-200">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-white">
                    <MapPin className="w-3.5 h-3.5 text-[#C35A3E]" />
                    <span>{project.location}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Completed {project.year} | {project.duration}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] group-hover:text-[#C35A3E] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-gray-500 font-light line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="uppercase tracking-wider font-bold text-[11px] text-[#C35A3E]">Inspect Details →</span>
                <span className="text-gray-400 font-mono text-[11px]">ID: {project.id}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14 p-8 sm:p-10 bg-white border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h4 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] uppercase tracking-tight">Have a Custom Architectural Concept?</h4>
            <p className="text-sm text-gray-500 mt-1 font-light">We collaborate seamlessly with your architects or provide full turnkey in-house design & build engineering.</p>
          </div>
          <button onClick={onOpenProjectModal} className="px-6 py-3.5 bg-[#C35A3E] hover:bg-[#b04f35] text-white text-[11px] font-bold uppercase tracking-widest transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer">
            <span>Submit Your Blueprint</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      {activeProjectModal && (
        <div id="project-detail-modal" className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto" onClick={() => setActiveProjectModal(null)}>
          <div className="bg-white border border-gray-200 w-full max-w-4xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-[#1A1A1A]" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-[#F9F8F6]">
              <div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#C35A3E] font-bold">
                  <span>{activeProjectModal.category}</span>
                  <span>|</span>
                  <span>{activeProjectModal.location}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mt-1">
                  {activeProjectModal.title}
                </h3>
              </div>
              <button onClick={() => setActiveProjectModal(null)} className="p-2 text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-200 transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <div className="relative h-64 sm:h-96 overflow-hidden bg-gray-100 border border-gray-200">
                  <img src={activeProjectModal.gallery[activeGalleryIndex] || activeProjectModal.image} alt={activeProjectModal.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-md text-xs text-white">
                    Photo {activeGalleryIndex + 1} of {activeProjectModal.gallery.length}
                  </div>
                </div>
                {activeProjectModal.gallery.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {activeProjectModal.gallery.map((imgUrl, idx) => (
                      <button key={idx} onClick={() => setActiveGalleryIndex(idx)} className={`relative h-16 overflow-hidden border transition-all cursor-pointer ${activeGalleryIndex === idx ? 'border-[#C35A3E] ring-2 ring-[#C35A3E]/30' : 'border-gray-200 opacity-70 hover:opacity-100'}`}>
                        <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F9F8F6] p-4 border border-gray-200">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Built-up Area</div>
                  <div className="text-base font-bold text-[#1A1A1A]">{activeProjectModal.areaSqFt.toLocaleString()} Sq.Ft</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Duration</div>
                  <div className="text-base font-bold text-[#1A1A1A]">{activeProjectModal.duration}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Completed</div>
                  <div className="text-base font-bold text-[#1A1A1A]">{activeProjectModal.completionDate}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Handover Warranty</div>
                  <div className="text-base font-bold text-[#C35A3E]">10-Year Master</div>
                </div>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-wider font-black text-[#C35A3E] mb-2">PROJECT BRIEF & ARCHITECTURAL EXECUTION</h4>
                <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">{activeProjectModal.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#F9F8F6] p-5 border border-gray-200">
                  <h5 className="text-xs uppercase tracking-wider font-bold text-[#1A1A1A] mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#C35A3E]" />
                    <span>Contract Scope</span>
                  </h5>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                    {activeProjectModal.scope.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#C35A3E] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#F9F8F6] p-5 border border-gray-200">
                  <h5 className="text-xs uppercase tracking-wider font-bold text-[#1A1A1A] mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#C35A3E]" />
                    <span>Structural Engineering</span>
                  </h5>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                    {activeProjectModal.structuralHighlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C35A3E] shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {activeProjectModal.testimonial && (
                <div className="p-5 bg-[#C35A3E]/5 border border-[#C35A3E]/20">
                  <Quote className="w-5 h-5 text-[#C35A3E] mb-2" />
                  <p className="text-sm text-gray-700 italic">"{activeProjectModal.testimonial.quote}"</p>
                  <div className="mt-3 text-xs font-bold text-[#1A1A1A]">
                    {activeProjectModal.testimonial.author} | <span className="text-gray-500 font-normal">{activeProjectModal.testimonial.role}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 bg-[#F9F8F6] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-500">Looking to build a similar project with Brickon?</div>
              <button onClick={() => { setActiveProjectModal(null); onOpenProjectModal(); }} className="w-full sm:w-auto px-6 py-3 bg-[#C35A3E] hover:bg-[#b04f35] text-white text-[11px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer">
                <span>Request Similar Estimate</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};