/**
 * UTTHARA SOLUTIONS - Core Database State Engine & Seed Data
 * Developed by UTTHARA SOLUTIONS
 * Multi-Tenant Data Foundation & Relational Schema Engine
 */

class UttharaSolutionsDB {
  constructor() {
    this.storageKey = 'factoryverse_ai_db_v3';
    this.init();
  }

  init() {
    const existing = localStorage.getItem(this.storageKey);
    if (existing) {
      try {
        this.data = JSON.parse(existing);
        return;
      } catch (e) {
        console.warn('Failed to parse existing DB, re-seeding...', e);
      }
    }

    this.data = this.getInitialSeedData();
    this.save();
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (e) {
      console.error('LocalStorage write failed:', e);
    }
  }

  reset() {
    this.data = this.getInitialSeedData();
    this.save();
  }

  getInitialSeedData() {
    return {
      organizations: [
        {
          id: 'org_apex',
          legalName: 'Apex Industrial Motors Pvt Ltd',
          displayName: 'Apex Industrial Motors',
          industry: 'Automotive & Heavy Powertrain',
          companySize: '500-1000',
          contactEmail: 'operations@apexindustrial.com',
          subscriptionPlan: 'Enterprise AI OS',
          subscriptionStatus: 'Active',
          onboardingStatus: 'Completed',
          createdAt: '2025-01-15'
        },
        {
          id: 'org_titan',
          legalName: 'Titan Dynamics Heavy Forge Corp',
          displayName: 'Titan Dynamics Forge',
          industry: 'Aerospace & Industrial Forging',
          companySize: '250-500',
          contactEmail: 'contact@titandynamics.io',
          subscriptionPlan: 'Professional Manufacturing',
          subscriptionStatus: 'Active',
          onboardingStatus: 'Completed',
          createdAt: '2025-03-10'
        }
      ],

      users: [
        {
          id: 'usr_001',
          orgId: 'org_apex',
          name: 'Vikram Utthara',
          email: 'vikram@apexindustrial.com',
          role: 'Founder / Managing Director',
          department: 'Executive Board',
          status: 'Active',
          lastLogin: '2026-08-11 10:14:02'
        },
        {
          id: 'usr_002',
          orgId: 'org_apex',
          name: 'Ananya Sharma',
          email: 'ananya.s@apexindustrial.com',
          role: 'Factory Manager',
          department: 'Factory Operations',
          status: 'Active',
          lastLogin: '2026-08-11 09:30:15'
        },
        {
          id: 'usr_003',
          orgId: 'org_apex',
          name: 'Rajesh K. Kumar',
          email: 'rajesh.k@apexindustrial.com',
          role: 'Maintenance Lead Engineer',
          department: 'Plant Maintenance',
          status: 'Active',
          lastLogin: '2026-08-11 08:45:00'
        },
        {
          id: 'usr_004',
          orgId: 'org_apex',
          name: 'Priya Verma',
          email: 'priya.v@apexindustrial.com',
          role: 'Quality Control Manager',
          department: 'Quality Assurance',
          status: 'Active',
          lastLogin: '2026-08-11 11:02:44'
        },
        {
          id: 'usr_005',
          orgId: 'org_apex',
          name: 'Suresh Raina',
          email: 'suresh.r@apexindustrial.com',
          role: 'Line Operator',
          department: 'Stamping Line A',
          status: 'Active',
          lastLogin: '2026-08-11 07:00:00'
        },
        {
          id: 'usr_006',
          orgId: 'org_titan',
          name: 'Marcus Vance',
          email: 'm.vance@titandynamics.io',
          role: 'Managing Director',
          department: 'Corporate',
          status: 'Active',
          lastLogin: '2026-08-11 09:12:00'
        }
      ],

      factories: [
        {
          id: 'fac_apex_pune',
          orgId: 'org_apex',
          name: 'GigaFactory 01 - Pune Hub',
          location: 'Chakan Industrial Zone, Pune, India',
          type: 'Heavy Automated Assembly',
          status: 'Operational',
          operatingHours: '24/7 (3 Shifts)',
          departmentsCount: 4,
          linesCount: 6,
          machinesCount: 18
        },
        {
          id: 'fac_apex_blr',
          orgId: 'org_apex',
          name: 'SmartPlant Alpha - Bengaluru',
          location: 'Peenya Industrial Area, Bengaluru, India',
          type: 'Precision Robotics & Electronics',
          status: 'Operational',
          operatingHours: '16/6 (2 Shifts)',
          departmentsCount: 3,
          linesCount: 4,
          machinesCount: 12
        },
        {
          id: 'fac_titan_guj',
          orgId: 'org_titan',
          name: 'Titan Heavy Forge Facility - Gujarat',
          location: 'Sanand GIDC, Gujarat, India',
          type: 'High Precision Aerospace Forging',
          status: 'Operational',
          operatingHours: '24/7',
          departmentsCount: 3,
          linesCount: 3,
          machinesCount: 10
        }
      ],

      departments: [
        { id: 'dept_stamping', factoryId: 'fac_apex_pune', name: 'Heavy Stamping & Pressing', manager: 'Ananya Sharma' },
        { id: 'dept_welding', factoryId: 'fac_apex_pune', name: 'Robotic Body Welding', manager: 'Rajesh K. Kumar' },
        { id: 'dept_machining', factoryId: 'fac_apex_pune', name: 'CNC Precision Machining', manager: 'Priya Verma' },
        { id: 'dept_assembly', factoryId: 'fac_apex_pune', name: 'Powertrain Final Assembly', manager: 'Suresh Raina' },
        { id: 'dept_forge', factoryId: 'fac_titan_guj', name: 'Aerospace Forge Cell', manager: 'Marcus Vance' }
      ],

      productionLines: [
        { id: 'line_stamp_a', factoryId: 'fac_apex_pune', departmentId: 'dept_stamping', name: 'Line A - High Pressure Press', status: 'Running', targetOee: 88, currentOee: 84.5 },
        { id: 'line_weld_b', factoryId: 'fac_apex_pune', departmentId: 'dept_welding', name: 'Line B - Robotic Spot Welding', status: 'Running', targetOee: 92, currentOee: 91.2 },
        { id: 'line_cnc_c', factoryId: 'fac_apex_pune', departmentId: 'dept_machining', name: 'Line C - 5-Axis CNC Cell', status: 'Warning', targetOee: 90, currentOee: 76.8 },
        { id: 'line_titan_1', factoryId: 'fac_titan_guj', departmentId: 'dept_forge', name: 'Titan Thermal Press Line 1', status: 'Running', targetOee: 85, currentOee: 86.1 }
      ],

      machines: [
        {
          id: 'mac_cnc_01',
          orgId: 'org_apex',
          factoryId: 'fac_apex_pune',
          departmentId: 'dept_machining',
          lineId: 'line_cnc_c',
          name: 'Haas VF-4SS 5-Axis Machining Center',
          type: 'CNC Mill',
          manufacturer: 'Haas Automation USA',
          model: 'VF-4SS Super-Speed',
          serialNumber: 'HAAS-2024-88491',
          installationDate: '2024-02-10',
          status: 'Warning',
          criticality: 'High',
          healthScore: 78,
          riskLevel: 'Moderate',
          operationalState: 'Thermal Elevation Spikes'
        },
        {
          id: 'mac_weld_02',
          orgId: 'org_apex',
          factoryId: 'fac_apex_pune',
          departmentId: 'dept_welding',
          lineId: 'line_weld_b',
          name: 'KUKA KR-210 Robotic Welder Arm',
          type: 'Industrial Robot',
          manufacturer: 'KUKA Robotics GmbH',
          model: 'KR-210 R2700-2',
          serialNumber: 'KUKA-GER-99201',
          installationDate: '2023-11-05',
          status: 'Running',
          criticality: 'Critical',
          healthScore: 96,
          riskLevel: 'Low',
          operationalState: 'Optimal Precision Welding'
        },
        {
          id: 'mac_press_03',
          orgId: 'org_apex',
          factoryId: 'fac_apex_pune',
          departmentId: 'dept_stamping',
          lineId: 'line_stamp_a',
          name: 'Schuler 1000-Ton Hydraulic Stamping Press',
          type: 'Hydraulic Press',
          manufacturer: 'Schuler Group',
          model: 'HP-1000T-PRO',
          serialNumber: 'SCH-HYD-5510',
          installationDate: '2022-08-19',
          status: 'Running',
          criticality: 'High',
          healthScore: 91,
          riskLevel: 'Low',
          operationalState: 'Normal Tonnage Stamping'
        },
        {
          id: 'mac_conv_04',
          orgId: 'org_apex',
          factoryId: 'fac_apex_pune',
          departmentId: 'dept_assembly',
          lineId: 'line_stamp_a',
          name: 'Bosch Rexroth Automated Pallet Conveyor',
          type: 'Conveyor System',
          manufacturer: 'Bosch Rexroth',
          model: 'TS5 Transfer System',
          serialNumber: 'BR-TS5-4091',
          installationDate: '2024-01-20',
          status: 'Stopped',
          criticality: 'Medium',
          healthScore: 62,
          riskLevel: 'High',
          operationalState: 'Belt Tension Sensor Fault'
        },
        {
          id: 'mac_titan_press',
          orgId: 'org_titan',
          factoryId: 'fac_titan_guj',
          departmentId: 'dept_forge',
          lineId: 'line_titan_1',
          name: 'SMS Group 5000T Forging Press',
          type: 'Forging Press',
          manufacturer: 'SMS Group',
          model: 'SMS-5000T-TITAN',
          serialNumber: 'SMS-FORGE-0019',
          installationDate: '2021-06-15',
          status: 'Running',
          criticality: 'Critical',
          healthScore: 94,
          riskLevel: 'Low',
          operationalState: 'Active Forging Cycle'
        }
      ],

      machineDigitalPassports: {
        'mac_cnc_01': {
          passportId: 'mdp_cnc_01',
          machineId: 'mac_cnc_01',
          serialNumber: 'HAAS-2024-88491',
          commissioningDate: '2024-02-15',
          warrantyExpiration: '2027-02-15',
          supplier: 'Haas India Industrial Sales Corp',
          specifications: {
            spindleSpeed: '12,000 RPM',
            tableSize: '50" x 20"',
            toolCapacity: '30+1 Inline',
            powerRating: '22.4 kW',
            coolantCapacity: '208 Liters'
          },
          manuals: [
            { title: 'Haas VF-4SS Operator Manual v3.2', type: 'SOP', url: '#', date: '2024-02-10' },
            { title: 'Spindle Bearing Maintenance SOP', type: 'Maintenance', url: '#', date: '2024-05-01' }
          ],
          maintenanceHistory: [
            { date: '2026-07-20', type: 'Preventive Maintenance', technician: 'Rajesh K. Kumar', summary: 'Replaced coolant filter, lubricated X/Y/Z linear guides.' },
            { date: '2026-05-12', type: 'Calibration', technician: 'Haas Service Team', summary: 'Laser alignment for spindle concentricity.' }
          ],
          spareParts: [
            { partNo: 'SP-H-9921', name: 'High Precision Spindle Bearing Set', qtyInStock: 2, reorderLevel: 1 },
            { partNo: 'SP-H-3012', name: 'Synthetics Coolant Filter Element', qtyInStock: 5, reorderLevel: 2 }
          ],
          defectsHistory: [
            { date: '2026-08-10', code: 'E-409', severity: 'Warning', description: 'Vibration frequency spike on spindle axis (4.8 mm/s).' }
          ],
          aiRecommendations: [
            { date: '2026-08-11', type: 'Predictive Maintenance', action: 'Inspect Spindle Drive Motor Cooling Fan before next shift. Bearing wear risk is 34% elevated.' }
          ]
        },
        'mac_weld_02': {
          passportId: 'mdp_weld_02',
          machineId: 'mac_weld_02',
          serialNumber: 'KUKA-GER-99201',
          commissioningDate: '2023-11-12',
          warrantyExpiration: '2026-11-12',
          supplier: 'KUKA Robotics India',
          specifications: {
            payload: '210 kg',
            maxReach: '2700 mm',
            repeatability: '±0.06 mm',
            controller: 'KR C4 Extended'
          },
          manuals: [{ title: 'KUKA KR-210 Robot Safety SOP', type: 'Safety', url: '#', date: '2023-11-05' }],
          maintenanceHistory: [{ date: '2026-06-15', type: 'Routine Service', technician: 'KUKA Field Engineer', summary: 'Gearbox oil replenishment and axis zeroing.' }],
          spareParts: [{ partNo: 'KUK-ACT-01', name: 'Axis 3 Servo Motor Encoder', qtyInStock: 1, reorderLevel: 1 }],
          defectsHistory: [],
          aiRecommendations: [{ date: '2026-08-11', type: 'Optimal Tuning', action: 'Weld seam precision is 99.4%. No immediate intervention required.' }]
        }
      },

      iotDevices: [
        {
          id: 'dev_esp32_01',
          orgId: 'org_apex',
          machineId: 'mac_cnc_01',
          deviceName: 'ESP32 Industrial Gateway Node 01',
          deviceType: 'ESP32 Dual-Core Microcontroller',
          ipAddress: '192.168.1.145',
          macAddress: '24:0A:C4:9B:11:04',
          connectivityStatus: 'Online',
          firmwareVersion: 'v2.4.1-industrial',
          sensors: [
            { id: 'sns_vib_01', type: 'Vibration (MPU6050)', unit: 'mm/s', minThreshold: 0, maxThreshold: 4.5, currentVal: 4.8, status: 'Warning' },
            { id: 'sns_temp_01', type: 'Temperature (DHT22)', unit: '°C', minThreshold: 15, maxThreshold: 65, currentVal: 68.4, status: 'Warning' },
            { id: 'sns_curr_01', type: 'Current (ACS712)', unit: 'Amps', minThreshold: 2, maxThreshold: 35, currentVal: 24.1, status: 'Normal' }
          ]
        },
        {
          id: 'dev_esp32_02',
          orgId: 'org_apex',
          machineId: 'mac_weld_02',
          deviceName: 'ESP32 Gateway Node 02 - Welding Arm',
          deviceType: 'ESP32-S3 Industrial',
          ipAddress: '192.168.1.146',
          macAddress: '24:0A:C4:9B:11:08',
          connectivityStatus: 'Online',
          firmwareVersion: 'v2.4.1-industrial',
          sensors: [
            { id: 'sns_pwr_02', type: 'Power Meter (PZEM-004T)', unit: 'kW', minThreshold: 1, maxThreshold: 45, currentVal: 18.2, status: 'Normal' },
            { id: 'sns_temp_02', type: 'Arm Temp (DHT22)', unit: '°C', minThreshold: 10, maxThreshold: 55, currentVal: 38.5, status: 'Normal' }
          ]
        }
      ],

      knowledgeDocs: [
        {
          id: 'doc_001',
          orgId: 'org_apex',
          title: 'Haas VF-4SS CNC Machine Operating SOP & Safety',
          category: 'Machine Manual / SOP',
          targetMachineId: 'mac_cnc_01',
          uploadedBy: 'Rajesh K. Kumar',
          uploadDate: '2026-02-10',
          fileSize: '4.2 MB',
          format: 'PDF',
          tags: ['SOP', 'Haas', 'CNC', 'Safety', 'Spindle']
        },
        {
          id: 'doc_002',
          orgId: 'org_apex',
          title: 'Plant Emergency Electrical Cut-off Procedure',
          category: 'Safety Policy',
          targetMachineId: 'All',
          uploadedBy: 'Ananya Sharma',
          uploadDate: '2026-01-18',
          fileSize: '1.8 MB',
          format: 'PDF',
          tags: ['Safety', 'Electrical', 'Emergency']
        }
      ],

      auditLogs: [
        {
          id: 'log_001',
          orgId: 'org_apex',
          actorName: 'Vikram Utthara',
          role: 'Founder / Managing Director',
          action: 'LOGIN',
          target: 'UTTHARA SOLUTIONS SaaS Platform',
          timestamp: '2026-08-11 10:14:02',
          ip: '103.21.140.12'
        },
        {
          id: 'log_002',
          orgId: 'org_apex',
          actorName: 'Rajesh K. Kumar',
          role: 'Maintenance Lead Engineer',
          action: 'UPDATE_MACHINE_PASSPORT',
          target: 'Haas VF-4SS (mac_cnc_01)',
          timestamp: '2026-08-11 09:15:30',
          ip: '192.168.1.55'
        }
      ],

      notifications: [
        {
          id: 'notif_001',
          orgId: 'org_apex',
          severity: 'critical',
          title: 'Thermal Spike Alert',
          message: 'Haas VF-4SS Machine Spindle temperature exceeded 68°C threshold.',
          timestamp: '2026-08-11 10:45:00',
          read: false
        },
        {
          id: 'notif_002',
          orgId: 'org_apex',
          severity: 'warning',
          title: 'Vibration Anomaly Detected',
          message: 'MPU6050 sensor on Line C reported 4.8 mm/s vibration frequency.',
          timestamp: '2026-08-11 10:30:00',
          read: false
        }
      ],

      demoRequests: [
        {
          id: 'req_101',
          name: 'Rajesh Sharma',
          company: 'Kirloskar Heavy Engineering Ltd',
          email: 'rajesh.sharma@kirloskareng.in',
          phone: '+91 98230 44120',
          role: 'Plant Head / VP Operations',
          industry: 'Engineering & Industrial Machinery',
          companySize: '250-500',
          factoryLocation: 'Pune, Maharashtra',
          factoryCount: 2,
          machineCount: 38,
          currentSoftware: 'Excel & Tally ERP',
          challenges: 'Unexpected spindle downtime and fragmented paper maintenance logs.',
          interestedFeatures: ['Digital Twin', 'Predictive Maintenance', 'Machine Passports', 'AI Assistant'],
          preferredContact: 'Email & WhatsApp',
          message: 'Interested in deploying AI predictive maintenance for our 5-axis CNC machines.',
          status: 'New',
          assignedSales: 'Sanjay Verma (UTTHARA Lead)',
          notes: 'High priority lead for Pune manufacturing plant deployment.',
          createdAt: '2026-08-11 14:20:00',
          updatedAt: '2026-08-11 14:20:00'
        },
        {
          id: 'req_102',
          name: 'Sunil Mehta',
          company: 'Sundaram Auto Components',
          email: 'sunil.m@sundaramauto.com',
          phone: '+91 94440 18239',
          role: 'Maintenance Director',
          industry: 'Automotive Components',
          companySize: '500-1000',
          factoryLocation: 'Chennai, Tamil Nadu',
          factoryCount: 3,
          machineCount: 65,
          currentSoftware: 'Legacy SAP ERP',
          challenges: 'OEE calculation is delayed by 48 hours; zero real-time machine visibility.',
          interestedFeatures: ['Industrial IoT', 'Production Analytics', 'Digital Twin'],
          preferredContact: 'Phone Call',
          message: 'We require ESP32 gateway telemetry setup across 3 production lines.',
          status: 'Qualified',
          assignedSales: 'Ananya Roy (UTTHARA Sales)',
          notes: 'Technical meeting scheduled for next week.',
          createdAt: '2026-08-10 11:00:00',
          updatedAt: '2026-08-11 09:15:00'
        }
      ],

      technicalMeetings: [
        {
          id: 'tm_001',
          demoRequestId: 'req_102',
          customerName: 'Sundaram Auto Components',
          meetingDate: '2026-08-15 14:00',
          participants: ['Sunil Mehta (Client)', 'Arjun Rao (UTTHARA Solutions Architect)'],
          agenda: 'Review ESP32 MQTT Gateway protocol compatibility with Haas CNC & KUKA Controllers',
          requirements: 'Modbus TCP & MPU6050 vibration telemetry bridging',
          technicalNotes: 'Client plant has local Wi-Fi mesh; MQTTS security broker validated.',
          status: 'Scheduled'
        }
      ],

      factoryVisits: [
        {
          id: 'fv_001',
          demoRequestId: 'req_102',
          facilityLocation: 'Sundaram Auto Plant 1, Sriperumbudur, Chennai',
          visitDate: '2026-08-18',
          assignedEngineers: ['Vikram (Lead IoT Engineer)', 'Deepak (Field Specialist)'],
          checklist: ['Machine Inventory Audit', 'Network Wi-Fi Survey', 'ESP32 Power Supply Check'],
          status: 'Planned'
        }
      ]
    };
  }

