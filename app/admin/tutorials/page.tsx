// app/admin/tutorials/page.tsx
import { TutorialForm } from "../../components/tutorial-form";

export default function AdminTutorialsPage() {
  // You can add a simple password gate here e.g. ?key=... or a very basic check
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">Create Tutorial Page</h1>
        <p className="text-sm text-zinc-400">
          Paste your script with <code>*</code> headings and <code>-&gt;</code> bullet steps.
        </p>
        <TutorialForm mode="create" />
      </div>
    </main>
  );
}
