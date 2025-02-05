import patientModel from "../models/patient.models.js";
import userBioModel from "../models/userbio.models.js";

export const searchPatients = async (req, res) => {
  try {
    const doctorId = req.user._id; // Get the authenticated doctor's ID
    const { gender, complaints, illness, examination, diagnosis, diseaseTags } =
      req.query;

    // Build the aggregation pipeline
    const pipeline = [
      // First stage: Match patients belonging to the doctor
      {
        $match: {
          doctor: doctorId,
        },
      },
      // Join with userbio collection for gender search
      {
        $lookup: {
          from: "userbios",
          localField: "bio",
          foreignField: "_id",
          as: "bioData",
        },
      },
      { $unwind: "$bioData" },
      // Join with notes collection for complaints
      {
        $lookup: {
          from: "notes",
          localField: "complaints",
          foreignField: "_id",
          as: "complaintsData",
        },
      },
      // Join with notes collection for illness
      {
        $lookup: {
          from: "notes",
          localField: "illness",
          foreignField: "_id",
          as: "illnessData",
        },
      },
    ];

    // Add filters based on search criteria
    const matchStage = {};

    if (gender) {
      matchStage["bioData.gender"] = gender.toLowerCase();
    }

    if (complaints) {
      matchStage["complaintsData.complaint"] = {
        $regex: complaints,
        $options: "i",
      };
    }

    if (illness) {
      matchStage["illnessData.complaint"] = { $regex: illness, $options: "i" };
    }

    if (examination) {
      matchStage["examination"] = { $regex: examination, $options: "i" };
    }

    if (diagnosis) {
      matchStage["diagnosis"] = { $regex: diagnosis, $options: "i" };
    }

    if (diseaseTags) {
      matchStage["diseaseTags"] = { $regex: diseaseTags, $options: "i" };
    }

    // Add the match stage if there are any filters
    if (Object.keys(matchStage).length > 0) {
      pipeline.push({ $match: matchStage });
    }

    // Execute the aggregation pipeline
    const patients = await patientModel.aggregate(pipeline);

    return res.status(200).json({
      success: true,
      message: "Patients retrieved successfully",
      data: patients,
    });
  } catch (error) {
    console.error("Error in searchPatients:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
