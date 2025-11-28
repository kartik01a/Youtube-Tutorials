// components/tutorial-form.tsx
"use client";

import { useState } from "react";

type TutorialFormProps = {
  defaultValues?: {
    title?: string;
    slug?: string;
    youtubeUrl?: string;
    rawSteps?: string;
    tags?: string[];
  };
  mode?: "create" | "edit";
};

export function TutorialForm({ defaultValues, mode = "create" }: TutorialFormProps) {
  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  const [youtubeUrl, setYoutubeUrl] = useState(defaultValues?.youtubeUrl ?? "");
  const [rawSteps, setRawSteps] = useState(defaultValues?.rawSteps ?? "");
  const [tags, setTags] = useState((defaultValues?.tags ?? []).join(","));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const payload = {
      title,
      slug,
      youtubeUrl,
      rawSteps,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const url =
      mode === "create" ? "/api/tutorials" : `/api/tutorials/${slug}`;

    const res = await fetch(url, {
      method: mode === "create" ? "POST" : "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": process.env.NEXT_PUBLIC_ADMIN_TOKEN ?? "",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setMessage(`Error: ${await res.text()}`);
    } else {
      setMessage("Saved successfully!");
    }
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div>
        <label className="block text-sm text-zinc-300 mb-1">Title</label>
        <input
          className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm text-zinc-50"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-300 mb-1">
          Slug (URL path: /tutorial/&lt;slug&gt;)
        </label>
        <input
          className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm text-zinc-50"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-300 mb-1">YouTube URL</label>
        <input
          className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm text-zinc-50"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-300 mb-1">
          Tags (comma separated)
        </label>
        <input
          className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm text-zinc-50"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="ec2, deployment, aws"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-300 mb-1">
          Steps (use * for headings, -&gt; for bullets)
        </label>
        <textarea
          className="w-full h-64 rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm text-zinc-50 font-mono"
          value={rawSteps}
          onChange={(e) => setRawSteps(e.target.value)}
          placeholder={`* Add .pem file to read mode, add Ssh
-> chmod 400 your-key.pem
-> ssh -i "your-key.pem" ubuntu@ec2-YOUR-IP.compute.amazonaws.com

* Steps to install latest ubuntu packages, node to your server
-> sudo apt update
-> sudo apt upgrade -y
...`}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-zinc-100 text-zinc-900 px-4 py-2 text-sm font-medium hover:bg-zinc-300 disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : mode === "create" ? "Create Tutorial" : "Update Tutorial"}
      </button>

      {message && (
        <p className="text-sm text-zinc-400 mt-2">
          {message}
        </p>
      )}
    </form>
  );
}
