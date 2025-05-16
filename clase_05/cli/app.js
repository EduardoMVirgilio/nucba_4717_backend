import { write, get } from "./manager.js";
import { input, editor, select, confirm, Separator } from "@inquirer/prompts";

// write([{ usuario: "edu", clave: "1234" }]);
// const usuarios = await get();
async function main() {
  let run = true;
  console.log("Bienvenido al sistema");
  // Verificar al usuario antes de las opciones
  let usuarios = await get();
  const usuario = await input({
    message: "Ingrese el usuario",
  });
  const clave = await input({
    message: "Ingrese la clave",
  });
  const existe = usuarios.some(
    (u) => u.usuario === usuario && u.clave === clave
  );
  if (!existe) {
    console.log("Usuario no encontrado");
    return;
  }
  while (run) {
    // Mostrar opciones al usuario
    const opcion = await select({
      message: "Seleccione una opcion",
      choices: [
        { title: "Agregar usuario", value: "agregar" },
        { title: "Eliminar usuario", value: "eliminar" },
        { title: "Verificar usuario", value: "verificar" },
        { title: "Listar usuarios", value: "listar" },
        new Separator(),
        { title: "Salir", value: "salir" },
      ],
    });
    switch (opcion) {
      case "agregar":
        const usuario = await input({
          message: "Ingrese el usuario",
        });
        const clave = await input({
          message: "Ingrese la clave",
        });
        usuarios = await get();
        // Validar que el usuario no exista
        const existe = usuarios.some((u) => u.usuario === usuario);
        if (existe) {
          console.log("El usuario ya existe");
          break;
        }

        usuarios.push({ usuario, clave });
        await write([...usuarios]);
        break;
      case "listar":
        console.table(usuarios);
        break;
      case "salir":
        run = false;
        break;
      case "eliminar":
        const usuarioEliminar = await input({
          message: "Ingrese el usuario a eliminar",
        });
        // confirmar la eliminacion
        const confirmacion = await confirm({
          message: "¿Estas seguro de eliminar el usuario?",
        });
        if (confirmacion) {
          usuarios = usuarios.filter((u) => u.usuario !== usuarioEliminar);
          await write([...usuarios]);
        }
        break;
      case "verificar":
        const usuarioVerificar = await input({
          message: "Ingrese el usuario a verificar",
        });
        if (usuarios.some((u) => u.usuario === usuarioVerificar)) {
          console.log("El usuario existe");
          const clave = await input({
            message: "Ingrese la clave",
          });
          if (usuarios.some((u) => u.clave === clave)) {
            console.log("La clave es correcta");
          } else {
            console.log("La clave es incorrecta");
          }
        } else {
          console.log("El usuario no existe");
        }
        break;
    }
  }
  console.log("Vuelva pronto");
}
main();
