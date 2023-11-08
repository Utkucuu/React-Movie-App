import { useUser } from "../../../context/AuthContext";
import LikeIcon from "../../../assest/icons/LikeIcon";
function LikeBtn({ movieDetail, likeBtnStyle, setLikeBtnStyle }) {
  const { user } = useUser();

  //film detay sayfasında like butonuna basıldığında handleLikeMovie fonksiyonu tetiklenir
  const handleLikeMovie = () => {
    // like butonuna basıldığında aktif bir kullanıcı var mı yok mu kontrol edilir.
    if (user) {
      //kullanıcı varsa local storage dan kullanıcı verileri alınır.
      const activeUser = JSON.parse(localStorage.getItem("activeUser"));
      //kullanıcının beğeni verileri alınır ve bu veriler içinde beğenilen film id'si aranır.
      const movieAlreadyLiked = activeUser.userLikedMovies.some(
        (likedMovie) => likedMovie.id === movieDetail.id,
      );

      //film id'si varsa filter fonksiyonu "likedMovie.id !== movieDetail.id" script'inde, koşula bağlı olarak likedMovie nesnesinin id özelliğinin, şu an işlenen movieDetail nesnesinin id özelliğiyle eşleşmediği durumları seçer. Yani, bu ifade, şu an işlenen movieDetail nesnesi ile aynı id'ye sahip olan filmleri hariç tutar. Böylece activeUser.userLikedMovies objesi güncellenir ve incelenen sayfadaki film kullanıcı beğeni listesinden çıkarılmış olur.
      if (movieAlreadyLiked) {
        activeUser.userLikedMovies = activeUser.userLikedMovies.filter(
          (likedMovie) => likedMovie.id !== movieDetail.id,
        );
        //local güncellenir
        localStorage.setItem("activeUser", JSON.stringify(activeUser));
        setLikeBtnStyle(false);
      }
      // film daha önce beğenilmemiş demektir ve beğenme işlemi yapılır.
      else {
        activeUser.userLikedMovies.push(movieDetail);
        localStorage.setItem("activeUser", JSON.stringify(activeUser));
        setLikeBtnStyle(true);
      }
    } else {
      alert("Beğenmek için üye olun");
    }
  };
  return (
    <>
      <button
        className={`group flex h-9 w-9 items-center justify-center rounded-full md:h-12 md:w-12 ${
          (likeBtnStyle && "bg-sky-200") || "bg-sky-900"
        }`}
        onClick={handleLikeMovie}
      >
        <LikeIcon likeBtnStyle={likeBtnStyle} />
      </button>
    </>
  );
}

export default LikeBtn;
