/**
 * UTTHARA SOLUTIONS - Public Contact Page
 * Developed by UTTHARA SOLUTIONS
 */

function renderPublicContactPage(container) {
  container.innerHTML = `
    <div class="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col gap-12">
      <div class="text-center max-w-3xl mx-auto">
        <span class="text-xs font-extrabold uppercase tracking-wider text-amber-800 font-mono">Get in Touch</span>
        <h1 class="text-4xl font-extrabold text-amber-950 mt-1">Contact UTTHARA SOLUTIONS</h1>
        <p class="text-xs text-slate-600 mt-2">Have technical inquiries, custom PLC requirements, or partnership requests?</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div class="md:col-span-5 fv-card p-8">
          <h2 class="text-xl font-extrabold text-amber-950 mb-4">Corporate Office</h2>
          <div class="space-y-4 text-xs text-slate-700">
            <div class="flex items-start gap-3">
              <i data-lucide="building" class="w-5 h-5 text-amber-800 flex-shrink-0"></i>
              <div>
                <strong class="text-slate-900 block font-bold">UTTHARA SOLUTIONS PRIVATE LIMITED</strong>
                Industrial AI & Smart Manufacturing Division
              </div>
            </div>
            <div class="flex items-start gap-3">
              <i data-lucide="mail" class="w-5 h-5 text-amber-800 flex-shrink-0"></i>
              <div>
                <strong class="text-slate-900 block font-bold">Email Inquiries</strong>
                contact@uttharasolutions.com | sales@factoryverse.ai
              </div>
            </div>
            <div class="flex items-start gap-3">
              <i data-lucide="phone" class="w-5 h-5 text-amber-800 flex-shrink-0"></i>
              <div>
                <strong class="text-slate-900 block font-bold">Direct Line</strong>
                +91 (080) 4120-9988 / +91 98800 12345
              </div>
            </div>
          </div>
        </div>

        <div class="md:col-span-7 fv-card p-8">
          <h2 class="text-xl font-extrabold text-amber-950 mb-4">Send Us a Direct Message</h2>
          <form id="contact-form" onsubmit="event.preventDefault(); window.handleContactSubmit();">
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input type="text" id="contact-name" class="form-input" required placeholder="e.g. Anand Kumar" />
              </div>
              <div class="form-group">
                <label class="form-label">Work Email *</label>
                <input type="email" id="contact-email" class="form-input" required placeholder="anand@company.com" />
              </div>
            </div>
            <div class="form-group">
              <div class="form-label">Company Name *</div>
              <input type="text" id="contact-company" class="form-input" required placeholder="Your Company Name" />
            </div>
            <div class="form-group">
              <label class="form-label">Message *</label>
              <textarea id="contact-msg" rows="4" class="form-textarea" required placeholder="Tell us about your manufacturing plant or inquiry..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-md shadow-md mt-2">
              <i data-lucide="send" class="w-4 h-4"></i>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  window.handleContactSubmit = function() {
    window.Toast.show('Contact Request', 'Thank you! Your message has been sent to UTTHARA SOLUTIONS.', 'success');
    document.getElementById('contact-form').reset();
  };
}

window.Router.register('public-contact', renderPublicContactPage);
