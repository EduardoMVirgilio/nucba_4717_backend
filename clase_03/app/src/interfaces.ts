interface IUsuario {
  nombre: string;
  edad?: number;
  rol: "admin" | "user" | "guest"; // unions o uniones
}

let usuario: IUsuario = { nombre: "edu", rol: "guest" };
