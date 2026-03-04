import mongoose from "mongoose";

const compositionSchema = new mongoose.Schema({
    composition: { type:String, required: true },
    compositionCode: { type:String, required: true },
});

const Composition = mongoose.model("Composition", compositionSchema);

export default Composition;