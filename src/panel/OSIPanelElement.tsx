// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import {
  PanelExtensionContext,
  SettingsTreeAction,
  SettingsTreeNode,
  SettingsTreeNodes,
} from "@lichtblick/suite";
import { set } from "lodash";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { DeepPartial } from "ts-essentials";

type BlankPanelProps = {
  context: PanelExtensionContext;
};

type Config = {
  showLogo: boolean;
};

function buildSettingsTree(config: Config): SettingsTreeNodes {
  const general: SettingsTreeNode = {
    label: "General",
    fields: {
      showLogo: {
        label: "Foxglove logo",
        input: "boolean",
        value: config.showLogo,
      },
    },
  };
  return { general };
}

export default function OSIPanelElement({ context }: BlankPanelProps): JSX.Element {
  const { saveState } = context;

  // resolve an initial config which may have some missing fields into a full config
  const [config, setConfig] = useState<Config>(() => {
    const partialConfig = context.initialState as DeepPartial<Config>;

    const { showLogo = true } = partialConfig;
    return { showLogo };
  });
  const [renderDone, setRenderDone] = useState<() => void>(() => () => {
    // no-op
  });
  const [colorScheme, setColorScheme] = useState<"dark" | "light">("light");

  const settingsActionHandler = useCallback((action: SettingsTreeAction) => {
    if (action.action !== "update") {
      return;
    }

    setConfig((previous) => {
      const newConfig = { ...previous };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      set(newConfig, action.payload.path.slice(1), action.payload.value);
      return newConfig;
    });
  }, []);

  useLayoutEffect(() => {
    context.watch("colorScheme");

    context.onRender = (renderState, done) => {
      setRenderDone(() => done);
      if (renderState.colorScheme) {
        setColorScheme(renderState.colorScheme);
      }
    };
  }, [context]);

  useEffect(() => {
    const tree = buildSettingsTree(config);
    context.updatePanelSettingsEditor({
      actionHandler: settingsActionHandler,
      nodes: tree,
    });
    saveState(config);
  }, [config, context, saveState, settingsActionHandler]);

  useLayoutEffect(() => {
    renderDone();
  }, [renderDone]);

  return (
    <div
      style={{
        backgroundColor: colorScheme === "dark" ? "#15151A" : "#ffffff",
        color: "currentColor",
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* toolbar */}
      <div
        style={{
          height: "50px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          boxSizing: "border-box",
          backgroundColor: colorScheme === "dark" ? "#0f0f13" : "#006fa6",
        }}
      >
        {/* logo */}
        {config.showLogo && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 245.34 61.12"
            preserveAspectRatio="xMidYMid meet"
            style={{
              height: "32px",
              width: "auto",
              opacity: 0.9,
              display: "block",
            }}
          >
            <g fill="#ffffff">
              <path d="m61.12,31.44v-1.77h-17c-.44-6.8-5.89-12.24-12.68-12.68V0h-1.77v16.99c-6.79.44-12.24,5.88-12.68,12.68H0v1.77h16.99c.44,6.8,5.88,12.24,12.68,12.68v17h1.77v-16.99c6.8-.44,12.25-5.89,12.68-12.69h17Zm-19.07-.88c0,6.33-5.15,11.49-11.49,11.49s-11.49-5.15-11.49-11.49,5.15-11.49,11.49-11.49,11.49,5.15,11.49,11.49h0ZM31.67,5.49l23.96,23.96-4.17-19.79-19.79-4.17h0ZM5.49,29.45L29.45,5.49l-19.79,4.17-4.17,19.79h0Zm23.96,26.18L5.49,31.67l4.17,19.79,19.79,4.17h0Zm26.18-23.96l-23.96,23.96,19.79-4.17,4.17-19.79h0Z"></path>
              <path d="m73.65,51.78h9.51l3.44-8.87h17.03l3.38,8.87h9.91l-17.15-42.23h-8.98l-17.15,42.23h0Zm17.5-20.65c1.34-3.56,2.86-7.76,3.97-10.96h.12c1.11,3.21,2.62,7.41,3.85,10.73l1.75,4.72h-11.37l1.69-4.49h0Zm30.73,18.2c3.97,2.04,9.16,3.09,13.36,3.09,9.1,0,15.34-4.96,15.34-13.18,0-7.47-5.13-10.44-11.49-12.54-5.07-1.69-8.98-1.98-8.98-5.72,0-2.8,2.27-3.97,5.42-3.97s8.46,1.28,12.95,4.08v-9.16c-3.67-1.98-8.75-3.03-12.89-3.03-8.86,0-14.81,4.9-14.81,12.77,0,7.35,5.25,10.21,11.08,12.13,5.42,1.75,9.39,2.1,9.39,6.01,0,3.15-2.51,4.49-5.89,4.49s-8.98-1.34-13.47-4.38v9.39h0Zm31.61,2.45h9.51l3.44-8.87h17.03l3.38,8.87h9.92l-17.15-42.23h-8.98l-17.15,42.23h0Zm17.5-20.65c1.34-3.56,2.86-7.76,3.97-10.96h.12c1.11,3.21,2.62,7.41,3.85,10.73l1.75,4.72h-11.37l1.69-4.49h0Zm52.78,10.91l6.12-8.69c2.1-2.97,4.2-6.07,6.18-9.04l.12.06c-.06,3.03-.12,7-.12,10.5v16.91h9.27V9.56h-8.81l-12.54,17.85-12.54-17.85h-8.92v42.23h8.92v-16.91c0-3.5-.06-7.47-.12-10.5l.12-.06c1.98,2.98,4.08,6.07,6.18,9.04l6.12,8.69h0Z"></path>
            </g>
          </svg>
        )}

        {/* button */}
        <button
          style={{
            background: "none",
            border: "none",
            color: "#ffffff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
          aria-label="Menu"
          onClick={() => {
            console.log("Menu clicked");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>

      {/* main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: colorScheme === "dark" ? "#fff" : "#15151A",
          opacity: 0.8,
        }}
      >
        <p>Panel content</p>
      </div>
    </div>
  );
}
