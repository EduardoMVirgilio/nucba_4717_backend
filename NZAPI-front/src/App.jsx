import { Outlet } from "react-router";
import { UserProvider } from "./context/useUser.jsx";
import { CartProvider } from "./context/useCart.jsx";
const App = () => {
  return (
    <>
      <UserProvider>
        <CartProvider>
          <Outlet />
        </CartProvider>
      </UserProvider>
    </>
  );
};

export default App;
