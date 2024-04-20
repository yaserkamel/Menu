import ReactPaginate from "react-paginate";



const Pagination = ({ pageCount, onPress }) => {
  const handlePageClick = (data) => {
    onPress(data.selected + 1);
  };
  

  return (
    <ReactPaginate
      breakLabel=""
      nextLabel='🡪'
      onPageChange={handlePageClick}
      marginPagesDisplayed={0}
      pageRangeDisplayed={0}
      pageCount={pageCount}
      previousLabel="🡨"
      containerClassName={"pagination justify-content-center align-items-center mt-5"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      nextClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
    />
  );
};

export default Pagination;
