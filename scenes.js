/* =============================================================
   SCENES — animated inline SVG placeholders for 11 chapters
   Each scene accepts a hex color and returns an SVG string.
   When you swap in real media, replace the call site
   (see script.js:renderScene) with <img> or <video> instead.
   ============================================================= */

export function sceneElevation(c) {
  return `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
    <defs><linearGradient id="el-sky" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#d7c79a"/><stop offset="1" stop-color="${c}"/>
    </linearGradient></defs>
    <rect width="800" height="500" fill="url(#el-sky)"/>
    <g fill="none" stroke="#f1e8d3" stroke-width="0.7" opacity="0.55">
      <line x1="0" y1="160" x2="800" y2="160" stroke-dasharray="3,6"/>
      <line x1="0" y1="260" x2="800" y2="260" stroke-dasharray="3,6"/>
      <line x1="0" y1="360" x2="800" y2="360" stroke-dasharray="3,6"/>
    </g>
    <g fill="none" stroke="#f1e8d3" stroke-width="1" opacity="0.85">
      <rect x="120" y="180" width="200" height="200"/>
      <rect x="320" y="140" width="140" height="240"/>
      <rect x="460" y="200" width="180" height="180"/>
      <line x1="120" y1="240" x2="320" y2="240"/>
      <line x1="120" y1="300" x2="320" y2="300"/>
      <line x1="320" y1="200" x2="460" y2="200"/>
      <line x1="320" y1="260" x2="460" y2="260"/>
      <line x1="320" y1="320" x2="460" y2="320"/>
      <line x1="460" y1="260" x2="640" y2="260"/>
      <line x1="460" y1="320" x2="640" y2="320"/>
    </g>
    <g fill="#f1e8d3" font-family="Cormorant Garamond" font-style="italic" font-size="11" opacity="0.7">
      <text x="130" y="400">north elevation</text>
      <text x="330" y="400">central tower</text>
      <text x="470" y="400">south wing</text>
    </g>
    <g stroke="#b09558" stroke-width="0.5" fill="none" opacity="0.6">
      <line x1="120" y1="180" x2="100" y2="160"/>
      <line x1="320" y1="380" x2="340" y2="400"/>
    </g>
  </svg>`;
}

export function sceneArrival(c) {
  return `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
    <defs><linearGradient id="ar-sky" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#e0ae74"/><stop offset="1" stop-color="${c}"/>
    </linearGradient></defs>
    <rect width="800" height="500" fill="url(#ar-sky)"/>
    <circle cx="400" cy="140" r="46" fill="#fde2b0" opacity="0.9"/>
    <!-- driveway lines converging -->
    <g fill="#0d1510" opacity="0.6">
      <path d="M0 500 L340 320 L460 320 L800 500 Z"/>
    </g>
    <g stroke="#f1e8d3" stroke-width="0.8" fill="none" opacity="0.35">
      <path d="M50 500 L380 340"/>
      <path d="M750 500 L420 340"/>
    </g>
    <!-- porte-cochere silhouette -->
    <g fill="#0d1510">
      <rect x="280" y="240" width="240" height="14"/>
      <rect x="280" y="240" width="8" height="100"/>
      <rect x="512" y="240" width="8" height="100"/>
      <rect x="390" y="254" width="20" height="86"/>
      <path d="M340 254 Q400 220 460 254 L460 340 L340 340 Z" opacity="0.9"/>
    </g>
    <!-- trees -->
    <g fill="#1a2818">
      <ellipse cx="100" cy="300" rx="60" ry="90"/>
      <ellipse cx="700" cy="300" rx="60" ry="90"/>
      <ellipse cx="200" cy="340" rx="50" ry="70"/>
      <ellipse cx="600" cy="340" rx="50" ry="70"/>
    </g>
    <!-- lamp glow -->
    <circle cx="400" cy="250" r="4" fill="#ffcf6b">
      <animate attributeName="opacity" values="0.7;1;0.8;1;0.7" dur="4s" repeatCount="indefinite"/>
    </circle>
    <circle cx="400" cy="250" r="14" fill="#ffcf6b" opacity="0.25"/>
  </svg>`;
}

