import { Fragment, useMemo, useState } from 'react';
import { Sliders, Lock, Zap, Eye, Trash2, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { DeleteEffectDialog } from './DeleteEffectDialog';

export type DisruptionTypeCategory =
  | 'intervention'
  | 'incident'
  | 'customer_defined'
  | 'other';

export interface Effect {
  id: string;
  name: string;
  code: string;
  gtfsRtEffect: string;
  category: DisruptionTypeCategory;
  thresholdsConfigurable?: boolean;
  enabled: boolean;
}

// Sample causes for linkage display (used by DeleteEffectDialog)
const SAMPLE_CAUSES = [
  { id: '1', name: 'Accident' },
  { id: '2', name: 'Weather' },
  { id: '3', name: 'Construction' },
  { id: '4', name: 'Vehicle breakdown' },
  { id: '5', name: 'Staff shortage' },
  { id: '6', name: 'Police activity' },
  { id: '7', name: 'Medical emergency' },
  { id: '8', name: 'Traffic congestion' },
  { id: '9', name: 'Road closure' },
  { id: '10', name: 'Signal failure' },
  { id: '11', name: 'Power outage' },
  { id: '12', name: 'Equipment failure' },
  { id: '13', name: 'Demonstration' },
  { id: '14', name: 'Special event' },
  { id: '15', name: 'Mechanical issue' },
];

// Sample pairings - type ID to array of cause IDs (used by DeleteEffectDialog)
const SAMPLE_PAIRINGS: Record<string, string[]> = {
  c1: ['7', '4'],
  c2: ['1', '6', '13'],
  c3: [],
};

const GTFS_RT_EFFECTS = [
  'No service',
  'Reduced service',
  'Significant delays',
  'Detour',
  'Additional service',
  'Modified service',
  'Stop moved',
  'Other effect',
  'Unknown effect',
  'No effect',
  'Accessibility issue',
];

const INITIAL_EFFECTS: Effect[] = [
  // Interventions (system-defined)
  {
    id: 'i1',
    name: 'Cancellation',
    code: 'CN',
    gtfsRtEffect: 'No service',
    category: 'intervention',
    enabled: true,
  },
  {
    id: 'i2',
    name: 'Partial Cancellation',
    code: 'PC',
    gtfsRtEffect: 'Reduced service',
    category: 'intervention',
    enabled: true,
  },
  {
    id: 'i3',
    name: 'Detour',
    code: 'DT',
    gtfsRtEffect: 'Detour',
    category: 'intervention',
    enabled: true,
  },
  {
    id: 'i4',
    name: 'Driver ended service',
    code: 'DR',
    gtfsRtEffect: 'Modified service',
    category: 'intervention',
    enabled: true,
  },

  // Incidents (system-detected)
  {
    id: 'n1',
    name: 'Late arrival',
    code: 'LA',
    gtfsRtEffect: 'Significant delays',
    category: 'incident',
    thresholdsConfigurable: true,
    enabled: true,
  },
  {
    id: 'n2',
    name: 'Early arrival',
    code: 'EA',
    gtfsRtEffect: 'Significant delays',
    category: 'incident',
    thresholdsConfigurable: true,
    enabled: true,
  },
  {
    id: 'n3',
    name: 'Missed trip',
    code: 'MT',
    gtfsRtEffect: 'Reduced service',
    category: 'incident',
    thresholdsConfigurable: false,
    enabled: true,
  },
  {
    id: 'n4',
    name: 'Off-route',
    code: 'OR',
    gtfsRtEffect: 'Other effect',
    category: 'incident',
    thresholdsConfigurable: false,
    enabled: true,
  },

  // Customer-defined types
  {
    id: 'c1',
    name: 'Driver medical event',
    code: 'DM',
    gtfsRtEffect: 'Other effect',
    category: 'customer_defined',
    enabled: true,
  },
  {
    id: 'c2',
    name: 'Passenger incident',
    code: 'PI',
    gtfsRtEffect: 'Other effect',
    category: 'customer_defined',
    enabled: true,
  },
  {
    id: 'c3',
    name: 'Accessibility restriction',
    code: 'AR',
    gtfsRtEffect: 'Other effect',
    category: 'customer_defined',
    enabled: true,
  },

  // Locked fallback
  {
    id: 'o1',
    name: 'Other',
    code: 'SS',
    gtfsRtEffect: 'Other effect',
    category: 'other',
    enabled: true,
  },
];

type CategoryMeta = {
  title: string;
  description: string;
  showAddButton?: boolean;
  isLockedSection?: boolean;
};

const CATEGORY_META: Record<DisruptionTypeCategory, CategoryMeta> = {
  intervention: {
    title: 'Interventions',
    description:
      'System-defined mitigation actions triggered by an explicit Controller decision. You can configure the reporting code and GTFS-RT mapping, and disable types you do not use.',
    isLockedSection: true,
  },
  incident: {
    title: 'Incidents',
    description:
      'System-detected operational outcomes. You can configure the reporting code and GTFS-RT mapping, disable types, and adjust thresholds for eligible incident types.',
    isLockedSection: true,
  },
  customer_defined: {
    title: 'Customer-defined types',
    description:
      'Operational situations defined by your organisation. Names are editable. You can configure the reporting code and GTFS-RT mapping, disable, and delete types.',
    showAddButton: true,
  },
  other: {
    title: 'Other (fallback)',
    description:
      'Locked fallback type used when no specific disruption type applies. Always enabled.',
    isLockedSection: true,
  },
};

export function EffectsTable() {
  const [effects, setEffects] = useState<Effect[]>(INITIAL_EFFECTS);
  const [hasChanges, setHasChanges] = useState(false);
  const [deleteEffectId, setDeleteEffectId] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<DisruptionTypeCategory, boolean>>({
    intervention: false,
    incident: false,
    customer_defined: false,
    other: false,
  });

  const toggleCategory = (category: DisruptionTypeCategory) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const updateEffect = (id: string, updates: Partial<Effect>) => {
    setEffects((prev) =>
      prev.map((effect) =>
        effect.id === id ? { ...effect, ...updates } : effect
      )
    );
    setHasChanges(true);
  };

  const deleteEffect = (id: string) => {
    setEffects((prev) => prev.filter((effect) => effect.id !== id));
    setHasChanges(true);
  };

  const addNewCustomerType = () => {
    const newEffect: Effect = {
      id: `c_${Date.now().toString()}`,
      name: '',
      code: '',
      gtfsRtEffect: 'Other effect',
      category: 'customer_defined',
      enabled: true,
    };

    // Insert before the 'other' fallback if present, otherwise append.
    setEffects((prev) => {
      const idx = prev.findIndex((e) => e.category === 'other');
      if (idx === -1) return [...prev, newEffect];
      return [...prev.slice(0, idx), newEffect, ...prev.slice(idx)];
    });

    setHasChanges(true);
  };

  const handleSave = () => {
    // Save logic here (mock)
    setHasChanges(false);
  };

  const initiateDelete = (effect: Effect) => {
    setDeleteEffectId(effect.id);
  };

  const getLinkedCauses = (effectId: string) => {
    const causeIds = SAMPLE_PAIRINGS[effectId] || [];
    return causeIds
      .map((causeId) => SAMPLE_CAUSES.find((c) => c.id === causeId))
      .filter(
        (cause): cause is { id: string; name: string } => cause !== undefined
      );
  };

  const grouped = useMemo(() => {
    const order: DisruptionTypeCategory[] = [
      'intervention',
      'incident',
      'customer_defined',
      'other',
    ];

    const byCategory: Record<DisruptionTypeCategory, Effect[]> = {
      intervention: [],
      incident: [],
      customer_defined: [],
      other: [],
    };

    for (const e of effects) byCategory[e.category].push(e);

    return order.map((category) => ({
      category,
      meta: CATEGORY_META[category],
      items: byCategory[category],
    }));
  }, [effects]);

  const isNameEditable = (effect: Effect) =>
    effect.category === 'customer_defined';
  const isRowLocked = (effect: Effect) => effect.category === 'other';
  const canDelete = (effect: Effect) => effect.category === 'customer_defined';
  const canToggleEnabled = (effect: Effect) => effect.category !== 'other';
  const showThresholds = (effect: Effect) =>
    effect.category === 'incident' && !!effect.thresholdsConfigurable;

  const getCategoryCount = (items: Effect[]) => {
    const enabled = items.filter(e => e.enabled).length;
    const total = items.length;
    return { enabled, total };
  };

  return (
    <div className="p-6 flex flex-col h-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Sliders className="w-5 h-5" />
          <h2>Disruption Types</h2>
        </div>
        <p className="text-gray-600">
          Define disruption types grouped by category. Reporting codes and GTFS-RT
          mappings are configurable for all types.
        </p>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-4">
                Type name<span className="text-red-500">*</span>
              </th>
              <th className="text-left py-2 pr-4 w-32">
                Code<span className="text-red-500">*</span>
              </th>
              <th className="text-left py-2 pr-4">GTFS-RT effect</th>
              <th className="text-left py-2 pr-4 w-12"></th>
              <th className="text-left py-2 pr-4 w-12"></th>
              <th className="text-left py-2 pr-4 w-12"></th>
              <th className="text-left py-2 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {grouped.map(({ category, meta, items }) => {
              const isExpanded = expandedCategories[category];
              const { enabled, total } = getCategoryCount(items);
              
              return (
              <Fragment key={category}>
                {/* Section header */}
                <tr className="border-b bg-gray-50">
                  <td colSpan={7} className="py-3 px-0">
                    <div className="flex items-start justify-between gap-4">
                      <button
                        onClick={() => toggleCategory(category)}
                        className="pr-4 flex-1 text-left hover:bg-gray-100 -mx-3 px-3 py-1 rounded transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                          )}
                          <div className="font-medium">{meta.title}</div>
                          <span className="text-sm text-gray-500">
                            ({enabled}/{total})
                          </span>
                          {meta.isLockedSection && (
                            <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                              <Lock className="w-3 h-3" />
                              System
                            </span>
                          )}
                        </div>
                        {isExpanded && (
                          <div className="text-sm text-gray-600 mt-0.5 ml-6">
                            {meta.description}
                          </div>
                        )}
                      </button>

                      {meta.showAddButton && (
                        <button
                          onClick={addNewCustomerType}
                          className="shrink-0 px-3 py-2 bg-blue-600 text-white rounded uppercase tracking-wide hover:bg-blue-700 flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add new type
                        </button>
                      )}
                    </div>
                  </td>
                </tr>

                {/* Section rows */}
                {isExpanded && (
                  items.length === 0 ? (
                    <tr className="border-b">
                      <td colSpan={7} className="py-4 text-sm text-gray-500">
                        No types in this category.
                      </td>
                    </tr>
                  ) : (
                    items.map((effect) => (
                      <tr key={effect.id} className="border-b hover:bg-gray-50">
                        {/* Type name */}
                        <td className="py-2 pr-4">
                          <input
                            type="text"
                            value={effect.name}
                            onChange={(e) =>
                              updateEffect(effect.id, { name: e.target.value })
                            }
                            disabled={!isNameEditable(effect) || isRowLocked(effect)}
                            className={`w-full px-3 py-1.5 border border-gray-300 rounded ${
                              !isNameEditable(effect) || isRowLocked(effect)
                                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                : ''
                            }`}
                            placeholder={
                              isNameEditable(effect)
                                ? 'Enter a type name'
                                : undefined
                            }
                          />
                        </td>

                        {/* Code */}
                        <td className="py-2 pr-4 w-32">
                          <input
                            type="text"
                            value={effect.code}
                            onChange={(e) =>
                              updateEffect(effect.id, { code: e.target.value })
                            }
                            disabled={isRowLocked(effect)}
                            className={`w-full px-3 py-1.5 border border-gray-300 rounded ${
                              isRowLocked(effect)
                                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                : ''
                            }`}
                          />
                        </td>

                        {/* GTFS-RT effect */}
                        <td className="py-2 pr-4">
                          <div className="relative">
                            <select
                              value={effect.gtfsRtEffect}
                              onChange={(e) =>
                                updateEffect(effect.id, {
                                  gtfsRtEffect: e.target.value,
                                })
                              }
                              disabled={isRowLocked(effect)}
                              className={`w-full px-3 py-1.5 border border-gray-300 rounded appearance-none bg-white pr-8 ${
                                isRowLocked(effect)
                                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                  : ''
                              }`}
                            >
                              {GTFS_RT_EFFECTS.map((gtfsEffect) => (
                                <option key={gtfsEffect} value={gtfsEffect}>
                                  {gtfsEffect}
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

                        {/* Lock (definition not editable) */}
                        <td className="py-2 pr-4 text-center">
                          {!isNameEditable(effect) || isRowLocked(effect) ? (
                            <div className="group relative inline-block">
                              <Lock className="w-4 h-4 text-gray-400" />
                              <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10">
                                <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap max-w-[320px]">
                                  {effect.category === 'other'
                                    ? 'Locked fallback type. Cannot be edited, disabled, or deleted.'
                                    : 'System-defined type. Type name cannot be edited.'}
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </td>

                        {/* Thresholds (incidents only) */}
                        <td className="py-2 pr-4 text-center">
                          {showThresholds(effect) ? (
                            <button
                              onClick={() => {
                                // Mock behaviour: placeholder for future threshold config UI
                                // eslint-disable-next-line no-alert
                                alert('Threshold configuration (mock)');
                              }}
                              className="group relative inline-block"
                            >
                              <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10">
                                <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                  Thresholds configurable
                                </div>
                              </div>
                            </button>
                          ) : null}
                        </td>

                        {/* Enabled (eye icon) */}
                        <td className="py-2 pr-4 text-center">
                          <button
                            onClick={() =>
                              canToggleEnabled(effect)
                                ? updateEffect(effect.id, {
                                    enabled: !effect.enabled,
                                  })
                                : null
                            }
                            disabled={!canToggleEnabled(effect)}
                            className="group relative inline-block"
                          >
                            <Eye
                              className={`w-4 h-4 ${
                                effect.enabled ? 'text-gray-600' : 'text-gray-300'
                              } ${
                                !canToggleEnabled(effect)
                                  ? 'cursor-not-allowed'
                                  : ''
                              }`}
                            />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                              <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                {canToggleEnabled(effect)
                                  ? effect.enabled
                                    ? 'Enabled'
                                    : 'Disabled'
                                  : 'Always enabled'}
                              </div>
                            </div>
                          </button>
                        </td>

                        {/* Delete */}
                        <td className="py-2 text-center">
                          <button
                            onClick={() => initiateDelete(effect)}
                            disabled={!canDelete(effect)}
                            className={`${
                              canDelete(effect)
                                ? 'text-gray-400 hover:text-red-600'
                                : 'text-gray-300 cursor-not-allowed'
                            }`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )
                )}
              </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end mt-6 pt-6 border-t">
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

      {/* Delete Effect Dialog */}
      {deleteEffectId && (() => {
        const effect = effects.find((e) => e.id === deleteEffectId);
        if (!effect) return null;
        return (
          <DeleteEffectDialog
            effectName={effect.name}
            linkedCauses={getLinkedCauses(deleteEffectId)}
            onConfirm={() => {
              deleteEffect(deleteEffectId);
              setDeleteEffectId(null);
            }}
            onCancel={() => setDeleteEffectId(null)}
          />
        );
      })()}
    </div>
  );
}