import { Carousel } from "react-responsive-carousel";
import { MovieServices } from "../../../services";
import { useHandleMovieClick } from "../../../utils/navigateDetail";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./carousel.css";
import LoadingAnimate from "../../loadingAnimate";

function TopRatedMovies() {
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
      <div className="mt-20">
        <LoadingAnimate
          gradientId="myGradient87"
          color1={"#B1E3FC"}
          color2={"#22D1EE"}
          colorText={"text-sky-400"}
        />
      </div>
    );
  }

  return (
    <section className="mt-10 border-b-2 border-sky-400">
      <div className="flex items-center justify-between border-b-2 border-sky-400 px-2 dark:text-sky-200">
        <h2 className="whitespace-nowrap text-sm font-bold sm:text-lg">
          En Çok Oy Alan Filmler
        </h2>

        <div className="text-xs underline-offset-2 hover:underline md:text-sm">
          <Link to="movies/top_rated">Tümü</Link>
        </div>
      </div>
      <div className="mx-auto mt-4 overflow-hidden xs:w-full">
        <Carousel
          className="overflow-hidden rounded-xl px-2"
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
              <figure
                className="h-48 overflow-hidden rounded-xl sm:h-72 md:h-80 lg:h-100 xl:h-[540px]"
                key={movie.id}
              >
                <img
                  className="h-full w-full rounded-xl object-fill"
                  src={process.env.REACT_APP_API_IMG_ORG + movie.backdrop_path}
                  alt={movie.title}
                  loading="lazy"
                />
                <div
                  className="legend "
                  style={{
                    backgroundColor: "transparent",
                  }}
                >
                  <button
                    className="text-xss mt-10 rounded-lg  border-2 border-sky-300 bg-white px-4 py-[2px] font-bold text-sky-300 hover:bg-slate-100 dark:bg-black dark:hover:bg-slate-700 sm:py-1 sm:text-sm"
                    onClick={() => handleMovieClick(movie.id, movie.title)}
                  >
                    {movie.title}
                  </button>
                </div>
              </figure>
            ))}
        </Carousel>
      </div>
    </section>
  );
}

export default TopRatedMovies;
