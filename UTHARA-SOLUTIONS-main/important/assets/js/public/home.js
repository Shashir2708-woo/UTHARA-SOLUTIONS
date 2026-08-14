/**
 * UTTHARA SOLUTIONS - Public Website Landing Home Page
 * Developed by UTTHARA SOLUTIONS
 */

function renderPublicHomePage(container) {
  container.innerHTML = `
    <div class="flex flex-col gap-16 pb-20">
      <!-- 1. Hero Section -->
      <section class="relative bg-gradient-to-b from-amber-500/10 via-amber-100/30 to-transparent pt-12 pb-16 px-6 rounded-3xl border border-amber-200/70 shadow-lg max-w-7xl mx-auto w-full mt-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div class="lg:col-span-7 flex flex-col gap-6">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs font-bold w-fit shadow-sm">
              <span class="w-2 h-2 rounded-full bg-amber-600 animate-ping"></span>
              UTTHARA SOLUTIONS Industrial AI Platform
            </div>

            <h1 class="text-4xl lg:text-5xl font-black text-amber-950 leading-tight tracking-tight">
              AI-Powered Operating System for <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800">Smart Manufacturing</span>
            </h1>

            <p class="text-base text-slate-700 leading-relaxed">
              UTTHARA SOLUTIONS connects your physical machines, Industrial IoT sensors, shop floor telemetry, SOP manuals, and AI intelligence into one unified operating system designed specifically for MSMEs and industrial enterprises.
            </p>

            <div class="flex flex-wrap gap-4 pt-2">
              <a href="#public-book-demo" class="btn btn-primary btn-lg shadow-md">
                <i data-lucide="calendar" class="w-5 h-5"></i>
                Book a Demo
              </a>
              <a href="#public-platform" class="btn btn-secondary btn-lg shadow-sm">
                <i data-lucide="box" class="w-5 h-5 text-amber-800"></i>
                Explore Platform
              </a>
            </div>

            <div class="grid grid-cols-3 gap-4 pt-4 border-t border-amber-200/80 text-xs">
              <div><strong class="text-base font-black text-amber-950 block">100%</strong> Multi-Tenant Isolated</div>
              <div><strong class="text-base font-black text-amber-950 block">ESP32 & MQTTS</strong> IoT Bridge Ready</div>
              <div><strong class="text-base font-black text-amber-950 block">3D & 2D</strong> Real-Time Digital Twin</div>
            </div>
          </div>

          <!-- Hero Visual Diagram -->
          <div class="lg:col-span-5">
            <div class="fv-card p-6 bg-gradient-to-br from-white to-amber-50/50 border-amber-300 shadow-xl rounded-2xl relative overflow-hidden">
              <div class="flex items-center justify-between mb-4 pb-3 border-b border-amber-200">
                <span class="text-xs font-black text-amber-900 uppercase tracking-wider font-mono">UTTHARA SOLUTIONS Topology</span>
                <span class="status-badge status-running"><span class="status-dot"></span> Live Pipeline</span>
              </div>

              <div class="flex flex-col gap-3 font-mono text-xs">
                <div class="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <span class="font-bold text-slate-800 flex items-center gap-2"><i data-lucide="hard-drive" class="w-4 h-4 text-amber-700"></i> Physical CNC & Press Machines</span>
                  <span class="text-[10px] font-bold text-emerald-700">Connected</span>
                </div>
                <div class="text-center text-amber-600 font-bold">↓ ESP32 MQTT Stream</div>
                <div class="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <span class="font-bold text-slate-800 flex items-center gap-2"><i data-lucide="activity" class="w-4 h-4 text-purple-700"></i> MPU6050 & PZEM Sensor Telemetry</span>
                  <span class="text-[10px] font-bold text-sky-700">Streaming</span>
                </div>
                <div class="text-center text-amber-600 font-bold">↓ Spatial 3D WebGL Matrix</div>
                <div class="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <span class="font-bold text-slate-800 flex items-center gap-2"><i data-lucide="box" class="w-4 h-4 text-sky-700"></i> 3D Digital Twin Engine</span>
                  <span class="text-[10px] font-bold text-purple-700">Active</span>
                </div>
                <div class="text-center text-amber-600 font-bold">↓ RAG Vector Knowledge Base</div>
                <div class="p-3 bg-amber-100 rounded-xl border border-amber-300 shadow-sm flex items-center justify-between">
                  <span class="font-bold text-amber-950 flex items-center gap-2"><i data-lucide="sparkles" class="w-4 h-4 text-amber-700"></i> AI Autonomous Diagnostics</span>
                  <span class="text-[10px] font-extrabold text-amber-900">Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. Problem Section -->
      <section class="max-w-7xl mx-auto w-full px-6">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span class="text-xs font-extrabold uppercase tracking-wider text-amber-800 font-mono">The Manufacturing Challenge</span>
          <h2 class="text-3xl font-extrabold text-amber-950 mt-1">Common Problems Facing Modern MSME Factories</h2>
          <p class="text-xs text-slate-600 mt-2">Traditional factories lose up to 25% of operating capacity due to fragmented data and reactive management.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="fv-card">
            <div class="w-10 h-10 rounded-xl bg-red-100 border border-red-300 flex items-center justify-center mb-3">
              <i data-lucide="alert-triangle" class="w-5 h-5 text-red-700"></i>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-1">Unexpected Downtime</h3>
            <p class="text-xs text-slate-600">Spindle failures and hydraulic pump breakdowns occur without warning, halting production lines for days.</p>
          </div>

          <div class="fv-card">
            <div class="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center mb-3">
              <i data-lucide="file-spreadsheet" class="w-5 h-5 text-amber-700"></i>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-1">Dependence on Spreadsheets</h3>
            <p class="text-xs text-slate-600">Production logs and maintenance records are scattered across paper logbooks and disconnected Excel sheets.</p>
          </div>

          <div class="fv-card">
            <div class="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center mb-3">
              <i data-lucide="eye-off" class="w-5 h-5 text-amber-700"></i>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-1">Limited Machine Visibility</h3>
            <p class="text-xs text-slate-600">Plant managers lack real-time visibility into machine health, operating temperature, and vibration limits.</p>
          </div>

          <div class="fv-card">
            <div class="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center mb-3">
              <i data-lucide="gauge" class="w-5 h-5 text-amber-700"></i>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-1">Delayed OEE Calculations</h3>
            <p class="text-xs text-slate-600">Overall Equipment Effectiveness is calculated days after shifts end, preventing real-time bottleneck correction.</p>
          </div>

          <div class="fv-card">
            <div class="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center mb-3">
              <i data-lucide="book-open" class="w-5 h-5 text-amber-700"></i>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-1">Lost SOP Manuals & Drawers</h3>
            <p class="text-xs text-slate-600">Maintenance technicians struggle to find OEM equipment manuals, wiring diagrams, and spare parts specs.</p>
          </div>

          <div class="fv-card">
            <div class="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center mb-3">
              <i data-lucide="boxes" class="w-5 h-5 text-amber-700"></i>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-1">Spare Parts Uncertainty</h3>
            <p class="text-xs text-slate-600">Critical replacement bearings and encoders run out of stock during emergency repair cycles.</p>
          </div>
        </div>
      </section>

      <!-- 3. Solution Pipeline Section -->
      <section class="bg-amber-100/50 py-12 px-6 rounded-3xl border border-amber-200 max-w-7xl mx-auto w-full">
        <div class="text-center max-w-3xl mx-auto mb-10">
          <span class="text-xs font-extrabold uppercase tracking-wider text-amber-800 font-mono">The UTTHARA SOLUTIONS Solution Architecture</span>
          <h2 class="text-3xl font-extrabold text-amber-950 mt-1">From Raw Machine Data to Autonomous Action</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-7 gap-3 text-center">
          <div class="p-4 bg-white rounded-xl border border-amber-200 shadow-sm flex flex-col justify-center items-center">
            <span class="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center mb-2">1</span>
            <strong class="text-xs font-bold text-slate-900 block">Factory Data</strong>
            <span class="text-[10px] text-slate-500 mt-1">PLCs & Sensors</span>
          </div>
          <div class="hidden md:flex items-center justify-center text-amber-600 font-bold">→</div>
          <div class="p-4 bg-white rounded-xl border border-amber-200 shadow-sm flex flex-col justify-center items-center">
            <span class="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center mb-2">2</span>
            <strong class="text-xs font-bold text-slate-900 block">Industrial IoT</strong>
            <span class="text-[10px] text-slate-500 mt-1">ESP32 MQTT Gateway</span>
          </div>
          <div class="hidden md:flex items-center justify-center text-amber-600 font-bold">→</div>
          <div class="p-4 bg-white rounded-xl border border-amber-200 shadow-sm flex flex-col justify-center items-center">
            <span class="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center mb-2">3</span>
            <strong class="text-xs font-bold text-slate-900 block">Digital Twin</strong>
            <span class="text-[10px] text-slate-500 mt-1">3D WebGL Matrix</span>
          </div>
          <div class="hidden md:flex items-center justify-center text-amber-600 font-bold">→</div>
          <div class="p-4 bg-amber-700 text-white rounded-xl border border-amber-800 shadow-md flex flex-col justify-center items-center">
            <span class="w-8 h-8 rounded-full bg-yellow-400 text-amber-950 font-black text-xs flex items-center justify-center mb-2">4</span>
            <strong class="text-xs font-bold block">AI Intelligence</strong>
            <span class="text-[10px] text-amber-100 mt-1">UTTHARA Copilot</span>
          </div>
        </div>
      </section>

      <!-- 4. CTA Section -->
      <section class="max-w-7xl mx-auto w-full px-6">
        <div class="p-10 rounded-3xl bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h2 class="text-2xl lg:text-3xl font-extrabold mb-2">Ready to Transform Your Manufacturing Plant?</h2>
            <p class="text-xs text-amber-100 max-w-xl">Schedule an operational demo with UTTHARA SOLUTIONS engineering specialists today.</p>
          </div>
          <a href="#public-book-demo" class="btn btn-secondary btn-lg shadow-lg whitespace-nowrap">
            <i data-lucide="calendar" class="w-5 h-5 text-amber-800"></i>
            Book a Plant Demo
          </a>
        </div>
      </section>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.Router.register('public-home', renderPublicHomePage);
