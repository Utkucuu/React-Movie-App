import { createContext, useContext, useState } from "react";

const Context = createContext();

export const useOption = () => useContext(Context);

const OptionProvider = ({ children }) => {
  console.log("SELECTED CONTEXT rendered");
  const [selectedOption, setSelectedOption] = useState();
  const data = {
    selectedOption,
    setSelectedOption,
  };
  console.log(selectedOption);
  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export default OptionProvider;
