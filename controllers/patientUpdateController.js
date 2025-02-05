import patientModel from "../models/patient.models.js";
import userBioModel from "../models/userbio.models.js";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to handle common patient update operations
const updatePatientField = async (patientId, field, value) => {
  const patient = await patientModel.findById(patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }
  patient[field] = value;
  return await patient.save();
};

// Update Bio
export const updateBio = async (req, res) => {
  try {
    const { patientId } = req.params;
    const bioData = req.body;

    const patient = await patientModel.findById(patientId);
    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    const updatedBio = await userBioModel.findByIdAndUpdate(
      patient.bio,
      bioData,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Bio updated successfully",
      data: updatedBio,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// Update Complaints
export const updateComplaints = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { complaints } = req.body;

    const updatedPatient = await updatePatientField(
      patientId,
      "complaints",
      complaints
    );

    return res.status(200).json({
      success: true,
      message: "Complaints updated successfully",
      data: updatedPatient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// Update Illness
export const updateIllness = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { illness } = req.body;

    const updatedPatient = await updatePatientField(
      patientId,
      "illness",
      illness
    );

    return res.status(200).json({
      success: true,
      message: "Illness updated successfully",
      data: updatedPatient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// Update Past Medical History
export const updatePastMedicalHistory = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { pastMedicalHistory } = req.body;

    const updatedPatient = await updatePatientField(
      patientId,
      "pastMedicalHistory",
      pastMedicalHistory
    );

    return res.status(200).json({
      success: true,
      message: "Past medical history updated successfully",
      data: updatedPatient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// Update Family History
export const updateFamilyHistory = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { familyHistory } = req.body;

    const updatedPatient = await updatePatientField(
      patientId,
      "familyHistory",
      familyHistory
    );

    return res.status(200).json({
      success: true,
      message: "Family history updated successfully",
      data: updatedPatient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// Update Personal History
export const updatePersonalHistory = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { personalHistory } = req.body;

    const updatedPatient = await updatePatientField(
      patientId,
      "personalHistory",
      personalHistory
    );

    return res.status(200).json({
      success: true,
      message: "Personal history updated successfully",
      data: updatedPatient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// Update Examination
export const updateExamination = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { examination } = req.body;

    const updatedPatient = await updatePatientField(
      patientId,
      "examination",
      examination
    );

    return res.status(200).json({
      success: true,
      message: "Examination updated successfully",
      data: updatedPatient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// Update Diagnosis
export const updateDiagnosis = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { diagnosis } = req.body;

    const updatedPatient = await updatePatientField(
      patientId,
      "diagnosis",
      diagnosis
    );

    return res.status(200).json({
      success: true,
      message: "Diagnosis updated successfully",
      data: updatedPatient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// Update AO/OTA Classification
export const updateAoOtaClassification = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { aoOtaClassification } = req.body;

    const updatedPatient = await updatePatientField(
      patientId,
      "aoOtaClassification",
      aoOtaClassification
    );

    return res.status(200).json({
      success: true,
      message: "AO/OTA classification updated successfully",
      data: updatedPatient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// Update Disease Tags
export const updateDiseaseTags = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { diseaseTags } = req.body;

    const updatedPatient = await updatePatientField(
      patientId,
      "diseaseTags",
      diseaseTags
    );

    return res.status(200).json({
      success: true,
      message: "Disease tags updated successfully",
      data: updatedPatient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// Update Investigations
export const updateInvestigations = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { investigations } = req.body;

    // Process new investigations and upload images to Cloudinary
    const processedInvestigations = await Promise.all(
      investigations.map(async (investigation) => {
        if (!investigation.assets || investigation.assets.length === 0) {
          return investigation;
        }

        const processedAssets = await Promise.all(
          investigation.assets.map(async (asset) => {
            if (asset.public_id) return asset; // Skip if already uploaded

            try {
              const result = await cloudinary.uploader.upload(asset.url, {
                folder: "ortho-investigations",
                resource_type: "auto",
              });

              return {
                public_id: result.public_id,
                url: result.secure_url,
              };
            } catch (error) {
              console.error("Error uploading to Cloudinary:", error);
              throw new Error("Failed to upload image");
            }
          })
        );

        return {
          ...investigation,
          assets: processedAssets,
        };
      })
    );

    const updatedPatient = await updatePatientField(
      patientId,
      "investigations",
      processedInvestigations
    );

    return res.status(200).json({
      success: true,
      message: "Investigations updated successfully",
      data: updatedPatient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// Update Surgical Procedure
export const updateSurgicalProcedure = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { surgicalProcedure } = req.body;

    const updatedPatient = await updatePatientField(
      patientId,
      "surgicalProcedure",
      surgicalProcedure
    );

    return res.status(200).json({
      success: true,
      message: "Surgical procedure updated successfully",
      data: updatedPatient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// Update Implants
export const updateImplants = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { implants } = req.body;

    const updatedPatient = await updatePatientField(
      patientId,
      "implants",
      implants
    );

    return res.status(200).json({
      success: true,
      message: "Implants updated successfully",
      data: updatedPatient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// Update Complications
export const updateComplications = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { complications } = req.body;

    const updatedPatient = await updatePatientField(
      patientId,
      "complications",
      complications
    );

    return res.status(200).json({
      success: true,
      message: "Complications updated successfully",
      data: updatedPatient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// Update Follow Up
export const updateFollowUp = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { followUp } = req.body;

    const updatedPatient = await updatePatientField(
      patientId,
      "followUp",
      followUp
    );

    return res.status(200).json({
      success: true,
      message: "Follow up updated successfully",
      data: updatedPatient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
