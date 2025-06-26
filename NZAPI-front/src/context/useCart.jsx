import { createContext, useState, useContext, useEffect } from "react";

const Cart = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);
  return <Cart.Provider value={{ items, setItems }}>{children}</Cart.Provider>;
};

const useCart = () => useContext(Cart);

export default useCart;
