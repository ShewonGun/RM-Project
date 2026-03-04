import React from "react";

const SmvObdTable = ({ smvRecords }) => {
  if (!smvRecords || smvRecords.length === 0) return null;

  return (
    <div>
      {/* Desktop table */}
      <div className="hidden sm:block overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4">
        <table className="w-full border-collapse text-xs min-w-max">
          <thead>
            <tr className="bg-[#12285c] text-white">
              <th className="px-4 py-2.5 text-left font-semibold whitespace-nowrap">#</th>
              <th className="px-4 py-2.5 text-left font-semibold whitespace-nowrap">Operations</th>
              <th className="px-4 py-2.5 text-left font-semibold whitespace-nowrap">SMV</th>
              <th className="px-4 py-2.5 text-left font-semibold whitespace-nowrap">Machine</th>
            </tr>
          </thead>
          <tbody>
            {smvRecords.map((r, i) => (
              <tr key={r._id} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                <td className="px-4 py-2 text-gray-800 whitespace-nowrap">{i + 1}</td>
                <td className="px-4 py-2 text-gray-800 whitespace-nowrap font-medium">{r.operation?.operation ?? "—"}</td>
                <td className="px-4 py-2 text-gray-800 whitespace-nowrap">{r.smv ?? "—"}</td>
                <td className="px-4 py-2 text-gray-800 whitespace-nowrap">{r.machine?.machine ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-2 pb-4">
        {smvRecords.map((r, i) => (
          <div key={r._id} className="bg-white shadow px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <div><p className="text-gray-400 uppercase tracking-wide text-[10px]">#</p><p className="font-medium text-gray-800">{i + 1}</p></div>
            <div><p className="text-gray-400 uppercase tracking-wide text-[10px]">SMV</p><p className="font-medium text-gray-800">{r.smv ?? "—"}</p></div>
            <div className="col-span-2"><p className="text-gray-400 uppercase tracking-wide text-[10px]">Operation</p><p className="font-medium text-gray-800">{r.operation?.operation ?? "—"}</p></div>
            <div className="col-span-2"><p className="text-gray-400 uppercase tracking-wide text-[10px]">Machine</p><p className="font-medium text-gray-800">{r.machine?.machine ?? "—"}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmvObdTable;
