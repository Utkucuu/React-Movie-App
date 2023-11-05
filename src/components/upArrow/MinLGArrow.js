import { useNavigate } from "react-router-dom";
import ArrowUp from "../../assest/icons/ArrowUp";
import CategoryIcon from "../../assest/icons/CategoryIcon";
import FilmIcon from "../../assest/icons/FilmIcon";
import HomeIcon from "../../assest/icons/HomeIcon";

function MinLGArrow() {
  const navigate = useNavigate();
  return (
    <nav className="group text-sky-200">
      <button
        className="fixed bottom-10 right-6 hidden h-10 w-10 items-center justify-center rounded-full bg-gradient-to-t from-cyan-400 to-sky-900 duration-500 hover:bg-gradient-to-b group-hover:right-[72px] group-hover:mb-16 lg:flex"
        onClick={() => navigate("/")}
      >
        <HomeIcon />
        <span className=" absolute top-10 p-1 text-[10px] font-bold text-sky-900 opacity-0 duration-500 group-hover:opacity-100 dark:text-sky-100">
          Anasayfa
        </span>
      </button>

      <button
        className="group fixed bottom-10 right-6 hidden h-10 w-10 items-center justify-center rounded-full bg-gradient-to-t from-cyan-400 to-sky-900 duration-500 hover:bg-gradient-to-b group-hover:mb-16 lg:flex"
        onClick={() => navigate("/movies")}
      >
        <FilmIcon />
        <span className=" absolute top-10 p-1 text-[10px] font-bold text-sky-900 opacity-0 duration-500 group-hover:opacity-100 dark:text-sky-100">
          Filmler
        </span>
      </button>

      <button
        className=" fixed bottom-10 right-6 z-20  hidden h-10 w-10 items-center justify-center rounded-full bg-gradient-to-t from-cyan-400 to-sky-900 hover:bg-gradient-to-b lg:flex"
        onClick={() => window.scrollTo(0, 0)}
      >
        <ArrowUp />
        <span className=" absolute top-10 p-1 text-[10px] font-bold text-sky-900 opacity-0 duration-500 group-hover:opacity-100 dark:text-sky-100 ">
          Yukarı
        </span>
      </button>

      <button
        className=" fixed bottom-10 right-6 hidden h-10 w-10 items-center justify-center rounded-full bg-gradient-to-t from-cyan-400 to-sky-900 duration-500 hover:bg-gradient-to-b group-hover:right-[72px] lg:flex "
        onClick={() => navigate("/categories")}
      >
        {" "}
        <CategoryIcon />
        <span className=" absolute top-10 p-1 text-[10px] font-bold text-sky-900 opacity-0 duration-500 group-hover:opacity-100 dark:text-sky-100">
          Kategoriler
        </span>
      </button>
    </nav>
  );
}

export default MinLGArrow;
