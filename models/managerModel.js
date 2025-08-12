import mongoose from "mongoose";

const managerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    marriedStatus: {
        type: Boolean,
        required: true
    },
    joiningDate: {
        type: Date,
        required: true
    },
    aadharNo: {
        type: String,
        required: true,
    },
    panNo: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    emergencyName: {
        type: String,
        required: true
    },
    emergencyPhone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    accountNo: {
        type: String,
        required: true
    },
    ifsc: {
        type: String,
        required: true
    },
    upiID: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    availablity: {
        type: Boolean,
        default: true
    }
});

const Manager = mongoose.models.managers || mongoose.model("managers", managerSchema);

export default Manager;