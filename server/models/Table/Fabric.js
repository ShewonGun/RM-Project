import mongoose from "mongoose";

const fabricSchema = new mongoose.Schema({
    fabric: { type:String, required: true },
    fabricCode: { type:String, required: true },
});

const Fabric = mongoose.model("Fabric", fabricSchema);

export default Fabric;