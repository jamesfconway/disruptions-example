import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export interface DisruptionFormData {
  effect: EffectType;
  cause: string;
  comment: string;
  fromStop?: string;
  toStop?: string;
}

export type EffectType = 
  | 'full-cancellation'
  | 'partial-cancellation'
  | 'started-early'
  | 'started-late'
  | 'ended-early'
  | 'ended-late'
  | 'no-comms'
  | 'other';

interface DisruptionFormProps {
  entryMode: 'single' | 'multiple' | 'trip-card';
  variant?: 'modal' | 'card';
  onSubmit: (data: DisruptionFormData) => void;
  onCancel: () => void;
}

export function DisruptionForm({ 
  entryMode, 
  variant = 'modal',
  onSubmit, 
  onCancel 
}: DisruptionFormProps) {
  const [effect, setEffect] = useState<EffectType | ''>('');
  const [cause, setCause] = useState('');
  const [comment, setComment] = useState('');
  const [fromStop, setFromStop] = useState('');
  const [toStop, setToStop] = useState('');

  // Mock data for stops
  const stops = [
    'Central Station',
    'Park Street',
    'Town Hall',
    'Circular Quay',
    'Wynyard',
    'Martin Place',
    'Kings Cross',
    'Edgecliff',
  ];

  // Filter available "to" stops based on selected "from" stop
  const availableToStops = fromStop
    ? stops.slice(stops.indexOf(fromStop) + 1)
    : stops;

  const causes = [
    'Vehicle breakdown',
    'Traffic congestion',
    'Road works',
    'Accident',
    'Weather conditions',
    'Staff shortage',
    'Medical emergency',
    'Police incident',
    'Other',
  ];

  const effects = [
    { value: 'full-cancellation', label: 'Full cancellation' },
    { value: 'partial-cancellation', label: 'Partial cancellation' },
    { value: 'started-early', label: 'Started trip early' },
    { value: 'started-late', label: 'Started trip late' },
    { value: 'ended-early', label: 'Ended trip early' },
    { value: 'ended-late', label: 'Ended trip late' },
    { value: 'no-comms', label: 'No comms' },
    { value: 'other', label: 'Other' },
  ];

  // Reset dynamic fields when effect changes
  useEffect(() => {
    setFromStop('');
    setToStop('');
  }, [effect]);

const isCancellation =
  effect === 'full-cancellation' || effect === 'partial-cancellation';

// Get summary banner message
const getSummaryMessage = () => {
  if (effect === 'full-cancellation') {
    if (entryMode === 'single' || entryMode === 'trip-card') {
      return 'Cancelling this trip will remove 39.76 km.';
    } else {
      return 'You will cancel 2 trips with a combined total of 65.761 km, of which 65.761 km are commercial.';
    }
  }

  if (effect === 'partial-cancellation') {
    if (entryMode === 'single' || entryMode === 'trip-card') {
      return 'You will lose 9.755 km by cancelling this section of the service.';
    } else {
      return 'You will cancel this section for 2 trips, with a combined loss of 19.51 km.';
    }
  }

  return '';
};


  // Get button labels
  const getLeftButtonLabel = () => {
    if (isCancellation) {
      if (entryMode === 'multiple') return 'Keep Trips';
      return entryMode === 'trip-card' ? 'Keep trip' : 'Keep Service';
    }
    return 'Cancel';
  };

const getRightButtonLabel = () => {
  if (effect === 'full-cancellation') {
    return entryMode === 'multiple' ? 'Cancel trips' : 'Cancel trip';
  }

  if (effect === 'partial-cancellation') {
    return entryMode === 'multiple'
      ? 'Cancel trip sections'
      : 'Cancel trip section';
  }

  return 'Add Disruption';
};


  const handleSubmit = () => {
    if (!effect || !cause) return;
    
    onSubmit({
      effect: effect as EffectType,
      cause,
      comment,
      fromStop: effect === 'partial-cancellation' ? fromStop : undefined,
      toStop: effect === 'partial-cancellation' ? toStop : undefined,
    });
    
    // Close modal and return to home screen for single/multiple modes
    if (entryMode === 'single' || entryMode === 'multiple') {
      onCancel();
    }
  };

  // Styling classes based on variant
  const spacing = variant === 'modal' ? 'space-y-6' : 'space-y-4';
  const labelClass = variant === 'modal' ? 'text-sm' : 'text-xs';
  const inputClass = variant === 'modal' 
    ? 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
    : 'w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';
  const textareaRows = variant === 'modal' ? 4 : 3;
  const buttonSize = variant === 'modal' ? 'px-4 py-2' : 'px-4 py-2 text-sm';
  const bannerPadding = variant === 'modal' ? 'p-4' : 'p-3';
  const iconSize = variant === 'modal' ? 'w-5 h-5' : 'w-4 h-4';
  const bannerTextSize = variant === 'modal' ? 'text-sm' : 'text-xs';

  return (
    <div className={spacing}>
      {/* Effect */}
      <div className={variant === 'modal' ? 'space-y-2' : 'space-y-1.5'}>
        <label htmlFor="effect" className={`block ${labelClass} font-medium text-gray-700`}>
          Type <span className="text-red-500">*</span>
        </label>
        <select
          id="effect"
          value={effect}
          onChange={(e) => setEffect(e.target.value as EffectType)}
          className={inputClass}
          required
        >
          <option value="">Select...</option>
          {effects.map((eff) => (
            <option key={eff.value} value={eff.value}>
              {eff.label}
            </option>
          ))}
        </select>
      </div>

      {/* Cause */}
      <div className={variant === 'modal' ? 'space-y-2' : 'space-y-1.5'}>
        <label htmlFor="cause" className={`block ${labelClass} font-medium text-gray-700`}>
          Cause <span className="text-red-500">*</span>
        </label>
        <select
          id="cause"
          value={cause}
          onChange={(e) => setCause(e.target.value)}
          className={inputClass}
          required
        >
          <option value="">Select...</option>
          {causes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Comment */}
      <div className={variant === 'modal' ? 'space-y-2' : 'space-y-1.5'}>
        <label htmlFor="comment" className={`block ${labelClass} font-medium text-gray-700`}>
          Comment
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={textareaRows}
          placeholder="Add any additional information (optional)…"
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Dynamic Section - Partial Cancellation */}
      {effect === 'partial-cancellation' && (
        <div className={variant === 'modal' ? 'space-y-4 pt-2' : 'space-y-3 pt-2'}>
          <p className={`${labelClass} text-gray-600`}>
            Select the disrupted trip's start and end points.
          </p>
          
          <div className={variant === 'modal' ? 'grid grid-cols-2 gap-4' : 'grid grid-cols-2 gap-3'}>
            {/* From Stop */}
            <div className={variant === 'modal' ? 'space-y-2' : 'space-y-1.5'}>
              <label htmlFor="fromStop" className={`block ${labelClass} font-medium text-gray-700`}>
                From stop
              </label>
              <select
                id="fromStop"
                value={fromStop}
                onChange={(e) => setFromStop(e.target.value)}
                className={inputClass}
              >
                <option value="">First stop affected</option>
                {stops.slice(0, -1).map((stop) => (
                  <option key={stop} value={stop}>
                    {stop}
                  </option>
                ))}
              </select>
            </div>

            {/* To Stop */}
            <div className={variant === 'modal' ? 'space-y-2' : 'space-y-1.5'}>
              <label htmlFor="toStop" className={`block ${labelClass} font-medium text-gray-700`}>
                To stop
              </label>
              <select
                id="toStop"
                value={toStop}
                onChange={(e) => setToStop(e.target.value)}
                className={inputClass}
                disabled={!fromStop}
              >
                <option value="">Last stop affected</option>
                {availableToStops.map((stop) => (
                  <option key={stop} value={stop}>
                    {stop}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Summary Banner (Conditional) */}
      {isCancellation && (
        <div className={`bg-orange-50 border border-orange-200 rounded ${variant === 'modal' ? '-md' : ''} ${bannerPadding} flex items-start gap-${variant === 'modal' ? '3' : '2'}`}>
          <AlertTriangle className={`${iconSize} text-orange-600 flex-shrink-0 mt-0.5`} />
          <p className={`${bannerTextSize} ${variant === 'modal' ? 'text-gray-800' : 'text-orange-800'}`}>
            {getSummaryMessage()}
          </p>
        </div>
      )}

      {/* Footer Buttons */}
      <div className={`flex items-center justify-end gap-${variant === 'modal' ? '3' : '2'} ${variant === 'card' ? 'pt-2' : ''}`}>
        <button
          onClick={onCancel}
          className={`${buttonSize} text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors`}
        >
          {getLeftButtonLabel()}
        </button>
        <button
          onClick={handleSubmit}
          disabled={!effect || !cause}
          className={`${buttonSize} text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed`}
        >
          {getRightButtonLabel()}
        </button>
      </div>
    </div>
  );
}