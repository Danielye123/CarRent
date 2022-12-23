import { useState, useContext, createContext } from 'react';
import { useEffect } from 'react/cjs/react.production.min';

// create context
const Context = createContext({});

export const StateFilterProvider = ({ children }) => {
  const [windowSize, setWindowSize] = useState(undefined);

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

  return (
    <Context.Provider value={[width, setWidth]}>{children}</Context.Provider>
  );
};

export function useThemeContext() {
  return useContext(Context);
}
