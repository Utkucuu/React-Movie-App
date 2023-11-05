import logo from "./logo.module.css";
import FilmTapeIcon from "../../assest/icons/FilmTapeIcon";
import { Link } from "react-router-dom";
function Logo() {
  return (
    <div className="flex">
      <Link to="">
        <div className={`h-11 w-11 ${logo.slowSpin}`}>
          <FilmTapeIcon
            gradientId={"myGradient0"}
            color1={"#fff"}
            color2={"#55ADC7"}
          />
        </div>
      </Link>
    </div>
  );
}

export default Logo;
