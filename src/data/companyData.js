export const companyInfo = {
  name: 'BRICKON CONSTRUCTION',
  tagline: 'We Build Your Dream',
  subtext: 'Building quality spaces with craftsmanship, care and confidence.',
  foundedYear: 2018,
  yearsOfExcellence: 8,
  stats: [
    { value: '250+', label: 'Projects Delivered', desc: 'On-schedule & within budget' },
    { value: '100%', label: 'Quality Compliance', desc: 'Multi-stage lab testing' },
    { value: '1.2M+', label: 'Sq. Ft. Built', desc: 'Across residential & commercial' },
    { value: '0', label: 'Safety Incidents', desc: 'Zero-harm site protocols' },
  ],
  coreValues: [
    { title: 'Masterful Craftsmanship', description: 'Every joint, pour, and finish is inspected against surgical tolerances. We treat modern construction as enduring craftsmanship.', icon: 'Hammer' },
    { title: 'Uncompromised Safety', description: 'Strict zero-harm site protocols, certified safety managers, and regular third-party audits ensure our workers and sites remain secure.', icon: 'ShieldCheck' },
    { title: 'Engineering Innovation', description: 'We deploy 3D BIM modeling, drone site surveys, and precision laser leveling to prevent costly on-site clashes before ground is broken.', icon: 'Compass' },
    { title: 'Absolute Integrity', description: 'Transparent itemized Bill of Quantities (BOQ), zero hidden markups, and guaranteed delivery milestones backed by clear contracts.', icon: 'CheckCircle2' },
    { title: 'Attention to Detail', description: 'From concrete curing chemistry to shadowline baseboard alignments, perfection is in the nuances that others overlook.', icon: 'Sparkles' }
  ],
  contact: {
    phone: '+91 98401 23456',
    altPhone: '+91 44 2847 8900',
    email: 'build@brickonconstruction.com',
    inquiriesEmail: 'projects@brickonconstruction.com',
    address: '42, Architectural Boulevard, Metro Skyline Tower, Suite 700',
    city: 'Chennai, Tamil Nadu 600018',
    hours: 'Mon - Sat: 8:30 AM - 7:00 PM | Sun: By Appointment'
  }
};

