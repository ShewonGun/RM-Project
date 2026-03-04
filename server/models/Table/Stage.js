import mongoose from "mongoose";

const stageSchema = new mongoose.Schema({
    stage: { type:String, required: true },
    stageCode: { type:String, required: true },
});

const Stage = mongoose.model("Stage", stageSchema);

export default Stage;