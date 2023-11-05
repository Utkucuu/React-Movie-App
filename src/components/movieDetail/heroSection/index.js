import { useEffect, useState } from "react";
import { useUser } from "../../../context/AuthContext";
import { useMovie } from "../../../context/SiteContext";
import TrailerClose from "../../../assest/icons/TrailerClose";
import TrailerPlayIcon from "../../../assest/icons/TrailerPlayIcon";
import TrailerAreaClose from "../../../assest/icons/TrailerAreaClose";
import LoadingAnimate from "../../loadingAnimate";
import SaveBtn from "./SaveBtn";
import LikeBtn from "./LikeBtn";

function HeroSection() {
  const { user } = useUser();

  const state = useMovie();
  const movieDetail = state?.movieDetail?.data;

  const movieTrailer = state?.movieTrailer?.data;

  const [isVisible, setIsVisible] = useState(false);
  const [saveBtnStyle, setSaveBtnStyle] = useState(false);
  const [likeBtnStyle, setLikeBtnStyle] = useState(false);

  useEffect(() => {
    if (user) {
      const activeUser = JSON.parse(localStorage.getItem("activeUser"));

      const controlSaveBtn = activeUser.userSavedMovies.some(
        (savedMovie) => savedMovie?.id === movieDetail?.id,
      );
      controlSaveBtn ? setSaveBtnStyle(true) : setSaveBtnStyle(false);

      const controlLikeBtn = activeUser.userLikedMovies.some(
        (likedMovie) => likedMovie?.id === movieDetail?.id,
      );
      controlLikeBtn ? setLikeBtnStyle(true) : setLikeBtnStyle(false);
    } else {
      setSaveBtnStyle(false);
      setLikeBtnStyle(false);
    }
  }, [movieDetail]);

  if (!movieDetail) {
    return (
      <LoadingAnimate
        gradientId="myGradient3"
        color1={"#B1E3FC"}
        color2={"#082F49"}
        colorText={"text-sky-800"}
      />
    );
  }

  // if (!movieDetail) {
  //   return (
  //     <div className="container mx-auto justify-center items-center">
  //       <div className="animate-spin"></div>
  //     </div>
  //   );
  // }

  // Resim URL'sini oluşturdum
  const backgroundImageUrl = `${process.env.REACT_APP_API_IMG_ORG}${movieDetail.backdrop_path}`;

  // Stil tanımlamaları
  const containerStyle = {
    backgroundImage: `linear-gradient(to right, rgba(8, 47, 73, 0.999), rgba(0, 0, 0, 0.2)), url(${backgroundImageUrl})`,
    backgroundSize: "cover",
  };

  function convertTime(num) {
    const hour = Math.floor(num / 60);
    const minute = num % 60;
    return `${hour}s ${minute}dk`;
  }

  return (
    <>
      {" "}
      <main
        className=" text-md mx-auto mt-0 flex min-h-[fit] w-full rounded-t-none bg-center py-10 text-sm text-white duration-500 lg:mt-10 lg:rounded-xl"
        style={containerStyle}
      >
        {movieDetail && (
          <div
            key={movieDetail.id}
            className=" relative flex h-auto px-2 tracking-wider sm:px-10 lg:gap-x-10 "
          >
            {/* ****************** TRAİLER ***************** */}
            <div
              className="absolute left-0 top-0 w-full"
              style={{ display: isVisible ? "block" : "none" }}
            >
              {movieTrailer?.results[0]?.key ? (
                <div className="mx-auto w-fit bg-sky-950 bg-opacity-60 p-4 shadow-2xl shadow-sky-400">
                  <div className="flex justify-end ">
                    {" "}
                    <button
                      className=" mr-2 text-black"
                      onClick={() => setIsVisible(!isVisible)}
                    >
                      {" "}
                      <TrailerClose />
                    </button>
                  </div>
                  <iframe
                    className="h-60 w-80 sm:h-72 sm:w-100"
                    src={`${
                      process.env.REACT_APP_API_TRAILER +
                      movieTrailer.results[0].key
                    }?${!isVisible ? "mute=1&" : ""}`}
                    title="YouTube video player"
                    width={""}
                    height={""}
                    allowFullScreen={true}
                  ></iframe>
                </div>
              ) : (
                <div className="absolute -bottom-60 grid w-full animate-pulse place-content-center rounded-xl text-center text-sm md:text-lg">
                  <p className="whitespace-nowrap rounded-xl  bg-red-500 p-2 font-medium">
                    Fragman Bulunmuyor
                  </p>
                </div>
              )}
            </div>
            {/* ****************** TRAİLER ***************** */}

            {/* ****************** POSTER ***************** */}
            <figure className=" hidden w-72 flex-none lg:block">
              <img
                className="h-full w-full rounded-xl"
                src={`${process.env.REACT_APP_API_IMG_5}${movieDetail.poster_path}`}
                alt="poster"
                loading="lazy"
              />
            </figure>
            {/* ****************** POSTER ***************** */}

            {/* ****************** MOVİE CONTENT ***************** */}
            <article className="flex-col space-y-2 ">
              <div>
                <hz className="text-3xl font-bold lg:text-5xl">
                  {movieDetail.title}
                </hz>
              </div>
              <div className="flex space-x-4">
                <p>{convertTime(movieDetail.runtime)}</p>
                {movieDetail.genres.slice(0, 3).map((e) => (
                  <li key={e.id} className="marker:text-sky-400">
                    {" "}
                    {e.name}{" "}
                  </li>
                ))}
              </div>

              <p>Orijinal İsim: {movieDetail.original_title}</p>
              <p>Orijinal Dil: {movieDetail.original_language}</p>
              <p>
                Bütçe:{" "}
                {"$" +
                  movieDetail.budget
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </p>
              <p>Yayın Tarihi: {movieDetail.release_date}</p>
              <p className="">{movieDetail.tagline}</p>

              <h3 className="text-lg font-bold">Konu</h3>

              <p className="text-sm">
                {movieDetail.overview
                  ? movieDetail.overview
                  : "İçerik eklenmedi."}
              </p>

              {/* ************************* Icons and percent bar flex   ****************** */}
              <div className=" flex-col items-center space-x-0 sm:flex sm:flex-row sm:space-x-6 ">
                {/* ************** PERCENT BAR ************** */}
                <div className=" group h-5 w-44 cursor-pointer rounded-md border border-sky-200 bg-sky-950 text-center md:w-64">
                  <div
                    className="h-full rounded-md bg-sky-200"
                    style={{ width: `${movieDetail.vote_average * 10}%` }}
                  >
                    <p className="text-xs font-bold text-sky-950">
                      {" "}
                      {Math.floor(movieDetail.vote_average * 10)}%
                    </p>
                  </div>
                  <div className="absolute z-10 mt-2 hidden rounded-md bg-sky-950 group-hover:block">
                    <div className="p-1 text-white ">
                      Toplam Oy: {movieDetail.vote_count}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex space-x-4 sm:mt-0 ">
                  {/* ************** LİKE ITEM START ************** */}
                  <LikeBtn
                    movieDetail={movieDetail}
                    likeBtnStyle={likeBtnStyle}
                    setLikeBtnStyle={setLikeBtnStyle}
                  />
                  {/* ************** LİKE ITEM END ************** */}

                  {/* ***************** Save Icon ***************** */}
                  <SaveBtn
                    movieDetail={movieDetail}
                    saveBtnStyle={saveBtnStyle}
                    setSaveBtnStyle={setSaveBtnStyle}
                  />
                  {/* ***************** Save Icon ***************** */}

                  {/* ***************** PLAY ICON STARS ***************** */}
                  <button
                    className="group flex h-9 w-9 items-center justify-center rounded-full bg-sky-900 hover:bg-sky-200 md:h-12 md:w-12"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    {(!isVisible && <TrailerPlayIcon />) || (
                      <TrailerAreaClose />
                    )}
                  </button>
                  {/* ***************** PLAY ICON END ***************** */}
                </div>
              </div>
            </article>
            {/* ****************** MOVİE CONTENT ***************** */}
          </div>
        )}
      </main>
    </>
  );
}

export default HeroSection;
