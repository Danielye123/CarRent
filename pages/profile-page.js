import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';

import image from '../assets/index';
import { Button, CarTypeList } from '../components';

const Profile = ({ profileName = 'Web3', title = 'Agent' }) => {
  const [rentedCars, setRentedCars] = useState([]);
  const [carsForRent, setCarsForRent] = useState([]);

  const fetchCars = async () => {
    try {
      const rentedCarResponse = await axios.get('/api/cartype?tag=rented', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const forRentCarResponse = await axios.get('/api/cartype?tag=forRent', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const rentedCarData = await rentedCarResponse.data;
      const forRentCarData = await forRentCarResponse.data;
      setRentedCars(rentedCarData.data);
      setCarsForRent(forRentCarData.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className=" p-6 md:p-16 md:pt-[68px] ">
      <div className="text-xl font-bold mb-[29px] dark:text-black">
        My Profile
      </div>
      <div className=" rounded-t-xl bg-white max-h-[300px]">
        <div>
          <Image src={image.carcover} alt="coverImage" className="w-full rounded-t-xl max-h-44 object-cover" />
        </div>
        <div className="flex flex-row justify-between mt-3 ">
          <div className="flex">
            <Image src={image.Profile} alt="profileImage" className="relative bottom-[80px] left-[31px] sm:flex hidden w-[148px] h-auto object-contain" />
          </div>
          <div className="flex flex-row justify-between gap-6 w-full pb-8  ">
            <div className="ml-[70px] md:text-xl font-bold ">
              {profileName}
              <div className="font-normal text-sm  text-secondinary-light-300 ">
                {title}
              </div>
            </div>
            <div className=" pr-[50px]">
              <Button text="Edit Profile" handleClick={() => {}} />
            </div>
          </div>
        </div>
      </div>
      {/* <CarCard carsArr={CarCard.localStorage.getItem('cars')} /> */}
      <CarTypeList carData={rentedCars.slice(0, 4)} noscroll="flex-wrap" carCategory="Rented Cars" />
      <CarTypeList carData={carsForRent.slice(0, 3)} noscroll="flex-wrap" carCategory="Cars for Rent" />
      <div className="flex justify-center mt-[55px]">
        <Link href="/add-car-form">
          <Button text="Add More Cars for Rent" />
        </Link>
      </div>
    </div>
  );
};

export default Profile;
