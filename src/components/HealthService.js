import React from 'react';

const HealthServices = [
  {
    id: 1,
    name: 'Layanan Kesehatan 1',
    image: '/path/to/image1.jpg',
    address: 'Alamat Layanan Kesehatan 1',
  },
  {
    id: 2,
    name: 'Layanan Kesehatan 2',
    image: '/path/to/image2.jpg',
    address: 'Alamat Layanan Kesehatan 2',
  },
  {
    id: 3,
    name: 'Layanan Kesehatan 3',
    image: '/path/to/image3.jpg',
    address: 'Alamat Layanan Kesehatan 3',
  },
  {
    id: 4,
    name: 'Layanan Kesehatan 4',
    image: '/path/to/image4.jpg',
    address: 'Alamat Layanan Kesehatan 4',
  },
  {
    id: 5,
    name: 'Layanan Kesehatan 5',
    image: '/path/to/image5.jpg',
    address: 'Alamat Layanan Kesehatan 5',
  },
];

const HealthService = () => {
  return (
    <div>
      <h1>Daftar Layanan Kesehatan</h1>
      {HealthServices.map((service) => (
        <div key={service.id}>
          <h2>{service.name}</h2>
          <img src={service.image} alt={`Foto ${service.name}`} style={{ width: '200px', height: 'auto' }} />
          <p>Nama Layanan Kesehatan: {service.name}</p>
          <p>Alamat Layanan Kesehatan: {service.address}</p>
          <p>Address Layanan Kesehatan (bisa di copy): {service.address}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default HealthService;
