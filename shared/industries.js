/* ─────────────────────────────────────────────────────────────
 * Industry demo data — two-level tree (parent → children).
 * Each leaf industry has pre-fill data used on the Company Info
 * review screen. Add a new industry by dropping another entry in
 * `INDUSTRY_PREFILLS` and adding a reference in `INDUSTRY_TREE`.
 *
 * Mirrors iOS structure:
 *   - Choice (backend): { id, name, parentId?, hasChildren? }
 *   - industryGlobalFieldDefaults/Labels: cross-industry fields
 *     (Products & Services, Pricing, Hours, Geography)
 *   - industryTemplateFields: industry-specific sections
 *   - presetFields / draftFields sets map to our 'preset'/'draft' badges.
 * ───────────────────────────────────────────────────────────── */

/* ── Industry tree (parent → children), shown in the picker ── */
window.INDUSTRY_TREE = [
  {
    id: 'healthcare', name: 'Healthcare', icon: '🩺',
    children: [
      { id: 'pharmacy',    name: 'Pharmacy',           icon: '💊' },
      { id: 'dental',      name: 'Dental Practice',    icon: '🦷' },
      { id: 'medical',     name: 'Medical Practice',   icon: '⚕️' },
      { id: 'other-healthcare', name: 'Other Healthcare' },
    ],
  },
  {
    id: 'real-estate', name: 'Real Estate', icon: '🏠',
    children: [
      { id: 'residential', name: 'Residential Agent',     icon: '🏡' },
      { id: 'commercial',  name: 'Commercial Agent',      icon: '🏢' },
      { id: 'property-mgmt', name: 'Property Management', icon: '🔑' },
      { id: 'other-real-estate', name: 'Other Real Estate' },
    ],
  },
  {
    id: 'construction', name: 'Construction & Trades', icon: '🏗️',
    children: [
      { id: 'equipment-rental', name: 'Equipment Rental',    icon: '🚜' },
      { id: 'general-contractor', name: 'General Contractor', icon: '🔨' },
      { id: 'other-construction', name: 'Other Construction' },
    ],
  },
  {
    id: 'professional-services', name: 'Professional Services', icon: '💼',
    children: [
      { id: 'law-firm',   name: 'Law Firm',       icon: '⚖️' },
      { id: 'accounting', name: 'Accounting',     icon: '📊' },
      { id: 'consulting', name: 'Consulting',     icon: '🧭' },
      { id: 'other-professional', name: 'Other Professional' },
    ],
  },
  {
    id: 'retail', name: 'Retail & Hospitality', icon: '🛍️',
    children: [
      { id: 'restaurant', name: 'Restaurant',     icon: '🍽️' },
      { id: 'boutique',   name: 'Boutique / Shop', icon: '🛒' },
      { id: 'other-retail', name: 'Other Retail' },
    ],
  },
  { id: 'other', name: 'Other', icon: '✦' },
];

/* ── Flat lookup: id → { parentName, displayName, icon } ──── */
window.INDUSTRY_LOOKUP = (() => {
  const map = {};
  window.INDUSTRY_TREE.forEach(parent => {
    if (parent.children) {
      parent.children.forEach(child => {
        map[child.id] = {
          id: child.id,
          name: child.name,
          icon: child.icon || parent.icon,
          parentName: parent.name,
          displayName: `${parent.name} — ${child.name}`,
        };
      });
    } else {
      map[parent.id] = {
        id: parent.id,
        name: parent.name,
        icon: parent.icon,
        parentName: null,
        displayName: parent.name,
      };
    }
  });
  return map;
})();

/* ─────────────────────────────────────────────────────────────
 * Pre-fill data per leaf industry.
 *
 * Shape of each entry:
 *   {
 *     pageTitle,      // NavBar title on Company Info screen
 *     companyLabel,   // label for the "Pharmacy Name / Brokerage Name" row
 *     companyName,    // default value — draft (editable example)
 *     jobTitle,       // draft
 *     goesBy,         // draft
 *     workBio: { text, badge: 'preset'|'draft' },
 *     sections: [     // cross-industry global + industry-specific
 *       { title, badge, type, content | listings | categories | accepted | notAccepted }
 *     ]
 *   }
 * ───────────────────────────────────────────────────────────── */

