import { useEffect, useRef, useState } from "react";
import { useOption } from "../context/SelectContext";
import { MovieServices } from "../services";
import { useBestMovie } from "../context/BestMoviesContext";
import CategoriesHeroSection from "../components/categories/heroSection";
import WindowViev from "../components/categories/leftPanel/WindowViev";
import BestMovies from "../components/movies/rightPanel/BestMovies";
import SortingTool from "../components/movies/rightPanel/SortingTool";
import SortDates from "../components/categories/rightPanel/SortDates";
import SortGenres from "../components/categories/rightPanel/SortGenres";
import MainTitleArea from "../components/movies/leftPanel/MainTitleArea";
import DetailView from "../components/categories/leftPanel/DetailView";
import SearchBar from "../components/search";
import { useLocation } from "react-router-dom";
function Categories() {
  const { selectedOption } = useOption();
  const { setBestMovie } = useBestMovie();
  const [allMovies, setAllMovies] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState("Tüm Kategoriler");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedDates, setSelectedDates] = useState("Tüm Yıllar");
  const [dateIntervals, setDateIntervals] = useState([]);
  const [viewToggle, setViewToggle] = useState(true);

  console.log(" PAGE CATEGORİES rendered");
  const location = useLocation();

  useEffect(() => {
    const axiosData = async () => {
      try {
        const moviesData = [];
        const genresData = await MovieServices.getMovieGenres();

        for (let index = 1; index <= 10; index++) {
          const [popularData, topRatedData, trendData] = await Promise.all([
            MovieServices.getPopulerMovies(index),
            MovieServices.getTopRated(index),
            MovieServices.getTrendDailyPage(index),
          ]);

          moviesData.push(
            popularData.data?.results,
            topRatedData.data?.results,
            trendData.data?.results,
          );
        }

        const allMovies = moviesData.flat();

        const uniqueMovies = Array.from(
          new Set(allMovies.map((item) => item.id)),
        ).map((id) => allMovies.find((item) => item.id === id));

        setAllMovies(uniqueMovies);
        setMovieGenres(genresData.data?.genres);
        let best = [...uniqueMovies] || [];
        setBestMovie(best);
        setFilteredMovies(uniqueMovies);
      } catch (error) {
        console.error("API isteği hatası:", error);
      }
    };

    if (location.pathname === "/categories") {
      axiosData();
    }
  }, [setBestMovie]);

  useEffect(() => {
    const newDates = [];
    for (let index = 23; index >= 0; index--) {
      if (index === 0) {
        newDates.push({ key: index, value: "2000-2001" });
        newDates.push({ key: index, value: "2000 Öncesi" });
      } else {
        let decade = index < 10 ? "200" : "20";
        let nextDecade = index + 1 < 10 ? "200" : "20";

        newDates.push({
          key: index,
          value: `${decade}${index}-${nextDecade}${index + 1}`,
        });
      }
    }
    setDateIntervals(newDates);
  }, []);

  const handleSelectedDates = (e) => {
    setSelectedDates(e.target.value);
  };
  const [genresTitle, setGenresTitle] = useState();

  const handleSelectedGenres = (e) => {
    setSelectedGenres(e.target.value);

    let selectedTitle =
      e.target.options[e.target.selectedIndex].getAttribute("name");
    setGenresTitle(selectedTitle);
  };

  const titleRef = useRef();

  const handleFilter = () => {
    let filteredMovies = allMovies;

    let title = (genresTitle && genresTitle) || "Tüm Kategoriler";
    titleRef.current.innerText = title;

    if (selectedGenres !== "Tüm Kategoriler") {
      const selectedGenreId = parseInt(selectedGenres);
      filteredMovies = filteredMovies.filter((item) =>
        item.genre_ids.some((genreId) => genreId === selectedGenreId),
      );
    }

    if (selectedDates === "2000 Öncesi") {
      filteredMovies = filteredMovies.filter((item) => {
        const releaseYear = parseInt(item.release_date.substring(0, 4));
        return releaseYear < 2000;
      });
    } else if (selectedDates !== "Tüm Yıllar") {
      const [startYear, endYear] = selectedDates.split("-").map(Number);
      filteredMovies = filteredMovies.filter((item) => {
        const releaseYear = new Date(item.release_date).getFullYear();
        return releaseYear >= startYear && releaseYear < endYear;
      });
    }

    setFilteredMovies(filteredMovies);
  };

  useEffect(() => {
    let best = [...filteredMovies] || [];
    setBestMovie(best);
  }, [filteredMovies, selectedOption]);

  useEffect(() => {
    if (selectedOption === "1") {
      filteredMovies.sort((a, b) => b.vote_average - a.vote_average);
    }
    if (selectedOption === "2") {
      filteredMovies.sort((a, b) => b.popularity - a.popularity);
    }
    if (selectedOption === "3") {
      filteredMovies.sort((a, b) => b.vote_count - a.vote_count);
    }
    if (selectedOption === "4") {
      filteredMovies.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date),
      );
    }
  }, [selectedOption]);

  return (
    <>
      <div className="px-2  xl:px-0">
        <CategoriesHeroSection />
      </div>

      <div className="mx-auto flex  justify-center px-4  py-5 lg:hidden">
        <SearchBar />
      </div>

      <div className="divide flex gap-5 divide-x-2 dark:divide-cyan-200 ">
        {/* movie left panel */}
        <div className=" -mt-4 w-full px-3 lg:mt-10 lg:basis-3/4 lg:px-0 ">
          <div className="block lg:hidden">
            <BestMovies />

            <div className="mt-5 flex flex-col items-center justify-center pb-5 sm:flex-row ">
              <div className="pb-2 pe-0  sm:pb-0 sm:pe-2">
                <SortingTool />
              </div>

              <SortGenres
                selectedGenres={selectedGenres}
                movieGenres={movieGenres}
                handleSelectedGenres={handleSelectedGenres}
              />

              <SortDates
                selectedDates={selectedDates}
                dateIntervals={dateIntervals}
                handleSelectedDates={handleSelectedDates}
              />
              <button
                className="mt-2 rounded-lg border-2 border-sky-200 bg-gradient-to-b from-cyan-400 to-sky-900 px-4 font-semibold text-cyan-200 hover:bg-gradient-to-t hover:from-white hover:to-white dark:from-slate-950 dark:to-sky-900"
                onClick={handleFilter}
              >
                Getir
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border-b-2 dark:border-cyan-200 ">
            <h1
              className=" text-lg font-bold text-sky-900 dark:text-cyan-200 md:text-2xl"
              ref={titleRef}
            >
              Tüm Kategoriler
            </h1>

            <MainTitleArea
              viewToggle={viewToggle}
              setViewToggle={setViewToggle}
            />
          </div>
          {viewToggle ? (
            <div className="mt-4">
              {" "}
              <WindowViev allMovies={filteredMovies} />
            </div>
          ) : (
            <div className="mt-4">
              <DetailView allMovies={filteredMovies} genres={movieGenres} />
            </div>
          )}
        </div>

        {/* movie right panel */}
        <div className="mt-10 hidden flex-col space-y-4 pl-5 lg:block">
          <SortGenres
            selectedGenres={selectedGenres}
            movieGenres={movieGenres}
            handleSelectedGenres={handleSelectedGenres}
          />

          <SortDates
            selectedDates={selectedDates}
            dateIntervals={dateIntervals}
            handleSelectedDates={handleSelectedDates}
          />
          <button
            className="rounded-lg border-2 border-sky-200 bg-gradient-to-b from-cyan-400 to-sky-900 px-4 py-1 font-semibold text-cyan-200 hover:bg-gradient-to-t hover:from-white hover:to-white dark:from-slate-950 dark:to-sky-900"
            onClick={handleFilter}
          >
            Getir
          </button>

          <SortingTool />

          <BestMovies />
        </div>
      </div>
    </>
  );
}

export default Categories;
