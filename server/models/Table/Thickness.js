import mongoose from "mongoose";

const thicknessSchema = new mongoose.Schema({
    thickness: { type:String, required: true },
    thicknessCode: { type:String, required: true },
});

const Thickness = mongoose.model("Thickness", thicknessSchema);

export default Thickness;