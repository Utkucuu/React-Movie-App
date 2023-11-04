const reducer = (prevState, action) => {
  switch (action.type) {
    case "":
      return {
        trendWeekly: action.trendWeekly,
        trendDaily: action.trendDaily,
        movieTrailer: action.movieTrailer,
        upComingMovies: action.upComingMovies,
      };
    case `detail`:
      return {
        movieDetail: action.movieDetail,
        movieTrailer: action.movieTrailer,
        movieCredits: action.movieCredits,
        moviePosters: action.moviePosters,
        movieKeywords: action.movieKeywords,
      };
    case "trend":
      return {
        trendWeekly: action.trendWeekly,
        trendDaily: action.trendDaily,
        movieGenres: action.movieGenres,
      };

    case "upcoming":
      return {
        upComingPage: action.upComingPage,
        movieGenres: action.movieGenres,
      };

    case "categories":
      return {
        trendDaily: action.trendDaily,
      };

    default:
      return prevState;
  }
};

export default reducer;
