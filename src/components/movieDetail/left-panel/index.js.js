import AllActors from "./AllActors";
import LeadActors from "./LeadActors";
import Posters from "./Posters";

function LeftPanel() {
  console.log("MOVIEDETAİL LEFT PANEL rendered");
  return (
    <>
      <LeadActors />
      <AllActors />
      <Posters />

      <></>
    </>
  );
}

export default LeftPanel;
