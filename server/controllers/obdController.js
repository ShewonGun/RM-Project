import OBD from "../models/OBD.js";

export const createOBD = async (req, res) => {
  try {
    const obd = await OBD.create(req.body);
    res.status(201).json(obd);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getOBDs = async (req, res) => {
  try {
    const obds = await OBD.find().sort({ createdAt: -1 });
    res.json(obds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteOBD = async (req, res) => {
  try {
    const deleted = await OBD.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Record not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOBD = async (req, res) => {
  try {
    const updated = await OBD.findByIdAndUpdate(
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
