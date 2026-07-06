import { useState } from 'react';
import { Sliders, Eye, Trash2, Lock } from 'lucide-react';

export interface Cause {
  id: string;
  name: string;
  code: string;
  gtfsRtCause: string;
  costClass: string;
  visible: boolean;
  isSystem: boolean;
}

const GTFS_RT_CAUSES = [
  'Unknown cause',
  'Technical problem',
  'Weather',
  'Police activity',
  'Medical emergency',
  'Maintenance',
  'Accident',
  'Protest',
  'Strike',
  'Other cause',
];

const COST_CLASSES = [
  'Deductible',
  'Non-deductible',
  'Not applicable',
];

const INITIAL_CAUSES: Cause[] = [
  {
    id: '1',
    name: 'Accident',
    code: 'AC',
    gtfsRtCause: 'Accident',
    costClass: 'Deductible',
    visible: true,
    isSystem: false,
  },
  {
    id: '2',
    name: 'Weather',
    code: 'WX',
    gtfsRtCause: 'Weather',
    costClass: 'Deductible',
    visible: true,
    isSystem: false,
  },
  {
    id: '3',
    name: 'Vehicle breakdown',
    code: 'VB',
    gtfsRtCause: 'Technical problem',
    costClass: 'Non-deductible',
    visible: true,
    isSystem: false,
  },
  {
    id: '4',
    name: 'Staff shortage',
    code: 'SS',
    gtfsRtCause: 'Other cause',
    costClass: 'Non-deductible',
    visible: true,
    isSystem: false,
  },
  {
    id: '5',
    name: 'Police activity',
    code: 'PA',
    gtfsRtCause: 'Police activity',
    costClass: 'Deductible',
    visible: true,
    isSystem: false,
  },
  {
    id: '6',
    name: 'Medical emergency',
    code: 'ME',
    gtfsRtCause: 'Medical emergency',
    costClass: 'Deductible',
    visible: true,
    isSystem: false,
  },
  {
    id: '7',
    name: 'Construction',
    code: 'CN',
    gtfsRtCause: 'Other cause',
    costClass: 'Deductible',
    visible: true,
    isSystem: false,
  },
  {
    id: '8',
    name: 'Traffic congestion',
    code: 'TC',
    gtfsRtCause: 'Other cause',
    costClass: 'Deductible',
    visible: true,
    isSystem: false,
  },
  {
    id: '9',
    name: 'Other',
    code: 'OT',
    gtfsRtCause: 'Other cause',
    costClass: 'Not applicable',
    visible: true,
    isSystem: true,
  },
];

