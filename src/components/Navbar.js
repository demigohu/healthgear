"use client"

import React, { useState } from "react"
import { ethers } from "ethers"
import Link from "next/link"
import Image from "next/image"
import Logo from "@/../public/logo.jpg"

function Navbar() {
  const [walletInfoVisible, setWalletInfoVisible] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [balance, setBalance] = useState("")
  const [change, setChange] = useState(false)

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        // Cek apakah pengguna sudah terhubung ke wallet
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        })
        if (accounts.length === 0) {
          // Jika belum terhubung, minta izin
          await window.ethereum.request({ method: "eth_requestAccounts" })
        }

        // Dapatkan alamat dan ChainID
        const address = await signer.getAddress()
        const chainId = await provider.getNetwork().chainId

        // Cek apakah ChainID sesuai dengan yang diinginkan (0x1229724)
        if (chainId !== 0x12c39c) {
          // Tambahkan jaringan yang diinginkan
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                nativeCurrency: {
                  name: "Overgear",
                  symbol: "OVR",
                  decimals: 18,
                },
                rpcUrls: [
                  "https://froopyland.dymension.xyz/26/overgear_1229724-1/evmrpc",
                ],
                chainId: "0x12C39C",
                chainName: "overgear_1229724-1",
              },
            ],
          })
        }

        // Update informasi wallet jika diperlukan
        setWalletAddress(address)
        const balance = await provider.getBalance(address)
        const formattedBalance = ethers.utils.formatEther(balance)
        setBalance(formattedBalance)
        setWalletInfoVisible(true)
      } else {
        console.error("Metamask not found")
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error)
    }
  }

  const disconnectWallet = () => {
    setWalletInfoVisible(false)
    setWalletAddress("")
    setBalance("")
  }

  const handleChange = () => {
    setChange(!change)
  }

  return (
    <div className="max-w-[1200px] mx-auto px-10 relative">
      <div className="flex justify-between items-center py-5 ">
        <div className="flex items-center gap-2">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
            <Image
              src={Logo}
              alt=""
              width={100}
              height={100}
              className="w-full h-full"
            />
          </div>
          <p className="text-xl font-bold text-white">Health Gear</p>
        </div>
        <div className="flex gap-10 font-semibold text-[#f0f0f0] ">
          <Link href={"/"} className="hover:text-[#333333]">
            Home
          </Link>
          <Link href={"mint"} className="hover:text-[#333333]">
            Mint
          </Link>
          <Link href={"submit"} className="hover:text-[#333333]">
            Submit & Access
          </Link>
          <Link href={"service"} className="hover:text-[#333333]">
            Service
          </Link>
        </div>
        <div className="flex items-center gap-8">
          {walletInfoVisible ? (
            <div>
              <div className="flex gap-5">
                <button className="btn bg-transparent text-black hover:bg-transparent ">
                  {balance}
                </button>
                <div
                  className="border text-white shadow-md px-2 rounded-lg cursor-pointer flex items-center gap-2 max-w-40 overflow-hidden"
                  onClick={handleChange}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={Logo}
                      alt=""
                      width={100}
                      height={100}
                      className="w-full h-full"
                    />
                  </div>
                  <p className="max-w-20 text-xs text-black font-semibold overflow-hidden">
                    {walletAddress}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              className="btn bg-[#ffd700] hover:bg-[#eccc15] border-none"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}
        </div>
        {change ? (
          <div
            className="flex items-center max-w-64 gap-2  overflow-hidden rounded-lg absolute right-10 shadow-xl top-[80px] z-50 border"
            onClick={handleChange}
          >
            <div className="p-2 overflow-hidden">
              <p className="text-xs font-semibold">{walletAddress}</p>
            </div>
            <button
              onClick={disconnectWallet}
              className="btn bg-[#f83600] hover:bg-[#df451a] text-white border-none"
            >
              Disconnect Wallet
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Navbar
