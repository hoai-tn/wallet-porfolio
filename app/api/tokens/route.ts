import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import apiClient from "../apiClient";

export async function GET(res: NextApiRequest, req: NextApiResponse) {
    const params = req.params;
    console.log({ res, params });
    
//   const response = await apiClient.get("/get-token-holder-list/");
  //   const res = await fetch('https://data.mongodb-api.com/...', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'API-Key': process.env.DATA_API_KEY,
  //     },
  //   })
  //   const data = await res.json()

  return NextResponse.json({ get_tokens: "ETG" });
}
