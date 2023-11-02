import { useState } from "react";
import { useMovie } from "../../../context/SiteContext";
import styles from "./styles.module.css";
import ArrowDown from "../../../assest/icons/ArrowDown";
import LoadingAnimate from "../../loadingAnimate";
function Team() {
  console.log("MOVIE DETAIL TEAM rendered");
  const state = useMovie();

  const movieCredits = state?.movieCredits?.data;
  const creditsCrew = movieCredits?.crew;

  const departmentsMap = {};

  creditsCrew?.forEach((element) => {
    const department = element.department;
    if (!departmentsMap[department]) {
      departmentsMap[department] = [];
    }
    departmentsMap[department].push(element);
  });

  // Açık olan departmanın indeksini saklayan bir state
  const [openDepartmentIndex, setOpenDepartmentIndex] = useState(-1);

  // Departmanı açma/kapama işlevi
  const toggleDepartment = (index) => {
    setOpenDepartmentIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };
  if (!departmentsMap) {
    return (
      <LoadingAnimate
        gradientId="myGradient572"
        color1={"#B1E3FC"}
        color2={"#22D1EE"}
        colorText={"text-sky-100"}
      />
    );
  }
  return (
    <>
      {/* credits right panel */}
      <div className="flex-col">
        <h3 className="ms-5 pb-4 text-2xl font-bold text-sky-900 shadow-2xl dark:text-white">
          Team
        </h3>

        <div className="">
          {departmentsMap &&
            Object.keys(departmentsMap).map((department, index) => (
              <div key={department}>
                {/* Departmanı açma/kapama butonu */}
                <div
                  onClick={() => {
                    toggleDepartment(index); // Departmanı açma/kapama işlevini çağır
                  }}
                  className="group ms-0 flex items-center justify-between rounded-md border-b-2 bg-gradient-to-r from-cyan-500 to-sky-900 p-2 text-center text-white hover:cursor-pointer dark:from-slate-950  dark:to-sky-900 lg:ms-4  "
                >
                  <span className="text-lg font-bold ">{department}</span>
                  <ArrowDown />
                </div>

                {/* departman içerik */}
                <div
                  className={`m-2 ms-0 space-y-4 overflow-y-scroll rounded-lg bg-opacity-30 bg-gradient-to-b from-cyan-400 to-sky-900  px-1 pt-1  dark:from-slate-950 dark:to-sky-900 lg:ms-4 ${
                    styles.teamScroll
                  } ${
                    openDepartmentIndex === index
                      ? "max-h-72 overflow-visible"
                      : "max-h-0 overflow-hidden"
                  } transition-all duration-500`}
                >
                  {departmentsMap[department].map((team) => (
                    <div
                      key={team.credit_id}
                      className="flex items-center rounded-lg border-2 border-sky-200 "
                    >
                      <div className="h-32 w-24 p-4">
                        <img
                          className="h-full w-full rounded-lg bg-sky-100 bg-opacity-30"
                          src={`${
                            process.env.REACT_APP_API_IMG_2 + team.profile_path
                          }`}
                          alt={team.name}
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-sky-100">{team.name}</p>
                        <p className="text-sky-200 ">{team.job}</p>
                        <p className="text-xs font-bold text-sky-200">
                          {team.department}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Team;
