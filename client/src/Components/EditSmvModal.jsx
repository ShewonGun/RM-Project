import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";
import RMbg from "../assets/RMbg.jpeg";

const API = "http://localhost:5000/api";

const fieldStyle =
  "w-full bg-white border border-gray-300 text-gray-800 placeholder-gray-500 rounded px-3 py-[5px] text-sm appearance-none focus:outline-none focus:border-[#12285c]";

const Sel = ({ placeholder, value, onChange, options, labelKey, valueKey = "_id", disabled }) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`${fieldStyle} pr-8 cursor-pointer disabled:opacity-40`}
    >
      <option value="" className="text-gray-800 bg-white">{placeholder}</option>
      {options.map((o) => (
        <option key={o[valueKey]} value={o[valueKey]} className="text-gray-800 bg-white">
          {o[labelKey]}
        </option>
      ))}
    </select>
    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-[10px]">▼</span>
  </div>
);

const Inp = ({ placeholder, value, onChange, type = "text" }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={fieldStyle}
  />
);

const Label = ({ text }) => (
  <p className="text-xs font-semibold text-[#12285c] mb-0.5">{text}</p>
);

const SectionHeader = ({ title }) => (
  <p className="font-bold text-[#12285c] text-sm col-span-2 pt-0.5">{title}</p>
);

const extractId = (val) =>
  val && typeof val === "object" ? val._id : val ?? "";

