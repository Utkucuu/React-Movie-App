import { useMovie } from "../../../context/SiteContext";
import SwiperItem from "./SwiperItem";

function LeadActors() {
  const state = useMovie();

  const movieCredits = state?.movieCredits?.data;

  // başrol oyuncuları bu değişkende populerlik parametresine göre filtrelenir ve jsx içinde kullanılır.
  let leadingActors = movieCredits?.cast?.filter((e) => e.popularity > 10);

  if (!leadingActors || leadingActors.length === 0) {
    // leadingActors boş veya undefined ise veya boş bir dizi ise, popularity değeri 4'ten büyük olanlar
    leadingActors = movieCredits?.cast?.filter((e) => e.popularity >= 4);
  }

  // Diğer oyuncular

  return (
    <div className="px-4">
      <SwiperItem actors={leadingActors} title={"Başrol"} />
    </div>
  );
}

export default LeadActors;
