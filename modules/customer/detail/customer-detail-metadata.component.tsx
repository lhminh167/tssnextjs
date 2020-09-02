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
    // data: HomepageProducts
}

export function CustomerDetailMetadataComponent({
    // data
}: Props) {
    const now = new Date();
    const state: WithContext<WebSite> = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': process.env.SITE_NAME,
        'url': process.env.SITE_URL,
    }

    return (
        <Fragment>
            <ErrorBoundary>
                <MetadataComponent
                    data={{
                        title: 'User\'s Details',
                        description: 'You could take a look at user\'s details on this page.',
                        canonical: null,
                        type: PageType.Website,
                        image: null,
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


