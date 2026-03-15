import type { EventContentBlock } from "@/lib/types";

interface ContentRendererProps {
  content: EventContentBlock[];
}

export default function ContentRenderer({ content }: ContentRendererProps) {
  const nodes: React.ReactNode[] = [];
  let listBuffer: EventContentBlock[] = [];

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return;
    nodes.push(
      <ul
        key={key}
        className="my-4 space-y-1.5 pl-5 list-disc marker:text-brand-blue"
      >
        {listBuffer.map((item, idx) => (
          <li key={idx} className="text-stone-600 leading-relaxed text-base">
            {item.text}
          </li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  content.forEach((block, index) => {
    if (block.type !== "li" && block.type !== "ul") {
      flushList(`list-${index}`);
    }

    switch (block.type) {
      case "h2":
        nodes.push(
          <h2
            key={index}
            className="mt-8 mb-3 text-2xl font-bold tracking-tight text-stone-900 first:mt-0"
          >
            {block.text}
          </h2>
        );
        break;
      case "h3":
        nodes.push(
          <h3
            key={index}
            className="mt-6 mb-2 text-xl font-semibold text-stone-800 first:mt-0"
          >
            {block.text}
          </h3>
        );
        break;
      case "p":
        nodes.push(
          <p key={index} className="my-3 text-base leading-relaxed text-stone-600">
            {block.text}
          </p>
        );
        break;
      case "ul":
        break;
      case "li":
        listBuffer.push(block);
        break;
    }
  });

  flushList("list-end");

  return <div className="prose-like">{nodes}</div>;
}
