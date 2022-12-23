/* eslint-disable no-param-reassign */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useRef, useState } from 'react';

const CustomInput = ({ reference, mobile, desktop, handlePlaceholder, handlePlaceholderBlur, handleInputChange, isPickup, pickupValue, dropoffValue, isMobile, title, name, type, handleFocusDateInput, handleOutFocusDateInput }) => (
  <div className="w-full">
    <p className="font-bold xs-mobile:text-[10px]">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
    <div className="flex items-center cursor-pointer mt-2">
      <input
        ref={reference}
        placeholder={isMobile ? mobile : desktop}
        onFocus={type === 'date' ? () => handleFocusDateInput() : () => handlePlaceholder(reference)}
        onBlur={type === 'date' ? () => handleOutFocusDateInput() : () => handlePlaceholderBlur(reference)}
        name={name}
        type={type}
        value={isPickup ? pickupValue[title].replaceAll('"', '') : dropoffValue[title].replaceAll('"', '')}
        onChange={handleInputChange}
        className="text-secondinary-light-300 text-xs xs-mobile:text-[10px] md:text-sm font-normal font-jakarta w-full h-6"
      />
      <FontAwesomeIcon icon={faChevronDown} className="w-3" />
    </div>
  </div>
);

const Picker = ({ isPickup, pickupValue, setPickupValue, setDropoffValue, dropoffValue, setIsFocus }) => {
  const [isMobile] = useState(true);

  const inputValueCity = useRef(null);
  const inputValueTime = useRef(null);
  const inputValueDate = useRef(null);

  const handleInputChange = (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;
    return isPickup ? setPickupValue({ ...pickupValue, [name]: value }) : setDropoffValue({ ...dropoffValue, [name]: value });
  };

  const handleFocusDateInput = () => {
    setIsFocus(true);
  };

  const handleOutFocusDateInput = () => {
    setIsFocus(false);
  };

  const handlePlaceholder = (inputRef) => {
    inputRef.current.placeholder = '';
  };

  const handlePlaceholderBlur = (inputRef, name) => {
    inputRef.current.placeholder = name;
  };

  return (
    <div className="flex flex-col bg-white rounded-lg p-5">
      <div className="flex items-center mb-6">
        <span className={`rounded-full w-3 h-3 ${isPickup ? 'bg-btn-blue' : 'bg-drop-off'} mr-4 ml-1 ${isPickup ? 'shadow-dot-shadow' : 'shadow-drop-off-shad'}`} />
        <h4 className="font-jakarta font-semibold">{isPickup ? 'Pick-Up' : 'Drop-Off'}</h4>
      </div>
      <div className="flex justify-between">

        <CustomInput name="location" title="location" reference={inputValueCity} mobile="City" desktop="Select your city" handlePlaceholder={() => handlePlaceholder(inputValueCity)} handlePlaceholderBlur={() => handlePlaceholderBlur(inputValueCity, 'City')} handleInputChange={handleInputChange} isPickup={isPickup} pickupValue={pickupValue} dropoffValue={dropoffValue} isMobile={isMobile} type="text" />

        <div className="border-r border-picker m-0-5% xs-mobile:m-0-3% lg:m-0-10%" />

        <CustomInput name="date" title="date" reference={inputValueDate} mobile="Date" desktop="Select your date" handlePlaceholder={() => handleFocusDateInput(inputValueDate)} handleOutFocusDateInput={handleOutFocusDateInput} handleFocusDateInput={() => handleFocusDateInput(inputValueDate, 'Date')} handleInputChange={handleInputChange} isPickup={isPickup} pickupValue={pickupValue} dropoffValue={dropoffValue} isMobile={isMobile} type="date" />

        <div className="border-r border-picker m-0-5% xs-mobile:m-0-3% lg:m-0-10%" />

        <CustomInput name="time" title="time" reference={inputValueTime} mobile="Time" desktop="Select your time" handlePlaceholder={() => handlePlaceholder(inputValueTime)} handlePlaceholderBlur={() => handlePlaceholderBlur(inputValueTime, 'Time')} handleInputChange={handleInputChange} isPickup={isPickup} pickupValue={pickupValue} dropoffValue={dropoffValue} isMobile={isMobile} type="text" />

      </div>
    </div>

  );
};

export default Picker;
