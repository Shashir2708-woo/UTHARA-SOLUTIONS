/**
 * UTTHARA SOLUTIONS — Industrial Wooden Cutting Machine Digital Twin
 * UTTHARA SOLUTIONS | Ultra-Realistic Table Saw Factory Scene
 * Sensors: Temperature(Motor), Vibration(Motor Mount), Humidity(Blade),
 *           Voltage(Switch Panel), Motion(Cutting Zone)
 */

'use strict';

/* ═══════════════════════════════════════════════════════════════
   GLOBAL STATE
═══════════════════════════════════════════════════════════════ */
let activeTwinMode  = '3d';
let twinThreeState  = null;
let twin2dState     = null;
let _sensorObjects  = [];   // {mesh, key, worldPos}
let _tooltipTimer   = null;

/* ═══════════════════════════════════════════════════════════════
   SENSOR DEFINITIONS
═══════════════════════════════════════════════════════════════ */
const SENSORS = {
  temperature: {
    label: 'Temperature Sensor',
    subLabel: 'Motor Core Heat Monitor',
    unit: '°C', icon: '🌡️',
    color3d: 0xff3d00, colorHex: '#ff3d00',
    location: 'Drive Motor Body',
    value: 72, warn: 80, critical: 100, min: 20, max: 120,
    desc: 'Monitors motor winding temperature to prevent overheating'
  },
  vibration: {
    label: 'Vibration Sensor',
    subLabel: 'Motor Mount Accelerometer',
    unit: 'mm/s', icon: '📳',
    color3d: 0xff8f00, colorHex: '#ff8f00',
    location: 'Motor Mounting Plate',
    value: 3.8, warn: 6.0, critical: 10.0, min: 0, max: 15,
    desc: 'Detects bearing wear and mechanical imbalance via vibration'
  },
  humidity: {
    label: 'Humidity Sensor',
    subLabel: 'Blade Zone Moisture Detector',
    unit: '%RH', icon: '💧',
    color3d: 0x00b0ff, colorHex: '#00b0ff',
    location: 'Near Cutting Blade',
    value: 64, warn: 70, critical: 85, min: 10, max: 100,
    desc: 'Monitors wood moisture near blade to prevent blade rust & kickback'
  },
  voltage: {
    label: 'Voltage Sensor',
    subLabel: 'Supply Line Monitor',
    unit: 'V', icon: '⚡',
    color3d: 0xffd600, colorHex: '#ffd600',
    location: 'Main Power Switch',
    value: 230, warn: 245, critical: 255, min: 180, max: 260,
    desc: 'Monitors mains supply voltage at the control panel'
  },
  motion: {
    label: 'Motion Sensor',
    subLabel: 'Cutting Zone Presence Detector',
    unit: '', icon: '👁️',
    color3d: 0x00e676, colorHex: '#00e676',
    location: 'Cutting Area (Infrared)',
    value: 1, warn: null, critical: null, min: 0, max: 1,
    desc: 'Detects operator presence and confirms cutting cycle is active'
  }
};

/* ═══════════════════════════════════════════════════════════════
   SENSOR STATUS HELPERS
═══════════════════════════════════════════════════════════════ */
function sensorStatus(key) {
  const s = SENSORS[key];
  if (key === 'motion') return s.value >= 0.5 ? 'RUNNING' : 'IDLE';
  if (s.critical != null && s.value >= s.critical) return 'CRITICAL';
  if (s.warn     != null && s.value >= s.warn)     return 'WARNING';
  return 'NORMAL';
}

function statusColor(key) {
  const st = sensorStatus(key);
  return { CRITICAL:'#ef4444', WARNING:'#f59e0b', RUNNING:'#00e676', IDLE:'#94a3b8', NORMAL:'#00e676' }[st] || '#00e676';
}

function sensorDisplayVal(key) {
  const s = SENSORS[key];
  if (key === 'motion') return s.value >= 0.5 ? 'RUNNING' : 'IDLE';
  const dec = key === 'vibration' ? 1 : 0;
  return `${s.value.toFixed(dec)} ${s.unit}`;
}

/* ═══════════════════════════════════════════════════════════════
   LIVE SENSOR TELEMETRY TICK
═══════════════════════════════════════════════════════════════ */
function tickSensors(t) {
  SENSORS.temperature.value = 68 + Math.sin(t * 0.28) * 14 + Math.sin(t * 1.1) * 3;
  SENSORS.vibration.value   = 3.4 + Math.sin(t * 1.3) * 2.2 + Math.abs(Math.sin(t * 5)) * 0.5;
  SENSORS.humidity.value    = 60  + Math.sin(t * 0.17) * 10 + Math.sin(t * 2) * 2;
  SENSORS.voltage.value     = 229 + Math.sin(t * 0.55) * 4 + (Math.random() - 0.5) * 1.2;
  SENSORS.motion.value      = Math.sin(t * 1.8) > -0.25 ? 1 : 0;
}

