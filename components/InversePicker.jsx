import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

const InversePicker = ({ handleInverse }) => (
  <div onClick={handleInverse} className="flex bg-btn-blue rounded-md h-12 xl:h-14 2xl:h-16 w-12 xl:w-14 2xl:w-16 items-center cursor-pointer justify-center m-auto absolute inset-0 z-50">
    <FontAwesomeIcon icon={faArrowsRotate} color="white" className="h-6" />
  </div>
);

export default InversePicker;
