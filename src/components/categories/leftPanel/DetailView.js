import { VGrid } from "virtua";
import { useHandleMovieClick } from "../../../utils/navigateDetail";
import stylesDetail from "./stylesDetail.module.css";

function DetailView({ allMovies, genres }) {
  const handleMovieClick = useHandleMovieClick();

  return (
    <section className={`${stylesDetail.itemClass}`}>
      <VGrid
        className=""
        style={{
          height: "800px",

          overflowX: "hidden",
        }}
        row={Math.ceil(allMovies.length / 2)}
        col={2}
      >
        {({ rowIndex, colIndex }) => (
          <div
            className={`p-2`}
            style={{
              height: "300",
            }}
          >
            {allMovies[rowIndex * 2 + colIndex] && (
              <article
                className="grid h-full w-100 cursor-pointer grid-cols-6 rounded-lg border-2 border-slate-100 p-2 dark:border-cyan-200"
                onClick={() =>
                  handleMovieClick(
                    allMovies[rowIndex * 2 + colIndex].id,
                    allMovies[rowIndex * 2 + colIndex].title,
                  )
                }
              >
                <figure className="col-span-2 mx-auto">
                  <img
                    src={
                      process.env.REACT_APP_API_IMG_2 +
                      allMovies[rowIndex * 2 + colIndex].poster_path
                    }
                    alt={allMovies[rowIndex * 2 + colIndex].title}
                    className="w-28 overflow-hidden rounded-lg"
                    loading="lazy"
                  />
                </figure>

                {/* *********************** */}
                <figcaption className="col-span-4 pr-4">
                  <div className="my-auto pb-1">
                    <h2 className=" mt-3 line-clamp-1 text-xl font-bold text-sky-900  dark:text-cyan-500">
                      {allMovies[rowIndex * 2 + colIndex].title}
                    </h2>
                    <ul className=" mt-2 flex list-disc gap-6 text-xs">
                      <li className="list-none text-gray-600 dark:text-cyan-600">
                        {allMovies[rowIndex * 2 + colIndex].release_date.slice(
                          0,
                          4,
                        )}
                      </li>
                      <li className="text-gray-600 dark:text-cyan-600">
                        {allMovies[rowIndex * 2 + colIndex].genre_ids
                          .slice(0, 3)
                          .map((genreId, index) => {
                            const genre = genres.find(
                              (genre) => genre.id === genreId,
                            );

                            if (genre) {
                              return (
                                <span key={genre.id}>
                                  {genre.name}
                                  {index !==
                                  allMovies[rowIndex * 2 + colIndex].genre_ids
                                    .length -
                                    1
                                    ? ", "
                                    : ""}{" "}
                                </span>
                              );
                            }

                            return <span> İçerik eklenmedi</span>;
                          })}
                      </li>
                    </ul>
                    {/* /***************** */}
                  </div>

                  <div className="my-auto border-t-2 border-slate-100 pt-2 dark:border-cyan-200">
                    {(allMovies[rowIndex * 2 + colIndex].overview && (
                      <p className="line-clamp-4 text-sm text-gray-600 dark:text-cyan-600">
                        {" "}
                        {allMovies[rowIndex * 2 + colIndex].overview}
                      </p>
                    )) || (
                      <p className="line-clamp-4 text-sm text-gray-600 dark:text-cyan-600">
                        {" "}
                        İçerik Eklenmedi
                      </p>
                    )}
                  </div>
                </figcaption>
              </article>
            )}
          </div>
        )}
      </VGrid>
    </section>
  );
}

export default DetailView;