export function sceneAravalli(c) {
  return `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
    <defs><linearGradient id="av-sky" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#cda773"/><stop offset="1" stop-color="${c}"/>
    </linearGradient></defs>
    <rect width="800" height="500" fill="url(#av-sky)"/>
    <circle cx="620" cy="130" r="38" fill="#fce7b3" opacity="0.85"/>
    <path d="M0 330 L160 200 L320 280 L440 170 L600 250 L720 220 L800 260 L800 500 L0 500 Z"
          fill="#3d5540" opacity="0.9"/>
    <path d="M0 390 L120 310 L280 360 L440 280 L600 340 L720 300 L800 330 L800 500 L0 500 Z"
          fill="#1e3325"/>
    <path d="M0 450 L160 420 L320 430 L480 400 L640 425 L800 410 L800 500 L0 500 Z" fill="#0e1a13"/>
    <g fill="none" stroke="#f1e8d3" opacity="0.55" stroke-width="1">
      <path d="M160 170 q10 -6 20 0 q10 -6 20 0"/>
      <path d="M260 200 q8 -5 16 0 q 8 -5 16 0"/>
    </g>
  </svg>`;
}

export function sceneGarden(c) {
  return `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
    <defs><linearGradient id="gd-sky" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#e8dcb3"/><stop offset="1" stop-color="${c}"/>
    </linearGradient></defs>
    <rect width="800" height="500" fill="url(#gd-sky)"/>
    <circle cx="160" cy="110" r="30" fill="#fff5d8" opacity="0.82"/>
    <ellipse cx="400" cy="500" rx="640" ry="130" fill="#2d3e1a" opacity="0.85"/>
    <ellipse cx="400" cy="500" rx="480" ry="95" fill="#1e2e13"/>
    <g transform-origin="180 440">
      <animateTransform attributeName="transform" type="rotate" values="-1;1;-1" dur="6s" repeatCount="indefinite"/>
      <circle cx="180" cy="310" r="60" fill="#2f4220"/>
      <rect x="175" y="360" width="10" height="80" fill="#4b2e15"/>
    </g>
    <g transform-origin="620 440">
      <animateTransform attributeName="transform" type="rotate" values="-1.5;1.5;-1.5" dur="7s" repeatCount="indefinite"/>
      <circle cx="620" cy="290" r="72" fill="#2a3a1a"/>
      <rect x="614" y="350" width="12" height="90" fill="#4b2e15"/>
    </g>
    <g>
      <circle cx="400" cy="350" r="42" fill="#33471f"/>
      <rect x="396" y="380" width="8" height="50" fill="#4b2e15"/>
    </g>
  </svg>`;
}

export function sceneCity(c) {
  return `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
    <defs><linearGradient id="ct-sky" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#d4996b"/><stop offset="1" stop-color="${c}"/>
    </linearGradient></defs>
    <rect width="800" height="500" fill="url(#ct-sky)"/>
    <circle cx="680" cy="100" r="32" fill="#fde2b0" opacity="0.7"/>
    <g fill="#120d08">
      <rect x="0" y="280" width="90" height="220"/>
      <rect x="90" y="230" width="110" height="270"/>
      <rect x="200" y="180" width="75" height="320"/>
      <rect x="275" y="250" width="100" height="250"/>
      <rect x="375" y="160" width="95" height="340"/>
      <rect x="470" y="240" width="85" height="260"/>
      <rect x="555" y="190" width="90" height="310"/>
      <rect x="645" y="260" width="75" height="240"/>
      <rect x="720" y="220" width="80" height="280"/>
    </g>
    <g fill="#e8b875" opacity="0.82">
      <rect x="15" y="305" width="5" height="7"/><rect x="30" y="305" width="5" height="7"/><rect x="50" y="305" width="5" height="7"/>
      <rect x="15" y="335" width="5" height="7"/><rect x="45" y="335" width="5" height="7"/>
      <rect x="105" y="255" width="5" height="7"/><rect x="125" y="255" width="5" height="7"/><rect x="145" y="255" width="5" height="7"/>
      <rect x="105" y="285" width="5" height="7"/><rect x="145" y="285" width="5" height="7"/>
      <rect x="215" y="205" width="4" height="6"/><rect x="240" y="205" width="4" height="6"/>
      <rect x="215" y="235" width="4" height="6"/><rect x="250" y="235" width="4" height="6"/>
      <rect x="390" y="185" width="4" height="6"/><rect x="410" y="185" width="4" height="6"/><rect x="430" y="185" width="4" height="6"/>
      <rect x="390" y="215" width="4" height="6"/><rect x="430" y="215" width="4" height="6"/>
      <rect x="570" y="215" width="4" height="6"/><rect x="590" y="215" width="4" height="6"/>
      <rect x="570" y="245" width="4" height="6"/>
    </g>
    <g fill="#e8b875">
      <rect x="30" y="305" width="5" height="7"><animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite"/></rect>
      <rect x="125" y="285" width="5" height="7"><animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.5s" begin="0.6s" repeatCount="indefinite"/></rect>
      <rect x="410" y="215" width="4" height="6"><animate attributeName="opacity" values="0.2;1;0.2" dur="4s" begin="1.2s" repeatCount="indefinite"/></rect>
      <rect x="590" y="245" width="4" height="6"><animate attributeName="opacity" values="0.5;1;0.5" dur="3.5s" begin="0.3s" repeatCount="indefinite"/></rect>
    </g>
  </svg>`;
}

