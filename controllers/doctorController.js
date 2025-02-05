import doctorModel from "../models/doctor.models.js";
import bcrypt from "bcrypt";

export const registerDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      registrationNumber,
      specialization,
      hospitalAffiliations,
      contact,
      qualifications,
      experience,
    } = req.body;

    // Check if doctor already exists
    const existingDoctor = await doctorModel.findOne({
      $or: [{ email }, { registrationNumber }],
    });

    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor with this email or registration number already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new doctor
    const newDoctor = await doctorModel.create({
      name,
      email,
      password: hashedPassword,
      registrationNumber,
      specialization,
      hospitalAffiliations,
      contact,
      qualifications,
      experience,
      patients: [],
    });

    // Remove password from response
    const doctorResponse = newDoctor.toObject();
    delete doctorResponse.password;

    return res.status(201).json({
      success: true,
      message: "Doctor registered successfully",
      data: doctorResponse,
    });
  } catch (error) {
    console.error("Error in doctor registration:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during registration",
    });
  }
};
