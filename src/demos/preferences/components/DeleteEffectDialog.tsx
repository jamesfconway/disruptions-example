import { X } from 'lucide-react';

interface Cause {
  name: string;
}

interface DeleteEffectDialogProps {
  effectName: string;
  linkedCauses: Cause[];
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteEffectDialog({
  effectName,
  linkedCauses,
  onCancel,
  onConfirm,
}: DeleteEffectDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3>Delete Disruption Type</h3>
          <button onClick={onCancel} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <p className="mb-4">
            Deleting the <span className="font-semibold">{effectName}</span> disruption type will
            remove the following cause links:
          </p>

          {linkedCauses.length > 0 ? (
            <ul className="space-y-2 mb-4">
              {linkedCauses.map((cause, index) => (
                <li key={index} className="text-gray-700">
                  • {cause.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mb-4 italic">No linked causes.</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}