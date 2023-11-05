import { useEffect, useState } from "react";
import { MovieServices } from "../../services";
import { useOption } from "../../context/SelectContext";
import { useBestMovie } from "../../context/BestMoviesContext";
import MainTitleArea from "../../components/movies/leftPanel/MainTitleArea";
import MoviesWindowView from "../../components/movies/leftPanel/MoviesWindowView";
import MoviesDetailView from "../../components/movies/leftPanel/MoviesDetailView";
import LoadingAnimate from "../../components/loadingAnimate";
function Populer() {
  const { selectedOption } = useOption();

  const [populerMovies, setPopulerMovies] = useState([]);

  const [pageId, setpageId] = useState(1);

  const [viewToggle, setViewToggle] = useState(true);

  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const [scrollState, setScrollState] = useState(0);

  const { setBestMovie } = useBestMovie();

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    setScrollState(scrollY);
  });
  const [movieGenres, setMovieGenres] = useState();

  useEffect(() => {
    let isMounted = true;
    const getMovies = async function (pageId) {
      try {
        const moviesResponse = await MovieServices.getPopulerMovies(pageId);

        const genresResponse = await MovieServices.getMovieGenres();

        if (isMounted) {
          const uniqueMovieIds = new Set(
            populerMovies.map((movie) => movie.id),
          );

          const newMovies = moviesResponse?.data?.results.filter(
            (movie) => !uniqueMovieIds.has(movie.id),
          );

          setPopulerMovies((prevMovies) => [...prevMovies, ...newMovies]);
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

  useEffect(() => {
    if (scrollState + 1 + windowHeight >= documentHeight) {
      setTimeout(() => {
        setpageId((prevPageId) => prevPageId + 1);

        window.scrollTo(0, scrollState - 400);
      }, 500);
    }
  }, [scrollState, pageId]);

  useEffect(() => {
    if (selectedOption === "1") {
      populerMovies.sort((a, b) => b.vote_average - a.vote_average);
    }
    if (selectedOption === "2") {
      populerMovies.sort((a, b) => b.popularity - a.popularity);
    }

    if (selectedOption === "3") {
      populerMovies.sort((a, b) => b.vote_count - a.vote_count);
    }
    if (selectedOption === "4") {
      populerMovies.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date),
      );
    }
  }, [selectedOption]);

  useEffect(() => {
    const sortedMovies = [...populerMovies];
    setBestMovie(sortedMovies);
  }, [selectedOption, populerMovies]);

  return (
    <>
      <div className="border-spacing-16 border-b-2 dark:border-cyan-200">
        {" "}
        <MainTitleArea
          title={"Popüler Filmler"}
          viewToggle={viewToggle}
          setViewToggle={setViewToggle}
        />
      </div>

      <div>
        {viewToggle ? (
          <MoviesWindowView movies={populerMovies} />
        ) : (
          <MoviesDetailView movies={populerMovies} genres={movieGenres} />
        )}
      </div>

      <div className="my-10">
        <LoadingAnimate
          gradientId="myGradient222"
          color1={"#B1E3FC"}
          color2={"#22D1EE"}
          colorText={"text-sky-400"}
        />
      </div>
    </>
  );
}

export default Populer;
