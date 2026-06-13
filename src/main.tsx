import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Clarity from "@microsoft/clarity";

Clarity.init("x65sj6mgxy");

createRoot(document.getElementById("root")!).render(<App />);
