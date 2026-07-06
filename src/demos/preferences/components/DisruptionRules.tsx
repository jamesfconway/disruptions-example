import { useState } from 'react';
import { Search, GitBranch, LayoutGrid, List } from 'lucide-react';

interface Cause {
  id: string;
  name: string;
  code: string;
}

interface Effect {
  id: string;
  name: string;
  code: string;
}

// Sample data - causes from your existing system
const CAUSES: Cause[] = [
  { id: '1', name: 'Accident', code: 'AC' },
  { id: '2', name: 'Weather', code: 'WX' },
  { id: '3', name: 'Construction', code: 'CN' },
  { id: '4', name: 'Vehicle breakdown', code: 'VB' },
  { id: '5', name: 'Staff shortage', code: 'SS' },
  { id: '6', name: 'Police activity', code: 'PA' },
  { id: '7', name: 'Medical emergency', code: 'ME' },
  { id: '8', name: 'Traffic congestion', code: 'TC' },
  { id: '9', name: 'Road closure', code: 'RC' },
  { id: '10', name: 'Signal failure', code: 'SF' },
  { id: '11', name: 'Power outage', code: 'PO' },
  { id: '12', name: 'Equipment failure', code: 'EF' },
  { id: '13', name: 'Demonstration', code: 'DM' },
  { id: '14', name: 'Special event', code: 'SE' },
  { id: '15', name: 'Mechanical issue', code: 'MI' },
];

// Sample data - effects from your existing system
const EFFECTS: Effect[] = [
  { id: '1', name: 'Cancellation', code: 'CN' },
  { id: '2', name: 'Partial Cancellation', code: 'PC' },
  { id: '3', name: 'Detour', code: 'DT' },
  { id: '4', name: 'Modified Service', code: 'MS' },
  { id: '5', name: 'Late arrival', code: 'LA' },
  { id: '6', name: 'Early arrival', code: 'EA' },
  { id: '7', name: 'Missed trip', code: 'MT' },
  { id: '8', name: 'Off-route', code: 'OR' },
  { id: '9', name: 'Other', code: 'SS' },
];

// Initial pairings - effect ID to array of cause IDs
const INITIAL_PAIRINGS: Record<string, string[]> = {
  '1': ['1', '2', '4', '5', '10', '11'], // Cancellation
  '2': ['1', '2', '3', '5'], // Partial Cancellation
  '3': ['1', '3', '6', '9'], // Detour
  '4': ['2', '3', '8', '14'], // Modified Service
  '5': ['4', '8', '15'], // Late arrival
  '6': [], // Early arrival - zero state example
  '7': ['4', '5', '12', '15'], // Missed trip
  '8': ['1', '3', '6'], // Off-route
  '9': ['7', '13'], // Other
};

type Mode = 'effect' | 'cause';
type ViewMode = 'pills' | 'list';

