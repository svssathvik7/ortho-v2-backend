import express from "express";
import {
  updateBio,
  updateComplaints,
  updateIllness,
  updatePastMedicalHistory,
  updateFamilyHistory,
  updatePersonalHistory,
  updateExamination,
  updateDiagnosis,
  updateAoOtaClassification,
  updateDiseaseTags,
  updateInvestigations,
  updateSurgicalProcedure,
  updateImplants,
  updateComplications,
  updateFollowUp,
} from "../controllers/patientUpdateController.js";

const router = express.Router();

// Bio update route
router.put("/patients/:patientId/update/bio", updateBio);

// Complaints update route
router.put("/patients/:patientId/update/complaints", updateComplaints);

// Illness update route
router.put("/patients/:patientId/update/illness", updateIllness);

// Past Medical History update route
router.put(
  "/patients/:patientId/update/past-medical-history",
  updatePastMedicalHistory
);

// Family History update route
router.put("/patients/:patientId/update/family-history", updateFamilyHistory);

// Personal History update route
router.put(
  "/patients/:patientId/update/personal-history",
  updatePersonalHistory
);

// Examination update route
router.put("/patients/:patientId/update/examination", updateExamination);

// Diagnosis update route
router.put("/patients/:patientId/update/diagnosis", updateDiagnosis);

// AO/OTA Classification update route
router.put(
  "/patients/:patientId/update/ao-ota-classification",
  updateAoOtaClassification
);

// Disease Tags update route
router.put("/patients/:patientId/update/disease-tags", updateDiseaseTags);

// Investigations update route
router.put("/patients/:patientId/update/investigations", updateInvestigations);

// Surgical Procedure update route
router.put(
  "/patients/:patientId/update/surgical-procedure",
  updateSurgicalProcedure
);

// Implants update route
router.put("/patients/:patientId/update/implants", updateImplants);

// Complications update route
router.put("/patients/:patientId/update/complications", updateComplications);

// Follow Up update route
router.put("/patients/:patientId/update/follow-up", updateFollowUp);

export default router;
