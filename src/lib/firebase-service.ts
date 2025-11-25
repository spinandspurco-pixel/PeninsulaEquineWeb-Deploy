/**
 * Firebase Service - Handles all Firebase operations
 * 
 * This is a mock implementation that simulates Firebase behavior.
 * In production, replace these functions with actual Firebase SDK calls.
 */

import { firebaseConfig } from './firebase-config';

// Types
export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'worker' | 'admin' | 'pending';
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;
  password?: string; // Stored for demo only - in production use hashed passwords
  temporaryPassword?: boolean; // Flag for first-time login
  mustChangePassword?: boolean;
}

export interface TimesheetEntry {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  project: string;
  hours: number;
}

export interface Timesheet {
  id: string;
  userId: string;
  workerName: string;
  workerEmail: string;
  submittedDate: string;
  weekEnding: string;
  totalHours: number;
  status: 'pending' | 'approved' | 'rejected';
  entries: TimesheetEntry[];
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

export interface SWMSForm {
  id: string;
  userId: string;
  workerName: string;
  workerEmail: string;
  submittedDate: string;
  projectName: string;
  location: string;
  date: string;
  supervisor: string;
  hazards: string[];
  controlMeasures: string;
  emergencyProcedures: string;
  ppe: string[];
  status: 'submitted' | 'reviewed';
}

export interface ToolboxTalk {
  id: string;
  userId: string;
  submittedBy: string;
  submittedByEmail: string;
  submittedDate: string;
  topic: string;
  date: string;
  location: string;
  presenter: string;
  attendees: string[];
  keyPoints: string;
  actions: string;
  status: 'submitted' | 'reviewed';
}

export interface IncidentReport {
  id: string;
  userId: string;
  reportedBy: string;
  reportedByEmail: string;
  submittedDate: string;
  incidentDate: string;
  incidentTime: string;
  location: string;
  incidentType: string;
  description: string;
  injuredPerson?: string;
  witnesses?: string;
  immediateAction: string;
  severity: 'minor' | 'moderate' | 'serious' | 'critical';
  status: 'submitted' | 'under-review' | 'resolved';
}

export interface PaymentRecord {
  id: string;
  userId: string;
  workerName: string;
  workerEmail: string;
  timesheetId: string;
  weekEnding: string;
  totalHours: number;
  hourlyRate: number;
  grossPay: number;
  taxWithheld: number;
  superannuation: number;
  netPay: number;
  paymentDate: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

// Mock local storage database
const STORAGE_KEYS = {
  USERS: 'peninsula_users',
  TIMESHEETS: 'peninsula_timesheets',
  SWMS: 'peninsula_swms',
  TOOLBOX: 'peninsula_toolbox',
  INCIDENTS: 'peninsula_incidents',
  PAYMENTS: 'peninsula_payments',
  CURRENT_USER: 'peninsula_current_user',
};

// Helper functions for local storage
const getFromStorage = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveToStorage = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Initialize with demo data if empty
const initializeDemoData = () => {
  const users = getFromStorage<User>(STORAGE_KEYS.USERS);
  if (users.length === 0) {
    const demoUsers: User[] = [
      {
        uid: 'admin-1',
        email: 'admin@peninsulaequine.com.au',
        displayName: 'Ciro (Admin)',
        role: 'admin',
        password: 'Admin123!',
        createdAt: new Date().toISOString(),
        mustChangePassword: false,
      },
      {
        uid: 'admin-2',
        email: 'tam@peninsulaequine.com.au',
        displayName: 'Tam (Admin)',
        role: 'admin',
        password: 'Admin123!',
        createdAt: new Date().toISOString(),
        mustChangePassword: false,
      },
      {
        uid: 'worker-1',
        email: 'worker@peninsulaequine.com.au',
        displayName: 'John Smith',
        role: 'worker',
        password: 'Worker123!',
        createdAt: new Date().toISOString(),
        approvedAt: new Date().toISOString(),
        approvedBy: 'admin-1',
        mustChangePassword: false,
      },
    ];
    saveToStorage(STORAGE_KEYS.USERS, demoUsers);
  }
};

// Initialize on import
initializeDemoData();

// Email Notification Functions (defined early so other functions can use it)
const ADMIN_EMAILS = ['tam@peninsulaequine.com.au', 'ciro@peninsulaequine.com.au'];

const sendEmailNotification = async (params: {
  type: 'timesheet' | 'swms' | 'toolbox' | 'incident' | 'registration';
  subject: string;
  workerName: string;
  workerEmail: string;
  details: string;
  priority?: 'normal' | 'high' | 'urgent';
}): Promise<void> => {
  // This is a mock implementation
  // In production, this would integrate with SendGrid, AWS SES, or Firebase Email Extension
  
  console.log('📧 Email Notification Sent:', {
    to: ADMIN_EMAILS,
    from: 'notifications@peninsulaequine.com.au',
    subject: params.subject,
    priority: params.priority || 'normal',
    body: `
      Worker: ${params.workerName}
      Email: ${params.workerEmail}
      
      ${params.details}
      
      View in admin dashboard: https://equinepeninsula.com.au
    `,
  });
  
  // In production, replace with actual email service:
  // await sendgrid.send({ ... })
  // or use Firebase Cloud Functions with email trigger
};

// Authentication Functions
export const signInWithGoogle = async (): Promise<User> => {
  // Mock Google OAuth sign-in
  throw new Error('Google OAuth not configured. Use email/password login for demo.');
};

export const signInWithEmailPassword = async (email: string, password: string): Promise<User> => {
  const users = getFromStorage<User>(STORAGE_KEYS.USERS);
  const user = users.find(u => u.email === email);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  if (user.password && user.password !== password) {
    throw new Error('Invalid email or password');
  }
  
  if (user.role === 'pending') {
    throw new Error('Your account is pending approval from administrators');
  }
  
  // Store current user
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  
  return user;
};

export const registerUser = async (userData: {
  email: string;
  displayName: string;
  password: string;
}): Promise<void> => {
  const users = getFromStorage<User>(STORAGE_KEYS.USERS);
  
  // Check if user already exists
  if (users.find(u => u.email === userData.email)) {
    throw new Error('User with this email already exists');
  }
  
  const newUser: User = {
    uid: `user-${Date.now()}`,
    email: userData.email,
    displayName: userData.displayName,
    role: 'pending',
    createdAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  saveToStorage(STORAGE_KEYS.USERS, users);
  
  // In production, this would send a notification to admins
  console.log('New user registration pending approval:', newUser);
};

export const signOut = async (): Promise<void> => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return userStr ? JSON.parse(userStr) : null;
};

// User Management (Admin only)
export const getPendingUsers = async (): Promise<User[]> => {
  const users = getFromStorage<User>(STORAGE_KEYS.USERS);
  return users.filter(u => u.role === 'pending');
};

export const getAllUsers = async (): Promise<User[]> => {
  return getFromStorage<User>(STORAGE_KEYS.USERS);
};

export const approveUser = async (userId: string, approvedBy: string): Promise<void> => {
  const users = getFromStorage<User>(STORAGE_KEYS.USERS);
  const userIndex = users.findIndex(u => u.uid === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  users[userIndex] = {
    ...users[userIndex],
    role: 'worker',
    approvedAt: new Date().toISOString(),
    approvedBy,
  };
  
  saveToStorage(STORAGE_KEYS.USERS, users);
};

export const rejectUser = async (userId: string): Promise<void> => {
  const users = getFromStorage<User>(STORAGE_KEYS.USERS);
  const filteredUsers = users.filter(u => u.uid !== userId);
  saveToStorage(STORAGE_KEYS.USERS, filteredUsers);
};

export const promoteToAdmin = async (userId: string): Promise<void> => {
  const users = getFromStorage<User>(STORAGE_KEYS.USERS);
  const userIndex = users.findIndex(u => u.uid === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  users[userIndex].role = 'admin';
  saveToStorage(STORAGE_KEYS.USERS, users);
};

// Admin: Create new user with credentials
export const createUserByAdmin = async (userData: {
  email: string;
  displayName: string;
  password: string;
  role: 'worker' | 'admin';
  createdBy: string;
}): Promise<User> => {
  const users = getFromStorage<User>(STORAGE_KEYS.USERS);
  
  // Check if user already exists
  if (users.find(u => u.email === userData.email)) {
    throw new Error('User with this email already exists');
  }
  
  const newUser: User = {
    uid: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    email: userData.email,
    displayName: userData.displayName,
    role: userData.role,
    password: userData.password,
    temporaryPassword: true,
    mustChangePassword: true,
    createdAt: new Date().toISOString(),
    approvedAt: new Date().toISOString(),
    approvedBy: userData.createdBy,
  };
  
  users.push(newUser);
  saveToStorage(STORAGE_KEYS.USERS, users);
  
  console.log('New user created by admin:', newUser.email);
  return newUser;
};

// Change password
export const changePassword = async (userId: string, oldPassword: string, newPassword: string): Promise<void> => {
  const users = getFromStorage<User>(STORAGE_KEYS.USERS);
  const userIndex = users.findIndex(u => u.uid === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  const user = users[userIndex];
  
  // Verify old password
  if (user.password && user.password !== oldPassword) {
    throw new Error('Current password is incorrect');
  }
  
  // Update password
  users[userIndex].password = newPassword;
  users[userIndex].temporaryPassword = false;
  users[userIndex].mustChangePassword = false;
  
  saveToStorage(STORAGE_KEYS.USERS, users);
  
  // Update current user session
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.uid === userId) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(users[userIndex]));
  }
};

// Admin: Reset user password
export const resetUserPassword = async (userId: string, newPassword: string): Promise<void> => {
  const users = getFromStorage<User>(STORAGE_KEYS.USERS);
  const userIndex = users.findIndex(u => u.uid === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  users[userIndex].password = newPassword;
  users[userIndex].temporaryPassword = true;
  users[userIndex].mustChangePassword = true;
  
  saveToStorage(STORAGE_KEYS.USERS, users);
};

// Timesheet Functions
export const submitTimesheet = async (timesheet: Omit<Timesheet, 'id' | 'submittedDate'>): Promise<string> => {
  const timesheets = getFromStorage<Timesheet>(STORAGE_KEYS.TIMESHEETS);
  
  const newTimesheet: Timesheet = {
    ...timesheet,
    id: `timesheet-${Date.now()}`,
    submittedDate: new Date().toISOString(),
  };
  
  timesheets.push(newTimesheet);
  saveToStorage(STORAGE_KEYS.TIMESHEETS, timesheets);
  
  // Send email notification to admins
  await sendEmailNotification({
    type: 'timesheet',
    subject: `New Timesheet Submitted - ${timesheet.workerName}`,
    workerName: timesheet.workerName,
    workerEmail: timesheet.workerEmail,
    details: `Timesheet for week ending ${timesheet.weekEnding}\nTotal Hours: ${timesheet.totalHours}\nStatus: Pending Review`,
    priority: 'normal',
  });
  
  return newTimesheet.id;
};

export const getTimesheetsByUser = async (userId: string): Promise<Timesheet[]> => {
  const timesheets = getFromStorage<Timesheet>(STORAGE_KEYS.TIMESHEETS);
  return timesheets.filter(t => t.userId === userId);
};

export const getAllTimesheets = async (): Promise<Timesheet[]> => {
  return getFromStorage<Timesheet>(STORAGE_KEYS.TIMESHEETS);
};

export const approveTimesheet = async (timesheetId: string, reviewedBy: string, notes?: string): Promise<void> => {
  const timesheets = getFromStorage<Timesheet>(STORAGE_KEYS.TIMESHEETS);
  const index = timesheets.findIndex(t => t.id === timesheetId);
  
  if (index === -1) {
    throw new Error('Timesheet not found');
  }
  
  timesheets[index] = {
    ...timesheets[index],
    status: 'approved',
    reviewedBy,
    reviewedAt: new Date().toISOString(),
    reviewNotes: notes,
  };
  
  saveToStorage(STORAGE_KEYS.TIMESHEETS, timesheets);
};

export const rejectTimesheet = async (timesheetId: string, reviewedBy: string, notes?: string): Promise<void> => {
  const timesheets = getFromStorage<Timesheet>(STORAGE_KEYS.TIMESHEETS);
  const index = timesheets.findIndex(t => t.id === timesheetId);
  
  if (index === -1) {
    throw new Error('Timesheet not found');
  }
  
  timesheets[index] = {
    ...timesheets[index],
    status: 'rejected',
    reviewedBy,
    reviewedAt: new Date().toISOString(),
    reviewNotes: notes,
  };
  
  saveToStorage(STORAGE_KEYS.TIMESHEETS, timesheets);
};

// SWMS Form Functions
export const submitSWMS = async (swms: Omit<SWMSForm, 'id' | 'submittedDate'>): Promise<string> => {
  const forms = getFromStorage<SWMSForm>(STORAGE_KEYS.SWMS);
  
  const newForm: SWMSForm = {
    ...swms,
    id: `swms-${Date.now()}`,
    submittedDate: new Date().toISOString(),
  };
  
  forms.push(newForm);
  saveToStorage(STORAGE_KEYS.SWMS, forms);
  
  // Send email notification to admins
  await sendEmailNotification({
    type: 'swms',
    subject: `New SWMS Form Submitted - ${swms.workerName}`,
    workerName: swms.workerName,
    workerEmail: swms.workerEmail,
    details: `Project: ${swms.projectName}\nLocation: ${swms.location}\nDate: ${swms.date}\nSupervisor: ${swms.supervisor}`,
    priority: 'normal',
  });
  
  return newForm.id;
};

export const getAllSWMS = async (): Promise<SWMSForm[]> => {
  return getFromStorage<SWMSForm>(STORAGE_KEYS.SWMS);
};

export const markSWMSAsReviewed = async (swmsId: string): Promise<void> => {
  const forms = getFromStorage<SWMSForm>(STORAGE_KEYS.SWMS);
  const index = forms.findIndex(f => f.id === swmsId);
  
  if (index !== -1) {
    forms[index].status = 'reviewed';
    saveToStorage(STORAGE_KEYS.SWMS, forms);
  }
};

// Toolbox Talk Functions
export const submitToolboxTalk = async (talk: Omit<ToolboxTalk, 'id' | 'submittedDate'>): Promise<string> => {
  const talks = getFromStorage<ToolboxTalk>(STORAGE_KEYS.TOOLBOX);
  
  const newTalk: ToolboxTalk = {
    ...talk,
    id: `toolbox-${Date.now()}`,
    submittedDate: new Date().toISOString(),
  };
  
  talks.push(newTalk);
  saveToStorage(STORAGE_KEYS.TOOLBOX, talks);
  
  // Send email notification to admins
  await sendEmailNotification({
    type: 'toolbox',
    subject: `New Toolbox Talk Submitted - ${talk.submittedBy}`,
    workerName: talk.submittedBy,
    workerEmail: talk.submittedByEmail,
    details: `Topic: ${talk.topic}\nLocation: ${talk.location}\nDate: ${talk.date}\nAttendees: ${talk.attendees.length}`,
    priority: 'normal',
  });
  
  return newTalk.id;
};

export const getAllToolboxTalks = async (): Promise<ToolboxTalk[]> => {
  return getFromStorage<ToolboxTalk>(STORAGE_KEYS.TOOLBOX);
};

export const markToolboxTalkAsReviewed = async (talkId: string): Promise<void> => {
  const talks = getFromStorage<ToolboxTalk>(STORAGE_KEYS.TOOLBOX);
  const index = talks.findIndex(t => t.id === talkId);
  
  if (index !== -1) {
    talks[index].status = 'reviewed';
    saveToStorage(STORAGE_KEYS.TOOLBOX, talks);
  }
};

// Incident Report Functions
export const submitIncidentReport = async (report: Omit<IncidentReport, 'id' | 'submittedDate'>): Promise<string> => {
  const reports = getFromStorage<IncidentReport>(STORAGE_KEYS.INCIDENTS);
  
  const newReport: IncidentReport = {
    ...report,
    id: `incident-${Date.now()}`,
    submittedDate: new Date().toISOString(),
  };
  
  reports.push(newReport);
  saveToStorage(STORAGE_KEYS.INCIDENTS, reports);
  
  // Send URGENT email notification to admins
  await sendEmailNotification({
    type: 'incident',
    subject: `🚨 URGENT: Incident Report - ${report.severity.toUpperCase()}`,
    workerName: report.reportedBy,
    workerEmail: report.reportedByEmail,
    details: `SEVERITY: ${report.severity.toUpperCase()}\nType: ${report.incidentType}\nLocation: ${report.location}\nDate/Time: ${report.incidentDate} at ${report.incidentTime}\n\nDescription: ${report.description}`,
    priority: 'urgent',
  });
  
  return newReport.id;
};

export const getAllIncidentReports = async (): Promise<IncidentReport[]> => {
  return getFromStorage<IncidentReport>(STORAGE_KEYS.INCIDENTS);
};

export const updateIncidentStatus = async (
  incidentId: string, 
  status: IncidentReport['status']
): Promise<void> => {
  const reports = getFromStorage<IncidentReport>(STORAGE_KEYS.INCIDENTS);
  const index = reports.findIndex(r => r.id === incidentId);
  
  if (index !== -1) {
    reports[index].status = status;
    saveToStorage(STORAGE_KEYS.INCIDENTS, reports);
  }
};

// Payment Functions
export const getPaymentsByUser = async (userId: string): Promise<PaymentRecord[]> => {
  const payments = getFromStorage<PaymentRecord>(STORAGE_KEYS.PAYMENTS);
  return payments.filter(p => p.userId === userId).sort(
    (a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()
  );
};

export const getAllPayments = async (): Promise<PaymentRecord[]> => {
  return getFromStorage<PaymentRecord>(STORAGE_KEYS.PAYMENTS);
};

export const createPaymentRecord = async (payment: Omit<PaymentRecord, 'id'>): Promise<string> => {
  const payments = getFromStorage<PaymentRecord>(STORAGE_KEYS.PAYMENTS);
  
  const newPayment: PaymentRecord = {
    ...payment,
    id: `payment-${Date.now()}`,
  };
  
  payments.push(newPayment);
  saveToStorage(STORAGE_KEYS.PAYMENTS, payments);
  
  return newPayment.id;
};

export const updatePaymentStatus = async (
  paymentId: string,
  status: PaymentRecord['status'],
  notes?: string
): Promise<void> => {
  const payments = getFromStorage<PaymentRecord>(STORAGE_KEYS.PAYMENTS);
  const index = payments.findIndex(p => p.id === paymentId);
  
  if (index !== -1) {
    payments[index].status = status;
    if (notes) payments[index].notes = notes;
    saveToStorage(STORAGE_KEYS.PAYMENTS, payments);
  }
};

export const generatePaymentFromTimesheet = async (timesheetId: string, hourlyRate: number): Promise<string> => {
  const timesheets = getFromStorage<Timesheet>(STORAGE_KEYS.TIMESHEETS);
  const timesheet = timesheets.find(t => t.id === timesheetId);
  
  if (!timesheet || timesheet.status !== 'approved') {
    throw new Error('Timesheet not found or not approved');
  }
  
  const grossPay = timesheet.totalHours * hourlyRate;
  const taxWithheld = grossPay * 0.15; // 15% tax (simplified)
  const superannuation = grossPay * 0.11; // 11% super
  const netPay = grossPay - taxWithheld;
  
  const payment: Omit<PaymentRecord, 'id'> = {
    userId: timesheet.userId,
    workerName: timesheet.workerName,
    workerEmail: timesheet.workerEmail,
    timesheetId: timesheet.id,
    weekEnding: timesheet.weekEnding,
    totalHours: timesheet.totalHours,
    hourlyRate,
    grossPay,
    taxWithheld,
    superannuation,
    netPay,
    paymentDate: new Date().toISOString(),
    status: 'pending',
  };
  
  return await createPaymentRecord(payment);
};

// Statistics Functions (for admin dashboard)
export const getStatistics = async () => {
  const timesheets = getFromStorage<Timesheet>(STORAGE_KEYS.TIMESHEETS);
  const swms = getFromStorage<SWMSForm>(STORAGE_KEYS.SWMS);
  const toolboxTalks = getFromStorage<ToolboxTalk>(STORAGE_KEYS.TOOLBOX);
  const incidents = getFromStorage<IncidentReport>(STORAGE_KEYS.INCIDENTS);
  const users = getFromStorage<User>(STORAGE_KEYS.USERS);
  
  return {
    totalWorkers: users.filter(u => u.role === 'worker').length,
    pendingWorkers: users.filter(u => u.role === 'pending').length,
    pendingTimesheets: timesheets.filter(t => t.status === 'pending').length,
    totalTimesheets: timesheets.length,
    submittedSWMS: swms.filter(s => s.status === 'submitted').length,
    totalSWMS: swms.length,
    submittedToolboxTalks: toolboxTalks.filter(t => t.status === 'submitted').length,
    totalToolboxTalks: toolboxTalks.length,
    activeIncidents: incidents.filter(i => i.status !== 'resolved').length,
    totalIncidents: incidents.length,
    totalHoursThisWeek: timesheets
      .filter(t => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(t.submittedDate) >= weekAgo;
      })
      .reduce((sum, t) => sum + t.totalHours, 0),
  };
};

// Timesheet Functions