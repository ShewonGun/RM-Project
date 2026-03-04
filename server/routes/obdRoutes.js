import express from "express";
import { createOBD, getOBDs, deleteOBD, updateOBD } from "../controllers/obdController.js";

const router = express.Router();

router.get("/", getOBDs);
router.post("/", createOBD);
router.put("/:id", updateOBD);
router.delete("/:id", deleteOBD);

export default router;
