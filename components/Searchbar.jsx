import { useState } from 'react';
import Image from 'next/image';

import searchIcon from '../assets/icons8-search.svg';

const Searchbar = () => {
  const [input, setInput] = useState('');

  const handleInputSearch = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="container flex flex-col ">
      <div className="text-side-title font-jakarta pl-8 pt-10">
        Search
      </div>
      <div className="items-center px-4 flex justify-center pt-7">
        <div className=" relative mr-3">
          <div className="absolute top-3 left-3 items-center">
            <Image src={searchIcon} width={20} height={20} alt="searchicon" />
          </div>
          <input
            type="text"
            value={input}
            className="block p-2 pl-10 font-jakarta text-gray-900 bg-white rounded-full border border-search-border w-283"
            placeholder="Search by brand or title"
            onChange={handleInputSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default Searchbar;

