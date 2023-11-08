import { useEffect, useState } from "react";
import { useGeneratePath } from "../../utils/generatePage";
import PrevIcon from "../../assest/icons/PrevIcon";
import NextIcon from "../../assest/icons/NextIcon";
import { useLocation } from "react-router-dom";
function Pagination() {
  const paginatePath = useGeneratePath();
  //   const itemsPerPage = 7;  Her sayfada görüntülenen öğe sayısı
  const totalPages = Math.ceil(20); // Toplam sayfa sayısı
  const [currentPage, setCurrentPage] = useState(1);

  // tıklanılan sayfanın numarasına göre paginatePath e burada da bir argüman gönderilir ve yine route>routes.js deki kurguya göre bir path generate adilir. SiteContext içindeki location değişikliği algılanır ve url yani pathname içinden tıklanılan pagination'un numarası pageId olarak yakalanır. Bu doğrultuda yeni API istekleri gerçekleştirilerek Pages>Upcoming.js içindeki veriler güncellenir.
  //currentPage state'i tıklanılan pagination içindeki sayının ya da numaranın değerini alır.
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      paginatePath(newPage);
      window.scrollTo(0, 520); // Sayfa yüklenirken en üstüne gitmek için
    }
  };

  // Urlde sayfa numarası belirmezse pagination otomatik olarak 1. sayfayı active eder, eğer sayfa numarası varsa ve sayfa yenilenirse pagination'un 1. sayfayı render etmemesi ve bulunulan sayfada çalışmaya devam etmesi için location yardımıyla pathname içindeki alınarak currentPage state'i bu pageId ile active edilir.
  const location = useLocation();
  const pathPart = location.pathname.split("/");
  useEffect(() => {
    setCurrentPage(pathPart[4] ? Number(pathPart[4]) : 1);
  }, [location]);

  // Bu fonksiyon sayfa render olduğunda pagination'ı oluşturur.
  const renderPageNumbers = () => {
    const pageNumbers = [];
    //Yukarıda totalPages değerini 20 olarak belirlemiştik
    //math.min(a,b,c) değerlerini birbirleri ile karşılaştırıp en küçük olanı sonuç olarak dönen bir fonksiyondur. 1, 2, 3'ü her zaman görünen numaralar olarak eklemek için for döngüsü içinde bu mantıkta kullanılır. küçük eşit (<=) operatörü ile 3 dahil olur.
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

    //bulunulan sayfanın değeri 5 ten büyük veya 5 e eşitse ... (üç nokta) eklenir
    if (currentPage >= 5) {
      pageNumbers.push(
        <span key="left-ellipsis" className="mx-2 dark:text-cyan-100">
          ...
        </span>,
      );
    }

    //Bu for döngüsü içinde i Math.max() fonksiyonu içinde i =(parantez içindeki en büyük değer) şeklinde i en az 4 ya da bulunulan sayfanın sayısal değeri -1 değerini alır ve döngü başlar. sınır değer Math.min() ile belirtildiği için i=4 ile başlarsa gösterilecek pagination değerleri;
    /*
    currentPage=4 ise en fazla 5 ve 6 olabilir sonrasında ... gelecek.

    currentPage= 7 ise Math.max() içinden i = 6 şeklinde döngü başlayacak çünkü en büyük değer currentPage-1 den gelecek. 
    yukarıdaki if koşulu çalışacak 3. pagination'dan sonra 3 nokta eklenecek.
     math.min() içinden sırayla 8 ve 9 değerleri eklenecek döngü son bulacak. 
    */
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

    //Bulunulan sayfa 19. sayfanın numarasından küçükse pageNumbers' 3 nokta eklenir.
    if (currentPage + 3 <= totalPages - 1) {
      pageNumbers.push(
        <span key="right-ellipsis" className="mx-2 dark:text-cyan-100">
          ...
        </span>,
      );
    }

    //totalPage değeri 3 ten büyük olduğu sürece son sayfanın numarası gösterilir.
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
