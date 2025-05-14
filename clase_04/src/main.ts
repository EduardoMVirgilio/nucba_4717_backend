// Arrow functions
const countChars = (str: string): number => str.length;
const countWords = (str: string): number => str.split(" ").length;
console.log(countWords("Hola Mundo")); // 2
console.log(countChars("Hola Mundo")); // 10
// Use this
const persona = {
  nombre: "Juan",
  apellido: "Perez",
  edad: 20,
  saludar: function () {
    console.log(`Hola ${this.nombre}`);
  },
};

persona.saludar();

// Herencia en Tipos
type Empleado = {
  nombre: string;
  apellido: string;
  edad: number;
  salario: number;
};

const empleado: Empleado = {
  nombre: "Juan",
  apellido: "Perez",
  edad: 20,
  salario: 1000,
};

type Gerente = Empleado & {
  departamento: string;
};

const gerente: Gerente = {
  nombre: "Juan",
  apellido: "Perez",
  edad: 20,
  salario: 1000,
  departamento: "Ventas",
};

// Herencia en Interfaces

interface Obrero {
  nombre: string;
  apellido: string;
  edad: number;
  salario: number;
  construir(): void;
}

interface Jefe extends Obrero {
  departamento: string;
  pagar(): void;
}

const jefe: Jefe = {
  nombre: "Juan",
  apellido: "Perez",
  edad: 20,
  salario: 1000,
  departamento: "Ventas",
  construir() {
    console.log("Construyendo");
  },
  pagar() {
    console.log("Pagando");
  },
};

// Herencia en Clases
class Desarrollador {
  private experiencia: number;
  constructor(
    public nombre: string,
    public apellido: string,
    public edad: number,
    experiencia?: number
  ) {
    this.experiencia = experiencia || 0;
  }
  programar(): void {
    console.log("Programando");
  }
  getExperiencia(): string {
    return this.experiencia + " años de experiencia";
  }
  setExperiencia(experiencia: number): void {
    this.experiencia = experiencia;
  }
}
class Frontend extends Desarrollador {
  constructor(
    nombre: string,
    apellido: string,
    edad: number,
    experiencia?: number
  ) {
    super(nombre, apellido, edad, experiencia);
  }
  programar(): void {
    console.log("Programando Frontend");
  }
}
class Backend extends Desarrollador {
  constructor(
    nombre: string,
    apellido: string,
    edad: number,
    experiencia?: number
  ) {
    super(nombre, apellido, edad, experiencia);
  }
  programar(): void {
    console.log("Programando Backend");
  }
}
const edu = new Desarrollador("Eduardo", "Virgilio", 29);
edu.setExperiencia(8);
console.log(edu.getExperiencia());
edu.programar();

const frontend = new Frontend("Eduardo", "Virgilio", 29);
frontend.setExperiencia(8);
console.log(frontend.getExperiencia());
frontend.programar();

const backend = new Backend("Eduardo", "Virgilio", 29);
backend.setExperiencia(8);
console.log(backend.getExperiencia());
backend.programar();

// Records

const record: Record<string, number> = {
  a: 1,
  b: 2,
  c: 3,
};

// Pick

interface Persona {
  nombre: string;
  apellido: string;
  edad: number;
}

const pick: Pick<Persona, "nombre" | "apellido"> = {
  nombre: "Juan",
  apellido: "Perez",
};
// Omit
const omit: Omit<Persona, "edad"> = {
  nombre: "Juan",
  apellido: "Perez",
};
// Partial
const partial: Partial<Persona> = {
  nombre: "Juan",
  apellido: "Perez",
};
// Required
const required: Required<Persona> = {
  nombre: "Juan",
  apellido: "Perez",
  edad: 20,
};
// Readonly
const readonly: Readonly<Persona> = {
  nombre: "Juan",
  apellido: "Perez",
  edad: 20,
};