/* ═══════════════════════════════════════════════════════════════
   PANEL REFRESH
═══════════════════════════════════════════════════════════════ */
function refreshSensorPanel() {
  Object.keys(SENSORS).forEach(key => {
    const valEl = document.getElementById(`sv-${key}`);
    const stEl  = document.getElementById(`ss-${key}`);
    const barEl = document.getElementById(`sb-${key}`);
    if (!valEl) return;
    valEl.textContent = sensorDisplayVal(key);
    valEl.style.color = statusColor(key);
    const st = sensorStatus(key);
    stEl.textContent = st;
    stEl.className = `s-status s-st-${st.toLowerCase()}`;
    if (barEl && key !== 'motion') {
      const s = SENSORS[key];
      const pct = Math.min(100, Math.max(0, ((s.value - s.min) / (s.max - s.min)) * 100));
      barEl.style.width = pct + '%';
      barEl.style.background = statusColor(key);
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   MODULE HTML SHELL
═══════════════════════════════════════════════════════════════ */
function renderDigitalTwinModule(container) {
  const org = window.Auth.getCurrentOrg();

  container.innerHTML = `
  <style>
    /* ── Reset & layout ── */
    .dt-root{display:flex;flex-direction:column;gap:12px;height:100%}
    .dt-topbar{display:flex;align-items:center;justify-content:space-between;
      background:#111827;border:1px solid #1f2d42;border-radius:12px;padding:12px 20px}
    .dt-title{font-size:16px;font-weight:800;color:#f0f6ff;display:flex;align-items:center;gap:8px;margin:0}
    .dt-sub{font-size:11px;color:#6b7a99;margin:3px 0 0}
    .dt-topbar-right{display:flex;gap:8px}
    .dt-btn{padding:7px 16px;border-radius:8px;border:none;cursor:pointer;font-size:12px;font-weight:700;transition:.15s}
    .dt-btn-on{background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff}
    .dt-btn-off{background:#1a2236;color:#6b7a99;border:1px solid #1f2d42}
    .dt-btn:hover{filter:brightness(1.2)}

    /* ── Body ── */
    .dt-body{display:flex;gap:12px;flex:1;min-height:0}

    /* ── 3D Viewport ── */
    .dt-vp{flex:1;position:relative;border-radius:14px;overflow:hidden;background:#090d14;border:1px solid #1f2d42}
    .dt-badge{position:absolute;top:12px;left:12px;z-index:20;
      background:rgba(9,13,20,.88);backdrop-filter:blur(10px);
      border:1px solid #1d4ed855;border-radius:8px;padding:6px 14px;
      color:#38bdf8;font-size:11px;font-weight:700;letter-spacing:.06em;
      display:flex;align-items:center;gap:6px;pointer-events:none}
    .pulse-dot{width:8px;height:8px;border-radius:50%;background:#38bdf8;animation:pd 1.3s ease-in-out infinite}
    @keyframes pd{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.7)}}

    .dt-cambar{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);z-index:20;
      display:flex;gap:6px;background:rgba(9,13,20,.85);backdrop-filter:blur(10px);
      border:1px solid #1f2d42;border-radius:10px;padding:6px 10px}
    .cam-btn{padding:5px 13px;border-radius:7px;border:1px solid #2d3d56;
      background:#111827;color:#6b7a99;font-size:11px;font-weight:700;cursor:pointer;transition:.15s}
    .cam-btn:hover,.cam-btn.cam-active{background:#2563eb;color:#fff;border-color:#2563eb}

    .dt-legend{position:absolute;top:12px;right:12px;z-index:20;
      background:rgba(9,13,20,.88);backdrop-filter:blur(10px);
      border:1px solid #1f2d4244;border-radius:10px;padding:10px 14px;pointer-events:none}
    .dt-leg-title{font-size:9px;font-weight:800;color:#4b5e7a;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}
    .leg-row{display:flex;align-items:center;gap:6px;font-size:10px;color:#6b7a99;margin:3px 0}
    .leg-dot{width:8px;height:8px;border-radius:50%}

    /* ── Sensor tooltip (3D hover) ── */
    #dt-tooltip{position:absolute;z-index:99;pointer-events:none;display:none;
      background:rgba(7,10,18,.96);border:1px solid #2563eb;border-radius:12px;
      padding:12px 16px;min-width:200px;backdrop-filter:blur(14px);
      box-shadow:0 8px 32px #0006}
    .tt-head{display:flex;align-items:center;gap:8px;margin-bottom:6px}
    .tt-icon{font-size:20px}
    .tt-name{font-size:13px;font-weight:800;color:#f0f6ff}
    .tt-sub{font-size:10px;color:#6b7a99;margin:1px 0 6px}
    .tt-val{font-size:22px;font-weight:900;font-family:monospace;color:#f0f6ff;margin:4px 0}
    .tt-loc{font-size:10px;color:#4b5e7a;text-transform:uppercase;letter-spacing:.06em}
    .tt-desc{font-size:10px;color:#6b7a99;margin-top:6px;line-height:1.5;border-top:1px solid #1f2d42;padding-top:6px}
    .tt-status{display:inline-block;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:800;margin-top:6px}
    .tt-st-normal,.tt-st-running{background:#052e16;color:#00e676}
    .tt-st-warning{background:#451a03;color:#f59e0b;animation:pd 1s infinite}
    .tt-st-critical{background:#450a0a;color:#ef4444;animation:pd .6s infinite}
    .tt-st-idle{background:#1e293b;color:#94a3b8}

    /* ── Sensor side panel ── */
    .dt-panel{width:240px;display:flex;flex-direction:column;gap:8px;overflow-y:auto}
    .dt-panel::-webkit-scrollbar{width:4px}
    .dt-panel::-webkit-scrollbar-thumb{background:#1f2d42;border-radius:4px}
    .s-card{background:#111827;border:1px solid #1f2d42;border-radius:12px;
      padding:12px 14px;cursor:default;transition:border-color .2s}
    .s-card:hover{border-color:#2563eb44}
    .s-card-top{display:flex;align-items:center;gap:8px;margin-bottom:8px}
    .s-icon{font-size:18px}
    .s-name{font-size:12px;font-weight:700;color:#c8d6ee;flex:1}
    .s-dot{width:8px;height:8px;border-radius:50%;background:#10b981;flex-shrink:0}
    .s-val{font-size:20px;font-weight:900;font-family:monospace;margin-bottom:2px}
    .s-loc{font-size:9px;color:#4b5e7a;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px}
    .s-bar-bg{height:4px;border-radius:4px;background:#1f2d42;overflow:hidden}
    .s-bar{height:4px;border-radius:4px;transition:width .4s,background .4s}
    .s-status{font-size:9px;font-weight:800;padding:2px 6px;border-radius:20px;margin-top:5px;display:inline-block}
    .s-st-normal,.s-st-running{background:#052e16;color:#00e676}
    .s-st-warning{background:#451a03;color:#f59e0b}
    .s-st-critical{background:#450a0a;color:#ef4444}
    .s-st-idle{background:#1e293b;color:#94a3b8}

    /* ── 2D canvas ── */
    #twin-viewport-2d{width:100%;height:100%}
    #twin-canvas-2d{display:block}
  </style>

  <div class="dt-root">

    <!-- Top Bar -->
    <div class="dt-topbar">
      <div>
        <h1 class="dt-title">🪚 Industrial Table Saw — WCM-PRO-01 Factory Digital Twin</h1>
        <p class="dt-sub">Live IoT Telemetry &nbsp;|&nbsp; <strong style="color:#38bdf8">${org.displayName}</strong> &nbsp;|&nbsp; 5 Active Sensors &nbsp;|&nbsp; Factory Floor A3</p>
      </div>
      <div class="dt-topbar-right">
        <button class="dt-btn ${activeTwinMode==='3d'?'dt-btn-on':'dt-btn-off'}" id="btn-twin-3d">⬛ 3D View</button>
        <button class="dt-btn ${activeTwinMode==='2d'?'dt-btn-on':'dt-btn-off'}" id="btn-twin-2d">🗺 2D Plan</button>
        <button class="dt-btn dt-btn-on" onclick="window.PassportModule&&window.PassportModule.openPassport('mac_cnc_01')">📋 Passport</button>
      </div>
    </div>

    <!-- Body -->
    <div class="dt-body">

      <!-- 3D/2D Viewport -->
      <div class="dt-vp">
        <div class="dt-badge"><span class="pulse-dot"></span> LIVE &nbsp;·&nbsp; WCM-PRO-01 &nbsp;·&nbsp; FACTORY FLOOR A3</div>
        <div class="dt-legend">
          <div class="dt-leg-title">Status Legend</div>
          <div class="leg-row"><span class="leg-dot" style="background:#00e676;box-shadow:0 0 5px #00e676"></span> NORMAL / RUNNING</div>
          <div class="leg-row"><span class="leg-dot" style="background:#f59e0b"></span> WARNING</div>
          <div class="leg-row"><span class="leg-dot" style="background:#ef4444"></span> CRITICAL / FAULT</div>
          <div class="leg-row"><span class="leg-dot" style="background:#94a3b8"></span> IDLE / OFF</div>
          <div style="border-top:1px solid #1f2d42;margin:6px 0;padding-top:6px">
            <div class="dt-leg-title">Sensors</div>
            <div class="leg-row">🌡️ Motor Body</div>
            <div class="leg-row">📳 Motor Mount</div>
            <div class="leg-row">💧 Blade Zone</div>
            <div class="leg-row">⚡ Switch Panel</div>
            <div class="leg-row">👁️ Cutting Area</div>
          </div>
        </div>
        <div id="dt-tooltip"></div>
        <div id="twin-viewport-3d" style="width:100%;height:100%;${activeTwinMode==='3d'?'display:block':'display:none'}"></div>
        <div id="twin-viewport-2d" style="width:100%;height:100%;${activeTwinMode==='2d'?'display:block':'display:none'}">
          <canvas id="twin-canvas-2d"></canvas>
        </div>
        <div class="dt-cambar" id="dt-cambar">
          <span style="font-size:9px;font-weight:800;color:#4b5e7a;align-self:center;letter-spacing:.06em">CAM</span>
          <button class="cam-btn cam-active" id="cam-iso">Isometric</button>
          <button class="cam-btn" id="cam-top">Top</button>
          <button class="cam-btn" id="cam-front">Front</button>
          <button class="cam-btn" id="cam-side">Side</button>
          <button class="cam-btn" id="cam-motor">Motor</button>
          <button class="cam-btn" id="cam-blade">Blade</button>
          <button class="cam-btn" id="cam-auto">⟳ Orbit</button>
        </div>
      </div>

      <!-- Sensor Panel -->
      <div class="dt-panel" id="dt-sensor-panel">
        ${Object.entries(SENSORS).map(([key, s]) => `
          <div class="s-card" id="sc-${key}">
            <div class="s-card-top">
              <span class="s-icon">${s.icon}</span>
              <span class="s-name">${s.label}</span>
              <span class="s-dot" id="sd-${key}"></span>
            </div>
            <div class="s-val" id="sv-${key}" style="color:${s.colorHex}">—</div>
            <div class="s-loc">📍 ${s.location}</div>
            <div class="s-bar-bg"><div class="s-bar" id="sb-${key}" style="width:0%"></div></div>
            <span class="s-status" id="ss-${key}">—</span>
          </div>
        `).join('')}
      </div>
    </div>
  </div>`;

  document.getElementById('btn-twin-3d').addEventListener('click', () => switchTwinMode('3d'));
  document.getElementById('btn-twin-2d').addEventListener('click', () => switchTwinMode('2d'));
  setTimeout(() => activeTwinMode === '3d' ? initWCM3D() : initWCM2D(), 80);
}

/* ═══════════════════════════════════════════════════════════════
   MODE SWITCH
═══════════════════════════════════════════════════════════════ */
function switchTwinMode(mode) {
  activeTwinMode = mode;
  if (twinThreeState?.animId) cancelAnimationFrame(twinThreeState.animId);
  if (twin2dState?.animId)    cancelAnimationFrame(twin2dState.animId);
  document.getElementById('twin-viewport-3d').style.display = mode==='3d'?'block':'none';
  document.getElementById('twin-viewport-2d').style.display = mode==='2d'?'block':'none';
  document.getElementById('btn-twin-3d').className = `dt-btn ${mode==='3d'?'dt-btn-on':'dt-btn-off'}`;
  document.getElementById('btn-twin-2d').className = `dt-btn ${mode==='2d'?'dt-btn-on':'dt-btn-off'}`;
  document.getElementById('dt-cambar').style.display = mode==='3d'?'flex':'none';
  mode==='3d' ? initWCM3D() : initWCM2D();
}

/* ╔══════════════════════════════════════════════════════════════
   ║   3-D   ULTRA-REALISTIC INDUSTRIAL TABLE SAW ENGINE
   ╚══════════════════════════════════════════════════════════════ */
function initWCM3D() {
  const mount = document.getElementById('twin-viewport-3d');
  if (!mount || typeof THREE === 'undefined') return;
  mount.innerHTML = '';
  _sensorObjects = [];

  const W = mount.clientWidth  || 900;
  const H = mount.clientHeight || 540;

  /* ── Scene ── */
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x07090f);
  scene.fog = new THREE.Fog(0x07090f, 28, 80);

  /* ── Camera ── */
  const camera = new THREE.PerspectiveCamera(40, W/H, 0.05, 300);
  camera.position.set(18, 12, 22);
  camera.lookAt(0, 2.5, 0);

  /* ── Renderer ── */
  const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled  = true;
  renderer.shadowMap.type     = THREE.PCFSoftShadowMap;
  renderer.toneMapping        = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure= 1.1;
  mount.appendChild(renderer.domElement);

  /* ── OrbitControls ── */
  let controls = null;
  if (THREE.OrbitControls) {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping  = true;
    controls.dampingFactor  = 0.07;
    controls.minDistance    = 3;
    controls.maxDistance    = 60;
    controls.maxPolarAngle  = Math.PI/2 - 0.01;
    controls.target.set(0, 2.5, 0);
  }

  /* ── Lighting ── */
  scene.add(new THREE.AmbientLight(0x90a4c0, 0.55));

  const sun = new THREE.DirectionalLight(0xfff5e0, 1.4);
  sun.position.set(12, 20, 10);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far  = 80;
  sun.shadow.camera.left = sun.shadow.camera.bottom = -20;
  sun.shadow.camera.right= sun.shadow.camera.top    =  20;
  scene.add(sun);

  const fillLight = new THREE.DirectionalLight(0x4488cc, 0.35);
  fillLight.position.set(-10, 8, -8);
  scene.add(fillLight);

  /* ── MATERIALS ── */
  const MAT = {
    castIron   : new THREE.MeshStandardMaterial({ color:0x2a2d33, metalness:.92, roughness:.35 }),
    castIronDk : new THREE.MeshStandardMaterial({ color:0x1c1e22, metalness:.9,  roughness:.4  }),
    castIronGy : new THREE.MeshStandardMaterial({ color:0x3a3f48, metalness:.85, roughness:.4  }),
    steel      : new THREE.MeshStandardMaterial({ color:0x8a9099, metalness:.95, roughness:.15 }),
    steelDk    : new THREE.MeshStandardMaterial({ color:0x5c6370, metalness:.9,  roughness:.25 }),
    chrome     : new THREE.MeshStandardMaterial({ color:0xd4d8dd, metalness:1.0, roughness:.05 }),
    blade      : new THREE.MeshStandardMaterial({ color:0xc8cdd4, metalness:1.0, roughness:.04 }),
    bladeEdge  : new THREE.MeshStandardMaterial({ color:0xffd54f, metalness:.9,  roughness:.1, emissive:0x332200, emissiveIntensity:.3 }),
    rubberBlk  : new THREE.MeshStandardMaterial({ color:0x111318, metalness:.05, roughness:.9  }),
    industrialGreen: new THREE.MeshStandardMaterial({ color:0x2d5016, metalness:.3, roughness:.6  }),
    industrialGreenLt: new THREE.MeshStandardMaterial({ color:0x3a6b1e, metalness:.25, roughness:.55 }),
    safety     : new THREE.MeshStandardMaterial({ color:0xffa000, metalness:.4,  roughness:.5  }),
    redBtn     : new THREE.MeshStandardMaterial({ color:0xcc2200, metalness:.5,  roughness:.4, emissive:0x440000, emissiveIntensity:.4 }),
    greenBtn   : new THREE.MeshStandardMaterial({ color:0x00aa44, metalness:.5,  roughness:.4, emissive:0x003311, emissiveIntensity:.5 }),
    panelBlk   : new THREE.MeshStandardMaterial({ color:0x12161d, metalness:.5,  roughness:.6  }),
    wood       : new THREE.MeshStandardMaterial({ color:0x9c5f2e, metalness:.02, roughness:.9  }),
    woodDk     : new THREE.MeshStandardMaterial({ color:0x6b3a14, metalness:.02, roughness:.95 }),
    acrylic    : new THREE.MeshStandardMaterial({ color:0x80d8ff, transparent:true, opacity:.35, roughness:.05, metalness:.1 }),
    dust       : new THREE.PointsMaterial({ color:0xd4a060, size:.04, transparent:true, opacity:.75, sizeAttenuation:true }),
    beaconGrn  : new THREE.MeshStandardMaterial({ color:0x00c853, emissive:0x00c853, emissiveIntensity:1.2, roughness:.3 }),
    beaconAmb  : new THREE.MeshStandardMaterial({ color:0xff8f00, emissive:0xff8f00, emissiveIntensity:1.0, roughness:.3 }),
    ledGrn     : new THREE.MeshStandardMaterial({ color:0x00e676, emissive:0x00e676, emissiveIntensity:2.0, roughness:.2 }),
    conduit    : new THREE.MeshStandardMaterial({ color:0x4a5060, metalness:.7, roughness:.5 }),
  };

  /* ─────────────────────────────────────────────────────────────
     FACTORY ENVIRONMENT
  ───────────────────────────────────────────────────────────── */

  /* Concrete floor */
  const floorGeo = new THREE.PlaneGeometry(60, 60, 30, 30);
  const floorMat = new THREE.MeshStandardMaterial({ color:0x1a1d23, roughness:.95, metalness:.05 });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI/2; floor.receiveShadow = true;
  scene.add(floor);

  /* Floor grid lines */
  const grid = new THREE.GridHelper(60, 40, 0x1e2a3a, 0x161d28);
  grid.position.y = .01; scene.add(grid);

  /* Factory walls */
  function addWall(w,h,d,x,y,z,col=0x13161c) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w,h,d),
      new THREE.MeshStandardMaterial({color:col,roughness:.9}));
    m.position.set(x,y,z); m.receiveShadow=true; scene.add(m);
  }
  addWall(60,.5,.5, 0,10.25,-18,0x111420); // back wall beam
  addWall(60,10,.4, 0,5,-18.2, 0x111420);  // back wall
  addWall(.4,10,60,-18.2,5,0,  0x111420);  // left wall
  addWall(.4,10,60, 18.2,5,0,  0x111420);  // right wall (open roof above)

  /* Ceiling structural beams */
  for (let bz=-14; bz<=14; bz+=7) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(36.8,.45,.35),
      new THREE.MeshStandardMaterial({color:0x1a2030,metalness:.6}));
    b.position.set(0,10,bz); scene.add(b);
  }
  /* Cross beams */
  for (let bx=-14; bx<=14; bx+=7) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(.35,.45,36.8),
      new THREE.MeshStandardMaterial({color:0x1a2030,metalness:.55}));
    b.position.set(bx,10,0); scene.add(b);
  }

  /* Ceiling industrial lights (fluorescent) */
  const lightFixtures = [];
  [[-7,7],[-7,-7],[7,7],[7,-7],[0,0]].forEach(([lx,lz])=>{
    const housing = new THREE.Mesh(new THREE.BoxGeometry(2.2,.12,.45),
      new THREE.MeshStandardMaterial({color:0x22293a,metalness:.5}));
    housing.position.set(lx,9.9,lz); scene.add(housing);
    const tube = new THREE.Mesh(new THREE.BoxGeometry(1.9,.05,.35),
      new THREE.MeshStandardMaterial({color:0xeef8ff,emissive:0xeef8ff,emissiveIntensity:.95}));
    tube.position.set(lx,9.84,lz); scene.add(tube);
    const pl = new THREE.PointLight(0xeef8ff,.8,18);
    pl.position.set(lx,9.8,lz); scene.add(pl);
    lightFixtures.push({tube, pl});
  });

  /* Safety yellow floor lines */
  function floorLine(x1,z1,x2,z2,thick=.08) {
    const dx=x2-x1, dz=z2-z1, len=Math.sqrt(dx*dx+dz*dz);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(len,thick),
      new THREE.MeshStandardMaterial({color:0xffd600,roughness:.8}));
    m.rotation.x=-Math.PI/2; m.position.set((x1+x2)/2,.02,(z1+z2)/2);
    m.rotation.z=-Math.atan2(dz,dx); scene.add(m);
  }
  floorLine(-11,-11,-11,11); floorLine(-11,11,11,11);
  floorLine(11,11,11,-11);   floorLine(11,-11,-11,-11);

  /* Columns */
  [[-17,17],[-17,-17],[17,17],[17,-17]].forEach(([cx,cz])=>{
    const col = new THREE.Mesh(new THREE.BoxGeometry(.6,10,.6),
      new THREE.MeshStandardMaterial({color:0x1a2030,metalness:.5}));
    col.position.set(cx,5,cz); scene.add(col);
    /* safety stripe */
    for (let si=0;si<5;si++){
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(.65,.18,.65),
        new THREE.MeshStandardMaterial({color:si%2===0?0xffd600:0x111827}));
      stripe.position.set(cx,.6+si*1.0,cz); scene.add(stripe);
    }
  });

  /* Wood plank stock against back-left wall */
  for (let pi=0;pi<6;pi++){
    const pk = new THREE.Mesh(new THREE.BoxGeometry(.05,.4,4.5), MAT.wood);
    pk.position.set(-17+pi*.07,1.2,-14); pk.castShadow=true; scene.add(pk);
  }
  const stockLabel = new THREE.Mesh(new THREE.BoxGeometry(1.8,.7,.05),MAT.panelBlk);
  stockLabel.position.set(-16.5,2,-16.8); scene.add(stockLabel);

  /* Electrical wall panel */
  const elPanel = new THREE.Mesh(new THREE.BoxGeometry(2.8,4,.2),
    new THREE.MeshStandardMaterial({color:0x0f1520,metalness:.5}));
  elPanel.position.set(-17.5,4.5,6); scene.add(elPanel);
  const elFrame = new THREE.Mesh(new THREE.BoxGeometry(3,.06,4.06),
    new THREE.MeshStandardMaterial({color:0x1e3a5f,metalness:.6}));
  elFrame.position.set(-17.5,4.5,6); elFrame.rotation.y=Math.PI/2; scene.add(elFrame);
  /* Breakers */
  for (let bi=0;bi<8;bi++){
    const br = new THREE.Mesh(new THREE.BoxGeometry(.3,.5,.08),
      new THREE.MeshStandardMaterial({color:bi<6?0x1a3a5c:0x3a1a1a,metalness:.4}));
    br.position.set(-17.4,-1.2+bi*.55,6); scene.add(br);
    const led = new THREE.Mesh(new THREE.SphereGeometry(.05,6,4),
      new THREE.MeshStandardMaterial({color:bi<6?0x00e676:0xef4444,emissive:bi<6?0x00e676:0xef4444,emissiveIntensity:1.5}));
    led.position.set(-17.38,-1.0+bi*.55,6); scene.add(led);
  }

  /* ─────────────────────────────────────────────────────────────
     INPUT CONVEYOR (wood logs feed)
  ───────────────────────────────────────────────────────────── */
  const conveyorGroup = new THREE.Group();
  /* Conveyor side rails */
  [-1.1,1.1].forEach(zOff=>{
    const rail = new THREE.Mesh(new THREE.BoxGeometry(12,.18,.14),MAT.castIronDk);
    rail.position.set(-12,3.5,zOff); scene.add(rail);
    const railWeb = new THREE.Mesh(new THREE.BoxGeometry(12,.7,.07),MAT.castIronGy);
    railWeb.position.set(-12,3.2,zOff); scene.add(railWeb);
  });
  /* Rollers */
  for (let rx=-17; rx<=-6; rx+=1.4){
    const roller = new THREE.Mesh(new THREE.CylinderGeometry(.15,.15,2.2,14),MAT.steelDk);
    roller.rotation.z=Math.PI/2; roller.position.set(rx,3.5,0);
    roller.castShadow=true; scene.add(roller);
    /* roller end caps */
    [-1.1,1.1].forEach(zc=>{
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,.08,14),MAT.castIronGy);
      cap.rotation.z=Math.PI/2; cap.position.set(rx,3.5,zc); scene.add(cap);
    });
  }
  /* Conveyor support legs */
  [[-14,0],[-10,0],[-7,0]].forEach(([lx,lz])=>{
    const leg = new THREE.Mesh(new THREE.BoxGeometry(.12,3.5,.12),MAT.castIronDk);
    leg.position.set(lx,1.75,lz); scene.add(leg);
  });
  const conveyorLabel = new THREE.Mesh(new THREE.PlaneGeometry(3,.3),
    new THREE.MeshStandardMaterial({color:0xffd600,roughness:.8}));
  conveyorLabel.rotation.x=-Math.PI/2; conveyorLabel.position.set(-12,3.7,-1.3); scene.add(conveyorLabel);

  /* OUTPUT CONVEYOR */
  [-1.1,1.1].forEach(zOff=>{
    const rail = new THREE.Mesh(new THREE.BoxGeometry(12,.18,.14),MAT.castIronDk);
    rail.position.set(12,3.5,zOff); scene.add(rail);
  });
  for (let rx=7; rx<=17; rx+=1.4){
    const roller = new THREE.Mesh(new THREE.CylinderGeometry(.15,.15,2.2,14),MAT.steelDk);
    roller.rotation.z=Math.PI/2; roller.position.set(rx,3.5,0); scene.add(roller);
  }
  [[ 9,0],[13,0],[16,0]].forEach(([lx,lz])=>{
    const leg = new THREE.Mesh(new THREE.BoxGeometry(.12,3.5,.12),MAT.castIronDk);
    leg.position.set(lx,1.75,lz); scene.add(leg);
  });

  /* ─────────────────────────────────────────────────────────────
     ANIMATED WOOD PLANKS
  ───────────────────────────────────────────────────────────── */
  const PLANK_COUNT = 4;
  const planks = [];
  for (let pi=0; pi<PLANK_COUNT; pi++){
    const plkGrp = new THREE.Group();
    /* Plank body */
    const plkBody = new THREE.Mesh(new THREE.BoxGeometry(6,.12,.9), MAT.wood);
    plkBody.castShadow = true;
    /* Wood grain lines */
    for (let gi=0;gi<6;gi++){
      const grain = new THREE.Mesh(new THREE.BoxGeometry(6,.005,.004),
        new THREE.MeshStandardMaterial({color:0x7a4520,roughness:.98}));
      grain.position.set(0,.062,.15-gi*.05); plkBody.add(grain);
    }
    plkGrp.add(plkBody);
    /* End grain (cut face) */
    const endGrain = new THREE.Mesh(new THREE.PlaneGeometry(.12,.9),
      new THREE.MeshStandardMaterial({color:0xc8843a,roughness:.95}));
    endGrain.position.set(3.01,0,0); endGrain.rotation.y=Math.PI/2; plkGrp.add(endGrain);

    plkGrp.position.set(-18+pi*5, 3.58, 0);
    plkGrp.userData = { startX: -18+pi*5, speed: 0.6+pi*.08 };
    scene.add(plkGrp);
    planks.push(plkGrp);
  }

  /* Cut plank halves (after blade) */
  const cutPlanks = [];
  for (let ci=0; ci<3; ci++){
    const cpGrp = new THREE.Group();
    const half = new THREE.Mesh(new THREE.BoxGeometry(3.5,.12,.43), MAT.woodDk);
    half.castShadow=true; cpGrp.add(half);
    cpGrp.position.set(8+ci*4, 3.58, ci%2===0 ? .24 : -.24);
    cpGrp.userData = { startX:8+ci*4, speed:0.5+ci*.05, lane: ci%2===0 ? .24 : -.24 };
    scene.add(cpGrp);
    cutPlanks.push(cpGrp);
  }

  /* Sawdust particles */
  const dustCount = 300;
  const dustBuf   = new Float32Array(dustCount*3);
  const dustVel   = [];
  for (let d=0;d<dustCount;d++){
    dustBuf[d*3]   = (Math.random()-.5)*.3;
    dustBuf[d*3+1] = 3.8 + Math.random()*.6;
    dustBuf[d*3+2] = (Math.random()-.5)*.2;
    dustVel.push({vx:(Math.random()-.5)*.06,vy:.01+Math.random()*.04,vz:(Math.random()-.5)*.06,life:Math.random()});
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position',new THREE.BufferAttribute(dustBuf,3));
  const dustMesh = new THREE.Points(dustGeo, MAT.dust);
  scene.add(dustMesh);

  /* ─────────────────────────────────────────────────────────────
     MAIN MACHINE BODY — INDUSTRIAL TABLE SAW
  ───────────────────────────────────────────────────────────── */
  const M = new THREE.Group(); // machine root

  /* === CABINET / BASE UNIT === */
  /* Main cast-iron base cabinet */
  const cabinetBody = new THREE.Mesh(new THREE.BoxGeometry(3.6,3.6,2.8), MAT.castIron);
  cabinetBody.position.set(-1.8,1.8,0); cabinetBody.castShadow=true; M.add(cabinetBody);

  /* Cabinet ribs (structural detail) */
  for (let ri=0;ri<4;ri++){
    const rib = new THREE.Mesh(new THREE.BoxGeometry(.06,3.5,2.82),MAT.castIronGy);
    rib.position.set(-3.4+ri*1.1,1.8,0); M.add(rib);
  }
  for (let ri=0;ri<3;ri++){
    const rib = new THREE.Mesh(new THREE.BoxGeometry(3.62,.06,2.82),MAT.castIronGy);
    rib.position.set(-1.8,.8+ri*1.2,0); M.add(rib);
  }

  /* Ventilation slots (left side) */
  for (let vi=0;vi<6;vi++){
    const slot = new THREE.Mesh(new THREE.BoxGeometry(.06,.12,1.8),
      new THREE.MeshStandardMaterial({color:0x0a0c10,roughness:.95}));
    slot.position.set(-3.62,1.0+vi*.3,0); M.add(slot);
  }

  /* Cabinet feet (rubber leveling pads) */
  [[-1.1,-1.0],[-1.1,1.0],[-2.5,-1.0],[-2.5,1.0]].forEach(([fx,fz])=>{
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(.18,.22,.18,10),MAT.rubberBlk);
    foot.position.set(fx,0,fz); M.add(foot);
    const bolt = new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,.3,8),MAT.chrome);
    bolt.position.set(fx,.15,fz); M.add(bolt);
  });

  /* === EXTENSION TABLE (right side) === */
  const extTable = new THREE.Mesh(new THREE.BoxGeometry(5.5,.15,2.8),MAT.castIronGy);
  extTable.position.set(3.75,3.58,0); extTable.castShadow=true; extTable.receiveShadow=true; M.add(extTable);
  /* Extension table ribs underneath */
  for (let ri=0;ri<4;ri++){
    const rib=new THREE.Mesh(new THREE.BoxGeometry(.06,.6,2.82),MAT.castIronDk);
    rib.position.set(1.5+ri*1.2,3.28,0); M.add(rib);
  }
  /* Extension table legs */
  [[1.8,-1.1],[1.8,1.1],[5.0,-1.1],[5.0,1.1]].forEach(([ex,ez])=>{
    const leg=new THREE.Mesh(new THREE.BoxGeometry(.12,3.5,.12),MAT.castIronDk);
    leg.position.set(ex,1.75,ez); M.add(leg);
    const foot=new THREE.Mesh(new THREE.CylinderGeometry(.16,.2,.16,10),MAT.rubberBlk);
    foot.position.set(ex,0,ez); M.add(foot);
  });

  /* === MAIN CAST-IRON TABLE TOP === */
  const tableTop = new THREE.Mesh(new THREE.BoxGeometry(3.8,.22,2.8),MAT.castIron);
  tableTop.position.set(-1.8,3.71,0); tableTop.castShadow=true; tableTop.receiveShadow=true; M.add(tableTop);

  /* Table miter slots (precision grooves) */
  [-0.6,0.6].forEach(zSlot=>{
    const slot = new THREE.Mesh(new THREE.BoxGeometry(3.8,.04,.12),
      new THREE.MeshStandardMaterial({color:0x0d0f13,roughness:.8}));
    slot.position.set(-1.8,3.83,zSlot); M.add(slot);
  });

  /* Table throat plate */
  const throat = new THREE.Mesh(new THREE.BoxGeometry(.6,.22,.8),
    new THREE.MeshStandardMaterial({color:0x44484e,metalness:.7,roughness:.3}));
  throat.position.set(-1.8,3.71,0); M.add(throat);

  /* === TRUNNION / TILT MECHANISM === */
  const trunnion = new THREE.Mesh(new THREE.CylinderGeometry(.55,.6,.18,24),MAT.castIronGy);
  trunnion.position.set(-1.8,3.6,0); M.add(trunnion);
  const trunnionArm = new THREE.Mesh(new THREE.BoxGeometry(.1,1.6,.35),MAT.castIronDk);
  trunnionArm.position.set(-1.8,2.8,0); M.add(trunnionArm);

  /* === ARBOR / BLADE SPINDLE === */
  const arbor = new THREE.Mesh(new THREE.CylinderGeometry(.055,.055,2.4,12),MAT.chrome);
  arbor.rotation.z=Math.PI/2; arbor.position.set(-1.8,3.78,0); M.add(arbor);
  /* Arbor flanges */
  [-0.1,0.1].forEach(xo=>{
    const fl=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.06,20),MAT.steelDk);
    fl.rotation.z=Math.PI/2; fl.position.set(-1.8+xo,3.78,0); M.add(fl);
  });

  /* === CIRCULAR SAW BLADE (detailed) === */
  const bladeGroup = new THREE.Group();
  bladeGroup.position.set(-1.8, 3.78, 0);
  bladeGroup.rotation.z = Math.PI/2;

  /* Main disc */
  const bladeDisc = new THREE.Mesh(new THREE.CylinderGeometry(1.35,1.35,.025,60),MAT.blade);
  bladeGroup.add(bladeDisc);

  /* Blade gullets & teeth (24 teeth) */
  const TOOTH_COUNT = 24;
  for (let ti=0;ti<TOOTH_COUNT;ti++){
    const ang = (ti/TOOTH_COUNT)*Math.PI*2;
    /* Tooth body */
    const tooth = new THREE.Mesh(new THREE.BoxGeometry(.14,.22,.04),MAT.bladeEdge);
    tooth.position.set(Math.cos(ang)*1.38,0,Math.sin(ang)*1.38);
    tooth.rotation.y = ang;
    bladeGroup.add(tooth);
    /* Carbide tip (tiny bright rectangle) */
    const tip = new THREE.Mesh(new THREE.BoxGeometry(.06,.08,.045),
      new THREE.MeshStandardMaterial({color:0xffe082,metalness:.8,roughness:.1,emissive:0x221100,emissiveIntensity:.2}));
    tip.position.set(Math.cos(ang)*1.45,0,Math.sin(ang)*1.45);
    tip.rotation.y=ang; bladeGroup.add(tip);
  }

  /* Blade center plate (laser-cut design) */
  const centerPlate = new THREE.Mesh(new THREE.CylinderGeometry(.4,.4,.03,24),MAT.steelDk);
  bladeGroup.add(centerPlate);
  /* Spoke holes */
  for (let sh=0;sh<6;sh++){
    const ang = sh/6*Math.PI*2;
    const spoke = new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.04,8),
      new THREE.MeshStandardMaterial({color:0x070910}));
    spoke.position.set(Math.cos(ang)*.75,0,Math.sin(ang)*.75); bladeGroup.add(spoke);
  }
  /* Arbor hole */
  const arborHole = new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.04,12),
    new THREE.MeshStandardMaterial({color:0x070910}));
  bladeGroup.add(arborHole);

  M.add(bladeGroup);

  /* === BLADE GUARD (splitter + guard) === */
  const guardGrp = new THREE.Group();
  guardGrp.position.set(-1.8,3.78,0);

  /* Main guard shell (acrylic) */
  const guardShell = new THREE.Mesh(
    new THREE.CylinderGeometry(1.42,.3,1.6,32,1,true,Math.PI,Math.PI),
    new THREE.MeshStandardMaterial({color:0xa0d8ef,transparent:true,opacity:.25,roughness:.05,metalness:.1,side:THREE.DoubleSide})
  );
  guardShell.rotation.z=Math.PI/2; guardGrp.add(guardShell);

  /* Guard metal frame sides */
  [-0.55,0.55].forEach(zf=>{
    const frame = new THREE.Mesh(new THREE.TorusGeometry(1.4,.03,8,32,Math.PI),
      new THREE.MeshStandardMaterial({color:0x8a9099,metalness:.9,roughness:.2}));
    frame.rotation.z=Math.PI/2; frame.position.z=zf; guardGrp.add(frame);
  });

  /* Splitter (riving knife) */
  const splitter = new THREE.Mesh(new THREE.BoxGeometry(.025,1.2,.8),
    new THREE.MeshStandardMaterial({color:0x8a9099,metalness:.95,roughness:.15}));
  splitter.position.set(.85,0,0); guardGrp.add(splitter);

  /* Anti-kickback pawls */
  [-0.15,0.15].forEach(zp=>{
    const pawl = new THREE.Mesh(new THREE.BoxGeometry(.04,.35,.1),MAT.castIronGy);
    pawl.position.set(.9,-.4,zp); pawl.rotation.z=-.3; guardGrp.add(pawl);
  });

  M.add(guardGrp);

  /* === RIP FENCE (precision fence) === */
  const fenceGrp = new THREE.Group();
  fenceGrp.position.set(0,0,-1.1);

  /* Fence body (extruded profile) */
  const fenceBody = new THREE.Mesh(new THREE.BoxGeometry(9.2,.6,.08),MAT.castIronGy);
  fenceBody.position.set(1.5,3.98,0); fenceGrp.add(fenceBody);

  /* Fence face (smooth precision surface) */
  const fenceFace = new THREE.Mesh(new THREE.BoxGeometry(9.2,1.1,.05),MAT.chrome);
  fenceFace.position.set(1.5,4.2,-.045); fenceGrp.add(fenceFace);

  /* Fence clamping head */
  const fenceHead = new THREE.Mesh(new THREE.BoxGeometry(.5,.8,.55),MAT.castIronDk);
  fenceHead.position.set(-3.5,3.98,0); fenceGrp.add(fenceHead);
  const lockKnob = new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.35,10),MAT.rubberBlk);
  lockKnob.position.set(-3.5,4.45,.15); fenceGrp.add(lockKnob);

  M.add(fenceGrp);

  /* === TABLE SCALE (ruler markings) === */
  for (let ri=-8;ri<=8;ri++){
    const mark = new THREE.Mesh(
      new THREE.BoxGeometry(.01,.01,ri%4===0?.35:.2),
      new THREE.MeshStandardMaterial({color:0x6b7280,roughness:.8}));
    mark.position.set(-1.8+ri*.25*1.5,3.83,.7); M.add(mark);
  }

  /* === DUST PORT / COLLECTION === */
  const dustPort = new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,1.2,12),MAT.conduit);
  dustPort.rotation.x=Math.PI/3; dustPort.position.set(-1.8,2.0,1.55); M.add(dustPort);
  const dustHose = new THREE.Mesh(new THREE.TorusGeometry(.5,.18,8,20,Math.PI*.7),
    new THREE.MeshStandardMaterial({color:0x8b5e3c,roughness:.9}));
  dustHose.position.set(-1.8,1.3,2.1); dustHose.rotation.x=.8; M.add(dustHose);

  /* === ELECTRIC MOTOR === */
  const motorGrp = new THREE.Group();
  motorGrp.position.set(-2.1,1.7,-1.0);

  /* Motor main body (TEFC frame) */
  const motorBody = new THREE.Mesh(new THREE.CylinderGeometry(.55,.55,1.8,20),MAT.castIron);
  motorBody.rotation.z=Math.PI/2; motorBody.castShadow=true; motorGrp.add(motorBody);

  /* Motor cooling fins (18 fins) */
  for (let fi=0;fi<18;fi++){
    const ang = (fi/18)*Math.PI*2;
    const fin = new THREE.Mesh(new THREE.BoxGeometry(1.8,.04,.35),
      new THREE.MeshStandardMaterial({color:0x2e3340,metalness:.85,roughness:.35}));
    fin.position.set(0,Math.cos(ang)*.57,Math.sin(ang)*.57);
    fin.rotation.x=ang; motorGrp.add(fin);
  }

  /* Motor end-cap fan cover */
  const fanCover = new THREE.Mesh(new THREE.CylinderGeometry(.58,.58,.12,24),MAT.castIronGy);
  fanCover.rotation.z=Math.PI/2; fanCover.position.x=-.95; motorGrp.add(fanCover);
  /* Fan grille */
  for (let fg=0;fg<8;fg++){
    const fgAng=(fg/8)*Math.PI*2;
    const bar=new THREE.Mesh(new THREE.BoxGeometry(.01,.04,.5),MAT.castIronDk);
    bar.rotation.x=fgAng; bar.position.set(-.96,Math.cos(fgAng)*.2,Math.sin(fgAng)*.2);
    motorGrp.add(bar);
  }

  /* Motor front flange */
  const motorFlange = new THREE.Mesh(new THREE.CylinderGeometry(.62,.62,.14,24),MAT.castIronGy);
  motorFlange.rotation.z=Math.PI/2; motorFlange.position.x=.95; motorGrp.add(motorFlange);

  /* Motor output shaft */
  const motorShaft = new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.35,10),MAT.chrome);
  motorShaft.rotation.z=Math.PI/2; motorShaft.position.x=1.22; motorGrp.add(motorShaft);

  /* Motor nameplate */
  const nameplate = new THREE.Mesh(new THREE.BoxGeometry(.55,.35,.02),
    new THREE.MeshStandardMaterial({color:0x1a2a4a,metalness:.5}));
  nameplate.position.set(.1,.57,0); motorGrp.add(nameplate);

  /* Drive V-belt */
  const vbelt = new THREE.Mesh(new THREE.TorusGeometry(.38,.055,8,30),
    new THREE.MeshStandardMaterial({color:0x111318,roughness:.9}));
  vbelt.rotation.x=Math.PI/2; vbelt.position.set(1.0,0,0); motorGrp.add(vbelt);

  /* Motor mounting bracket */
  const bracket = new THREE.Mesh(new THREE.BoxGeometry(2.1,.18,.8),MAT.castIronDk);
  bracket.position.set(0,-.7,0); motorGrp.add(bracket);
  const bracketLeg1 = new THREE.Mesh(new THREE.BoxGeometry(.15,.8,.12),MAT.castIronDk);
  bracketLeg1.position.set(.7,-.3,0); motorGrp.add(bracketLeg1);
  const bracketLeg2 = bracketLeg1.clone(); bracketLeg2.position.x=-.7; motorGrp.add(bracketLeg2);

  M.add(motorGrp);

  /* === POWER SWITCH CONTROL PANEL === */
  const panelGrp = new THREE.Group();
  panelGrp.position.set(-1.8,2.9,1.42);

  /* Panel housing */
  const panelBox = new THREE.Mesh(new THREE.BoxGeometry(.95,1.0,.12),MAT.panelBlk);
  panelGrp.add(panelBox);
  /* Panel face plate */
  const panelFace = new THREE.Mesh(new THREE.BoxGeometry(.9,.95,.04),
    new THREE.MeshStandardMaterial({color:0x1a2030,roughness:.6}));
  panelFace.position.z=.08; panelGrp.add(panelFace);
  /* Panel bezel */
  const panelBezel = new THREE.Mesh(new THREE.BoxGeometry(1.0,1.05,.02),
    new THREE.MeshStandardMaterial({color:0x2d3340,metalness:.6}));
  panelBezel.position.z=-.07; panelGrp.add(panelBezel);

  /* START button (big green mushroom) */
  const startRim = new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.06,20),
    new THREE.MeshStandardMaterial({color:0x1a2030,metalness:.5}));
  startRim.rotation.x=Math.PI/2; startRim.position.set(-.18,.2,.1); panelGrp.add(startRim);
  const startBtn = new THREE.Mesh(new THREE.SphereGeometry(.1,16,10),MAT.greenBtn);
  startBtn.position.set(-.18,.2,.14); panelGrp.add(startBtn);

  /* STOP button (big red mushroom) */
  const stopRim = new THREE.Mesh(new THREE.CylinderGeometry(.15,.15,.06,20),
    new THREE.MeshStandardMaterial({color:0x1a2030,metalness:.5}));
  stopRim.rotation.x=Math.PI/2; stopRim.position.set(.18,.2,.1); panelGrp.add(stopRim);
  const stopBtn = new THREE.Mesh(new THREE.SphereGeometry(.13,16,10),MAT.redBtn);
  stopBtn.position.set(.18,.2,.14); panelGrp.add(stopBtn);

  /* Button labels */
  [-1,1].forEach((side,i)=>{
    const lbl=new THREE.Mesh(new THREE.PlaneGeometry(.18,.07),
      new THREE.MeshStandardMaterial({color:i===0?0x003311:0x330011,roughness:.8}));
    lbl.position.set(side*.18,.03,.15); panelGrp.add(lbl);
  });

  /* Speed dial */
  const dialBody = new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,.05,20),MAT.panelBlk);
  dialBody.rotation.x=Math.PI/2; dialBody.position.set(0,-.2,.1); panelGrp.add(dialBody);
  const dialKnob = new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,.08,20),MAT.rubberBlk);
  dialKnob.rotation.x=Math.PI/2; dialKnob.position.set(0,-.2,.15); panelGrp.add(dialKnob);
  const dialMark = new THREE.Mesh(new THREE.BoxGeometry(.02,.06,.02),
    new THREE.MeshStandardMaterial({color:0xf0f4ff}));
  dialMark.position.set(0,-.12,.17); panelGrp.add(dialMark);

  /* Volt/Amp meters */
  for (let mi=0;mi<2;mi++){
    const meter = new THREE.Mesh(new THREE.BoxGeometry(.3,.2,.04),
      new THREE.MeshStandardMaterial({color:0x0a0e16,roughness:.8}));
    meter.position.set(mi===0?-.25:.05,-.15,.1); panelGrp.add(meter);
    const mDisplay = new THREE.Mesh(new THREE.PlaneGeometry(.25,.15),
      new THREE.MeshStandardMaterial({color:mi===0?0x003322:0x001133,
        emissive:mi===0?0x00aa44:0x0044aa,emissiveIntensity:.6}));
    mDisplay.position.set(mi===0?-.25:.05,-.15,.13); panelGrp.add(mDisplay);
  }

  /* Status indicator LEDs */
  const ledColors=[0x00e676,0xf59e0b,0xef4444];
  ledColors.forEach((col,li)=>{
    const led=new THREE.Mesh(new THREE.SphereGeometry(.04,8,6),
      new THREE.MeshStandardMaterial({color:col,emissive:col,emissiveIntensity:li===0?1.5:.3,roughness:.2}));
    led.position.set(-.32-.0+li*.0,-.32+li*.1,.14); panelGrp.add(led);
  });

  M.add(panelGrp);

  /* === HANDWHEEL (blade height adjustment) === */
  const hwGrp = new THREE.Group();
  hwGrp.position.set(-3.85,1.8,0);
  const hwRim = new THREE.Mesh(new THREE.TorusGeometry(.32,.04,12,30),MAT.castIronGy);
  hwGrp.add(hwRim);
  for (let sp=0;sp<5;sp++){
    const ang=(sp/5)*Math.PI*2;
    const spoke=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,.6,8),MAT.castIronDk);
    spoke.rotation.z=ang; spoke.position.set(Math.cos(ang)*.15,Math.sin(ang)*.15,0);
    hwGrp.add(spoke);
  }
  const hwHub=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,.08,16),MAT.chrome);
  hwGrp.add(hwHub);
  const hwHandle=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,.5,8),MAT.rubberBlk);
  hwHandle.position.set(.38,0,0); hwGrp.add(hwHandle);
  M.add(hwGrp);

  /* Tilt handwheel */
  const thwGrp = hwGrp.clone();
  thwGrp.position.set(-3.85,2.6,0); thwGrp.rotation.z=.4;
  M.add(thwGrp);

  /* === STACK LIGHT (beacon) === */
  const stackGrp = new THREE.Group();
  stackGrp.position.set(-3.0,4.4,-1.4);
  const stackPole = new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,.9,8),MAT.steelDk);
  stackPole.position.y=.45; stackGrp.add(stackPole);
  const stackBase = new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.1,16),MAT.castIronGy);
  stackGrp.add(stackBase);
  /* Green = running */
  const greenLight = new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,.22,16),MAT.beaconGrn);
  greenLight.position.y=.6; stackGrp.add(greenLight);
  const greenGlow = new THREE.PointLight(0x00c853,.8,3);
  greenGlow.position.y=.6; stackGrp.add(greenGlow);
  /* Amber = warning */
  const amberLight = new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,.22,16),MAT.beaconAmb);
  amberLight.position.y=.88; stackGrp.add(amberLight);
  M.add(stackGrp);

  /* === CONDUIT / WIRING RACEWAYS === */
  const conduitPositions=[
    { from:[-1.8,2.9,1.55], to:[-1.8,1.0,1.55] },
    { from:[-1.8,1.0,1.55], to:[-2.5,1.0,1.55] },
    { from:[-2.5,1.0,-1.0], to:[-1.8,1.0,1.55] },
  ];
  conduitPositions.forEach(({from,to})=>{
    const dir=new THREE.Vector3().subVectors(new THREE.Vector3(...to),new THREE.Vector3(...from));
    const len=dir.length();
    const mid=new THREE.Vector3(...from).add(dir.clone().normalize().multiplyScalar(len/2));
    const cond=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,len,8),MAT.conduit);
    cond.position.copy(mid);
    cond.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize());
    M.add(cond);
  });

  scene.add(M);

  /* ─────────────────────────────────────────────────────────────
     SENSOR NODES — placed with precision
  ───────────────────────────────────────────────────────────── */
  _sensorObjects = [];

  function buildSensorNode(key, worldPos, size=0.18) {
    const s   = SENSORS[key];
    const grp = new THREE.Group();
    grp.position.copy(worldPos);

    /* Sensor body housing */
    const housing = new THREE.Mesh(new THREE.BoxGeometry(size*1.8,size*1.0,size*.9),
      new THREE.MeshStandardMaterial({color:0x1a2236,metalness:.7,roughness:.4}));
    grp.add(housing);

    /* Sensor face (emissive glow) */
    const face = new THREE.Mesh(new THREE.BoxGeometry(size*1.1,size*.6,.05),
      new THREE.MeshStandardMaterial({color:s.color3d,emissive:s.color3d,emissiveIntensity:1.2,roughness:.2}));
    face.position.z = size*.46; grp.add(face);

    /* Detection lens */
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(size*.25,size*.25,.04,16),
      new THREE.MeshStandardMaterial({color:s.color3d,emissive:s.color3d,emissiveIntensity:2.0,transparent:true,opacity:.8}));
    lens.rotation.x=Math.PI/2; lens.position.z=size*.5; grp.add(lens);

    /* Glow light */
    const pl = new THREE.PointLight(s.color3d, 0.7, 2.5);
    grp.add(pl);

    /* Mounting bracket */
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(size*.3,size*.8,.3),
      new THREE.MeshStandardMaterial({color:0x2d3340,metalness:.8}));
    bracket.position.set(0,0,-.25); grp.add(bracket);

    /* Cable */
    const cable = new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,.4,6),
      new THREE.MeshStandardMaterial({color:0x111318,roughness:.9}));
    cable.position.set(size*.4,-.2,-.1); cable.rotation.z=.4; grp.add(cable);

    /* Pulsing ring */
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(size*.55,size*.06,8,24),
      new THREE.MeshStandardMaterial({color:s.color3d,emissive:s.color3d,emissiveIntensity:.6,transparent:true,opacity:.5})
    );
    ring.rotation.x=Math.PI/2; grp.add(ring);

    /* Invisible large hit target sphere for easy hover detection */
    const hitTarget = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 8, 8),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.0 })
    );
    grp.add(hitTarget);

    scene.add(grp);
    _sensorObjects.push({ group:grp, key, ring, face, lens, pl });
    return grp;
  }

  /* 1. TEMPERATURE — on motor body */
  buildSensorNode('temperature', new THREE.Vector3(-2.1+1.0, 2.5, -1.0));

  /* 2. VIBRATION — motor mounting plate (near motor) */
  buildSensorNode('vibration', new THREE.Vector3(-2.1, 0.9, -1.0));

  /* 3. HUMIDITY — blade zone, above throat plate */
  buildSensorNode('humidity', new THREE.Vector3(-1.0, 4.5, -0.6));

  /* 4. VOLTAGE — switch panel face */
  buildSensorNode('voltage', new THREE.Vector3(-1.8, 3.45, 1.58));

  /* 5. MOTION — side mount, focused on cutting area */
  const motionMount2 = new THREE.Group();
  motionMount2.position.set(6.2, 5.2, 1.4);
  /* mount arm */
  const mArm = new THREE.Mesh(new THREE.BoxGeometry(.1,.1,1.0),MAT.steelDk);
  mArm.position.z=-.5; motionMount2.add(mArm);
  /* camera-like housing */
  const mHousing = new THREE.Mesh(new THREE.BoxGeometry(.45,.35,.5),
    new THREE.MeshStandardMaterial({color:0x1a2030,metalness:.7}));
  motionMount2.add(mHousing);
  const mLens = new THREE.Mesh(new THREE.CylinderGeometry(.12,.14,.15,16),
    new THREE.MeshStandardMaterial({color:0x090d14,metalness:.9}));
  mLens.rotation.x=Math.PI/2; mLens.position.z=.32; motionMount2.add(mLens);
  const mLensFace = new THREE.Mesh(new THREE.CircleGeometry(.1,16),
    new THREE.MeshStandardMaterial({color:0x00e676,emissive:0x00e676,emissiveIntensity:1.5,transparent:true,opacity:.8}));
  mLensFace.rotation.x=Math.PI/2; mLensFace.position.z=.4; motionMount2.add(mLensFace);
  const mPL = new THREE.PointLight(0x00e676,.5,4); motionMount2.add(mPL);
  scene.add(motionMount2);

  /* IR detection beam toward blade */
  const beamGeo = new THREE.CylinderGeometry(.02,.02,7.0,6);
  const beamMat = new THREE.MeshStandardMaterial({color:0x00e676,emissive:0x00e676,emissiveIntensity:1.0,transparent:true,opacity:.35});
  const beamMesh = new THREE.Mesh(beamGeo,beamMat);
  const beamFrom = new THREE.Vector3(6.2,5.2,1.0);
  const beamTo   = new THREE.Vector3(-1.8,3.78,0);
  const beamDir2 = new THREE.Vector3().subVectors(beamTo,beamFrom);
  const beamLen2 = beamDir2.length();
  beamMesh.position.copy(beamFrom.clone().add(beamDir2.clone().normalize().multiplyScalar(beamLen2/2)));
  beamMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),beamDir2.normalize());
  scene.add(beamMesh);

  /* Motion sensor entry in _sensorObjects (manual) */
  const motionHitTarget = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 8, 8),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.0 })
  );
  motionMount2.add(motionHitTarget);

  _sensorObjects.push({ group:motionMount2, key:'motion', ring:null, face:mLensFace, lens:mLens, pl:mPL });

  /* ─────────────────────────────────────────────────────────────
     TOOLTIP SYSTEM
  ───────────────────────────────────────────────────────────── */
  const tooltipEl = document.getElementById('dt-tooltip');
  const raycaster  = new THREE.Raycaster();
  const mouse      = new THREE.Vector2();
  raycaster.params.Points.threshold = .1;

  let hoveredKey = null;

  function showSensorTooltip(key, ex, ey) {
    const s   = SENSORS[key];
    const st  = sensorStatus(key);
    const val = sensorDisplayVal(key);
    const col = statusColor(key);
    tooltipEl.style.display = 'block';
    tooltipEl.style.left    = `${ex+16}px`;
    tooltipEl.style.top     = `${ey-10}px`;
    tooltipEl.innerHTML = `
      <div class="tt-head">
        <span class="tt-icon">${s.icon}</span>
        <div><div class="tt-name">${s.label}</div><div class="tt-sub">${s.subLabel}</div></div>
      </div>
      <div class="tt-val" style="color:${col}">${val}</div>
      <div class="tt-loc">📍 ${s.location}</div>
      <div class="tt-desc">${s.desc}</div>
      <span class="tt-status tt-st-${st.toLowerCase()}" style="color:${col}">● ${st}</span>
    `;
  }

  function findSensorForObject(hitObj) {
    /* Walk up the parent chain to find which sensor group owns this mesh */
    let cur = hitObj;
    while (cur) {
      const match = _sensorObjects.find(so => so.group === cur);
      if (match) return match;
      cur = cur.parent;
    }
    return null;
  }

  function onMouseMove(e) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x =  ((e.clientX - rect.left) / W) * 2 - 1;
    mouse.y = -((e.clientY - rect.top)  / H) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    /* Build flat list of all sensor meshes for intersection test */
    const testObjs = [];
    _sensorObjects.forEach(so => so.group.traverse(c => { if (c.isMesh) testObjs.push(c); }));

    const hits = raycaster.intersectObjects(testObjs, false);
    if (hits.length > 0) {
      const found = findSensorForObject(hits[0].object);
      if (found) {
        hoveredKey = found.key;
        showSensorTooltip(found.key, e.clientX - rect.left, e.clientY - rect.top);
        document.body.style.cursor = 'crosshair';
        return;
      }
    }
    hoveredKey = null;
    tooltipEl.style.display = 'none';
    document.body.style.cursor = 'default';
  }

  renderer.domElement.addEventListener('mousemove', onMouseMove);

  /* ─────────────────────────────────────────────────────────────
     CAMERA PRESETS
  ───────────────────────────────────────────────────────────── */
  const camPresets = {
    'cam-iso':   ()=>{ camera.position.set(18,12,22);   if(controls)controls.target.set(0,2.5,0); },
    'cam-top':   ()=>{ camera.position.set(0,30,.1);    if(controls)controls.target.set(0,0,0);   },
    'cam-front': ()=>{ camera.position.set(0,6,20);     if(controls)controls.target.set(0,3.5,0); },
    'cam-side':  ()=>{ camera.position.set(20,6,0);     if(controls)controls.target.set(0,3.5,0); },
    'cam-motor': ()=>{ camera.position.set(-4,4,-2);    if(controls)controls.target.set(-2,2,-1); },
    'cam-blade': ()=>{ camera.position.set(-1.8,7,4);   if(controls)controls.target.set(-1.8,3.8,0); },
  };
  let isOrbiting=false;
  Object.entries(camPresets).forEach(([id,fn])=>{
    const el=document.getElementById(id);
    if(el) el.addEventListener('click',()=>{
      document.querySelectorAll('.cam-btn').forEach(b=>b.classList.remove('cam-active'));
      el.classList.add('cam-active'); fn();
    });
  });
  const autoBtn=document.getElementById('cam-auto');
  if(autoBtn) autoBtn.addEventListener('click',e=>{
    isOrbiting=!isOrbiting;
    e.currentTarget.classList.toggle('cam-active',isOrbiting);
  });

  /* ─────────────────────────────────────────────────────────────
     ANIMATION LOOP
  ───────────────────────────────────────────────────────────── */
  const clock = new THREE.Clock();
  let animId;

  function loop() {
    animId = requestAnimationFrame(loop);
    const t = clock.getElapsedTime();

    if (controls) controls.update();
    if (isOrbiting) { camera.position.applyAxisAngle(new THREE.Vector3(0,1,0),.003); camera.lookAt(0,3,0); }

    /* Tick sensors & panel */
    tickSensors(t);
    refreshSensorPanel();

    /* Blade spinning */
    bladeGroup.rotation.x = t * 10;

    /* Handwheels slow rotation (idle) */
    hwGrp.rotation.z    = Math.sin(t*.3)*.06;
    thwGrp.rotation.z   = .4 + Math.sin(t*.25)*.04;

    /* === WOOD PLANK ANIMATION — feed into machine === */
    planks.forEach((plk,pi)=>{
      plk.position.x += plk.userData.speed * .012;
      /* Reset when plank passes blade */
      if (plk.position.x > 2.5) {
        plk.position.x = plk.userData.startX;
      }
      /* Animate slight vertical bounce on conveyor rollers */
      plk.position.y = 3.58 + Math.abs(Math.sin(plk.position.x*2.5))*.006;
      /* Tilt slightly as it feeds */
      plk.rotation.y = Math.sin(t*.4+pi)*.01;
    });

    /* Cut plank halves drift out on output conveyor */
    cutPlanks.forEach((cp)=>{
      cp.position.x += cp.userData.speed * .01;
      if (cp.position.x > 18) cp.position.x = cp.userData.startX;
      cp.position.y = 3.58 + Math.abs(Math.sin(cp.position.x*2.5))*.006;
    });

    /* Belt vibration (motor running) */
    motorGrp.rotation.z = Math.sin(t*45)*.002;

    /* Sawdust particle system (near blade) */
    const dpos = dustGeo.attributes.position.array;
    for (let d=0;d<dustCount;d++) {
      const dv=dustVel[d];
      dv.life-=.012;
      if (dv.life<=0) {
        dpos[d*3]   = (Math.random()-.5)*.4;
        dpos[d*3+1] = 3.8;
        dpos[d*3+2] = (Math.random()-.5)*.3;
        dv.vx=(Math.random()-.5)*.07;
        dv.vy=.015+Math.random()*.04;
        dv.vz=(Math.random()-.5)*.07;
        dv.life=.5+Math.random()*.8;
      } else {
        dpos[d*3]   += dv.vx;
        dpos[d*3+1] += dv.vy;
        dpos[d*3+2] += dv.vz;
        dv.vy       -= .0008;
      }
    }
    dustGeo.attributes.position.needsUpdate=true;

    /* Sensor nodes — pulse scale + LED blink */
    _sensorObjects.forEach((so,si)=>{
      const st = sensorStatus(so.key);
      const col3d = SENSORS[so.key].color3d;
      const pulse = 1+Math.sin(t*3+si)*.08;
      so.group.scale.set(pulse,pulse,pulse);

      if (so.face) {
        let ei=1.2;
        if(st==='WARNING') ei=0.5+Math.abs(Math.sin(t*4))*1.5;
        if(st==='CRITICAL') ei=0.3+Math.abs(Math.sin(t*8))*2.0;
        so.face.material.emissiveIntensity = ei;
      }
      if(so.pl){
        so.pl.color.setHex(getSensorGlowHex(so.key));
        so.pl.intensity = st==='WARNING'? .4+Math.abs(Math.sin(t*4))*.8 : st==='CRITICAL'? .3+Math.abs(Math.sin(t*8))*.9 : .6+Math.sin(t*2+si)*.2;
      }
      if(so.ring) {
        so.ring.rotation.z = t*1.2+si;
        so.ring.material.opacity = .3+Math.sin(t*2+si)*.3;
      }
    });

    /* Stack light */
    greenLight.material.emissiveIntensity = .8+Math.sin(t*2)*.3;
    greenGlow.intensity = .6+Math.sin(t*2)*.3;
    amberLight.material.emissiveIntensity = hasAnySensorWarning() ? .5+Math.abs(Math.sin(t*4))*.8 : 0;

    /* Motion beam */
    beamMesh.material.opacity = SENSORS.motion.value>=.5 ? .15+Math.abs(Math.sin(t*6))*.25 : .03;
    beamMesh.material.emissiveIntensity = SENSORS.motion.value>=.5 ? 1.0 : .1;

    /* Tooltip live update */
    if(hoveredKey) {
      const valEl = tooltipEl.querySelector('.tt-val');
      const stEl  = tooltipEl.querySelector('.tt-status');
      if(valEl) { valEl.textContent=sensorDisplayVal(hoveredKey); valEl.style.color=statusColor(hoveredKey); }
      if(stEl)  { const st2=sensorStatus(hoveredKey); stEl.textContent='● '+st2; stEl.className=`tt-status tt-st-${st2.toLowerCase()}`; stEl.style.color=statusColor(hoveredKey); }
    }

    renderer.render(scene, camera);
  }

  loop();
  twinThreeState = { animId, renderer, scene, camera };
}

