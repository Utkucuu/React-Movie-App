import { useMemo, useState } from "react";
import { useMovie } from "../../../context/SiteContext";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useHandleMovieClick } from "../../../utils/navigateDetail";
import LoadingAnimate from "../../loadingAnimate";

function TrendMovie() {
  const [toggle, setToggle] = useState(true);

  const state = useMovie();

  const trendDaily = state?.trendDaily?.data?.results || [];

  const trendWeekly = state?.trendWeekly?.data?.results || [];

  const moviesToShow = useMemo(() => {
    return toggle ? trendDaily : trendWeekly;
  }, [toggle, trendDaily, trendWeekly]);

  const handleMovieClick = useHandleMovieClick();

  if (moviesToShow.length === 0) {
    return (
      <div className="mt-20">
        <LoadingAnimate
          gradientId="myGradient56"
          color1={"#B1E3FC"}
          color2={"#22D1EE"}
          colorText={"text-sky-400"}
        />
      </div>
    );
  }

  return (
    <section className="mx-auto mt-10 h-auto  rounded-xl bg-sky-100 bg-opacity-50 px-2 pb-2 shadow-2xl shadow-sky-700 duration-500 dark:bg-opacity-100">
      <div className="flex items-center justify-between ">
        <div className="ms-4 flex items-center justify-center py-[2px]">
          <h2 className="whitespace-nowrap  text-sm font-bold sm:text-lg">
            Trend Filmler
          </h2>
          <button
            className="relative ms-4 flex items-center justify-around space-x-2 rounded-full  px-1 py-1"
            onClick={() => setToggle(!toggle)}
          >
            <span className="mr-2 text-xs font-semibold sm:mr-0 sm:text-sm">
              Bugün
            </span>
            <span
              className={`absolute h-5 rounded-full border-2 bg-sky-300  bg-opacity-30 shadow-md shadow-sky-300 duration-500 md:h-7 ${
                toggle
                  ? "w-[50px] -translate-x-9 border-sky-600 shadow-sky-300"
                  : "w-[66px] translate-x-5 border-sky-900 shadow-sky-900"
              }`}
            ></span>{" "}
            <span className="text-xs font-semibold sm:text-sm">Bu Hafta</span>
          </button>
        </div>

        <div className="me-4 text-xs underline-offset-2 hover:underline md:text-sm">
          <Link to="movies/trend">Tümü</Link>
        </div>
      </div>

      <div
        className={` mx-auto flex touch-auto items-center overflow-x-auto rounded-xl bg-opacity-30 bg-gradient-to-b from-cyan-400 to-sky-950 py-5 dark:from-slate-950 dark:to-sky-900 ${styles.trendScroll}`}
      >
        <div className="flex space-x-2">
          {moviesToShow &&
            moviesToShow?.slice(7).map((m) => (
              <div
                key={m.id}
                className="snap-start flex-col items-center md:space-y-2"
              >
                <div
                  className={`group relative mx-1  h-40 w-28 cursor-pointer sm:h-60 sm:w-40 ${styles.movieCard}`}
                  onClick={() => handleMovieClick(m.id, m.title)}
                >
                  <figure>
                    <img
                      className=" h-full w-full object-cover duration-500 group-hover:scale-110 group-hover:opacity-40 group-hover:blur-sm "
                      src={process.env.REACT_APP_API_IMG_2 + m.poster_path}
                      alt={m.title}
                      loading="lazy"
                    />
                  </figure>

                  <figcaption className=" absolute top-10 hidden text-sky-100 opacity-0 duration-500 group-hover:-top-2 group-hover:opacity-100 lg:block">
                    <div
                      className="float-right"
                      role="progressbar"
                      aria-valuenow="67"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ "--value": Math.floor(m.vote_average * 10) }}
                    ></div>

                    <div className="px-2 pb-1 text-xs lg:text-sm  ">
                      <p>
                        <span className="font-bold">Toplam Oy:</span>{" "}
                        {m.vote_count}
                      </p>
                      <p>
                        <span className="font-bold">Orijinal İsim:</span>{" "}
                        {m.original_title}
                      </p>
                      <p className="font-bold">
                        Vizyon Tarihi:
                        <span className="text-xs"> {m.release_date}</span>{" "}
                      </p>

                      <p className="mt-2 leading-[16px] text-sky-100 md:line-clamp-4 xl:line-clamp-5">
                        <span className="mt-1 font-bold ">Konu:</span>{" "}
                        {m.overview.length > 120
                          ? `${m.overview.slice(0, 120)}...`
                          : m.overview}
                      </p>
                    </div>
                  </figcaption>
                </div>

                <div className="text-center">
                  {" "}
                  <h3 className="mt-2 line-clamp-1 text-xs font-bold text-sky-100 sm:line-clamp-2 md:mt-0 md:text-sm ">
                    {m.title}
                  </h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default TrendMovie;
