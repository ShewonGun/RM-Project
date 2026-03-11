import SMV from "../models/SMV.js";

const generateCode = async () => {
  const count = await SMV.countDocuments();
  const seq = count + 1;              
  const seqStr = String(seq);         
  const randomLen = 8 - seqStr.length;
  if (randomLen < 0) throw new Error("Sequence exceeds 8-digit code limit");
  const randomPart = randomLen > 0
    ? String(Math.floor(Math.random() * Math.pow(10, randomLen))).padStart(randomLen, "0")
    : "";
  return randomPart + seqStr;         
};

export const createSMV = async (req, res) => {
  try {
    const code = await generateCode();
    const smv = await SMV.create({ ...req.body, code });
    res.status(201).json(smv);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getSMVs = async (req, res) => {
  try {
    const smvs = await SMV.find()
      .populate("product", "productName")
      .populate("productType", "productType")
      .populate("operation", "operation")
      .populate("material", "material")
      .populate("fabric", "fabric")
      .populate("composition", "composition")
      .populate("stage", "stage")
      .populate("mainPart", "mainPart")
      .populate("subPart", "subPart")
      .populate("machineType", "machineCategory")
      .populate("machine", "machine")
      .populate("thickness", "thickness")
      .sort({ createdAt: -1 });
    res.json(smvs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSMV = async (req, res) => {
  try {
    const deleted = await SMV.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Record not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSMV = async (req, res) => {
  try {
    const updated = await SMV.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Record not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
