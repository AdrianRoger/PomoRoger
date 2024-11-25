// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
// import "./index.css";
import "./reset.css";
import App from "./App.jsx";
import { TodoProvider } from "./context/TodoContext";

createRoot(document.getElementById("root")).render(
  <TodoProvider>
    <App />
  </TodoProvider>
);
