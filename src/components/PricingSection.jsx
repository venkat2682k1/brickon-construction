import React, { useState, useMemo } from 'react';
import { pricingTiers } from '../data/companyData';
import { Check, ArrowUpRight, Calculator, ShieldCheck } from 'lucide-react';

export const PricingSection = ({ onNavigate, onOpenProjectModalWithEstimate }) => {
  const [projectType, setProjectType] = useState('luxury_villa');
  const [areaSqFt, setAreaSqFt] = useState(3500);
  const [finishQuality, setFinishQuality] = useState('premium');
  const [floors, setFloors] = useState(2);
  const [addons, setAddons] = useState({
    smartHome: true,
    solarPanels: true,
    landscaping: false,
    interiorDesign: true,
    rainwaterHarvesting: true,
    basementParking: false
  });

  const toggleAddon = (key) => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculation = useMemo(() => {
    let rate = 2350;
    if (finishQuality === 'standard') rate = 1850;
    if (finishQuality === 'ultra_luxury') rate = 3150;
    
    if (projectType === 'commercial_office') rate *= 1.08;
    if (projectType === 'industrial_warehouse') rate = (rate * 0.75); 
    if (projectType === 'duplex_home') rate *= 1.03;
    
    const baseConstructionCost = Math.round(areaSqFt * rate);
    
    let addonTotal = 0;
    if (addons.smartHome) addonTotal += 280000;
    if (addons.solarPanels) addonTotal += 350000;
    if (addons.landscaping) addonTotal += 220000;
    if (addons.interiorDesign) addonTotal += Math.round(areaSqFt * 450);
    if (addons.rainwaterHarvesting) addonTotal += 140000;
    if (addons.basementParking) addonTotal += Math.round(areaSqFt * 0.3 * 1600);
    
    const architecturalAndApprovals = Math.round(baseConstructionCost * 0.04);
    const grandTotal = baseConstructionCost + addonTotal + architecturalAndApprovals;
    
    let months = 8;
    if (areaSqFt > 2000) months = 10;
    if (areaSqFt > 4000) months = 12;
    if (areaSqFt > 7000) months = 15;
    if (areaSqFt > 15000) months = 20;
    
    return {
      baseConstructionCost,
      addonTotal,
      architecturalAndApprovals,
      grandTotal,
      effectiveRatePerSqFt: Math.round(grandTotal / areaSqFt),
      timelineMonths: months
    };
  }, [projectType, areaSqFt, finishQuality, floors, addons]);

  const handleApplyEstimate = () => {
    const summary = `Estimated ${areaSqFt.toLocaleString()} Sq.Ft ${projectType.replace('_', ' ').toUpperCase()} (${finishQuality.toUpperCase()} finish) | Approx ₹${(calculation.grandTotal / 100000).toFixed(2)} Lakhs (~${calculation.timelineMonths} months timeline)`;
    if (onOpenProjectModalWithEstimate) {
      onOpenProjectModalWithEstimate(summary);
    } else {
      onNavigate('contact');
    }
  };

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-white relative overflow-hidden border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-[#C35A3E]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#C35A3E]">TRANSPARENT VALUE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#1A1A1A] uppercase tracking-tight leading-[1.1]">
              PRICING TIERS & <br />
              <span className="italic text-[#C35A3E]">COST CALCULATOR</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-500 font-light max-w-md mt-4 md:mt-0 leading-relaxed">
            Clear, itemized pricing backed by audited Bill of Quantities (BOQ). No hidden inflation, no surprises.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
          {pricingTiers.map((tier) => {
            const isHighlighted = tier.id === 'premium';
            return (
              <div key={tier.id} className={`p-8 flex flex-col justify-between relative transition-all duration-300 ${isHighlighted ? 'bg-[#F9F8F6] border-2 border-[#C35A3E] shadow-md md:-translate-y-1' : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm'}`}>
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#C35A3E] text-white text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    {tier.badge}
                  </div>
                )}
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1">{tier.name}</div>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl sm:text-4xl font-bold text-[#1A1A1A]">₹{tier.pricePerSqFt.toLocaleString()}</span>
                    <span className="text-xs text-gray-500 font-light">/ sq.ft built-up</span>
                  </div>
                  <p className="mt-4 text-xs sm:text-sm text-gray-600 font-light leading-relaxed">{tier.description}</p>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="text-[10px] font-black uppercase tracking-wider text-[#C35A3E] mb-3">Package Highlights:</div>
                    <ul className="space-y-2.5 text-xs text-gray-600">
                      {tier.features.slice(0, 7).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="w-3.5 h-3.5 text-[#C35A3E] shrink-0 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 p-3.5 bg-white border border-gray-200 text-[11px] text-gray-600 space-y-1.5 shadow-2xs">
                    <div><strong className="text-[#1A1A1A]">Structure:</strong> {tier.specifications.structure}</div>
                    <div><strong className="text-[#1A1A1A]">Flooring:</strong> {tier.specifications.flooring}</div>
                    <div><strong className="text-[#1A1A1A]">Windows:</strong> {tier.specifications.doorsWindows}</div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button onClick={() => { setFinishQuality(tier.id); const el = document.getElementById('interactive-calculator'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className={`w-full py-3 text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${isHighlighted ? 'bg-[#C35A3E] hover:bg-[#b04f35] text-white' : 'bg-[#1A1A1A] hover:bg-[#C35A3E] text-white'}`}>
                    <span>Select & Calculate</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div id="interactive-calculator" className="bg-[#F9F8F6] border border-gray-200 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[#C35A3E] flex items-center justify-center text-white">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#C35A3E]">INSTANT PROJECT ESTIMATOR</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] uppercase tracking-tight">Interactive Construction Cost Calculator</h3>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 font-light max-w-2xl mb-8 leading-relaxed">
            Configure your property specifications below to receive an instant, accurate construction estimate based on current NABL-certified material rates.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-2">1. Select Building Category:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'luxury_villa', label: 'Luxury Villa' },
                    { id: 'residential_standard', label: 'Standard Home' },
                    { id: 'duplex_home', label: 'Duplex Residence' },
                    { id: 'commercial_office', label: 'Commercial Office' },
                    { id: 'industrial_warehouse', label: 'Industrial / PEB' },
                  ].map((type) => (
                    <button key={type.id} type="button" onClick={() => setProjectType(type.id)} className={`p-2.5 text-xs font-bold border text-center transition-all cursor-pointer ${projectType === type.id ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white' : 'bg-white border-gray-200 text-gray-600 hover:text-[#1A1A1A] hover:border-gray-300'}`}>
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[11px] uppercase tracking-wider font-bold text-gray-700">2. Built-Up Area:</label>
                  <span className="text-base font-bold text-[#C35A3E]">{areaSqFt.toLocaleString()} Sq.Ft</span>
                </div>
                <input type="range" min="800" max="25000" step="100" value={areaSqFt} onChange={(e) => setAreaSqFt(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded appearance-none cursor-pointer accent-[#C35A3E]" />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>800 Sq.Ft</span>
                  <span>10,000 Sq.Ft</span>
                  <span>25,000+ Sq.Ft</span>
                </div>
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-2">3. Construction & Finish Quality Tier:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'standard', label: 'Standard (₹1,850/sq.ft)' },
                    { id: 'premium', label: 'Premium (₹2,350/sq.ft)' },
                    { id: 'ultra_luxury', label: 'Ultra-Luxury (₹3,150/sq.ft)' },
                  ].map((lvl) => (
                    <button key={lvl.id} type="button" onClick={() => setFinishQuality(lvl.id)} className={`p-2.5 text-xs border text-center transition-all cursor-pointer ${finishQuality === lvl.id ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white font-bold' : 'bg-white border-gray-200 text-gray-600 hover:text-[#1A1A1A] hover:border-gray-300'}`}>
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-2">4. Structure Elevation:</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button key={num} type="button" onClick={() => setFloors(num)} className={`flex-1 py-2 text-xs border text-center transition-all cursor-pointer ${floors === num ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white font-bold' : 'bg-white border-gray-200 text-gray-600 hover:text-[#1A1A1A] hover:border-gray-300'}`}>
                      G+{num - 1} ({num} {num === 1 ? 'Floor' : 'Floors'})
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-gray-700 mb-2">5. Optional Premium Add-ons:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { key: 'smartHome', label: 'Smart Home Automation (KNX)', cost: '+ ₹2.8L' },
                    { key: 'solarPanels', label: 'Rooftop Solar PV Grid (5kW)', cost: '+ ₹3.5L' },
                    { key: 'landscaping', label: 'Landscape & Waterbody', cost: '+ ₹2.2L' },
                    { key: 'interiorDesign', label: 'Turnkey Modular Interior Fitout', cost: '+ ₹450/sq.ft' },
                    { key: 'rainwaterHarvesting', label: 'Rainwater Cistern & Filtration', cost: '+ ₹1.4L' },
                    { key: 'basementParking', label: 'Subterranean Parking Vault', cost: 'Custom' },
                  ].map((addon) => {
                    const isChecked = addons[addon.key];
                    return (
                      <button key={addon.key} type="button" onClick={() => toggleAddon(addon.key)} className={`p-3 border text-left flex items-center justify-between transition-all cursor-pointer ${isChecked ? 'bg-white border-[#C35A3E] text-[#1A1A1A] shadow-2xs' : 'bg-white/60 border-gray-200 text-gray-600 hover:bg-white'}`}>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 border flex items-center justify-center text-white ${isChecked ? 'bg-[#C35A3E] border-[#C35A3E]' : 'border-gray-300 bg-white'}`}>
                            {isChecked && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-xs font-medium">{addon.label}</span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono">{addon.cost}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 bg-white border border-gray-200 p-6 sm:p-8 space-y-6 sticky top-24 shadow-sm">
              <div className="border-b border-gray-200 pb-4">
                <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">ESTIMATED CONSTRUCTION INVESTMENT</div>
                <div className="text-3xl sm:text-4xl font-bold text-[#C35A3E] mt-1">
                  ₹{(calculation.grandTotal / 100000).toFixed(2)} <span className="text-lg text-[#1A1A1A] font-normal">Lakhs</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">(Approx. ₹{calculation.grandTotal.toLocaleString()} total outlay)</div>
              </div>
              <div className="space-y-2.5 text-xs text-gray-600">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">RCC Superstructure & Finishes:</span>
                  <span className="font-semibold text-[#1A1A1A]">₹{(calculation.baseConstructionCost / 100000).toFixed(2)}L</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Selected Add-ons & Amenities:</span>
                  <span className="font-semibold text-[#1A1A1A]">₹{(calculation.addonTotal / 100000).toFixed(2)}L</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Architectural & Permitting Liaison:</span>
                  <span className="font-semibold text-[#1A1A1A]">₹{(calculation.architecturalAndApprovals / 100000).toFixed(2)}L</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Average Unit Cost:</span>
                  <span className="font-semibold text-[#C35A3E]">₹{calculation.effectiveRatePerSqFt.toLocaleString()} / Sq.Ft</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Projected Execution Duration:</span>
                  <span className="font-semibold text-[#1A1A1A]">{calculation.timelineMonths} - {calculation.timelineMonths + 2} Months</span>
                </div>
              </div>
              <div className="p-3 bg-[#F9F8F6] border border-gray-200 text-[11px] text-gray-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C35A3E] shrink-0 mt-0.5" />
                <span>Includes 10-Year Master Structural Warranty & NABL test certificates.</span>
              </div>
              <button onClick={handleApplyEstimate} className="w-full py-3.5 bg-[#C35A3E] hover:bg-[#b04f35] text-white text-[11px] font-bold uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer">
                <span>Lock in This Estimate</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};