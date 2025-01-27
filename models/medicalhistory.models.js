import mongoose from "mongoose";

const medicalHistorySchema = new mongoose.Schema(
    {
        condition: {
            type: String,
            required: true,
            enum: ["chronic", "short-term"],
            description: String,
        },
        surgicalHistory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "notes",
            required: true,
        },
        medications: [
            {
                tag: {
                    type: String,
                    required: true,
                    enum: ["current", "past"],
                },
                medicines: {
                    type: [String],
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const MedicalHistoryModel = mongoose.model("medicalhistory", medicalHistorySchema);

export default MedicalHistoryModel;
