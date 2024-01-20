import React, { useState } from "react"
import Image from "next/image"
import Hospital from "@/../public/hospital.jpg"

const HealthServices = [
  {
    id: 1,
    name: "Massachusetts General Hospital",
    image: "/path/to/image1.jpg",
    address: "55 Fruit St, Boston, MA 02114, United States",
    addresss: "0x0827e9Ac4BB96825729aE16a6E411D93104B7A51",
  },
  {
    id: 2,
    name: "Toronto General - University Health Network",
    image: "/path/to/image2.jpg",
    address: "190 Elizabeth St, Toronto, ON M5G 2C4, Canada",
    addresss: "0x2324115be89630cE5703b2953dEFB6702d4110af",
  },
  {
    id: 3,
    name: "Singapore General Hospital",
    image: "/path/to/image3.jpg",
    address: "Outram Rd, Singapore 169608",
    addresss: "0xC5c6894AC5CA4A9245FdF08df923340FDbE40C7c",
  },
  {
    id: 4,
    name: "Centre Hospitalier Universitaire Vaudois",
    image: "/path/to/image4.jpg",
    address: "Rue du Bugnon 46, 1005 Lausanne, Switzerland",
    addresss: "0x7a3a1845588167680424C831F2aBB7caD518F32D",
  },
  {
    id: 5,
    name: "The University of Tokyo Hospital",
    image: "/path/to/image5.jpg",
    address: "7-chōme-3-1 Hongō, Bunkyo City, Tokyo 113-8655, Japan",
    addresss: "0x60735C97C710E0e16471f9508746FBd77425C847",
  },
  {
    id: 6,
    name: "Asan Medical Center",
    image: "/path/to/image6.jpg",
    address: "88 Olympic-ro 43-gil, Songpa-gu, Seoul, South Korea",
    addresss: "0xf51Faa33248Eac46FDe730339250b8D81664b717",
  },
]

const HealthService = () => {
  const [copiedAddress, setCopiedAddress] = useState(null)

  const handleCopyAddress = (address) => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        setCopiedAddress(address)
        setTimeout(() => setCopiedAddress(null), 3000)
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error)
      })
  }

  return (
    <div className="">
      <h1 className="text-3xl text-center mb-16 text-white font-bold">
        List Health Service
      </h1>
      <div className="grid grid-cols-3 gap-10 text-black">
        {HealthServices.map((service) => (
          <div key={service.id} className="card bg-[#f0f0f0] shadow-xl overflow-hidden">
            <figure>
              <Image
                src={Hospital}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{service.name}</h2>
              <p>{service.address}</p>
              <p>
                {/* Address Layanan Kesehatan (bisa di copy): */}
                <span
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => handleCopyAddress(service.addresss)}
                >
                  {copiedAddress === service.addresss
                    ? "Copied!"
                    : service.addresss}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HealthService
