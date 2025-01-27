import mongoose from "mongoose";

const userBioSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        birthYear: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ["male","female","other"]
        },
        umr: {
            type: String,
            unique: true,
            required: true
        },
        contact: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: false,
        },
        occupation: {
            type: String,
            required: false
        },
        hospital: {
            type: String,
            required: true
        },
        dataOfVisit: {
            type: Date,
            required: true
        },
        referralDoctor: {
            type: String,
            required: false,
        },
        referralDoctorContact: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const userBioModel = mongoose.model("userbio",userBioSchema);

export default userBioModel;