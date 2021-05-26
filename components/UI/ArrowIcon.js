import { FaAngleDown } from 'react-icons/fa';

const ArrowIcon = () => (
  <div className="flex items-center | pointer-events-none absolute inset-y-0 right-0 text-gray-700">
    <FaAngleDown className="fill-current h-4 w-4" />
  </div>
);

export default ArrowIcon;
