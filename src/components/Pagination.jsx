


// return page so that pagination function in the js file reseives that as query param

const Pagination = ({page, totalpages,setPage}) => {
  // pagination(page) calls the func inside tmdb.js  eg : pagination(2) sends this value to query parameter ,
  // pagination(page) will give promise , .then(aftr successfully resolving the promise , returns data .. this returned data is used in .then
  // .then((data) => {
  //        ↑
  //    receives the
  //    returned data
//     useEffect(() => {
//     pagination(page).then((data) => {
//       console.log(data);
//     });
//   }, [page]);


  const increase = () => {
    if (page === totalpages) {
      return;
    } else {
      setPage((prev) => prev + 1);
    }
  };

  const decrease = () => {
    if (page === 1) {
      return;
    } else {
      setPage((prev) => prev - 1);
    }
  };
  return (
    <div>
      <button type="button"  onClick={() => increase()}>
        +
      </button>

      <p>
        {page} of {totalpages}
      </p>
      <button type="button" onClick={() => decrease()}>
        -
      </button>
    </div>
  );
};

export default Pagination;
