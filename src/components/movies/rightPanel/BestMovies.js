import { useBestMovie } from "../../../context/BestMoviesContext";
import LoadingAnimate from "../../loadingAnimate";
import { useHandleMovieClick } from "../../../utils/navigateDetail";

function BestMovies() {
  const { bestMovie } = useBestMovie([]);

  const handleMovieClick = useHandleMovieClick();

  //burada hata aldın unutma getMovies çalışmadı sort hatası aldın maplediğin için dizi olmak zorunda ve bestMovie yüklenmeden veri gelirse hata alıyorsun.
  let getMovies = bestMovie || [];

  if (!getMovies.length) {
    return (
      <LoadingAnimate
        gradientId="myGradient"
        color1={"#B1E3FC"}
        color2={"#0385C8"}
        colorText={"text-cyan-600"}
      />
    );
  }

  let highestRated = getMovies.sort(
    (a, b) => b.vote_average - a.vote_average,
  )[0];
  let mostPopular = getMovies.sort((a, b) => b.popularity - a.popularity)[0];
  let mostVoted = getMovies.sort((a, b) => b.vote_count - a.vote_count)[0];
  let newestRelease = getMovies.sort(
    (a, b) => new Date(b.release_date) - new Date(a.release_date),
  )[0];

  const bestMovies = [highestRated, mostPopular, mostVoted, newestRelease];

  return (
    <>
      <div className="flex justify-around text-center lg:flex-col lg:text-start ">
        {/* <div className="text-xl text-center font-bold text-sky-900">
          Bu Sayfada
        </div> */}
        {bestMovie &&
          bestMovies?.map((movie, i) => (
            <div
              className=" mt-4 text-[10px]  font-semibold text-sky-950 dark:text-cyan-200 sm:text-sm md:text-lg"
              key={i}
            >
              {i === 0 && <h2 className="whitespace-nowrap">En Yüksek Puan</h2>}
              {i === 1 && <h2 className="whitespace-nowrap">En Popüler</h2>}
              {i === 2 && <h2 className="whitespace-nowrap">En Çok Oylanan</h2>}
              {i === 3 && <h2 className="whitespace-nowrap">En Yeni</h2>}
              <div
                className="mt-2 flex cursor-pointer items-start"
                onClick={() => handleMovieClick(movie.id, movie.title)}
              >
                <div className="mx-auto mt-1 h-24 w-16 sm:h-32 sm:w-24 lg:mx-0 ">
                  <img
                    src={`${
                      process.env.REACT_APP_API_IMG_2 + movie.poster_path
                    }`}
                    alt={movie.title}
                    className="h-full w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="ml-4 hidden text-gray-600 dark:text-cyan-600 lg:block">
                  <h3 className="line-clamp-2 w-40 font-bold text-sky-900 dark:text-cyan-500">
                    {movie.title}
                  </h3>
                  <p className=" text-sm ">Puan: {movie.vote_average}</p>
                  <p className=" text-sm ">Oy Sayısı: {movie.vote_count}</p>
                  <p className=" text-sm ">
                    Çıkış Tarihi: {movie.release_date}
                  </p>
                  <p className="text-sm ">Popülarite: {movie.popularity}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default BestMovies;