function getSensorGlowHex(key) {
  const st = sensorStatus(key);
  if(st==='CRITICAL') return 0xef4444;
  if(st==='WARNING')  return 0xf59e0b;
  if(st==='RUNNING'||st==='NORMAL') return SENSORS[key].color3d;
  return 0x94a3b8;
}

function hasAnySensorWarning() {
  return Object.keys(SENSORS).some(k=>{ const st=sensorStatus(k); return st==='WARNING'||st==='CRITICAL'; });
}

/* ╔══════════════════════════════════════════════════════════════
   ║   2-D   TACTICAL FACTORY FLOORPLAN
   ╚══════════════════════════════════════════════════════════════ */
function initWCM2D() {
  const canvas    = document.getElementById('twin-canvas-2d');
  const mountElem = document.getElementById('twin-viewport-2d');
  if (!canvas||!mountElem) return;

  canvas.width  = mountElem.clientWidth  || 900;
  canvas.height = mountElem.clientHeight || 540;
  const ctx = canvas.getContext('2d');
  const W=canvas.width, H=canvas.height;
  const CX=W*.44, CY=H*.5;

  let animId, tick=0;

  const SPOS = {
    temperature: { dx:-140, dy:-55 },
    vibration:   { dx:-110, dy:  40 },
    humidity:    { dx:   20, dy: -55 },
    voltage:     { dx: -155, dy:  85 },
    motion:      { dx:  180, dy:   0 },
  };

  function render2D() {
    animId = requestAnimationFrame(render2D);
    tick+=.04;
    tickSensors(tick);
    refreshSensorPanel();

    ctx.fillStyle='#07090f'; ctx.fillRect(0,0,W,H);

    /* Grid */
    ctx.strokeStyle='#0e1520'; ctx.lineWidth=1;
    for(let gx=0;gx<W;gx+=36){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.stroke();}
    for(let gy=0;gy<H;gy+=36){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();}

    /* Factory boundary */
    ctx.strokeStyle='#1e3a5f'; ctx.lineWidth=2; ctx.strokeRect(24,24,W-48,H-48);

    /* Safety perimeter */
    ctx.setLineDash([6,4]); ctx.strokeStyle='#ffd600'; ctx.lineWidth=2;
    ctx.strokeRect(CX-175,CY-115,350,230); ctx.setLineDash([]);
    ctx.fillStyle='#92400e'; ctx.font='bold 10px monospace';
    ctx.fillText('⚠ SAFETY PERIMETER — MACHINE ZONE', CX-130,CY-122);

    /* Input conveyor */
    ctx.fillStyle='#1e293b';
    ctx.fillRect(40,CY-18,CX-182,36);
    for(let rx=55;rx<CX-186;rx+=20){
      ctx.strokeStyle='#374151'; ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(rx,CY-18);ctx.lineTo(rx,CY+18);ctx.stroke();
    }
    /* Animated plank on input */
    const plkX = 50+((tick*30)%((CX-182)));
    ctx.fillStyle='rgba(156,95,46,.85)';
    ctx.fillRect(plkX-40,CY-7,80,14);
    ctx.strokeStyle='#7a4520'; ctx.lineWidth=1; ctx.strokeRect(plkX-40,CY-7,80,14);
    ctx.fillStyle='#6b7a99'; ctx.font='8px monospace'; ctx.fillText('WOOD INPUT →',50,CY-24);

    /* Output conveyor */
    ctx.fillStyle='#1e293b';
    ctx.fillRect(CX+182,CY-18,W-CX-222,36);
    const outX=CX+185+((tick*28)%(W-CX-222-50));
    ctx.fillStyle='rgba(107,58,20,.8)'; ctx.fillRect(outX,CY-7,50,14);
    ctx.fillStyle='#6b7a99'; ctx.font='8px monospace'; ctx.fillText('→ CUT OUTPUT',CX+185,CY-24);

    /* Table top */
    ctx.shadowColor='#2563eb44'; ctx.shadowBlur=20;
    ctx.fillStyle='#1e293b'; ctx.beginPath();
    ctx.roundRect(CX-170,CY-105,340,210,6); ctx.fill();
    ctx.shadowBlur=0;
    ctx.strokeStyle='#334155'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.roundRect(CX-170,CY-105,340,210,6); ctx.stroke();

    /* Cabinet */
    ctx.fillStyle='#2d5016';
    ctx.fillRect(CX-168,CY-103,70,80);

    /* Blade (animated spin indicator) */
    ctx.save(); ctx.translate(CX,CY); ctx.rotate(tick*8);
    ctx.strokeStyle='#d1d5db'; ctx.lineWidth=3;
    ctx.beginPath(); ctx.arc(0,0,38,0,Math.PI*2); ctx.stroke();
    /* Teeth */
    for(let ti=0;ti<24;ti++){
      const a=(ti/24)*Math.PI*2;
      ctx.strokeStyle='#ffd54f'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(Math.cos(a)*36,Math.sin(a)*36); ctx.lineTo(Math.cos(a)*44,Math.sin(a)*44); ctx.stroke();
    }
    ctx.restore();
    ctx.fillStyle='#374151'; ctx.beginPath(); ctx.arc(CX,CY,8,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#94a3b8'; ctx.font='10px monospace'; ctx.textAlign='center';
    ctx.fillText('BLADE',CX,CY+54); ctx.textAlign='left';

    /* Rip fence */
    ctx.strokeStyle='#9ca3af'; ctx.lineWidth=2.5;
    ctx.beginPath(); ctx.moveTo(CX-165,CY+32); ctx.lineTo(CX+165,CY+32); ctx.stroke();
    ctx.fillStyle='#4b5563'; ctx.font='8px monospace'; ctx.fillText('RIP FENCE',CX-20,CY+28);

    /* Motor indicator */
    ctx.fillStyle='#374151'; ctx.beginPath(); ctx.arc(CX-125,CY-55,22,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='#10b981'; ctx.lineWidth=2.5; ctx.beginPath(); ctx.arc(CX-125,CY-55,22,0,Math.PI*2); ctx.stroke();
    /* Motor rotation */
    ctx.save(); ctx.translate(CX-125,CY-55); ctx.rotate(tick*8);
    ctx.strokeStyle='#6b7280'; ctx.lineWidth=1.5;
    for(let fi=0;fi<6;fi++){const a=fi/6*Math.PI*2; ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(a)*12,Math.sin(a)*12);ctx.stroke();}
    ctx.restore();
    ctx.fillStyle='#6b7280'; ctx.font='8px monospace'; ctx.textAlign='center';
    ctx.fillText('MOTOR',CX-125,CY-82); ctx.textAlign='left';

    /* Switch panel */
    ctx.fillStyle='#111827'; ctx.fillRect(CX-155,CY+50,38,28);
    ctx.fillStyle='#00aa44'; ctx.beginPath(); ctx.arc(CX-148,CY+62,5,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#cc2200'; ctx.beginPath(); ctx.arc(CX-132,CY+62,5,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#4b5563'; ctx.font='8px monospace'; ctx.fillText('SWITCH',CX-155,CY+95);

    /* ── SENSORS ── */
    Object.entries(SPOS).forEach(([key,sp],idx)=>{
      const s  = SENSORS[key];
      const st = sensorStatus(key);
      const sx = CX+sp.dx, sy = CY+sp.dy;
      const col= statusColor(key);

      /* Pulsing aura */
      const aura=(Math.sin(tick*3+idx)+1)*5+12;
      ctx.beginPath(); ctx.arc(sx,sy,aura,0,Math.PI*2);
      ctx.fillStyle=col+'22'; ctx.fill();

      /* Connection wire to machine */
      ctx.setLineDash([4,4]); ctx.strokeStyle=col+'77'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(CX,CY); ctx.stroke(); ctx.setLineDash([]);

      /* Sensor body */
      ctx.fillStyle=col; ctx.beginPath(); ctx.arc(sx,sy,11,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle='#0d1117'; ctx.lineWidth=2; ctx.stroke();
      ctx.fillStyle='#0d1117'; ctx.font='bold 9px monospace'; ctx.textAlign='center';
      ctx.fillText(s.icon,sx,sy+3.5); ctx.textAlign='left';

      /* Value tag */
      const val=sensorDisplayVal(key);
      const tagW=Math.max(70,val.length*7+16);
      ctx.fillStyle='rgba(7,9,15,.9)';
      ctx.beginPath(); ctx.roundRect(sx+15,sy-10,tagW,28,5); ctx.fill();
      ctx.strokeStyle=col+'88'; ctx.lineWidth=1; ctx.stroke();
      ctx.fillStyle=col; ctx.font='bold 10px monospace';
      ctx.fillText(val,sx+20,sy+3);
      ctx.fillStyle='#4b5e7a'; ctx.font='8px monospace';
      ctx.fillText(s.label,sx+20,sy+14);

      /* Status dot */
      ctx.fillStyle=col; ctx.beginPath(); ctx.arc(sx,sy,4,0,Math.PI*2); ctx.fill();
    });

    /* Motion beam */
    const ms=SPOS.motion;
    ctx.strokeStyle=(SENSORS.motion.value>=.5?'#00e676':'#94a3b8')+'88';
    ctx.lineWidth=2; ctx.setLineDash([3,3]);
    ctx.beginPath(); ctx.moveTo(CX+ms.dx,CY+ms.dy); ctx.lineTo(CX,CY); ctx.stroke();
    ctx.setLineDash([]);

    /* Compass */
    ctx.fillStyle='#1e3a5f'; ctx.font='bold 12px monospace'; ctx.fillText('N↑',W-50,52);

    /* Title */
    ctx.fillStyle='#38bdf8'; ctx.font='bold 13px monospace';
    ctx.fillText('🪚 WCM-PRO-01 — INDUSTRIAL TABLE SAW — TOP-DOWN FLOORPLAN',32,H-16);
  }

  render2D();
  twin2dState = { animId };
}

window.Router.register('digital-twin', renderDigitalTwinModule);
