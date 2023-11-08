import { createContext, useContext, useState } from "react";

const Context = createContext();

export const useOption = () => useContext(Context);

const OptionProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState();
  const data = {
    selectedOption,
    setSelectedOption,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export default OptionProvider;

//Sıralama işlemleri için gerekli component iletişimi bu context aracılığı ile sağlanır.