const EditSmvModal = ({ record, onClose, onSaved }) => {
  const [form, setForm] = useState({
    entryType:   record.entryType   ?? "",
    styleNumber: record.styleNumber ?? "",
    gender:      record.gender      ?? "",
    operation:   extractId(record.operation),
    smv:         record.smv         ?? "",
    product:     extractId(record.product),
    productType: extractId(record.productType),
    material:    extractId(record.material),
    fabric:      extractId(record.fabric),
    composition: extractId(record.composition),
    stage:       extractId(record.stage),
    mainPart:    extractId(record.mainPart),
    subPart:     extractId(record.subPart),
    machineType: extractId(record.machineType),
    machine:     extractId(record.machine),
    thickness:   extractId(record.thickness),
    noOfPlies:   record.noOfPlies   ?? "",
    remarks:     record.remarks    ?? "",
  });

  const [products, setProducts]               = useState([]);
  const [productTypes, setProductTypes]       = useState([]);
  const [materials, setMaterials]             = useState([]);
  const [fabrics, setFabrics]                 = useState([]);
  const [compositions, setCompositions]       = useState([]);
  const [stages, setStages]                   = useState([]);
  const [mainParts, setMainParts]             = useState([]);
  const [subParts, setSubParts]               = useState([]);
  const [operations, setOperations]           = useState([]);
  const [machines, setMachines]               = useState([]);
  const [machineCategories, setMachineCategories] = useState([]);
  const [thicknesses, setThicknesses]         = useState([]);
  const [saving, setSaving]                   = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/products`),
      fetch(`${API}/materials`),
      fetch(`${API}/fabrics`),
      fetch(`${API}/compositions`),
      fetch(`${API}/stages`),
      fetch(`${API}/main-parts`),
      fetch(`${API}/machine-categories`),
      fetch(`${API}/machines`),
      fetch(`${API}/thicknesses`),
      fetch(`${API}/operations`),
    ])
      .then((rs) => Promise.all(rs.map((r) => r.json())))
      .then(([prod, mat, fab, comp, stage, mp, mc, mach, thick, op]) => {
        setProducts(prod);
        setMaterials(mat);
        setFabrics(fab);
        setCompositions(comp);
        setStages(stage);
        setMainParts(mp);
        setMachineCategories(mc);
        setMachines(mach);
        setThicknesses(thick);
        setOperations(op);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!form.product) return setProductTypes([]);
    fetch(`${API}/product-types/by-product/${form.product}`)
      .then((r) => r.json()).then(setProductTypes).catch(console.error);
  }, [form.product]);

  useEffect(() => {
    if (!form.mainPart) return setSubParts([]);
    fetch(`${API}/sub-parts/by-main-part/${form.mainPart}`)
      .then((r) => r.json()).then(setSubParts).catch(console.error);
  }, [form.mainPart]);

  const set = (field) => (e) => {
    const val = e.target.value;
    setForm((prev) => {
      const next = { ...prev, [field]: val };
      if (field === "product") next.productType = "";
      if (field === "mainPart") next.subPart = "";
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/smv/${record._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, smv: Number(form.smv), noOfPlies: Number(form.noOfPlies) }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(`Update failed: ${data.message}`); return; }
      toast.success("SMV record updated successfully!");
      onSaved(data);
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        className="rounded-lg shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden"
        style={{ backgroundImage: `url(${RMbg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >

        {/* Header */}
        <div className="bg-[#12285c] px-6 py-4 shrink-0 flex items-start justify-between">
          <div>
            <h2 className="text-white font-bold text-lg tracking-wide">Edit SMV Entry</h2>
            <p className="text-white/60 text-xs mt-0.5">Code: {record.code}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition mt-0.5"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="grid grid-cols-2 gap-x-5 gap-y-3">

            {/* Entry Type */}
            <div>
              <Label text="Entry Type" />
              <Sel
                placeholder="Select Entry Type"
                value={form.entryType}
                onChange={set("entryType")}
                options={[
                  { _id: "Trainee", entryType: "Trainee" },
                  { _id: "Estimate", entryType: "Estimate" },
                  { _id: "Finalized", entryType: "Finalized Entry" },
                ]}
                labelKey="entryType"
              />
            </div>

            {/* Gender */}
            <div>
              <Label text="Gender" />
              <Sel
                placeholder="Select Gender"
                value={form.gender}
                onChange={set("gender")}
                options={[
                  { _id: "Baby-boys", gender: "Baby Boys" },
                  { _id: "Baby-girls", gender: "Baby Girls" },
                  { _id: "Boys", gender: "Boys" },
                  { _id: "Girls", gender: "Girls" },
                  { _id: "Men", gender: "Men" },
                  { _id: "Women", gender: "Women" },
                  { _id: "Unisex", gender: "Unisex" },
                ]}
                labelKey="gender"
              />
            </div>

            {/* Style Number */}
            <div>
              <Label text="Style Number" />
              <Inp placeholder="Style Number" value={form.styleNumber} onChange={set("styleNumber")} />
            </div>

            {/* SMV */}
            <div>
              <Label text="SMV" />
              <Inp placeholder="SMV" value={form.smv} onChange={set("smv")} type="number" />
            </div>

            {/* Operation */}
            <div>
              <Label text="Operation" />
              <Sel placeholder="Operation" value={form.operation} onChange={set("operation")} options={operations} labelKey="operation" />
            </div>

            {/* No of Plies */}
            <div>
              <Label text="No of Plies" />
              <Inp placeholder="No of Plies" value={form.noOfPlies} onChange={set("noOfPlies")} type="number" />
            </div>

            {/* Product Details */}
            <SectionHeader title="Product Details" />

            <div>
              <Label text="Product" />
              <Sel placeholder="Product" value={form.product} onChange={set("product")} options={products} labelKey="productName" />
            </div>
            <div>
              <Label text="Product Type" />
              <Sel placeholder="Product Type" value={form.productType} onChange={set("productType")} options={productTypes} labelKey="productType" disabled={!form.product} />
            </div>

            {/* Material Details */}
            <SectionHeader title="Material Details" />

            <div>
              <Label text="Material" />
              <Sel placeholder="Material" value={form.material} onChange={set("material")} options={materials} labelKey="material" />
            </div>
            <div>
              <Label text="Fabric" />
              <Sel placeholder="Fabric" value={form.fabric} onChange={set("fabric")} options={fabrics} labelKey="fabric" />
            </div>
            <div className="col-span-2">
              <Label text="Composition" />
              <Sel placeholder="Composition" value={form.composition} onChange={set("composition")} options={compositions} labelKey="composition" />
            </div>

            {/* Operation Details */}
            <SectionHeader title="Operation Details" />

            <div>
              <Label text="Stage" />
              <Sel placeholder="Stage" value={form.stage} onChange={set("stage")} options={stages} labelKey="stage" />
            </div>
            <div />
            <div>
              <Label text="Main Part" />
              <Sel placeholder="Main Part" value={form.mainPart} onChange={set("mainPart")} options={mainParts} labelKey="mainPart" />
            </div>
            <div>
              <Label text="Sub Part" />
              <Sel placeholder="Sub Part" value={form.subPart} onChange={set("subPart")} options={subParts} labelKey="subPart" disabled={!form.mainPart} />
            </div>

            {/* Machine Details */}
            <SectionHeader title="Machine Details" />

            <div>
              <Label text="Machine Type" />
              <Sel placeholder="Machine Type" value={form.machineType} onChange={set("machineType")} options={machineCategories} labelKey="machineCategory" />
            </div>
            <div>
              <Label text="Machine" />
              <Sel placeholder="Machine" value={form.machine} onChange={set("machine")} options={machines} labelKey="machine" />
            </div>

            {/* Other Details */}
            <SectionHeader title="Other Details" />

            <div>
              <Label text="Thickness" />
              <Sel placeholder="Thickness" value={form.thickness} onChange={set("thickness")} options={thicknesses} labelKey="thickness" />
            </div>
            <div />

            {/* Remarks */}
            <div className="col-span-2">
              <Label text="Remarks (optional)" />
              <Inp placeholder="Remarks" value={form.remarks} onChange={set("remarks")} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-4 px-6 py-4 bg-white/20 border-t border-white/30 shrink-0">
          <button
            onClick={onClose}
            disabled={saving}
            className="bg-white text-[#12285c] font-semibold px-10 py-1.5 rounded-sm shadow hover:bg-gray-100 transition text-sm disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#12285c] text-white font-semibold px-10 py-1.5 rounded-sm shadow hover:bg-[#1a3a7a] transition text-sm disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSmvModal;
