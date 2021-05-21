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
        id="password"
        value={term}
        onChange={handleChange}
        className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
        placeholder="Search..."
      />
      <button className="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors">
        <FaSearch />
      </button>
    </form>
  );
};

export default Search;
