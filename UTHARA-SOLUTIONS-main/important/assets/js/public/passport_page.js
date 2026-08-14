/**
 * UTTHARA SOLUTIONS - Public Machine Digital Passport Page
 * Developed by UTTHARA SOLUTIONS
 */

function renderPublicPassportPage(container) {
  container.innerHTML = `
    <div class="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col gap-12">
      <div class="text-center max-w-3xl mx-auto">
        <span class="text-xs font-extrabold uppercase tracking-wider text-amber-800 font-mono">Asset Identity</span>
        <h1 class="text-4xl font-extrabold text-amber-950 mt-1">Machine Digital Passport System</h1>
        <p class="text-xs text-slate-600 mt-2">Every physical machine receives a centralized digital identity containing OEM manuals, warranties, spare parts, telemetry, and AI service records.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="fv-card p-6">
          <h2 class="text-xl font-bold text-amber-950 mb-4">Passport Attribute Architecture</h2>
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="p-3 bg-amber-50 rounded-xl border border-amber-200"><strong>Manufacturer & Model</strong></div>
            <div class="p-3 bg-amber-50 rounded-xl border border-amber-200"><strong>Serial # & Commission Date</strong></div>
            <div class="p-3 bg-amber-50 rounded-xl border border-amber-200"><strong>Warranty & Supplier</strong></div>
            <div class="p-3 bg-amber-50 rounded-xl border border-amber-200"><strong>OEM Manuals & Drawings</strong></div>
            <div class="p-3 bg-amber-50 rounded-xl border border-amber-200"><strong>Service History Logs</strong></div>
            <div class="p-3 bg-amber-50 rounded-xl border border-amber-200"><strong>Spare Parts Inventory</strong></div>
            <div class="p-3 bg-amber-50 rounded-xl border border-amber-200"><strong>Live Telemetry Stream</strong></div>
            <div class="p-3 bg-amber-50 rounded-xl border border-amber-200"><strong>AI Predictive Recommendations</strong></div>
          </div>
        </div>

        <div class="fv-card p-6 text-center flex flex-col items-center justify-center gap-4">
          <div class="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center">
            <i data-lucide="qr-code" class="w-8 h-8 text-amber-800"></i>
          </div>
          <h2 class="text-xl font-bold text-amber-950">Inspect Realistic Machine Passports</h2>
          <p class="text-xs text-slate-600">Open full slide-out digital passports for Haas 5-Axis CNC Mills, KUKA Robotic Arms, and Schuler Stamping Presses in our live app console.</p>
          <a href="#passports" class="btn btn-primary btn-md shadow-md">
            <i data-lucide="qr-code" class="w-4 h-4"></i>
            Open Live Machine Passports
          </a>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.Router.register('public-passport', renderPublicPassportPage);
