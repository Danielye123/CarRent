import { useEffect, useState } from 'react';

import { useThemeContext } from '../context/filtersState';
// eslint-disable-next-line import/no-cycle
import { Picker, InversePicker } from './index.js';

const StatePicker = ({ windowSize }) => {
  const [filterState, setFilterState] = useThemeContext();

  const [pickupValue, setPickupValue] = useState({
    location: '',
    date: '',
    time: '',
  });

  const [dropoffValue, setDropoffValue] = useState({
    location: '',
    date: '',
    time: '',
  });

  const [isFocus, setIsFocus] = useState(false);

  const handleInverse = () => {
    setPickupValue(dropoffValue);
    setDropoffValue(pickupValue);
  };

  const handleDateError = () => {
    if (dropoffValue.date !== '' && !isFocus) {
      if (pickupValue.date > dropoffValue.date) {
        return (
          <p className="text-center text-error-default margin-auto">Alert: pickup date must be before dropoff date.</p>
        );
      }
    }
  };

  useEffect(() => {
    setFilterState({
      ...filterState,
      checkedPickup: pickupValue,
      checkedDropoff: dropoffValue,
    });
  }, [pickupValue, dropoffValue]);

  return (
    <>
      <div className="pickers w-full flex gap-y-4 flex-wrap justify-between relative">
        <div className="flex relative w-full md:w-49%">
          <div className="w-full"><Picker windowSize={windowSize} isPickup setPickupValue={setPickupValue} pickupValue={pickupValue} setIsFocus={setIsFocus} /></div>
        </div>
        <InversePicker handleInverse={handleInverse} />
        <div className="flex relative w-full md:w-49%">
          <div className="w-full"><Picker windowSize={windowSize} setIsFocus={setIsFocus} isPickup={false} setDropoffValue={setDropoffValue} dropoffValue={dropoffValue} /></div>
        </div>
      </div>
      <div className="m-t-1%">{handleDateError()}</div>
    </>
  );
};

export default StatePicker;