  // Tenant Isolation Query Helper
  filterByOrg(collection, orgId) {
    if (!collection) return [];
    return collection.filter(item => item.orgId === orgId);
  }

  getOrganizations() {
    return this.data.organizations;
  }

  getOrgById(id) {
    return this.data.organizations.find(o => o.id === id);
  }

  getUsers(orgId) {
    return this.filterByOrg(this.data.users, orgId);
  }

  getFactories(orgId) {
    return this.filterByOrg(this.data.factories, orgId);
  }

  getDepartments(factoryId) {
    return this.data.departments.filter(d => d.factoryId === factoryId);
  }

  getProductionLines(factoryId) {
    return this.data.productionLines.filter(l => l.factoryId === factoryId);
  }

  getMachines(orgId) {
    return this.filterByOrg(this.data.machines, orgId);
  }

  getMachineById(id) {
    return this.data.machines.find(m => m.id === id);
  }

  getPassport(machineId) {
    return this.data.machineDigitalPassports[machineId] || null;
  }

  getIoTDevices(orgId) {
    return this.filterByOrg(this.data.iotDevices, orgId);
  }

  getKnowledgeDocs(orgId) {
    return this.filterByOrg(this.data.knowledgeDocs, orgId);
  }

  getAuditLogs(orgId) {
    return this.filterByOrg(this.data.auditLogs, orgId);
  }

