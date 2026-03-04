import React from "react";

const ObdTable = ({ obdRecords }) => {
  if (!obdRecords || obdRecords.length === 0) return null;

  return (
    <div>
      {/* Desktop table */}
      <div className="hidden sm:block overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4">
        <table className="w-full border-collapse text-xs min-w-max">
          <thead>
            <tr className="bg-[#12285c] text-white">
              <th className="px-4 py-2.5 text-left font-semibold whitespace-nowrap">#</th>
              <th className="px-4 py-2.5 text-left font-semibold whitespace-nowrap">Style</th>
              <th className="px-4 py-2.5 text-left font-semibold whitespace-nowrap">Date</th>
              <th className="px-4 py-2.5 text-left font-semibold whitespace-nowrap">Product</th>
              <th className="px-4 py-2.5 text-left font-semibold whitespace-nowrap">Brand / Buyer</th>
              <th className="px-4 py-2.5 text-left font-semibold whitespace-nowrap">Code</th>
              <th className="px-4 py-2.5 text-left font-semibold whitespace-nowrap">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {obdRecords.map((r, i) => (
              <tr key={r._id} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                <td className="px-4 py-2 text-gray-800 whitespace-nowrap">{i + 1}</td>
                <td className="px-4 py-2 text-gray-800 whitespace-nowrap font-medium">{r.style}</td>
                <td className="px-4 py-2 text-gray-800 whitespace-nowrap">{r.date ? new Date(r.date).toLocaleDateString() : "—"}</td>
                <td className="px-4 py-2 text-gray-800 whitespace-nowrap">{r.product}</td>
                <td className="px-4 py-2 text-gray-800 whitespace-nowrap">{r.brandOrBuyer}</td>
                <td className="px-4 py-2 text-gray-800 whitespace-nowrap">{r.code}</td>
                <td className="px-4 py-2 text-gray-800 whitespace-nowrap">{r.remarks || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-2 pb-4">
        {obdRecords.map((r, i) => (
          <div key={r._id} className="bg-white shadow px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <div><p className="text-gray-400 uppercase tracking-wide text-[10px]">#</p><p className="font-medium text-gray-800">{i + 1}</p></div>
            <div><p className="text-gray-400 uppercase tracking-wide text-[10px]">Date</p><p className="font-medium text-gray-800">{r.date ? new Date(r.date).toLocaleDateString() : "—"}</p></div>
            <div><p className="text-gray-400 uppercase tracking-wide text-[10px]">Style</p><p className="font-medium text-gray-800">{r.style}</p></div>
            <div><p className="text-gray-400 uppercase tracking-wide text-[10px]">Code</p><p className="font-medium text-gray-800">{r.code}</p></div>
            <div className="col-span-2"><p className="text-gray-400 uppercase tracking-wide text-[10px]">Product</p><p className="font-medium text-gray-800">{r.product}</p></div>
            <div className="col-span-2"><p className="text-gray-400 uppercase tracking-wide text-[10px]">Brand / Buyer</p><p className="font-medium text-gray-800">{r.brandOrBuyer}</p></div>
            {r.remarks && <div className="col-span-2"><p className="text-gray-400 uppercase tracking-wide text-[10px]">Remarks</p><p className="font-medium text-gray-800">{r.remarks}</p></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObdTable;
