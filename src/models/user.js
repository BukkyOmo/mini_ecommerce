import { Schema, model } from "mongoose";

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 25
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 25
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 9,
        maxlength: 35
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 50
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

const User = model("User", userSchema);

export default User;