  getNotifications(orgId) {
    return this.filterByOrg(this.data.notifications, orgId);
  }

  // Demo Requests & Sales Lead Engine
  getDemoRequests() {
    return this.data.demoRequests || [];
  }

  addDemoRequest(reqData) {
    const newReq = {
      id: 'req_' + Date.now(),
      status: 'New',
      assignedSales: 'Unassigned',
      notes: 'Submitted via Public Website Book a Demo Form.',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ...reqData
    };
    if (!this.data.demoRequests) this.data.demoRequests = [];
    this.data.demoRequests.unshift(newReq);
    this.save();
    this.addAuditLog({
      actorName: newReq.name,
      role: 'Public Prospect',
      action: 'SUBMIT_DEMO_REQUEST',
      target: `Company: ${newReq.company}`,
      ip: '127.0.0.1'
    });
    return newReq;
  }

  updateDemoRequestStatus(requestId, status, notes = '') {
    const req = (this.data.demoRequests || []).find(r => r.id === requestId);
    if (req) {
      req.status = status;
      if (notes) req.notes = (req.notes ? req.notes + ' | ' : '') + notes;
      req.updatedAt = new Date().toISOString().replace('T', ' ').substring(0, 19);
      this.save();
      this.addAuditLog({
        actorName: window.Auth ? window.Auth.getCurrentUser().name : 'System Admin',
        role: window.Auth ? window.Auth.getRole() : 'Sales Admin',
        action: 'UPDATE_LEAD_STATUS',
        target: `Lead: ${req.company} → ${status}`,
        ip: '127.0.0.1'
      });
    }
    return req;
  }

