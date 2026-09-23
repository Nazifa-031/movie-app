


// return page so that pagination function in the js file reseives that as query param
const Pagination = ({page, totalpages,setPage}) => {


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
