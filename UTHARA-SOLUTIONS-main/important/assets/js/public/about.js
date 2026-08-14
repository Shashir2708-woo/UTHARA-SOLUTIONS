/**
 * UTTHARA SOLUTIONS - Public About Page (UTTHARA SOLUTIONS Mission & Vision)
 * Developed by UTTHARA SOLUTIONS
 */

function renderPublicAboutPage(container) {
  container.innerHTML = `
    <div class="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col gap-12">
      <!-- Header Banner -->
      <div class="text-center max-w-3xl mx-auto">
        <span class="text-xs font-extrabold uppercase tracking-wider text-amber-800 font-mono">Company & Vendor Profile</span>
        <h1 class="text-4xl font-extrabold text-amber-950 mt-1">UTTHARA SOLUTIONS & UTTHARA SOLUTIONS</h1>
        <p class="text-xs text-slate-600 mt-2">Empowering MSMEs and industrial enterprises to transition from fragmented manual operations to data-driven smart manufacturing.</p>
      </div>

      <!-- Vision & Mission Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="fv-card p-8">
          <div class="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center mb-4">
            <i data-lucide="compass" class="w-6 h-6 text-amber-700"></i>
          </div>
          <h2 class="text-xl font-extrabold text-amber-950 mb-2">Our Mission</h2>
          <p class="text-xs text-slate-700 leading-relaxed">
            To provide an affordable, production-grade Autonomous AI Operating System that connects shop floor machinery, Industrial IoT sensors, machine digital passports, and operational intelligence—enabling MSMEs to achieve world-class OEE and zero unplanned downtime.
          </p>
        </div>

        <div class="fv-card p-8">
          <div class="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center mb-4">
            <i data-lucide="eye" class="w-6 h-6 text-amber-700"></i>
          </div>
          <h2 class="text-xl font-extrabold text-amber-950 mb-2">Our Vision</h2>
          <p class="text-xs text-slate-700 leading-relaxed">
            A future where every manufacturing plant has a live 3D Digital Twin, every critical machine possesses a centralized Machine Digital Passport, and plant engineers use AI intelligence to make data-backed operational decisions in real-time.
          </p>
        </div>
      </div>

      <!-- Core Principles -->
      <div class="fv-card p-8 bg-gradient-to-br from-white to-amber-50/40 border-amber-300">
        <h2 class="text-xl font-extrabold text-amber-950 mb-6 text-center">Engineering Principles</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 class="text-sm font-bold text-amber-900 mb-1">Strict Tenant Isolation</h3>
            <p class="text-xs text-slate-600">Multi-tenant architecture enforces strict organization ID boundaries across all telemetry and AI knowledge stores.</p>
          </div>
          <div>
            <h3 class="text-sm font-bold text-amber-900 mb-1">Industrial Hardware Agnostic</h3>
            <p class="text-xs text-slate-600">Supports standard MQTTS brokers, ESP32 gateways, PLCs, MPU6050 vibration sensors, and Modbus TCP nodes.</p>
          </div>
          <div>
            <h3 class="text-sm font-bold text-amber-900 mb-1">Human-in-the-Loop Safety</h3>
            <p class="text-xs text-slate-600">AI provides monitoring, predictions, and recommendations—never executing autonomous hardware controls without safety authorization.</p>
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.Router.register('public-about', renderPublicAboutPage);
