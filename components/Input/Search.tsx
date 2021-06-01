import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${searchTerm}`);
    setSearchTerm('');
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form className="relative mt-1" onSubmit={handleSubmit}>
      <input
        type="text"
        id="search"
        value={searchTerm}
        onChange={handleChange}
        className="rounded-xl"
        placeholder="Search..."
      />
      <button
        className="w-7 h-7 top-2 right-2 | text-center text-xl text-gray-400 hover:text-gray-900 | leading-0 block absolute
      transition-colors focus:outline-none"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default Search;
