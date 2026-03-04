import express from "express";
import { createSMV, getSMVs, deleteSMV, updateSMV } from "../controllers/smvController.js";

const router = express.Router();

router.get("/", getSMVs);
router.post("/", createSMV);
router.put("/:id", updateSMV);
router.delete("/:id", deleteSMV);

export default router;
