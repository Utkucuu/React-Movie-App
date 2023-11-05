import React, { useEffect } from "react";
import TrendMovie from "../components/home/TrendMovie";
import SearchBar from "../components/search";
import HomeHeroSection from "../components/home/heroSection";
import Populer from "../components/home/populerMovie";
import TopRatedMovies from "../components/home/topRated";
import MovieUpComing from "../components/home/upComing";
import Footer from "../components/Footer";
function Home() {
  useEffect(() => {
    window.scrollTo(0, 0); // Sayfa yüklenirken en üstüne gitmek için
  }, []);
  return (
    <>
      <HomeHeroSection />
      <div className="mx-auto mt-10 flex justify-center px-4 lg:hidden">
        <SearchBar />
      </div>
      <Populer />
      <TrendMovie />
      <TopRatedMovies />
      <MovieUpComing />
      <Footer />
    </>
  );
}

export default React.memo(Home);
