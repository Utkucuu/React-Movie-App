import { useHandleMovieClick } from "../../../utils/navigateDetail";

function MoviesWindowView({ movies }) {
  console.log("MOVIES WINDIW WIEW rendered");
  const handleMovieClick = useHandleMovieClick();

  return (
    // <div className="mt-4 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    <div className="mt-4 grid grid-cols-3 gap-x-5 gap-y-10 md:grid-cols-4 lg:grid-cols-5">
      {movies &&
        movies?.map((movie, i) => (
          <div
            key={i}
            className={`group relative cursor-pointer`}
            onClick={() => handleMovieClick(movie.id, movie.title)}
          >
            <img
              className="h-full w-full rounded-lg object-cover duration-500 group-hover:scale-110 group-hover:opacity-40 group-hover:blur-sm"
              src={process.env.REACT_APP_API_IMG_2 + movie.poster_path}
              alt={movie.title}
              loading="lazy"
            />
            <div className="absolute top-10 hidden text-sky-900 opacity-0 duration-500 group-hover:top-2 group-hover:opacity-100 dark:text-cyan-200 lg:block">
              <div className="px-2 pb-1 text-xs lg:text-sm">
                <p>
                  <span className="li font-bold"></span> {movie.original_title}
                </p>
                <p>
                  <span className="font-bold">Toplam Oy:</span>{" "}
                  {movie.vote_count}
                </p>
                <p>
                  <span className="font-bold">Puan:</span> {movie.vote_average}
                </p>
                <p>
                  <span className="font-bold">Popülerlik:</span>{" "}
                  {movie.popularity}
                </p>
                <p className="font-bold">
                  Vizyon:
                  <span className="text-xs"> {movie.release_date}</span>{" "}
                </p>
                {(movie.overview && (
                  <p className="mt-2 line-clamp-6 leading-[16px]">
                    {" "}
                    <span className="mt-1 font-bold">Konu:</span>{" "}
                    {movie.overview}
                  </p>
                )) || (
                  <p className="mt-2 line-clamp-6 leading-[16px]">
                    {" "}
                    <span className="mt-1 font-bold">Konu:</span> eklenmedi
                  </p>
                )}
              </div>
            </div>
            <div className="text-center">
              {" "}
              <h3 className="mt-1 line-clamp-1  text-xs font-bold text-sky-900 dark:text-cyan-200 sm:text-sm">
                {movie.title}
              </h3>
            </div>{" "}
          </div>
        ))}
    </div>
  );
}

export default MoviesWindowView;
