import logo from "./logo.module.css";
import FilmTapeIcon from "../../assest/icons/FilmTapeIcon";
function Logo() {
  console.log("LOGO rendered");
  return (
    <div className="flex">
      <div className={`h-11 w-11 ${logo.slowSpin}`}>
        <FilmTapeIcon
          gradientId={"myGradient0"}
          color1={"#fff"}
          color2={"#55ADC7"}
        />
      </div>
    </div>
  );
}

export default Logo;
