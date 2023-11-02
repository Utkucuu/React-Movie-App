import { get } from "./Request";

export const getTrendMoviesDaily = () => get("trending/movie/day");

export const getTrendMoviesdWeekly = () => get("trending/movie/week");

export const getMovieGenres = () => get("genre/movie/list");

export const getTrendDailyPage = (page) =>
  get(`trending/movie/day`, false, page);

export const getTrendWeeklyPage = (page) =>
  get(`trending/movie/week`, false, page);

export const getMovieDetail = (url) => get(url);

export const getTrailer = (url) => get(url);

export const getMovieCredits = (url) => get(url);

export const getMoviePosters = (url, language) => get(url, language);

export const getMovieKeywords = (url) => get(url);

export const getPopulerMovies = (page) => get(`movie/popular`, false, page); // hatadan sonra eklendi
// export const getPopulerMovies = (pageId) =>
//   get(`movie/popular/?&page=${pageId}`);

export const getTopRated = (page) => get(`movie/top_rated`, false, page); // hatadan sonra eklendi
// export const getTopRated = (pageId) => get(`movie/top_rated/?&page=${pageId}`);

// export const getUpComingPage = (pageId) =>
//   get(`movie/upcoming/?&page=${pageId}`);
export const getUpComingPage = (page) => get(`movie/upcoming`, false, page);

export const getUpComing = () => get(`movie/upcoming`);

console.log(" SERVICES GETMOVIE rendered");
