import { useEffect, useState } from "react";
import { MovieServices } from "../../services";
import { useBestMovie } from "../../context/BestMoviesContext";
import { useOption } from "../../context/SelectContext";
import MainTitleArea from "../../components/movies/leftPanel/MainTitleArea";
import MoviesWindowView from "../../components/movies/leftPanel/MoviesWindowView";
import MoviesDetailView from "../../components/movies/leftPanel/MoviesDetailView";
import { Helmet } from "react-helmet";

function TopRated() {
  const [pageId, setPageId] = useState(1);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [movieGenres, setMovieGenres] = useState();
  const [viewToggle, setViewToggle] = useState(true);
  const { setBestMovie } = useBestMovie();
  const { selectedOption } = useOption();

  useEffect(() => {
    let isMounted = true;
    const getMovies = async function (pageId) {
      try {
        const moviesResponse = await MovieServices.getTopRated(pageId);
        const genresResponse = await MovieServices.getMovieGenres();
        if (isMounted) {
          setTopRatedMovies((prevMovies) => [
            ...prevMovies,
            ...moviesResponse?.data?.results,
          ]);
          setMovieGenres(genresResponse?.data?.genres);
        }
      } catch (err) {
        console.error("API isteği hatası:", err);
      }
    };
    getMovies(pageId);
    return () => {
      isMounted = false;
    };
  }, [pageId]);

  if (selectedOption === "1") {
    topRatedMovies.sort((a, b) => b.vote_average - a.vote_average);
  }
  if (selectedOption === "2") {
    topRatedMovies.sort((a, b) => b.popularity - a.popularity);
  }
  if (selectedOption === "3") {
    topRatedMovies.sort((a, b) => b.vote_count - a.vote_count);
  }
  if (selectedOption === "4") {
    topRatedMovies.sort(
      (a, b) => new Date(b.release_date) - new Date(a.release_date),
    );
  }

  useEffect(() => {
    const sortedMovies = [...topRatedMovies];
    setBestMovie(sortedMovies);
  }, [selectedOption, topRatedMovies]);

  //butona tıklandığında bu fonksiyon çalışır ve yeni fimler eklenir.
  const handleMoreMovie = (e) => {
    e.preventDefault();
    setPageId((prevPageId) => prevPageId + 1);
  };

  return (
    <>
      <Helmet>
        {" "}
        <title>En Çok Oy Alan Filmler</title>
      </Helmet>
      <div className="border-b-2 dark:border-cyan-200">
        <MainTitleArea
          title={"En Çok Oylanan Filmler"}
          viewToggle={viewToggle}
          setViewToggle={setViewToggle}
        />
      </div>
      {viewToggle ? (
        <MoviesWindowView movies={topRatedMovies} />
      ) : (
        <MoviesDetailView movies={topRatedMovies} genres={movieGenres} />
      )}

      <div className="mx-auto my-20 text-center">
        <button
          className="w-1/2 rounded-lg bg-red-600 py-1  font-bold text-white hover:bg-red-500"
          onClick={(e) => handleMoreMovie(e)}
        >
          Daha Fazla Yükle
        </button>
      </div>
    </>
  );
}

export default TopRated;
