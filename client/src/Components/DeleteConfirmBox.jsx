import React from "react";

const DeleteConfirmBox = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-80 overflow-hidden">
        <div className="bg-red-600 px-5 py-4">
          <h2 className="text-white font-bold text-base">Confirm Delete</h2>
        </div>
        <div className="px-5 py-4 text-sm text-gray-700">
          Are you sure you want to delete this SMV record?
        </div>
        <div className="flex justify-end gap-3 px-5 py-3 bg-gray-50 border-t border-gray-200">
          <button
            onClick={onCancel}
            className="px-5 py-1.5 rounded border border-red-500 text-red-500 text-sm font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-1.5 rounded bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmBox;
