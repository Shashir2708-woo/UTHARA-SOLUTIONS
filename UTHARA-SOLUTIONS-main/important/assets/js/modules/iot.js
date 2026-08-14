/**
 * UTTHARA SOLUTIONS - Industrial Telemetry & IoT Gateways Module (Classic Silver & White)
 * Developed by UTTHARA SOLUTIONS
 */

function renderIoTModule(container) {
  const org = window.Auth.getCurrentOrg();
  const devices = window.FVDB.getIoTDevices(org.id);

  container.innerHTML = `
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
            <i data-lucide="activity" class="w-5 h-5 text-purple-600"></i>
            Industrial Telemetry & IoT Gateways
          </h1>
          <p class="text-xs text-slate-600 mt-1">ESP32 gateway nodes, sensor calibration, MQTT topic streaming, and threshold monitoring.</p>
        </div>
        <button class="btn btn-primary btn-sm shadow-sm" onclick="window.Toast.show('MQTT Bridge', 'New ESP32 Gateway Node paired successfully.', 'success')">
          + Add IoT Gateway Node
        </button>
      </div>

      <!-- Live Stream Chart Container -->
      <div class="fv-card">
        <div class="fv-card-header">
          <div class="fv-card-title text-slate-900">
            <i data-lucide="line-chart" class="w-5 h-5 text-sky-600"></i>
            Live Vibration & Temperature Telemetry (ESP32 Node 01)
          </div>
          <span class="status-badge status-running">
            <span class="status-dot"></span> MQTT Streaming: 100ms
          </span>
        </div>
        <div class="w-full h-64 bg-slate-50 rounded p-4 border border-slate-200">
          <canvas id="telemetry-live-chart"></canvas>
        </div>
      </div>

      <!-- IoT Devices Table -->
      <div class="fv-card">
        <div class="fv-card-header">
          <div class="fv-card-title text-slate-900">
            <i data-lucide="cpu" class="w-5 h-5 text-purple-600"></i>
            Registered IoT Edge Devices
          </div>
        </div>

        <div class="table-container">
          <table class="fv-table">
            <thead>
              <tr>
                <th>Device Name</th>
                <th>Hardware Model</th>
                <th>IP / MAC Address</th>
                <th>Connected Machine</th>
                <th>Sensors</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${devices.map(d => `
                <tr>
                  <td class="font-bold text-slate-900">${d.deviceName}</td>
                  <td class="text-slate-600 font-mono text-xs">${d.deviceType} (${d.firmwareVersion})</td>
                  <td class="text-slate-600 font-mono text-xs">${d.ipAddress} <br/> <span class="text-slate-500">${d.macAddress}</span></td>
                  <td class="text-slate-800 text-xs font-semibold">Haas VF-4SS CNC (mac_cnc_01)</td>
                  <td class="text-xs">
                    ${d.sensors.map(s => `
                      <span class="inline-block px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-[11px] font-mono mr-1 mb-1">
                        ${s.type}: <strong class="${s.status === 'Warning' ? 'text-amber-700' : 'text-emerald-700'}">${s.currentVal} ${s.unit}</strong>
                      </span>
                    `).join('')}
                  </td>
                  <td>
                    <span class="status-badge status-running">
                      <span class="status-dot"></span> ${d.connectivityStatus}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  setTimeout(() => {
    initChartJS();
  }, 100);
}

function initChartJS() {
  const ctx = document.getElementById('telemetry-live-chart');
  if (!ctx || typeof Chart === 'undefined') return;

  const labels = ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30'];
  const vibData = [1.2, 1.4, 1.3, 1.8, 3.2, 4.5, 4.8];
  const tempData = [42, 44, 45, 52, 58, 65, 68.4];

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Vibration (MPU6050 mm/s)',
          data: vibData,
          borderColor: '#0284c7',
          backgroundColor: 'rgba(2, 132, 199, 0.1)',
          fill: true,
          tension: 0.3
        },
        {
          label: 'Temperature (DHT22 °C)',
          data: tempData,
          borderColor: '#d97706',
          backgroundColor: 'rgba(217, 119, 6, 0.1)',
          fill: true,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { color: '#e2e8f0' }, ticks: { color: '#475569' } },
        y: { grid: { color: '#e2e8f0' }, ticks: { color: '#475569' } }
      },
      plugins: {
        legend: { labels: { color: '#0f172a' } }
      }
    }
  });
}

window.Router.register('iot', renderIoTModule);
