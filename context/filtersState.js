import { useState, useContext, createContext } from 'react';

// create context
const Context = createContext({});

export const StateFilterProvider = ({ children }) => {
  const [filterState, setFilterState] = useState({
    checkedCapacity: [],
    checkedPrice: 120,
    checkedType: [],
    checkedInput: { Sport: false, SUV: false, MPV: false, Sedan: false, Hackback: false, Coupe: false, 2: false, 4: false, 8: false, 6: false },
    checkedPickup: { location: '', date: '', time: '' },
    checkedDropoff: { location: '', date: '', time: '' },
  });
  return (
    <Context.Provider value={[filterState, setFilterState]}>{children}</Context.Provider>
  );
};

export function useThemeContext() {
  return useContext(Context);
}
