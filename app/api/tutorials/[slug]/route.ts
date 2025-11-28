import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Tutorial } from "@/models/Tutorial";

export async function GET(
  req: NextRequest,
  context: { params: { slug: string } }
) {
  const { slug } = context.params;

  await connectDB();
  const tutorial = await Tutorial.findOne({ slug }).lean();

  if (!tutorial) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.json(tutorial);
}

export async function PATCH(
  req: NextRequest,
  context: { params: { slug: string } }
) {
  const { slug } = context.params;

  const adminToken = req.headers.get("x-admin-token");
  if (adminToken !== process.env.ADMIN_TOKEN) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  await connectDB();

  const updated = await Tutorial.findOneAndUpdate({ slug }, body, {
    new: true,
  }).lean();

  if (!updated) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.json(updated);
}
