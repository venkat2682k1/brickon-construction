import React, { useState } from 'react';
import { servicesData, companyInfo } from '../data/companyData';
import { ArrowUpRight, Check, Home, Building2, Layers, Wrench, Factory, Maximize2 } from 'lucide-react';

export const ServicesSection = ({ onNavigate, onOpenProjectModal }) => {
  const [activeServiceId, setActiveServiceId] = useState(servicesData[0].id);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Home': return <Home className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      case 'Factory': return <Factory className="w-5 h-5" />;
      case 'Maximize2': return <Maximize2 className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  const selectedService = servicesData.find(s => s.id === activeServiceId) || servicesData[0];

  return (
    <section id="services" className="py-20 sm:py-28 bg-white relative overflow-hidden border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-[#C35A3E]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#C35A3E]">OUR CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#1A1A1A] uppercase tracking-tight leading-[1.1]">
              ENGINEERED SERVICES & <br />
              <span className="italic text-[#C35A3E]">GENERAL CONTRACTING</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-500 font-light max-w-md mt-4 md:mt-0 leading-relaxed">
            From initial geotechnical foundation soil mechanics to turnkey architectural finishes, we handle every phase under one accountable master contract.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-2">
            {servicesData.map((service) => {
              const isActive = service.id === activeServiceId;
              return (
                <button key={service.id} onClick={() => setActiveServiceId(service.id)} className={`w-full text-left p-4 sm:p-5 border transition-all duration-200 flex items-center justify-between group cursor-pointer ${isActive ? 'bg-[#F9F8F6] border-[#C35A3E] text-[#1A1A1A] shadow-sm' : 'bg-white border-gray-200 hover:bg-[#F9F8F6] hover:border-gray-300'}`}>
                  <div className="flex items-center gap-3.5">
                    <div className={`w-8 h-8 flex items-center justify-center transition-colors ${isActive ? 'bg-[#C35A3E] text-white' : 'bg-gray-100 text-gray-600 group-hover:text-[#1A1A1A]'}`}>
                      {getIcon(service.iconName)}
                    </div>
                    <div>
                      <div className={`text-sm font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-[#1A1A1A]' : 'text-gray-700 group-hover:text-[#1A1A1A]'}`}>
                        {service.title}
                      </div>
                      <div className="text-xs text-gray-400 font-light truncate max-w-[180px] sm:max-w-xs">
                        {service.subtitle}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'text-[#C35A3E] translate-x-0.5 -translate-y-0.5' : 'text-gray-400 group-hover:text-gray-600'}`} />
                </button>
              );
            })}
          </div>
          <div className="lg:col-span-8 bg-[#F9F8F6] border border-gray-200 p-6 sm:p-10 relative overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-[#C35A3E] mb-2">
                  <span>DISCIPLINE SPECIFICATION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] uppercase tracking-tight">
                  {selectedService.title}
                </h3>
                <p className="mt-3 text-sm text-gray-600 font-light leading-relaxed">
                  {selectedService.description}
                </p>
                <div className="mt-6 space-y-2.5">
                  <div className="text-[11px] uppercase tracking-wider font-bold text-gray-400">Key Engineering Focus:</div>
                  {selectedService.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                      <div className="w-4 h-4 bg-[#C35A3E]/10 text-[#C35A3E] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-[11px] uppercase tracking-wider font-bold text-gray-400 mb-2">Standard Deliverables:</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.deliverables.map((d, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-white border border-gray-200 text-xs text-gray-700 font-medium shadow-2xs">{d}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <button onClick={onOpenProjectModal} className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#C35A3E] text-white text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer shadow-sm">
                    <span>Consult on This Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="relative overflow-hidden border border-gray-200 shadow-sm h-full min-h-[300px] group">
                <img src={selectedService.image} alt={selectedService.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/95 backdrop-blur-md border border-gray-200 text-xs text-gray-700">
                  <span className="font-bold text-[#1A1A1A] uppercase">{companyInfo.name}</span> | Site Execution Standards
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};