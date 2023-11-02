import { Carousel } from "react-responsive-carousel";
import { MovieServices } from "../../../services";
import { useHandleMovieClick } from "../../../utils/navigateDetail";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./carousel.css";
import LoadingAnimate from "../../loadingAnimate";

function TopRatedMovies() {
  console.log("HOMETOPRATED rendered");
  const [populerMovies, setPopulerMovies] = useState();

  const handleMovieClick = useHandleMovieClick();

  useEffect(() => {
    const getMovies = async function (pageId) {
      await MovieServices.getTopRated(pageId)
        .then((res) => {
          setPopulerMovies(res?.data?.results);
        })
        .catch((err) => {
          console.error("API isteği hatası:", err);
        });
    };

    getMovies(1);
  }, []);

  const movies = populerMovies || [];

  if (movies.length === 0) {
    return (
      <LoadingAnimate
        gradientId="myGradient87"
        color1={"#B1E3FC"}
        color2={"#22D1EE"}
        colorText={"text-sky-100"}
      />
    );
  }

  return (
    <div className="mt-10 border-b-2 border-sky-400">
      <div className="flex items-center justify-between border-b-2 border-sky-400 px-2 dark:text-sky-200">
        <h2 className="whitespace-nowrap text-lg font-bold">
          En Çok Oy Alan Filmler
        </h2>

        <div className="text-xs underline-offset-2 hover:underline md:text-sm">
          <Link to="movies/top_rated">Tümü</Link>
        </div>
      </div>
      <div className="mx-auto mt-4 overflow-hidden xs:w-full">
        <Carousel
          className="overflow-hidden rounded-3xl "
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          infiniteLoop={true}
          showThumbs={true}
          useKeyboardArrows={true}
          autoPlay={true}
          stopOnHover={false}
          swipeable={true}
          dynamicHeight={true}
          emulateTouch={true}
          autoFocus={false}
        >
          {populerMovies &&
            movies.map((movie) => (
              <div
                className="h-48 overflow-hidden rounded-3xl sm:h-72 md:h-80 lg:h-100 xl:h-[540px]"
                key={movie.id}
              >
                <img
                  className="h-full w-full rounded-3xl object-fill"
                  src={process.env.REACT_APP_API_IMG_ORG + movie.backdrop_path}
                  alt={movie.title}
                  loading="lazy"
                />
                <p
                  className="legend"
                  style={{
                    backgroundColor: "transparent",
                  }}
                >
                  <button
                    className="rounded-lg border-2 border-sky-300 bg-white px-4 py-1 font-bold text-sky-300 hover:bg-slate-100 dark:bg-black dark:hover:bg-slate-700"
                    onClick={() => handleMovieClick(movie.id, movie.title)}
                  >
                    {movie.title}
                  </button>
                </p>
              </div>
            ))}
        </Carousel>
      </div>
    </div>
  );
}

export default TopRatedMovies;
