import { createContext, useContext, useReducer, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MovieServices } from "../services";

import reducer from "../reducer/movieReducer";

const Context = createContext();

export const useMovie = () => useContext(Context);

let initialState = {
  movies: null, // Başlangıçta null
  trendDaily: null,
  trendWeekly: null,
  movieDetail: null,
  movieTrailer: null,
  movieCredits: null,
  movieKeywords: null,
  movieGenres: null,
  upComingMovies: null,
  upComingPage: null,
};

const MovieProvider = ({ children }) => {
  const location = useLocation();
  const pathPart = location.pathname.split("/");
  const path = pathPart[1];
  const id = pathPart[2];
  const pageId = pathPart[4];

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const axioshData = async () => {
      let payload;
      let trendDaily;
      let trendWeekly;
      let movieDetail;
      let movieTrailer;
      let movieCredits;
      let moviePosters;
      let movieKeywords;
      let movieGenres;
      let upComingMovies;
      let upComingPage;

      // let populerMovies;

      //pathPart[1] movies e eşit değiil ise anasayfada ya da detail sayfasındayız ve detail sayfasındaysak pathPart[2] değeri bir id olacak. Bunu da detail sayfasında tıklanan film için kullanacağım.
      //Eğer filmler sayfasındaysak pathPart[2] değeri trend, upcoming gibi bir değer almış olacak yani o path e göre tıklama yapıldığında istek atıp veri çekmiş olacağım.
      switch (pathPart[1] !== "movies" ? pathPart[1] : pathPart[2]) {
        case "":
          payload = await MovieServices.getTrendMoviesDaily();
          trendDaily = payload;
          payload = await MovieServices.getTrendMoviesdWeekly();
          trendWeekly = payload;
          payload = await MovieServices.getUpComing();
          upComingMovies = payload;
          break;
        case "trend":
          if (pageId) {
            payload = await MovieServices.getTrendDailyPage(pageId);
            trendDaily = payload;
            payload = await MovieServices.getTrendWeeklyPage(pageId);
            trendWeekly = payload;
            payload = await MovieServices.getMovieGenres();
            movieGenres = payload;
          } else {
            payload = await MovieServices.getTrendMoviesDaily();
            trendDaily = payload;
            payload = await MovieServices.getTrendMoviesdWeekly();
            trendWeekly = payload;
            payload = await MovieServices.getMovieGenres();
            movieGenres = payload;
          }

          break;
        // categories herosection cubeItem görseller
        case "categories":
          payload = await MovieServices.getTrendMoviesDaily();
          trendDaily = payload;

          break;

        case "upcoming":
          payload = await MovieServices.getUpComingPage(pageId);

          upComingPage = payload;

          payload = await MovieServices.getMovieGenres();
          movieGenres = payload;
          break;

        case `detail`:
          // tıklanan filmin kendisi
          payload = await MovieServices.getMovieDetail(`movie/${id}`);
          movieDetail = payload;
          //tıklanan filmin fragmanı
          payload = await MovieServices.getTrailer(`movie/${id}/videos`);
          movieTrailer = payload;
          // tıklanan filmin oyuncuları ve ekibi
          payload = await MovieServices.getMovieCredits(`movie/${id}/credits`);
          movieCredits = payload;
          // tıklanan filmin görselleri
          payload = await MovieServices.getMoviePosters(
            `movie/${id}/images`,
            "en",
          );
          moviePosters = payload;

          payload = await MovieServices.getMovieKeywords(
            `movie/${id}/keywords`,
          );
          movieKeywords = payload;

          break;
        default:
          payload = null;
      }

      dispatch({
        type: pathPart[1] !== "movies" ? pathPart[1] : pathPart[2],
        payload: payload,
        trendDaily: trendDaily,
        trendWeekly: trendWeekly,
        movieDetail: movieDetail,
        movieTrailer: movieTrailer,
        movieCredits: movieCredits,
        moviePosters: moviePosters,
        upComingMovies: upComingMovies,
        movieKeywords: movieKeywords,
        movieGenres: movieGenres,
        upComingPage: upComingPage,
      });
    };

    axioshData();
    // }, [path, id, pageId]);
  }, [path, id, pageId]);

  const data = {
    ...state,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export default MovieProvider;
