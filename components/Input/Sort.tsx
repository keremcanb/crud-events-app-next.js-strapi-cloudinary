/* eslint-disable react/prop-types */
import { useState } from 'react';

const Sort = ({ asc, desc }) => {
  const [sort, setSort] = useState([asc]);

  const sortHandler = (e) => {
    const { value } = e.target;
    if (value === 'newest') {
      setSort(asc);
    }
    if (value === 'oldest') {
      setSort(desc);
    }
  };

  return (
    <div className="flex items-center justify-center mx-80 mb-5">
      <select name="sort" id="sort" aria-label="Sort news" onChange={sortHandler}>
        <option>Select</option>
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </div>
  );
};

export default Sort;
