"use client"
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import MedicalRecordsABI from "../contracts/MedicalRecords.json";

export default function Submit() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [homePhone, setHomePhone] = useState("");
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medicalRecordsContract, setMedicalRecordsContract] = useState(null);

  useEffect(() => {
    const initializeContract = async () => {
      try {
        if (typeof window !== "undefined") {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contractAddress = "0x0D8e19cA7EbD3cE9b6fab9cF317a9e75e0D66082";
          const signer = provider.getSigner();
          const medicalRecordsContract = new ethers.Contract(
            contractAddress,
            MedicalRecordsABI.abi,
            signer
          );
          setMedicalRecordsContract(medicalRecordsContract);
        }
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };

    initializeContract();
  }, []); // empty dependency array ensures this effect runs only once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (medicalRecordsContract) {
        const transaction = await medicalRecordsContract.addOrUpdateMedicalRecord(
          name,
          gender,
          birthDate,
          homePhone,
          addr1,
          addr2,
          city,
          state,
          zipcode,
          [diagnosis]
        );
        await transaction.wait();
        alert("Medical Record submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting medical record:", error);
      alert(
        "Failed to submit medical record. Please check the console for details."
      );
    }
  };

  return (
    <>
      <div className="card card-base-100 border p-5 shadow-xl">
        <h1 className="text-xl font-bold text-white">Submit Medical Record</h1>
        <form className="mt-5 flex flex-col gap-5 text-white">
          <div className="">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="">
            <label>Gender:</label>
            <input
              type="text"
              placeholder="Gender"
              className="input input-bordered w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div className="">
            <label>Birth Date:</label>
            <input
              type="text"
              placeholder="Birth Date"
              className="input input-bordered w-full"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div className="">
            <label>Home Phone:</label>
            <input
              type="text"
              placeholder="Home Phone"
              className="input input-bordered w-full"
              value={homePhone}
              onChange={(e) => setHomePhone(e.target.value)}
            />
          </div>
          <div className="">
            <label>Address Line 1:</label>
            <input
              type="text"
              placeholder="Address Line 1"
              className="input input-bordered w-full"
              value={addr1}
              onChange={(e) => setAddr1(e.target.value)}
            />
          </div>
          <div className="">
            <label>Address Line 2:</label>
            <input
              type="text"
              placeholder="Address Line 2"
              className="input input-bordered w-full"
              value={addr2}
              onChange={(e) => setAddr2(e.target.value)}
            />
          </div>
          <div className="">
            <label>City:</label>
            <input
              type="text"
              placeholder="City"
              className="input input-bordered w-full"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="">
            <label>State:</label>
            <input
              type="text"
              placeholder="State"
              className="input input-bordered w-full"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="">
            <label>Zipcode:</label>
            <input
              type="text"
              placeholder="Zipcode"
              className="input input-bordered w-full"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </div>
          <div className="">
            <label>Diagnosis:</label>
            <input
              type="text"
              placeholder="Diagnosis"
              className="input input-bordered w-full"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="btn bg-[#3369bf] hover:bg-[#2a4e87] border-none text-white mt-5"
          >
            Submit Medical Record
          </button>
        </form>
      </div>
    </>
  )
}
