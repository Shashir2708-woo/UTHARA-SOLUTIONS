/**
 * UTTHARA SOLUTIONS - Public Industries Page (10 Manufacturing Sectors)
 * Developed by UTTHARA SOLUTIONS
 */

function renderPublicIndustriesPage(container) {
  const industryCategories = [
    { title: 'Automotive Components', desc: 'Precision CNC machining, robotic welding cells, and stamping press line OEE tracking.' },
    { title: 'Engineering & Machinery', desc: '5-axis milling machine vibration analytics and heavy press hydraulic filter monitoring.' },
    { title: 'Textile & Garments', desc: 'High-speed loom tension sensor telemetry and spinning machine motor thermal protection.' },
    { title: 'Pharmaceutical Manufacturing', desc: 'Batch filling line speed monitoring, tablet press pressure sensors, and cleanroom SOP compliance.' },
    { title: 'Food & Beverage Processing', desc: 'Mixer torque monitoring, pasteurization thermal logs, and packaging line bottleneck detection.' },
    { title: 'Electronics & Assemblies', desc: 'SMT pick-and-place nozzle vibration checks and PCB soldering defect rate reduction.' },
    { title: 'Plastics & Injection Molding', desc: 'Molding machine barrel temperature control, hydraulic pressure monitoring, and cycle time optimization.' },
    { title: 'Packaging & Paper Products', desc: 'Corrugation roller alignment sensors and high-speed box cutter maintenance work orders.' },
    { title: 'Chemical Manufacturing', desc: 'Reactor vessel pressure monitoring, pump motor current draw metering, and safety SOP indexing.' },
    { title: 'General MSME Manufacturing', desc: 'Flexible machine passport identity, low-cost ESP32 IoT bridging, and multi-tenant cloud SaaS.' }
  ];

  container.innerHTML = `
    <div class="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col gap-12">
      <div class="text-center max-w-3xl mx-auto">
        <span class="text-xs font-extrabold uppercase tracking-wider text-amber-800 font-mono">Tailored Solutions</span>
        <h1 class="text-4xl font-extrabold text-amber-950 mt-1">Smart Manufacturing for 10 Industrial Sectors</h1>
        <p class="text-xs text-slate-600 mt-2">UTTHARA SOLUTIONS is architected to fit diverse manufacturing processes across discrete and continuous production environments.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${industryCategories.map(ind => `
          <div class="fv-card p-6">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center">
                <i data-lucide="factory" class="w-4 h-4 text-amber-800"></i>
              </div>
              <h3 class="text-base font-bold text-amber-950">${ind.title}</h3>
            </div>
            <p class="text-xs text-slate-600">${ind.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.Router.register('public-industries', renderPublicIndustriesPage);
