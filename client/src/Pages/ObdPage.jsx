import React, { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import RMbg from "../assets/RMbg.jpeg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar";
import SmvObdTable from "../Components/SmvObdTable";
import ObdTable from "../Components/ObdTable";

const today = new Date().toISOString().split("T")[0];

const API = "http://localhost:5000/api";

const fieldStyle =
  "bg-white border border-gray-300 text-gray-800 placeholder-gray-400 rounded px-3 py-[5px] text-sm focus:outline-none focus:border-[#12285c] w-full";

const Row = ({ label, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
    <span className="text-[#12285c] font-bold text-sm sm:w-32 shrink-0">{label}</span>
    <div className="flex-1">{children}</div>
  </div>
);

const ObdPage = () => {
  const [form, setForm] = useState({
    style: "",
    date: today,
    product: "",
    brandOrBuyer: "",
    code: "",
    remarks: "",
  });

  const [smvRecords, setSmvRecords] = useState([]);
  const [obdRecords, setObdRecords] = useState([]);

  const fetchObd = () =>
    fetch(`${API}/obd`).then((r) => r.json()).then(setObdRecords).catch(console.error);

  useEffect(() => {
    fetch(`${API}/smv`)
      .then((r) => r.json())
      .then(setSmvRecords)
      .catch(console.error);
    fetchObd();
  }, []);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const required = ["style", "date", "product", "brandOrBuyer", "code"];
    if (required.some((f) => !form[f])) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      const res = await fetch(`${API}/obd`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(`Failed: ${data.message}`); return; }
      toast.success("Operation Breakdown submitted successfully!");
      setForm({ style: "", date: today, product: "", brandOrBuyer: "", code: "", remarks: "" });
      fetchObd();
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
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
          <Navbar title="Operation Breakdown" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 w-full px-4 sm:px-10 py-6 space-y-4">

            {/* Style + Date */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-[#12285c] font-bold text-sm sm:w-32 shrink-0">Style</span>
              <input
                type="text"
                placeholder="Enter the Style Number"
                value={form.style}
                onChange={set("style")}
                className={`${fieldStyle} flex-1`}
              />
              <input
                type="date"
                value={form.date}
                onChange={set("date")}
                className="bg-white border border-gray-300 text-gray-800 rounded px-3 py-1.25 text-sm focus:outline-none focus:border-[#12285c] w-full sm:w-44 shrink-0"
              />
            </div>

            {/* Product */}
            <Row label="Product">
              <input
                type="text"
                placeholder="Enter the Product Name"
                value={form.product}
                onChange={set("product")}
                className={fieldStyle}
              />
            </Row>

            {/* Brand or Buyer */}
            <Row label="Brand or Buyer">
              <input
                type="text"
                placeholder="Enter the Brand"
                value={form.brandOrBuyer}
                onChange={set("brandOrBuyer")}
                className={fieldStyle}
              />
            </Row>

            {/* Code */}
            <Row label="Code">
              <input
                type="text"
                placeholder="Enter the Code"
                value={form.code}
                onChange={set("code")}
                className={fieldStyle}
              />
            </Row>

            {/* Remarks */}
            <Row label="Remarks">
              <input
                type="text"
                placeholder="Remarks"
                value={form.remarks}
                onChange={set("remarks")}
                className={fieldStyle}
              />
            </Row>

            {/* Submit */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="bg-[#12285c] text-white font-semibold px-14 py-1.5 rounded-sm shadow hover:bg-[#1a3a7a] transition text-sm"
              >
                Submit
              </button>
            </div>

            {/* SMV Table */}
            <SmvObdTable smvRecords={smvRecords} />

            {/* OBD Table */}
            <ObdTable obdRecords={obdRecords} />

          </form>
        </div>
      </div>
    </>
  );
};

export default ObdPage;
