import { NextRequest, NextResponse } from "next/server";
import apiClient from "../../apiClient";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const { address } = res.params;
  const chain = searchParams.get("chain");

  const { data } = await apiClient.get(`/get-transactions/${address}`, {
    params: { chain },
  });
  return NextResponse.json(data);
}
