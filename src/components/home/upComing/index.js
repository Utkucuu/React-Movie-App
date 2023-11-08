import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useMovie } from "../../../context/SiteContext";
import { useHandleMovieClick } from "../../../utils/navigateDetail";
import LoadingAnimate from "../../loadingAnimate";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./styles.css";

function MovieUpComing() {
  const state = useMovie();

  const movies = state?.upComingMovies?.data?.results || [];

  const handleMovieClick = useHandleMovieClick();

  const titleRegulation = (title) => {
    let words = title.split(" ").slice(0, 2).join(" ");
    return words;
  };

  if (movies.length === 0) {
    return (
      <div className="mt-20">
        <LoadingAnimate
          gradientId="myGradient1000"
          color1={"#B1E3FC"}
          color2={"#22D1EE"}
          colorText={"text-sky-400"}
        />
      </div>
    );
  }

  return (
    <section className="mx-auto mb-10 mt-10 h-auto rounded-xl bg-sky-100 bg-opacity-50 px-2 pb-2 shadow-2xl  shadow-sky-700 duration-500 dark:bg-opacity-100">
      <div className="flex items-center justify-between ">
        <div className="ms-4 flex items-center justify-center ">
          <h2 className="whitespace-nowrap text-sm font-bold sm:text-lg">
            Yakında
          </h2>
        </div>

        <div className="me-4 text-xs underline-offset-2 hover:underline md:text-sm">
          <Link to="movies/upcoming">Tümü</Link>
        </div>
      </div>
      <div className=" mx-auto flex touch-auto items-center overflow-x-auto rounded-xl bg-opacity-30 bg-gradient-to-b from-cyan-400 to-sky-950  dark:from-slate-950 dark:to-sky-900 ">
        {" "}
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper "
        >
          {movies.length &&
            movies.map((movie) => (
              <SwiperSlide
                className="group relative overflow-hidden rounded-xl"
                key={movie.id}
              >
                <img
                  className="h-full w-full"
                  src={`${process.env.REACT_APP_API_IMG_2 + movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                />

                <button
                  className="absolute inset-0 left-0 h-full w-6 bg-sky-300 text-[10px] font-bold uppercase text-sky-900 opacity-80 group-hover:opacity-100"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => handleMovieClick(movie.id, movie.title)}
                >
                  {titleRegulation(movie.title)
                    .split("")
                    .map((letter, index) => (
                      <span className="mt-1" key={index}>
                        {letter}
                        <br />
                      </span>
                    ))}
                </button>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
}
export default MovieUpComing;
