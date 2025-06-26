import useCart from "../context/useCart.jsx";
import Item from "./Item";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useUser from "../context/useUser.jsx";
import { formatPrice } from "../utils/format.js";
import { useMemo } from "react";
import style from "../styles/cart.module.css";
const Cart = () => {
  const { profile, token } = useUser();
  const navigate = useNavigate();
  const { items, setItems } = useCart();
  const subtotal = useMemo(() => {
    if (!items) return 0;
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);
  const { register, handleSubmit } = useForm();
  const handleBuy = async (data) => {
    console.log(data);
    setItems(null);
    navigate("/");
  };
  return (
    <section id={style.cart}>
      <h2>Carrito de compras</h2>
      <ul
        className={`${style.items} ${
          items?.length > 1 ? style.multi : style.single
        }`}
      >
        {items?.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
      <form onSubmit={handleSubmit(handleBuy)}>
        <fieldset id={style.summary}>
          <legend>Resumen</legend>
          <output>Subtotal: {formatPrice(subtotal)}</output>
          <output>Envio: {formatPrice(subtotal * 0.1)}</output>
          <output>Total: {formatPrice(subtotal + subtotal * 0.1)}</output>
        </fieldset>
        <fieldset id={style.shipping}>
          <legend>Datos de envio</legend>
          <input type="text" placeholder="Nombre" {...register("name")} />
          <input
            type="text"
            placeholder="Telefono"
            {...register("cellphone")}
          />
          <input type="text" placeholder="Direccion" {...register("address")} />
          <input
            type="text"
            placeholder="Ubicacion"
            {...register("location")}
          />
        </fieldset>
        <button type="submit">Finalizar Compra</button>
      </form>
    </section>
  );
};

export default Cart;
