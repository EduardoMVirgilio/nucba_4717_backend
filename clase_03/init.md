# Como iniciar en TypeScript

## _*Scripts:*_

- `npm init -y`
- `npm i -D typescript`
- `npm i -D ts-node`
- `npm i -D nodemon`
- `npm i -D @types/node`
- `npx tsc --init`

## _*Estructura*_

```
mi-proyecto-api/
├── node_modules/
├── src/
├── package-lock.json
├── package.json
└── tsconfig.json
└── nodemon.json
```

## _*TS Config*_

```json
{
  "compilerOptions": {
    "target": "es2016", // Versión de ECMAScript de destino.
    "module": "commonJS", // Sistema de módulos a usar. CommonJS es estándar para Node.js.
    "outDir": "./dist", // Directorio de salida para los archivos JavaScript compilados.
    "rootDir": "./src", // Directorio raíz de tus archivos TypeScript.
    "strict": true, // Habilita todas las opciones de verificación de tipo estrictas.
    "esModuleInterop": true, // Permite la interoperabilidad con módulos CommonJS.
    "skipLibCheck": true, // Omite la verificación de tipos de los archivos de declaración (.d.ts).
    "forceConsistentCasingInFileNames": true, // Verifica que los nombres de archivo sean consistentes (minúsculas en Windows).
    "resolveJsonModule": true, // Permite importar archivos .json.
    "sourceMap": true, // Genera archivos .map.js para debugging.
    "baseUrl": "./", // Base URL para los módulos.
    "paths": {
      "@/*": ["src/*"] // Alias para importar módulos de src/ como si fueran de @/
    }
  },
  "include": ["src/**/*"], // Patrones para incluir archivos en la compilación.
  "exclude": ["node_modules", "dist"] // Patrones para excluir archivos de la compilación.
}
```

## _*Nodemon Config*_

```json
{
  // Directorios y archivos a observar.
  "watch": ["src"],
  // Extensiones de archivos a observar.
  "ext": "ts,json",
  // Archivos y directorios a ignorar.
  "ignore": ["src/**/*.spec.ts", "src/**/*.test.ts"],
  // Comando a ejecutar.
  "exec": "ts-node ./src/index.ts"
}
```

## _*NPM Scripts Dev*_

- `"build": "tsc",`
- `"start": "node dist/index.js",`
- `"dev": "nodemon",`
