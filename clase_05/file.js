import { readFile, writeFile } from "node:fs";
import { resolve } from "node:path";
const file = resolve(process.cwd(), "usuarios.json");

await new Promise((resolve, reject) => {
  writeFile(file, JSON.stringify([{ name: "Edu", age: 29 }]), (error) => {
    if (error) {
      reject(error);
    }
    resolve();
  });
});

let usuarios = await new Promise((resolve, reject) => {
  readFile(file, "utf-8", (error, data) => {
    if (error) {
      reject(error);
    }
    resolve(JSON.parse(data));
  });
});

console.log(usuarios);
