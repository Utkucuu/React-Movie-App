import NavItem from "./NavItem";
import { useToggle } from "../../context/NavToggleContext";
import { useUser } from "../../context/AuthContext";
import { useMediaQuery } from "react-responsive";
function MobileMenu() {
  const { user, setUser } = useUser();

  const { toggle, setToggle } = useToggle();

  const screenW = useMediaQuery({ minWidth: 1024 });

  if (screenW && toggle === true) {
    setToggle(false);
  }

  // const [windowWidth, setwindowWidth] = useState(window.innerWidth);

  // const handleResize = () => {
  //   setwindowWidth(window.innerWidth);
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  // if (windowWidth >= 1024 && toggle === true) {
  //   setToggle(false);
  // }

  const handleLogout = () => {
    // Kullanıcı çıkış yaparken "local storage" üzerinden "users" dizisini al
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // "activeUser" değerini al
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));

    if (activeUser) {
      // "activeUser" ile aynı ID'ye sahip kullanıcıyı bul ve verilerini güncelle
      const updatedUsers = users.map((user) => {
        if (user.userId === activeUser.userId) {
          // Kullanıcının "isLoggedIn" değerini false yap
          activeUser.isLoggedIn = false;
          return activeUser; // Active kullanıcının verilerini döndür
        }
        return user;
      });

      // Güncellenmiş "users" dizisini "local storage" üzerine kaydet
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    // "activeUser" anahtarını "local storage"dan kaldır
    localStorage.removeItem("activeUser");

    // Kullanıcının oturumunu kapat
    localStorage.setItem("sessionHandle", false);
    setUser(false);
  };

  return (
    <nav className="relative mx-auto ">
      <div
        className={`absolute z-20 w-full flex-col space-y-4 bg-opacity-20 bg-gradient-to-b from-cyan-500 to-sky-900  p-4 dark:from-slate-950 dark:to-sky-900 ${
          toggle ? "h-auto opacity-100 duration-700" : " h-0 opacity-0 "
        }`}
      >
        <div
          className={`flex ${!toggle && "hidden"} pt-2`}
          onClick={() => {
            setToggle(false);
          }}
        >
          <NavItem className="flex" to="/">
            {" "}
            Anasayfa{" "}
          </NavItem>
        </div>

        <div
          className={`flex ${!toggle && "hidden"}`}
          onClick={() => {
            setToggle(false);
          }}
        >
          <NavItem to="movies">Filmler</NavItem>
        </div>
        <div
          className={`flex ${!toggle && "hidden"}`}
          onClick={() => {
            setToggle(false);
          }}
        >
          <NavItem to="categories"> Kategoriler</NavItem>
        </div>

        {user ? (
          <>
            <div
              className={`flex ${!toggle && "hidden"}`}
              onClick={() => {
                setToggle(false);
              }}
            >
              <NavItem to="profile">Profil</NavItem>
            </div>
            <div
              className={`flex ${!toggle && "hidden"} pb-2`}
              onClick={() => {
                setToggle(false);
                handleLogout();
              }}
            >
              <NavItem to="auth">Çıkış Yap</NavItem>
            </div>
          </>
        ) : (
          <div
            className={`flex ${!toggle && "hidden"} pb-4`}
            onClick={() => {
              setToggle(false);
            }}
          >
            <NavItem to="auth">Giriş yap</NavItem>
          </div>
        )}
      </div>
    </nav>
  );
}
export default MobileMenu;
