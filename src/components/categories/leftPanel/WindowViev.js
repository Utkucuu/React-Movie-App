import { VGrid } from "virtua";
import { useHandleMovieClick } from "../../../utils/navigateDetail";
import { useMediaQuery } from "react-responsive";
import styleWindow from "./stylesWindow.module.css";
function WindowViev({ allMovies }) {
  const handleMovieClick = useHandleMovieClick();

  const isTabletOrMobile = useMediaQuery({ minWidth: 0, maxWidth: 768 });

  let col = 4;
  if (isTabletOrMobile) {
    col = 3;
  }

  return (
    <section className={`${styleWindow.itemClass}`}>
      <VGrid
        style={{
          height: "1000px",
          overflowX: "hidden",
          direction: "rtl",
        }}
        row={Math.ceil((allMovies.length && allMovies.length / col) || 20)}
        col={col}
      >
        {({ rowIndex, colIndex }) => (
          <article
            className={`p-1`}
            style={{
              height: "300",
            }}
          >
            {allMovies[rowIndex * 4 + colIndex] && (
              <figure
                className="group h-full w-56 cursor-pointer"
                onClick={() =>
                  handleMovieClick(
                    allMovies[rowIndex * 4 + colIndex].id,
                    allMovies[rowIndex * 4 + colIndex].title,
                  )
                }
              >
                <img
                  className=" -ms-3 h-full w-full rounded-lg object-cover md:-ms-6"
                  key={allMovies[rowIndex * 4 + colIndex].id}
                  src={
                    process.env.REACT_APP_API_IMG_2 +
                    allMovies[rowIndex * 4 + colIndex].poster_path
                  }
                  alt={allMovies[rowIndex * 4 + colIndex].title}
                  loading="lazy"
                />
              </figure>
            )}
          </article>
        )}
      </VGrid>
    </section>
  );
}

export default WindowViev;
