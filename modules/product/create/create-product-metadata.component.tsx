import { Fragment } from 'react';
import { Product, WithContext } from 'schema-dts';
import ErrorBoundary from '../../shared/error-boundary/error-boundary.component';
import { MetadataComponent } from '../../shared/metadata/metadata.component';
import { PageType, RobotsContent } from '../../shared/metadata/metadata.model';
import { StructuredDataComponent } from '../../shared/structured-data/structured-data.component';

interface Props {
    // data: IProduct
}

export function CreateProductMetadataComponent({
    // data
}: Props) {
    const now = new Date();
    const state: WithContext<Product> = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'brand': {
            '@type': 'Store',
            'name': process.env.SITE_NAME
        },
    }

    return (
        <Fragment>
            <ErrorBoundary>
                <MetadataComponent
                    data={{
                        title: 'Add New Product',
                        description: null,
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


