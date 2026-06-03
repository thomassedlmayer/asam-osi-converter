import { PanelExtensionContext } from "@lichtblick/suite";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import MetadataPanelElement from "./MetadataPanelElement";

export function initPanel(context: PanelExtensionContext): void {
  const root = createRoot(context.panelElement);
  root.render(
    <StrictMode>
      <MetadataPanelElement context={context} />
    </StrictMode>,
  );
}
