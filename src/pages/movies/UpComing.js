import { useEffect, useState } from "react";
import { useMovie } from "../../context/SiteContext";

import UpcomingPagination from "../../components/paginations/UpcomingPagination";
import { useOption } from "../../context/SelectContext";
import { useBestMovie } from "../../context/BestMoviesContext";
import MainTitleArea from "../../components/movies/leftPanel/MainTitleArea";
import MoviesWindowView from "../../components/movies/leftPanel/MoviesWindowView";
import MoviesDetailView from "../../components/movies/leftPanel/MoviesDetailView";
import { Helmet } from "react-helmet";

function Upcoming() {
  const state = useMovie();

  const { selectedOption } = useOption();

  const { setBestMovie } = useBestMovie();

  const upComingMovies = state?.upComingPage?.data?.results || [];

  const movieGenres = state?.movieGenres?.data?.genres || [];

  const [viewToggle, setViewToggle] = useState(true);

  useEffect(() => {
    let best = [...upComingMovies]; // Dizi referansını kopyala

    if (selectedOption === "1") {
      upComingMovies.sort((a, b) => b.vote_average - a.vote_average);
    } else if (selectedOption === "2") {
      upComingMovies.sort((a, b) => b.popularity - a.popularity);
    } else if (selectedOption === "3") {
      upComingMovies.sort((a, b) => b.vote_count - a.vote_count);
    } else if (selectedOption === "4") {
      upComingMovies.sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime(),
      );
    }

    setBestMovie(best);
  }, [selectedOption, setBestMovie, upComingMovies]);

  return (
    <>
      <Helmet>
        {" "}
        <title>Yakında </title>
      </Helmet>
      <div className="border-b-2 dark:border-cyan-200">
        <MainTitleArea
          title={"Yakında"}
          viewToggle={viewToggle}
          setViewToggle={setViewToggle}
        />
      </div>
      {viewToggle ? (
        <MoviesWindowView movies={upComingMovies} />
      ) : (
        <MoviesDetailView movies={upComingMovies} genres={movieGenres} />
      )}

      <div>
        <UpcomingPagination />
      </div>
    </>
  );
}

export default Upcoming;
