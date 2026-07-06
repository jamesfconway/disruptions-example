import { useState } from 'react';
import { PreferencesModal } from './components/PreferencesModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8" style={{ minHeight: "100%" }}>
      {!isModalOpen && (
        <div className="max-w-2xl mx-auto bg-white/90 p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Admin-side prototype</p>
            <h2 className="text-2xl font-semibold text-gray-900">
              Configure disruption types, causes, and valid links
            </h2>
            <p className="text-sm leading-6 text-gray-600">
              This prototype focuses on the preferences flow behind the disruption workflow:
              defining disruption types, managing causes, and controlling which type-cause
              combinations can be used.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Open preferences prototype
          </button>
        </div>
      )}

      {isModalOpen && (
        <PreferencesModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
