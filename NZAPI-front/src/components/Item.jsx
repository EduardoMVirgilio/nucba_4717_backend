import React from "react";
import { Plus, Minus, Trash } from "lucide-react";
import { formatPrice } from "../utils/format.js";
import useCart from "../context/useCart.jsx";
const Item = ({ item }) => {
  const { items, setItems } = useCart();
  const addQuantity = () => {
    if (items.find((curItem) => curItem.id === item.id)) {
      setItems(
        items.map((curItem) =>
          curItem.id === item.id
            ? { ...curItem, quantity: curItem.quantity + 1 }
            : curItem
        )
      );
      return;
    }
  };
  const removeQuantity = () => {
    if (items.find((curItem) => curItem.id === item.id)) {
      setItems(
        items
          .map((curItem) =>
            curItem.id === item.id
              ? { ...curItem, quantity: curItem.quantity - 1 }
              : curItem
          )
          .filter((curItem) => curItem.quantity > 0)
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
