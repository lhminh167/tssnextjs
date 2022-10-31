import { NextApiRequest, NextApiResponse } from "next";
import { SitemapStream, streamToPromise } from "sitemap";
import { createGzip } from "zlib";
import { getPages } from "../../modules/shared/sitemap/sitemap.component";

export default async function getSiteMap(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!res) return {};
  try {
    res.setHeader("content-type", "application/xml");
    res.setHeader("Content-Encoding", "gzip");
    const smStream = new SitemapStream({
      hostname: process.env.NEXT_PUBLIC_SITE_URL,
    });
    const pipeline = smStream.pipe(createGzip());

    const pages = (await getPages()).map((item) => smStream.write(item));

    smStream.end();
    streamToPromise(pipeline);
    pipeline.pipe(res).on("error", (e) => {
      console.log(e);
      throw e;
    });
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
