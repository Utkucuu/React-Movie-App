import WindowViewIcon from "../../../assest/icons/WindowViewIcon";
import ListViewIcon from "../../../assest/icons/ListViewIcon";

function MainTitleArea({
  title,
  viewToggle,
  setViewToggle,
  showMoviesDaily,
  showMoviesWeekly,
  toggle,
}) {
  console.log("MOVIES MAIN TITLE AREA rendered");
  return (
    <div className="flex items-center justify-between space-x-4 pb-2 text-center text-lg font-bold text-sky-900">
      <div className="">
        <h1 className="text-lg dark:text-cyan-400 sm:text-lg md:text-2xl">
          {title}
        </h1>
      </div>

      {showMoviesDaily && showMoviesWeekly ? (
        <div className="w-16 space-x-0 text-[10px] dark:text-cyan-400 xs:w-auto xs:space-x-4 xs:text-xs sm:text-lg">
          <button
            className={`${toggle && "underline"}`}
            onClick={showMoviesDaily}
          >
            Bugün
          </button>
          <button
            className={`${!toggle && "underline"}`}
            onClick={showMoviesWeekly}
          >
            Bu Hafta
          </button>
        </div>
      ) : (
        false
      )}

      <div className="flex items-center gap-x-2 sm:gap-x-5">
        <div className="group relative">
          <span className="absolute -left-2 -top-9 mt-2 rounded-md bg-sky-800 p-1 text-xs font-thin tracking-wider text-cyan-200 opacity-0 duration-500 group-hover:opacity-100">
            Pencere
          </span>
          <button
            className={`rounded-md text-sky-200 ${
              (viewToggle &&
                "bg-gradient-to-b from-cyan-400 to-sky-900 p-1 dark:from-cyan-600") ||
              "bg-gradient-to-b from-sky-900 to-cyan-400 p-1.5 dark:to-cyan-600"
            }`}
            onClick={() => setViewToggle(true)}
            // title="Pencere"
          >
            <WindowViewIcon />
          </button>
        </div>
        <div className="group relative">
          <span className="absolute -right-1 -top-9 mt-2 rounded-md bg-sky-800 p-1 text-xs font-thin tracking-wider text-cyan-200 opacity-0 duration-500 group-hover:opacity-100">
            Detay
          </span>
          <button
            className={`rounded-md text-sky-200  ${
              (!viewToggle &&
                "bg-gradient-to-b from-cyan-400 to-sky-900 p-1 dark:from-cyan-600") ||
              "bg-gradient-to-b from-sky-900 to-cyan-400 p-1.5 dark:to-cyan-600"
            } `}
            onClick={() => setViewToggle(false)}
            // title="Detay"
          >
            {" "}
            <ListViewIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainTitleArea;
