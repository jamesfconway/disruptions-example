import { X } from 'lucide-react';
import { DisruptionForm, DisruptionFormData } from './DisruptionForm';

interface DisruptionModalProps {
  entryMode: 'single' | 'multiple';
  onClose: () => void;
}

export function DisruptionModal({ entryMode, onClose }: DisruptionModalProps) {
  const handleSubmit = (data: DisruptionFormData) => {
    // Handle form submission
    console.log({ ...data, entryMode });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl">Add Service Disruption</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <DisruptionForm
            entryMode={entryMode}
            variant="modal"
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}
