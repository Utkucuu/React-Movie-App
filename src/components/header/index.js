import { memo } from "react";
import Navbar from "../navbar/Navbar";
import SearchBar from "../search";
import Logo from "../logo";
import DarkBtn from "../darkModeBtn";
import MobileMenu from "../navbar/MobileNavbar";
import ProfileIcon from "../../assest/icons/ProfileIcon";
import { Link } from "react-router-dom";
import { useUser } from "../../context/AuthContext";

function Header() {
  const { user, setUser } = useUser();

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

  //   const handleLogout = () => {
  // localStorage.setItem("sessionHandle", false);

  //     setUser(false);

  //   };

  // bg-gradient-to-b from-cyan-400 to-sky-900
  return (
    <header>
      <div className="relative mx-auto rounded-none bg-opacity-20 bg-gradient-to-b from-cyan-400 to-sky-900 p-4  dark:from-slate-950 dark:to-sky-900 lg:rounded-b-xl">
        <div className="flex items-center justify-around  lg:items-center lg:px-12 lg:pt-0 ">
          <Logo />
          <Navbar />
          <div className="ms-20 hidden w-80 justify-center text-center lg:flex">
            {/* SearcBar lg ve üstü ekran boyutlarında header içinde görünecek daha aşağıdaki boyutlarda page lerin içinde mobile menünün hemen altında görünecek. Bu sebeple yukarıdaki classları verdim. */}
            <SearchBar />
          </div>

          <div className="group relative hidden cursor-pointer lg:mr-4 lg:block">
            {" "}
            <ProfileIcon />
            <div className="absolute -left-4 top-10 z-40 hidden w-20 rounded-md border-2 bg-sky-900 p-1 text-center text-xs text-sky-200 group-hover:block ">
              {" "}
              {user ? (
                <>
                  <div className="border-b-2  pb-2 text-sm">
                    <Link to="/profile">Profil</Link>
                  </div>

                  <div className="mt-2 text-sm">
                    {" "}
                    <Link to="/" onClick={handleLogout}>
                      Çıkış Yap
                    </Link>
                  </div>
                </>
              ) : (
                <Link to="/auth"> Giriş Yap</Link>
              )}
            </div>
          </div>

          <div>
            <DarkBtn />
          </div>
        </div>
      </div>

      <MobileMenu />
    </header>
  );
}

export default memo(Header);
