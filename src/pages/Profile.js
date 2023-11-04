import { useEffect, useState } from "react";
import { useUser } from "../context/AuthContext";
import { useHandleMovieClick } from "../utils/navigateDetail";
import ProfileIcon from "../assest/icons/ProfileIcon";
function Profile() {
  const { user } = useUser();
  const [userState, setUserState] = useState(null); // Başlangıçta null olarak ayarlayın

  useEffect(() => {
    if (user) {
      const activeUser = JSON.parse(localStorage.getItem("activeUser"));
      setUserState(activeUser);
    }
  }, [user]); // user bağımlılığını ekleyin

  const handleMovieClick = useHandleMovieClick();

  const removeLikedMovie = (id) => {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    // Kullanıcının beğenilen filmler listesini alın
    const likedMovies = activeUser.userLikedMovies;

    // İlgili filmin endeksini bulun
    const indexToRemove = likedMovies.findIndex((movie) => movie.id === id);

    if (indexToRemove !== -1) {
      // Eğer film bulunduysa, listeden kaldırın
      likedMovies.splice(indexToRemove, 1);

      // Güncellenmiş filmler listesini localStorage'e kaydedin
      activeUser.userLikedMovies = likedMovies;
      localStorage.setItem("activeUser", JSON.stringify(activeUser));

      // setState kullanarak bileşenin yeniden yüklenmesini tetikleyin
      setUserState({ ...userState, userLikedMovies: likedMovies });
    }
  };

  const removeSavedMovie = (id) => {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    // Kullanıcının kaydedilen filmler listesini alın
    const likedMovies = activeUser.userSavedMovies;

    // İlgili filmin endeksini bulun
    const indexToRemove = likedMovies.findIndex((movie) => movie.id === id);

    if (indexToRemove !== -1) {
      // Eğer film bulunduysa, listeden kaldırın
      likedMovies.splice(indexToRemove, 1);

      // Güncellenmiş filmler listesini localStorage'e kaydedin
      activeUser.userSavedMovies = likedMovies;
      localStorage.setItem("activeUser", JSON.stringify(activeUser));

      // setState kullanarak bileşenin yeniden yüklenmesini tetikleyin
      setUserState({ ...userState, userSavedMovies: likedMovies });
    }
  };

  return (
    <div className="dark:to-dark mx-auto mt-10 rounded-lg bg-gradient-to-b from-cyan-400 to-sky-900 pb-20 dark:from-black">
      <div className="flex flex-col text-white dark:text-sky-300">
        <div className="border-sky-white mx-auto mt-10 w-fit flex-col space-x-2 divide-y-2 rounded-lg border-4 p-2 text-center dark:border-sky-100">
          <div className=" flex flex-col items-center">
            <span className="border-b-2">
              <ProfileIcon color={"dark:stroke-sky-300 stroke-sky-100"} />
            </span>

            <div>Kullanıcı Adı: {userState?.username}</div>
          </div>

          <div>Email: {userState?.email}</div>
        </div>

        <div className="flex-col ps-4">
          <h3 className="mt-4 text-2xl font-bold text-white">
            Beğendiğiniz Filmler
          </h3>
          <div className="relative overflow-hidden">
            <div className="flex h-[420px] space-x-6 overflow-x-auto">
              {userState?.userLikedMovies.reverse().map((e) => (
                <div
                  className="group relative z-0 cursor-pointer pt-4  text-center"
                  key={e.id}
                >
                  <img
                    className="h-96 w-60 rounded-xl object-cover"
                    src={`${process.env.REACT_APP_API_IMG_5 + e.poster_path}`}
                    alt={e.title}
                    loading="lazy"
                  />
                  <div className="absolute bottom-5 -z-20 flex w-full flex-col space-y-2 opacity-80 duration-500 group-hover:bottom-10 group-hover:z-0 group-hover:opacity-100">
                    <span className="line-clamp-1 bg-sky-800 font-bold text-white">
                      {e.title}
                    </span>
                    <span className="w-0 border-b-2 duration-1000 ease-in group-hover:w-full"></span>
                    <button
                      className="rounded-md border-2 border-white bg-blue-600 px-2 py-1 text-sm text-white hover:border-blue-600 hover:bg-white hover:text-blue-600"
                      onClick={() => handleMovieClick(e.id, e.title)}
                    >
                      İncele
                    </button>

                    <button
                      className="rounded-md border-2 border-white bg-red-600 px-2 py-1 text-sm text-white hover:border-red-600 hover:bg-white hover:text-red-600"
                      onClick={() => removeLikedMovie(e.id)}
                    >
                      Kaldır
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden md:block">
              <div
                className={`absolute right-0 top-4 h-96 w-28 bg-gradient-to-r from-transparent to-white dark:to-black ${
                  userState?.userLikedMovies.length > 4 ? "block" : "hidden"
                } `}
              ></div>
            </div>
          </div>
          {/* /**************************************** */}
          <h3 className="mt-10 text-2xl font-bold text-white">
            Daha Sonra İzle
          </h3>
          <div className="relative overflow-hidden">
            <div className="flex h-[420px] space-x-6 overflow-x-auto">
              {userState?.userSavedMovies.reverse().map((e) => (
                <div
                  className="group relative z-0 cursor-pointer pt-4  text-center"
                  key={e.id}
                >
                  <img
                    className="h-96 w-60 rounded-xl object-cover"
                    src={`${process.env.REACT_APP_API_IMG_5 + e.poster_path}`}
                    alt={e.title}
                    loading="lazy"
                  />
                  <div className="absolute bottom-5 -z-20 flex w-full flex-col space-y-2 opacity-0 duration-500 group-hover:bottom-10 group-hover:z-0 group-hover:opacity-100">
                    <span className="line-clamp-1 bg-sky-800 font-bold text-white">
                      {e.title}
                    </span>
                    <span className="w-0 border-b-2 duration-1000 ease-in group-hover:w-full"></span>
                    <button
                      className="rounded-md border-2 border-white bg-blue-600 px-2 py-1 text-sm text-white hover:border-blue-600 hover:bg-white hover:text-blue-600"
                      onClick={() => handleMovieClick(e.id, e.title)}
                    >
                      İncele
                    </button>

                    <button
                      className=" rounded-md border-2 border-white bg-red-600 px-2 py-1 text-sm text-white hover:border-red-600 hover:bg-white hover:text-red-600"
                      onClick={() => removeSavedMovie(e.id)}
                    >
                      Kaldır
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden md:block">
              <div
                className={`absolute right-0 top-4 h-96 w-28 bg-gradient-to-r from-transparent to-white dark:to-black ${
                  userState?.userSavedMovies.length > 4 ? "block" : "hidden"
                } `}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
