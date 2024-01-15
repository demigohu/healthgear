"use client"
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractABI from '../contracts/MedicalRecords.json';

// Gantilah dengan alamat kontrak yang sesuai
const contractAddress = '0xE45cCB5e4f1C5ef368d8BFC387D57605b698B1D2';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const MedicalRecordsContract = new ethers.Contract(contractAddress, contractABI.abi, signer);

const Access = () => {
  const [providerAddress, setProviderAddress] = useState('');

  const handleGrantAccess = async () => {
    try {
      // Validasi apakah alamat layanan kesehatan diisi
      if (!providerAddress) {
        console.error('Please enter the healthcare service address');
        return;
      }

      // Memanggil fungsi grantAccess pada smart contract
      await MedicalRecordsContract.grantAccess(providerAddress);
      console.log('Access granted to:', providerAddress);
    } catch (error) {
      console.error('Error granting access:', error);
    }
  };

  return (
    <div>
      <h1>Grant Access</h1>
      <label>
        Healthcare Service Address:
        <input
          type="text"
          value={providerAddress}
          onChange={(e) => setProviderAddress(e.target.value)}
        />
      </label>
      <button onClick={handleGrantAccess}>Grant Access</button>
    </div>
  );
};

export default Access;
