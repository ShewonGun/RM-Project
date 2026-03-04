import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productCode: { type: String, required: true },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;