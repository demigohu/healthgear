"use client"
// Service.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractABI from '../contracts/MedicalRecords.json';

// Ganti dengan alamat kontrak yang sesuai
const contractAddress = '0xE45cCB5e4f1C5ef368d8BFC387D57605b698B1D2';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const MedicalRecordsContract = new ethers.Contract(contractAddress, contractABI.abi, signer);

const Service = () => {
  const [providerAddress, setProviderAddress] = useState('');
  const [authorizedPatients, setAuthorizedPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [medicalRecords, setMedicalRecords] = useState([]);

  const handleFetchAuthorizedPatients = async () => {
    try {
      const authorizedPatientsList = await MedicalRecordsContract.getAuthorizedPatients(providerAddress);
      setAuthorizedPatients(authorizedPatientsList);
    } catch (error) {
      console.error('Error fetching authorized patients:', error);
    }
  };

  const handleFetchMedicalRecords = async () => {
    try {
      // Pastikan selectedPatient tidak kosong sebelum memanggil fungsi
      if (selectedPatient) {
        const medicalRecordsData = await MedicalRecordsContract.getMedicalRecord(selectedPatient);
        setMedicalRecords([medicalRecordsData]);
      }
    } catch (error) {
      console.error('Error fetching medical records:', error);
    }
  };

  return (
    <div>
      <h1>Layanan Kesehatan</h1>
      <div>
        <label>
          Masukkan Alamat Layanan Kesehatan:
          <input
            type="text"
            value={providerAddress}
            onChange={(e) => setProviderAddress(e.target.value)}
          />
        </label>
        <button onClick={handleFetchAuthorizedPatients}>Lihat yang Telah Memberikan Izin</button>
      </div>
      <div>
        <label>
          Pilih Pasien yang Akan Ditampilkan Rekam Medisnya:
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
          >
            <option value="" disabled>Pilih Pasien</option>
            {authorizedPatients.map((patient, index) => (
              <option key={index} value={patient}>{patient}</option>
            ))}
          </select>
          <button onClick={handleFetchMedicalRecords}>Ambil Rekam Medis</button>
        </label>
      </div>
      <h2>Rekam Medis</h2>
      {medicalRecords && medicalRecords.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Jenis Kelamin</th>
              <th>Tanggal Lahir</th>
              <th>Nomor Telepon</th>
              <th>Alamat</th>
              <th>Kota</th>
              <th>Provinsi</th>
              <th>Kode Pos</th>
              <th>Status Akses</th>
              <th>Diagnosis</th>
            </tr>
          </thead>
          <tbody>
            {medicalRecords.map((record, index) => (
              <tr key={index}>
                {Object.values(record).map((data, dataIndex) => (
                  <td key={dataIndex}>{data}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Tidak ada rekam medis yang ditemukan.</p>
      )}
    </div>
  );
};

export default Service;