  // 1-Click Lead-to-Customer Organization Onboarding Engine!
  convertDemoRequestToOrg(requestId) {
    const req = (this.data.demoRequests || []).find(r => r.id === requestId);
    if (!req) return null;

    const newOrgId = 'org_' + req.company.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 15);
    
    // Check if org exists already
    let existingOrg = this.getOrgById(newOrgId);
    if (!existingOrg) {
      existingOrg = {
        id: newOrgId,
        legalName: req.company + ' Ltd',
        displayName: req.company,
        industry: req.industry,
        companySize: req.companySize,
        contactEmail: req.email,
        subscriptionPlan: 'Professional Manufacturing AI OS',
        subscriptionStatus: 'Trial Active (14 Days)',
        onboardingStatus: 'Completed',
        createdAt: new Date().toISOString().substring(0, 10)
      };
      this.data.organizations.push(existingOrg);

      // Create Admin User for the Onboarded Company
      const newAdminUser = {
        id: 'usr_' + Date.now(),
        orgId: newOrgId,
        name: req.name,
        email: req.email,
        role: req.role || 'Founder / Managing Director',
        department: 'Management',
        status: 'Active',
        lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      this.data.users.push(newAdminUser);

      // Create Initial Factory Facility
      const newFactoryId = 'fac_' + newOrgId + '_01';
      this.data.factories.push({
        id: newFactoryId,
        orgId: newOrgId,
        name: req.company + ' Plant 01',
        location: req.factoryLocation || 'Industrial Area',
        operatingHours: '24/7 (3 Shifts)',
        status: 'Operational'
      });
    }

    req.status = 'Converted';
    req.notes = (req.notes || '') + ' | Onboarded as customer organization ID: ' + newOrgId;
    req.updatedAt = new Date().toISOString().replace('T', ' ').substring(0, 19);
    this.save();

    return existingOrg;
  }

