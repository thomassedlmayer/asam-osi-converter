// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import {
  PanelExtensionContext,
  Topic,
} from "@lichtblick/suite";
import { useLayoutEffect, useState } from "react";

type OSIPanelProps = {
  context: PanelExtensionContext;
};

function renderMetadata(data: unknown, level = 0): JSX.Element[] {
  if (data == null || typeof data !== "object") {
    return [
      <span key={String(data)} style={{ opacity: 0.8 }}>
        {String(data)}
      </span>,
    ];
  }

  return Object.entries(data).map(([key, value]) => (
    <div key={key} style={{ marginLeft: level * 16 }}>
      <strong style={{ opacity: 0.9 }}>{key}:</strong>{" "}
      {typeof value === "object" && value != null ? (
        <div style={{ marginTop: 4 }}>{renderMetadata(value, level + 1)}</div>
      ) : (
        <span style={{ opacity: 0.8 }}>{String(value)}</span>
      )}
    </div>
  ));
}

export default function OSIPanelElement({ context }: OSIPanelProps): JSX.Element {
  const [renderDone, setRenderDone] = useState<() => void>(() => () => {
    // no-op
  });
  const [colorScheme, setColorScheme] = useState<"dark" | "light">("light");
  const [topics, setTopics] = useState<Topic[]>();

  useLayoutEffect(() => {
    context.watch("colorScheme");
    context.watch("topics");
    context.watch("currentFrame");

    context.onRender = (renderState, done) => {
      setRenderDone(() => done);

      if (renderState.colorScheme) {
        setColorScheme(renderState.colorScheme);
      }

      if (renderState.topics) {
        setTopics(renderState.topics as Topic[]);
      }
    };
  }, [context]);

  useLayoutEffect(() => {
    renderDone();
  }, [renderDone]);

  return (
    <div
      style={{
        backgroundColor: colorScheme === "dark" ? "#15151A" : "#ffffff",
        color: "currentColor",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "stretch",
          width: "100%",
          padding: "16px",
          boxSizing: "border-box",
          overflowY: "auto",
          gap: "16px",
        }}
      >
        {/* Metadata box */}
        <div
          style={{
            border: "1px solid",
            borderColor: colorScheme === "dark" ? "#2c2c33" : "#ddd",
            borderRadius: "8px",
            padding: "12px",
            backgroundColor: colorScheme === "dark" ? "#1b1b20" : "#f9f9f9",
            color: colorScheme === "dark" ? "#fff" : "#15151A",
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: 8 }}>Metadata</h3>
          {context.metadata ? (
            <div style={{ fontFamily: "monospace", fontSize: "0.9rem" }}>
              {renderMetadata(context.metadata)}
            </div>
          ) : (
            <p style={{ opacity: 0.7, fontStyle: "italic" }}>No metadata available.</p>
          )}
        </div>

        {/* Topics list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: "100%",
            gap: "12px",
          }}
        >
          {topics?.length === 0 ? (
            <p
              style={{
                color: colorScheme === "dark" ? "#aaa" : "#333",
                fontStyle: "italic",
              }}
            >
              No topics available.
            </p>
          ) : (
            topics?.map((topic) => (
              <div
                key={topic.name}
                style={{
                  border: "1px solid",
                  borderColor: colorScheme === "dark" ? "#2c2c33" : "#ddd",
                  borderRadius: "8px",
                  padding: "12px",
                  width: "100%",
                  backgroundColor: colorScheme === "dark" ? "#1b1b20" : "#f9f9f9",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 4px 0",
                    color: colorScheme === "dark" ? "#fff" : "#15151A",
                  }}
                >
                  {topic.name}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.9rem",
                    opacity: 0.7,
                  }}
                >
                  Schema: {topic.schemaName}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
