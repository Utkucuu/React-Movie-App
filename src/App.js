import { useRoutes } from "react-router-dom";
import routes from "./routes/route";
function App() {
  console.log(" APP JS rendered");

  return useRoutes(routes);
}

export default App;