  getTechnicalMeetings() {
    return this.data.technicalMeetings || [];
  }

  getFactoryVisits() {
    return this.data.factoryVisits || [];
  }

  // Demo Call Management & Availability Engine (Prompt 04)
  getDemoCalls() {
    return this.data.demoCalls || [];
  }

  getDemoCallByRef(bookingRef) {
    return (this.data.demoCalls || []).find(c => c.bookingReference === bookingRef || c.id === bookingRef);
  }

  createDemoCall(callData) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const bookingRef = `FV-DEMO-2026-${randomNum}`;
    const newCall = {
      id: 'call_' + Date.now(),
      bookingReference: bookingRef,
      status: 'Confirmed',
      meetingUrl: 'https://meet.factoryverse.ai/demo/' + bookingRef,
      assignedSales: 'Sanjay Verma (UTTHARA Lead)',
      assignedEngineer: 'Arjun Rao (Solutions Architect)',
      rescheduleHistory: [],
      featuresDemonstrated: [],
      notes: '',
      outcome: 'Pending Call',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ...callData
    };

    if (!this.data.demoCalls) this.data.demoCalls = [];
    this.data.demoCalls.unshift(newCall);
    this.save();

    this.addAuditLog({
      actorName: newCall.customerName || 'Prospect',
      role: 'Public Prospect',
      action: 'BOOK_DEMO_CONFIRMED',
      target: `Reference: ${bookingRef} | Date: ${newCall.scheduledDate} ${newCall.scheduledTime}`,
      ip: '127.0.0.1'
    });

