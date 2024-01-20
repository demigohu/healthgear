"use client"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import contractABI from "../contracts/MedicalRecords.json"

// Gantilah dengan alamat kontrak yang sesuai
const contractAddress = "0x0D8e19cA7EbD3cE9b6fab9cF317a9e75e0D66082"

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const MedicalRecordsContract = new ethers.Contract(
  contractAddress,
  contractABI.abi,
  signer
)

const Access = () => {
  const [providerAddress, setProviderAddress] = useState("")

  const handleGrantAccess = async (e) => {
    e.preventDefault()
    try {
      // Validasi apakah alamat layanan kesehatan diisi
      if (!providerAddress) {
        console.error("Please enter the healthcare service address")
        return
      }

      // Memanggil fungsi grantAccess pada smart contract
      await MedicalRecordsContract.grantAccess(providerAddress)
      console.log("Access granted to:", providerAddress)
    } catch (error) {
      console.error("Error granting access:", error)
    }
  }

  return (
    <>
      <div className="card card-base-100 border p-5 shadow-xl">
        <h1 className="text-xl font-bold text-white">Grant Access</h1>
        <form className="mt-5 flex flex-col gap-5 text-white">
          <div className="">
            <label>Give Access to Health Service Address</label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={providerAddress}
              onChange={(e) => setProviderAddress(e.target.value)}
            />
          </div>
          <button
            onClick={handleGrantAccess}
            className="btn bg-[#3369bf] hover:bg-[#2a4e87] border-none text-white"
          >
            Grant Access
          </button>
        </form>
      </div>
    </>
  )
}

export default Access
