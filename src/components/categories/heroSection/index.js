import { memo } from "react";
import { useMovie } from "../../../context/SiteContext";
import { useMediaQuery } from "react-responsive";
import CubeItem from "./CubeItem";
import ReactPlayer from "react-player";

function CategoriesHeroSection() {
  console.log("categoriesHERO rendered");

  const state = useMovie();

  const trendDaily = state?.trendDaily?.data?.results || [];

  const textTure1 = [];
  const textTure2 = [];
  const textTure3 = [];

  if (trendDaily.length > 0) {
    // 'length' yazım hatası düzeltildi
    trendDaily.slice(0, 6).forEach((e) => {
      textTure1.push(process.env.REACT_APP_API_IMG_5 + e.poster_path);
    });
  }

  trendDaily.slice(6, 12).forEach((e) => {
    textTure2.push(process.env.REACT_APP_API_IMG_5 + e.poster_path);
  });

  trendDaily.slice(12, 18).forEach((e) => {
    textTure3.push(process.env.REACT_APP_API_IMG_5 + e.poster_path);
  });

  const mobileS = useMediaQuery({ minWidth: 280, maxWidth: 475 });

  const mobileL = useMediaQuery({ minWidth: 425, maxWidth: 768 });
  const tablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  let width = "100%";
  let height = "1000px";
  if (tablet) {
    height = "900px";
  } else if (mobileL) {
    height = "800px";
    width = "120%";
  } else if (mobileS) {
    height = "780px";
    width = "120%";
  }

  return (
    // <div className="mx-auto mt-20 h-auto rounded-none bg-sky-100 bg-opacity-50 p-2 shadow-2xl shadow-sky-700 duration-500 md:rounded-3xl">
    //   <div className="mx-auto flex items-center justify-around rounded-2xl bg-opacity-10 bg-gradient-to-b from-cyan-400 to-sky-950 py-5">
    //     <div className="h-72">
    //       <CubeItem textTures={textTure1} />{" "}
    //     </div>
    //     <div className="h-72">
    //       <CubeItem textTures={textTure2} />
    //     </div>
    //     <div className="h-72">
    //       <CubeItem textTures={textTure3} />
    //     </div>
    //   </div>
    // </div>

    <div className="mx-auto mt-5 h-auto overflow-hidden rounded-xl bg-gradient-to-b  from-sky-400 to-sky-900 shadow-2xl shadow-sky-700 duration-500 lg:mt-10 ">
      <div
        className="mx-auto flex h-auto touch-auto items-center justify-around rounded-xl "
        style={{
          position: "relative",
        }}
      >
        <ReactPlayer
          url="https://www.youtube.com/watch?v=aWzlQ2N6qqg"
          playing={true}
          loop={true}
          muted={true}
          controls={false} // Kontrolleri kaldırmak istiyorsanız "false" yapın
          width={width}
          height={height}
          style={{
            position: "absolute",
            top: -300,
            left: 0,
          }}
          config={{
            youtube: {
              playerVars: { showinfo: 0, disablekb: 1 },
            },
          }}
        />

        <div className=" h-[180px] w-1/3 sm:h-[200px] md:h-[300px] lg:h-96 xl:h-100 ">
          <CubeItem textTures={textTure1} />
        </div>
        <div className=" h-[180px] w-1/3 sm:h-[200px] md:h-[300px] lg:h-96 xl:h-100">
          <CubeItem textTures={textTure2} />
        </div>
        <div className=" h-[180px] w-1/3 sm:h-[200px] md:h-[300px] lg:h-96 xl:h-100">
          <CubeItem textTures={textTure3} />
        </div>
      </div>
    </div>
  );
}
// Categories.js içinde bulunan useEffectin for döngüsü çalıştığında memo sayesinde bu component tekrar tekrar render olmuyor.
export default memo(CategoriesHeroSection);
