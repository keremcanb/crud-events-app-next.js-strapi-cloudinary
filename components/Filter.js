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
      <div className="flex justify-center gap-6 mb-2">
        <select id="year" ref={yearRef}>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
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
        <Button text="Filter" />
      </div>
    </form>
  );
};

export default EventsSearch;
