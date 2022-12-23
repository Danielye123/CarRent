import { useEffect, useState } from 'react';
import axios from 'axios';

import { Button, CarCard, Sidebar, StatePicker } from '../components';
import { useThemeContext } from '../context/filtersState';

const category = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  const [allFilteredCars, setAllFilteredCars] = useState([]);

  function useWindowSize() {
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
        });
      }

      window.addEventListener('resize', handleResize);

      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowSize;
  }

  const size = useWindowSize();

  const [filterState, setFilterState] = useThemeContext();

  const { checkedCapacity, checkedPrice, checkedType, checkedPickup, checkedDropoff } = filterState;

  const [numberOfCars, setNumberOfCars] = useState(size.width < 1900 ? 12 : 15);

  const showMoreCars = () => {
    setNumberOfCars(numberOfCars * 2);
  };

  useEffect(() => {
    setNumberOfCars(windowSize.width < 1900 ? 12 : 15);
  }, [windowSize.width]);

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

  const totalCars = cars.length;

  const hidden = () => {
    if (numberOfCars > totalCars) {
      return 'hidden';
    }
    return '';
  };

  const filterPickup = (car) => {
    const filteredCars = car.filter(({ pickupLocation }) => {
      if (checkedPickup.location.length > 0) return checkedPickup.location.toLowerCase().includes(pickupLocation.toLowerCase());
      if (checkedPickup.location.length === 0) return car;
      return filteredCars;
    });
    return filteredCars;
  };

  const filterDropoff = (car) => {
    const filteredCars = filterPickup(car).filter(({ dropOffLocation }) => {
      if (checkedDropoff.location.length > 0) return checkedDropoff.location.toLowerCase().includes(dropOffLocation.toLowerCase());
      if (checkedDropoff.location.length === 0) return car;
      return filteredCars;
    });
    return filteredCars;
  };
  /*
  const filterPickupDate = (car) => {
    const filteredCars = filterDropoff(car).filter(({ availabilityFrom }) => {
      if (checkedPickup.date.length > 0) return checkedPickup.date.getTime() >= availabilityFrom.getTime();
      if (checkedPickup.date.length === 0) return car;
      return filteredCars;
    });
    return filteredCars;
  };
 */
  const filterCarTypes = (car) => {
    const locationFilteredCars = filterDropoff(car);

    const filterData = locationFilteredCars.filter((allCars) => {
      if (checkedType.length === 0 && checkedCapacity.length === 0) {
        return allCars.price < checkedPrice;
      }
      if (checkedCapacity.length === 0) {
        return checkedType.includes(allCars.category) && allCars.price < checkedPrice;
      }
      if (checkedType.length === 0) {
        return checkedCapacity.includes(allCars.people) && allCars.price < checkedPrice;
      }

      return checkedType.includes(allCars.category) && checkedCapacity.includes(allCars.people) && allCars.price < checkedPrice;
    });
    setAllFilteredCars(filterData);

    return filterData;
  };

  useEffect(() => {
    filterCarTypes(cars);
  }, [checkedCapacity, checkedPrice, checkedType, checkedPickup, checkedDropoff, cars]);

  return (
    <div className="w-full flex">
      <Sidebar filterState={filterState} setFilterState={setFilterState} cars={cars} />
      <div className="p-4 w-full">
        <StatePicker windowSize={windowSize} />
        <div className="flex mt-4 justify-start flex-wrap gap-percentage">
          { allFilteredCars.slice(0, numberOfCars).map((model, index) => (
            <div key={index} className="w-full md:max-w-49 lg:max-w-32 xl:max-w-24 3xl:max-w-19 md:flex-48 lg:flex-31 xl:flex-23 3xl:flex-19">
              <CarCard model={model.carTitle} type={model.type} image={model.image} people={model.people} category={model.category} price={model.price} checkedCapacity={filterState.checkedCapacity} checkedType={filterState.checkedType} checkedPrice={filterState.checkedPrice} />
            </div>
          ))}
          {allFilteredCars.length === 0 ? <p className="text-5xl p-12 m-auto">no cars matching your criterias</p> : null}
        </div>
        <div className="ulul my-16">
          <div className={`${hidden()}`}>
            <Button handleClick={showMoreCars} text="Show more cars" textSize="text-sm" bgColor="bg-btn-blue" color="text-white" margin="mx-auto" />
          </div>
          <div className="lastchild self-center">
            <p className="text-secondinary-light-300 font-jakarta font-bold">{totalCars} cars</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default category;
