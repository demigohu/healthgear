"use client"
import { useState } from 'react';
import { ethers } from 'ethers';

// Import ABI dan alamat kontrak smart contract
import MedicalRecordsABI from '../contracts/MedicalRecords.json';

export default function Submit() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [homePhone, setHomePhone] = useState('');
  const [addr1, setAddr1] = useState('');
  const [addr2, setAddr2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  const handleSubmit = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
  
        // Mengambil alamat kontrak dan provider Ethereum
        const contractAddress = '0xE45cCB5e4f1C5ef368d8BFC387D57605b698B1D2'; // Ganti dengan alamat kontrak Anda
        
        const signer = provider.getSigner();
    
        // Membuat instance kontrak MedicalRecords
        const medicalRecordsContract = new ethers.Contract(contractAddress, MedicalRecordsABI.abi, signer);
    
        // Menjalankan fungsi addOrUpdateMedicalRecord
        const transaction = await medicalRecordsContract.addOrUpdateMedicalRecord(
          name, gender, birthDate, homePhone, addr1, addr2, city, state, zipcode, [diagnosis]
        );
    
        // Menunggu konfirmasi transaksi
        await transaction.wait();
  
      }  alert('Medical Record submitted successfully!');
    } catch (error) {
      console.error('Error submitting medical record:', error);
      alert('Failed to submit medical record. Please check the console for details.');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Submit Medical Record</h1>
      <form className="form">
        {/* Form input fields */}
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label>
          Gender:
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
        </label>

        <label>
          Birth Date:
          <input type="text" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </label>

        <label>
          Home Phone:
          <input type="text" value={homePhone} onChange={(e) => setHomePhone(e.target.value)} />
        </label>

        <label>
          Address Line 1:
          <input type="text" value={addr1} onChange={(e) => setAddr1(e.target.value)} />
        </label>

        <label>
          Address Line 2:
          <input type="text" value={addr2} onChange={(e) => setAddr2(e.target.value)} />
        </label>

        <label>
          City:
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>

        <label>
          State:
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
        </label>

        <label>
          Zipcode:
          <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
        </label>

        <label>
          Diagnosis:
          <input type="text" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
        </label>

        <button type="button" onClick={handleSubmit}>
          Submit Medical Record
        </button>
      </form>

      <style jsx>{`
        .container {
          max-width: 600px;
          margin: auto;
          padding: 20px;
        }

        .title {
          text-align: center;
        }

        .form {
          display: flex;
          flex-direction: column;
        }

        label {
          margin-bottom: 10px;
        }

        input {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
        }

        button {
          background-color: #4caf50;
          color: white;
          padding: 10px;
          border: none;
          cursor: pointer;
        }

        button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
}
