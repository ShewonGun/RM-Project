import React from "react";

const Confirmationbox = ({ data, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-[#12285c] px-6 py-4">
          <h2 className="text-white font-bold text-lg tracking-wide">Confirm Submission</h2>
          <p className="text-white/70 text-xs mt-0.5">Please review the details before submitting.</p>
        </div>

        {/* Details */}
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {data.map(({ label, value }) => (
              <div key={label} className="border-b border-gray-100 pb-1.5">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</p>
                <p className="text-sm font-medium text-gray-800 truncate">{value || "—"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button
            onClick={onCancel}
            className="px-6 py-1.5 rounded border border-[#12285c] text-[#12285c] text-sm font-semibold hover:bg-[#12285c] hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-1.5 rounded bg-[#12285c] text-white text-sm font-semibold hover:bg-[#1a3a7a] transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmationbox;