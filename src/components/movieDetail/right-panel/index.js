import Team from "./Team";
import LineChart from "./LineChart";
import Keywords from "./Keywords";

function RightPanel() {
  console.log("MOVIE DETAIL RIGHT PANELL rendered");
  return (
    <div className="">
      <Team />

      <LineChart />

      <Keywords />
    </div>
  );
}

export default RightPanel;
