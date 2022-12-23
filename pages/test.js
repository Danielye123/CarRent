import axios from 'axios';
import { useEffect, useState } from 'react';

/* export async function getServerSideProps() {
  try {
    const response = await fetch('http://localhost:3000/controllers/posts');
    const posts = await response.json();

    console.log({ posts });

    return {
      props: { posts: JSON.parse(JSON.stringify(posts)) },
    };
  } catch (e) {
    console.error(e);
  }
} */

const test = () => {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const response = await axios.get('/api/car', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.data;
      console.log('data', data);
      setCars(data.data);
    } catch (error) {
      console.log('Error', error);
    }
  };

  // get data
  useEffect(() => {
    fetchCars();
  }, []);

  console.log('cars', cars);

  return (
    <div>
      <h1>Test</h1>
      <h2>Data</h2>
      {cars.map((car) => (
        <div key={car._id}>
          <h3>{car.carTitle}</h3>
          <p>{car.model}</p>
          <p>{car.category}</p>
          <p>{car.price}</p>
          <p>{car.people}</p>
          <p>{car.type}</p>
          <p>{car.location}</p>
          <p>{car.gas}</p>
          <p>{car.pickupLocation}</p>
          <p>{car.dropOffLocation}</p>
          <p>{car.availabilityFrom}</p>
          <p>{car.availabilityTo}</p>
          <p>{car.description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default test;
