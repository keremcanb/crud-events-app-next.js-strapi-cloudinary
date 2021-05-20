import { useState } from 'react';
import { useRouter } from 'next/router';

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
    <form onSubmit={handleSubmit}>
      <input type="text" value={term} onChange={handleChange} placeholder="Search events" />
    </form>
  );
};

export default Search;
