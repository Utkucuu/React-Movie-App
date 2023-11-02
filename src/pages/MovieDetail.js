import { useEffect } from "react";
import LeftPanel from "../components/movieDetail/left-panel/index.js";
import HeroSection from "../components/movieDetail/heroSection/index.js";
import RightPanel from "../components/movieDetail/right-panel/index.js";

function MovieDetail() {
  console.log(" PAGE MOVIE DETAİL rendered");

  useEffect(() => {
    window.scrollTo(0, 0); // Sayfa yüklenirken en üstüne gitmek için
  }, []);

  return (
    <>
      <HeroSection />
      <div className="mx-auto mt-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:divide-x-2">
          <div className="basis-5/4 w-full flex-col overflow-hidden ">
            {" "}
            <LeftPanel />
          </div>
          <div className="basis-1/5 flex-col ">
            {" "}
            <RightPanel />
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetail;
