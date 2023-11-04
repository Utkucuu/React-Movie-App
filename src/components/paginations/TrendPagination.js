import PrevIcon from "../../assest/icons/PrevIcon";
import NextIcon from "../../assest/icons/NextIcon";

function TrendPagination({ totalPages, currentPage, onPageChange }) {
  console.log("PAGINATIONS TREND PAGI  rendered");
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="mx-auto flex items-center space-x-4">
      <button
        className="rounded-lg border-2 border-cyan-500 bg-gradient-to-l from-cyan-400 to-sky-900 p-1 dark:from-slate-950 dark:to-sky-900"
        onClick={() => {
          handlePageChange(Number(currentPage) - 1);
        }}
        disabled={currentPage === 1}
      >
        <PrevIcon />
      </button>
      <span className="text-lg dark:text-cyan-400">
        {currentPage} / {totalPages}
      </span>
      <button
        className="rounded-lg border-2 border-cyan-500 bg-gradient-to-r from-cyan-400 to-sky-900 p-1 dark:from-slate-950 dark:to-sky-900"
        onClick={() => {
          handlePageChange(Number(currentPage) + 1);
        }}
        disabled={currentPage === totalPages}
      >
        <NextIcon />
      </button>
    </div>
  );
}

export default TrendPagination;
