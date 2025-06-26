import { useState, useEffect } from "react";
import style from "../styles/products.module.css";
import useUser from "../context/useUser.jsx";
import Product from "./Product";
const Products = () => {
  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const api = "https://dummyjson.com/products/category/smartphones";
        const query = new URLSearchParams({ limit: 4, skip: page * 4 });
        const res = await fetch(`${api}?${query.toString()}`);
        const data = await res.json();
        setList(data.products);
      } catch (error) {
        throw new Error(error.message);
      }
    };
    load();
  }, [page]);

  return (
    <section id={style.products}>
      <ul>
        {list.map((p) => (
          <Product product={p} key={p.id} />
        ))}
      </ul>
      <form onSubmit={(e) => e.preventDefault()}>
        <button
          type="button"
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          Anterior
        </button>
        <output>{page + 1}</output>
        <button
          type="button"
          onClick={() => setPage(page + 1)}
          disabled={list.length === 0}
        >
          Siguiente
        </button>
      </form>
    </section>
  );
};

export default Products;
