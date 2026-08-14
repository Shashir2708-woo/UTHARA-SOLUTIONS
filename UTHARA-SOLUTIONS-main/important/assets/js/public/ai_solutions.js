/**
 * UTTHARA SOLUTIONS - Public AI Solutions & Personas Page
 * Developed by UTTHARA SOLUTIONS
 */

function renderPublicAISolutionsPage(container) {
  const aiPersonas = [
    { title: 'AI Manufacturing Assistant', purpose: 'General plant operations Q&A and SOP document search.', questions: ['How do I reset spindle alarm on Haas VF-4SS?', 'What is the daily target for Line B?'], perm: 'All Operator Roles' },
    { title: 'AI Predictive Maintenance Engineer', purpose: 'Vibration & thermal risk scoring and PM work order generation.', questions: ['Analyze bearing vibration on CNC Spindle 01', 'Predict remaining useful life of hydraulic press pump.'], perm: 'Maintenance Engineer+' },
    { title: 'AI Production Planner', purpose: 'Shift bottleneck detection, OEE optimization, and line balancing.', questions: ['Why is Line C running at 76.8% OEE?', 'Suggest line balancing for shift 2.'], perm: 'Production Manager+' },
    { title: 'AI Quality Specialist', purpose: 'Tolerance deviation tracking and CMM laser probe defect analysis.', questions: ['Summarize defect rate for crankshaft housing batch B-991.'], perm: 'Quality Inspector+' },
    { title: 'AI Inventory Manager', purpose: 'Spare parts reorder prediction and warehouse stock tracking.', questions: ['Do we have spare servo motor encoders in stock for KUKA arm?'], perm: 'Inventory Manager+' },
    { title: 'AI HR Assistant', purpose: 'Shift roster allocation, operator skill matrix, and safety training logs.', questions: ['Show certified CNC operators available for Shift B.'], perm: 'HR Manager+' },
    { title: 'AI Finance Assistant', purpose: 'Financial downtime cost calculation and energy bill analytics.', questions: ['What was the cost of unplanned downtime on Line A yesterday?'], perm: 'Finance / Managing Director' },
    { title: 'AI Operations Copilot', purpose: 'Executive plant health briefing and cross-department intelligence.', questions: ['Generate 30-second executive briefing for morning board meeting.'], perm: 'Executive Board' },
    { title: 'AI Digital Twin Intelligence', purpose: 'Spatial node anomaly correlation on 3D WebGL plant floor map.', questions: ['Highlight machines exceeding 65°C on 3D floorplan.'], perm: 'Plant Head' },
    { title: 'AI IoT Intelligence', purpose: 'ESP32 MQTT stream diagnostics, sensor calibration & packet loss monitoring.', questions: ['Verify gateway node IP 192.168.1.105 packet delivery rate.'], perm: 'IoT System Admin' }
  ];

  container.innerHTML = `
    <div class="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col gap-12">
      <div class="text-center max-w-3xl mx-auto">
        <span class="text-xs font-extrabold uppercase tracking-wider text-amber-800 font-mono">Specialized AI Engine</span>
        <h1 class="text-4xl font-extrabold text-amber-950 mt-1">10 Domain-Specific AI Industrial Personas</h1>
        <p class="text-xs text-slate-600 mt-2">UTTHARA SOLUTIONS uses targeted industrial copilots rather than a generic chatbot—each equipped with specialized RAG context and RBAC permissions.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${aiPersonas.map(ai => `
          <div class="fv-card p-6">
            <div class="flex justify-between items-start mb-3">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center">
                  <i data-lucide="bot" class="w-5 h-5 text-amber-800"></i>
                </div>
                <h3 class="text-base font-extrabold text-amber-950">${ai.title}</h3>
              </div>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-mono">${ai.perm}</span>
            </div>

            <p class="text-xs text-slate-700 mb-3"><strong class="text-slate-900">Purpose:</strong> ${ai.purpose}</p>

            <div class="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs">
              <span class="text-[10px] font-extrabold text-amber-900 block mb-1 uppercase tracking-wider font-mono">Sample RAG Queries:</span>
              <ul class="list-disc list-inside text-slate-600 space-y-1 text-[11px]">
                ${ai.questions.map(q => `<li>"${q}"</li>`).join('')}
              </ul>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.Router.register('public-ai', renderPublicAISolutionsPage);
