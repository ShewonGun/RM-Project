import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import tableRoutes from "./routes/tableRoutes.js";
import smvRoutes from "./routes/smvRoutes.js";
import obdRoutes from "./routes/obdRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API working");
});

app.use("/api", tableRoutes);
app.use("/api/smv", smvRoutes);
app.use("/api/obd", obdRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
