import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Router } from 'next/router';
import { Metadata } from '../metadata/metadata.model';



export function MetadataComponent({
    title,
    description
}: Metadata) {
    // const userLanguage = useSelector(state => state.options.userLanguage);


    return (
        <Fragment>
            <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: `
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Material-UI",
                "url": "https://material-ui.com/",
                "logo": "https://material-ui.com/static/logo.png",
                "sameAs": [
                  "https://twitter.com/materialUI",
                  "https://github.com/mui-org/material-ui",
                  "https://opencollective.com/material-ui"
                ]
              }
            `,
                }}
            />


        </Fragment>
    )
}
