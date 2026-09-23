
const Search = ({ search, setSearch}) => {
  
  return (
    <div>
      <label htmlFor="search">Search</label>
      <input
        type="text"
        placeholder="search movies here..."
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;


