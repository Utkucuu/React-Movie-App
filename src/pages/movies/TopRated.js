import { useEffect, useState } from "react";
import { MovieServices } from "../../services";
import { useBestMovie } from "../../context/BestMoviesContext";
import { useOption } from "../../context/SelectContext";
import MainTitleArea from "../../components/movies/leftPanel/MainTitleArea";
import MoviesWindowView from "../../components/movies/leftPanel/MoviesWindowView";
import MoviesDetailView from "../../components/movies/leftPanel/MoviesDetailView";

function TopRated() {
  console.log("MOVIES TO PRATED PAGE rendered");

  const [pageId, setPageId] = useState(1);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [movieGenres, setMovieGenres] = useState();
  const [viewToggle, setViewToggle] = useState(true);
  const { setBestMovie } = useBestMovie();
  const { selectedOption } = useOption();

  // Verileri almak için ayrı bir hook kullanın
  useEffect(() => {
    let isMounted = true; // Componentin bağlı olup olmadığını kontrol etmek için
    const getMovies = async function (pageId) {
      try {
        // En çok oylanan filmleri alın
        const moviesResponse = await MovieServices.getTopRated(pageId);
        // Film türlerini alın
        const genresResponse = await MovieServices.getMovieGenres();
        // Component hala bağlıysa, durumları güncelleyin
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
      isMounted = false; // Componentin bağlı olmadığını belirtmek için
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

  const handleMoreMovie = (e) => {
    e.preventDefault();
    setPageId((prevPageId) => prevPageId + 1);
  };

  return (
    <>
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
