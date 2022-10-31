import { EnumChangefreq } from "sitemap";

export interface SitemapUrl {
    url: string,
    lastmod: string,
    changefreq: EnumChangefreq,
}