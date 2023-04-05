import React from "react";
import PatientInfo from "./PatientInfo";
import ConditionsTable from "./ConditionsTable";

function PatientProfile({ patientId }) {
  return (
    <>
      <PatientInfo patientId={patientId} />
      <ConditionsTable patientId={patientId} />
    </>
  );
}

export default PatientProfile;
