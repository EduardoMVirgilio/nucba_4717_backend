import { createContext, useState, useContext, useEffect } from "react";

const User = createContext(null);

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) {
      setToken(stored);
    }
  }, []);
  useEffect(() => {
    if (!token) return;
    localStorage.setItem("token", token);
    // const loadProfile = async () => {};
    // const loadOrders = async () => {};
    // loadProfile();
    // loadOrders();
  }, [token]);
  return (
    <User.Provider value={{ profile, token, setToken, orders, setOrders }}>
      {children}
    </User.Provider>
  );
};

const useUser = () => useContext(User);

export default useUser;
