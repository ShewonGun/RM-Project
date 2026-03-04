import React, { useState, useEffect, useRef } from "react";
import { FiArrowLeft, FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LINKS = [
  { label: "SMV Entry", path: "/smv" },
  { label: "SMV List", path: "/smv/list" },
  { label: "OBD", path: "/obd" },
];

const Navbar = ({ title, showBack = true }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex items-center justify-between bg-[#12285c] px-5 py-3.5 shadow-lg shrink-0 sticky top-0 z-40">
      {/* Back button */}
      {showBack ? (
        <button
          type="button"
          onClick={() => window.history.back()}
          className="w-9 h-9 rounded-full border-2 border-white/60 flex items-center justify-center text-white hover:bg-white/10 transition"
        >
          <FiArrowLeft size={20} />
        </button>
      ) : (
        <div className="w-9" />
      )}

      {/* Title */}
      <h1 className="text-white font-bold text-lg sm:text-2xl tracking-widest truncate px-2 text-center">{title}</h1>

      {/* Hamburger */}
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          className="w-9 h-9 flex items-center justify-center text-white "
        >
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>

        {open && (
          <div className="absolute right-0 top-12 w-52 bg-white shadow-lg overflow-hidden">
            {LINKS.map(({ label, path }) => (
              <button
                key={path}
                onClick={() => { navigate(path); setOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-[#12285c] font-medium hover:bg-[#12285c] hover:text-white transition"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
