/**
 * UTTHARA SOLUTIONS - Public Features Page
 * Developed by UTTHARA SOLUTIONS
 */

function renderPublicFeaturesPage(container) {
  const featuresList = [
    { title: '3D WebGL Digital Twin', icon: 'box', desc: 'Real-time spatial visualization with camera presets (Isometric, Top-Down, Line Level).' },
    { title: 'Machine Digital Passport', icon: 'qr-code', desc: 'Centralized asset identity, OEM manuals, SOP drawings, service logs, and warranty tracking.' },
    { title: 'Industrial IoT Telemetry', icon: 'activity', desc: 'ESP32 edge gateway integration, MPU6050 vibration frequency analysis, and DHT22 temp monitoring.' },
    { title: 'AI Manufacturing Assistant', icon: 'sparkles', desc: 'RAG knowledge engine trained on plant SOPs and operational telemetry.' },
    { title: 'Predictive Maintenance', icon: 'wrench', desc: 'AI failure risk scoring, MTBF metrics, and automated maintenance work orders.' },
    { title: 'Production Line OEE', icon: 'gauge', desc: 'Real-time Availability x Performance x Quality yield calculations.' },
    { title: 'Quality Control & Defect Inspection', icon: 'check-circle', desc: 'CMM laser probe inspection logs, optical vision camera tolerance checks.' },
    { title: 'Spare Parts Inventory', icon: 'boxes', desc: 'Critical replacement parts stock levels, reorder thresholds, and warehouse management.' },
    { title: 'Workforce & Shift Roster', icon: 'users', desc: 'Plant operator shift schedules, skill certifications, and safety training logs.' },
    { title: 'Financial Downtime Cost Engine', icon: 'dollar-sign', desc: 'Financial cost analysis of machine downtime and PZEM energy consumption metering.' },
    { title: 'Executive Reports & Briefings', icon: 'file-text', desc: 'Automated daily production summaries, OEE briefings, and printable PDF reports.' },
    { title: 'Multi-Tenant Security & RBAC', icon: 'shield-check', desc: 'Strict organization data boundaries, 13 industrial roles, and immutable audit logs.' }
  ];

  container.innerHTML = `
    <div class="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col gap-12">
      <div class="text-center max-w-3xl mx-auto">
        <span class="text-xs font-extrabold uppercase tracking-wider text-amber-800 font-mono">Platform Capabilities</span>
        <h1 class="text-4xl font-extrabold text-amber-950 mt-1">Complete Manufacturing Feature Suite</h1>
        <p class="text-xs text-slate-600 mt-2">UTTHARA SOLUTIONS integrates 12 industrial intelligence modules into one cohesive operating system.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${featuresList.map(f => `
          <div class="fv-card p-6">
            <div class="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center mb-3">
              <i data-lucide="${f.icon}" class="w-5 h-5 text-amber-800"></i>
            </div>
            <h3 class="text-base font-bold text-amber-950 mb-1">${f.title}</h3>
            <p class="text-xs text-slate-600">${f.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.Router.register('public-features', renderPublicFeaturesPage);
