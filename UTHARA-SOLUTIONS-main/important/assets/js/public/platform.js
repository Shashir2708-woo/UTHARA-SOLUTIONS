/**
 * UTTHARA SOLUTIONS - Public Platform Overview Page
 * Developed by UTTHARA SOLUTIONS
 */

function renderPublicPlatformPage(container) {
  container.innerHTML = `
    <div class="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col gap-12">
      <div class="text-center max-w-3xl mx-auto">
        <span class="text-xs font-extrabold uppercase tracking-wider text-amber-800 font-mono">Platform Architecture</span>
        <h1 class="text-4xl font-extrabold text-amber-950 mt-1">Unified Industrial Operating System</h1>
        <p class="text-xs text-slate-600 mt-2">UTTHARA SOLUTIONS combines machine data, IoT telemetry, digital twins, and AI copilots into one scalable SaaS architecture.</p>
      </div>

      <!-- Capability Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="fv-card">
          <i data-lucide="box" class="w-8 h-8 text-amber-700 mb-3"></i>
          <h3 class="text-base font-bold text-slate-900 mb-1">3D WebGL Digital Twin</h3>
          <p class="text-xs text-slate-600">Spatial factory floor representation with interactive machine orbit controls and status heatmaps.</p>
        </div>

        <div class="fv-card">
          <i data-lucide="qr-code" class="w-8 h-8 text-amber-700 mb-3"></i>
          <h3 class="text-base font-bold text-slate-900 mb-1">Machine Digital Passports</h3>
          <p class="text-xs text-slate-600">Centralized asset identities containing OEM manuals, warranties, spare parts, and service histories.</p>
        </div>

        <div class="fv-card">
          <i data-lucide="activity" class="w-8 h-8 text-amber-700 mb-3"></i>
          <h3 class="text-base font-bold text-slate-900 mb-1">Industrial Telemetry & IoT</h3>
          <p class="text-xs text-slate-600">ESP32 edge nodes, MPU6050 vibration analysis, DHT22 thermal monitoring, and MQTTS streaming.</p>
        </div>

        <div class="fv-card">
          <i data-lucide="sparkles" class="w-8 h-8 text-amber-700 mb-3"></i>
          <h3 class="text-base font-bold text-slate-900 mb-1">AI Manufacturing Assistant</h3>
          <p class="text-xs text-slate-600">Autonomous RAG engine providing contextual answers using company SOPs and live machine data.</p>
        </div>

        <div class="fv-card">
          <i data-lucide="wrench" class="w-8 h-8 text-amber-700 mb-3"></i>
          <h3 class="text-base font-bold text-slate-900 mb-1">Predictive Maintenance</h3>
          <p class="text-xs text-slate-600">Machine learning failure risk scoring and automated maintenance work order dispatching.</p>
        </div>

        <div class="fv-card">
          <i data-lucide="gauge" class="w-8 h-8 text-amber-700 mb-3"></i>
          <h3 class="text-base font-bold text-slate-900 mb-1">OEE Analytics Engine</h3>
          <p class="text-xs text-slate-600">Real-time Availability, Performance, and First Pass Quality Yield tracking across production lines.</p>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.Router.register('public-platform', renderPublicPlatformPage);
