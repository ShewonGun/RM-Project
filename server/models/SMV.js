import mongoose from "mongoose";

const SMVSchema = new mongoose.Schema(
  {
    entryType:   { type: String, required: true },
    styleNumber: { type: String, required: true },
    gender:      { type: String, required: true },
    operation:   { type: mongoose.Schema.Types.ObjectId, ref: "Operation", required: true },
    smv:         { type: Number, required: true },
    product:     { type: mongoose.Schema.Types.ObjectId, ref: "Product",  required: true },
    productType: { type: mongoose.Schema.Types.ObjectId, ref: "ProductType"},
    material:    { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
    fabric:      { type: mongoose.Schema.Types.ObjectId, ref: "Fabric",   required: true },
    composition: { type: mongoose.Schema.Types.ObjectId, ref: "Composition", required: true },
    stage:       { type: mongoose.Schema.Types.ObjectId, ref: "Stage",    required: true },
    mainPart:    { type: mongoose.Schema.Types.ObjectId, ref: "MainPart", required: true },
    subPart:     { type: mongoose.Schema.Types.ObjectId, ref: "SubPart" },
    machineType: { type: mongoose.Schema.Types.ObjectId, ref: "MachineCategory", required: true },
    machine:     { type: mongoose.Schema.Types.ObjectId, ref: "Machine",  required: true },
    thickness:   { type: mongoose.Schema.Types.ObjectId, ref: "Thickness", required: true },
    noOfPlies:   { type: Number, required: true },
    remarks:     { type: String, default: "" },
    code:        { type: String, unique: true },
  },
  { timestamps: true }
);

const SMV = mongoose.model("SMV", SMVSchema);
export default SMV;
