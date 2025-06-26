import useCart from "../context/useCart.jsx";
import Item from "./Item";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useUser from "../context/useUser.jsx";
import { formatPrice } from "../utils/format.js";
import { useMemo } from "react";
import style from "../styles/cart.module.css";
const Cart = () => {
  const { token } = useUser();
  const navigate = useNavigate();
  const { items, setItems } = useCart();
  const subtotal = useMemo(() => {
    if (!items) return 0;
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);
  const { register, handleSubmit } = useForm();
  const handleBuy = async (data) => {
    console.log(data);
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      let response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            price: item.price,
            quantity: item.quantity,
          })),
          shippingDetails: data,
          shippingCost: Math.round(subtotal * 0.1),
        }),
      });
      if (!response.ok) {
        let result = await response.json();
        throw new Error(result.message);
      }
      let result = await response.json();
      console.log(result);
      setItems([]);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section id={style.cart}>
      <h2>Carrito de compras</h2>
      {items?.length === 0 ? (
        <p>No hay items en el carrito</p>
      ) : (
        <ul
          className={`${style.items} ${
            items?.length > 1 ? style.multi : style.single
          }`}
        >
          {items?.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit(handleBuy)}>
        <fieldset id={style.summary}>
          <legend>Resumen</legend>
          <output>Subtotal: {formatPrice(subtotal)}</output>
          <output>Envio: {formatPrice(subtotal * 0.1)}</output>
          <output>Total: {formatPrice(subtotal + subtotal * 0.1)}</output>
        </fieldset>
        <fieldset id={style.shipping}>
          <legend>Datos de envio</legend>
          <input
            type="text"
            placeholder="Nombre"
            {...register("name", {
              required: { value: true, message: "el nombre es requerido" },
            })}
          />
          <input
            type="text"
            placeholder="Telefono"
            {...register("cellphone", {
              required: { value: true, message: "el telefono es requerido" },
            })}
          />
          <input
            type="text"
            placeholder="Direccion"
            {...register("address", {
              required: { value: true, message: "la direccion es requerida" },
            })}
          />
          <input
            type="text"
            placeholder="Ubicacion"
            {...register("location", {
              required: { value: true, message: "la ubicacion es requerida" },
            })}
          />
        </fieldset>
        <button type="submit">Finalizar Compra</button>
      </form>
    </section>
  );
};

export default Cart;
