import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    hospitalAffiliations: [
      {
        hospitalName: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          required: true,
        },
        from: {
          type: Date,
          required: true,
        },
        to: {
          type: Date,
        },
      },
    ],
    contact: {
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    qualifications: [
      {
        degree: {
          type: String,
          required: true,
        },
        institution: {
          type: String,
          required: true,
        },
        year: {
          type: Number,
          required: true,
        },
      },
    ],
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const doctorModel = mongoose.model("doctor", doctorSchema);

export default doctorModel;
