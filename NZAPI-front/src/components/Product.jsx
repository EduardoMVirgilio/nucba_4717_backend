import React from "react";
import { useNavigate } from "react-router";
import useUser from "../context/useUser.jsx";
import useCart from "../context/useCart.jsx";
import { formatPrice } from "../utils/format.js";
const Product = ({ product }) => {
  const { items, setItems } = useCart();
  const navigate = useNavigate();
  const { token } = useUser();

  const addToCart = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (items.length === 0) {
      setItems([{ ...product, quantity: 1 }]);
      return;
    }
    if (items.find((item) => item.id === product.id)) {
      setItems(
        items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      return;
    }
    setItems([...items, { ...product, quantity: 1 }]);
  };
  return (
    <li>
      <picture>
        <img
          src={product.images[0]}
          alt={`Image product ${product.title}`}
          loading="lazy"
        />
      </picture>
      <dl>
        <dt>{product.title}</dt>
        <dd>{formatPrice(product.price)}</dd>
      </dl>
      {token ? (
        <button type="button" onClick={addToCart}>
          Agregar al carrito
        </button>
      ) : (
        <button type="button" onClick={() => navigate("/login")}>
          Iniciar sesión
        </button>
      )}
    </li>
  );
};

export default Product;
