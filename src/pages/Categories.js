import { useEffect, useRef, useState } from "react";
import { useOption } from "../context/SelectContext";
import { MovieServices } from "../services";
import { useBestMovie } from "../context/BestMoviesContext";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import CategoriesHeroSection from "../components/categories/heroSection";
import WindowViev from "../components/categories/leftPanel/WindowViev";
import BestMovies from "../components/movies/rightPanel/BestMovies";
import SortingTool from "../components/movies/rightPanel/SortingTool";
import SortDates from "../components/categories/rightPanel/SortDates";
import SortGenres from "../components/categories/rightPanel/SortGenres";
import MainTitleArea from "../components/movies/leftPanel/MainTitleArea";
import DetailView from "../components/categories/leftPanel/DetailView";
import SearchBar from "../components/search";
function Categories() {
  const { selectedOption } = useOption();
  const { setBestMovie } = useBestMovie();
  const [allMovies, setAllMovies] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState("Tüm Kategoriler");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedDates, setSelectedDates] = useState("Tüm Yıllar");
  const [dateIntervals, setDateIntervals] = useState([]);
  const [viewToggle, setViewToggle] = useState(true);
  const [genresTitle, setGenresTitle] = useState();

  const location = useLocation();

  //.map((id) => allMovies.find((item) => item.id === id)); şeklinde devam eden algoritma set içindeki id'leri tek tek map'ler ve allMovies içindeki filmlerin id değerleri ile karşılaştırır. Find işleminden true dönen değerler Array.from ile bir diziye dönüştürülmüş olur ve böylece uniqueMovies içerisinde her filmden 1 tane bulunması sağlanır.
  useEffect(() => {
    const axiosData = async () => {
      try {
        const moviesData = [];
        const genresData = await MovieServices.getMovieGenres();
        // location.pathname === "/categories" olduğunda aşağıdaki for döngüsü içinde 3 farklı kategoriye totalde 600 film alınacak şekilde istek yapılır ve promise.all yöntemiyle isteklerin tamamının sonuçlanması bekelenir.
        for (let index = 1; index <= 10; index++) {
          const [popularData, topRatedData, trendData] = await Promise.all([
            MovieServices.getPopulerMovies(index),
            MovieServices.getTopRated(index),
            MovieServices.getTrendDailyPage(index),
          ]);
          // Daha sonra istekler moviesData array'ine kullanıma uygun şekilde push'lanır.
          moviesData.push(
            popularData.data?.results,
            topRatedData.data?.results,
            trendData.data?.results,
          );
        }
        //push'lanan veriler birleştirilerek allMovies'e atanır böylece 600 kadar filmin bulunduğu tek bir dizi elde edilir.
        const allMovies = moviesData.flat();

        //uniqueMovies değişkeni tanımlanır. Bu değişkenin değerini belirlemek için; new.set() kullanılmasının sebebi set veri türü sadece benzersiz verileri barındıran bir koleksiyon oluşturmamızı sağlar. set fonksiyonu içinde sadece allMovies içindeki id değerleri map'lenir ve "new Set(allMovies.map((item) => item.id)),)" ifadesi allMovies içindeki id'leri barındıran ve aynı id lerin olmadığı bir koleksiyon oluşturur.
        const uniqueMovies = Array.from(
          new Set(allMovies.map((item) => item.id)),
        ).map((id) => allMovies.find((item) => item.id === id));

        //allMovies uniqueMovies ile güncellenir
        setAllMovies(uniqueMovies);

        //film türleri listesi id ve name şeklinde alınır ve movieGenres güncellenir.
        setMovieGenres(genresData.data?.genres);

        let best = [...uniqueMovies] || [];
        setBestMovie(best);

        setFilteredMovies(uniqueMovies);
      } catch (error) {
        console.error("API isteği hatası:", error);
      }
    };

    if (location.pathname === "/categories") {
      axiosData();
    }
  }, [setBestMovie]);

  //sortDates componentine props geçilmek için options oluşturulur. dateIntervals güncellenir. dateIntervals sortDates'e props geçildikten sonra map'lenir ve bu sayede getirilecek film yılları seçenekler şeklinde oluşur.
  useEffect(() => {
    const newDates = [];
    for (let index = 23; index >= 0; index--) {
      if (index === 0) {
        newDates.push({ key: index, value: "2000-2001" });
        newDates.push({ key: index, value: "2000 Öncesi" });
      } else {
        let decade = index < 10 ? "200" : "20";
        let nextDecade = index + 1 < 10 ? "200" : "20";

        newDates.push({
          key: index,
          value: `${decade}${index}-${nextDecade}${index + 1}`,
        });
      }
    }
    setDateIntervals(newDates);
  }, []);

  //selectedDates state'i seçilen film yılını tutar ve bu state te sortDates e props olarak gönderilir.
  const handleSelectedDates = (e) => {
    setSelectedDates(e.target.value);
  };

  //selectedGenres state'i seçilen film türlerini tutar ve sortGenres componentine e props olarak gönderilir. Bir film türü seçilirse getir butonuna basıldıktan sonra sayfa başlığını güncellemek için seçilen filmin ismi selectedTitle değişkenine alınır ve genresTitle güncellenir
  const handleSelectedGenres = (e) => {
    setSelectedGenres(e.target.value);

    let selectedTitle =
      e.target.options[e.target.selectedIndex].getAttribute("name");
    setGenresTitle(selectedTitle);
  };

  const titleRef = useRef();

  //Getir butonuna basıldıktan sonra handleFilter fonksiyonu tetiklenir.
  const handleFilter = () => {
    let filteredMovies = allMovies;

    let title = (genresTitle && genresTitle) || "Tüm Kategoriler";
    titleRef.current.innerText = title;

    //selectedGenred değeri tüm kategoriler değil ise bir id barındırıyor demektir. Bu id ye göre API' den gelen filmlerin içinde seçilen film türüne ait id aranır. Aynı id ye sahip olan filmler ile filteredMovies güncellenir, türe göre kategori getirme işlemi yapılmış olur.
    if (selectedGenres !== "Tüm Kategoriler") {
      const selectedGenreId = parseInt(selectedGenres);
      filteredMovies = filteredMovies.filter((item) =>
        item.genre_ids.some((genreId) => genreId === selectedGenreId),
      );
    }

    //Yıl seçimi 2000 öncesi ise filteredMovies içindeki yayın tarihi verileri (relase_date) filter metodu içinde sadece 1995 gibi ilk 4 karakteri içerecek şekilde alınır. Daha sonra releaseYear değişkenine gönderilip bu değişken return edilir ve filteredMovies 2000 öncesinde yayınlanan filmleri barındıracak şekilde güncellenmiş olur.
    if (selectedDates === "2000 Öncesi") {
      filteredMovies = filteredMovies.filter((item) => {
        const releaseYear = parseInt(item.release_date.substring(0, 4));
        return releaseYear < 2000;
      });
    }
    //selectedMovies tüm yıllara eşit değlse bir yıl seçilmiş demektir. Seçilen yıl selectedDates içinde tutulduğu için bu veriye göre bir başlangıç ve bitiş yılı aralığı oluşturulur.
    //Filmlerin yayın yılları releaseYear değişkenine atanır.
    /**return releaseYear >= startYear && releaseYear < endYear ifadesi, belirli bir film için o filmın yayın yılını releaseYear ile kontrol eder. Aynı zamanda kullanıcının seçtiği bir başlangıç yılı olan startYear ile ve bitiş yılı olan endYear ile karşılaştırır.
    Eğer film, bu aralığın içindeyse (veya başlangıç yılı dahil ve bitiş yılı hariç), bu ifade true değerini döndürür. Aksi takdirde, yani film bu aralığın dışındaysa, false değeri döner. Dolayısıyla, bu koşul "filteredMovies" dizisini etkiler. İfadenin true dönmesi, filmin belirtilen yıl aralığına uyduğu anlamına gelir ve bu film "filteredMovies" içinde kalır. İfadenin false dönmesi, filmin aralığın dışında olduğu anlamına gelir ve bu film "filteredMovies" dizisinden çıkarılır. */
    else if (selectedDates !== "Tüm Yıllar") {
      const [startYear, endYear] = selectedDates.split("-").map(Number);
      filteredMovies = filteredMovies.filter((item) => {
        const releaseYear = new Date(item.release_date).getFullYear(); //getFullYear fonksiyonu bir tarihin sadece yıl değerini döndürür.
        return releaseYear >= startYear && releaseYear < endYear;
      });
    }

    if (filteredMovies.length === 0) {
      alert("Aradığınız özellikte film bulunamadı...");

      return window.location.reload();
    }

    setFilteredMovies(filteredMovies);
  };

  useEffect(() => {
    let best = [...filteredMovies] || [];
    setBestMovie(best);
  }, [filteredMovies, selectedOption]);

  useEffect(() => {
    if (selectedOption === "1") {
      filteredMovies.sort((a, b) => b.vote_average - a.vote_average);
    }
    if (selectedOption === "2") {
      filteredMovies.sort((a, b) => b.popularity - a.popularity);
    }
    if (selectedOption === "3") {
      filteredMovies.sort((a, b) => b.vote_count - a.vote_count);
    }
    if (selectedOption === "4") {
      filteredMovies.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date),
      );
    }
  }, [selectedOption]);

  return (
    <>
      <Helmet>
        {" "}
        <title>Kategoriler</title>
      </Helmet>

      <div className="px-2  xl:px-0">
        <CategoriesHeroSection />
      </div>

      <div className="mx-auto flex  justify-center px-4  py-5 lg:hidden">
        <SearchBar />
      </div>

      <div className="divide flex gap-5 divide-x-2 dark:divide-cyan-200 ">
        {/* movie left panel */}
        <div className=" -mt-4 w-full px-3 lg:mt-10 lg:basis-3/4 lg:px-0 ">
          <div className="block lg:hidden">
            <BestMovies />

            <div className="mt-5 flex flex-col items-center justify-center pb-5 sm:flex-row ">
              <div className="pb-2 pe-0  sm:pb-0 sm:pe-2">
                <SortingTool />
              </div>

              <SortGenres
                selectedGenres={selectedGenres}
                movieGenres={movieGenres}
                handleSelectedGenres={handleSelectedGenres}
              />

              <SortDates
                selectedDates={selectedDates}
                dateIntervals={dateIntervals}
                handleSelectedDates={handleSelectedDates}
              />
              <button
                className="mt-2 rounded-lg border-2 border-sky-200 bg-gradient-to-b from-cyan-400 to-sky-900 px-4 font-semibold text-cyan-200 hover:bg-gradient-to-t hover:from-white hover:to-white dark:from-slate-950 dark:to-sky-900"
                onClick={handleFilter}
              >
                Getir
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border-b-2 dark:border-cyan-200 ">
            <h1
              className=" text-lg font-bold text-sky-900 dark:text-cyan-200 md:text-2xl"
              ref={titleRef}
            >
              Tüm Kategoriler
            </h1>

            <MainTitleArea
              viewToggle={viewToggle}
              setViewToggle={setViewToggle}
            />
          </div>
          {viewToggle ? (
            <div className="mt-4">
              {" "}
              <WindowViev allMovies={filteredMovies} />
            </div>
          ) : (
            <div className="mt-4">
              <DetailView allMovies={filteredMovies} genres={movieGenres} />
            </div>
          )}
        </div>

        {/* movie right panel */}
        <div className="mt-10 hidden flex-col space-y-4 pl-5 lg:block">
          <SortGenres
            selectedGenres={selectedGenres}
            movieGenres={movieGenres}
            handleSelectedGenres={handleSelectedGenres}
          />

          <SortDates
            selectedDates={selectedDates}
            dateIntervals={dateIntervals}
            handleSelectedDates={handleSelectedDates}
          />
          <button
            className="rounded-lg border-2 border-sky-200 bg-gradient-to-b from-cyan-400 to-sky-900 px-4 py-1 font-semibold text-cyan-200 hover:bg-gradient-to-t hover:from-white hover:to-white dark:from-slate-950 dark:to-sky-900"
            onClick={handleFilter}
          >
            Getir
          </button>

          <SortingTool />

          <BestMovies />
        </div>
      </div>
    </>
  );
}

export default Categories;
