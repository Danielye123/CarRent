/* eslint-disable import/no-cycle */
import Link from 'next/link';
import React from 'react';

import { CarCard } from './index';

const CarTypeListHome = ({ carCategory, carData, scrollable, noscroll }) => (
  <div className="popular w-full mt-8 md:mt-[42px]">
    <div className="flex justify-between">
      <h3 className="flex text-secondinary-light-300 font-medium text-sm md:text-base md:font-semi-bold">
        {carCategory}
      </h3>
      <button type="button" onClick={() => { }}>
        <h3 className="flex justify-end text-btn-blue text-xs font-semibold md:text-base">
          <Link href="/category">view all</Link>
        </h3>
      </button>
    </div>
    <div className={`flex mt-[30px] justify-start w-full ${noscroll} gap-4 ${scrollable} `}>
      {carData.map((car, index) => (
        <div key={car.model + index} className="w-full md:max-w-49 lg:max-w-32 xl:max-w-25 3xl:max-w-20 md:flex-48 lg:flex-31 xl:flex-23 3xl:flex-19"> <CarCard {...car} /></div>
      ))}
    </div>
  </div>
);

export default CarTypeListHome;

