/* eslint-disable react/prop-types */
import { useState } from 'react';
import { ArrowIcon } from '@/components/index';

const Sort = ({ sort }) => {
  const [sortEvents, setSortEvents] = useState(sort);

  const sortHandler = (e) => {
    const { value } = e.target;
    if (value === 'newest') {
      setSortEvents('ASC');
    }
    if (value === 'oldest') {
      setSortEvents('DESC');
    }
  };

  return (
    <div className="relative w-44 mx-96 mb-4">
      <select name="sort" id="sort" aria-label="Sort news" onChange={sortHandler}>
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>
      <ArrowIcon />
    </div>
  );
};

export default Sort;
