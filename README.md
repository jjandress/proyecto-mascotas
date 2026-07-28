# 🐾 Mascotas App

Aplicación web para gestión de mascotas, se consume api

---

## Instalación

```bash
npm install
npm run dev
```

Disponible en `http://localhost:5173`

> Configura la URL base de la API en `api/apiMascotas.js` antes de ejecutar

---

## Stack

Proyecto base React + Vite con HMR y ESLint

---

## ESLint
Se eliminó la importación no utilizada en `App.jsx`

En `MascotasList.jsx`, la variable `mensaje` estaba declarada con `let` directamente dentro de un `case` del `switch`, sin bloque propio, lo que puede filtrar la declaración a otros `case`. Se solucionó envolviendo ese `case` entre llaves `{ }` para acotar su alcance.

---

## Herramientas de IA utilizadas

**Copilot** — Error `Invalid hook call` en `handleSubmit` (MascotasForm.jsx:82:26). Solución: `useNavigate` debe ejecutarse en el cuerpo del componente, no dentro de `handleSubmit`

**ChatGPT** — Ayuda para construir la lógica de filtrado de comentarios por id de mascota