import { useState } from "react";
import { X, ChevronDown, ChevronRight } from "lucide-react";
import { EffectsTable } from "./EffectsTable";
import { CausesTable } from "./CausesTable";
import { DisruptionRules } from "./DisruptionRules";

type Section = "general" | "advanced" | "disruptions";
type ActivePage =
  | "account"
  | "settings"
  | "reporting"
  | "drivers"
  | "magic-eye"
  | "predefined-messages"
  | "causes"
  | "effects"
  | "disruption-rules";

interface PreferencesModalProps {
  onClose: () => void;
}

export function PreferencesModal({
  onClose,
}: PreferencesModalProps) {
  const [expandedSections, setExpandedSections] = useState<
    Set<Section>
  >(new Set(["general", "advanced", "disruptions"]));
  const [activePage, setActivePage] = useState<ActivePage>(
    "causes",
  );
  const [searchFilter, setSearchFilter] = useState("");

  const toggleSection = (section: Section) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h1>Preferences</h1>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-56 border-r bg-gray-50 overflow-y-auto">
            <div className="p-4">
              <input
                type="text"
                placeholder="Filter sections"
                value={searchFilter}
                onChange={(e) =>
                  setSearchFilter(e.target.value)
                }
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm"
              />
            </div>

            {/* GENERAL */}
            <div>
              <button
                onClick={() => toggleSection("general")}
                className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 uppercase text-xs tracking-wide"
              >
                <span>General</span>
                {expandedSections.has("general") ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              {expandedSections.has("general") && (
                <div className="py-1">
                  <button
                    onClick={() => setActivePage("account")}
                    className={`w-full text-left px-8 py-2 text-sm hover:bg-gray-100 ${
                      activePage === "account"
                        ? "bg-gray-200"
                        : ""
                    }`}
                  >
                    Account
                  </button>
                  <button
                    onClick={() => setActivePage("settings")}
                    className={`w-full text-left px-8 py-2 text-sm hover:bg-gray-100 ${
                      activePage === "settings"
                        ? "bg-gray-200"
                        : ""
                    }`}
                  >
                    Settings
                  </button>
                </div>
              )}
            </div>

            {/* ADVANCED */}
            <div>
              <button
                onClick={() => toggleSection("advanced")}
                className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 uppercase text-xs tracking-wide"
              >
                <span>Advanced</span>
                {expandedSections.has("advanced") ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              {expandedSections.has("advanced") && (
                <div className="py-1">
                  <button
                    onClick={() => setActivePage("reporting")}
                    className={`w-full text-left px-8 py-2 text-sm hover:bg-gray-100 ${
                      activePage === "reporting"
                        ? "bg-gray-200"
                        : ""
                    }`}
                  >
                    Reporting
                  </button>
                  <button
                    onClick={() => setActivePage("drivers")}
                    className={`w-full text-left px-8 py-2 text-sm hover:bg-gray-100 ${
                      activePage === "drivers"
                        ? "bg-gray-200"
                        : ""
                    }`}
                  >
                    Drivers
                  </button>
                  <button
                    onClick={() => setActivePage("magic-eye")}
                    className={`w-full text-left px-8 py-2 text-sm hover:bg-gray-100 ${
                      activePage === "magic-eye"
                        ? "bg-gray-200"
                        : ""
                    }`}
                  >
                    Magic Eye
                  </button>
                  <button
                    onClick={() =>
                      setActivePage("predefined-messages")
                    }
                    className={`w-full text-left px-8 py-2 text-sm hover:bg-gray-100 ${
                      activePage === "predefined-messages"
                        ? "bg-gray-200"
                        : ""
                    }`}
                  >
                    Predefined Messages
                  </button>
                </div>
              )}
            </div>

            {/* DISRUPTIONS */}
            <div>
              <button
                onClick={() => toggleSection("disruptions")}
                className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 uppercase text-xs tracking-wide"
              >
                <span>Disruptions</span>
                {expandedSections.has("disruptions") ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              {expandedSections.has("disruptions") && (
                <div className="py-1">
                  <button
                    onClick={() => setActivePage("causes")}
                    className={`w-full text-left px-8 py-2 text-sm hover:bg-gray-100 ${
                      activePage === "causes"
                        ? "bg-gray-200"
                        : ""
                    }`}
                  >
                    Causes
                  </button>
                  <button
                    onClick={() => setActivePage("effects")}
                    className={`w-full text-left px-8 py-2 text-sm hover:bg-gray-100 ${
                      activePage === "effects"
                        ? "bg-gray-200"
                        : ""
                    }`}
                  >
                    Types
                  </button>
                  <button
                    onClick={() =>
                      setActivePage("disruption-rules")
                    }
                    className={`w-full text-left px-8 py-2 text-sm hover:bg-gray-100 ${
                      activePage === "disruption-rules"
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                  >
                    Linking
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 overflow-y-auto">
            {activePage === "causes" && <CausesTable />}
            {activePage === "effects" && <EffectsTable />}
            {activePage === "disruption-rules" && (
              <DisruptionRules />
            )}
            {activePage !== "causes" &&
              activePage !== "effects" &&
              activePage !== "disruption-rules" && (
                <div className="p-6">
                  <p className="text-gray-500">
                    {activePage.charAt(0).toUpperCase() +
                      activePage
                        .slice(1)
                        .replace(/-/g, " ")}{" "}
                    content goes here
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}