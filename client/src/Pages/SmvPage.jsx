import React, { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import RMbg from "../assets/RMbg.jpeg";
import Confirmationbox from "../Components/Confirmationbox";
import Navbar from "../Components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = "http://localhost:5000/api";

const initialForm = {
  entryType: "",
  styleNumber: "",
  gender: "",
  operation: "",
  smv: "",
  product: "",
  productType: "",
  material: "",
  fabric: "",
  composition: "",
  stage: "",
  mainPart: "",
  subPart: "",
  machineType: "",
  machine: "",
  thickness: "",
  noOfPlies: "",
  remarks: "",
};

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

const Inp = ({ placeholder, value, onChange, type = "text", full }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`${fieldStyle} ${full ? "w-full" : ""}`}
  />
);

const SectionHeader = ({ title }) => (
  <p className="font-bold text-[#12285c] text-sm pt-0.5">{title}</p>
);

const SmvPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editRecord = location.state?.editRecord ?? null;
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [compositions, setCompositions] = useState([]);
  const [stages, setStages] = useState([]);
  const [mainParts, setMainParts] = useState([]);
  const [subParts, setSubParts] = useState([]);
  const [machineCategories, setMachineCategories] = useState([]);
  const [machines, setMachines] = useState([]);
  const [thicknesses, setThicknesses] = useState([]);
  const [operations, setOperations] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmData, setConfirmData] = useState([]);

  // Prefill form when coming from edit
  useEffect(() => {
    if (!editRecord) return;
    setEditId(editRecord._id);
    setForm({
      entryType:   editRecord.entryType   ?? "",
      styleNumber: editRecord.styleNumber ?? "",
      gender:      editRecord.gender      ?? "",
      operation:   editRecord.operation?._id  ?? editRecord.operation  ?? "",
      smv:         editRecord.smv         ?? "",
      product:     editRecord.product?._id    ?? editRecord.product    ?? "",
      productType: editRecord.productType?._id ?? editRecord.productType ?? "",
      material:    editRecord.material?._id   ?? editRecord.material   ?? "",
      fabric:      editRecord.fabric?._id     ?? editRecord.fabric     ?? "",
      composition: editRecord.composition?._id ?? editRecord.composition ?? "",
      stage:       editRecord.stage?._id      ?? editRecord.stage      ?? "",
      mainPart:    editRecord.mainPart?._id   ?? editRecord.mainPart   ?? "",
      subPart:     editRecord.subPart?._id    ?? editRecord.subPart    ?? "",
      machineType: editRecord.machineType?._id ?? editRecord.machineType ?? "",
      machine:     editRecord.machine?._id    ?? editRecord.machine    ?? "",
      thickness:   editRecord.thickness?._id  ?? editRecord.thickness  ?? "",
      noOfPlies:   editRecord.noOfPlies   ?? "",
      remarks:     editRecord.remarks     ?? "",
    });
  }, []);

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

  const requiredFields = [
    "entryType","styleNumber","gender","operation","smv",
    "product","material","fabric","composition",
    "stage","mainPart","machineType","machine","thickness","noOfPlies",
  ];

  const resolve = (arr, id, key) => arr.find((o) => o._id === id)?.[key] ?? id;

  const handleSubmit = (e) => {
    e.preventDefault();
    const missing = requiredFields.filter((f) => !form[f]);
    if (missing.length > 0) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setConfirmData([
      { label: "Entry Type", value: form.entryType },
      { label: "Style Number", value: form.styleNumber },
      { label: "Gender", value: form.gender },
      { label: "Operation", value: resolve(operations, form.operation, "operation") },
      { label: "SMV", value: form.smv },
      { label: "Product", value: resolve(products, form.product, "productName") },
      { label: "Product Type", value: resolve(productTypes, form.productType, "productType") },
      { label: "Material", value: resolve(materials, form.material, "material") },
      { label: "Fabric", value: resolve(fabrics, form.fabric, "fabric") },
      { label: "Composition", value: resolve(compositions, form.composition, "composition") },
      { label: "Stage", value: resolve(stages, form.stage, "stage") },
      { label: "Main Part", value: resolve(mainParts, form.mainPart, "mainPart") },
      { label: "Sub Part", value: resolve(subParts, form.subPart, "subPart") },
      { label: "Machine Type", value: resolve(machineCategories, form.machineType, "machineCategory") },
      { label: "Machine", value: resolve(machines, form.machine, "machine") },
      { label: "Thickness", value: resolve(thicknesses, form.thickness, "thickness") },
      { label: "No of Plies", value: form.noOfPlies },
      { label: "Remarks", value: form.remarks || "—" },
    ]);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    try {
      const url = editId ? `${API}/smv/${editId}` : `${API}/smv`;
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, smv: Number(form.smv), noOfPlies: Number(form.noOfPlies) }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(`Failed to save: ${data.message}`);
        return;
      }
      setShowConfirm(false);
      setForm(initialForm);
      setEditId(null);
      if (editId) {
        toast.success("SMV entry updated successfully!");
        setTimeout(() => navigate("/smv/list"), 1500);
      } else {
        toast.success(`SMV entry saved! Code: ${data.code}`);
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  const handleCancel = () => setShowConfirm(false);

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
    {showConfirm && (
      <Confirmationbox
        data={confirmData}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    )}
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage: `url(${RMbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <Navbar title={editId ? "Edit SMV" : "SMV"} />

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 w-full px-4 sm:px-10 py-4 space-y-4">

          {/* Entry Type — inline label */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-[#12285c] font-bold text-sm sm:w-24 shrink-0">Entry Type</span>
            <div className="w-full sm:w-56">
              <Sel
                placeholder="Select the Entry Type"
                value={form.entryType}
                onChange={set("entryType")}
                options={[
                  { _id: "Trainee", entryType: "Trainee" },
                  { _id: "Estimate", entryType: "Estimate" },
                  { _id: "Finalized Entry", entryType: "Finalized Entry" },
                ]}
                labelKey="entryType"
              />
            </div>
          </div>

          {/* Style Number | Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Inp placeholder="Enter the Style Number" value={form.styleNumber} onChange={set("styleNumber")} />
            <Sel
              placeholder="Select the Gender"
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

          {/* Operations | SMV */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Sel placeholder="Operations" value={form.operation} onChange={set("operation")} options={operations} labelKey="operation" />
            <Inp placeholder="Enter the SMV" value={form.smv} onChange={set("smv")} type="number" />
          </div>

          {/* Product Details */}
          <SectionHeader title="Product Details" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Sel placeholder="Product" value={form.product} onChange={set("product")} options={products} labelKey="productName" />
            <Sel placeholder="Product Type" value={form.productType} onChange={set("productType")} options={productTypes} labelKey="productType" disabled={!form.product} />
          </div>

          {/* Material Details */}
          <SectionHeader title="Material Details" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Sel placeholder="Material" value={form.material} onChange={set("material")} options={materials} labelKey="material" />
            <Sel placeholder="Fabric" value={form.fabric} onChange={set("fabric")} options={fabrics} labelKey="fabric" />
            <Sel placeholder="Compositions" value={form.composition} onChange={set("composition")} options={compositions} labelKey="composition" />
          </div>

          {/* Operation Details */}
          <SectionHeader title="Operation Details" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Sel placeholder="Stage" value={form.stage} onChange={set("stage")} options={stages} labelKey="stage" />
            <div />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Sel placeholder="Main Part" value={form.mainPart} onChange={set("mainPart")} options={mainParts} labelKey="mainPart" />
            <Sel placeholder="Sub Part" value={form.subPart} onChange={set("subPart")} options={subParts} labelKey="subPart" disabled={!form.mainPart} />
          </div>

          {/* Machine Details */}
          <SectionHeader title="Machine Details" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Sel placeholder="Machine Type" value={form.machineType} onChange={set("machineType")} options={machineCategories} labelKey="machineCategory" />
            <Sel placeholder="Machine" value={form.machine} onChange={set("machine")} options={machines} labelKey="machine" />
          </div>

          {/* Other Details */}
          <SectionHeader title="Other Details" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Sel placeholder="Thickness" value={form.thickness} onChange={set("thickness")} options={thicknesses} labelKey="thickness" />
            <Inp placeholder="Enter the No of Plies" value={form.noOfPlies} onChange={set("noOfPlies")} type="number" />
          </div>

          {/* Remarks */}
          <Inp placeholder="Remarks" value={form.remarks} onChange={set("remarks")} full />

          {/* Submit */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="bg-white text-[#12285c] font-semibold px-14 py-1.5 rounded-sm shadow hover:bg-[#12285c] hover:text-white transition text-sm"
            >
              {editId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default SmvPage;


