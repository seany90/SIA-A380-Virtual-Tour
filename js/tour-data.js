/**
 * Singapore Airlines A380 Virtual Tour - Cabin Data Model
 * 
 * You can easily customize this file in VS Code:
 *  - Add new cabin rooms or views
 *  - Update seat specifications (pitch, width, screen size)
 *  - Add or modify 3D interactive hotspots
 *  - Change or add new seat transformation states
 */

window.CABIN_NODES = {
  'suites_upright': {
    name: 'Suites (First Class)',
    deck: 'upper',
    pano: 'assets/panos/suites_upright.jpg',
    fallback: 'https://silverkris.singaporeair.com/experience-the-a380/v2-2/vr/panos/mobile/1st/1st.jpg',
    mapPos: { x: 55, y: 40 },
    states: [
      { id: 'suites_upright', label: '💺 Swivel Armchair' },
      { id: 'suites_bed', label: '🛏️ Standalone Double Bed' },
      { id: 'suites_dining', label: '🍽️ Dining Table Mode' }
    ],
    hotspots: [
      {
        coords: { x: 120, y: -20, z: -400 },
        title: 'Poltrona Frau Leather Armchair',
        badge: 'Exclusive Comfort',
        desc: 'Handcrafted by Italian luxury upholsterer Poltrona Frau. Swivels smoothly up to 270 degrees and reclines up to 45 degrees.',
        specs: [
          { label: 'Recline', val: '45° Full Recline' },
          { label: 'Swivel', val: '270° Range' },
          { label: 'Material', val: 'Full Grain Leather' },
          { label: 'Control', val: 'Wireless Tablet' }
        ]
      },
      {
        coords: { x: -350, y: 10, z: -250 },
        title: '32-inch Full HD KrisWorld Screen',
        badge: 'In-Flight Entertainment',
        desc: 'A massive 32-inch high-definition screen paired with Bang & Olufsen active noise-cancelling headphones for theater-grade acoustics.',
        specs: [
          { label: 'Display', val: '32" 1080p HD' },
          { label: 'Headphones', val: 'Bang & Olufsen' },
          { label: 'Pairing', val: 'NFC & Mobile Sync' },
          { label: 'Titles', val: '1,800+ On Demand' }
        ]
      }
    ]
  },

  'suites_bed': {
    name: 'Suites (Bed Mode)',
    deck: 'upper',
    pano: 'assets/panos/suites_bed.jpg',
    fallback: 'https://silverkris.singaporeair.com/experience-the-a380/v2-2/vr/panos/mobile/1st/1stbed.jpg',
    mapPos: { x: 55, y: 40 },
    states: [
      { id: 'suites_upright', label: '💺 Swivel Armchair' },
      { id: 'suites_bed', label: '🛏️ Standalone Double Bed' },
      { id: 'suites_dining', label: '🍽️ Dining Table Mode' }
    ],
    hotspots: [
      {
        coords: { x: 50, y: -90, z: -400 },
        title: 'Double Bed Conversion',
        badge: 'Private Bedroom',
        desc: 'In the first two suites of each aisle, the center divider drops down to create a plush, full-sized double bed with Lalique bedding.',
        specs: [
          { label: 'Bed Length', val: '76 inches (193 cm)' },
          { label: 'Width', val: '27" (Single) / Double' },
          { label: 'Bedding', val: 'Lalique Luxury Linen' },
          { label: 'Mattress', val: 'Custom Plush' }
        ]
      }
    ]
  },

  'suites_dining': {
    name: 'Suites (Dining Mode)',
    deck: 'upper',
    pano: 'assets/panos/suites_dining.jpg',
    fallback: 'https://silverkris.singaporeair.com/experience-the-a380/v2-2/vr/panos/mobile/1st/1stchair.jpg',
    mapPos: { x: 55, y: 40 },
    states: [
      { id: 'suites_upright', label: '💺 Swivel Armchair' },
      { id: 'suites_bed', label: '🛏️ Standalone Double Bed' },
      { id: 'suites_dining', label: '🍽️ Dining Table Mode' }
    ],
    hotspots: [
      {
        coords: { x: 80, y: -50, z: -350 },
        title: 'Gourmet In-Flight Dining',
        badge: 'Book the Cook',
        desc: 'Enjoy fine dining served on Wedgwood bone china with meals prepared by Singapore Airlines International Culinary Panel.',
        specs: [
          { label: 'Tableware', val: 'Wedgwood Bone China' },
          { label: 'Champagne', val: 'Vintage Krug & Dom Pérignon' }
        ]
      }
    ]
  },

  'suites_lav': {
    name: 'Suites Luxury Lavatory',
    deck: 'upper',
    pano: 'assets/panos/suites_lav.jpg',
    fallback: 'https://silverkris.singaporeair.com/experience-the-a380/v2-2/vr/panos/mobile/LU12/LU12.jpg',
    mapPos: { x: 80, y: 40 },
    states: [],
    hotspots: [
      {
        coords: { x: 10, y: -40, z: -350 },
        title: 'Dedicated Sit-Down Vanity Counter',
        badge: 'Spa & Grooming',
        desc: 'Features a full sit-down vanity counter, ambient LED grooming lights, and exclusive Lalique Neroli amenities.',
        specs: [
          { label: 'Amenities', val: 'Lalique Signature' },
          { label: 'Mirror', val: 'LED Halo Vanity' }
        ]
      }
    ]
  },

  'business_upright': {
    name: 'Business Class (Half-Recline)',
    deck: 'upper',
    pano: 'assets/panos/business_recline_v2.jpg',
    fallback: 'https://silverkris.singaporeair.com/experience-the-a380/v2-2/vr/panos/mobile/bc/bc.jpg',
    mapPos: { x: 125, y: 40 },
    view: { lon: 160, lat: -22, fov: 80 },
    states: [
      { id: 'business_upright', label: '💺 Forward Seated (Half-Recline)' },
      { id: 'business_table', label: '🍽️ Table Deployed' },
      { id: 'business_bed', label: '🛏️ Full Flat Bed' }
    ],
    hotspots: [
      {
        coords: { x: -350, y: -45, z: 70 },
        title: 'Direct Aisle Access (1-2-1)',
        badge: 'Business Class',
        desc: 'Carbon composite cocoon shell provides supreme privacy with a seamless 1-2-1 forward-facing configuration.',
        image: 'assets/details/business-cabin-overview.jpg',
        imageAlt: 'Wide view of the Singapore Airlines A380 Business Class cabin and 1-2-1 seating layout',
        specs: [
          { label: 'Width', val: '25 inches' },
          { label: 'Pitch', val: '50 inches' },
          { label: 'Screen', val: '18" Touch HD' },
          { label: 'Aisle Access', val: '100% Direct' }
        ]
      },
      {
        coords: { x: -255, y: -30, z: 245 },
        title: 'Adjustable Lounge Position',
        badge: 'Seat Controls',
        desc: 'The powered controls move the seat into a halfway-reclined lounge position while keeping it clearly separate from the fully flat bed mode.',
        image: 'assets/details/business-cabin-panorama.jpg',
        imageAlt: 'Panoramic overview of the Business Class cabin in seated configuration',
        specs: [
          { label: 'Position', val: 'Half-Recline' },
          { label: 'Operation', val: 'Powered Seat Controls' }
        ]
      },
      {
        kind: 'navigate',
        target: 'business_table',
        icon: '➜',
        coords: { x: -335, y: -145, z: 115 },
        title: 'Move to Table View'
      },
      {
        kind: 'navigate',
        target: 'business_bed',
        icon: '↗',
        coords: { x: -245, y: -125, z: 245 },
        title: 'Explore Full-Flat Bed'
      }
    ]
  },

  'business_table': {
    name: 'Business Class (Table Deployed)',
    deck: 'upper',
    pano: 'assets/panos/business_divider.jpg',
    fallback: 'https://silverkris.singaporeair.com/experience-the-a380/v2-2/vr/panos/mobile/bc/bc_divider.jpg',
    mapPos: { x: 125, y: 40 },
    view: { lon: 160, lat: -22, fov: 80 },
    states: [
      { id: 'business_upright', label: '💺 Forward Seated (Half-Recline)' },
      { id: 'business_table', label: '🍽️ Table Deployed' },
      { id: 'business_bed', label: '🛏️ Full Flat Bed' }
    ],
    hotspots: [
      {
        coords: { x: -350, y: -45, z: 70 },
        title: 'Deployable Personal Table',
        badge: 'Work & Dine',
        desc: 'A dedicated table extends for dining or working while the seat remains in its forward-facing configuration.',
        specs: [
          { label: 'Configuration', val: 'Table Deployed' },
          { label: 'Use', val: 'Dining & Workspace' }
        ]
      },
      {
        kind: 'navigate',
        target: 'business_upright',
        icon: '↙',
        coords: { x: -335, y: -145, z: 115 },
        title: 'Return to Seated View'
      },
      {
        kind: 'navigate',
        target: 'business_bed',
        icon: '↗',
        coords: { x: -245, y: -125, z: 245 },
        title: 'Continue to Full-Flat Bed'
      }
    ]
  },

  'business_bed': {
    name: 'Business Class (Lie-Flat Bed)',
    deck: 'upper',
    pano: 'assets/panos/business_bed.jpg',
    fallback: 'https://silverkris.singaporeair.com/experience-the-a380/v2-2/vr/panos/mobile/bc/bc_bed.jpg',
    mapPos: { x: 125, y: 40 },
    view: { lon: -20, lat: -18, fov: 82, duration: 1100 },
    states: [
      { id: 'business_upright', label: '💺 Forward Seated (Half-Recline)' },
      { id: 'business_table', label: '🍽️ Table Deployed' },
      { id: 'business_bed', label: '🛏️ Full Flat Bed' }
    ],
    hotspots: [
      {
        coords: { x: -350, y: -45, z: 70 },
        title: '78-inch Fully Flat Bed',
        badge: 'Rest & Rejuvenation',
        desc: 'Reclines directly into a 78-inch fully flat bed with cushioned headboard and side bolster.',
        image: 'assets/details/business-bed-overview.jpg',
        imageAlt: 'Twin Business Class seats converted into full-flat beds',
        specs: [
          { label: 'Length', val: '78 inches' },
          { label: 'Bed Type', val: '180° Horizontal' }
        ]
      },
      {
        coords: { x: -255, y: -30, z: 245 },
        title: 'Bedside Comfort & Controls',
        badge: 'Sleep Experience',
        desc: 'A close-up view of the upholstered headboard, bedding, side console and controls available in bed mode.',
        image: 'assets/details/business-bed-closeup.jpg',
        imageAlt: 'Close-up of Business Class bed, bedding, side console and seat controls',
        specs: [
          { label: 'Bedding', val: 'Full-Length Duvet' },
          { label: 'Controls', val: 'Within Easy Reach' }
        ]
      },
      {
        coords: { x: -385, y: 35, z: 180 },
        title: 'Cabin-Wide Bed Configuration',
        badge: 'Panoramic Detail',
        desc: 'See how the full-flat bed pair sits within the wider Business Class cabin layout.',
        image: 'assets/details/business-bed-panorama.jpg',
        imageAlt: 'Panoramic Business Class cabin view with the foreground seats in bed mode',
        specs: [
          { label: 'Layout', val: '1-2-1 Direct Aisle' },
          { label: 'Mode', val: 'Full-Flat Bed' }
        ]
      },
      {
        kind: 'navigate',
        target: 'business_upright',
        icon: '↙',
        coords: { x: -335, y: -145, z: 115 },
        title: 'Return to Seated View'
      },
      {
        kind: 'navigate',
        target: 'business_table',
        icon: '↖',
        coords: { x: -245, y: -125, z: 245 },
        title: 'Move to Table View'
      }
    ]
  },

  'prem_econ': {
    name: 'Premium Economy Class',
    deck: 'main',
    pano: 'assets/panos/prem_econ.jpg',
    fallback: 'https://silverkris.singaporeair.com/experience-the-a380/v2-2/vr/panos/mobile/PrEC/PrEC.jpg',
    mapPos: { x: 75, y: 40 },
    states: [
      { id: 'prem_econ', label: '💺 Standard Seated' },
      { id: 'prem_econ_foot', label: '🦶 Calf & Footrest Out' }
    ],
    hotspots: [
      {
        coords: { x: 40, y: -50, z: -350 },
        title: 'Dedicated Calf-Rest & Foot-Rest',
        badge: 'Enhanced Comfort',
        desc: 'Generous 38-inch pitch with 8-inch recline, individual reading light, and Book the Cook culinary ordering.',
        specs: [
          { label: 'Seat Pitch', val: '38 inches' },
          { label: 'Width', val: '19.5 inches' },
          { label: 'Screen', val: '13.3" Full HD' },
          { label: 'Recline', val: '8 inches' }
        ]
      }
    ]
  },

  'prem_econ_foot': {
    name: 'Premium Economy (Footrest Mode)',
    deck: 'main',
    pano: 'assets/panos/prem_econ_foot.jpg',
    fallback: 'https://silverkris.singaporeair.com/experience-the-a380/v2-2/vr/panos/mobile/PrEC/PrECfoot.jpg',
    mapPos: { x: 75, y: 40 },
    states: [
      { id: 'prem_econ', label: '💺 Standard Seated' },
      { id: 'prem_econ_foot', label: '🦶 Calf & Footrest Out' }
    ],
    hotspots: []
  },

  'economy': {
    name: 'Economy Class',
    deck: 'main',
    pano: 'assets/panos/economy.jpg',
    fallback: 'https://silverkris.singaporeair.com/experience-the-a380/v2-2/vr/panos/mobile/ec/ec.jpg',
    mapPos: { x: 130, y: 40 },
    states: [
      { id: 'economy', label: '💺 Standard Seated' },
      { id: 'economy_recline', label: '🛋️ Recline Mode' }
    ],
    hotspots: [
      {
        coords: { x: -30, y: -30, z: -350 },
        title: 'Ergonomic Seat & 6-Way Headrest',
        badge: 'Economy Comfort',
        desc: 'Contoured backrest with patented 6-way adjustable headrest with foldable wings for neck support.',
        specs: [
          { label: 'Pitch', val: '32 inches' },
          { label: 'Screen', val: '11.1" Touchscreen' },
          { label: 'Power', val: 'AC + USB ports' }
        ]
      }
    ]
  },

  'economy_recline': {
    name: 'Economy (Recline Mode)',
    deck: 'main',
    pano: 'assets/panos/economy_recline.jpg',
    fallback: 'https://silverkris.singaporeair.com/experience-the-a380/v2-2/vr/panos/mobile/ec/ec_lehne.jpg',
    mapPos: { x: 130, y: 40 },
    states: [
      { id: 'economy', label: '💺 Standard Seated' },
      { id: 'economy_recline', label: '🛋️ Recline Mode' }
    ],
    hotspots: []
  },

  'd1': {
    name: 'Entrance (Door 1)',
    deck: 'main',
    pano: 'assets/panos/d1.jpg',
    fallback: 'https://silverkris.singaporeair.com/experience-the-a380/v2-2/vr/panos/mobile/D1/D1.jpg',
    mapPos: { x: 40, y: 40 },
    states: [],
    hotspots: [
      {
        coords: { x: 10, y: 0, z: -400 },
        title: 'Grand Welcome Foyer',
        badge: 'Welcome Aboard',
        desc: 'Step aboard the world largest passenger airliner with Singapore Airlines legendary hospitality.',
        specs: [
          { label: 'Aircraft', val: 'Airbus A380-800' },
          { label: 'Configuration', val: 'Double Decker' }
        ]
      }
    ]
  }
};
