import "dotenv/config";
import Mux from "@mux/mux-node";

export const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET ?? process.env.MUX_SECRET_KEY!,
  jwtSigningKey: process.env.MUX_SIGNING_KEY ?? process.env.MUX_SIGNING_KEY_ID!,
  jwtPrivateKey: process.env.MUX_PRIVATE_KEY ?? process.env.MUX_SIGNING_PRIVATE_KEY!,
});
