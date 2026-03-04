import mongoose from "mongoose";

const machineSchema = new mongoose.Schema({
    machine: { type:String, required: true },
    machineCode: { type:String, required: true },
});

const Machine = mongoose.model("Machine", machineSchema);

export default Machine;