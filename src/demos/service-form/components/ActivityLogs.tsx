import { useState } from 'react';
import { MessageSquare, Edit3, Trash2, Star, AlertTriangle } from 'lucide-react';
import { Activity, LABELS } from './tripCardConfig';

interface ActivityLogsProps {
  activities: Activity[];
}

export function ActivityLogs({ activities }: ActivityLogsProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'comment':
        return <MessageSquare className="w-4 h-4 text-blue-600" />;
      case 'disruption':
        return (
          <div title="disruption">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
          </div>
        );
      case 'driver-action':
        return <div className="w-4 h-4 rounded-full bg-gray-400" />;
      case 'system-event':
        return <div className="w-4 h-4 rounded-full bg-gray-400" />;
      case 'service-selection':
        return <div className="w-4 h-4 rounded-full bg-gray-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Activity Timeline */}
      <div className="space-y-3">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className={`flex items-start gap-3 p-2 rounded ${
              activity.type === 'disruption' ? 'bg-yellow-50' : ''
            }`}
          >
            {/* Activity Icon */}
            <div className="flex-shrink-0 mt-1">
              {getActivityIcon(activity.type)}
            </div>

            {/* Activity Content */}
            <div className="flex-1 min-w-0">
              {activity.type === 'disruption' && activity.disruptionData ? (
                <div className="space-y-1">
                  <div className="text-sm text-gray-900">
                    Disruption recorded
                  </div>
                  <div className="text-sm text-gray-700">
                    <div>Type: {activity.disruptionData.effect}</div>
                    {activity.disruptionData.fromStop && activity.disruptionData.toStop && (
                      <div className="text-xs text-gray-600 ml-4">
                        From: {activity.disruptionData.fromStop} → To: {activity.disruptionData.toStop}
                      </div>
                    )}
                    <div>Cause: {activity.disruptionData.cause}</div>
                    {activity.disruptionData.comment && (
                      <div>Comment: {activity.disruptionData.comment}</div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-sm text-gray-900">
                    {activity.description}
                  </div>
                  
                  {activity.stop && (
                    <div className="text-xs text-gray-500 mt-0.5">
                      Stop #{activity.stop.order} - {activity.stop.name}
                    </div>
                  )}
                  
                  {activity.author && activity.type === 'comment' && (
                    <div className="text-xs text-gray-500 mt-0.5">
                      {LABELS.BY_PREFIX} {activity.author}
                    </div>
                  )}
                  
                  {activity.author && activity.type === 'service-selection' && (
                    <div className="text-xs text-gray-500 mt-0.5">
                      {LABELS.BY_PREFIX} {activity.author}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Timestamp */}
            <div className="flex-shrink-0">
              <span className="text-xs text-gray-500">{activity.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}