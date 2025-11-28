"use client";

type Block =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "bullet"; text: string }
  | { type: "space" };

function parseBlocks(raw: string): Block[] {
  const lines = raw.split("\n");
  const blocks: Block[] = [];

  for (let line of lines) {
    const t = line.trim();
    if (!t) continue;

    if (t.startsWith("** ")) {
      blocks.push({ type: "subheading", text: t.replace("**", "").trim() });
      continue;
    }

    if (t.startsWith("* ")) {
      blocks.push({ type: "heading", text: t.replace("*", "").trim() });
      continue;
    }

    if (t.startsWith("->")) {
      blocks.push({ type: "bullet", text: t.replace("->", "").trim() });
      continue;
    }

    if (t === "---" || t === "||") {
      blocks.push({ type: "space" });
      continue;
    }
  }

  return blocks;
}

export function StepsViewer({ raw }: { raw: string }) {
  const blocks = parseBlocks(raw);

  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "heading":
            return (
              <h2 key={i} className="text-xl font-bold text-zinc-100 mt-6">
                {b.text}
              </h2>
            );

          case "subheading":
            return (
              <h3 key={i} className="text-lg font-semibold text-zinc-300 mt-3">
                {b.text}
              </h3>
            );

          case "bullet":
            return (
              <div key={i} className="ml-4 flex gap-3 items-start">
                <span className="mt-[6px] w-2 h-2 bg-zinc-500 rounded-full"></span>
                <code className="px-2 py-[2px] bg-zinc-800/60 rounded text-sm text-zinc-200">
                  {b.text}
                </code>
              </div>
            );

          case "space":
            return <div key={i} className="h-4" />;
        }
      })}
    </div>
  );
}
