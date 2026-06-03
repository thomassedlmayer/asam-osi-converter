import { PanelExtensionContext } from "@lichtblick/suite";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import OSIPanelElement from "./OSIPanelElement";

export function initPanel(context: PanelExtensionContext): void {
  const root = createRoot(context.panelElement);
  root.render(
    <StrictMode>
      <OSIPanelElement context={context} />
    </StrictMode>,
  );
}
