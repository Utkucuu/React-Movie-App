// import { useNavigate } from "react-router-dom";
// import ArrowUp from "../../assest/icons/ArrowUp";
// import CategoryIcon from "../../assest/icons/CategoryIcon";
// import FilmIcon from "../../assest/icons/FilmIcon";
// import HomeIcon from "../../assest/icons/HomeIcon";
// import CircleIcon from "../../assest/icons/CircleIcon";
// import { useState } from "react";

// function MaxLGArrow() {
//   const navigate = useNavigate();

//   const [toggle, setToggle] = useState(true);

//   const handleBtnClick = () => {};

//   return (
//     <div className="group text-sky-200">
//       <button
//         style={{ zIndex: 100 }}
//         className={`group fixed bottom-10 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-t from-cyan-400 to-sky-900 duration-500 hover:bg-gradient-to-b group-hover:mb-64 lg:hidden `}
//         onClick={() => {
//           {
//             navigate("/");
//             handleBtnClick();
//           }
//         }}
//       >
//         <HomeIcon />
//         <span className=" absolute top-10 p-1 text-[10px] font-bold text-sky-900 opacity-0 duration-500 group-hover:opacity-70 dark:text-sky-100">
//           Anasayfa
//         </span>
//       </button>

//       <button
//         style={{ zIndex: 100 }}
//         className={`group fixed bottom-10 right-6  flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-t from-cyan-400 to-sky-900 duration-500 hover:bg-gradient-to-b group-hover:mb-48 lg:hidden `}
//         onClick={() => {
//           navigate("/movies");
//           handleBtnClick();
//         }}
//       >
//         <FilmIcon />
//         <span className=" absolute top-10 p-1 text-[10px] font-bold text-sky-900 opacity-0 duration-500 group-hover:opacity-70 dark:text-sky-100">
//           Filmler
//         </span>
//       </button>

//       <button
//         style={{ zIndex: 100 }}
//         className={` group fixed bottom-10 right-6  flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-t from-cyan-400 to-sky-900 duration-500 hover:bg-gradient-to-b group-hover:mb-32 lg:hidden `}
//         onClick={() => {
//           navigate("/categories");
//           handleBtnClick();
//         }}
//       >
//         {" "}
//         <CategoryIcon />
//         <span className=" absolute top-10 p-1 text-[10px] font-bold text-sky-900 opacity-0 duration-500 group-hover:opacity-70 dark:text-sky-100">
//           Kategoriler
//         </span>
//       </button>

//       <button
//         style={{ zIndex: 100 }}
//         className={`group fixed bottom-10 right-6  flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-t from-cyan-400 to-sky-900 duration-500 hover:bg-gradient-to-b group-hover:mb-16 lg:hidden `}
//         onClick={() => {
//           window.scrollTo(0, 0);
//           handleBtnClick();
//         }}
//       >
//         <ArrowUp />
//         <span className=" absolute top-10 p-1 text-[10px] font-bold text-sky-900 opacity-0 duration-500 group-hover:opacity-70 dark:text-sky-100">
//           Yukarı
//         </span>
//       </button>

//       <button
//         style={{ zIndex: 101 }}
//         className=" fixed bottom-10 right-6 flex  h-10 w-10 items-center justify-center rounded-full bg-gradient-to-t from-cyan-400 to-sky-900 hover:bg-gradient-to-b lg:hidden"
//         onClick={() => handleBtnClick()}
//       >
//         <CircleIcon />
//       </button>
//     </div>
//   );
// }

// export default MaxLGArrow;

import { useLocation, useNavigate } from "react-router-dom";
import ArrowUp from "../../assest/icons/ArrowUp";
import CategoryIcon from "../../assest/icons/CategoryIcon";
import FilmIcon from "../../assest/icons/FilmIcon";
import HomeIcon from "../../assest/icons/HomeIcon";
import CircleIcon from "../../assest/icons/CircleIcon";
import TrailerClose from "../../assest/icons/TrailerClose";
import { useEffect, useState } from "react";

function MaxLGArrow() {
  const location = useLocation();
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(false);

  const handleBtnClick = () => {
    if (toggle) {
      document.querySelectorAll(".mobileBtn").forEach((el, i = 1) => {
        el.classList.add(`mb-${16 * i}`);
        console.log(el);
      });
    } else {
      document
        .querySelectorAll(".mobileBtn")
        .forEach((el, i = 1) => el.classList.remove(`mb-${16 * i}`));
    }
    setToggle(!toggle);
  };

  // useEffect(() => {
  //   setToggle(false);
  // }, [location.pathname]);

  return (
    <div className="group text-sky-200">
      <button
        style={{ zIndex: 101 }}
        className=" mobileBtn fixed bottom-10 right-6 flex  h-10 w-10 items-center justify-center rounded-full bg-gradient-to-t from-cyan-400 to-sky-900 hover:bg-gradient-to-b lg:hidden"
        onClick={() => handleBtnClick()}
      >
        {(toggle && <CircleIcon />) || <TrailerClose />}
      </button>

      <button
        style={{ zIndex: 100 }}
        className={`mobileBtn group fixed bottom-10 right-6  flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-t from-cyan-400 to-sky-900 duration-500 hover:bg-gradient-to-b  lg:hidden `}
        onClick={() => {
          window.scrollTo(0, 0);
          handleBtnClick();
        }}
      >
        <ArrowUp />
        <span className=" absolute top-10 p-1 text-[10px] font-bold text-sky-900 opacity-0 duration-500 group-hover:opacity-100 dark:text-sky-100">
          Yukarı
        </span>
      </button>

      <button
        style={{ zIndex: 100 }}
        className={` mobileBtn group fixed bottom-10 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-t from-cyan-400 to-sky-900 duration-500 hover:bg-gradient-to-b  lg:hidden `}
        onClick={() => {
          navigate("/categories");
          handleBtnClick();
        }}
      >
        {" "}
        <CategoryIcon />
        <span className=" absolute top-10 p-1 text-[10px] font-bold text-sky-900 opacity-0 duration-500 group-hover:opacity-100 dark:text-sky-100">
          Kategoriler
        </span>
      </button>

      <button
        style={{ zIndex: 100 }}
        className={`mobileBtn group fixed bottom-10 right-6  flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-t from-cyan-400 to-sky-900 duration-500 hover:bg-gradient-to-b  lg:hidden `}
        onClick={() => {
          navigate("/movies");
          handleBtnClick();
        }}
      >
        <FilmIcon />
        <span className=" absolute top-10 p-1 text-[10px] font-bold text-sky-900 opacity-0 duration-500 group-hover:opacity-100 dark:text-sky-100">
          Filmler
        </span>
      </button>

      <button
        style={{ zIndex: 100 }}
        className={`mobileBtn group fixed bottom-10 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-t from-cyan-400 to-sky-900 duration-500 hover:bg-gradient-to-b lg:hidden `}
        onClick={() => {
          {
            navigate("/");
            handleBtnClick();
          }
        }}
      >
        <HomeIcon />
        <span className=" absolute top-10 p-1 text-[10px] font-bold text-sky-900 opacity-0 duration-500 group-hover:opacity-100 dark:text-sky-100">
          Anasayfa
        </span>
      </button>
    </div>
  );
}

export default MaxLGArrow;
