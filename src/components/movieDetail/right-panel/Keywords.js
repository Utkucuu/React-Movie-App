import { useMovie } from "../../../context/SiteContext";
import LoadingAnimate from "../../loadingAnimate";

function Keywords() {
  console.log("MOVIE DETAIL KEYWORD rendered");

  const state = useMovie();

  const keywords = state?.movieKeywords?.data?.keywords;

  if (!keywords) {
    return (
      <LoadingAnimate
        gradientId="myGradient621"
        color1={"#B1E3FC"}
        color2={"#22D1EE"}
        colorText={"text-sky-100"}
      />
    );
  }
  return (
    <>
      <div className="ms-3 mt-10 flex flex-wrap gap-4">
        {keywords &&
          keywords.map((e, i) => (
            <div
              key={e.id}
              className=" rounded-lg bg-sky-900 bg-gradient-to-r from-cyan-400 to-sky-900 p-2 text-center text-xs font-bold capitalize text-sky-100  "
            >
              {" "}
              {e.name}
            </div>
          ))}
      </div>
    </>
  );
}

export default Keywords;
