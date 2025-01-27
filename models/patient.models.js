import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  bio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userbio",
    required: true,
  },
  complaints: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "notes",
      required: true,
    },
  ],
  illness: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "notes",
      required: true,
    },
  ],
  pastMedicalHistory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "medicalhistory",
    required: true,
  },
  familyHistory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "history",
    required: true,
  },
  personalHistory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "history",
    required: true,
  },
  examination: [
    {
      type: String,
    },
  ],
  diagnosis: [
    {
      type: String,
    },
  ],
  aoOtaClassification: [
    {
      type: String,
    },
  ],
  diseaseTags: [
    {
      type: String,
    },
  ],
  investigations: [
    {
      phase: {
        type: String,
        required: true,
        enum: ["pre-op", "per-op", "post-op"],
      },
      notes: String,
      assets: [
        {
          type: String, // this we need to change later
        },
      ],
    },
  ],
  surgicalProcedure: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "notes",
      required: true,
    },
  ],
  implants: [
    {
      // replace according to the doc
      type: String,
    },
  ],
  complications: [
    { type: mongoose.Schema.Types.ObjectId, ref: "notes", required: true },
  ],
  followUp: [
    { type: mongoose.Schema.Types.ObjectId, ref: "notes", required: true },
  ],
});

const patientModel = mongoose.model("patient", patientSchema);

export default patientModel;
