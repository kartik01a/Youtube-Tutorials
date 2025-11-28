// app/api/tutorials/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Tutorial } from "@/models/Tutorial";

export async function GET() {
  await connectDB();
  const tutorials = await Tutorial.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(tutorials);
}

export async function POST(req: NextRequest) {
  const adminToken = req.headers.get("x-admin-token");
  if (!adminToken || adminToken !== process.env.ADMIN_TOKEN) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { title, slug, youtubeUrl, rawSteps, tags } = body;

  if (!title || !slug || !rawSteps) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  await connectDB();

  const tutorial = await Tutorial.create({
    title,
    slug,
    youtubeUrl,
    rawSteps,
    tags,
  });

  return NextResponse.json(tutorial, { status: 201 });
}
