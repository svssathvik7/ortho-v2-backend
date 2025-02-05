import express from "express";
import searchRoutes from "./routes/search.routes.js";
import patientUpdateRoutes from "./routes/patientUpdate.routes.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Register patient update routes
app.use("/api", patientUpdateRoutes);
app.use("/api", searchRoutes);

app.listen(5050, () => {
  console.log("Server listening!");
});
