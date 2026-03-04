import express from "express";
import {
  getProducts,
  getProductTypesByProduct,
  getMaterials,
  getFabrics,
  getCompositions,
  getStages,
  getMainParts,
  getSubPartsByMainPart,
  getOperations,
  getMachines,
  getMachineCategories,
  getThicknesses,
} from "../controllers/tableController.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/product-types/by-product/:productId", getProductTypesByProduct);
router.get("/materials", getMaterials);
router.get("/fabrics", getFabrics);
router.get("/compositions", getCompositions);
router.get("/stages", getStages);
router.get("/main-parts", getMainParts);
router.get("/sub-parts/by-main-part/:mainPartId", getSubPartsByMainPart);
router.get("/operations", getOperations);
router.get("/machines", getMachines);
router.get("/machine-categories", getMachineCategories);
router.get("/thicknesses", getThicknesses);

export default router;
