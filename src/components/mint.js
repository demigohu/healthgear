"use client"
import { useState, useEffect } from "react"
import { ethers } from "ethers"
import HealthToken from "../contracts/HealthToken.json" // Sesuaikan dengan path yang benar

const contractAddress = "0x42089D7f16fE065A8D480Ab870005c655E231B8D" // Sesuaikan dengan alamat kontrak yang benar

const Mint = ({ account }) => {
  const [mintToAddress, setMintToAddress] = useState("")
  const [balanceAddress, setBalanceAddress] = useState("")
  const [balance, setBalance] = useState("")

  const handleMint = async (e) => {
    e.preventDefault()
    try {
      if (!mintToAddress) {
        console.error("Please enter the destination address")
        return
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(
        contractAddress,
        HealthToken.abi,
        signer
      )

      // Call the mintReward function in the smart contract without specifying amount
      await contract.mintReward(mintToAddress)

      console.log("Minting successful")
    } catch (error) {
      console.error("Error minting:", error)
    }
  }

  const handleCheckBalance = async (e) => {
    e.preventDefault()
    try {
      if (!balanceAddress) {
        console.error("Please enter the address to check balance")
        return
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(
        contractAddress,
        HealthToken.abi,
        provider
      )

      // Call the balanceOf function in the smart contract
      const result = await contract.balanceOf(balanceAddress)
      setBalance(result.toString())
    } catch (error) {
      console.error("Error fetching balance:", error)
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-10 py-10 px-20">
        <div className="card card-base-100 border p-5 shadow-xl">
          <h1 className="text-xl font-bold text-white">Mint Tokens</h1>
          <form className="mt-5 flex flex-col gap-5">
            <div className="">
              <label className="font-semibold text-[#333333]">
                Destination Address:
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full "
                value={mintToAddress}
                onChange={(e) => setMintToAddress(e.target.value)}
              />
            </div>
            <button
              onClick={handleMint}
              className="btn bg-[#3369bf] hover:bg-[#2a4e87] border-none text-white"
            >
              Mint Tokens
            </button>
          </form>
        </div>
        <div className="card card-base-100 border p-5 shadow-xl">
          <h1 className="text-xl font-bold text-white">Mint Tokens</h1>
          <form className="mt-5 flex flex-col gap-5">
            <div className="">
              <label className="font-semibold text-[#333333]">
                Address to Check Balance:
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={balanceAddress}
                onChange={(e) => setBalanceAddress(e.target.value)}
              />
            </div>
            <button
              onClick={handleCheckBalance}
              className="btn bg-[#3369bf] hover:bg-[#2a4e87] border-none text-white"
            >
              Check Balance
            </button>
            <p className="text-white font-bold">Balance: {balance} Tokens</p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Mint
