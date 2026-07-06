import { useState } from 'react';
import { PreferencesModal } from './components/PreferencesModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Open Preferences
      </button>

      {isModalOpen && (
        <PreferencesModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
