import { useEffect, useState } from "react";
import { MovieServices } from "../../services";
import { useOption } from "../../context/SelectContext";
import { useBestMovie } from "../../context/BestMoviesContext";
import MainTitleArea from "../../components/movies/leftPanel/MainTitleArea";
import MoviesWindowView from "../../components/movies/leftPanel/MoviesWindowView";
import MoviesDetailView from "../../components/movies/leftPanel/MoviesDetailView";
import LoadingAnimate from "../../components/loadingAnimate";
import { Helmet } from "react-helmet";
function Populer() {
  //Sıralama filtresine veri gönderebilmek için
  const { selectedOption } = useOption();

  //API den gelen filmleri tutmak için
  const [populerMovies, setPopulerMovies] = useState([]);

  //API isteklerini belirleyen parametre olarak kullanılır
  const [pageId, setpageId] = useState(1);

  //Sayfanın iç görünümündeki düzeni değiştirebilmek için
  const [viewToggle, setViewToggle] = useState(true);

  //Scroll konumunu izlemek ve yönetebilmek için
  const [scrollState, setScrollState] = useState(0);

  const { setBestMovie } = useBestMovie();

  //Scroll konumunu takip edebilmek için
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    setScrollState(scrollY);
  });
  //Film türleri bu state içine gelir
  const [movieGenres, setMovieGenres] = useState();

  //Açıklama aşağıda
  useEffect(() => {
    let isMounted = true;
    const getMovies = async function (pageId) {
      try {
        const moviesResponse = await MovieServices.getPopulerMovies(pageId);

        const genresResponse = await MovieServices.getMovieGenres();

        if (isMounted) {
          const uniqueMovieIds = new Set(
            populerMovies.map((movie) => movie.id),
          );

          const newMovies = moviesResponse?.data?.results.filter(
            (movie) => !uniqueMovieIds.has(movie.id),
          );

          setPopulerMovies((prevMovies) => [...prevMovies, ...newMovies]);
          setMovieGenres(genresResponse?.data?.genres);
        }
      } catch (err) {
        console.error("API isteği hatası:", err);
      }
    };

    getMovies(pageId);
    return () => {
      isMounted = false;
    };
  }, [pageId]);

  //Scroll sayfa sonunu gördüğünde pageId arttırılır ve yeni filmler yüklenir, scroll'un pozisyonu değiştirilir.
  useEffect(() => {
    if (scrollState + 1 + windowHeight >= documentHeight) {
      setTimeout(() => {
        setpageId((prevPageId) => prevPageId + 1);

        window.scrollTo(0, scrollState - 400);
      }, 500);
    }
  }, [scrollState, pageId]);

  // SelectContext.js den selectedOption state'i alınır. sortingTool da bir değişiklik meydana gelirse selectedOption'daki değişiklik context sayesinde burada algılanır ve mevcut olarak gösterilmekte olan filmlerin sıralaması ilgili seçeceğe göre değiştirilir.
  useEffect(() => {
    if (selectedOption === "1") {
      populerMovies.sort((a, b) => b.vote_average - a.vote_average);
    }
    if (selectedOption === "2") {
      populerMovies.sort((a, b) => b.popularity - a.popularity);
    }

    if (selectedOption === "3") {
      populerMovies.sort((a, b) => b.vote_count - a.vote_count);
    }
    if (selectedOption === "4") {
      populerMovies.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date),
      );
    }
  }, [selectedOption]);

  //SortingTool altında meydana gelen selectedOption değişikliğine göre bestMovies state'i tekrar güncellenmelidir. Bu sebeple bestmoviesteki sıralama fonksiyonlarının ana veriyi etkilemesini önlemek amacıyla popülerMovies dizisi "spread operatörü" kullanılarak populerMovies'ten yeni bir dizi oluşacak şekilde kopyalanır ve BestMovies componentine, BestMoviesContext aracılığı ile sağlanır. BestMovies componentinde en ... olan veriler ayıklanır ve gösterime sunulur.
  useEffect(() => {
    const sortedMovies = [...populerMovies];
    setBestMovie(sortedMovies);
  }, [selectedOption, populerMovies]);

  return (
    <>
      <Helmet>
        {" "}
        <title>Popüler Filmler</title>
      </Helmet>
      <div className="border-spacing-16 border-b-2 dark:border-cyan-200">
        {" "}
        <MainTitleArea
          title={"Popüler Filmler"}
          viewToggle={viewToggle}
          setViewToggle={setViewToggle}
        />
      </div>

      <div>
        {viewToggle ? (
          <MoviesWindowView movies={populerMovies} />
        ) : (
          <MoviesDetailView movies={populerMovies} genres={movieGenres} />
        )}
      </div>

      <div className="my-10">
        <LoadingAnimate
          gradientId="myGradient222"
          color1={"#B1E3FC"}
          color2={"#22D1EE"}
          colorText={"text-sky-400"}
        />
      </div>
    </>
  );
}

