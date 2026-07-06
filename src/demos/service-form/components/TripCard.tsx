import { useState } from 'react';
import { X, User, Briefcase, Bus, MoreHorizontal, FileText, MessageSquare } from 'lucide-react';
import { DisruptionForm, DisruptionFormData } from './DisruptionForm';
import { TripOverview } from './TripOverview';
import { ActivityLogs } from './ActivityLogs';
import { LABELS, mockTripData, mockActivityLogs, Activity } from './tripCardConfig';

interface TripCardProps {
  onClose: () => void;
}

type TabType = 'trip-overview' | 'record-disruption' | 'activity-logs';

export function TripCard({ onClose }: TripCardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('trip-overview');
  const [submittedDisruptions, setSubmittedDisruptions] = useState<Activity[]>([]);

  const handleSubmit = (data: DisruptionFormData) => {
    // Create a new activity from the form data
    const newActivity: Activity = {
      id: `disruption-${Date.now()}`,
      type: 'disruption',
      description: 'Disruption recorded',
      timestamp: '12:00 - 27 Nov',
      disruptionData: {
        effect: data.effect,
        cause: data.cause,
        comment: data.comment,
        fromStop: data.fromStop,
        toStop: data.toStop,
      }
    };

    // Add to disruptions list
    setSubmittedDisruptions([newActivity, ...submittedDisruptions]);
    
    // Switch to activity logs tab to show the submission
    setActiveTab('activity-logs');
  };

  // Combine submitted disruptions with mock activity logs
  const allActivities = [...submittedDisruptions, ...mockActivityLogs];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg">{LABELS.MODAL_TITLE}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Blue Header Section - Route & Trip Info */}
        <div className="bg-slate-100 p-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0">
                <Bus className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-baseline gap-4">
                  <div>
                    <div className="text-xs text-gray-600 uppercase tracking-wide">
                      {LABELS.ROUTE_LABEL}
                    </div>
                    <div className="text-lg">{mockTripData.route}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 uppercase tracking-wide">
                      {LABELS.TRIP_LABEL}
                    </div>
                    <div className="text-sm">{mockTripData.tripId}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-white rounded text-xs">
                {mockTripData.status}
              </span>
              <button className="text-gray-600 hover:text-gray-800">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Driver & Vehicle Details */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <div className="text-xs text-gray-600 uppercase tracking-wide mb-2">
                {LABELS.DRIVER_DETAILS}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-blue-600">
                  <User className="w-3 h-3" />
                  <span>{mockTripData.driver.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3"></div>
                  <span>{mockTripData.driver.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-3 h-3 text-gray-500" />
                  <span>{mockTripData.driver.badge}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600 uppercase tracking-wide mb-2">
                {LABELS.VEHICLE_DETAILS}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-blue-600">
                  <Bus className="w-3 h-3" />
                  <span>{mockTripData.vehicle.number}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bus className="w-3 h-3 text-gray-500" />
                  <span>{mockTripData.vehicle.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('trip-overview')}
            className={`flex-1 px-4 py-3 text-sm transition-colors relative ${
              activeTab === 'trip-overview'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {LABELS.TAB_TRIP_OVERVIEW}
            {activeTab === 'trip-overview' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('record-disruption')}
            className={`flex-1 px-4 py-3 text-sm transition-colors relative ${
              activeTab === 'record-disruption'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {LABELS.TAB_RECORD_DISRUPTION}
            {activeTab === 'record-disruption' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('activity-logs')}
            className={`flex-1 px-4 py-3 text-sm transition-colors relative ${
              activeTab === 'activity-logs'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {LABELS.TAB_ACTIVITY_LOGS}
            {activeTab === 'activity-logs' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === 'trip-overview' && (
            <TripOverview
              date={mockTripData.date}
              tripStatus={mockTripData.tripStatus}
              stops={mockTripData.stops}
              mileage={mockTripData.mileage}
            />
          )}

          {activeTab === 'record-disruption' && (
            <DisruptionForm
              entryMode="trip-card"
              variant="card"
              onSubmit={handleSubmit}
              onCancel={onClose}
            />
          )}

          {activeTab === 'activity-logs' && (
            <ActivityLogs activities={allActivities} />
          )}
        </div>
      </div>
    </div>
  );
}