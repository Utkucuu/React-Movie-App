import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./style.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import LoadingAnimate from "../../loadingAnimate";

function SwiperItem({ actors, title }) {
  return (
    <div className="mx-auto h-auto rounded-xl bg-sky-100 bg-opacity-5 px-2 pb-2 shadow-xl shadow-sky-700 dark:bg-opacity-100 ">
      <h3 className="pb-1 text-lg font-bold text-sky-900 sm:text-xl ">
        {title}
      </h3>
      <Swiper
        style={{}}
        // install Swiper modules
        className="h-auto rounded-xl bg-gradient-to-b from-cyan-400 to-sky-900 shadow-xl shadow-sky-200  dark:from-slate-950 dark:to-sky-900 "
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerGroup={2}
        slidesPerView={2}
        breakpoints={{
          475: {
            slidesPerView: 3, // 2 kart göster
            slidesPerGroup: 3,
          },
          // Ekran genişliği 768px ve altındaysa
          640: {
            slidesPerView: 5, // 3 slayt göster
            slidesPerGroup: 5,
          },
        }} // Her tıklamada 5 slayt kayacak
        navigation
        // pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {(actors &&
          actors.map((a) => (
            <SwiperSlide key={a.id} className="-mt-4 px-2 sm:-mt-3 md:-mt-2">
              <div className="flex h-full w-full flex-col justify-end overflow-hidden rounded-lg border-2 border-sky-200">
                <div className=" border-b-2 border-sky-200 ">
                  {(a.profile_path && (
                    <img
                      className="h-full w-full object-cover"
                      src={`${
                        process.env.REACT_APP_API_IMG_2 + a.profile_path
                      }`}
                      alt={`${a.name} - ${a.character}`}
                      loading="lazy"
                    />
                  )) || (
                    <div className="animate-pulse bg-cyan-600 text-center text-xs font-bold text-white xs:text-sm">
                      Fotoğraf Eklenmedi
                    </div>
                  )}
                </div>
                <div className="bg-opacity-50 p-2">
                  <p className=" whitespace-nowrap  text-xs text-sky-100 md:text-sm">
                    {a.name}
                  </p>
                  <p className=" whitespace-nowrap text-xs font-bold text-sky-100">
                    {" "}
                    {/* regex ile #4 gibi string ekleri kaldırdım */}
                    {a.character.replace(/#.*$/, "")}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))) || (
          <LoadingAnimate
            gradientId="myGradient2"
            color1={"#B1E3FC"}
            color2={"#22D1EE"}
            colorText={"text-sky-100"}
          />
        )}
      </Swiper>
    </div>
  );
}

export default SwiperItem;
