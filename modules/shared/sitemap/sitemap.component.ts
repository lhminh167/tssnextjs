import { EnumChangefreq } from "sitemap";
import { getCategories } from "../../category/category.service";
import { defaultProductSearchRequest, productUrl } from "../../product/filter/product-filter.model";
import { getProducts } from "../../product/filter/product-filter.service";
import { categoryUrl } from "../models/category.model";

export async function getPages() {
    const result = [
        { url: '/', lastmod: new Date().toLocaleDateString(), changefreq: EnumChangefreq.WEEKLY },
        { url: '/department', lastmod: new Date().toLocaleDateString(), changefreq: EnumChangefreq.MONTHLY },
        { url: '/product', lastmod: new Date().toLocaleDateString(), changefreq: EnumChangefreq.MONTHLY },
        { url: '/user/login', lastmod: new Date().toLocaleDateString(), changefreq: EnumChangefreq.MONTHLY },
        { url: '/user/register', lastmod: new Date().toLocaleDateString(), changefreq: EnumChangefreq.MONTHLY },
        { url: '/user/forgot-password', lastmod: new Date().toLocaleDateString(), changefreq: EnumChangefreq.MONTHLY },
    ];

    await getProductPages(result);
    await getCategoryPages(result);

    return result;
}

export async function getProductPages(input) {
    const products = await getProducts({
        ...defaultProductSearchRequest,
        isPagingEnabled: false
    });
    const productPages = products.content.items.map(item => input.push({
        url: productUrl.detail(item).as,
        lastmod: new Date().toLocaleDateString(),
        changefreq: EnumChangefreq.DAILY,
    }));
}


export async function getCategoryPages(input) {
    const categories = await getCategories();
    const categoryPages = categories.content.map(item => input.push({
        url: categoryUrl.detail(item).as,
        lastmod: new Date().toLocaleDateString(),
        changefreq: EnumChangefreq.MONTHLY,
    }));
}