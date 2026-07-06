import { useState } from 'react';
import { MapPin, ChevronDown, ChevronUp, Flag } from 'lucide-react';
import { LABELS } from './tripCardConfig';

interface Stop {
  order: number;
  name: string;
  scheduledTime: string;
  observedTime: string;
  onTime: boolean;
}

interface TripOverviewProps {
  date: string;
  tripStatus: string;
  stops: Stop[];
  mileage: {
    scheduled: string;
    observed: string;
  };
}

export function TripOverview({ date, tripStatus, stops, mileage }: TripOverviewProps) {
  const [isMileageExpanded, setIsMileageExpanded] = useState(true);

  // Show only first and last stop
  const firstStop = stops[0];
  const lastStop = stops[stops.length - 1];
  const displayStops = [firstStop, lastStop];

  return (
    <div className="space-y-4">
      {/* Date and Status */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">{date}</div>
        <span className="px-3 py-1 bg-green-50 text-green-700 rounded text-sm">
          {tripStatus}
        </span>
      </div>

      {/* Column Headers */}
      <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
        <div className="w-8 flex-shrink-0"></div>
        <div className="flex-1 text-xs text-gray-500 uppercase tracking-wide">Stop</div>
        <div className="w-16 text-xs text-gray-500 uppercase tracking-wide text-center">
          {LABELS.SCHEDULED_LABEL}
        </div>
        <div className="w-16 text-xs text-gray-500 uppercase tracking-wide text-center">
          {LABELS.OBSERVED_LABEL}
        </div>
      </div>

      {/* Stops List */}
      <div className="space-y-0">
        {displayStops.map((stop, index) => (
          <div key={stop.order} className="relative">
            {/* Connector Line */}
            {index < displayStops.length - 1 && (
              <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-300" style={{ height: '32px' }} />
            )}
            
            {/* Stop Row */}
            <div className="flex items-center gap-3 py-2">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  {index === 0 ? (
                    <MapPin className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Flag className="w-4 h-4 text-blue-600" />
                  )}
                </div>
              </div>

              {/* Stop Name */}
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-900 truncate">{stop.name}</div>
              </div>

              {/* Scheduled Time */}
              <div className="w-16 text-center">
                <span className="text-sm text-gray-700">{stop.scheduledTime}</span>
              </div>

              {/* Observed Time */}
              <div className="w-16 text-center">
                <span className={`text-sm ${stop.onTime ? 'text-green-700' : 'text-orange-700'}`}>
                  {stop.observedTime}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mileage Section (Collapsible) */}
      <div className="border-t border-gray-200 pt-4">
        <button
          onClick={() => setIsMileageExpanded(!isMileageExpanded)}
          className="w-full flex items-center justify-between text-sm text-gray-700 hover:text-gray-900"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="uppercase tracking-wide">{LABELS.MILEAGE_LABEL}</span>
          </div>
          {isMileageExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {isMileageExpanded && (
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{LABELS.SCHEDULED_LABEL}</span>
              <span className="font-medium">{mileage.scheduled}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{LABELS.OBSERVED_LABEL}</span>
              <span className="font-medium">{mileage.observed}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}