    return newCall;
  }

  rescheduleDemoCall(bookingRef, newDate, newTime, reason = '') {
    const call = this.getDemoCallByRef(bookingRef);
    if (!call) return null;

    call.rescheduleHistory.push({
      previousDate: call.scheduledDate,
      previousTime: call.scheduledTime,
      newDate: newDate,
      newTime: newTime,
      reason: reason,
      rescheduledAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    });

    call.scheduledDate = newDate;
    call.scheduledTime = newTime;
    call.status = 'Rescheduled';
    call.updatedAt = new Date().toISOString().replace('T', ' ').substring(0, 19);
    this.save();

    this.addAuditLog({
      actorName: call.customerName,
      role: 'Customer Prospect',
      action: 'RESCHEDULE_DEMO',
      target: `Reference: ${bookingRef} → ${newDate} ${newTime}`,
      ip: '127.0.0.1'
    });

    return call;
  }

  cancelDemoCall(bookingRef, reason = '') {
    const call = this.getDemoCallByRef(bookingRef);
    if (!call) return null;

    call.status = 'Cancelled';
    call.cancellationReason = reason;
    call.updatedAt = new Date().toISOString().replace('T', ' ').substring(0, 19);
    this.save();

    this.addAuditLog({
      actorName: call.customerName,
      role: 'Customer Prospect',
      action: 'CANCEL_DEMO',
      target: `Reference: ${bookingRef} | Reason: ${reason}`,
      ip: '127.0.0.1'
    });

    return call;
  }

  // Real Slot Availability Engine
  getAvailableSlots(dateStr, timezone = 'IST', durationMinutes = 45) {
    const baseSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'];
    const bookedTimes = (this.data.demoCalls || [])
      .filter(c => c.scheduledDate === dateStr && c.status !== 'Cancelled')
      .map(c => c.scheduledTime);

    return baseSlots.map(slotTime => {
      const isBooked = bookedTimes.includes(slotTime);
      return {
        time: slotTime,
        available: !isBooked,
        salesRep: 'Sanjay Verma (UTTHARA Solutions)',
        duration: durationMinutes + ' Minutes'
      };
    });
  }

  addAuditLog(logEntry) {
    const newLog = {
      id: 'log_' + Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ...logEntry
    };
    this.data.auditLogs.unshift(newLog);
    this.save();
    return newLog;
  }
}

// Global Singleton Instance
window.FVDB = new UttharaSolutionsDB();
