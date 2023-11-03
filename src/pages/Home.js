// import React, { Suspense, lazy } from "react";

// const LazyTrendMovie = lazy(() => import("../components/home/TrendMovie"));
// const LazySearchBar = lazy(() => import("../components/search"));
// const LazyHomeHeroSection = lazy(() =>
//   import("../components/home/heroSection"),
// );
// const LazyPopuler = lazy(() => import("../components/home/populerMovie"));
// const LazyTopRatedMovies = lazy(() => import("../components/home/topRated"));
// const LazyMovieUpComing = lazy(() => import("../components/home/upComing"));

// function Home() {
//   console.log(" PAGE HOME rendered");

//   return (
//     <div>
//       <div className="mx-auto flex justify-center px-4 pt-10 lg:hidden">
//         <Suspense fallback={<div>Loading...</div>}>
//           <LazySearchBar />
//         </Suspense>
//       </div>
//       <Suspense fallback={<div>Loading...</div>}>
//         <LazyHomeHeroSection />
//         <LazyPopuler />
//         <LazyTrendMovie />
//         <LazyTopRatedMovies />
//         <LazyMovieUpComing />
//       </Suspense>
//     </div>
//   );
// }

// export default Home;

import React, { useEffect } from "react";
import TrendMovie from "../components/home/TrendMovie";
import SearchBar from "../components/search";
import HomeHeroSection from "../components/home/heroSection";
import Populer from "../components/home/populerMovie";
import TopRatedMovies from "../components/home/topRated";
import MovieUpComing from "../components/home/upComing";
function Home() {
  console.log("home rendered");
  useEffect(() => {
    window.scrollTo(0, 0); // Sayfa yüklenirken en üstüne gitmek için
  }, []);
  return (
    <>
      <HomeHeroSection />
      <div className="mx-auto mt-10  flex justify-center px-4 lg:hidden">
        <SearchBar />
      </div>
      <Populer />
      <TrendMovie />
      <TopRatedMovies />
      <MovieUpComing />
    </>
  );
}

export default React.memo(Home);
