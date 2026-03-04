import Product from "../models/Table/Product.js";
import ProductType from "../models/Table/ProductType.js";
import Material from "../models/Table/Material.js";
import Fabric from "../models/Table/Fabric.js";
import Composition from "../models/Table/Composition.js";
import Stage from "../models/Table/Stage.js";
import MainPart from "../models/Table/MainPart.js";
import SubPart from "../models/Table/SubPart.js";
import Operation from "../models/Table/Operation.js";
import Machine from "../models/Table/Machine.js";
import MachineCategory from "../models/Table/MachineCategory.js";
import Thickness from "../models/Table/Thickness.js";

export const getProducts = async (req, res) => {
  try {
    res.json(await Product.find().sort({ productName: 1 }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductTypesByProduct = async (req, res) => {
  try {
    res.json(await ProductType.find({ productCode: req.params.productId }).sort({ productType: 1 }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMaterials = async (req, res) => {
  try {
    res.json(await Material.find().sort({ material: 1 }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFabrics = async (req, res) => {
  try {
    res.json(await Fabric.find().sort({ fabric: 1 }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCompositions = async (req, res) => {
  try {
    res.json(await Composition.find().sort({ composition: 1 }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStages = async (req, res) => {
  try {
    res.json(await Stage.find().sort({ stage: 1 }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMainParts = async (req, res) => {
  try {
    res.json(await MainPart.find().sort({ mainPart: 1 }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSubPartsByMainPart = async (req, res) => {
  try {
    res.json(await SubPart.find({ mainPartCode: req.params.mainPartId }).sort({ subPart: 1 }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOperations = async (req, res) => {
  try {
    res.json(await Operation.find().sort({ operation: 1 }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMachines = async (req, res) => {
  try {
    res.json(await Machine.find().sort({ machine: 1 }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMachineCategories = async (req, res) => {
  try {
    res.json(await MachineCategory.find().sort({ machineCategory: 1 }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getThicknesses = async (req, res) => {
  try {
    res.json(await Thickness.find().sort({ thickness: 1 }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
