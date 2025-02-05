import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const registerPatient = async (req, res) => {
  try {
    const {
      bio,
      complaints = [],
      illness = [],
      pastMedicalHistory,
      familyHistory,
      personalHistory,
      examination = [],
      diagnosis = [],
      aoOtaClassification = [],
      diseaseTags = [],
      investigations = [],
      surgicalProcedure = [],
      implants = [],
      complications = [],
      followUp = [],
    } = req.body;

    // Process investigations and upload images to Cloudinary
    const processedInvestigations = await Promise.all(
      investigations.map(async (investigation) => {
        if (!investigation.assets || investigation.assets.length === 0) {
          return investigation;
        }

        const processedAssets = await Promise.all(
          investigation.assets.map(async (asset) => {
            try {
              // Upload image to Cloudinary
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

    // Create new patient document
    const newPatient = await patientModel.create({
      bio,
      complaints,
      illness,
      pastMedicalHistory,
      familyHistory,
      personalHistory,
      examination,
      diagnosis,
      aoOtaClassification,
      diseaseTags,
      investigations,
      surgicalProcedure,
      implants,
      complications,
      followUp,
    });

    return res.status(201).json({
      success: true,
      message: "Patient registered successfully",
      data: newPatient,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
