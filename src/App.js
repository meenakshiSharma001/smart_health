import React, { useEffect, useState } from "react";
import PatientProfile from "./PatientProfile";
import axios from "axios";
import { HOST_URL } from "./constant";
import "./App.css";
import Select from "react-select";

function App() {
  const [patientOption, setPatientOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const fetchPatient = async () => {
    try {
      const patient = await axios.get(`${HOST_URL}/Patient`);
      const patientData = patient.data.entry.map((val) => {
        return {
          value: val.resource.id,
          label: `${val?.resource.name[0]?.given[0]} ${val?.resource.name[0]?.family[0]}`,
        };
      });
      setPatientOption(patientData);
      setSelectedOption(patientData[0]);
    } catch (error) {
      console.error("Error fetching patient:", error);
    }
  };

  useEffect(() => {
    fetchPatient();
  }, []);

  return (
    <div className="App">
      <b>Select Patient:</b>
      <Select
        styles={customStyles}
        options={patientOption}
        value={selectedOption}
        onChange={setSelectedOption}
      />
      {selectedOption && <PatientProfile patientId={selectedOption?.value} />}
    </div>
  );
}

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "25%",
  }),
};

export default App;
