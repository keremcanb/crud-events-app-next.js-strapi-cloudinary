import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const [term, termSet] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    termSet('');
  };

  const handleChange = (e) => {
    termSet(e.target.value);
  };

  return (
    <form className="relative mt-1" onSubmit={handleSubmit}>
      <input
        type="text"
        id="search"
        value={term}
        onChange={handleChange}
        className="rounded-xl"
        placeholder="Search..."
      />
      <button className="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors">
        <FaSearch />
      </button>
    </form>
  );
};

export default Search;
