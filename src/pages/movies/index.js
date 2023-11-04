import { Outlet } from "react-router-dom";
import PageNav from "../../components/movies/leftPanel/PageNav";
import "../../App.css";
import SortingTool from "../../components/movies/rightPanel/SortingTool";
import MoviesHeroSection from "../../components/movies/heroSection/index";
import BestMovies from "../../components/movies/rightPanel/BestMovies";
import SearchBar from "../../components/search";
function MoviesLayout() {
  /* MoviesLayout componentini de outlet hale getirdim ve index true dediğim için AllMovies.js bu filmler e tıklandığında bu component ile birilkte render olacak.*/

  return (
    // movie container
    <div className="mx-auto">
      {/* <MoviesHero /> */}
      <MoviesHeroSection />
      {/* movie flex area */}

      <div className="mx-auto flex  justify-center px-4 pt-5 lg:hidden">
        <SearchBar />
      </div>

      <div className="divide flex gap-5 divide-x-2 dark:divide-cyan-200">
        {/* movie left panel */}
        <div className="px-3 lg:basis-3/4 lg:px-0">
          <PageNav />
          <div className="pb-6 lg:hidden">
            {" "}
            <div className="text-center">
              {" "}
              <SortingTool />
            </div>
            <BestMovies />
          </div>

          <Outlet />
        </div>

        {/* movie right panel */}
        <div className="mt-10 hidden flex-col pl-5 lg:block">
          {" "}
          <SortingTool />
          <BestMovies />
        </div>
      </div>
    </div>
  );
}

export default MoviesLayout;
