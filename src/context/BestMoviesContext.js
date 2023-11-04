import { createContext, useContext, useState } from "react";

const Context = createContext();

export const useBestMovie = () => useContext(Context);

const BestProvider = ({ children }) => {
  const [bestMovie, setBestMovie] = useState();
  const data = {
    bestMovie,
    setBestMovie,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export default BestProvider;
