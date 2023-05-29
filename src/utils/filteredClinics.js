import { parseAvailability } from "./parser.js";

const filterClinics = (clinics, clinicName, state, availability) => {
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

  return filteredClinics;
};

export { filterClinics };
