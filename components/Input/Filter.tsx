import { useState } from 'react';
import { Button, ArrowIcon } from '@/components/index';

const Filter = ({ onSearch }: { onSearch?: any }) => {
  const [year, setYear] = useState('2021');
  const [month, setMonth] = useState('1');

  const submitHandler = (e) => {
    e.preventDefault();
    onSearch(year, month);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 | mb-2">
        <div className="flex flex-row place-items-center gap-5">
          <div className="relative">
            <select id="year" value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </select>
            <ArrowIcon />
          </div>
          <div className="relative">
            <select id="month" value={month} onChange={(e) => setMonth(e.target.value)}>
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
            <ArrowIcon />
          </div>
        </div>
        <Button text="Filter" />
      </div>
    </form>
  );
};

export default Filter;
