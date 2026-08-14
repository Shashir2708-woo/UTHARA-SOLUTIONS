/**
 * UTTHARA SOLUTIONS - Public Industrial IoT Architecture Page
 * Developed by UTTHARA SOLUTIONS
 */

function renderPublicIoTPage(container) {
  const sensorList = [
    { name: 'MPU6050 6-DOF Gyro & Accelerometer', purpose: 'Spindle vibration frequency & tilt analysis' },
    { name: 'DHT22 / DS18B20 Thermal Sensors', purpose: 'Machine core & ambient temperature monitoring' },
    { name: 'PZEM-004T Energy Meter Module', purpose: 'Voltage, Current, Active Power (kW) & kWh metering' },
    { name: 'ACS712 Current Transducer', purpose: 'Motor current draw & load spike detection' },
    { name: 'ESP32 Wi-Fi / Ethernet Microcontroller', purpose: 'Edge telemetry processing & MQTTS bridging' },
    { name: 'Modbus TCP / RTU PLC Gateways', purpose: 'Siemens S7, Allen-Bradley & Fanuc PLC connectivity' }
  ];

  container.innerHTML = `
    <div class="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col gap-12">
      <div class="text-center max-w-3xl mx-auto">
        <span class="text-xs font-extrabold uppercase tracking-wider text-amber-800 font-mono">Hardware & Edge Gateway Architecture</span>
        <h1 class="text-4xl font-extrabold text-amber-950 mt-1">Industrial IoT & Sensor Integration</h1>
        <p class="text-xs text-slate-600 mt-2">Plug-and-play ESP32 edge gateways, industrial sensor protocols, and encrypted MQTTS data pipelines.</p>
      </div>

      <!-- Conceptual Data Flow Diagram -->
      <div class="fv-card p-8 bg-gradient-to-br from-white to-amber-50/50 border-amber-300">
        <h2 class="text-xl font-extrabold text-amber-950 mb-6 text-center">IoT Sensor Data Flow</h2>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 text-center text-xs font-mono">
          <div class="p-4 bg-white rounded-xl border border-amber-200 shadow-sm"><strong class="text-amber-900 block text-sm font-black mb-1">1. Sensors</strong>MPU6050, DHT22, PZEM</div>
          <div class="p-4 bg-white rounded-xl border border-amber-200 shadow-sm"><strong class="text-amber-900 block text-sm font-black mb-1">2. ESP32 Gateway</strong>Edge Filtering</div>
          <div class="p-4 bg-white rounded-xl border border-amber-200 shadow-sm"><strong class="text-amber-900 block text-sm font-black mb-1">3. MQTTS Broker</strong>Encrypted Stream</div>
          <div class="p-4 bg-amber-100 rounded-xl border border-amber-300 shadow-sm"><strong class="text-amber-950 block text-sm font-black mb-1">4. UTTHARA SOLUTIONS</strong>Real-Time Analytics</div>
          <div class="p-4 bg-amber-700 text-white rounded-xl border border-amber-800 shadow-md"><strong class="text-white block text-sm font-black mb-1">5. AI Action</strong>Alerts & Work Orders</div>
        </div>
      </div>

      <!-- Supported Sensor Hardware Grid -->
      <div>
        <h2 class="text-xl font-bold text-amber-950 mb-4">Supported Industrial Sensor Modules</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${sensorList.map(s => `
            <div class="fv-card p-5">
              <span class="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 mb-2 inline-block">SENSING NODE</span>
              <h3 class="text-sm font-bold text-slate-900 mb-1">${s.name}</h3>
              <p class="text-xs text-slate-600">${s.purpose}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.Router.register('public-iot', renderPublicIoTPage);
