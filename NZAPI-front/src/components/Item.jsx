import React from "react";
import { Plus, Minus, Trash } from "lucide-react";
import { formatPrice } from "../utils/format.js";
import useCart from "../context/useCart.jsx";
const Item = ({ item }) => {
  const { items, setItems } = useCart();
  const addQuantity = () => {
    if (items.find((item) => item.id === item.id)) {
      setItems(
        items.map((item) =>
          item.id === item.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      return;
    }
  };
  const removeQuantity = () => {
    if (items.find((item) => item.id === item.id)) {
      setItems(
        items
          .map((item) =>
            item.id === item.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
      return;
    }
  };
  return (
    <li>
      <picture>
        <img src={item.images[0]} alt={`Image product ${item.title}`} />
      </picture>
      <dl>
        <dt>{item.title}</dt>
        <dd>{formatPrice(item.price * item.quantity)}</dd>
      </dl>
      <form>
        <button type="button" onClick={removeQuantity}>
          {item.quantity > 1 ? <Minus /> : <Trash />}
        </button>
        <output>{item.quantity}</output>
        <button type="button" onClick={addQuantity}>
          <Plus />
        </button>
      </form>
    </li>
  );
};

export default Item;
