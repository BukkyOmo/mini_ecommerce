import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    },
    user_id: {
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
