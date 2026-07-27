# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Documentación:

    Error de ejecución: "Uncaught (in promise) Error: Invalid hook call. Hooks can only be called inside of the body of a function component."
    Dirección del problema: handleSubmit (MascotasForm.jsx:82:26)
    Solución: El hook useNavigate debe ejecutarse directamente en el componente en este caso MascotasForm() y no dentro de funciones normales como en handleSumbit.
    Herramienta IA: Copilot

    Sintaxis para comentarios:
    Para traer la lista de comentarios de cada mascota se debe recorrer la lista y antes filtrar la busqueda de la mascota por su id, luego solicite ayuda a la herramienta ChatGPT para que me construyera la idea.

    Ejecución del linter ESLint: 
        1:25  error  'NavLink' is defined but never used  no-unused-vars
        Sucede que eñ NavLink importado en el archivo App.jsx no se esta utilizando en el código.
        Por lo que se procede a quitar del codigo.