import { connectDB } from "@/lib/db";
import { Tutorial } from "@/models/Tutorial";
import Link from "next/link";
import { Youtube, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await connectDB();
  const tutorials = await Tutorial.find({ isPublished: true })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-14">

        {/* HERO SECTION */}
        <section className="space-y-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Kartik’s Coding Tutorials
          </h1>

          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Clean, simple, step-by-step guides for deployments, AWS, MERN stack,
            and full-stack development.  
            Every tutorial matches my YouTube videos.
          </p>

          {/* YouTube CTA */}
          <a
            href="https://youtube.com/@letstrycoding6389?si=Z9ndZYR4IPI0BdUj"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 transition font-medium shadow-lg shadow-red-600/20"
          >
            <Youtube className="w-5 h-5 text-white" />
            Visit My YouTube Channel
          </a>
        </section>

        {/* LINE DIVIDER */}
        <div className="border-t border-zinc-800/70"></div>

        {/* TUTORIAL LIST */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Latest Tutorials</h2>

          {tutorials.length === 0 ? (
            <p className="text-zinc-400">No tutorials added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutorials.map((t: any) => (
                <Link
                  key={t._id}
                  href={`/tutorial/${t.slug}`}
                  className="block group rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-900/70 transition p-5 space-y-3 hover:border-zinc-600 shadow-lg shadow-zinc-900/30"
                >
                  <h3 className="text-xl font-semibold text-white group-hover:text-zinc-100">
                    {t.title}
                  </h3>

                  {t.tags?.length ? (
                    <p className="text-xs text-zinc-500">
                      {t.tags.join(" • ")}
                    </p>
                  ) : (
                    <p className="text-xs text-zinc-600">No tags</p>
                  )}

                  <div className="flex items-center gap-2 text-sm text-zinc-400 group-hover:text-zinc-300">
                    <span>View steps</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
