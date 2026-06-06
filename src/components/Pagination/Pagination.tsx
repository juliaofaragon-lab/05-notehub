import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface SelectedPage {
  selected: number;
}

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
  const handlePageChange = ({ selected }: SelectedPage) => {
    onChange(selected + 1);
  };

  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={page - 1}
      onPageChange={handlePageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      previousLabel="Previous"
      nextLabel="Next"
      breakLabel="..."
      containerClassName={css.pagination}
      activeClassName={css.active}
      disabledClassName={css.disabled}
    />
  );
};

export default Pagination;
