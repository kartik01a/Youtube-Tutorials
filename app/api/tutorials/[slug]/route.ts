// app/api/tutorials/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Tutorial } from "@/models/Tutorial";

interface Params {
  params: { slug: string };
}

export async function GET(_req: NextRequest, { params }: Params) {
  await connectDB();
  const tutorial = await Tutorial.findOne({ slug: params.slug }).lean();

  if (!tutorial) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.json(tutorial);
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const adminToken = req.headers.get("x-admin-token");
  if (!adminToken || adminToken !== process.env.ADMIN_TOKEN) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  await connectDB();
  const tutorial = await Tutorial.findOneAndUpdate(
    { slug: params.slug },
    body,
    { new: true }
  ).lean();

  if (!tutorial) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.json(tutorial);
}
