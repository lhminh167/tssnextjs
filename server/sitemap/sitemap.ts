import { NextApiRequest, NextApiResponse } from 'next';
import { SitemapStream, streamToPromise, EnumChangefreq } from 'sitemap';
import { createGzip } from 'zlib';
import { PaginatedList, Response } from '../../modules/shared/crud/crud.model';
import { IProduct } from '../../modules/shared/models/product.model';
import { getProducts } from '../../modules/product/filter/product-filter.service';
import { defaultProductSearchRequest } from '../../modules/product/filter/product-filter.model';
import { toUrl } from '../../modules/shared/helpers/string.helper';
import { ICategory } from '../../modules/shared/models/category.model';
import { getCategories } from '../../modules/category/category.service';


export default async function getSiteMap(req: NextApiRequest, res: NextApiResponse) {
    if (!res) return {};
    try {
        res.setHeader('content-type', 'application/xml');
        res.setHeader('Content-Encoding', 'gzip');

        const smStream = new SitemapStream({
            hostname: 'https://tssnextjs.herokuapp.com',
        });

        const pipeline = smStream.pipe(createGzip());

        smStream.write({ url: '/', lastmod: process.env.siteUpdatedAt, changefreq: EnumChangefreq.WEEKLY });
        smStream.write({ url: '/about', lastmod: process.env.siteUpdatedAt, changefreq: EnumChangefreq.MONTHLY });
        smStream.write({ url: '/contact', lastmod: process.env.siteUpdatedAt, changefreq: EnumChangefreq.MONTHLY });

        const products = await writeProducts(smStream);
        const categories = await writeCategories(smStream);

        smStream.end();
        streamToPromise(pipeline);
        pipeline.pipe(res).on('error', e => {
            throw e;
        });

    } catch (e) {
        console.log(e)
        res.status(500).end();
    }
};

async function writeProducts(smStream: SitemapStream) {
    const response: Response<PaginatedList<IProduct>> = await getProducts({
        ...defaultProductSearchRequest,
        isPagingEnabled: false
    });

    response.content.items.map(item => {
        smStream.write({
            url: `/product/${toUrl(item.name)}?productId=${item.productId}`,
            lastmod: new Date(),
            changefreq: EnumChangefreq.WEEKLY,
        });
    });

}

async function writeCategories(smStream: SitemapStream) {
    const response: Response<ICategory[]> = await getCategories();

    response.content.map(item => {
        smStream.write({
            url: `/category/${toUrl(item.name)}?categoryId=${item.categoryId}`,
            lastmod: new Date(),
            changefreq: EnumChangefreq.WEEKLY,
        });
    });

}