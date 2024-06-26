const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true },
    image_uri: { type: String, default: "/public/images/no_image.webp" },
    quantity: { type: Number, default: 0 },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    product_type: { type: [String], default: [] }
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
