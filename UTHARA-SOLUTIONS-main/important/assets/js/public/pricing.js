/**
 * UTTHARA SOLUTIONS - Public Pricing & ROI Calculator Page
 * Developed by UTTHARA SOLUTIONS
 */

function renderPublicPricingPage(container) {
  container.innerHTML = `
    <div class="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col gap-12">
      <div class="text-center max-w-3xl mx-auto">
        <span class="text-xs font-extrabold uppercase tracking-wider text-amber-800 font-mono">Transparent Plans</span>
        <h1 class="text-4xl font-extrabold text-amber-950 mt-1">Predictable SaaS Plans for Smart Factories</h1>
        <p class="text-xs text-slate-600 mt-2">All plans include multi-tenant security, 3D Digital Twin, Machine Digital Passports, and AI Assistant capabilities.</p>
      </div>

      <!-- Pricing Tiers Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Starter Tier -->
        <div class="fv-card p-8 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold font-mono text-amber-800 uppercase block mb-1">MSME Starter</span>
            <h2 class="text-3xl font-black text-amber-950 mb-2">₹14,999 <span class="text-xs font-semibold text-slate-500">/ month</span></h2>
            <p class="text-xs text-slate-600 mb-6">Designed for single-plant MSMEs starting their digital transformation journey.</p>
            <ul class="text-xs text-slate-700 space-y-2 mb-6">
              <li>✔ Up to 10 Connected Machines</li>
              <li>✔ 1 Factory Facility</li>
              <li>✔ 3D & 2D Digital Twin Engine</li>
              <li>✔ Machine Digital Passports</li>
              <li>✔ ESP32 IoT Telemetry Integration</li>
              <li>✔ Standard AI Operations Copilot</li>
            </ul>
          </div>
          <a href="#public-book-demo" class="btn btn-secondary btn-md w-full">Start 14-Day Free Trial</a>
        </div>

        <!-- Growth Tier -->
        <div class="fv-card p-8 flex flex-col justify-between border-amber-400 bg-gradient-to-br from-white via-amber-50/50 to-white shadow-xl relative">
          <span class="absolute top-4 right-4 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-600 text-white uppercase tracking-wider">Most Popular</span>
          <div>
            <span class="text-xs font-bold font-mono text-amber-800 uppercase block mb-1">Growth Plant</span>
            <h2 class="text-3xl font-black text-amber-950 mb-2">₹34,999 <span class="text-xs font-semibold text-slate-500">/ month</span></h2>
            <p class="text-xs text-slate-600 mb-6">Ideal for growing medium-sized manufacturing plants requiring predictive maintenance.</p>
            <ul class="text-xs text-slate-700 space-y-2 mb-6">
              <li>✔ Up to 35 Connected Machines</li>
              <li>✔ 2 Factory Facilities</li>
              <li>✔ Advanced Predictive Maintenance</li>
              <li>✔ Full RAG SOP Knowledge Base</li>
              <li>✔ 10 Specialized AI Personas</li>
              <li>✔ Unlimited Users & Roles</li>
            </ul>
          </div>
          <a href="#public-book-demo" class="btn btn-primary btn-md w-full shadow-md">Book Growth Demo</a>
        </div>

        <!-- Enterprise Tier -->
        <div class="fv-card p-8 flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold font-mono text-amber-800 uppercase block mb-1">Enterprise Multi-Factory</span>
            <h2 class="text-3xl font-black text-amber-950 mb-2">Custom Quote</h2>
            <p class="text-xs text-slate-600 mb-6">For large industrial groups with multiple plants, custom PLCs, and dedicated SLA support.</p>
            <ul class="text-xs text-slate-700 space-y-2 mb-6">
              <li>✔ Unlimited Machines & Plants</li>
              <li>✔ Custom Modbus / Siemens PLC Integration</li>
              <li>✔ Dedicated Field IoT Engineer</li>
              <li>✔ 99.9% Uptime Guarantee SLA</li>
              <li>✔ On-Premise Hybrid Deployment Option</li>
            </ul>
          </div>
          <a href="#public-contact" class="btn btn-secondary btn-md w-full">Contact Enterprise Sales</a>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.Router.register('public-pricing', renderPublicPricingPage);
