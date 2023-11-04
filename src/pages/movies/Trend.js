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
import LoadingAnimate from "../../components/loadingAnimate";
// import LoadingAnimate from "../../components/loadingAnimate";
function Trend() {
  const { selectedOption } = useOption();

  const paginatePath = useGeneratePath();

  const savedToggle = localStorage.getItem("toggle");

  const { setBestMovie } = useBestMovie();

  // Eğer LocalStorage'da kayıtlı bir toggle değeri yoksa, varsayılan olarak true kullanın
  const [toggle, setToggle] = useState(
    savedToggle === null ? true : savedToggle === "true",
  );

  const [viewToggle, setViewToggle] = useState(true);

  const state = useMovie();

  const trendDaily = state.trendDaily?.data?.results || [];

  const trendWeekly = state.trendWeekly?.data?.results || [];

  const movieGenres = state.movieGenres?.data?.genres || [];

  let moviesToShow = toggle ? trendDaily : trendWeekly;

  useEffect(() => {
    setBestMovie(moviesToShow);
  }, [moviesToShow, setBestMovie]);

  moviesToShow.sort((a, b) => b.vote_average - a.vote_average);

  const location = useLocation();
  const pathPart = location.pathname.split("/");

  const [currentPage, setCurrentPage] = useState();
  const totalPages = 500; // state?.trendDaily?.data.total_pages; // Toplam sayfa sayısı

  // Sayfa değiştiğinde yapılacak işlemleri burada gerçekleştirebilirsiniz.
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    paginatePath(newPage);

    window.scrollTo(0, 520); // Sayfa yüklenirken en üstüne gitmek için
  };

  const navigate = useNavigate();
  useEffect(() => {
    setCurrentPage(pathPart[4] ? pathPart[4] : 1);
  }, [location]);

  function showMoviesDaily() {
    // Toggle'ı true olarak ayarlayın ve LocalStorage'a kaydedin
    setToggle(true);
    localStorage.setItem("toggle", "true");
    setCurrentPage(1);
    navigate(""); // toggle değiştiğinde günlük trendler filmler ilk sayfadan açılır
  }

  function showMoviesWeekly() {
    // Toggle'ı false olarak ayarlayın ve LocalStorage'a kaydedin
    setToggle(false);
    localStorage.setItem("toggle", "false");
    setCurrentPage(1);
    navigate(""); // toggle değiştiğinde haftalık trend filmler ilk sayfadan açılır
  }

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
          // setSelectedOption={setSelectedOption}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default Trend;
