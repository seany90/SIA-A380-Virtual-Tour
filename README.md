# Singapore Airlines A380 - Interactive 360° Virtual Tour

An interactive 360-degree cabin walkthrough of the Singapore Airlines Airbus A380, combining the seamless seat-transformation controls of **SilverKris VR** with the spatial deck navigation and interactive Mattertags of **Matterport**.

---

## 🚀 Quick Start in VS Code

### Option 1: Using VS Code Live Server (Recommended)
1. Open this folder (`SIA-A380-Virtual-Tour`) in **Visual Studio Code**.
2. If not already installed, install the **Live Server** extension (by *Ritwick Dey*).
3. Right-click [`index.html`](index.html) and select **"Open with Live Server"**.

### Option 2: Double-Click Launcher (No VS Code needed)
- Double-click [`start_tour.bat`](start_tour.bat) on your desktop. It will automatically start a local server and open your browser at `http://localhost:8080`.

### Option 3: Terminal
```bash
# Using Python
python -m http.server 8080

# OR using Node.js
npm start
```

---

## 📁 Project Structure

```
SIA-A380-Virtual-Tour/
├── index.html            # Main HTML layout, navigation bars, modal cards
├── css/
│   └── style.css         # Glassmorphism theme, luxury gold accents, animations
├── js/
│   ├── tour-data.js      # ✨ Cabin data, seat states, hotspot coordinates, specs
│   └── tour.js           # Three.js 360 WebGL engine, crossfader, radar minimap
├── assets/
│   ├── js/
│   │   └── three.min.js  # Three.js library (r128)
│   └── panos/            # 12 high-res 360° equirectangular panoramas
│       ├── suites_upright.jpg
│       ├── suites_bed.jpg
│       ├── suites_dining.jpg
│       ├── suites_lav.jpg
│       ├── business_upright.jpg
│       ├── business_divider.jpg
│       ├── business_bed.jpg
│       ├── prem_econ.jpg
│       ├── prem_econ_foot.jpg
│       ├── economy.jpg
│       ├── economy_recline.jpg
│       └── d1.jpg
├── .vscode/
│   └── settings.json     # VS Code workspace settings
├── package.json          # npm configuration
└── start_tour.bat        # Windows one-click local server launcher
```

---

## 🛠️ How to Customize in VS Code

### 1. Adding or Modifying Hotspots (Mattertags)
Open [`js/tour-data.js`](js/tour-data.js) and locate the node you want to edit (e.g., `suites_upright`). Add a new item into the `hotspots` array:

```javascript
{
  coords: { x: 120, y: -20, z: -400 }, // 3D coordinates inside the 360 sphere
  title: 'Your Feature Name',
  badge: 'Cabin Feature',
  desc: 'Description of the feature.',
  specs: [
    { label: 'Dimension', val: '78 inches' },
    { label: 'Feature', val: 'Touchscreen' }
  ]
}
```

### 2. Changing Seat Transformation States
In [`js/tour-data.js`](js/tour-data.js), each node has a `states` array. You can link multiple panoramic photos from the same tripod position:

```javascript
states: [
  { id: 'suites_upright', label: '💺 Swivel Armchair' },
  { id: 'suites_bed', label: '🛏️ Standalone Double Bed' },
  { id: 'suites_dining', label: '🍽️ Dining Table Mode' }
]
```

### 3. Adding Your Own 360 Panoramas
1. Place your `.jpg` equirectangular panorama into `assets/panos/your_image.jpg`.
2. Add a new entry to `window.CABIN_NODES` in [`js/tour-data.js`](js/tour-data.js).
3. Add a button to the `<nav class="cabin-bar">` in [`index.html`](index.html).

---

## ✨ Features Included
- **Dual-Sphere Crossfading**: Smooth opacity dissolve between cabin classes.
- **Seat State Transformer**: Upright armchair $\leftrightarrow$ Lie-flat bed $\leftrightarrow$ Dining table.
- **Double-Decker Minimap**: Upper Deck vs. Main Deck with real-time rotating radar cone.
- **3D Spatial Hotspots**: Projected HTML5 gold pulse pins displaying real cabin specs.
- **Web Audio Ambience**: Realistic aircraft cabin hum generated directly via the Web Audio API without needing external sound files.
