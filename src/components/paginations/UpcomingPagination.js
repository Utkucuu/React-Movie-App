import { useEffect, useState } from "react";
import { useGeneratePath } from "../../utils/generatePage";
import PrevIcon from "../../assest/icons/PrevIcon";
import NextIcon from "../../assest/icons/NextIcon";
import { useLocation } from "react-router-dom";
function Pagination() {
  console.log("PAGINATINONS UPCOMING PAGI rendered");
  const paginatePath = useGeneratePath();
  //   const itemsPerPage = 7;  Her sayfada görüntülenen öğe sayısı
  const totalPages = Math.ceil(20); // Toplam sayfa sayısı
  const [currentPage, setCurrentPage] = useState(1);

  // Sayfa değiştirme işlevi
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      paginatePath(newPage);
      window.scrollTo(0, 520); // Sayfa yüklenirken en üstüne gitmek için
    }
  };

  // urlde sayfa numarası belirmezse pagination otomatik olarak 1 i active eder, eğer sayfa numarası varsa ve sayfa yenilenirse pagination unun 1 i aktif etmemesi ve bulunulan sayfada çalışmaya devam etmesi için location yardımıyla sayfa numarası alınarak currentPage state ti bu numara ile actice edilir.
  const location = useLocation();
  const pathPart = location.pathname.split("/");

  useEffect(() => {
    setCurrentPage(pathPart[4] ? Number(pathPart[4]) : 1);
  }, [location]);

  // Sayfa numaralarını oluşturun
  const renderPageNumbers = () => {
    const pageNumbers = [];

    // 1, 2, 3'ü her zaman görünen numaralar olarak ekle
    for (let i = 1; i <= Math.min(totalPages, 3); i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`cursor-pointer rounded-md border-2 border-sky-200 bg-gradient-to-b px-2 
          py-1 font-bold ${
            i === currentPage
              ? "bg-sky-900 text-white dark:bg-white dark:text-sky-900"
              : " from-cyan-400 to-sky-900 text-sky-100 dark:from-slate-950 dark:to-sky-900"
          } `}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </span>,
      );
    }

    // ... ekleyin
    if (currentPage >= 5) {
      pageNumbers.push(
        <span key="left-ellipsis" className="mx-2 dark:text-cyan-100">
          ...
        </span>,
      );
    }

    // Diğer sayfa numaralarını ekleyin
    for (
      let i = Math.max(4, currentPage - 1);
      i <= Math.min(currentPage + 2, totalPages - 1);
      i++
    ) {
      pageNumbers.push(
        <span
          key={i}
          className={`cursor-pointer rounded-md border-2 border-sky-200 bg-gradient-to-b px-2 
          py-1 font-bold ${
            i === currentPage
              ? "bg-sky-900 text-white dark:bg-white dark:text-sky-900"
              : " from-cyan-400 to-sky-900 text-sky-100 dark:from-slate-950 dark:to-sky-900"
          } `}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </span>,
      );
    }

    // ... ekleyin
    if (currentPage + 3 <= totalPages - 1) {
      pageNumbers.push(
        <span key="right-ellipsis" className="mx-2 dark:text-cyan-100">
          ...
        </span>,
      );
    }

    // 500'ü her zaman görünen numara olarak ekle
    if (totalPages > 3) {
      pageNumbers.push(
        <span
          key={totalPages}
          className={`cursor-pointer rounded-md border-2 border-sky-200 bg-gradient-to-b px-2 
          py-1 font-bold ${
            totalPages === currentPage
              ? "bg-sky-900 text-white dark:bg-white dark:text-sky-900"
              : " from-cyan-400 to-sky-900 text-sky-100 dark:from-slate-950 dark:to-sky-900"
          } `}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </span>,
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination mx-auto my-20 flex items-center justify-center">
      <button
        className={`mr-2 rounded-lg border-2 border-cyan-100 bg-gradient-to-l from-cyan-400 to-sky-900  p-1 dark:from-slate-950 dark:to-sky-900 ${
          currentPage === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <PrevIcon />
      </button>
      {renderPageNumbers()}
      <button
        className={`ms-2 rounded-lg border-2 border-cyan-100 bg-gradient-to-r from-cyan-400 to-sky-900 p-1  dark:from-slate-950 dark:to-sky-900 ${
          currentPage === totalPages
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer"
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <NextIcon />
      </button>
    </div>
  );
}

export default Pagination;
