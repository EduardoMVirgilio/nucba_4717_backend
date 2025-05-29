import express from "express";
import axios from "axios";
const app = express();

app.get("/", (req, res) => res.send({ data: req.query })); // ?search=algo => { "search" : "algo"}
app.get("/productos/:alias", (req, res) => res.send({ data: req.params })); // /algo => {"alias":"algo"}

app.get("/pokemon", async (req, res) => {
  if (!req.query.limit) {
    return res.send("No pasaste el parametro de limit");
  }
  if (!req.query.page) {
    return res.send("No pasaste el parametro del page");
  }

  let limit = Number(req.query.limit);
  let offset = Number(req.query.page) * Number(req.query.limit);

  //   let resPokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  let { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  let { results } = data;
  //   return res.send(results);
  results = await Promise.all(
    results.map(async ({ url: urlPokemon }) => {
      //   let resPokemon = await fetch(url);
      let { data: pokemon } = await axios.get(urlPokemon);
      return {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.map((t) => t.type.name),
        image: pokemon.sprites.other.dream_world.front_default,
      };
    })
  );

  return res.send(results);
});

app.listen(3000);
