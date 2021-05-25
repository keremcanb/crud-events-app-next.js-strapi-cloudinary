import { FaAngleDown } from 'react-icons/fa';

const ArrowIcon = () => (
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
    <FaAngleDown className="fill-current h-4 w-4" />
  </div>
);

export default ArrowIcon;
