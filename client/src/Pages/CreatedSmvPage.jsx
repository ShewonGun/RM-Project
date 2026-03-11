import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import RMbg from "../assets/RMbg.jpeg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditSmvModal from "../Components/EditSmvModal";
import DeleteConfirmBox from "../Components/DeleteConfirmBox";
import Navbar from "../Components/Navbar";

const API = "http://localhost:5000/api";

const truncate = (str, n = 14) =>
  str && str.length > n ? str.slice(0, n) + "…" : str ?? "—";

const HEADERS = [
  "Code", "Entry Type", "Product", "Product Type", "Gender", "Style No",
  "Operation", "SMV", "Material", "Fabric", "Composition", "Stage",
  "Main Part", "Sub Part", "Machine Type", "Machine", "Thickness",
  "No of Plies", "Remarks", "Actions",
];

const CreatedSmvPage = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [filterProduct, setFilterProduct] = useState("All");
  const [filterMaterial, setFilterMaterial] = useState("All");
  const [products, setProducts] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  const fetchRecords = () =>
    fetch(`${API}/smv`)
      .then((r) => r.json())
      .then((data) => setRecords([...data].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))))
      .catch(console.error);

  useEffect(() => {
    fetchRecords();
    fetch(`${API}/products`).then((r) => r.json()).then(setProducts).catch(console.error);
    fetch(`${API}/materials`).then((r) => r.json()).then(setMaterials).catch(console.error);
  }, []);

  const filtered = records.filter((r) => {
    const productName = r.product?.productName ?? "";
    const materialName = r.material?.material ?? "";
    const s = search.toLowerCase();
    const matchSearch =
      !search ||
      [
        r.code,
        r.entryType,
        r.styleNumber,
        r.gender,
        r.smv,
        r.noOfPlies,
        r.remarks,
        r.operation?.operation,
        productName,
        r.productType?.productType,
        materialName,
        r.fabric?.fabric,
        r.composition?.composition,
        r.stage?.stage,
        r.mainPart?.mainPart,
        r.subPart?.subPart,
        r.machineType?.machineCategory,
        r.machine?.machine,
        r.thickness?.thickness,
      ].some((val) => (val ?? "").toString().toLowerCase().includes(s));
    const matchProduct = filterProduct === "All" || productName === filterProduct;
    const matchMaterial = filterMaterial === "All" || materialName === filterMaterial;
    return matchSearch && matchProduct && matchMaterial;
  });

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API}/smv/${deleteTarget}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) { toast.error(`Delete failed: ${data.message}`); return; }
      setRecords((prev) => prev.filter((r) => r._id !== deleteTarget));
      toast.success("Record deleted successfully.");
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleEdit = (record) => {
    setEditTarget(record);
  };

  const selClass =
    "bg-white border border-gray-300 text-gray-700 text-sm rounded px-3 py-1.5 appearance-none focus:outline-none pr-7 cursor-pointer w-36";

  const td = "px-3 py-2 text-gray-800 whitespace-nowrap text-xs";

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{
        backgroundImage: `url(${RMbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Edit modal */}
      {editTarget && (
        <EditSmvModal
          record={editTarget}
          onClose={() => setEditTarget(null)}
          onSaved={() => {
            fetchRecords();
            setEditTarget(null);
          }}
        />
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <DeleteConfirmBox
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Header */}
      <Navbar title="SMV" />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 sm:px-6 py-3 shrink-0">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white border border-gray-300 text-sm text-gray-700 rounded px-3 py-1.5 w-full sm:flex-1 focus:outline-none focus:border-[#12285c] placeholder-gray-400"
        />
        <div className="flex flex-wrap items-center gap-3 sm:ml-auto">
          <div className="flex items-center gap-2">
            <span className="text-[#12285c] text-sm font-medium whitespace-nowrap">Product</span>
            <div className="relative">
              <select value={filterProduct} onChange={(e) => setFilterProduct(e.target.value)} className={selClass}>
                <option>All</option>
                {products.map((p) => <option key={p._id}>{p.productName}</option>)}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-[10px]">▼</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#12285c] text-sm font-medium whitespace-nowrap">Material</span>
            <div className="relative">
              <select value={filterMaterial} onChange={(e) => setFilterMaterial(e.target.value)} className={selClass}>
                <option>All</option>
                {materials.map((m) => <option key={m._id}>{m.material}</option>)}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-[10px]">▼</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table — desktop */}
      <div className="hidden sm:block flex-1 px-6 pb-6 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <table className="w-full border-collapse text-xs min-w-max">
          <thead>
            <tr className="bg-[#12285c] text-white">
              {HEADERS.map((h) => (
                <th key={h} className="px-3 py-2.5 text-left font-semibold whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={HEADERS.length} className="text-center py-10 text-white/70 bg-white/10">
                  No records found.
                </td>
              </tr>
            ) : (
              filtered.map((r, i) => (
                <tr key={r._id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className={td}>{r.code ?? "—"}</td>
                  <td className={td}>{r.entryType ?? "—"}</td>
                  <td className={td} title={r.product?.productName}>{truncate(r.product?.productName)}</td>
                  <td className={td} title={r.productType?.productType}>{truncate(r.productType?.productType)}</td>
                  <td className={td}>{r.gender}</td>
                  <td className={td}>{r.styleNumber}</td>
                  <td className={td} title={r.operation?.operation}>{truncate(r.operation?.operation)}</td>
                  <td className={td}>{r.smv}</td>
                  <td className={td}>{r.material?.material}</td>
                  <td className={td}>{r.fabric?.fabric}</td>
                  <td className={td} title={r.composition?.composition}>{truncate(r.composition?.composition)}</td>
                  <td className={td}>{r.stage?.stage}</td>
                  <td className={td} title={r.mainPart?.mainPart}>{truncate(r.mainPart?.mainPart)}</td>
                  <td className={td} title={r.subPart?.subPart}>{truncate(r.subPart?.subPart)}</td>
                  <td className={td} title={r.machineType?.machineCategory}>{truncate(r.machineType?.machineCategory)}</td>
                  <td className={td} title={r.machine?.machine}>{truncate(r.machine?.machine)}</td>
                  <td className={td}>{r.thickness?.thickness}</td>
                  <td className={td}>{r.noOfPlies}</td>
                  <td className={td} title={r.remarks}>{truncate(r.remarks, 16) || "—"}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(r)} className="flex items-center gap-1 px-2 py-2 rounded bg-[#12285c] text-white text-xs hover:bg-[#1a3a7a] transition">
                        <FiEdit2 size={11} />
                      </button>
                      <button onClick={() => setDeleteTarget(r._id)} className="flex items-center gap-1 px-2 py-2 rounded bg-red-600 text-white text-xs hover:bg-red-700 transition">
                        <FiTrash2 size={11} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Cards — mobile */}
      <div className="sm:hidden flex-1 px-4 pb-6 space-y-3 overflow-auto [&::-webkit-scrollbar]:hidden">
        {filtered.length === 0 ? (
          <p className="text-center text-white/70 py-10">No records found.</p>
        ) : filtered.map((r) => (
          <div key={r._id} className="bg-white shadow px-4 py-3 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#12285c] text-sm">{r.code ?? "—"}</span>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(r)} className="px-2 py-1.5 rounded bg-[#12285c] text-white hover:bg-[#1a3a7a] transition">
                  <FiEdit2 size={12} />
                </button>
                <button onClick={() => setDeleteTarget(r._id)} className="px-2 py-1.5 rounded bg-red-600 text-white hover:bg-red-700 transition">
                  <FiTrash2 size={12} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {[
                ["Entry Type", r.entryType],
                ["Gender", r.gender],
                ["Style No", r.styleNumber],
                ["SMV", r.smv],
                ["Product", r.product?.productName],
                ["Product Type", r.productType?.productType],
                ["Material", r.material?.material],
                ["Fabric", r.fabric?.fabric],
                ["Stage", r.stage?.stage],
                ["Operation", r.operation?.operation],
                ["Main Part", r.mainPart?.mainPart],
                ["Sub Part", r.subPart?.subPart],
                ["Machine", r.machine?.machine],
                ["Thickness", r.thickness?.thickness],
                ["No of Plies", r.noOfPlies],
                ["Remarks", r.remarks || "—"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-gray-400 uppercase tracking-wide text-[9px]">{label}</p>
                  <p className="font-medium text-gray-800 truncate">{value ?? "—"}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatedSmvPage;


