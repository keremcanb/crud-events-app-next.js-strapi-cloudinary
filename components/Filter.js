import { useRef } from 'react';
import { Button } from '@/components/index';

const EventsSearch = ({ onSearch }) => {
  const yearRef = useRef();
  const monthRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const selectedYear = yearRef.current.value;
    const selectedMonth = monthRef.current.value;
    onSearch(selectedYear, selectedMonth);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-2">
        <div className="flex flex-row justify-center items-center gap-5">
          <div className="relative">
            <select id="year" ref={yearRef}>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <div className="relative">
            <select id="month" ref={monthRef}>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">Septemer</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <Button text="Filter" />
      </div>
    </form>
  );
};

export default EventsSearch;
