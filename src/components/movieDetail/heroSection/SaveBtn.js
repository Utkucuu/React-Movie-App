import { useUser } from "../../../context/AuthContext";
import SaveIcon from "../../../assest/icons/SaveIcon";

function SaveBtn({ movieDetail, saveBtnStyle, setSaveBtnStyle }) {
  const { user } = useUser();

  const handleSaveMovie = () => {
    if (user) {
      const activeUser = JSON.parse(localStorage.getItem("activeUser"));
      const movieAlreadySaved = activeUser.userSavedMovies.some(
        (savedMovie) => savedMovie.id === movieDetail.id,
      );

      if (movieAlreadySaved) {
        activeUser.userSavedMovies = activeUser.userSavedMovies.filter(
          (savedMovie) => savedMovie.id !== movieDetail.id,
        );
        localStorage.setItem("activeUser", JSON.stringify(activeUser));
        setSaveBtnStyle(false);
      } else {
        activeUser.userSavedMovies.push(movieDetail);
        localStorage.setItem("activeUser", JSON.stringify(activeUser));
        setSaveBtnStyle(true);
      }

      console.log(activeUser.userSavedMovies);
    } else {
      alert("kaydetmek için üye olun");
    }
  };
  return (
    <>
      <button
        className={`group flex h-9 w-9 items-center justify-center rounded-full md:h-12 md:w-12 ${
          (saveBtnStyle && "bg-sky-200") || "bg-sky-900"
        }`}
        onClick={handleSaveMovie}
      >
        {" "}
        <SaveIcon saveBtnStyle={saveBtnStyle} />
      </button>
    </>
  );
}

export default SaveBtn;
