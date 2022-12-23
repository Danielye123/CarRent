import ReactSlider from 'react-slider';

const Slider = ({ filterState, setFilterState }) => {
  const handleChange = (value) => {
    setFilterState({ ...filterState, checkedPrice: (value) });
  };

  return (
    <ReactSlider
      value={filterState.checkedPrice}
      onChange={handleChange}
      min={50}
      max={120}
      className="horizontal-slider"
      thumbClassName="example-thumb"
      trackClassName="example-track"
    />
  );
};

export default Slider;
