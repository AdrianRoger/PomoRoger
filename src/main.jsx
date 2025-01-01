import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { TodoProvider } from "./context/TodoContext";
import { WindowSizeProvider } from "./context/WindowSizeContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TodoProvider>
      <WindowSizeProvider>
        <App />
      </WindowSizeProvider>
    </TodoProvider>
  </BrowserRouter>
);
