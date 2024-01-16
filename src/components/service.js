"use client"
// Service.js
import React, { useState } from "react"
import { ethers } from "ethers"
import contractABI from "../contracts/MedicalRecords.json"

// Ganti dengan alamat kontrak yang sesuai
const contractAddress = "0xE45cCB5e4f1C5ef368d8BFC387D57605b698B1D2"

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const MedicalRecordsContract = new ethers.Contract(
  contractAddress,
  contractABI.abi,
  signer
)

const Service = () => {
  const [providerAddress, setProviderAddress] = useState("")
  const [authorizedPatients, setAuthorizedPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState("")
  const [medicalRecords, setMedicalRecords] = useState([])

  const handleFetchAuthorizedPatients = async (e) => {
    e.preventDefault()
    try {
      const authorizedPatientsList =
        await MedicalRecordsContract.getAuthorizedPatients(providerAddress)
      setAuthorizedPatients(authorizedPatientsList)
    } catch (error) {
      console.error("Error fetching authorized patients:", error)
    }
  }

  const handleFetchMedicalRecords = async () => {
    try {
      // Pastikan selectedPatient tidak kosong sebelum memanggil fungsi
      if (selectedPatient) {
        const medicalRecordsData =
          await MedicalRecordsContract.getMedicalRecord(selectedPatient)
        setMedicalRecords([medicalRecordsData])
      }
    } catch (error) {
      console.error("Error fetching medical records:", error)
    }
  }

  return (
    <>
      <div className="w-1/2 mx-auto card card-base-100 border p-5 shadow-xl">
        <h1 className="text-xl font-bold text-white">Layanan Kesehatan</h1>
        <form className="mt-5 flex flex-col gap-5">
          <div>
            <label>Masukkan Alamat Layanan Kesehatan:</label>
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
            Lihat yang Telah Memberikan Izin
          </button>
        </form>
      </div>
      <div className="card card-base-100 border p-5 shadow-xl mx-auto my-20">
        <div className="flex flex-col item gap-2">
          <label>Pilih Pasien yang Akan Ditampilkan Rekam Medisnya:</label>
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
              Ambil Rekam Medis
            </button>
          </div>
        </div>
        <div className="border shadow-sm rounded-md p-5 mt-5">
          <h2 className="mb-5 font-semibold text-lg text-center text-white">
            Rekam Medis
          </h2>
          <div className="overflow-x-auto w-full mx-auto">
            <table className="table border-b-2 ">
              {/* head */}
              <thead>
                <tr className=" text-white text-center">
                  <th>Nama</th>
                  <th>Jenis Kelamin</th>
                  <th>Tanggal Lahir</th>
                  <th>Nomor Telepon</th>
                  <th>Alamat 1</th>
                  <th>Alamat 2</th>
                  <th>Kota</th>
                  <th>Provinsi</th>
                  <th>Kode Pos</th>
                  <th>Status Akses</th>
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
