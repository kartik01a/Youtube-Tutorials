import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Tutorial } from "@/models/Tutorial";

export async function GET() {
  await connectDB();
  const tutorials = await Tutorial.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(tutorials);
}

export async function POST(req: NextRequest) {
  const adminToken = req.headers.get("x-admin-token");
  if (adminToken !== process.env.ADMIN_TOKEN) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await req.json();
  await connectDB();
  const tutorial = await Tutorial.create(data);

  return NextResponse.json(tutorial, { status: 201 });
}
