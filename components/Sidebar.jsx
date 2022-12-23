/* eslint-disable import/no-cycle */
import { Slider, Searchbar } from './index';
import { useThemeContext } from '../context/filtersState';

const Sidebar = (props) => {
  const { cars } = props;
  const filters = [
    {
      title: 'Type',
      options: ['Sport', 'SUV', 'MPV', 'Sedan', 'Hackback', 'Coupe', 'family'],
    },
    {
      title: 'Capacity',
      options: [2, 4, 6, 8],
    }];

  const [filterState, setFilterState] = useThemeContext();

  const handleClicked = (e) => {
    const capacityFilter = [...filterState.checkedCapacity];
    const typeFilter = [...filterState.checkedType];
    const inputValue = e.target.value;
    const inputValueType = inputValue.length === 1 ? +inputValue : inputValue;
    const { name } = e.target;
    if (e.target.checked) {
      if (typeof inputValueType === 'number') { setFilterState({ ...filterState, checkedCapacity: [...capacityFilter, inputValueType], checkedInput: { ...filterState.checkedInput, [name]: e.target.checked } }); } else { setFilterState({ ...filterState, checkedType: [...typeFilter, inputValueType], checkedInput: { ...filterState.checkedInput, [name]: e.target.checked } }); }
    } else {
      if (typeof inputValueType === 'number') capacityFilter.splice(filterState.checkedCapacity.indexOf(inputValueType), 1);
      else { typeFilter.splice(filterState.checkedType.indexOf(inputValueType), 1); }
      // eslint-disable-next-line no-unused-expressions
      typeof inputValueType === 'number' ? setFilterState({ ...filterState, checkedCapacity: [...capacityFilter], checkedInput: { ...filterState.checkedInput, [name]: e.target.checked } }) : setFilterState({ ...filterState, checkedType: [...typeFilter], checkedInput: { ...filterState.checkedInput, [name]: e.target.checked } });
    }
  };

  const getNumberOfCarInCategory = (cat) => {
    const numberOfCarInCategory = [];
    let totalNumber = 0;
    cars?.map((car) => {
      if (typeof cat === 'string') {
        if (car.category === cat) return numberOfCarInCategory.push(cars.category);
      } else if (car.people === cat) return numberOfCarInCategory.push(cars.category);

      return numberOfCarInCategory;
    });
    totalNumber = numberOfCarInCategory.length;
    return totalNumber;
  };

  return (
    <div className="static hidden flex-col bg-white-color border-sidebar-border border-2 max-w-[360px] md:flex ">
      <Searchbar />
      {filters.map(({ title, options }) => (
        <div className="container flex-col w-full mt-14" key={title}>
          <div className="text-side-title font-jakarta pl-8 ">
            {title}
          </div>
          {options.map((item, index) => (
            <div className="flex items-center mt-6 " key={index}>
              <input
                name={item}
                id="default-checkbox"
                type="checkbox"
                checked={filterState.checkedInput[item]}
                value={item}
                onChange={(event) => {
                  handleClicked(event);
                }}
                className="ml-8 w-5 h-4 accent-btn-blue text-secondinary-light-300 bg-white rounded-md border-secondinary-light-300 focus:ring-checkbox-checked dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="default-checkbox" className="pl-2 text-lg font-semibold font-jakarta text-input-title dark:text-gray-300">{item}<span className="text-secondinary-light-300 font-medium font-jakarta"> ({getNumberOfCarInCategory(item)})</span></label>
            </div>
          ))}

        </div>
      ))}
      <div className="container flex-col w-full mt-14 mb-10">
        <div className="text-side-title font-medium font-jakarta pl-8 ">
          Price
        </div>
        <div className="App mt-8 px-8">
          <Slider filterState={filterState} setFilterState={setFilterState} />
        </div>
        <div className="pl-8 mt-4 font-jakarta text-input-title font-semibold"> Max ${filterState.checkedPrice}</div>
      </div>
    </div>
  );
};
export default Sidebar;

