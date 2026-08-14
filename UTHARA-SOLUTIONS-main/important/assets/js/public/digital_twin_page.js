/**
 * UTTHARA SOLUTIONS - Public Digital Twin Feature Page
 * Developed by UTTHARA SOLUTIONS
 */

function renderPublicDigitalTwinPage(container) {
  container.innerHTML = `
    <div class="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col gap-12">
      <div class="text-center max-w-3xl mx-auto">
        <span class="text-xs font-extrabold uppercase tracking-wider text-amber-800 font-mono">Spatial Intelligence</span>
        <h1 class="text-4xl font-extrabold text-amber-950 mt-1">Real-Time 3D & 2D Factory Floor Digital Twin</h1>
        <p class="text-xs text-slate-600 mt-2">Map your physical factory topology into an interactive spatial matrix with live telemetry heatmaps.</p>
      </div>

      <!-- Spatial Hierarchy Breakdown -->
      <div class="fv-card p-8 bg-gradient-to-br from-white to-amber-50/50 border-amber-300">
        <h2 class="text-xl font-extrabold text-amber-950 mb-4 text-center">Factory Hierarchy Model</h2>
        <div class="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-center">
          <div class="p-3 bg-white rounded-xl border border-amber-200 shadow-sm flex-1"><strong class="text-amber-900 block text-sm font-black">Factory</strong>GigaFactory 01</div>
          <span class="text-amber-600 font-bold">→</span>
          <div class="p-3 bg-white rounded-xl border border-amber-200 shadow-sm flex-1"><strong class="text-amber-900 block text-sm font-black">Building</strong>Building A</div>
          <span class="text-amber-600 font-bold">→</span>
          <div class="p-3 bg-white rounded-xl border border-amber-200 shadow-sm flex-1"><strong class="text-amber-900 block text-sm font-black">Department</strong>Precision Machining</div>
          <span class="text-amber-600 font-bold">→</span>
          <div class="p-3 bg-white rounded-xl border border-amber-200 shadow-sm flex-1"><strong class="text-amber-900 block text-sm font-black">Production Line</strong>Line C (CNC Cell)</div>
          <span class="text-amber-600 font-bold">→</span>
          <div class="p-3 bg-amber-100 rounded-xl border border-amber-300 shadow-md flex-1"><strong class="text-amber-950 block text-sm font-black">Machine Node</strong>Haas VF-4SS CNC</div>
        </div>
      </div>

      <!-- Live Interactive Twin Engine Launcher Callout -->
      <div class="fv-card p-8 text-center flex flex-col items-center gap-4">
        <h2 class="text-2xl font-bold text-amber-950">Experience the Live 3D Digital Twin Engine</h2>
        <p class="text-xs text-slate-600 max-w-xl">Interact with 3D machine geometries, camera perspective presets, vibration heatmaps, and Machine Passports directly in our live console.</p>
        <a href="#digital-twin" class="btn btn-primary btn-lg shadow-md">
          <i data-lucide="box" class="w-5 h-5"></i>
          Launch Live 3D Digital Twin Demo
        </a>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.Router.register('public-twin', renderPublicDigitalTwinPage);
