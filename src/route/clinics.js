import express from "express";
import api from "../utils/api.js";
import { dentalClinicsUrl, vetClinicsUrl } from "../utils/constants.js";
import { filterClinics } from "../utils/filterClinics.js";

const router = express.Router();
let clinics = [];

// Route handler for /clinics endpoint
router.get("/", async (req, res) => {
  const dentalClinics = await api(dentalClinicsUrl);
  const vetClinics = await api(vetClinicsUrl);

  clinics = [...dentalClinics, ...vetClinics];
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

export { router };
