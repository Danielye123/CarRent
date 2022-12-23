/* eslint-disable no-lone-blocks */
import Image from 'next/image';
import Link from 'next/link';

import Button from './Button';

const CarBanner = (props) => {
  const { title, subtitle, carImg, card, btnColor, hidden } = props;
  return (
    <div className={`flex flex-col ${card} w-full rounded-xl p-5`}>
      <div className=" flex flex-col justify-start w-2/3 md:w-2/3 lg:w-2/3">
        <h1 className=" font-jakarta text-white-color font-semibold text-base md:text-base lg:text-3xl text-left md:font-semibold">{title}</h1>
        <h2 className="font-jakarta text-white-color font-medium text-xs md:text-sm lg:text-base pt-3">{subtitle}</h2>
        <div className={`mt-4 ${hidden}`}>
          <Link href="/category">
            <Button text="Rental Car" bgColor={btnColor} onClick={() => { }} />
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center mt-10 flex-shrink-1">
        <Image src={carImg} alt="carimage" priority className=" object-contain lg:scale-125" />
      </div>
    </div>
  );
};
export default CarBanner;

