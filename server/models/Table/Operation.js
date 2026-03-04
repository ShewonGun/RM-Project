import mongoose from "mongoose";

const operationSchema = new mongoose.Schema({
    operation: { type:String, required: true },
    operationCode: { type:String, required: true },
});

const Operation = mongoose.model("Operation", operationSchema);

export default Operation;