export function sceneRaj(c) {
  return `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
    <defs><linearGradient id="rj-sky" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#d4a875"/><stop offset="1" stop-color="${c}"/>
    </linearGradient></defs>
    <rect width="800" height="500" fill="url(#rj-sky)"/>
    <circle cx="0" cy="150" r="42" fill="#f4e2b8" opacity="0.9">
      <animate attributeName="cx" values="-60;860" dur="18s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="210;110;210" dur="18s" repeatCount="indefinite"/>
    </circle>
    <g fill="#0e1a13">
      <path d="M0 500 V280 Q0 180 100 180 Q200 180 200 280 V500 Z"/>
      <path d="M200 500 V240 Q200 140 300 140 Q400 140 400 240 V500 Z"/>
      <path d="M400 500 V200 Q400 100 500 100 Q600 100 600 200 V500 Z"/>
      <path d="M600 500 V280 Q600 180 700 180 Q800 180 800 280 V500 Z"/>
    </g>
    <g>
      <line x1="500" y1="0" x2="500" y2="80" stroke="#b09558" stroke-width="0.8"/>
      <circle cx="500" cy="85" r="5" fill="#ffcf6b">
        <animate attributeName="opacity" values="0.7;1;0.8;1;0.7" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="500" cy="85" r="16" fill="#ffcf6b" opacity="0.25">
        <animate attributeName="r" values="14;20;14" dur="3s" repeatCount="indefinite"/>
      </circle>
    </g>
    <rect y="490" width="800" height="10" fill="#0e1a13"/>
  </svg>`;
}

export function sceneTaal(c) {
  return `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
    <defs><linearGradient id="tl-bg" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#4a7a88"/><stop offset="1" stop-color="${c}"/>
    </linearGradient></defs>
    <rect width="800" height="500" fill="url(#tl-bg)"/>
    <g stroke="#cce8eb" stroke-width="0.8" fill="none" opacity="0.55">
      <path d="M0 160 Q200 150 400 160 T800 160">
        <animate attributeName="d" values="M0 160 Q200 150 400 160 T800 160;M0 160 Q200 170 400 160 T800 160;M0 160 Q200 150 400 160 T800 160" dur="4s" repeatCount="indefinite"/>
      </path>
      <path d="M0 240 Q200 250 400 240 T800 240">
        <animate attributeName="d" values="M0 240 Q200 250 400 240 T800 240;M0 240 Q200 230 400 240 T800 240;M0 240 Q200 250 400 240 T800 240" dur="3.5s" repeatCount="indefinite"/>
      </path>
      <path d="M0 320 Q200 310 400 320 T800 320">
        <animate attributeName="d" values="M0 320 Q200 310 400 320 T800 320;M0 320 Q200 330 400 320 T800 320;M0 320 Q200 310 400 320 T800 320" dur="5s" repeatCount="indefinite"/>
      </path>
      <path d="M0 400 Q200 390 400 400 T800 400">
        <animate attributeName="d" values="M0 400 Q200 390 400 400 T800 400;M0 400 Q200 410 400 400 T800 400;M0 400 Q200 390 400 400 T800 400" dur="4.5s" repeatCount="indefinite"/>
      </path>
    </g>
    <circle cx="220" cy="220" r="0" fill="none" stroke="#cce8eb" stroke-width="1">
      <animate attributeName="r" from="0" to="90" dur="3.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" from="0.8" to="0" dur="3.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="560" cy="310" r="0" fill="none" stroke="#cce8eb" stroke-width="1">
      <animate attributeName="r" from="0" to="70" dur="4s" begin="1.2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" from="0.7" to="0" dur="4s" begin="1.2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="400" cy="380" r="0" fill="none" stroke="#cce8eb" stroke-width="1">
      <animate attributeName="r" from="0" to="65" dur="4.5s" begin="2.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" from="0.6" to="0" dur="4.5s" begin="2.4s" repeatCount="indefinite"/>
    </circle>
  </svg>`;
}

