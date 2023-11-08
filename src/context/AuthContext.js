import { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export const useUser = () => useContext(Context);

const UserProvider = ({ children }) => {
  //Kullanıcı açık mı kapalı mı sessionHandle state'i üzerinden kontrol edilir.
  const [sessionHandle, setSessionHandle] = useState(
    localStorage.getItem("sessionHandle") || false,
  );
  // Oturum açıksa kullanıcı user state'ine atanır, değilse user false değerini alır.
  const [user, setUser] = useState(
    sessionHandle === "true"
      ? JSON.parse(localStorage.getItem("activeUser"))
      : false,
  );
  //UI tarafının kulanıcı durumuna göre değişebilmesi için kullanıcının oturum bilgilerini alarak oturumun yeniden oluşturulması sağlanır.
  useEffect(() => {
    localStorage.getItem("sessionHandle") === "true"
      ? setUser(JSON.parse(localStorage.getItem("activeUser")))
      : setUser(false);
  }, []);

  const data = {
    user,
    setUser,
    sessionHandle,
    setSessionHandle,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export default UserProvider;
