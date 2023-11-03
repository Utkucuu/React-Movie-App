import { useHandleMovieClick } from "../../../utils/navigateDetail";

function MoviesDetailView({ movies, genres }) {
  console.log("MOVIES DETAIL WIEW rendered");
  const handleMovieClick = useHandleMovieClick();

  return (
    <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
      {movies.map((movie, i) => (
        <div key={movie.id} className="grid gap-5">
          {/* Sütun 1 */}
          {i % 2 === 0 && (
            <div
              className=" grid cursor-pointer grid-cols-6 space-x-6 rounded-lg border-2 border-slate-100 px-1 py-5 dark:border-cyan-200 xs:space-x-0 "
              onClick={() => handleMovieClick(movie.id, movie.title)}
            >
              <div className="col-span-2 mx-auto">
                <img
                  src={process.env.REACT_APP_API_IMG_5 + movie.poster_path}
                  alt={movie.title}
                  className="w-28 overflow-hidden rounded-lg"
                  loading="lazy"
                />
              </div>

              {/* *********************** */}
              <div className="col-span-4 pr-0 xs:pr-4">
                <div className="my-auto border-sky-300 pb-1">
                  <h2 className=" mt-3 line-clamp-1 text-sm font-bold text-sky-900 dark:text-cyan-500 sm:text-xl">
                    {movie.title}
                  </h2>
                  <ul className="mt-2 flex list-disc gap-6 text-xs">
                    <li className=" list-none text-gray-600 dark:text-cyan-600">
                      {movie.release_date.slice(0, 4)}
                    </li>
                    <li className="text-gray-600 dark:text-cyan-600">
                      {movie.genre_ids.slice(0, 3).map((genreId, index) => {
                        // genreId'yi kullanarak doğru tür adını bulun
                        const genre = genres.find(
                          (genre) => genre.id === genreId,
                        );

                        // Eğer tür bulunduysa, tür adını listeye ekleyin
                        if (genre) {
                          return (
                            <span key={index}>
                              {genre.name}
                              {index !== movie.genre_ids.length - 1
                                ? ", "
                                : ""}{" "}
                              {/* Son türden sonra virgül eklemeyi önler */}
                            </span>
                          );
                        }

                        return <span> İçerik eklenmedi</span>; // Eğer tür bulunamazsa, boş bir eleman ekleyin ya da atlayın
                      })}
                    </li>
                  </ul>
                  {/* /***************** */}
                </div>
                <div className="my-auto border-t-2 border-slate-100 pt-1 dark:border-cyan-200">
                  {(movie.overview && (
                    <p className="line-clamp-4 text-sm text-gray-600 dark:text-cyan-600">
                      {" "}
                      {movie.overview}
                    </p>
                  )) || (
                    <p className="line-clamp-4 text-sm text-gray-600 dark:text-cyan-600">
                      {" "}
                      İçerik Eklenmedi
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Sütun 2 */}
          {i % 2 === 1 && (
            <div
              className=" grid cursor-pointer grid-cols-6 space-x-6 rounded-lg border-2 border-slate-100 px-1 py-5 dark:dark:border-cyan-200 xs:space-x-0"
              onClick={() => handleMovieClick(movie.id, movie.title)}
              key={movie.id + 1000}
            >
              <div className="col-span-2 mx-auto">
                <img
                  src={process.env.REACT_APP_API_IMG_2 + movie.poster_path}
                  alt={movie.title}
                  className="w-28 overflow-hidden rounded-lg"
                  loading="lazy"
                />
              </div>

              {/* *********************** */}
              <div className="col-span-4 pr-0 xs:pr-4">
                <div className="my-auto border-sky-300 pb-1">
                  <h2 className=" mt-3 line-clamp-1 text-sm font-bold text-sky-900 dark:text-cyan-500 sm:text-xl">
                    {movie.title}
                  </h2>
                  <ul className="mt-2 flex list-disc gap-6 text-xs">
                    <li className=" list-none text-gray-600 dark:text-cyan-600">
                      {movie.release_date.slice(0, 4)}
                    </li>
                    <li className="text-gray-600 dark:text-cyan-600">
                      {movie.genre_ids.slice(0, 3).map((genreId, index) => {
                        // genreId'yi kullanarak doğru tür adını bulun
                        const genre = genres.find(
                          (genre) => genre.id === genreId,
                        );

                        // Eğer tür bulunduysa, tür adını listeye ekleyin
                        if (genre) {
                          return (
                            <span key={genre.id}>
                              {genre.name}
                              {index !== movie.genre_ids.length - 1
                                ? ", "
                                : ""}{" "}
                              {/* Son türden sonra virgül eklemeyi önler */}
                            </span>
                          );
                        }

                        return null; // Eğer tür bulunamazsa, boş bir eleman ekleyin ya da atlayın
                      })}
                    </li>
                  </ul>
                  {/* /***************** */}
                </div>
                <div className="my-auto border-t-2 border-slate-100 pt-1 dark:border-cyan-200 ">
                  {(movie.overview && (
                    <p className="line-clamp-4 text-sm text-gray-600 dark:text-cyan-600">
                      {" "}
                      {movie.overview}
                    </p>
                  )) || (
                    <p className="line-clamp-4 text-sm text-gray-600 dark:text-cyan-600">
                      {" "}
                      İçerik eklenmedi
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MoviesDetailView;
