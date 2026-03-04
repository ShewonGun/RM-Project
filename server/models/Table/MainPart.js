import mongoose from "mongoose";

const mainPartSchema = new mongoose.Schema({
    mainPart: { type:String, required: true },
    mainPartCode: { type:String, required: true },
});

const MainPart = mongoose.model("MainPart", mainPartSchema);

export default MainPart;