import React, { useState, useEffect } from "react";
import axios from "axios";
import { HOST_URL } from "./constant";

const PatientInfo = ({ patientId }) => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patientInfo = await axios.get(`${HOST_URL}/Patient/${patientId}`);

        setPatient(patientInfo?.data);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    fetchPatient();
  }, [patientId]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>Patient Info</h2>
      {patient && (
        <>
          <p>
            Name:
            {` ${patient?.name[0]?.given[0]} ${patient?.name[0]?.family[0]}`}
          </p>
          <p>Gender: {` ${patient?.gender}`}</p>
          <p>Date of Birth: {` ${patient?.birthDate}`}</p>
        </>
      )}
    </>
  );
};

export default PatientInfo;
