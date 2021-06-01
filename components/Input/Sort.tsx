const Sort = ({ sorting }) => {
  const sortHandler = (e) => {
    const { value } = e.target;
    if (value === 'newest') {
      sorting('date:ASC');
    }
    if (value === 'newest') {
      sorting('date:DESC');
    }
  };

  return (
    <div className="mb-5 w-40">
      <select name="sort" id="sort" aria-label="Sort news" value={sorting} onChange={sortHandler}>
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </div>
  );
};

export default Sort;
