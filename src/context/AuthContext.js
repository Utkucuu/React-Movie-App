import { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export const useUser = () => useContext(Context);

const UserProvider = ({ children }) => {
  const [sessionHandle, setSessionHandle] = useState(
    localStorage.getItem("sessionHandle") || false,
  );

  const [user, setUser] = useState(
    sessionHandle === "true"
      ? JSON.parse(localStorage.getItem("activeUser"))
      : false,
  );

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
