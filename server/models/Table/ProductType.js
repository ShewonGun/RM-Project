import mongoose from "mongoose";

const productTypeSchema = new mongoose.Schema({
    productType: { type:String, required: true },
    productTypeCode: { type:String, required: true },
    productCode: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
});

const ProductType = mongoose.model("ProductType", productTypeSchema);

export default ProductType;