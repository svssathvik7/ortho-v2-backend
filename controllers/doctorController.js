import doctorModel from "../models/doctor.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if doctor exists
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: doctor._id, email: doctor.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Remove password from response
    const doctorResponse = doctor.toObject();
    delete doctorResponse.password;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        doctor: doctorResponse,
        token,
      },
    });
  } catch (error) {
    console.error("Error in doctor login:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during login",
    });
  }
};
