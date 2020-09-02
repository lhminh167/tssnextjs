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

export function CustomerEditMetadataComponent({
    // data
}: Props) {
    const now = new Date();
    const state: WithContext<WebSite> = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': process.env.SITE_NAME,
    }

    return (
        <Fragment>
            <ErrorBoundary>
                <MetadataComponent
                    data={{
                        title: 'Edit User',
                        description: 'User\'s details could be changed on this page.',
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


