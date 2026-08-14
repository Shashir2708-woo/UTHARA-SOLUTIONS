/**
 * UTTHARA SOLUTIONS - Centralized AI Orchestrator Module (Live Gemini 2.5 Flash Engine)
 * Developed by UTTHARA SOLUTIONS
 */

function formatMarkdownToHTML(text) {
  if (!text) return '';
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-slate-100 text-sky-700 font-mono px-1 py-0.5 rounded text-xs">$1</code>')
    .replace(/^- (.*$)/gim, '<div class="flex items-start gap-2 my-1"><span class="text-sky-600 font-bold">•</span><span>$1</span></div>')
    .replace(/^\* (.*$)/gim, '<div class="flex items-start gap-2 my-1"><span class="text-sky-600 font-bold">•</span><span>$1</span></div>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
  return html;
}

function renderAIModule(container) {
  const org = window.Auth.getCurrentOrg();
  const docs = window.FVDB.getKnowledgeDocs(org.id);

  container.innerHTML = `
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="sparkles" class="w-5 h-5 text-sky-600"></i>
            Factory Agent
          </h1>
          <p class="text-xs text-slate-600 mt-1">Autonomous manufacturing intelligence powered by Google Gemini 2.5 Flash AI Engine & Knowledge RAG Engine.</p>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-xs text-slate-500 font-semibold">Specialist Persona:</span>
          <select id="ai-persona-select" class="form-select text-xs font-bold text-sky-800">
            <option value="AI Manufacturing Assistant">AI Manufacturing Assistant</option>
            <option value="AI Predictive Maintenance Engineer">AI Predictive Maintenance Engineer</option>
            <option value="AI Production Planner">AI Production Planner</option>
            <option value="AI Quality Specialist">AI Quality Specialist</option>
          </select>
        </div>
      </div>

      <!-- AI Assistant Interface Container -->
      <div class="ai-assistant-container">
        <!-- Messages Area -->
        <div id="ai-messages-list" class="ai-chat-messages">
          <div class="chat-message system">
            <div class="chat-avatar ai">FA</div>
            <div class="chat-bubble">
              <span class="font-bold text-sky-900 block mb-1">UTTHARA SOLUTIONS Core Initialized (Google Gemini 2.5 Flash Active)</span>
              Hello! I am your Factory Agent for <strong>${org.displayName}</strong>. I am connected to your live IoT telemetry streams, Machine Digital Passports, Wooden Cutting Machine Digital Twin, and ${docs.length} company SOP documents.
              <br/><br/>
              How can I assist your operations team today?
            </div>
          </div>
        </div>

        <!-- Input Area & Shortcuts -->
        <div class="ai-input-area">
          <div class="ai-prompt-shortcuts">
            <button class="prompt-chip" onclick="window.sendAIPrompt('Analyze Haas VF-4SS CNC Machine thermal anomaly')">
              ⚡ Analyze Haas CNC Anomaly
            </button>
            <button class="prompt-chip" onclick="window.sendAIPrompt('Generate executive OEE summary for Pune Factory')">
              📊 Generate Daily OEE Briefing
            </button>
            <button class="prompt-chip" onclick="window.sendAIPrompt('Explain the Wooden Cutting Machine digital twin sensor layout')">
              🪚 Wooden Cutting Machine Status
            </button>
            <button class="prompt-chip" onclick="window.sendAIPrompt('Check spare parts stock for spindle bearing replacement')">
              🔧 Check Spindle Spare Parts
            </button>
          </div>

          <div class="flex gap-3">
            <input id="ai-user-input" type="text" placeholder="Ask UTTHARA SOLUTIONS about machines, SOPs, OEE, maintenance, or telemetry..." class="form-input flex-1" />
            <button id="ai-submit-btn" class="btn btn-ai shadow-sm">
              <i data-lucide="send" class="w-4 h-4"></i>
              Ask AI
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  const inputElem = document.getElementById('ai-user-input');
  const submitBtn = document.getElementById('ai-submit-btn');

  const triggerSend = () => {
    const val = inputElem.value.trim();
    if (val) {
      inputElem.value = '';
      window.sendAIPrompt(val);
    }
  };

  submitBtn.addEventListener('click', triggerSend);

  inputElem.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      triggerSend();
    }
  });
}

window.sendAIPrompt = async function(text) {
  const msgList = document.getElementById('ai-messages-list');
  if (!msgList) return;

  // Append User Message
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-message user';
  userMsg.innerHTML = `
    <div class="chat-avatar user">ME</div>
    <div class="chat-bubble">${text}</div>
  `;
  msgList.appendChild(userMsg);
  msgList.scrollTop = msgList.scrollHeight;

  // Persona Selector
  const personaSelect = document.getElementById('ai-persona-select');
  const persona = personaSelect ? personaSelect.value : 'AI Manufacturing Assistant';

  // Append Typing / Thinking Indicator
  const loadingMsg = document.createElement('div');
  loadingMsg.className = 'chat-message system';
  loadingMsg.id = 'ai-loading-msg';
  loadingMsg.innerHTML = `
    <div class="chat-avatar ai">FA</div>
    <div class="chat-bubble flex items-center gap-2 text-slate-500 font-semibold text-xs">
      <span class="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
      <span>Factory Agent is thinking...</span>
    </div>
  `;
  msgList.appendChild(loadingMsg);
  msgList.scrollTop = msgList.scrollHeight;

  try {
    // Fetch AI Response
    const aiResult = await window.API.queryAI(text, persona);

    // Remove loading indicator
    const loadingElem = document.getElementById('ai-loading-msg');
    if (loadingElem) loadingElem.remove();

    // Append AI Response
    const aiMsg = document.createElement('div');
    aiMsg.className = 'chat-message system';
    aiMsg.innerHTML = `
      <div class="chat-avatar ai">FA</div>
      <div class="chat-bubble">
        <div class="font-bold text-sky-800 text-xs mb-1">${aiResult.persona || persona}</div>
        <div class="text-slate-800 text-xs leading-relaxed">
          ${formatMarkdownToHTML(aiResult.response)}
        </div>
        <div class="mt-3 pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
          <i data-lucide="file-text" class="w-3 h-3 text-sky-600"></i>
          Sources: ${aiResult.sourcesUsed ? aiResult.sourcesUsed.join(', ') : 'Internal Telemetry DB'}
        </div>
      </div>
    `;
    msgList.appendChild(aiMsg);
    msgList.scrollTop = msgList.scrollHeight;
  } catch (err) {
    console.error('AI Query failed:', err);
    const loadingElem = document.getElementById('ai-loading-msg');
    if (loadingElem) loadingElem.remove();

    const errMsg = document.createElement('div');
    errMsg.className = 'chat-message system';
    errMsg.innerHTML = `
      <div class="chat-avatar ai">FA</div>
      <div class="chat-bubble text-red-600 font-semibold text-xs">
        An error occurred while connecting to the AI engine. Please try again.
      </div>
    `;
    msgList.appendChild(errMsg);
    msgList.scrollTop = msgList.scrollHeight;
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
};

window.Router.register('ai', renderAIModule);
