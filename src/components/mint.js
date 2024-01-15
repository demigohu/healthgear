"use client"
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import HealthToken from '../contracts/HealthToken.json'; // Sesuaikan dengan path yang benar

const contractAddress = '0x42089D7f16fE065A8D480Ab870005c655E231B8D'; // Sesuaikan dengan alamat kontrak yang benar

const Mint = ({ account }) => {
  const [mintToAddress, setMintToAddress] = useState('');
  const [balanceAddress, setBalanceAddress] = useState('');
  const [balance, setBalance] = useState('');

  const handleMint = async () => {
    try {
      if (!mintToAddress) {
        console.error('Please enter the destination address');
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, HealthToken.abi, signer);

      // Call the mintReward function in the smart contract without specifying amount
      await contract.mintReward(mintToAddress);

      console.log('Minting successful');
    } catch (error) {
      console.error('Error minting:', error);
    }
  };

  const handleCheckBalance = async () => {
    try {
      if (!balanceAddress) {
        console.error('Please enter the address to check balance');
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, HealthToken.abi, provider);

      // Call the balanceOf function in the smart contract
      const result = await contract.balanceOf(balanceAddress);
      setBalance(result.toString());
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  return (
    <div>
      <h1>Mint Tokens</h1>
      <label>
        Destination Address:
        <input
          type="text"
          value={mintToAddress}
          onChange={(e) => setMintToAddress(e.target.value)}
        />
      </label>
      <button onClick={handleMint}>Mint Tokens</button>

      <h1>Check Token Balance</h1>
      <label>
        Address to Check Balance:
        <input
          type="text"
          value={balanceAddress}
          onChange={(e) => setBalanceAddress(e.target.value)}
        />
      </label>
      <button onClick={handleCheckBalance}>Check Balance</button>
      <p>Balance: {balance} Tokens</p>
    </div>
  );
};

export default Mint;
