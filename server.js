import express from "express";
import patientUpdateRoutes from "./routes/patientUpdate.routes.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Register patient update routes
app.use("/api", patientUpdateRoutes);

app.listen(5050, () => {
  console.log("Server listening!");
});
