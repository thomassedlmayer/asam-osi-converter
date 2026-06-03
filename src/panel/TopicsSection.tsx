// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Topic } from "@lichtblick/suite";

type TopicsSectionProps = {
  colorScheme: "dark" | "light";
  topics: Topic[] | undefined;
};

export function TopicsSection({ colorScheme, topics }: TopicsSectionProps): JSX.Element {
  return (
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
      <h3
        style={{
          margin: 0,
          color: colorScheme === "dark" ? "#fff" : "#15151A",
        }}
      >
        Topics
      </h3>
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
  );
}
