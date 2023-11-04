import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useMovie } from "../../../context/SiteContext";
import LoadingAnimate from "../../loadingAnimate";

// Bu component temsili !!!!!!

// Chart.js özelliklerini veya eklentilerini etkinleştirmek için kullnılır.
Chart.register(...registerables);

const LineChart = () => {
  const state = useMovie();

  //API içinde, aylara göre oylama verileri şeklinde bir data bulamadım. Ben de çözüm olarak poster sayfasında kullandığım posterlerin vote_average verilerini alıp grafik içinde kullandım. X eksenine de ayları yazdım. Sağlıklı olmadı ancak aklımdaki görseli implement edebildim.
  const postersScore = state?.moviePosters?.data?.posters;

  const labels = ["January", "February", "March", "April", "May", "June"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Ortalama Oy",
        fill: false,
        backgroundColor: "rgb(186, 230, 253)",
        borderColor: "rgb(186, 230, 253)",
        data: [],
      },
    ],
  };

  // Bu fonksiyon posters içindeki vote_average puanlarını yukarıdaki boş data array ine gönderir ve y ekseni oluşur.
  postersScore?.forEach((element) => {
    data.datasets[0].data.push(element?.vote_average);
  });
  if (!postersScore) {
    return (
      <LoadingAnimate
        gradientId="myGradient611"
        color1={"#B1E3FC"}
        color2={"#22D1EE"}
        colorText={"text-sky-100"}
      />
    );
  }
  return (
    <div className="mt-10">
      <Line data={data} />
    </div>
  );
};

export default LineChart;
