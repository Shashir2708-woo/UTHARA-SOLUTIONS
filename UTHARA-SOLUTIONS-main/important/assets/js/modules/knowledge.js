/**
 * UTTHARA SOLUTIONS - Knowledge Base & SOP Repository Module (Classic Silver & White)
 * Developed by UTTHARA SOLUTIONS
 */

function renderKnowledgeModule(container) {
  const org = window.Auth.getCurrentOrg();
  const docs = window.FVDB.getKnowledgeDocs(org.id);

  container.innerHTML = `
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="book-open" class="w-5 h-5 text-sky-600"></i>
            Industrial Knowledge Base & SOP Repository
          </h1>
          <p class="text-xs text-slate-600 mt-1">Machine manuals, maintenance SOPs, safety policies, and RAG vector indexes.</p>
        </div>
        <button class="btn btn-primary btn-sm shadow-sm" onclick="window.Toast.show('Knowledge Base', 'SOP document upload triggered.', 'info')">
          + Upload Industrial Document
        </button>
      </div>

      <div class="grid grid-cols-2 gap-6">
        ${docs.map(d => `
          <div class="fv-card">
            <div class="fv-card-header">
              <span class="text-xs font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-300 font-mono">
                ${d.category}
              </span>
              <span class="text-xs text-slate-500 font-mono">${d.format} (${d.fileSize})</span>
            </div>
            <h3 class="text-base font-bold text-slate-900 mb-2">${d.title}</h3>
            <p class="text-xs text-slate-600 mb-4">Uploaded by <strong class="text-slate-900">${d.uploadedBy}</strong> on ${d.uploadDate}</p>
            <div class="flex flex-wrap gap-1 mb-4">
              ${d.tags.map(t => `<span class="text-[10px] bg-slate-100 border border-slate-300 px-2 py-0.5 rounded text-slate-700 font-mono">#${t}</span>`).join('')}
            </div>
            <div class="flex justify-between items-center pt-3 border-t border-slate-200">
              <span class="text-xs text-emerald-700 font-bold flex items-center gap-1 font-mono">
                <i data-lucide="check" class="w-3.5 h-3.5"></i> Indexed in RAG
              </span>
              <button class="btn btn-secondary btn-sm" onclick="window.Toast.show('Document', 'Opening PDF viewer...', 'info')">
                View Manual →
              </button>
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

window.Router.register('knowledge', renderKnowledgeModule);
