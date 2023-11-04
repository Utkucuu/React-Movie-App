import { memo, useMemo, useState } from "react";
import SearchIcon from "../../assest/icons/SearchIcon";
import { MovieServices } from "../../services";
import { useHandleMovieClick } from "../../utils/navigateDetail";
function SearchBar() {
  const [allMovies, setAllMovies] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [searchAreaToggle, setSearchAreaToggle] = useState(false);

  const handleMovieClick = useHandleMovieClick();

  useMemo(() => {
    const axiosData = async () => {
      try {
        const moviesData = [];

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
      } catch (error) {
        console.error("API isteği hatası:", error);
      }
    };

    axiosData();
  }, []);

  let filtered =
    (filterText &&
      allMovies.filter((element) => {
        return (
          element.original_title
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase()) ||
          element.title
            .toString()
            .toLowerCase()
            .includes(filterText.toLocaleLowerCase())
        );
      })) ||
    [];

  const handleToggleChange = (e) => {
    e.target.value ? setSearchAreaToggle(true) : setSearchAreaToggle(false);
  };

  return (
    <div className="relative mr-0 flex w-100 items-center justify-center lg:mr-24 lg:max-w-none lg:justify-end">
      <input
        className="w-full rounded-lg bg-white px-4 caret-sky-900 outline-none duration-500 focus:placeholder-transparent focus:ring-1  focus:ring-cyan-200 lg:w-56 lg:focus:w-80"
        placeholder="Film ara..."
        maxLength={20}
        value={filterText}
        onBlur={() => {
          setTimeout(() => {
            setSearchAreaToggle(false);
          }, 300);
        }}
        onChange={(e) => {
          setFilterText(e.target.value);
          handleToggleChange(e);
        }}
      />{" "}
      <button className="absolute right-3 border-l-2 border-sky-900 border-opacity-30 text-sky-900">
        <SearchIcon />
      </button>
      <div
        className={`absolute top-6 z-50 max-h-60 w-full overflow-x-auto rounded-lg bg-white dark:bg-black ${
          searchAreaToggle ? "block " : "hidden"
        }`}
      >
        {filtered.length > 0 ? (
          filtered.map((movie) => (
            <div
              className="mx-auto w-full border border-cyan-200 p-2 shadow hover:cursor-pointer hover:bg-cyan-50"
              onClick={() => {
                handleMovieClick(movie.id, movie.title);
                setFilterText(" ");
              }}
            >
              <div className="flex animate-pulse space-x-4">
                <div className="h-12 w-12 rounded-full bg-cyan-100 ring-1 ">
                  <img
                    className="h-full w-full rounded-full object-cover p-[2px]"
                    src={process.env.REACT_APP_API_IMG_2 + movie.poster_path}
                    loading="lazy"
                    alt={movie.title}
                  />
                </div>

                <div className="flex-1 text-sky-900 dark:text-sky-200">
                  <div className="line-clamp-1 text-start text-xs font-bold">
                    {movie.title}
                  </div>
                  <div className="line-clamp-1 text-start text-xs font-bold">
                    {movie.original_title}
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1 text-start text-xs font-bold">
                        {movie.release_date.slice(0, 4)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-2 text-xs font-bold text-sky-900">
            {" "}
            Film Bulunamadı...
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(SearchBar);
