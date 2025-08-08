import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "Username already exists"],
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: true,
    },
    firstLogin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordTokenExpires: {
        type: Date,
    },
    levelOfAccess: {
        type: String,
        default: "employee",
    },
    department: {
        type: String,
        required: true
    },
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;