export function scenePranayam(c) {
  return `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
    <defs><radialGradient id="pr-bg" cx="0.5" cy="0.5">
      <stop offset="0" stop-color="#c49666"/><stop offset="1" stop-color="${c}"/>
    </radialGradient></defs>
    <rect width="800" height="500" fill="url(#pr-bg)"/>
    <g fill="none" stroke="#f4e2b8" stroke-width="1">
      <circle cx="400" cy="250" r="60" opacity="0.9">
        <animate attributeName="r" values="50;130;50" dur="7s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.85;0.25;0.85" dur="7s" repeatCount="indefinite"/>
      </circle>
      <circle cx="400" cy="250" r="100" opacity="0.6">
        <animate attributeName="r" values="90;170;90" dur="7s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.55;0.1;0.55" dur="7s" repeatCount="indefinite"/>
      </circle>
      <circle cx="400" cy="250" r="140" opacity="0.3">
        <animate attributeName="r" values="120;210;120" dur="7s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.25;0;0.25" dur="7s" repeatCount="indefinite"/>
      </circle>
    </g>
    <circle cx="400" cy="250" r="5" fill="#ffcf6b">
      <animate attributeName="r" values="4;7;4" dur="7s" repeatCount="indefinite"/>
    </circle>
  </svg>`;
}

export function sceneKrida(c) {
  return `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
    <defs><linearGradient id="kr-sky" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#8ab07e"/><stop offset="1" stop-color="${c}"/>
    </linearGradient></defs>
    <rect width="800" height="500" fill="url(#kr-sky)"/>
    <circle cx="660" cy="120" r="30" fill="#fde2b0" opacity="0.82"/>
    <ellipse cx="400" cy="350" rx="520" ry="80" fill="#1e3a26"/>
    <ellipse cx="400" cy="370" rx="420" ry="60" fill="#15301d"/>
    <g fill="none" stroke="#f1e8d3" stroke-width="0.8" opacity="0.55">
      <ellipse cx="400" cy="370" rx="360" ry="52"/>
      <ellipse cx="400" cy="370" rx="180" ry="28"/>
      <line x1="40" y1="370" x2="760" y2="370"/>
    </g>
    <g fill="#0f1a14">
      <circle cx="240" cy="320" r="5"><animateTransform attributeName="transform" type="translate"
        values="0 0; 560 0; 0 0" dur="10s" repeatCount="indefinite"/></circle>
    </g>
  </svg>`;
}

export function sceneVatika(c) {
  return `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
    <defs><linearGradient id="vt-sky" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#eadfb8"/><stop offset="1" stop-color="${c}"/>
    </linearGradient></defs>
    <rect width="800" height="500" fill="url(#vt-sky)"/>
    <circle cx="160" cy="100" r="34" fill="#fff5d8" opacity="0.85"/>
    <g transform-origin="400 430">
      <animateTransform attributeName="transform" type="rotate" values="-1.2;1.2;-1.2" dur="7s" repeatCount="indefinite"/>
      <rect x="396" y="320" width="10" height="120" fill="#5a3c1f"/>
      <circle cx="400" cy="290" r="90" fill="#2a3819"/>
      <circle cx="340" cy="270" r="58" fill="#3c4f28"/>
      <circle cx="470" cy="275" r="62" fill="#3c4f28"/>
    </g>
    <ellipse cx="400" cy="500" rx="600" ry="90" fill="#3c4f28"/>
    <g fill="#b09558" opacity="0.8">
      <ellipse cx="0" cy="0" rx="4" ry="2">
        <animateTransform attributeName="transform" type="translate" values="160 -20;220 520" dur="7s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="0" cy="0" rx="3" ry="1.5">
        <animateTransform attributeName="transform" type="translate" values="520 -20;580 520" dur="9s" begin="2s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="0" cy="0" rx="3" ry="1.5">
        <animateTransform attributeName="transform" type="translate" values="360 -20;400 520" dur="8s" begin="4s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="0" cy="0" rx="2.5" ry="1.2">
        <animateTransform attributeName="transform" type="translate" values="660 -20;720 520" dur="10s" begin="1s" repeatCount="indefinite"/>
      </ellipse>
    </g>
  </svg>`;
}

