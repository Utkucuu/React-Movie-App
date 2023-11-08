import { useEffect, useMemo, useState } from "react";
import { useMovie } from "../../context/SiteContext";
import "./trend.module.css";
import { useGeneratePath } from "../../utils/generatePage";
import TrendPagination from "../../components/paginations/TrendPagination";
import { useLocation, useNavigate } from "react-router-dom";
import { useOption } from "../../context/SelectContext";
import { useBestMovie } from "../../context/BestMoviesContext";
import MainTitleArea from "../../components/movies/leftPanel/MainTitleArea";
import MoviesWindowView from "../../components/movies/leftPanel/MoviesWindowView";
import MoviesDetailView from "../../components/movies/leftPanel/MoviesDetailView";
import { Helmet } from "react-helmet";

function Trend() {
  const { selectedOption } = useOption();

  //Utils klasöründe custom hook olarak useGeneratePath tasarlanmıştır. Bu sayfaya özel pagination çalıştığında route>routes.js içinde önceden ayarlandığı şekilde bir path generate etmek için paginatePath e bir argüman gönderilir.
  const paginatePath = useGeneratePath();

  //Sayfanın günlük trendleri mi yoksa haftalık trendleri mi göstereceği bu toggle üzerinden kontrol edilir.
  const savedToggle = localStorage.getItem("toggle");

  const { setBestMovie } = useBestMovie();

  // Eğer LocalStorage'da kayıtlı bir toggle değeri yoksa, varsayılan olarak true kullanılır
  const [toggle, setToggle] = useState(
    savedToggle === null ? true : savedToggle === "true",
  );

  const [viewToggle, setViewToggle] = useState(true);

  //Loaction SiteContext içinde kontrol edildiği için pathName "...movies/trend" olduğunda istekler otomatik olarak gerçekleştirilir ve dönen sonuçlar state içine gelir.
  const state = useMovie();
  const trendDaily = state.trendDaily?.data?.results || [];
  const trendWeekly = state.trendWeekly?.data?.results || [];
  const movieGenres = state.movieGenres?.data?.genres || [];

  //Toggle durumuna göre gösterilecek veri belirlenir.
  let moviesToShow = toggle ? trendDaily : trendWeekly;

  useEffect(() => {
    setBestMovie(moviesToShow);
  }, [moviesToShow, setBestMovie]);

  // Trend filmler sayfasında olduğumuz için bu sayfada veriler önceden en yüksek oy trendine göre sıralanır. Kullanıcılar isterse sonradan değişiklik yapabilirler.
  moviesToShow.sort((a, b) => b.vote_average - a.vote_average);

  const location = useLocation();
  const pathPart = location.pathname.split("/");

  const [currentPage, setCurrentPage] = useState();
  const totalPages = 500; //Toplam sayfa sayısı

  // Sayfa değiştiğinde sayfanın numarasına göre paginatePath yeni bir sayfa oluşturur SiteContext içinde location değişikliği algılanır ve yeni API istekleri ilgili pageId url içinden çekilerek gerçekleştirilir.
  //setCurrentPage yeni sayfa numarasıyla güncellenir.
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    paginatePath(newPage);

    window.scrollTo(0, 520); // Sayfa yüklenirken en üstüne gitmek için
  };
  //...movies/trend/page/2 eğer bir pageId yani sayfa numarası yoksa sayfa numarası 1 demektir ve pagination için bu sağlanır.
  const navigate = useNavigate();
  useEffect(() => {
    setCurrentPage(pathPart[4] ? pathPart[4] : 1);
  }, [location]);

  function showMoviesDaily() {
    setToggle(true);
    localStorage.setItem("toggle", "true");
    // toggle değiştiğinde günlük trendler filmler ilk sayfadan açılır
    setCurrentPage(1);
    navigate("");
  }

  function showMoviesWeekly() {
    setToggle(false);
    localStorage.setItem("toggle", "false");
    // toggle değiştiğinde haftalık trend filmler ilk sayfadan açılır
    setCurrentPage(1);
    navigate("");
  }

  //tek sayfalık veri gösterildiği için useMemo ile optimize edilmeye uygun.
  useMemo(() => {
    if (selectedOption === "1") {
      moviesToShow.sort((a, b) => b.vote_average - a.vote_average);
    }
    if (selectedOption === "2") {
      moviesToShow.sort((a, b) => b.popularity - a.popularity);
    }

    if (selectedOption === "3") {
      moviesToShow.sort((a, b) => b.vote_count - a.vote_count);
    }
    if (selectedOption === "4") {
      moviesToShow.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date),
      );
    }
  }, [selectedOption, toggle, moviesToShow]);

  return (
    <>
      <Helmet>
        {" "}
        <title>Trend Filmler</title>
      </Helmet>
      <div className="border-b-2 dark:border-cyan-200">
        <MainTitleArea
          title={"Trend Filmler"}
          showMoviesDaily={showMoviesDaily}
          showMoviesWeekly={showMoviesWeekly}
          toggle={toggle}
          setViewToggle={setViewToggle}
          viewToggle={viewToggle}
        />
      </div>

      {viewToggle ? (
        <MoviesWindowView movies={moviesToShow} />
      ) : (
        <MoviesDetailView movies={moviesToShow} genres={movieGenres} />
      )}

      <div className="my-10 flex flex-col text-center">
        {/* Sayfa içeriği */}
        <h1>Sayfa {currentPage}</h1>

        {/* Sayfalama bileşeni */}
        <TrendPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default Trend;
