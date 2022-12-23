import { useRouter } from 'next/router';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Image from 'next/image';

import { Button, CarBanner, CarCard, Sidebar } from '../components';
import images from '../assets';
import carList from '../constants/carList';

const Stars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    if (i <= rating) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-yellow-star h-4" />);
    } else {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-dark-900 dark:text-white h-4" />);
    }
  }
  return <div className="flex">{stars}</div>;
};

const details = () => {
  const router = useRouter();
  const { model, type, gas, category, price, setIsFavorite, isFavorite } = router.query;

  const [checkedCapacity, setCheckedCapacity] = useState([1, 2, 4]);
  const [checkedType, setCheckedType] = useState(['sport']);
  const [checkedPrice, setCheckedPrice] = useState(120);
  const [banner, setBanner] = useState(images.banner.src);
  const [selected, setSelected] = useState('');

  // const numberOfCars = 10;

  console.log(setIsFavorite);

  const emptyHeart = () => (
    setIsFavorite((prev) => !prev)
  );

  // const filters = ['Sport', 'SUV', 'MPV', 'Sedan', 'Hackback', 'Coupe'];
  const capacity = [1, 2, 4, 8];
  const id = 0;

  const handleBanner = (e) => {
    setBanner(e);
  };

  const handleSelected = (i) => {
    setSelected(i);
  };

  const carImagess = [
    images.carCurrent, images.detailsViewCar, images.detailsViewCar2,
  ];

  return (
    <div className="w-full flex">
      <Sidebar checkedPrice={checkedPrice} setCheckedPrice={setCheckedPrice} checkedCapacity={checkedCapacity} setCheckedCapacity={setCheckedCapacity} checkedType={checkedType} setCheckedType={setCheckedType} />
      <div className="p-4 w-full">

        <div className="flex items-center justify-between">

          <div className="flex flex-col items-center w-49% rounded-lg p-5">

            <div style={{ backgroundImage: `url(${banner})`, backgroundSize: '50% 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'top' }} className="md:flex w-full bg-cover rounded">
              <CarBanner
                title={carList[id].text}
                subtitle={carList[id].subtitle}
                carImg={images.nissan}
                card="transparent"
                btnColor="bg-[#5CAFFC]"
                hidden="hidden"
              />
            </div>
            <div className="w-full mt-5">
              <div className="flex items-center justify-between">
                {carImagess.map((image, i) => (
                  <Image
                    onClick={(event) => {
                      handleBanner(event.target.src);
                      handleSelected(i);
                    }}
                    src={image}
                    alt={`${image}`}
                    className={`${selected === i ? 'selected p-2' : ''} w-31% object-contain`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className=" w-49% bg-white rounded-lg p-5">

            <div className="flex items-center justify-between">

              <div className="text-3xl font-bold font-jakarta text-center text-input-title">{model}</div>
              <div className="heart cursor-pointer" onClick={emptyHeart}>
                <FontAwesomeIcon
                  icon={faHeart}
                  className={`h-5 ${isFavorite ? 'text-error-default' : 'text-dark-900 dark:text-white'} 2xl:h-5`}
                />
              </div>
            </div>

            <div className="flex items-center mt-3">

              <div className="self-center cursor-pointer" onClick={emptyHeart}>
                <Stars rating={4} />
              </div>
              <div className="text-sm ml-4 font-jakarta text-center text-input-title">440+ reviewers</div>
            </div>

            <div className="flex items-center mt-8">
              <p className="text-xl font-jakarta text-input-title leading-9">{carList[id].description}
              </p>
            </div>

            <div className="flex items-center mt-8 flex-wrap gap-y-3">
              <div className="flex items-center justify-between w-full">
                <div className="flex w-full">
                  <p className="tracking-tight text-xl leading-6 text-secondinary-light-300">TypeCar:</p>
                  <p className="tracking-tight text-xl font-bold leading-6 text-input-title ml-3">{type}</p>
                </div>
                <div className="flex w-full">
                  <p className="tracking-tight text-xl leading-6 text-secondinary-light-300">Capacity:</p>
                  <p className="tracking-tight text-xl font-bold leading-6 text-input-title ml-3">{capacity}</p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="flex w-full">
                  <p className="tracking-tight text-xl leading-6 text-secondinary-light-300">Steering:</p>
                  <p className="tracking-tight text-xl font-bold leading-6 text-input-title ml-3">{category}</p>
                </div>
                <div className="flex w-full">
                  <p className="tracking-tight text-xl leading-6 text-secondinary-light-300">Gasoline:</p>
                  <p className="tracking-tight text-xl font-bold leading-6 text-input-title ml-3">{gas}</p>
                </div>
              </div>
            </div>

            <div className="flex w-full items-center justify-between mt-10">
              <div className="flex text-base font-jakarta font-bold items-end">
                <p className="text-3xl font-bold">${price} /</p>
                <p className="text-secondinary-light-300 ml-1 font-jakarta">day</p>
              </div>
              <div>
                <Button bgColor="bg-btn-blue" text="Rent Now" className="lg:w-full" />
              </div>
            </div>

          </div>

        </div>

        <div className="flex mt-4 justify-between flex-wrap gap-y-4">
          { carList.map((carmodel, index) => (
            <div key={index} className="w-full md:w-49% lg:w-32% xl:w-24% 3xl:w-19%">
              <CarCard model={carmodel.name} image={carmodel.image} people={carmodel.people} type={carmodel.type} price={carmodel.price} />
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default details;
