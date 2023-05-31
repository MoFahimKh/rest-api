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
      return clinic.opening?.from >= from && clinic.opening?.to <= to;
    });
  }

  return filteredClinics;
};

export { filterClinics };
