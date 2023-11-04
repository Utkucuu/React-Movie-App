import { useMovie } from "../../../context/SiteContext";
import SwiperItem from "./SwiperItem";

function AllActors() {
  const state = useMovie();

  const movieCredits = state?.movieCredits?.data;

  // Diğer oyuncular
  const allActors = movieCredits?.cast?.filter((e) => e.popularity < 10);

  return (
    <div className="mt-5 p-4">
      <SwiperItem actors={allActors} title="Diğer Oyuncular" />
    </div>
  );
}

export default AllActors;
