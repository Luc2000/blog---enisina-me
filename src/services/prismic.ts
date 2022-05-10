import * as prismic from "@prismicio/client";

export function getPrismicClient(req?: string) {
  // Create a client
  const client = prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    routes: req,
  });

  return client;
}
