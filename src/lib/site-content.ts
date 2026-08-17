export const site = {
  name: "1% Realtor",
  url: "https://bay101realty.com",
  tagline: "I list. I write offers. I get deals done.",
  region: "San Francisco Bay Area",
  listingRate: "1%",
  buyerRate: "1%",
  agent: {
    name: "Steven C. Reiley",
    dreNumber: "CA DRE #02130614",
    phone: "415-992-2084",
    areas: "Bay Area",
  },
  brokerage: {
    name: "Ashby & Graff Real Estate",
    logo: {
      src: "/brand/ashby-graff.png",
      alt: "Ashby & Graff Real Estate",
      width: 554,
      height: 554,
    },
  },
};

export const navLinks = [
  { href: "/#sell", label: "Sell" },
  { href: "/#buy", label: "Buy" },
  { href: "/#about", label: "About" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
] as const;

export const images = {
  hero: {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=80",
    alt: "Contemporary luxury residence with warm interior lighting at dusk",
  },
  buyer: {
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=80",
    alt: "Sunlit living room in a contemporary residence",
  },
  seller: {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80",
    alt: "Modern luxury home with pool and clean architectural lines",
  },
} as const;

export const buyerSteps = [
  {
    number: "01",
    title: "Find",
    description: "You identify the property.",
  },
  {
    number: "02",
    title: "Analyze",
    description:
      "I review the property, comparable sales, pricing, market conditions, and seller situation.",
  },
  {
    number: "03",
    title: "Write",
    description: "I prepare the offer and supporting strategy.",
  },
  {
    number: "04",
    title: "Negotiate",
    description:
      "I negotiate price, terms, contingencies, and credits.",
  },
  {
    number: "05",
    title: "Close",
    description: "I help manage the transaction through closing.",
  },
] as const;

export const sellerSteps = [
  {
    number: "01",
    title: "Strategy",
    description:
      "Pricing, preparation, and a listing plan built around the property.",
  },
  {
    number: "02",
    title: "Market",
    description:
      "Professional presentation, MLS exposure, and marketing direction.",
  },
  {
    number: "03",
    title: "Offers",
    description:
      "Incoming offers are reviewed for price, terms, timing, and risk.",
  },
  {
    number: "04",
    title: "Negotiate",
    description:
      "I negotiate on your behalf toward terms that fit the sale.",
  },
  {
    number: "05",
    title: "Close",
    description: "I help manage the transaction through closing.",
  },
] as const;

export const sellerPoints = [
  "Full-service listing representation.",
  "Professional marketing.",
  "Strategic pricing.",
  "Expert negotiation.",
  "Transaction management.",
] as const;

export const legal = {
  footer:
    "1% listing commission is listing-side compensation. 1% buyer representation is offered at 1%, subject to the terms of the buyer representation agreement. Seller-paid buyer-agent compensation, if any, may offset the buyer's obligation according to the agreement. Commissions are negotiable. Equal Housing Opportunity.",
  buyerCompensation:
    "Buyer representation is offered at 1%, subject to the terms of the buyer representation agreement. Seller-paid buyer-agent compensation, if any, may offset the buyer's obligation according to the agreement.",
  calculator:
    "Commission rates are negotiable. The comparison percentage is an example only and is not a statement about what other agents charge. The 1% figure is listing-side commission only. This calculator is an estimate, not a quote or a guarantee of net proceeds.",
  formSeller:
    "Submitting this form does not create a listing agreement. The exact fee and scope of work are confirmed in writing.",
  formBuyer:
    "Submitting this form does not create a buyer representation agreement. Buyer representation is offered at 1%, subject to the terms of the buyer representation agreement. Seller-paid buyer-agent compensation, if any, may offset the buyer's obligation according to the agreement.",
};

export const faqGroups = [
  {
    title: "Sellers",
    items: [
      {
        question: "Why is your listing commission 1%?",
        answer:
          "1% is the listing-side compensation in this model — the fee for representing you as the seller. Real estate commissions are negotiable. The exact fee and scope of work are confirmed in a listing agreement.",
      },
      {
        question: "Is this really full-service?",
        answer:
          "Yes. The 1% listing commission is for full-service listing representation, not a limited or do-it-yourself package. Pricing, marketing, offer review, negotiation, and transaction management remain the job.",
      },
      {
        question: "What's included in the 1%?",
        answer:
          "Listing-side representation typically includes pricing strategy, preparation guidance, marketing and listing presentation, coordination of showings, review of incoming offers, negotiation, and help managing the transaction through closing. Specific vendors, extras, and the exact scope of work are confirmed in writing.",
      },
      {
        question: "Do I still get professional marketing?",
        answer:
          "Yes. A 1% listing is still presented as a full-service listing — including listing presentation, MLS exposure, and marketing direction appropriate to the property. Photography, staging, and other vendors are discussed as part of the listing plan.",
      },
      {
        question: "How do you price my home?",
        answer:
          "Pricing starts with comparable sales, current listings, and local market conditions. The goal is a strategy that supports both urgency and value — not a number chosen to justify a fee.",
      },
      {
        question: "Will you negotiate offers?",
        answer:
          "Yes. Incoming offers are reviewed for price, terms, timing, contingencies, and risk. Negotiation is handled as part of the listing representation.",
      },
      {
        question: "Are there other costs besides the 1%?",
        answer:
          "Yes. The 1% figure is listing-side commission in the examples on this site. Other transaction costs — escrow, title, inspections, staging, and any separately negotiated compensation for a buyer's agent — are not bundled into the 1%. Those items are discussed in the transaction and confirmed in the applicable agreements.",
      },
      {
        question: "How is the savings estimate calculated?",
        answer:
          "The calculator compares an example listing-side percentage that you enter against a 1% listing-side fee on the same home value. That comparison percentage is an example only — not a statement about what other agents charge. The result is a potential difference, not a quote or a guarantee of net proceeds.",
      },
    ],
  },
  {
    title: "Buyers",
    items: [
      {
        question: "Do you show homes?",
        answer:
          "If you're comfortable finding properties yourself, you don't need a traditional touring-heavy experience. My offer-focused service is designed for buyers who identify properties themselves and want professional help with analysis, offer strategy, negotiation, and closing. If you need more hands-on assistance, we can discuss the appropriate representation.",
      },
      {
        question: "What if I need help finding homes?",
        answer:
          "Buyers who want extensive property search and touring should discuss the appropriate level of representation and services. The 1% buyer service is built for clients who are already comfortable identifying properties themselves. If you need more hands-on search support, we can talk through what representation is a fit before any agreement is signed.",
      },
      {
        question: "Can you write an offer for a home I found?",
        answer:
          "Yes — subject to establishing the required buyer representation relationship and completing required documentation. If you have identified a property you are serious about, I can analyze the opportunity, prepare the offer, submit it, and negotiate on your behalf.",
      },
      {
        question: "How quickly can you write an offer?",
        answer:
          "Timing depends on the property, available information, the offer deadline, and the complexity of the situation. Urgent offers can be prioritized when feasible. There is no guaranteed turnaround time. Required buyer representation paperwork still needs to be completed before an offer is submitted.",
      },
      {
        question: "Will you negotiate after the offer is submitted?",
        answer:
          "Yes. After the offer is submitted, I communicate with the listing side and negotiate price, terms, contingencies, credits, and other terms when appropriate.",
      },
      {
        question: "Do you help with inspections and contingencies?",
        answer:
          "Yes. Once an offer is accepted, representation includes advising and coordinating through inspections, contingency deadlines, documents, and closing. Inspectors, contractors, lenders, attorneys, and other specialists provide their own professional services.",
      },
      {
        question: "How are you compensated when representing a buyer?",
        answer:
          "Buyer representation is offered at 1%, subject to the terms of the buyer representation agreement. Seller-paid buyer-agent compensation, if any, may offset the buyer's obligation according to the agreement. Compensation is negotiated and documented in writing. This site does not promise a rebate, a seller-paid amount, or a particular credit from the listing side.",
      },
    ],
  },
  {
    title: "General",
    items: [
      {
        question: "Who is the agent?",
        answer:
          "Steven C. Reiley, CA DRE #02130614, affiliated with Ashby & Graff Real Estate. 1% Realtor is the consumer-facing brand for this practice — not a separate brokerage.",
      },
      {
        question: "Do I have to sign an agreement?",
        answer:
          "Yes, when representation begins. Required listing or buyer representation agreements and disclosures will be provided as applicable. Submitting a form on this site does not create an agreement.",
      },
      {
        question: "What areas do you serve?",
        answer:
          "The intended service area is the San Francisco Bay Area. Fit for a specific city or neighborhood is confirmed during consultation.",
      },
      {
        question: "How do I get started?",
        answer:
          "Use Get Started, then choose Sell My Home or I Found a Home. Share a few details and a follow-up will cover next steps. There is no listing or buyer representation agreement until you choose to sign one.",
      },
    ],
  },
] as const;
