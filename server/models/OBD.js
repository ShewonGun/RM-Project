import mongoose from "mongoose";

const OBDSchema = new mongoose.Schema(
  {
    style: { type: String, required: true },
    date: { type: Date,   required: true },
    product: { type: String, required: true },
    brandOrBuyer: { type: String, required: true },
    code: { type: String, required: true },
    remarks: { type: String, default: "" },
  },
  { timestamps: true }
);

const OBD = mongoose.model("OBD", OBDSchema);

export default OBD;
