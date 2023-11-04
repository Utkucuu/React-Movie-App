import { createContext, useContext, useState } from "react";

const Context = createContext();

export const useToggle = () => useContext(Context);

// Bu component bir toggle state ini provide ediyorum. Çünkü farklı 2 component olan MobileNavbar ve Navbar componentlerinde toggle ın true-false durumuna göre bir iletişim sağlamam ve mobile ekranda navbar görünümünü ayarlamam gerekiyor.
// data ya 2  componenttren de ulaşabilmek için Header componentini NavToggleProvider ile sarmaladım ve  MobileNavbar ile Navbar içinde useToggle u kullanarak state i hem yönettim hem de componentler arasındaki iletişimi sağladım.

const NavToggleProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);

  const data = {
    toggle,
    setToggle,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export default NavToggleProvider;
