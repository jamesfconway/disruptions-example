// Trip Card Configuration - Edit all text and labels here

export const LABELS = {
  // Modal Header
  MODAL_TITLE: 'Trip overview',
  
  // Header Section
  ROUTE_LABEL: 'ROUTE',
  TRIP_LABEL: 'TRIP',
  DRIVER_DETAILS: 'DRIVER DETAILS',
  VEHICLE_DETAILS: 'VEHICLE DETAILS',
  
  // Tabs
  TAB_TRIP_OVERVIEW: 'Trip overview',
  TAB_RECORD_DISRUPTION: 'Record Disruption',
  TAB_ACTIVITY_LOGS: 'Activity logs',
  
  // Action Buttons
  BTN_JUSTIFICATIONS: 'Justifications',
  BTN_COMMENT: 'Comment',
  BTN_EDIT: 'Edit',
  BTN_DELETE: 'Delete',
  
  // Trip Overview Section
  MILEAGE_LABEL: 'MILEAGE',
  SCHEDULED_LABEL: 'Scheduled',
  OBSERVED_LABEL: 'Observed',
  
  // Status Badges
  STATUS_PERFORMED: 'Performed',
  STATUS_COMMERCIAL: 'Commercial',
  STATUS_SCHEDULED: 'Scheduled',
  
  // Activity Logs
  BY_PREFIX: 'By',
};

export const mockTripData = {
  route: '100',
  tripId: '100_Out_1',
  status: 'Commercial',
  driver: {
    name: 'João Silva',
    id: '12345',
    badge: 'D12345'
  },
  vehicle: {
    number: '101',
    id: 'Block 1'
  },
  date: 'Nov 27th',
  tripStatus: 'Performed',
  stops: [
    {
      order: 1,
      name: 'TRAIN STATION',
      scheduledTime: '04:15',
      observedTime: '04:16',
      onTime: true
    },
    {
      order: 2,
      name: 'RUA DA LIBERDADE',
      scheduledTime: '04:18',
      observedTime: '04:19',
      onTime: true
    },
    {
      order: 3,
      name: 'PRAIA DA RAINHA',
      scheduledTime: '04:20',
      observedTime: '04:21',
      onTime: true
    },
    {
      order: 4,
      name: 'NOVA PRAIA',
      scheduledTime: '04:22',
      observedTime: '04:23',
      onTime: true
    },
    {
      order: 5,
      name: 'HOSPITAL',
      scheduledTime: '04:29',
      observedTime: '04:35',
      onTime: false
    }
  ],
  mileage: {
    scheduled: '7.54 km',
    observed: '6.93 km'
  }
};

export interface Activity {
  id: string;
  type: 'comment' | 'driver-action' | 'system-event' | 'service-selection' | 'disruption';
  description: string;
  timestamp: string;
  author?: string;
  stop?: { name: string; order: number };
  isFavorited?: boolean;
  disruptionData?: {
    effect: string;
    cause: string;
    comment?: string;
    fromStop?: string;
    toStop?: string;
  };
}

export const mockActivityLogs: Activity[] = [
  {
    id: '2',
    type: 'driver-action',
    description: 'Driver finished trip',
    timestamp: '04:36 - 27 Nov',
    isFavorited: false
  },
  {
    id: '3',
    type: 'driver-action',
    description: 'Driver arrived at stop #5 - HOSPITAL',
    timestamp: '04:35 - 27 Nov',
    stop: { name: 'HOSPITAL', order: 5 },
    isFavorited: false
  },
  {
    id: '4',
    type: 'system-event',
    description: 'First stop detected',
    timestamp: '04:16 - 27 Nov',
    stop: { name: 'TRAIN STATION', order: 1 },
    isFavorited: false
  },
    {
    id: '5',
    type: 'driver-action',
    description: 'Driver started trip',
    timestamp: '04:15 - 27 Nov',
    isFavorited: false
  },
  {
    id: '6',
    type: 'service-selection',
    description: 'Service Selected: 100_Out_1',
    timestamp: '04:14 - 27 Nov',
    author: 'João Silva',
    isFavorited: false
  }
];