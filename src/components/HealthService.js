import React, { useState } from "react"

const HealthServices = [
  {
    id: 1,
    name: "Layanan Kesehatan 1",
    image: "/path/to/image1.jpg",
    address: "Alamat Layanan Kesehatan 1",
  },
  {
    id: 2,
    name: "Layanan Kesehatan 2",
    image: "/path/to/image2.jpg",
    address: "Alamat Layanan Kesehatan 2",
  },
  {
    id: 3,
    name: "Layanan Kesehatan 3",
    image: "/path/to/image3.jpg",
    address: "Alamat Layanan Kesehatan 3",
  },
  {
    id: 4,
    name: "Layanan Kesehatan 4",
    image: "/path/to/image4.jpg",
    address: "Alamat Layanan Kesehatan 4",
  },
  {
    id: 5,
    name: "Layanan Kesehatan 5",
    image: "/path/to/image5.jpg",
    address: "Alamat Layanan Kesehatan 5",
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
        Daftar Layanan Kesehatan
      </h1>
      <div className="grid grid-cols-3 gap-10">
        {HealthServices.map((service) => (
          <div key={service.id} className="card bg-[#f0f0f0] shadow-xl">
            <figure>
              <img
                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{service.name}</h2>
              <p>{service.address}</p>
              <p>
                Address Layanan Kesehatan (bisa di copy):
                <span
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => handleCopyAddress(service.address)}
                >
                  {copiedAddress === service.address
                    ? "Copied!"
                    : service.address}
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
