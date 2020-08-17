import { Product, WithContext, WebSite, ShoppingCenter } from 'schema-dts';
import { getImageUrl } from '../../shared/helpers/http.helper';
import { IProduct, HomepageProducts } from '../../shared/models/product.model';
import { StructuredDataComponent } from '../../shared/structured-data/structured-data.component';
import { Fragment } from 'react';
import { MetadataComponent } from '../../shared/metadata/metadata.component';
import { PageType, RobotsContent } from '../../shared/metadata/metadata.model';
import ErrorBoundary from '../../shared/error-boundary/error-boundary.component';
import { toUrl } from '../../shared/helpers/string.helper';

interface Props {
    data: HomepageProducts
}

export function HomePageMetadataComponent({
    data
}: Props) {
    const now = new Date();
    const state: WithContext<WebSite> = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': process.env.SITE_NAME,
        'image': [
            // getImageUrl(data.thumbnail),
            // getImageUrl(data.image),
            // getImageUrl(data.image2)
        ],
        // 'description': data.description,
        // 'sku': '0446310786',
        // 'mpn': '925872',
        // 'brand': {
        //     '@type': 'Store',
        //     'name': process.env.SITE_NAME
        // },
        // 'review': {
        //   '@type': 'Review',
        //   'reviewRating': {
        //     '@type': 'Rating',
        //     'ratingValue': '4',
        //     'bestRating': '5'
        //   },
        //   'author': {
        //     '@type': 'Person',
        //     'name': 'Fred Benson'
        //   }
        // },
        // 'aggregateRating': data.review.count ? {
        //     '@type': 'AggregateRating',
        //     'ratingValue': data.review.averageRating,
        //     'reviewCount': data.review.count,
        //     ratingCount: data.review.count
        // } : null,
        // offers: {
        //     '@type': 'Offer',
        //     url,
        //     'priceCurrency': 'USD',
        //     'price': data.discountedPrice > 0 ? data.discountedPrice : data.price,
        //     'priceValidUntil': now.setFullYear(now.getFullYear() + 1).toString(),
        //     'itemCondition': 'http://schema.org/NewCondition',
        //     'availability': 'http://schema.org/InStock',
        //     'seller': {
        //         '@type': 'Organization',
        //         'name': process.env.SITE_NAME
        //     }
        // }
    }

    return (
        <Fragment>
            <ErrorBoundary>
                <MetadataComponent
                    data={{
                        title: 'Online shopping for latest fashion and other products with best prices',
                        description: 'Online shopping for latest fashion and other products with best prices on ' + process.env.SITE_NAME,
                        canonical: null,
                        type: PageType.Website,
                        image: null,
                        robots: [RobotsContent.Index, RobotsContent.Follow].join(','),
                        shouldPrefixSiteName: true
                    }}
                ></MetadataComponent>
            </ErrorBoundary>
            <ErrorBoundary>
                <StructuredDataComponent
                    data={state}
                />
            </ErrorBoundary>
        </Fragment>
    )
}


