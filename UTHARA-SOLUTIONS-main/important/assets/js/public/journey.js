/**
 * UTTHARA SOLUTIONS - Public Customer Journey Page (20-Step Visual Pipeline)
 * Developed by UTTHARA SOLUTIONS
 */

function renderPublicJourneyPage(container) {
  const steps = [
    'Customer discovers UTTHARA SOLUTIONS platform',
    'Customer submits Book a Demo request',
    'UTTHARA Sales team reviews lead requirements',
    'Sales representative contacts customer',
    'Technical discussion & scope alignment',
    'Manufacturing requirements assessment',
    'Factory plant information collection',
    'UTTHARA technical engineering site visit',
    'Machine OEM documentation & manual audit',
    'Factory structure mapping (Building → Line)',
    'IoT hardware & Wi-Fi mesh assessment',
    'System tenant configuration in UTTHARA SOLUTIONS',
    'Customer organization onboarding initialized',
    'User accounts & RBAC permissions assigned',
    'Factory data & shift rosters configured',
    'Machines registered & criticality assigned',
    'Machine Digital Passports created',
    'ESP32 IoT telemetry integration deployed',
    'AI RAG knowledge base & SOPs indexed',
    'Customer begins using Autonomous UTTHARA SOLUTIONS OS'
  ];

  container.innerHTML = `
    <div class="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col gap-12">
      <div class="text-center max-w-3xl mx-auto">
        <span class="text-xs font-extrabold uppercase tracking-wider text-amber-800 font-mono">End-to-End Execution</span>
        <h1 class="text-4xl font-extrabold text-amber-950 mt-1">20-Step Customer Onboarding Lifecycle</h1>
        <p class="text-xs text-slate-600 mt-2">From initial demo request to live 3D Digital Twin and AI copilot deployment.</p>
      </div>

      <!-- 20-Step Stepper Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        ${steps.map((stepText, idx) => `
          <div class="fv-card p-4 flex gap-3 items-start border-amber-200">
            <span class="w-7 h-7 rounded-lg bg-amber-600 text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0">
              ${idx + 1}
            </span>
            <p class="text-xs font-bold text-slate-800 leading-snug">${stepText}</p>
          </div>
        `).join('')}
      </div>

      <div class="fv-card p-8 text-center flex flex-col items-center gap-4 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-amber-300">
        <h2 class="text-2xl font-bold text-amber-950">Start Step 1 Today</h2>
        <p class="text-xs text-slate-600 max-w-xl">Request a personalized demonstration for your manufacturing facility.</p>
        <a href="#public-book-demo" class="btn btn-primary btn-lg shadow-md">
          <i data-lucide="calendar" class="w-5 h-5"></i>
          Begin Onboarding Journey — Book Demo
        </a>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.Router.register('public-journey', renderPublicJourneyPage);
