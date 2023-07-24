import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json(); // res now contains body
  console.log({ res });

  return NextResponse.json({ data: "hello alo" });
}
