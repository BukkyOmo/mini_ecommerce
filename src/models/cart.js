import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    quantity: {
        type: Number,
        required: true,
        trim: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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

const Cart = model("Cart", cartSchema);

export default Cart;
