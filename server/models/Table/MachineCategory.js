import mongoose from "mongoose";

const machineCategorySchema = new mongoose.Schema({
    machineCategory: { type:String, required: true },
    machineCategoryCode: { type:String, required: true },
});

const MachineCategory = mongoose.model("MachineCategory", machineCategorySchema);

export default MachineCategory;