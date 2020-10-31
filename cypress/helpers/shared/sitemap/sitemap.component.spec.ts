import { EnumChangefreq } from "sitemap";
import { getCategories } from "../../../../modules/category/category.service";
import { defaultProductSearchRequest, productUrl } from "../../../../modules/product/filter/product-filter.model";
import { getProducts } from "../../../../modules/product/filter/product-filter.service";
import { categoryUrl } from "../../../../modules/shared/models/category.model";
import { SitemapUrl } from "../../../../modules/shared/sitemap/sitemap.model";

export function getSitemapUrls() {
    const arr: SitemapUrl[] = [];
    return cy
        .request('/sitemap.xml')
        .its('body')
        .pipe(Cypress.$.parseXML)
        .pipe(Cypress.$)
        .as('urlSet')
        .find('loc').each(res => arr.push({ url: res.text(), lastmod: null, changefreq: null }))
        .get('@urlSet')
        .find('lastmod').each((res, index) => arr[index].lastmod = new Date(res.text()).toLocaleDateString())
        .get('@urlSet')
        .find('changefreq').each((res, index) => arr[index].changefreq =res.text() as EnumChangefreq)
        .wrap(arr)
}

export async function cyGetPages() {
    const result = [
        { url: '/', lastmod: new Date().toLocaleDateString(), changefreq: 'weekly' },
        { url: '/department', lastmod: new Date().toLocaleDateString(), changefreq: 'monthly' },
        { url: '/product', lastmod: new Date().toLocaleDateString(), changefreq: 'monthly' },
        { url: '/user/login', lastmod: new Date().toLocaleDateString(), changefreq: 'monthly' },
        { url: '/user/register', lastmod: new Date().toLocaleDateString(), changefreq: 'monthly' },
        { url: '/user/forgot-password', lastmod: new Date().toLocaleDateString(), changefreq: 'monthly' },
    ];

    await cyGetProductPages(result);
    await cyGetCategoryPages(result);
    result.forEach(e => e.url = Cypress.env('SITE_URL') + e.url);
    return result;
}

export async function cyGetProductPages(input) {
    const products = await getProducts({
        ...defaultProductSearchRequest,
        isPagingEnabled: false
    });
    const productPages = products.content.items.map(item => input.push({
        url: productUrl.detail(item).as,
        lastmod: new Date().toLocaleDateString(),
        changefreq: 'daily',
    }));
}


export async function cyGetCategoryPages(input) {
    const categories = await getCategories();
    const categoryPages = categories.content.map(item => input.push({
        url: categoryUrl.detail(item).as,
        lastmod: new Date().toLocaleDateString(),
        changefreq: 'monthly',
    }));
}