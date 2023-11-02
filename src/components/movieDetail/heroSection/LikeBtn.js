import { useUser } from "../../../context/AuthContext";
import LikeIcon from "../../../assest/icons/LikeIcon";
function LikeBtn({ movieDetail, likeBtnStyle, setLikeBtnStyle }) {
  console.log(" MOVIE DETAIL HERO LIKE BTN rendered");
  const { user } = useUser();

  const handleLikeMovie = () => {
    if (user) {
      const activeUser = JSON.parse(localStorage.getItem("activeUser"));

      const movieAlreadyLiked = activeUser.userLikedMovies.some(
        (likedMovie) => likedMovie.id === movieDetail.id,
      );

      if (movieAlreadyLiked) {
        activeUser.userLikedMovies = activeUser.userLikedMovies.filter(
          (savedMovie) => savedMovie.id !== movieDetail.id,
        );
        localStorage.setItem("activeUser", JSON.stringify(activeUser));
        setLikeBtnStyle(false);
      } else {
        activeUser.userLikedMovies.push(movieDetail);
        localStorage.setItem("activeUser", JSON.stringify(activeUser));
        setLikeBtnStyle(true);
      }
    } else {
      alert("Beğenmek için üye olun");
    }
  };
  return (
    <>
      <button
        className={`group flex h-9 w-9 items-center justify-center rounded-full md:h-12 md:w-12 ${
          (likeBtnStyle && "bg-sky-200") || "bg-sky-900"
        }`}
        onClick={handleLikeMovie}
      >
        <LikeIcon likeBtnStyle={likeBtnStyle} />
      </button>
    </>
  );
}

export default LikeBtn;
