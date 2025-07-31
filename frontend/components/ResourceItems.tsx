import { ResourceListProps } from "../lib/types/contentful";
import { useContentful } from "../lib/utils/useContentful";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ResourceItems = (props: any) => {
  const data: ResourceListProps = useContentful({
    path: `/resource-listing`,
  });
  return (
    <code>
      <pre
        style={{
          fontFamily: "monospace",
          display: "block",
          padding: "50px",
          color: "#88ffbf",
          backgroundColor: "black",
          textAlign: "left",
          whiteSpace: "pre-wrap",
        }}
      >
        {JSON.stringify({ props, data }, null, "    ")}
      </pre>
    </code>
  );
};
