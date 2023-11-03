import { memo } from "react";
import FilmTapeIcon from "../../assest/icons/FilmTapeIcon";
function LoadingAnimate({ gradientId, color1, color2, colorText }) {
  console.log("LOADINGANIMATE rendered");
  return (
    <div className="flex items-center justify-center">
      <div className="h-10 w-10 animate-spin">
        <FilmTapeIcon gradientId={gradientId} color1={color1} color2={color2} />
      </div>
      <div className={`font-bold ${colorText}`}>Yükleniyor...</div>
    </div>
  );
}

export default memo(LoadingAnimate);
