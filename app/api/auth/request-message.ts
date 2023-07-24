import Moralis from "moralis";
const config = {
  domain: process.env.APP_DOMAIN,
  statement: "Web Login.",
  uri: process.env.NEXTAUTH_URL,
  timeout: 60,
};
export default async function handler(req, res) {
    console.log(req);
    
  const { address, chain, network } = req.body;
  await Moralis.start({ apiKey: "cQ1co2doXNEQNYBO0r6zgChuKvOqdm1pyBVuBT8PjXp4ouhIPh0sApc7joa3pbnN" });
  try {
    const message = await Moralis.Auth.requestMessage({
      address,
      chain,
      network,
      ...config,
    });
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error });
    console.error(error);
  }
}