export const servicesData = [
  {
    id: 'residential-architecture',
    title: 'Luxury Residential & Custom Villas',
    subtitle: 'Bespoke living spaces engineered for timeless living',
    iconName: 'Home',
    description: 'Turnkey architectural construction for private estates, standalone luxury villas, and modern duplexes crafted to reflect individual lifestyles with uncompromised structural longevity.',
    features: ['Architectural planning & 3D visualization', 'Structural design & seismic calculations', 'High-grade RCC framing with M30/M40 concrete', 'Bespoke interior finishes & smart home pre-wiring'],
    deliverables: ['Full Architectural Drawings', 'Soil & Structural Reports', 'Turnkey Handover with 10-Yr Warranty'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'commercial-development',
    title: 'Commercial & Corporate Infrastructure',
    subtitle: 'High-performance workspaces built for productivity',
    iconName: 'Building2',
    description: 'Multi-story corporate offices, retail hubs, tech parks, and institutional facilities delivered with fast-track construction schedules and stringent green building standards.',
    features: ['Column-free floorplate engineering', 'Acoustic curtain glass facade systems', 'Integrated HVAC, Fire, and BMS infrastructure', 'LEED & IGBC green certification support'],
    deliverables: ['Occupancy Certification Ready', 'BMS Schematics', 'Fast-Track Handover'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'structural-engineering',
    title: 'Structural Design & General Contracting',
    subtitle: 'Robust foundation engineering and turnkey execution',
    iconName: 'Layers',
    description: 'Comprehensive structural consultancy, foundation piling, post-tensioned slab construction, and steel-concrete hybrid engineering that withstands environmental stresses.',
    features: ['Geotechnical investigation & piling', 'Heavy-duty load calculations & finite element analysis', 'Post-tensioned beam & slab execution', 'Continuous ultrasonic concrete testing'],
    deliverables: ['Structural Safety Certificates', 'Material Lab Test Reports', 'As-Built Structural CAD'],
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'renovation-restoration',
    title: 'Architectural Renovation & Additions',
    subtitle: 'Transforming existing structures into modern icons',
    iconName: 'Wrench',
    description: 'Expert structural retrofitting, vertical expansions, facade overhauls, and complete spatial redesigns that breathe new life into aging residential and commercial assets.',
    features: ['Non-destructive structural health audits', 'Carbon-fiber composite retrofitting & beam jacketing', 'Facade modernizations & thermal retrofits', 'Full MEP re-engineering without structural disturbance'],
    deliverables: ['Structural Health Audit', 'Updated Permit Plans', 'Extended Asset Life Warranty'],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'industrial-warehouses',
    title: 'Industrial Facilities & PEB Structures',
    subtitle: 'Engineered for heavy-duty logistics and manufacturing',
    iconName: 'Factory',
    description: 'Pre-Engineered Building (PEB) solutions, high-bay warehouse developments, and specialized factories with laser-screeded superflat flooring and automated logistics integration.',
    features: ['Clear-span steel framework up to 50m', 'FM2 / DM1 superflat industrial flooring', 'Heavy-duty concrete aprons and storm drainage', 'NFPA-compliant high-hazard fire suppression grids'],
    deliverables: ['Industrial Clearance Approvals', 'Floor Flatness Reports', 'Equipment Load Plans'],
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'interiors-fitout',
    title: 'Turnkey Interior Architecture & Fit-outs',
    subtitle: 'Sleek, detail-driven interior environments',
    iconName: 'Maximize2',
    description: 'Seamless integration of bespoke millwork, architectural lighting, exposed concrete elements, cast terrazzo, and customized acoustic solutions for discerning clients.',
    features: ['Custom woodwork & architectural metal fabrication', 'Concealed architectural lighting & automation', 'Specialized artisanal wall & floor finishes', 'Acoustic insulation & micro-perforated wood paneling'],
    deliverables: ['Material Swatch Board', '3D Photorealistic Renders', 'Turnkey Commissioning'],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
  }
];

export const storyMilestones = [
  { year: '2018', title: 'Foundation & Vision', description: 'Brickon Construction was founded with a singular purpose: to bridge the gap between bold architectural vision and flawless on-site execution through engineering rigor and radical transparency.', metric: 'Founded with 4 Civil Engineers', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80' },
  { year: '2020', title: 'First Landmark Commercial Project', description: 'Successfully engineered and delivered our first 35,000 sq.ft commercial corporate center ahead of schedule during challenging macroeconomic conditions, cementing our reputation for punctuality.', metric: '35,000 Sq.Ft Commercial Milestone', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
  { year: '2022', title: 'Sustainability & Excellence Award', description: 'Pioneered low-carbon concrete mixes and zero-waste construction protocols on 12 luxury residential villas, earning the regional Green Build Excellence commendation.', metric: 'Award-Winning Low-Carbon Mixes', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
  { year: '2024', title: 'Digital Twin & BIM Integration', description: 'Full adoption of 4D Building Information Modeling (BIM) across all project tiers, allowing our clients to virtually walk through their structures and inspect every conduit prior to construction.', metric: '100% BIM Integrated Sites', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80' },
  { year: '2026', title: 'The Future of Enduring Spaces', description: 'Over 250+ delivered masterpieces, a 100% on-time track record, and expanding footprint in high-end architectural villas, sustainable corporate campuses, and smart industrial logistics.', metric: '250+ Completed Landmarks', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80' }
];

export const pricingTiers = [
  { id: 'essential', name: 'Standard Build', badge: 'Dependable Quality', pricePerSqFt: 1850, idealFor: 'Residential homes & rental properties seeking strong structural durability and clean finishes.', description: 'Engineered for enduring structural strength with reliable branded materials, essential finishes, and full municipal clearance support.', features: ['Fe550 Grade TMT Steel & 53-Grade OPC Cement', '9" Red Clay Brick / 8" Solid AAC Block Masonry', 'Vitrified Tile Flooring (2x2 ft, Somany / Kajaria)', 'Teak Wood Main Door Frame with Flush Internal Doors', 'CPVC / PVC Concealed Piping (Ashirvad / Supreme)', 'Anchor / Legrand Modular Switches & Polycab Wires', 'Asian Paints Tractor Emulsion Internal Paint', '5-Year Structural Leakage Warranty'], specifications: { structure: 'Framed RCC Structure (M20 Grade)', flooring: 'Vitrified Glazed Tiles (₹55/sq.ft allowance)', doorsWindows: 'UPVC Sliding 2-Track Windows, Teak Main Door', electricalPlumbing: 'Concealed Finolex / Polycab wiring, Jaguar Basic CP', finishes: '2 Coats Putty + Asian Paints Emulsion' } },
  { id: 'premium', name: 'Premium Architectural', badge: 'Most Popular', pricePerSqFt: 2350, idealFor: 'Custom modern residences, duplexes, and executive homes with refined architectural detailing.', description: 'Our signature package featuring elevated ceiling heights, designer sanitaryware, large format tiles, and acoustic window systems.', features: ['Fe550D High-Ductility TMT & M25 Ready-Mix Concrete', 'Wire-cut Terracotta or Precision Autoclaved Blocks', 'Large Format Glazed Vitrified Tiles (4x2 ft, Kajaria / Simpolo)', '1st Quality Burma Teak Main Door & Flush Veneer Doors', 'UPVC / Powder Coated Heavy Aluminum 3-Track Windows with Mesh', 'Kohler / Grohe Concealed Diverters & Wall-Hung Commodes', 'Schneider / Legrand Arteor Smart-Ready Switches', 'Asian Paints Apex Ultima Weatherproof Exterior Paint', 'Solar Conduit & EV Charger Pre-wiring Included', '10-Year Comprehensive Structural Warranty'], specifications: { structure: 'Earthquake Resistant Framed Structure (M25 Grade)', flooring: 'Large Format Vitrified / Italian Composite (₹95/sq.ft)', doorsWindows: 'Double Glazed UPVC / 1st Class Teak Main Entrance', electricalPlumbing: 'Kohler / Grohe fixtures, Finolex Flame-Retardant wiring', finishes: 'Luxury Velvet Touch Emulsion with Accent Textures' } },
  { id: 'ultra_luxury', name: 'Ultra-Luxury Villa', badge: 'Architectural Masterpiece', pricePerSqFt: 3150, idealFor: 'Bespoke contemporary villas, signature luxury estates, and high-end architectural landmarks.', description: 'Uncompromising luxury with imported Italian marble, exposed architectural concrete elements, double-height glazing, and integrated home automation.', features: ['M30/M35 Structural Grade with Post-Tensioned Slabs', 'Imported Italian Marble / Solid Hardwood Flooring throughout', 'Floor-to-Ceiling Slim-Profile Thermal-Break Glazing (Schüco / Reynaers)', 'Solid Teak / Bespoke Pivot Main Door with Biometric Locks', 'Hansgrohe / Toto Automated Sensor Sanitaryware & Rain Showers', 'Full Smart Home Automation (KNX / Lutron integration)', 'Cast-in-Place Architectural Exposed Concrete Accents', 'Rooftop Thermal Insulation & Decking Provision', 'Dedicated Site Engineer & 24/7 Live CCTV Client Access', '15-Year Master Structural Warranty & 2-Year Free Maintenance'], specifications: { structure: 'Post-Tensioned Monolithic RCC (M30+ Grade)', flooring: 'Imported Botticino / Statuario Marble (₹280/sq.ft)', doorsWindows: 'Custom Slim-Profile Schüco Systems with Low-E Glass', electricalPlumbing: 'Toto Neorest / Hansgrohe Axor, KNX Smart Bus Wiring', finishes: 'Hand-Applied Microcement & Lime Plaster Finishes' } }
];

export const clientReviews = [
  { id: '1', name: 'Dr. Anand Ramanathan', role: 'Chief of Cardiology & Villa Owner', project: 'Emerald Crest 6,400 Sq.Ft Villa', quote: 'From the initial soil test to the final handover party, Brickon was an absolute masterclass in transparency. We never faced a single budget overrun or surprise invoice. Their craftsmanship is unmatched.', rating: 5, year: '2024' },
  { id: '2', name: 'Kavitha Sundaram', role: 'Principal Architect, Studio ArchForm', project: 'Cantilever House & Office Complex', quote: 'As an architect, finding a contractor who respects millimeter tolerances without cutting corners is rare. Brickon executed our most audacious structural cantilevers with effortless precision.', rating: 5, year: '2024' },
  { id: '3', name: 'Manoj Chettiar', role: 'Managing Director, Apex Logistics', project: '120,000 Sq.Ft PEB Logistics Hub', quote: 'Brickon finished our high-bay industrial hub three weeks ahead of schedule. The FM2 super-flat laser screed floor handles our high-reach automated forklifts without a single shudder.', rating: 5, year: '2023' }
];

export const faqItems = [
  { q: 'How does Brickon ensure construction quality and material standards?', a: 'We operate under a strict 45-point Quality Assurance (QA) protocol. Every consignment of steel, cement, aggregates, and bricks is tested at NABL-accredited third-party laboratories. We conduct cube compression tests at 7, 14, and 28 days for every concrete pour and provide test certificates in the client portal.' },
  { q: 'Are your pricing estimates fixed, or will costs increase midway through the project?', a: 'Our Itemized Bill of Quantities (BOQ) is fixed and locked once structural and architectural drawings are finalized. Unless you request scope alterations or material upgrades during construction, there are zero hidden escalations.' },
  { q: 'What is the typical timeline for building a custom residential villa?', a: 'A standard 3,000 to 5,000 sq.ft villa typically takes 9 to 13 months from foundation excavation to final finishing. We provide a milestone-based Gantt chart at project commencement and conduct weekly sprint reviews with video/drone updates.' },
  { q: 'Do you help with municipal approvals, building permits, and plan sanctions?', a: 'Yes. Our turnkey general contracting includes liaisoning for CMDA/DTCP/local corporation plan sanctions, structural stability certificates, water/sewerage connections, and final completion/occupancy certificates (CC).' },
  { q: 'What warranty is provided after project handover?', a: 'We offer an industry-leading 10-Year Structural Warranty on all RCC framing, foundations, and load-bearing elements, along with a 5-Year Waterproofing Warranty and 1-Year complimentary post-occupancy maintenance.' }
];