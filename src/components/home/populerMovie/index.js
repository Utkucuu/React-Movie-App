import { useEffect, useState } from "react";
import { MovieServices } from "../../../services";
import { useMediaQuery } from "react-responsive";
import { useHandleMovieClick } from "../../../utils/navigateDetail";
import { Link } from "react-router-dom";
import populer from "./populer.module.css";
import LoadingAnimate from "../../loadingAnimate";
function Populer() {
  const [populerMovies, setPopulerMovies] = useState();

  const handleMovieClick = useHandleMovieClick();
  useEffect(() => {
    const axiosData = async () => {
      try {
        const moviesData = [];

        for (let index = 1; index <= 2; index++) {
          const response = await MovieServices.getPopulerMovies(index);
          moviesData.push(response?.data.results);
        }

        // Tüm promise'ların sonuçlarını bekleyin ve birleştirin
        const allMovies = moviesData.flat();

        // Aynı filmi birden fazla eklemeyi önlemek için kontrol edin
        const uniqueMovies = [];
        const movieIds = new Set();

        for (const movie of allMovies) {
          if (!movieIds.has(movie.id)) {
            uniqueMovies.push(movie);
            movieIds.add(movie.id);
          }
        }

        setPopulerMovies(uniqueMovies.slice(0, 24));
      } catch (error) {
        console.error("API isteği hatası:", error);
      }
    };
    axiosData();
  }, []);

  let arr = [0, 1, 2, 3, 4, 5, 6, 7];
  const screen1 = useMediaQuery({ minWidth: 795, maxWidth: 936 });

  const screen2 = useMediaQuery({ minWidth: 600, maxWidth: 795 });

  const screen3 = useMediaQuery({ minWidth: 280, maxWidth: 600 });

  const removeClassScreen = useMediaQuery({ minWidth: 0, maxWidth: 768 });

  if (screen1) {
    arr = [0, 1, 2, 3, 4, 5, 6];
  }

  if (screen2) {
    arr = [0, 1, 2, 3, 4, 5];
  }

  if (screen3) {
    arr = [0, 1, 2, 3, 4];
  }

  if (removeClassScreen) {
    const divs = document.querySelectorAll("#my-div");
    divs.forEach((div) => {
      div.classList.remove(`${populer.rotation1}`);
    });
  } else {
    const divs = document.querySelectorAll("#my-div");
    divs.forEach((div) => {
      div.classList.add(`${populer.rotation1}`);
    });
  }

  const movies = populerMovies || [];

  const addRandomRotation = () => {
    const divs = document.querySelectorAll("#my-div");
    if (divs) {
      divs.forEach((div) => {
        div.classList.remove(`${populer.rotation2}`);
      });

      const randomIndex = Math.floor(Math.random() * divs.length);
      divs[randomIndex].classList.add(`${populer.rotation2}`);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(addRandomRotation, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [populerMovies]);

  if (movies.length === 0) {
    return (
      <div className="mt-20">
        <LoadingAnimate
          gradientId="myGradient61"
          color1={"#B1E3FC"}
          color2={"#22D1EE"}
          colorText={"text-sky-400"}
        />{" "}
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between border-b-2 border-sky-400 px-2 dark:text-sky-200">
        <h2 className="whitespace-nowrap text-sm font-bold sm:text-lg">
          Popüler Filmler
        </h2>

        <div className="text-xs underline-offset-2 hover:underline md:text-sm">
          <Link to="movies">Tümü</Link>
        </div>
      </div>
      <div className="mx-auto mt-5 flex flex-nowrap justify-center border-b-2 border-sky-400 pb-4">
        {arr.map((row) => (
          <div
            className={`flex flex-col space-y-3 ${
              row % 2 === 1
                ? " mt-10 xs:mt-12 md:mt-14  lg:mt-[70px] xl:mt-20"
                : ""
            }`}
            key={row}
          >
            {movies.slice(row * 3, row * 3 + 3).map((movie, index) => (
              <div
                className={`${populer.rotation1} border-opacity-50" cursor-pointer overflow-hidden rounded-full border-2 border-sky-200`}
                onClick={() => handleMovieClick(movie.id, movie.title)}
                id={"my-div"}
                key={index}
                style={{ boxShadow: "0 0 30px rgba(3, 105, 161, 0.8)" }}
              >
                <img
                  className="h-[60px] w-[60px] rounded-full object-fill xs:h-24 xs:w-24  sm:h-24 sm:w-24  md:h-28 md:w-28 lg:h-[124px] lg:w-[124px] xl:h-40 xl:w-40"
                  src={`${process.env.REACT_APP_API_IMG_2}${movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Populer;
