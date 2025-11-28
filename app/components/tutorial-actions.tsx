"use client";

import { useState } from "react";
import { Copy, Youtube } from "lucide-react";

export function TutorialActions({
  children,
  raw,
  youtubeUrl,
}: {
  children: React.ReactNode;
  raw: string;
  youtubeUrl?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-lg relative space-y-6">

      {/* Top-right action bar */}
      <div className="absolute top-4 right-4 flex items-center gap-3">

        {/* Copy icon */}
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition"
        >
          <Copy className="w-5 h-5 text-zinc-200" />
        </button>

        {/* YouTube icon */}
        {youtubeUrl ? (
          <a
            href={youtubeUrl}
            target="_blank"
            className="p-2 rounded-lg bg-red-600 hover:bg-red-500 transition"
          >
            <Youtube className="w-5 h-5 text-white" />
          </a>
        ) : null}
      </div>

      {/* Copied text */}
      {copied && (
        <span className="absolute top-4 right-28 text-sm text-green-400 animate-pulse">
          Copied!
        </span>
      )}

      {/* Steps content */}
      <div>{children}</div>
    </div>
  );
}
