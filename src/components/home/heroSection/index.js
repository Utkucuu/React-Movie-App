import { useState, useEffect, useMemo } from "react";
import heroHome from "./heroHome.module.css";
import { MovieServices } from "../../../services";
import ReactPlayer from "react-player";
function HomeHeroSection() {
  const [heroTrailers, setHeroTrailers] = useState([]);

  useEffect(() => {
    const trailerArr = [76600, 385687, 667538, 57158, 693134, 299536];
    const trailerPromises = [];

    for (let i = 0; i < trailerArr.length; i++) {
      const trailerPromise = MovieServices.getTrailer(
        `movie/${trailerArr[i]}/videos`,
        "en-EN",
      );

      trailerPromises.push(trailerPromise);
    }
    // Promise.all fonksiyonu, bir dizi Promise nesnesini alır ve bu Promise'lerin hepsi tamamlandığında bir dizi sonuç döndüren bir Promise döndürür. Yani, bu fonksiyon, birden fazla asenkron işlemi eşzamanlı olarak yürütmek ve tüm işlemler tamamlandığında sonuçları almak için kullanılır.
    Promise.all(trailerPromises)
      .then((results) => {
        setHeroTrailers(results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const trailerLinks = useMemo(() => {
    return (
      heroTrailers &&
      heroTrailers.map(
        (e) => process.env.REACT_APP_API_TRAILER + e.data.results[0].key,
      )
    );
  }, [heroTrailers]);
  // avatar - hızlı ve öfkeli- transformers -hobbit- dune - yenilmezler  *
  const initialAnimationStyle = [
    {
      position: "absolute",
      width: "400px",
      height: "160px",
      transform: "matrix(1, 0, 0, 1.4, 0, 50)",
      transition: "transform 1s ease-in-out",
      zIndex: "10",
      boxShadow: "10px 0px 100px rgba(186, 230, 253, 0.8)",
    },
    {
      position: "absolute",
      width: "400px",
      height: "160px",
      transform: "matrix(0.7, -0.15, 0, 1.1, 370, 20)",
      transition: "transform 1s ease-in-out",
      zIndex: "10",
      boxShadow: "10px 0px 50px rgba(186, 230, 253, 0.8)",
      opacity: 0.8,
    },
    {
      position: "absolute",
      width: "400px",
      height: "160px",
      transform: "matrix(0.75, 0.1, 0, 0.8, 350, -80)",
      transition: "transform 1s ease-in-out",
      boxShadow: "10px 0px 50px rgba(186, 230, 253, 0.8)",
    },
    {
      position: "absolute",
      width: "400px",
      height: "160px",
      transform: "matrix(0.93, 0, 0, 0.7, 0, -110)",
      transition: "transform 1s ease-in-out",
      zIndex: "-1",
      boxShadow: "10px 0px 50px rgba(186, 230, 253, 0.8)",
    },
    {
      position: "absolute",
      width: "400px",
      height: "160px",
      transform: "matrix(0.75, -0.1, 0, 0.8, -350, -80)",
      transition: "transform 1s ease-in-out",
      boxShadow: "10px 0px 50px rgba(186, 230, 253, 0.8)",
    },
    {
      position: "absolute",
      width: "400px",
      height: "160px",
      transform: "matrix(0.7, 0.15, 0, 1.1, -370, 20)",
      transition: "transform 1s ease-in-out",
      zIndex: "10",
      boxShadow: "10px 0px 50px rgba(186, 230, 253, 0.8)",
      opacity: 0.8,
    },
  ];

  const [animationStyle, setAnimationStyle] = useState(initialAnimationStyle);
  const [animationPaused, setAnimationPaused] = useState(false); // Animasyonun durumu

  function shiftArray(arr) {
    const n = arr.length;
    const temp = arr[0];
    const newArray = [...arr];

    for (let i = 0; i < n - 1; i++) {
      newArray[i] = arr[i + 1];
    }

    newArray[n - 1] = temp;

    return newArray;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!animationPaused) {
        setAnimationStyle((prevStyle) => shiftArray(prevStyle));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [animationPaused]);

  // const trailerLinks = [];
  // heroTrailers.map((e) =>
  //   trailerLinks.push(
  //     process.env.REACT_APP_API_TRAILER + e.data.results[0].key,
  //   ),
  // );

  return (
    <div className="group mx-auto mt-5 rounded-xl bg-sky-100 bg-opacity-50 p-2 shadow-2xl shadow-sky-700 duration-500 dark:bg-opacity-100 lg:mt-10  ">
      <div
        className={`relative z-10 flex h-36 items-center justify-center rounded-xl bg-opacity-30 bg-gradient-to-b from-cyan-400 to-sky-950 duration-500 dark:from-slate-950 dark:to-sky-900 xs:h-48 sm:h-52  md:h-64 lg:h-96 `}
        onMouseEnter={() => setAnimationPaused(true)} // Fare bu alana girdiğinde animasyonu durdur
        onMouseLeave={() => setAnimationPaused(false)} // Fare bu alandan çıktığında animasyonu yeniden başlat
      >
        {trailerLinks &&
          animationStyle.map((style, index) => (
            <div
              className={`flex items-center justify-center overflow-hidden rounded-xl duration-500 group-hover:blur-sm ${heroHome.trailersResponsive} `}
              key={index}
              style={style}
            >
              <ReactPlayer
                url={trailerLinks[index % trailerLinks.length]}
                playing={true}
                loop={true}
                muted={true}
                controls={false}
                config={{
                  youtube: {
                    playerVars: { showinfo: 0, disablekb: 1 },
                  },
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default HomeHeroSection;
