import { useState } from 'react';
import { Button, ArrowIcon } from '@/components/index';

const Filter = ({ handleFilter }: { handleFilter: () => {} }) => {
  const [formInput, setFormInput] = useState<{ year: string; month: string }>({ year: '2021', month: '1' });
  const { year, month } = formInput;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFilter(year, month);
  };

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.id]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 | mb-5">
        <div className="flex flex-row place-items-center gap-5">
          <div className="relative">
            <select id="year" value={year} onChange={handleChange}>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </select>
            <ArrowIcon />
          </div>
          <div className="relative">
            <select id="month" value={month} onChange={handleChange}>
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
        <Button color="blue" text="Filter" />
      </div>
    </form>
  );
};

export default Filter;
