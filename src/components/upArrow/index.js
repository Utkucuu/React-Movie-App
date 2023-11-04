import MinLGArrow from "./MinLGArrow";
import MaxLGArrow from "./MaxLGArrow";
import { useMediaQuery } from "react-responsive";

function UpArrow() {
  console.log("UPARROW INDEX rendered");

  return (
    <>
      <MinLGArrow />
      <MaxLGArrow />
    </>
  );
}

export default UpArrow;
