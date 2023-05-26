import express from "express";
import api from "./utils/api.js";
import { dentalClinicsUrl, vetClinicsUrl } from "./utils/constants.js";
import { parseAvailability } from "./utils/parser.js";

const app = express();

const dentalClinics = await api(dentalClinicsUrl);
const vetClinics = await api(vetClinicsUrl);

const clinics = [...dentalClinics, ...vetClinics];

app.get("/clinics", (req, res) => {
  const { clinicName, state, availability } = req.query;

  let filteredClinics = clinics;

  if (clinicName) {
    filteredClinics = filteredClinics.filter(
      (clinic) => clinic.clinicName === clinicName
    );
  }

  if (state) {
    filteredClinics = filteredClinics.filter(
      (clinic) => clinic.stateCode === state
    );
  }

  if (availability) {
    const { from, to } = parseAvailability(availability);
    filteredClinics = filteredClinics.filter((clinic) => {
      if (clinic.opening && clinic.opening.from && clinic.opening.to) {
        const clinicFrom = clinic.opening.from;
        const clinicTo = clinic.opening.to;
        return clinicFrom >= from && clinicTo <= to;
      } else {
        return false;
      }
    });
  }

  res.json(aa);
});

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
