"use client"
// Service.js
import React, { useEffect, useState } from "react"
import { ethers } from "ethers"
import contractABI from "../contracts/MedicalRecords.json"



const Service = () => {
  const [providerAddress, setProviderAddress] = useState("");
  const [authorizedPatients, setAuthorizedPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [medicalRecordsContract, setMedicalRecordsContract] = useState(null);

  useEffect(() => {
    const initializeContract = async () => {
      try {
        if (typeof window !== "undefined") {
          const contractAddress = "0x0D8e19cA7EbD3cE9b6fab9cF317a9e75e0D66082";
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const MedicalRecordsContract = new ethers.Contract(
            contractAddress,
            contractABI.abi,
            signer
          );
  
          setMedicalRecordsContract(MedicalRecordsContract);
        }
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };

    initializeContract();
  }, []);

  const handleFetchAuthorizedPatients = async (e) => {
    e.preventDefault();
    try {
      if (medicalRecordsContract) {
        const authorizedPatientsList = await medicalRecordsContract.getAuthorizedPatients(providerAddress);
        setAuthorizedPatients(authorizedPatientsList);
      }
    } catch (error) {
      console.error("Error fetching authorized patients:", error);
    }
  };

  const handleFetchMedicalRecords = async () => {
    try {
      if (selectedPatient && medicalRecordsContract) {
        const medicalRecordsData = await medicalRecordsContract.getMedicalRecord(selectedPatient);
        setMedicalRecords([medicalRecordsData]);
      }
    } catch (error) {
      console.error("Error fetching medical records:", error);
    }
  };

  return (
    <>
      <div className="w-1/2 mx-auto card card-base-100 border p-5 shadow-xl">
        <h1 className="text-xl font-bold text-white">Health Service</h1>
        <form className="mt-5 flex flex-col gap-5 text-white">
          <div>
            <label>Put Your Health Service Address:</label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={providerAddress}
              onChange={(e) => setProviderAddress(e.target.value)}
            />
          </div>
          <button
            className="btn bg-[#3369bf] hover:bg-[#2a4e87] border-none text-white"
            onClick={handleFetchAuthorizedPatients}
          >
            Granted Access
          </button>
        </form>
      </div>
      <div className="card card-base-100 border p-5 shadow-xl mx-auto my-20">
        <div className="flex flex-col item gap-2 text-white">
          <label>Select the patient whose medical record will be displayed:</label>
          <div className="flex gap-5">
            <select
              className="select select-bordered w-full max-w-xs"
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
            >
              <option value={""} disabled>
                Choose
              </option>
              {authorizedPatients.map((patient, index) => (
                <option key={index} value={patient}>
                  {patient}
                </option>
              ))}
            </select>
            <button
              onClick={handleFetchMedicalRecords}
              className="btn bg-[#3369bf] hover:bg-[#2a4e87] border-none text-white"
            >
              Get Medical Record
            </button>
          </div>
        </div>
        <div className="border shadow-sm rounded-md p-5 mt-5">
          <h2 className="mb-5 font-semibold text-lg text-center text-white">
            Medical Records
          </h2>
          <div className="overflow-x-auto w-full mx-auto">
            <table className="table border-b-2 ">
              {/* head */}
              <thead>
                <tr className=" text-white text-center">
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Birth Date</th>
                  <th>Home Phone</th>
                  <th>Address 1</th>
                  <th>Address 2</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Zip Code</th>
                  <th>Access Status</th>
                  <th>Diagnosis</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {medicalRecords.map((record, index) => (
                  <tr key={index} className="text-center text-white">
                    {Object.values(record).map((data, dataIndex) => (
                      <td key={dataIndex}>{data}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Service
