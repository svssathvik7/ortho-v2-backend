import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
    {
        histories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "notes",
                required: true
            }
        ]
    },
    {
        timestamps: true
    }
);

const historyModels = mongoose.model("history",historySchema);

export default historyModels;