export function DisruptionRules() {
  const [mode, setMode] = useState<Mode>('effect');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedEffectId, setSelectedEffectId] = useState<string>('1');
  const [selectedCauseId, setSelectedCauseId] = useState<string>('1');
  const [leftSearch, setLeftSearch] = useState('');
  const [rightSearch, setRightSearch] = useState('');
  const [pairings, setPairings] = useState<Record<string, string[]>>(INITIAL_PAIRINGS);

  // Convert effect-to-causes to cause-to-effects for "By Cause" mode
  const getCausePairings = (): Record<string, string[]> => {
    const causePairings: Record<string, string[]> = {};
    CAUSES.forEach((cause) => {
      causePairings[cause.id] = [];
    });
    
    Object.entries(pairings).forEach(([effectId, causeIds]) => {
      causeIds.forEach((causeId) => {
        if (!causePairings[causeId]) {
          causePairings[causeId] = [];
        }
        causePairings[causeId].push(effectId);
      });
    });
    
    return causePairings;
  };

  const togglePairing = (effectId: string, causeId: string) => {
    setPairings((prev) => {
      const current = prev[effectId] || [];
      const isChecked = current.includes(causeId);
      
      return {
        ...prev,
        [effectId]: isChecked
          ? current.filter((id) => id !== causeId)
          : [...current, causeId],
      };
    });
  };

  const isCauseAllowedForEffect = (effectId: string, causeId: string): boolean => {
    return (pairings[effectId] || []).includes(causeId);
  };

  const isEffectAllowedForCause = (causeId: string, effectId: string): boolean => {
    return (pairings[effectId] || []).includes(causeId);
  };

  const filteredEffects = EFFECTS.filter((effect) =>
    effect.name.toLowerCase().includes(leftSearch.toLowerCase()) ||
    effect.code.toLowerCase().includes(leftSearch.toLowerCase())
  );

  const filteredCauses = CAUSES.filter((cause) =>
    cause.name.toLowerCase().includes(leftSearch.toLowerCase()) ||
    cause.code.toLowerCase().includes(leftSearch.toLowerCase())
  );

  const selectedEffect = EFFECTS.find((e) => e.id === selectedEffectId);
  const selectedCause = CAUSES.find((c) => c.id === selectedCauseId);
  const causePairings = getCausePairings();

  // Filter items for right panel based on right search
  const filteredRightCauses = CAUSES.filter((cause) =>
    cause.name.toLowerCase().includes(rightSearch.toLowerCase()) ||
    cause.code.toLowerCase().includes(rightSearch.toLowerCase())
  );

  const filteredRightEffects = EFFECTS.filter((effect) =>
    effect.name.toLowerCase().includes(rightSearch.toLowerCase()) ||
    effect.code.toLowerCase().includes(rightSearch.toLowerCase())
  );

  return (
    <div className="p-6 flex flex-col h-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            <h2>Disruption Linking</h2>
          </div>
          
          {/* View Mode Toggle - Top Right */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1 bg-gray-50">
            <button
              onClick={() => setViewMode('pills')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'pills'
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">
          Configure which causes are valid for each disruption type and vice versa
        </p>

        {/* Mode Selector - Segmented Control */}
        <div className="inline-flex rounded-lg border border-gray-300 p-1 bg-gray-50">
          <button
            onClick={() => setMode('effect')}
            className={`px-4 py-2 rounded-md transition-colors ${
              mode === 'effect'
                ? 'bg-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            By Type
          </button>
          <button
            onClick={() => setMode('cause')}
            className={`px-4 py-2 rounded-md transition-colors ${
              mode === 'cause'
                ? 'bg-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            By Cause
          </button>
        </div>
      </div>

      {/* Conditional Layout based on viewMode */}
      {viewMode === 'pills' ? (
        // PILLS VIEW - Hybrid Layout
        <div className="flex-1 flex gap-6 overflow-hidden">{mode === 'effect' ? (
          <>
            {/* Left: Slim Effects List */}
            <div className="w-52 flex flex-col border-r pr-4">
              {/* Search */}
              <div className="mb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search types…"
                    value={leftSearch}
                    onChange={(e) => setLeftSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>

              {/* Effects List */}
              <div className="flex-1 overflow-y-auto -mr-4 pr-4">
                <div className="space-y-1">
                  {filteredEffects.map((effect) => (
                    <button
                      key={effect.id}
                      onClick={() => setSelectedEffectId(effect.id)}
                      className={`w-full text-left px-3 py-2 rounded transition-colors ${
                        selectedEffectId === effect.id
                          ? 'bg-blue-50 text-blue-900'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div>{effect.name}</div>
                      <div className="text-xs text-gray-500">{effect.code}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form-Style Panel with Pill Multi-Select */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Selected Item Header */}
              <div className="mb-4">
                <h3 className="mb-1">
                  {selectedEffect?.name}{' '}
                  <span className="text-gray-500">({selectedEffect?.code})</span>
                </h3>
                <p className="text-sm text-gray-600">Allowed Causes</p>
              </div>

              {/* Empty State Message */}
              {pairings[selectedEffectId]?.length === 0 && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
                  No causes configured yet. Select causes below to allow them.
                </div>
              )}

              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search causes…"
                    value={rightSearch}
                    onChange={(e) => setRightSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* Pill Grid */}
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                  {filteredRightCauses.map((cause) => {
                    const isSelected = isCauseAllowedForEffect(selectedEffectId, cause.id);
                    return (
                      <button
                        key={cause.id}
                        onClick={() => togglePairing(selectedEffectId, cause.id)}
                        className={`px-4 py-3 rounded-lg text-left transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <div className="text-sm">{cause.name}</div>
                        <div className={`text-xs mt-1 ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                          {cause.code}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Left: Slim Causes List */}
            <div className="w-52 flex flex-col border-r pr-4">
              {/* Search */}
              <div className="mb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search causes…"
                    value={leftSearch}
                    onChange={(e) => setLeftSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>

              {/* Causes List */}
              <div className="flex-1 overflow-y-auto -mr-4 pr-4">
                <div className="space-y-1">
                  {filteredCauses.map((cause) => (
                    <button
                      key={cause.id}
                      onClick={() => setSelectedCauseId(cause.id)}
                      className={`w-full text-left px-3 py-2 rounded transition-colors ${
                        selectedCauseId === cause.id
                          ? 'bg-blue-50 text-blue-900'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div>{cause.name}</div>
                      <div className="text-xs text-gray-500">{cause.code}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form-Style Panel with Pill Multi-Select */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Selected Item Header */}
              <div className="mb-4">
                <h3 className="mb-1">
                  {selectedCause?.name}{' '}
                  <span className="text-gray-500">({selectedCause?.code})</span>
                </h3>
                <p className="text-sm text-gray-600">Allowed Disruption Types</p>
              </div>

              {/* Empty State Message */}
              {causePairings[selectedCauseId]?.length === 0 && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
                  No Disruption Types configured yet. Select Disruptions below to allow them.
                </div>
              )}

              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search disruption types…"
                    value={rightSearch}
                    onChange={(e) => setRightSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* Pill Grid */}
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                  {filteredRightEffects.map((effect) => {
                    const isSelected = isEffectAllowedForCause(selectedCauseId, effect.id);
                    return (
                      <button
                        key={effect.id}
                        onClick={() => togglePairing(effect.id, selectedCauseId)}
                        className={`px-4 py-3 rounded-lg text-left transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <div className="text-sm">{effect.name}</div>
                        <div className={`text-xs mt-1 ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                          {effect.code}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    ) : (
      // LIST VIEW - Two-Column Checklist Layout
      <div className="flex-1 flex gap-6 overflow-hidden">
        {mode === 'effect' ? (
          <>
            {/* Left: Effects List */}
            <div className="w-80 flex flex-col border rounded-lg bg-white">
              {/* Search */}
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search effects…"
                    value={leftSearch}
                    onChange={(e) => setLeftSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* Effects List */}
              <div className="flex-1 overflow-y-auto">
                {filteredEffects.map((effect) => (
                  <button
                    key={effect.id}
                    onClick={() => setSelectedEffectId(effect.id)}
                    className={`w-full text-left px-4 py-3 border-b hover:bg-gray-50 transition-colors ${
                      selectedEffectId === effect.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                    }`}
                  >
                    <div>
                      <div>{effect.name}</div>
                      <div className="text-sm text-gray-500">{effect.code}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Causes Checklist */}
            <div className="flex-1 flex flex-col border rounded-lg bg-white">
              {/* Header */}
              <div className="p-4 border-b">
                <h3 className="mb-3">
                  Allowed Causes for{' '}
                  <span className="font-semibold">{selectedEffect?.name}</span>
                </h3>
                
                {/* Zero-state message */}
                {pairings[selectedEffectId]?.length === 0 && (
                  <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                    No causes configured for this effect.
                  </div>
                )}

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search causes…"
                    value={rightSearch}
                    onChange={(e) => setRightSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* Causes Checklist */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {filteredRightCauses.map((cause) => (
                    <label
                      key={cause.id}
                      className="flex items-center gap-3 p-3 rounded hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isCauseAllowedForEffect(selectedEffectId, cause.id)}
                        onChange={() => togglePairing(selectedEffectId, cause.id)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div>{cause.name}</div>
                        <div className="text-sm text-gray-500">{cause.code}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Left: Causes List */}
            <div className="w-80 flex flex-col border rounded-lg bg-white">
              {/* Search */}
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search causes…"
                    value={leftSearch}
                    onChange={(e) => setLeftSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* Causes List */}
              <div className="flex-1 overflow-y-auto">
                {filteredCauses.map((cause) => (
                  <button
                    key={cause.id}
                    onClick={() => setSelectedCauseId(cause.id)}
                    className={`w-full text-left px-4 py-3 border-b hover:bg-gray-50 transition-colors ${
                      selectedCauseId === cause.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                    }`}
                  >
                    <div>
                      <div>{cause.name}</div>
                      <div className="text-sm text-gray-500">{cause.code}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Effects Checklist */}
            <div className="flex-1 flex flex-col border rounded-lg bg-white">
              {/* Header */}
              <div className="p-4 border-b">
                <h3 className="mb-3">
                  Allowed Effects for{' '}
                  <span className="font-semibold">{selectedCause?.name}</span>
                </h3>

                {/* Zero-state message */}
                {causePairings[selectedCauseId]?.length === 0 && (
                  <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                    No effects configured for this cause.
                  </div>
                )}

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search effects…"
                    value={rightSearch}
                    onChange={(e) => setRightSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* Effects Checklist */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {filteredRightEffects.map((effect) => (
                    <label
                      key={effect.id}
                      className="flex items-center gap-3 p-3 rounded hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isEffectAllowedForCause(selectedCauseId, effect.id)}
                        onChange={() => togglePairing(effect.id, selectedCauseId)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div>{effect.name}</div>
                        <div className="text-sm text-gray-500">{effect.code}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    )}
    </div>
  );
}