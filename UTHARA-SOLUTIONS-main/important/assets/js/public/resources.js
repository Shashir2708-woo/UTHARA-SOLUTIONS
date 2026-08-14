/**
 * UTTHARA SOLUTIONS - Public Resources & Whitepapers Page
 * Developed by UTTHARA SOLUTIONS
 */

function renderPublicResourcesPage(container) {
  const resourceDocs = [
    { title: 'MSME Digital Transformation Playbook', cat: 'Guide', desc: 'Step-by-step roadmap for Indian manufacturing plants adopting IoT & AI OS.' },
    { title: 'ESP32 MQTT Hardware Wiring Guide', cat: 'Technical SOP', desc: 'Circuit schematics for MPU6050, DHT22, and PZEM energy meters.' },
    { title: 'Predictive Maintenance vs Preventative Maintenance', cat: 'Whitepaper', desc: 'Financial ROI comparison across 120 industrial manufacturing plants.' },
    { title: 'OEE Optimization Handbook for CNC Machining', cat: 'Best Practice', desc: 'Eliminating speed throttling and spindle thermal degradation.' }
  ];

  container.innerHTML = `
    <div class="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col gap-12">
      <div class="text-center max-w-3xl mx-auto">
        <span class="text-xs font-extrabold uppercase tracking-wider text-amber-800 font-mono">Knowledge Repository</span>
        <h1 class="text-4xl font-extrabold text-amber-950 mt-1">Manufacturing Guides & Whitepapers</h1>
        <p class="text-xs text-slate-600 mt-2">Technical documentation, SOP guides, and industrial IoT architecture playbooks by UTTHARA SOLUTIONS.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${resourceDocs.map(r => `
          <div class="fv-card p-6 flex flex-col justify-between">
            <div>
              <span class="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 block w-fit mb-2">${r.cat}</span>
              <h3 class="text-base font-bold text-amber-950 mb-1">${r.title}</h3>
              <p class="text-xs text-slate-600 mb-4">${r.desc}</p>
            </div>
            <button class="btn btn-secondary btn-sm w-fit" onclick="window.Toast.show('Resource Download', 'Opening technical guide PDF...', 'info')">
              Download PDF Guide →
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.Router.register('public-resources', renderPublicResourcesPage);
