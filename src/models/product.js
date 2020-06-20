import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        minlength: 10,
        maxlength: 255
    },
    image_url: {
        type: String,
        required: true,
        trim: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const Product = model("Product", productSchema);

export default Product;
