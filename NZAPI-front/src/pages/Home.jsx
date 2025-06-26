import Products from "../components/Products.jsx";
import Cart from "../components/Cart.jsx";
import useUser from "../context/useUser.jsx";

const Home = () => {
  const { token } = useUser();
  return (
    <>
      <Products />
      {token && <Cart />}
    </>
  );
};

export default Home;