window.INDUSTRY_PREFILLS = {

  pharmacy: {
    pageTitle: 'Pharmacy Info',
    companyLabel: 'Pharmacy Name',
    companyName: 'Wellness Care Pharmacy',
    jobTitle: 'Lead Pharmacist',
    goesBy: 'Dr. Sarah',
    workBio: {
      badge: 'preset',
      text: 'Independent community pharmacy serving the neighborhood since 2015. We specialize in personalized medication management, immunizations, and chronic care support. Our pharmacists take the time to know every patient by name.',
    },
    sections: [
      {
        title: 'Products & Services',
        badge: 'preset',
        type: 'list',
        content: [
          'Prescription filling & refills',
          'Immunizations — flu, COVID-19, shingles, pneumonia, RSV',
          'OTC medications & health products',
          'Medication therapy management (MTM)',
          'Blood pressure monitoring',
          'Delivery within 10 miles',
          'Med sync program',
        ],
      },
      {
        title: 'Pricing',
        badge: 'draft',
        type: 'list',
        content: [
          'Generic Rx: $4–$15 (30-day supply)',
          'Brand Rx: call for quote with your insurance',
          'Flu shot: $45 (or $0 with most insurance)',
          'COVID vaccine: $0 (federally funded)',
          'Shingles vaccine: $180/dose (2 doses required)',
          'Compounding: starting at $25',
          'Delivery fee: $5 (free over $50)',
        ],
      },
      {
        title: 'Accepted Insurance',
        badge: 'draft',
        type: 'insurance',
        accepted: [
          'CVS Caremark', 'Express Scripts', 'OptumRx',
          'Prime Therapeutics', 'MedImpact', 'Navitus',
          'AARP MedicareRx', 'Wellcare', 'Humana', 'SilverScript',
          'Medicaid (state-dependent)',
        ],
        notAccepted: ['Walmart Rx plan', 'Amazon Pharmacy network'],
      },
      {
        title: 'Hours',
        badge: 'preset',
        type: 'list',
        content: [
          'Mon–Fri: 8am – 8pm',
          'Saturday: 9am – 6pm',
          'Sunday: 10am – 4pm',
        ],
      },
    ],
  },

  dental: {
    pageTitle: 'Practice Info',
    companyLabel: 'Practice Name',
    companyName: 'Bright Smile Dental',
    jobTitle: 'Lead Dentist',
    goesBy: 'Dr. Kim',
    workBio: {
      badge: 'preset',
      text: 'Family-owned general dentistry practice serving patients of all ages. We focus on gentle preventive care, same-day emergency visits, and transparent pricing. In-network with most major PPOs.',
    },
    sections: [
      {
        title: 'Services',
        badge: 'preset',
        type: 'list',
        content: [
          'Cleanings & exams (every 6 months)',
          'Fillings, crowns, bridges',
          'Root canals',
          'Teeth whitening',
          'Invisalign consultations',
          'Same-day emergency visits',
        ],
      },
      {
        title: 'Accepted Insurance',
        badge: 'draft',
        type: 'insurance',
        accepted: [
          'Delta Dental PPO', 'Cigna', 'Aetna', 'MetLife', 'Guardian',
          'UnitedHealthcare', 'Humana Dental',
        ],
        notAccepted: ['Delta Dental HMO', 'Medicaid'],
      },
      {
        title: 'Pricing (out-of-pocket, no insurance)',
        badge: 'draft',
        type: 'list',
        content: [
          'New patient exam + X-rays: $185',
          'Cleaning: $120',
          'Composite filling: $180–$280',
          'Crown: $1,100–$1,450',
          'Whitening (in-office): $450',
        ],
      },
      {
        title: 'Hours',
        badge: 'preset',
        type: 'list',
        content: [
          'Mon–Thu: 8am – 5pm',
          'Friday: 8am – 1pm',
          'Saturday: by appointment',
        ],
      },
    ],
  },

  residential: {
    pageTitle: 'Agent Info',
    companyLabel: 'Brokerage Name',
    companyName: 'Compass Real Estate',
    jobTitle: 'Residential Agent',
    goesBy: 'Mike',
    workBio: {
      badge: 'preset',
      text: 'Full-service residential real estate agent specializing in single-family homes and condos in the greater metro area. I help buyers find their dream home and sellers get top dollar with strategic pricing and staging.',
    },
    sections: [
      {
        title: 'Active Listings',
        badge: 'draft',
        type: 'listings',
        listings: [
          {
            address: '742 Evergreen Terrace, Springfield',
            type: 'Single Family',
            beds: 4, baths: 3, sqft: '2,450', year: 2018, price: '$485,000',
            showing: 'Sat–Sun 1–4pm, weekdays by appt',
            notes: "Shoes off, don't discuss price at showing",
          },
          {
            address: '88 Maple Drive, Unit 4B, Shelbyville',
            type: 'Condo',
            beds: 2, baths: 2, sqft: '1,180', year: 2021, price: '$329,000',
            showing: 'By appointment only',
            notes: 'Tenant-occupied, 24hr notice required',
          },
        ],
      },
      {
        title: 'Commission & Fees',
        badge: 'draft',
        type: 'list',
        content: [
          'Buyer representation: 2.5%',
          'Seller listing fee: 3%',
          'Transaction coordination: $500',
          'Staging consultation: included',
        ],
      },
      {
        title: 'Service Area',
        badge: 'preset',
        type: 'list',
        content: [
          'Greater metro area — all ZIPs within 25 miles',
          'Focus neighborhoods: Springfield, Shelbyville, Capital City',
          'Open to referrals outside the area',
        ],
      },
    ],
  },

  'equipment-rental': {
    pageTitle: 'Company Info',
    companyLabel: 'Company Name',
    companyName: 'Summit Equipment Rentals',
    jobTitle: 'Operations Manager',
    goesBy: 'Dave',
    workBio: {
      badge: 'preset',
      text: 'Full-service equipment rental yard with over 200 machines available for daily, weekly, and monthly rental. We serve contractors, municipalities, and homeowners across a 50-mile radius with delivery and pickup.',
    },
    sections: [
      {
        title: 'Equipment Inventory',
        badge: 'draft',
        type: 'equipment',
        categories: [
          { name: 'Earthmoving', items: [
            { name: 'Mini Excavator (3.5 ton)', rate: '$350/day · $1,200/wk · $3,200/mo' },
            { name: 'Skid Steer Loader',        rate: '$295/day · $995/wk · $2,600/mo' },
            { name: 'Backhoe Loader',           rate: '$425/day · $1,500/wk · $4,000/mo' },
          ]},
          { name: 'Aerial / Lifts', items: [
            { name: 'Scissor Lift (26ft)', rate: '$225/day · $750/wk · $1,800/mo' },
            { name: 'Boom Lift (60ft)',    rate: '$550/day · $1,800/wk · $4,500/mo' },
          ]},
          { name: 'Compaction', items: [
            { name: 'Plate Compactor',      rate: '$85/day · $295/wk · $750/mo' },
            { name: 'Ride-On Roller (1 ton)', rate: '$275/day · $950/wk · $2,400/mo' },
          ]},
          { name: 'Power & Lighting', items: [
            { name: 'Generator (20kW)',    rate: '$175/day · $595/wk · $1,500/mo' },
            { name: 'Light Tower (4-head)', rate: '$125/day · $425/wk · $1,100/mo' },
          ]},
        ],
      },
      {
        title: 'Rental Terms',
        badge: 'preset',
        type: 'list',
        content: [
          'Delivery: $150 flat fee within 25 miles',
          'Rental day: 8 hours',
          'Deposit: $500–$2,000 depending on equipment',
          'Damage waiver: 12% of rental rate',
          'Fuel policy: return full or pay market rate + $15 service fee',
          'Overtime: 1/8 of daily rate per hour',
        ],
      },
      {
        title: 'Hours',
        badge: 'preset',
        type: 'list',
        content: [
          'Mon–Fri: 6am – 6pm',
          'Saturday: 7am – 2pm',
          'Sunday: closed (emergency pickup by arrangement)',
        ],
      },
    ],
  },

  /* ── Fallback for sub-industries we haven't filled in yet.
   *    Renderer falls back to this when a selected industry has
   *    no entry above. Keeps the prototype functional for every
   *    picker choice while signalling "content pending". ── */
  _fallback: {
    pageTitle: 'Company Info',
    companyLabel: 'Company Name',
    companyName: 'Your Company',
    jobTitle: 'Your Job Title',
    goesBy: '',
    workBio: {
      badge: 'draft',
      text: 'We haven\'t built out pre-fill content for this industry yet. Tell us what you do and we\'ll generate a starting bio, services list, and pricing guide tailored to your business.',
    },
    sections: [
      {
        title: 'Products & Services',
        badge: 'draft',
        type: 'list',
        content: ['Add your first service…'],
      },
      {
        title: 'Pricing',
        badge: 'draft',
        type: 'list',
        content: ['Add pricing guidance…'],
      },
      {
        title: 'Hours',
        badge: 'draft',
        type: 'list',
        content: ['Mon–Fri: 9am – 5pm'],
      },
    ],
  },
};

/* ── URL helpers ────────────────────────────────────────── */

/** Read ?industry=<id> from the current URL. Defaults to pharmacy. */
window.getIndustryFromUrl = function () {
  const params = new URLSearchParams(window.location.search);
  return params.get('industry') || 'pharmacy';
};

/** Get the prefill for an industry id, falling back to _fallback. */
window.getPrefill = function (industryId) {
  return window.INDUSTRY_PREFILLS[industryId] || window.INDUSTRY_PREFILLS._fallback;
};
