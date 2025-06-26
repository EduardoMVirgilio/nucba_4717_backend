import Products from "../components/Products.jsx";
import Cart from "../components/Cart.jsx";
import useUser from "../context/useUser.jsx";

const Home = () => {
  const { profile } = useUser();
  return (
    <>
      <Products />
      <Cart />
    </>
  );
};

export default Home;