export function scenePlans(c) {
  return `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
    <rect width="800" height="500" fill="${c}"/>
    <g fill="none" stroke="#f1e8d3" stroke-width="0.9" opacity="0.7">
      <rect x="120" y="70" width="560" height="360" stroke-dasharray="6 4">
        <animate attributeName="stroke-dashoffset" values="0;20" dur="2s" repeatCount="indefinite"/>
      </rect>
      <line x1="120" y1="250" x2="420" y2="250"/>
      <line x1="420" y1="70" x2="420" y2="430"/>
      <line x1="420" y1="320" x2="680" y2="320"/>
      <line x1="270" y1="250" x2="270" y2="430"/>
      <line x1="550" y1="70" x2="550" y2="320"/>
      <path d="M420 140 a24 24 0 0 1 24 24" stroke-dasharray="3 3"/>
      <path d="M270 340 a24 24 0 0 1 24 24" stroke-dasharray="3 3"/>
    </g>
    <g fill="#f1e8d3" opacity="0.78" font-family="Cormorant Garamond" font-style="italic" font-size="13">
      <text x="160" y="170">living</text>
      <text x="500" y="170">kitchen</text>
      <text x="160" y="360">bed II</text>
      <text x="310" y="360">study</text>
      <text x="470" y="280">dining</text>
      <text x="470" y="390">master</text>
    </g>
    <g fill="#b09558" opacity="0.55">
      <circle cx="350" cy="250" r="3"/>
      <circle cx="420" cy="330" r="3"/>
      <circle cx="550" cy="250" r="3"/>
    </g>
  </svg>`;
}

/* ---------- Chapter preview thumbs (3 templates, universal) ---------- */

export function thumbWalk(color) {
  return `<svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
    <rect width="300" height="200" fill="${color}"/>
    <g fill="rgba(0,0,0,0.45)">
      <path d="M40 200 V110 Q40 70 90 70 Q140 70 140 110 V200 Z"/>
      <path d="M140 200 V90 Q140 50 190 50 Q240 50 240 90 V200 Z"/>
    </g>
    <g fill="rgba(0,0,0,0.7)">
      <path d="M70 200 V130 Q70 95 110 95 Q150 95 150 130 V200 Z"/>
      <path d="M160 200 V105 Q160 75 200 75 Q240 75 240 105 V200 Z"/>
    </g>
    <path fill="none" stroke="#f4e2b8" stroke-width="1.2" stroke-dasharray="180" d="M20 185 Q150 130 280 90">
      <animate attributeName="stroke-dashoffset" values="360;-180" dur="3.5s" repeatCount="indefinite"/>
    </path>
  </svg>`;
}

export function thumbStory(color) {
  return `<svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
    <rect width="300" height="200" fill="${color}"/>
    <g fill="none" stroke="#f4e2b8" stroke-width="0.8" opacity="0.8">
      <rect x="40" y="30" width="220" height="130" stroke-dasharray="6,4">
        <animate attributeName="stroke-dashoffset" values="0;20" dur="2s" repeatCount="indefinite"/>
      </rect>
      <line x1="40" y1="95" x2="260" y2="95"/>
      <line x1="150" y1="30" x2="150" y2="160"/>
      <circle cx="150" cy="95" r="30" fill="none"/>
      <circle cx="150" cy="95" r="3" fill="#f4e2b8"/>
    </g>
    <g fill="#f4e2b8" opacity="0.6" font-family="Cormorant Garamond" font-style="italic" font-size="10">
      <text x="50" y="22">elevation</text>
      <text x="50" y="185">scale 1:50</text>
    </g>
  </svg>`;
}

export function thumbLife(color) {
  return `<svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
    <rect width="300" height="200" fill="${color}"/>
    <rect x="0" y="140" width="300" height="60" fill="rgba(0,0,0,0.35)"/>
    <g fill="#0f1a14">
      <g>
        <animateTransform attributeName="transform" type="translate" values="-60 0;380 0" dur="9s" repeatCount="indefinite"/>
        <circle cx="40" cy="115" r="8"/>
        <rect x="35" y="123" width="10" height="28"/>
      </g>
      <g>
        <animateTransform attributeName="transform" type="translate" values="-120 0;360 0" dur="11s" begin="3s" repeatCount="indefinite"/>
        <circle cx="40" cy="118" r="7"/>
        <rect x="35" y="125" width="10" height="25"/>
      </g>
    </g>
    <circle cx="240" cy="48" r="20" fill="#f4e2b8" opacity="0.8"/>
  </svg>`;
}

/* ---------- Registries ---------- */
export const SCENES = {
  elevation: sceneElevation,
  arrival:   sceneArrival,
  aravalli:  sceneAravalli,
  garden:    sceneGarden,
  city:      sceneCity,
  raj:       sceneRaj,
  taal:      sceneTaal,
  pranayam:  scenePranayam,
  krida:     sceneKrida,
  vatika:    sceneVatika,
  plans:     scenePlans,
};

export const THUMBS = {
  walk:  thumbWalk,
  story: thumbStory,
  life:  thumbLife,
};
