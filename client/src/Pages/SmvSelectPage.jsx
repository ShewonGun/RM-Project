import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import RMbg from "../assets/RMbg.jpeg";
import RMLogo from "../assets/RMLogo.jpeg";

const modules = [
  { label: "Create a New\nSMV", path: "/smv" },
  { label: "View a\nCreated SMV", path: "/smv/list" },
];

const SmvSelectPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden select-none bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${RMbg})` }}
    >
      {/* Back button — top left */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#12285c] text-[#12285c]"
      >
        <FiArrowLeft size={18} />
      </button>

      {/* Logo — top right */}
      <div className="absolute top-4 right-5 z-10">
        <img src={RMLogo} alt="RM Logo" className="h-16 w-auto object-contain" />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center text-center px-6">
        <h1
          className="font-bold leading-tight mb-2 text-[#12285c] text-[clamp(1.6rem,5vw,2.8rem)]"
        >
          RM HOLDINGS
        </h1>
        <h2
          className="font-bold leading-tight mb-6 text-[#12285c] text-[clamp(1.4rem,4.5vw,2.5rem)]"
        >
          SMV DATABASE
        </h2>

        <p
          className="font-bold mb-12 text-[#666] text-[clamp(0.9rem,2vw,1.1rem)]"
        >
          Select a Module to get started
        </p>

        <div className="flex flex-col sm:flex-row gap-8">
          {modules.map(({ label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center justify-between w-44 min-h-44 px-6 py-7 rounded-xl shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl active:scale-95 bg-[#12285c]"
            >
              <span
                className="font-bold text-white text-center whitespace-pre-line leading-snug mb-5 text-[1.1rem]"
              >
                {label}
              </span>
              <span className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-white text-white">
                <FiArrowRight size={18} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmvSelectPage;
