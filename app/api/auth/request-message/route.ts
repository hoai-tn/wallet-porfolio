import Moralis from "moralis";
import { NextResponse } from "next/server";
const config = {
  domain: "http://localhost:3000",
  statement: "Web Login.",
  uri: "http://localhost:3000",
  timeout: 60,
};
export async function POST(req) {

  const { address, chain, network } = await req.json() ;

  try {
    await Moralis.start({
      apiKey:
      "cQ1co2doXNEQNYBO0r6zgChuKvOqdm1pyBVuBT8PjXp4ouhIPh0sApc7joa3pbnN",
    });
    console.log({ address, chain, network });
    const message = await Moralis.Auth.requestMessage({
      address,
      chain,
      ...config,
    });
    return NextResponse.json({ message });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
