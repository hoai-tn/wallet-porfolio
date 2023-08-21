import { NextRequest, NextResponse } from "next/server";
import apiClient from "../apiClient";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");
  const chain = searchParams.get("chain");
  const { data } = await apiClient.get(`/get-token-holder-list/${address}`, {
    params: { chain },
  });

  //   const data = await res.json()

  return NextResponse.json(data);
}
