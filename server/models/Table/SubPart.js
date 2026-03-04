import mongoose from "mongoose";

const subPartSchema = new mongoose.Schema({
    subPart: { type:String, required: true },
    subPartCode: { type:String, required: true },
    mainPartCode: { type:mongoose.Schema.Types.ObjectId, ref: "MainPart", required: true },
});

const SubPart = mongoose.model("SubPart", subPartSchema);

export default SubPart;