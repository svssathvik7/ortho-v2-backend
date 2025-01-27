import mongoose from "mongoose";

const userComplaintSchema = new mongoose.Schema(
    {
        complaint: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const userComplaintModels = mongoose.model("notes",userComplaintSchema);

export default userComplaintModels;