export default Populer;

/*Bu kod, bir useEffect hook'u içinde tanımlanmış bir işlevi içerir ve sayfa yüklendiğinde veya belirli değişkenler (pageId) değiştikçe çalışır. İşte bu kodun satır satır çalışma mantığı:

let isMounted = true;: Bu satır, bir isMounted adlı bir değişken oluşturur ve başlangıçta true olarak ayarlar. Bu değişken, bileşenin hala etkin olup olmadığını izlemek için kullanılır. Böylece, bileşen etkin değilken asenkron işlemleri iptal etmek için kullanılabilir.

const getMovies = async function (pageId) {: getMovies adlı bir asenkron işlev oluşturur ve sayfa numarasını pageId olarak kabul eder.

try { ... }: Bir try bloğu başlar, bu blok içinde işlemler hataya duyarlı bir şekilde gerçekleştirilir.

const moviesResponse = await MovieServices.getPopulerMovies(pageId);: TMDB API'den popüler filmlerin verilerini almak için MovieServices.getPopulerMovies işlevini çağırır. Bu veriler moviesResponse değişkenine atanır.

const genresResponse = await MovieServices.getMovieGenres();: Aynı şekilde, film türlerinin verilerini almak için MovieServices.getMovieGenres işlevini çağırır ve bu veriler genresResponse değişkenine atanır.

if (isMounted) { ... }: Bu kontrol, bileşen hala etkinse işlemleri gerçekleştirir. isMounted değişkeni, bileşen herhangi bir deaktif edildiğinde false olarak ayarlanır.

const uniqueMovieIds = new Set( ... ): Önceden yüklenmiş filmlerin benzersiz kimliklerini saklamak için bir küme (Set) oluşturur.

const newMovies = moviesResponse?.data?.results.filter( ... ): API'den gelen yeni filmlerle mevcut filmleri karşılaştırır ve sadece daha önce yüklenmemiş olanları seçer. Bu filmler newMovies dizisine atanır.

setPopulerMovies((prevMovies) => [...prevMovies, ...newMovies]);: Mevcut popüler filmlerin sonuna yeni filmleri eklemek için setPopulerMovies işlevini çağırır. Önceki filmler ve yeni filmler birleştirilir.

setMovieGenres(genresResponse?.data?.genres);: Film türlerini setMovieGenres ile ayarlar.

return () => { isMounted = false; };: useEffect içindeki işlem tamamlandığında, bir temizleyici işlev (cleanup function) döner. Bu işlev, bileşen devre dışı bırakıldığında veya güncellenirken çalışır ve isMounted değişkenini false olarak ayarlar, böylece asenkron işlemler iptal edilir.

Sonuç olarak, bu kod parçası, sayfa numarasını ve veri alımını yöneten bir useEffect hook'u içerir. Yeni filmleri getirir, mevcut filmlerle karşılaştırır ve bunları günceller. Ayrıca, isMounted değişkeni sayesinde güvenli bir şekilde işlemleri iptal etme yeteneği sağlar, böylece bileşen deaktif edildiğinde hatalar oluşmaz. */
