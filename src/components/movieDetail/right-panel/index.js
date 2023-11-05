import Team from "./Team";
import LineChart from "./LineChart";
import Keywords from "./Keywords";

function RightPanel() {
  return (
    <aside className="">
      <Team />

      <LineChart />

      <Keywords />
    </aside>
  );
}

export default RightPanel;
