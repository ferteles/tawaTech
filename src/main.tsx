import { createRoot } from "react-dom/client";
import CalangoApp from "./calango/CalangoApp.tsx";

// A folha de estilo do site usa `.js [data-revela]` para esconder os blocos
// antes da revelação. Sem JS, o conteúdo aparece normalmente.
document.documentElement.classList.add("js");

createRoot(document.getElementById("root")!).render(<CalangoApp />);