export function CausesTable() {
  const [causes, setCauses] = useState<Cause[]>(INITIAL_CAUSES);
  const [hasChanges, setHasChanges] = useState(false);

  const updateCause = (id: string, updates: Partial<Cause>) => {
    setCauses((prev) =>
      prev.map((cause) =>
        cause.id === id ? { ...cause, ...updates } : cause
      )
    );
    setHasChanges(true);
  };

  const deleteCause = (id: string) => {
    setCauses((prev) => prev.filter((cause) => cause.id !== id));
    setHasChanges(true);
  };

  const addNewCause = () => {
    const newCause: Cause = {
      id: Date.now().toString(),
      name: '',
      code: '',
      gtfsRtCause: 'Other cause',
      costClass: 'Not applicable',
      visible: true,
      isSystem: false,
    };
    setCauses((prev) => [...prev, newCause]);
    setHasChanges(true);
  };

  const handleSave = () => {
    // Save logic here
    setHasChanges(false);
  };

  return (
    <div className="p-6 flex flex-col h-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Sliders className="w-5 h-5" />
          <h2>Disruption causes</h2>
        </div>
        <p className="text-gray-600">
          Define service disruption causes to categorize modified services and their effects in reports
        </p>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-4">
                Cause<span className="text-red-500">*</span>
              </th>
              <th className="text-left py-2 pr-4">
                Code<span className="text-red-500">*</span>
              </th>
              <th className="text-left py-2 pr-4">GTFS-RT cause</th>
              <th className="text-left py-2 pr-4">Cost class</th>
              <th className="text-left py-2 pr-4 w-12"></th>
              <th className="text-left py-2 w-12"></th>
              <th className="text-left py-2 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {causes.map((cause) => (
              <tr key={cause.id} className="border-b hover:bg-gray-50">
                {/* Cause name */}
                <td className="py-2 pr-4">
                  <input
                    type="text"
                    value={cause.name}
                    onChange={(e) =>
                      updateCause(cause.id, { name: e.target.value })
                    }
                    disabled={cause.isSystem}
                    className={`w-full px-3 py-1.5 border border-gray-300 rounded ${
                      cause.isSystem
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : ''
                    }`}
                  />
                </td>

                {/* Code */}
                <td className="py-2 pr-4 w-32">
                  <input
                    type="text"
                    value={cause.code}
                    onChange={(e) =>
                      updateCause(cause.id, { code: e.target.value.toUpperCase() })
                    }
                    className="w-full px-3 py-1.5 border border-gray-300 rounded uppercase"
                  />
                </td>

                {/* GTFS-RT cause */}
                <td className="py-2 pr-4">
                  <div className="relative">
                    <select
                      value={cause.gtfsRtCause}
                      onChange={(e) =>
                        updateCause(cause.id, { gtfsRtCause: e.target.value })
                      }
                      className="w-full px-3 py-1.5 border border-gray-300 rounded appearance-none bg-white pr-8"
                    >
                      {GTFS_RT_CAUSES.map((gtfsCause) => (
                        <option key={gtfsCause} value={gtfsCause}>
                          {gtfsCause}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </td>

                {/* Cost class */}
                <td className="py-2 pr-4">
                  <div className="relative">
                    <select
                      value={cause.costClass}
                      onChange={(e) =>
                        updateCause(cause.id, { costClass: e.target.value })
                      }
                      className="w-full px-3 py-1.5 border border-gray-300 rounded appearance-none bg-white pr-8"
                    >
                      {COST_CLASSES.map((costClass) => (
                        <option key={costClass} value={costClass}>
                          {costClass}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </td>

                {/* System cause (lock icon) */}
                <td className="py-2 pr-4 text-center">
                  {cause.isSystem && (
                    <div className="group relative inline-block">
                      <Lock className="w-4 h-4 text-gray-400" />
                      <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10">
                        <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                          Built-in cause used by the platform. Cannot be renamed or deleted.
                        </div>
                      </div>
                    </div>
                  )}
                </td>

                {/* Visibility (eye icon) */}
                <td className="py-2 pr-4 text-center">
                  <button
                    onClick={() =>
                      updateCause(cause.id, { visible: !cause.visible })
                    }
                    disabled={cause.isSystem}
                    className={`group relative inline-block ${
                      cause.isSystem ? 'cursor-not-allowed' : ''
                    }`}
                  >
                    <Eye
                      className={`w-4 h-4 ${
                        cause.isSystem
                          ? 'text-gray-300'
                          : cause.visible
                          ? 'text-gray-600'
                          : 'text-gray-300'
                      }`}
                    />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                      <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        {cause.visible ? 'Visible' : 'Hidden'}
                      </div>
                    </div>
                  </button>
                </td>

                {/* Delete */}
                <td className="py-2 text-center">
                  <button
                    onClick={() => deleteCause(cause.id)}
                    disabled={cause.isSystem}
                    className={`${
                      cause.isSystem
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-400 hover:text-red-600'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t">
        <button
          onClick={addNewCause}
          className="px-4 py-2 bg-blue-600 text-white rounded uppercase tracking-wide hover:bg-blue-700"
        >
          Add new service disruption cause
        </button>
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className={`px-6 py-2 rounded uppercase tracking-wide ${
            hasChanges
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Save
        </button>
      </div>
    </div>
  );
}