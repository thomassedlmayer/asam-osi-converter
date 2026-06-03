// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Metadata } from "@lichtblick/suite";
import { Fragment } from "react";

type MetadataSectionProps = {
  colorScheme: "dark" | "light";
  metadata: ReadonlyArray<Readonly<Metadata>> | undefined;
};

export function MetadataSection({ colorScheme, metadata }: MetadataSectionProps): JSX.Element {
  const hasMetadata = metadata != undefined && metadata.length > 0;

  return (
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
      {hasMetadata ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {metadata.map((entry, index) => (
            <div
              key={`${entry.name}-${index}`}
              style={{
                borderTop: index > 0 ? "1px solid" : undefined,
                borderColor: colorScheme === "dark" ? "#2c2c33" : "#ddd",
                marginTop: index > 0 ? "14px" : 0,
                paddingTop: index > 0 ? "14px" : 0,
              }}
            >
              <h4 style={{ margin: "0 0 6px 0" }}>
                {entry.name.length > 0 ? entry.name : `Metadata entry ${index + 1}`}
              </h4>
              {Object.keys(entry.metadata).length > 0 ? (
                <dl
                  style={{
                    display: "grid",
                    gridTemplateColumns: "max-content minmax(0, 1fr)",
                    gap: "4px 12px",
                    margin: 0,
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                  }}
                >
                  {Object.entries(entry.metadata).map(([key, value]) => (
                    <Fragment key={key}>
                      <dt style={{ opacity: 0.9, fontWeight: 700 }}>
                        {key}
                      </dt>
                      <dd style={{ margin: 0, opacity: 0.8 }}>
                        {value}
                      </dd>
                    </Fragment>
                  ))}
                </dl>
              ) : (
                <p style={{ opacity: 0.7, fontStyle: "italic", margin: 0 }}>
                  No metadata values.
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ opacity: 0.7, fontStyle: "italic" }}>No metadata available.</p>
      )}
    </div>
  );
}
