import { StepsViewer } from "../../components/steps-viewer";
import { TutorialActions } from "../../components/tutorial-actions";
import { connectDB } from "@/lib/db";
import { Tutorial } from "@/models/Tutorial";

type TutorialPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TutorialPage(props: TutorialPageProps) {
  const { slug } = await props.params;
  await connectDB();
  const tutorial = await Tutorial.findOne({ slug }).lean();

  if (!tutorial) {
    return <div className="p-10 text-red-500">Tutorial not found</div>;
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-8">

        <h1 className="text-3xl font-bold">{tutorial.title}</h1>

        <TutorialActions raw={tutorial.rawSteps} youtubeUrl={tutorial.youtubeUrl}>
          <StepsViewer raw={tutorial.rawSteps} />
        </TutorialActions>

      </div>
    </main>
  );
}
