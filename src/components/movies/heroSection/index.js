import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel için CSS dosyasını ekleyin
import { MovieServices } from "../../../services";
import { useEffect, useState } from "react";
function MoviesHeroSection() {
  const [populerMovies, setPopulerMovies] = useState();
  console.log("MOVIES HERO rendered");
  useEffect(() => {
    const getMovies = async function (pageId) {
      await MovieServices.getPopulerMovies(pageId)
        .then((res) => {
          setPopulerMovies(res?.data?.results);
        })
        .catch((err) => {
          console.error("API isteği hatası:", err);
        });
    };

    getMovies(21);
  }, []);

  const movies = populerMovies || [];

  return (
    <div className="mx-auto px-3 xs:w-full">
      <Carousel
        className="mt-10 overflow-hidden rounded-3xl"
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        infiniteLoop={true}
        showThumbs={false}
        useKeyboardArrows={false}
        autoPlay={true}
        stopOnHover={true}
        swipeable={true}
        dynamicHeight={true}
        emulateTouch={true}
        autoFocus={true}
      >
        {populerMovies &&
          movies.map((movie) => (
            <div
              className="h-48 rounded-3xl sm:h-72 md:h-80 lg:h-96 xl:h-100"
              key={movie.id}
            >
              <img
                className="h-full w-full rounded-3xl object-fill"
                src={process.env.REACT_APP_API_IMG_5 + movie.backdrop_path}
                alt={movie.title}
                loading="lazy"
              />
              <p
                className="legend"
                style={{
                  background: "#0c4a6e",
                }}
              >
                {movie.title}
              </p>
            </div>
          ))}
      </Carousel>
    </div>
  );
}

export default MoviesHeroSection;
