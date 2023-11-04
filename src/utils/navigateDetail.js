import { generatePath, useNavigate } from "react-router-dom";

export function useHandleMovieClick() {
  const navigate = useNavigate();
  const handleMovieClick = (movieId, movieTitle) => {
    const title = movieTitle.replace(/:/g, "").replace(/\s+/g, "-");
    const path = generatePath("/detail/:id/:name", {
      id: movieId,
      name: title,
    });

    navigate(path);
  };

  return handleMovieClick;
}
/** navigate i de kullanabilmek için custom hook olarak çıkardım. */
