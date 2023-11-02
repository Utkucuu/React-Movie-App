import { memo } from "react";
import FilmTapeIcon from "../../assest/icons/FilmTapeIcon";
function LoadingAnimate({ gradientId, color1, color2, colorText }) {
  console.log("LOADINGANIMATE rendered");
  return (
    <div className="flex items-end justify-center">
      <div className="h-20 w-20 animate-spin">
        <FilmTapeIcon gradientId={gradientId} color1={color1} color2={color2} />
      </div>
      <div className={`mb-3 font-bold ${colorText}`}>Yükleniyor...</div>
    </div>
  );
}

export default memo(LoadingAnimate);
