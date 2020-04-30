import { Product, WithContext } from "schema-dts";
import { getImageUrl } from '../../shared/helpers/http.helper';
import { IProduct } from '../../shared/models/product.model';
import { StructuredDataComponent } from '../../shared/structured-data/structured-data.component';
import { Fragment } from "react";
import { MetadataComponent } from "../../shared/metadata/metadata.component";
import { PageType, RobotsContent } from "../../shared/metadata/metadata.model";
import ErrorBoundary from "../../shared/error-boundary/error-boundary.component";
import { toUrl } from "../../shared/helpers/string.helper";

interface Props {
    data: IProduct
}

export function ProductDetailMetadataComponent({
    data
}: Props) {
    const now = new Date();
    const url = `${process.env.SITE_URL}/product/${toUrl(data.name)}?productId=${data.productId}`;
    const state: WithContext<Product> = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": data.name,
        "image": [
            getImageUrl(data.thumbnail),
            getImageUrl(data.image),
            getImageUrl(data.image2)
        ],
        "description": data.description,
        // "sku": "0446310786",
        // "mpn": "925872",
        "brand": {
            "@type": "Store",
            "name": process.env.SITE_NAME
        },
        // "review": {
        //   "@type": "Review",
        //   "reviewRating": {
        //     "@type": "Rating",
        //     "ratingValue": "4",
        //     "bestRating": "5"
        //   },
        //   "author": {
        //     "@type": "Person",
        //     "name": "Fred Benson"
        //   }
        // },
        "aggregateRating": data.review.count ? {
            "@type": "AggregateRating",
            "ratingValue": data.review.averageRating,
            "reviewCount": data.review.count,
            ratingCount: data.review.count
        } : null,
        offers: {
            "@type": "Offer",
            url,
            "priceCurrency": "USD",
            "price": data.discountedPrice > 0 ? data.discountedPrice : data.price,
            "priceValidUntil": now.setFullYear(now.getFullYear() + 1).toString(),
            "itemCondition": "http://schema.org/NewCondition",
            "availability": "http://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": process.env.SITE_NAME
            }
        }
    }

    return (
        <Fragment>
            <ErrorBoundary>
                <MetadataComponent
                    data={{
                        title: data.name + ' ' + process.env.SITE_NAME,
                        description: data.description,
                        canonical: url,
                        type: PageType.Website,
                        image: getImageUrl(data.image),
                        robots: [RobotsContent.Index, RobotsContent.Follow].join(',')
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


