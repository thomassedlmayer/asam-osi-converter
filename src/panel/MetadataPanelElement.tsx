// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { PanelExtensionContext, Topic } from "@lichtblick/suite";
import { useLayoutEffect, useState } from "react";

import { MetadataSection } from "./MetadataSection";
import { TopicsSection } from "./TopicsSection";

type MetadataPanelElementProps = {
  context: PanelExtensionContext;
};

export default function MetadataPanelElement({
  context,
}: MetadataPanelElementProps): JSX.Element {
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
        <MetadataSection colorScheme={colorScheme} metadata={context.metadata} />
        <TopicsSection colorScheme={colorScheme} topics={topics} />
      </div>
    </div>
  );
}
