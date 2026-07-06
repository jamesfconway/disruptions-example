import { useState } from "react";
import { DisruptionModal } from "./components/DisruptionModal";
import { TripCard } from "./components/TripCard";

export default function App() {
  const [entryMode, setEntryMode] = useState<"single" | "multiple" | "trip-card">("single");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(false);

  const handleConfirm = () => {
    setHasConfirmed(true);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setHasConfirmed(false);
  };

  return (
    <div className="p-8" style={{ minHeight: "100%" }}>
      {!hasConfirmed && (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Apply disruption to:
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="entryMode"
                  value="single"
                  checked={entryMode === "single"}
                  onChange={(event) =>
                    setEntryMode(event.target.value as "single" | "multiple" | "trip-card")
                  }
                  className="w-4 h-4 text-blue-600 cursor-pointer"
                />
                <div>
                  <div className="font-medium">Trip page - single trip</div>
                  <div className="text-sm text-gray-600">
                    The user selects one trip in the trip page
                  </div>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="entryMode"
                  value="multiple"
                  checked={entryMode === "multiple"}
                  onChange={(event) =>
                    setEntryMode(event.target.value as "single" | "multiple" | "trip-card")
                  }
                  className="w-4 h-4 text-blue-600 cursor-pointer"
                />
                <div>
                  <div className="font-medium">Trip page - multiple trips</div>
                  <div className="text-sm text-gray-600">
                    The user selects more than one trip in the trip page
                  </div>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="entryMode"
                  value="trip-card"
                  checked={entryMode === "trip-card"}
                  onChange={(event) =>
                    setEntryMode(event.target.value as "single" | "multiple" | "trip-card")
                  }
                  className="w-4 h-4 text-blue-600 cursor-pointer"
                />
                <div>
                  <div className="font-medium">Trip card - single trip</div>
                  <div className="text-sm text-gray-600">
                    Disruption form rendered inside the trip card
                  </div>
                </div>
              </label>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      )}

      {hasConfirmed && isModalOpen ? (
        entryMode === "trip-card" ? (
          <TripCard onClose={handleClose} />
        ) : (
          <DisruptionModal entryMode={entryMode} onClose={handleClose} />
        )
      ) : null}
    </div>
  );
}
