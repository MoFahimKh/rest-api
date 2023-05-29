import express from "express";
import api from "../utils/api.js";
import { dentalClinicsUrl, vetClinicsUrl } from "../utils/constants.js";
import { filterClinics } from "../utils/filteredClinics.js";

const router = express.Router();
let clinics = [];

// Function to fetch clinics and start the server
const fetchClinicsAndStartServer = async () => {
  const dentalClinics = await api(dentalClinicsUrl);
  const vetClinics = await api(vetClinicsUrl);

  clinics = [...dentalClinics, ...vetClinics];
};

// Route handler for /clinics endpoint
router.get("/", (req, res) => {
  const { clinicName, state, availability } = req.query;

  const filteredClinics = filterClinics(
    clinics,
    clinicName,
    state,
    availability
  );

  if (filteredClinics.length > 0) {
    res.json(filteredClinics);
  } else {
    res.status(404).json("Sorry, No such Clinics found");
  }
});

fetchClinicsAndStartServer();

export { router, fetchClinicsAndStartServer };
