
import { createRoot } from "react-dom/client";
import { MessageProvider } from "./context/message-context";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <MessageProvider>
    <App />
  </MessageProvider>
);

