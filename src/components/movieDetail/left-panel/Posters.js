import { useEffect, useState } from "react";
import { useMovie } from "../../../context/SiteContext";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import styles from "./styles.module.css";
import ModalCloseICon from "../../../assest/icons/ModalCloseICon";
import LoadingAnimate from "../../loadingAnimate";

function Posters() {
  const state = useMovie();
  const posters = state?.moviePosters?.data?.posters || [];
  const logos = state?.moviePosters?.data?.logos || [];
  const backdrops = state?.moviePosters?.data?.backdrops || [];

  const allImages = [];
  const maxLength = Math.max(posters.length, logos.length, backdrops.length);

  for (let i = 0; i < maxLength; i++) {
    if (posters[i]) {
      allImages.push(posters[i]);
    }
    if (logos[i]) {
      allImages.push(logos[i]);
    }
    if (backdrops[i]) {
      allImages.push(backdrops[i]);
    }
  }

  const [isModal, setIsModalOpen] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState(null);

  const handlePosterClick = (e) => {
    setSelectedPoster(e.target.src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPoster(null);
  };

  useEffect(() => {
    document.addEventListener("click", deneme);
    function deneme(e) {
      if (isModal && e.target.id === "poster") {
        closeModal();
      }
    }
  }, [isModal]);

  return (
    <section className="p-4">
      <div className="mt-15 mx-auto mb-5 h-[280px] rounded-xl bg-sky-100 bg-opacity-5 px-2 shadow-xl shadow-sky-700  dark:bg-opacity-100 md:h-[425px]">
        <h3 className="pb-1 text-xl font-bold text-sky-900">Film Görselleri</h3>

        <div
          className={`border-xl mb-10  h-60 overflow-y-scroll rounded-xl bg-gradient-to-b from-cyan-400 to-sky-900  p-4 shadow-xl shadow-sky-200 dark:from-slate-950 dark:to-sky-900 md:h-96  ${styles.posterScroll}`}
        >
          {(allImages.length && (
            <ResponsiveMasonry
              // Hangi px ekranda kaç colon çalışacak aşağıda belirtirsin
              columnsCountBreakPoints={{ 350: 3, 750: 4 }}
            >
              <Masonry columnsCount={3} gutter="10px">
                {allImages.map((image, i) => (
                  <img
                    className="my-4 max-h-full cursor-pointer rounded-xl"
                    key={i}
                    src={`${process.env.REACT_APP_API_IMG_2}` + image.file_path}
                    onClick={(e) => handlePosterClick(e)}
                    loading="lazy"
                    alt={"poster"}
                  />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          )) || (
            <LoadingAnimate
              gradientId="myGradient5"
              color1={"#B1E3FC"}
              color2={"#22D1EE"}
              colorText={"text-sky-100"}
            />
          )}
        </div>

        {/* **************** modal section *************** */}
        {isModal && (
          <div
            className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-sky-400 bg-opacity-30"
            id="poster"
          >
            <div className="relative rounded-xl bg-sky-900 p-2 sm:p-8">
              {/* <span className="bg-red-200 absolute top-0 right-0"> x</span> */}
              <span onClick={closeModal}>
                {" "}
                <ModalCloseICon />
              </span>

              <img
                className="h-auto w-80 rounded-xl sm:w-96 lg:w-[400px]"
                src={selectedPoster}
                alt="Selected Poster"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Posters;
